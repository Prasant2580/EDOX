import React  from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/home.jsx";
import Auth from "../Pages/Auth/Auth.jsx"
import ResetPassword from "../Pages/Auth/ResetPassword.jsx"
import About from "../Pages/About/AboutUs.jsx"
import Contact from "../Pages/Contact/Contact.jsx"
import Dashboard from "../Pages/Dashboard/dashboard.jsx"
import Account from "../Pages/Account/account.jsx"
import Snapsolve from "../Pages/ScanSolve/ScanSolve.jsx"
import AdminLogin from "../Pages/Admin/login.jsx"
import AdminDashboard from "../Pages/Admin/Admin.jsx"
import AdminNotes from "../Pages/Admin/AdminNotes.jsx"
import QuizPage from "../Pages/Quiz/quiz.jsx"
import Notes from "../Pages/Notes/Notes.jsx"


export default function Approutes() {
    return (
       <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/snap&solve" element={<Snapsolve />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/notes" element={<AdminNotes />} />
            </Routes>
    );
}
