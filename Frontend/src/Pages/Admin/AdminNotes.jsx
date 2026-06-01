import React, { useEffect, useState } from "react";
import { notesAPI } from "../../services/api.js";
import { Edit2, Trash2, Download, Plus } from "lucide-react";

export default function AdminNotes() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      window.location.href = "/admin/login";
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "admin") {
      window.location.href = "/auth";
      return;
    }

    setUser(parsedUser);
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.fetchNotes();
      setNotes(response.data);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setFile(null);
    setEditingNote(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      setSaving(true);
      if (editingNote) {
        await notesAPI.updateNote(editingNote._id, formData);
        setMessage("Note updated successfully.");
      } else {
        await notesAPI.createNote(formData);
        setMessage("Note uploaded successfully.");
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      setMessage(error?.response?.data?.message || "Unable to save note.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content || "");
    setFile(null);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note permanently?")) return;
    try {
      await notesAPI.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      setMessage("Note deleted successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Could not delete note.");
    }
  };

  const formatDate = (value) => new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Loading admin notes...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <header style={{ backgroundColor: "#343a40", color: "white", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Notes Management</h1>
          <p style={{ margin: 0, color: "#ced4da" }}>Admin note upload, edit, and delete controls.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => window.location.href = "/admin/dashboard"}
            style={{ backgroundColor: "#6c757d", color: "white", border: "none", padding: "0.75rem 1rem", borderRadius: "4px", cursor: "pointer" }}
          >
            Back to dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/admin/login";
            }}
            style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "0.75rem 1rem", borderRadius: "4px", cursor: "pointer" }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem" }}>
          <section style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{ margin: 0, color: "#212529" }}>Notes list</h2>
                  <p style={{ margin: "0.5rem 0 0", color: "#6c757d" }}>View and manage all uploaded notes.</p>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", backgroundColor: "#e7f1ff", color: "#2c7be5", padding: "0.5rem 0.75rem", borderRadius: "9999px", fontSize: "0.9rem", fontWeight: 600 }}>
                  <Plus size={14} />
                  Admin
                </span>
              </div>

              {message && (
                <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "12px", backgroundColor: "#f1f3f5", color: "#343a40" }}>
                  {message}
                </div>
              )}

              {loading ? (
                <div style={{ marginTop: "1rem", textAlign: "center", color: "#6c757d" }}>Loading notes...</div>
              ) : notes.length === 0 ? (
                <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "12px", backgroundColor: "#f8f9fa", color: "#6c757d" }}>
                  No notes found. Use the form to upload a new note.
                </div>
              ) : (
                <div style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
                  {notes.map((note) => {
                    const fileUrl = note.fileData ? `data:${note.fileType};base64,${note.fileData}` : null;
                    return (
                      <div key={note._id} style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "1.25rem", border: "1px solid #e9ecef" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                          <div>
                            <h3 style={{ margin: 0, color: "#212529" }}>{note.title}</h3>
                            <p style={{ margin: "0.5rem 0 0", color: "#69707a", whiteSpace: "pre-line" }}>{note.content || "No description provided."}</p>
                          </div>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                            <span style={{ color: "#6c757d", fontSize: "0.85rem" }}>{formatDate(note.createdAt)}</span>
                            <span style={{ color: "#6c757d", fontSize: "0.85rem" }}>{note.createdByName || "Admin"}</span>
                          </div>
                        </div>
                        {fileUrl && (
                          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem", padding: "0.95rem 1rem", borderRadius: "12px", backgroundColor: "#f8f9fa" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2c7be5" }}>
                              <Download size={16} />
                              <a href={fileUrl} download={note.fileName} style={{ color: "#2c7be5", fontWeight: 600, textDecoration: "none" }}>{note.fileName}</a>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button onClick={() => handleEdit(note)} style={{ backgroundColor: "#eef2ff", border: "1px solid #c7d2fe", color: "#4338ca", borderRadius: "9999px", padding: "0.55rem 0.9rem", cursor: "pointer" }}><Edit2 size={16} />Edit</button>
                              <button onClick={() => handleDelete(note._id)} style={{ backgroundColor: "#fff1f2", border: "1px solid #fecaca", color: "#b91c1c", borderRadius: "9999px", padding: "0.55rem 0.9rem", cursor: "pointer" }}><Trash2 size={16} />Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <aside style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)" }}>
              <h2 style={{ margin: 0, color: "#212529" }}>{editingNote ? "Update note" : "Upload note"}</h2>
              <p style={{ margin: "0.75rem 0 1.5rem", color: "#6c757d" }}>Admin notes are saved for all users and can include file attachments.</p>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <label style={{ display: "grid", gap: "0.5rem", color: "#495057", fontSize: "0.95rem" }}>
                  Note title
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", border: "1px solid #e9ecef", backgroundColor: "#f8f9fa", color: "#212529" }} />
                </label>
                <label style={{ display: "grid", gap: "0.5rem", color: "#495057", fontSize: "0.95rem" }}>
                  Description
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="Add note description" style={{ width: "100%", padding: "0.9rem 1rem", borderRadius: "12px", border: "1px solid #e9ecef", backgroundColor: "#f8f9fa", color: "#212529", resize: "vertical" }} />
                </label>
                <label style={{ display: "grid", gap: "0.5rem", color: "#495057", fontSize: "0.95rem" }}>
                  Attachment
                  <input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} style={{ padding: "0.65rem 0.75rem", color: "#495057" }} />
                </label>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="submit" disabled={saving} style={{ backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "9999px", padding: "0.9rem 1.25rem", cursor: "pointer" }}>
                    {saving ? "Saving..." : editingNote ? "Update note" : "Upload note"}
                  </button>
                  {editingNote && (
                    <button type="button" onClick={resetForm} style={{ backgroundColor: "#f8fafc", color: "#111827", border: "1px solid #cbd5e1", borderRadius: "9999px", padding: "0.9rem 1.25rem", cursor: "pointer" }}>
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15, 23, 42, 0.05)" }}>
              <h2 style={{ margin: 0, color: "#212529" }}>Admin note tips</h2>
              <ul style={{ marginTop: "1rem", display: "grid", gap: "0.75rem", color: "#6c757d", lineHeight: 1.7 }}>
                <li>Upload notes with files to share content across users.</li>
                <li>Edit or delete notes anytime from the list.</li>
                <li>Use descriptive titles so students can find notes quickly.</li>
                <li>Attachments are available for download immediately.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
