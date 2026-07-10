const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')


const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}


// REGISTER
exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user" // change to "user" if needed
        })


        res.status(201).json({
            message: "User registered successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },

            token: generateToken(user._id)
        })


    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}



// LOGIN
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }


        res.json({

            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },

            token: generateToken(user._id)

        })


    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}

const createEmailTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

const hasEmailConfig = () => {
    return Boolean(
        process.env.EMAIL_HOST &&
        process.env.EMAIL_PORT &&
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASS
    )
}


// SEND PASSWORD RESET EMAIL
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        if (!hasEmailConfig()) {
            return res.status(500).json({
                message: "Email service is not configured"
            })
        }

        const user = await User.findOne({ email })

        const responseMessage = "If that email exists, a password reset link has been sent."

        if (!user) {
            return res.json({
                message: responseMessage
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')

        user.resetPasswordToken = hashedToken
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
        await user.save()

        const frontendUrl = process.env.FRONTEND_URL
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`

        const transporter = createEmailTransporter()

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
                to: user.email,
                subject: "Reset your Edox password",
                html: `
                    <h2>Password reset request</h2>
                    <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
                    <p><a href="${resetUrl}">Reset Password</a></p>
                    <p>If you did not request this, you can ignore this email.</p>
                `
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            await user.save()
            throw error
        }

        res.json({
            message: responseMessage
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}


// RESET PASSWORD WITH TOKEN
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                message: "New password is required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or expired"
            })
        }

        user.password = await bcrypt.hash(password, 10)
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()

        res.json({
            message: "Password reset successful. Please sign in with your new password."
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }
}
