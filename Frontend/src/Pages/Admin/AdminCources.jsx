import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const blankCourse = { title: "", description: "", image: "", author: "", color: "bg-indigo-100", videoUrl: "", notesPdfUrl: "" };
const input = { width: "100%", boxSizing: "border-box", padding: ".65rem", border: "1px solid #ced4da", borderRadius: 6 };

export default function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(blankCourse);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const loadCourses = async () => { try { setCourses((await api.get("/courses")).data); } catch (e) { setMessage(e?.response?.data?.message || "Unable to load courses."); } };
  useEffect(() => { if (JSON.parse(localStorage.getItem("user") || "{}").role !== "admin") navigate("/admin/login"); else loadCourses(); }, []);
  const submit = async (e) => { e.preventDefault(); try { if (editingId) await api.put(`/courses/${editingId}`, form); else await api.post("/courses", form); setForm(blankCourse); setEditingId(null); setMessage("Course saved successfully."); loadCourses(); } catch (err) { setMessage(err?.response?.data?.message || "Unable to save course."); } };
  const edit = (course) => { setEditingId(course._id); setForm({ ...blankCourse, ...course }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async (id) => { if (!window.confirm("Delete this course permanently?")) return; try { await api.delete(`/courses/${id}`); setCourses((list) => list.filter((course) => course._id !== id)); } catch (err) { setMessage(err?.response?.data?.message || "Unable to delete course."); } };
  return <main style={{ minHeight: "100vh", background: "#f8f9fa", padding: "2rem", color: "#212529" }}><button onClick={() => navigate("/admin/dashboard")}>← Dashboard</button><h1>Course Management</h1>{message && <p>{message}</p>}<div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 420px)", gap: "2rem", alignItems: "start" }}><section style={{ display: "grid", gap: "1rem" }}>{courses.map((course) => <article key={course._id} style={{ background: "white", padding: "1rem", borderRadius: 10 }}><h2 style={{ margin: 0 }}>{course.title}</h2><p>{course.description}</p><small>Video: {course.videoUrl ? "Added" : "Not added"} · PDF: {course.notesPdfUrl ? "Added" : "Not added"}</small><div style={{ marginTop: ".75rem", display: "flex", gap: ".5rem" }}><button onClick={() => edit(course)}>Edit</button><button onClick={() => remove(course._id)}>Delete</button></div></article>)}</section><form onSubmit={submit} style={{ background: "white", padding: "1.25rem", borderRadius: 10, display: "grid", gap: ".75rem" }}><h2>{editingId ? "Edit course" : "Add course"}</h2>{Object.entries({ title: "Title", description: "Description", image: "Course image URL", author: "Author", videoUrl: "YouTube URL", notesPdfUrl: "Notes PDF URL" }).map(([key, label]) => <label key={key}>{label}<input required={key === "title"} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} style={input} /></label>)}<label>Card colour class<input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={input} /></label><button type="submit">{editingId ? "Update course" : "Create course"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(blankCourse); }}>Cancel</button>}</form></div></main>;
}
