import React, { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, BookOpen, Plus, Trash2, Edit2, Download } from "lucide-react";
import Navbar from "../../Component/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { notesAPI } from "../../services/api.js";

export default function Notes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}" );
  const isAdmin = storedUser.role === "admin";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.fetchNotes();
      setNotes(response.data);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Unable to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setFile(null);
    setEditingNote(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Please enter a note title.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) {
        formData.append("file", file);
      }

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

  const handleDelete = async (noteId) => {
    const shouldDelete = window.confirm("Delete this note permanently?");
    if (!shouldDelete) return;

    try {
      await notesAPI.deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      setMessage("Note deleted successfully.");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Unable to delete note.");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 w-full bg-white">
        {sidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,82vw)] flex-col bg-indigo-600 p-6 text-white shadow-2xl transition-transform duration-300 md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-10 flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Edox</h1>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-indigo-700 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2 text-sm">
            <button
              type="button"
              onClick={() => { navigate("/dashboard"); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors bg-indigo-500 text-white hover:bg-indigo-700"
            >
              <LayoutDashboard className="w-4 h-4" />
              My Courses
            </button>

            <button
              type="button"
              onClick={() => { navigate("/dashboard"); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors bg-indigo-500 text-white hover:bg-indigo-700"
            >
              <BookOpen className="w-4 h-4" />
              All Courses
            </button>

            <button
              type="button"
              onClick={() => { navigate("/quiz"); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Quiz
            </button>

            <button
              type="button"
              onClick={() => { navigate("/notes"); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Notes
            </button>
          </nav>
        </aside>

        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <section className="lg:col-span-8 w-full">
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="truncate text-xl font-semibold">Notes</h2>
            </div>

            <div className="max-w-7xl mx-auto p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Notes Library</h1>
                  <p className="text-sm text-slate-600">Upload notes, download attachments, and review everything in one place.</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  {isAdmin ? "Admin mode" : "Student mode"}
                </span>
              </div>

              {message && (
                <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  {message}
                </div>
              )}

              <div className="space-y-4">
                {loading ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">Loading notes...</div>
                ) : notes.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
                    No notes available yet. Upload a note to get started.
                  </div>
                ) : (
                  notes.map((note) => {
                    const fileUrl = note.fileData
                      ? `data:${note.fileType};base64,${note.fileData}`
                      : null;

                    return (
                      <article key={note._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-slate-900">{note.title}</h2>
                            <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{note.content || "No description provided."}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                              {note.createdByName || "Unknown"}
                            </span>
                            <span className="text-xs text-slate-400">{formatDate(note.createdAt)}</span>
                          </div>
                        </div>

                        {fileUrl && (
                          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                            <Download className="h-4 w-4" />
                            <a href={fileUrl} download={note.fileName} className="font-medium text-indigo-600 hover:text-indigo-800">
                              {note.fileName}
                            </a>
                          </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                          {isAdmin && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEdit(note)}
                                className="inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(note._id)}
                                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          <aside className="lg:col-span-4 w-full">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{editingNote ? "Manage note" : "Upload new note"}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {editingNote
                    ? "Update the note details below. Upload a new file to replace the current attachment."
                    : "Submit your note with an optional file attachment."}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                    <input
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500"
                      placeholder="Enter note title"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Description
                    <textarea
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                      rows={4}
                      className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500"
                      placeholder="Add a short summary or details"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Attachment
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg"
                      onChange={(event) => setFile(event.target.files?.[0] || null)}
                      className="mt-2 w-full text-sm text-slate-700"
                    />
                  </label>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {saving ? "Saving..." : editingNote ? "Update note" : "Upload note"}
                    </button>
                    {editingNote && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Tips</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Users can upload notes and view attachments.</li>
                  <li>Admins can edit or delete any note from the list.</li>
                  <li>Click a note's Edit button to change its details.</li>
                  <li>Attachments are saved and can be downloaded directly.</li>
                </ul>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
