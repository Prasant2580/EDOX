import { useEffect, useMemo, useState, useRef } from "react";
import { Bell, BookOpen, LayoutDashboard, Menu, Plus, Search, X } from "lucide-react";
import Calendar from "./Calendar";
import Navbar from "../../Component/Navbar/navbar.jsx";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [allCourses, setAllCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [activeView, setActiveView] = useState("my");
  const [loading, setLoading] = useState(true);
  const [addingCourseId, setAddingCourseId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const focusSearchInput = () => {
    try {
      if (typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches) {
        desktopSearchRef.current?.focus();
      } else {
        mobileSearchRef.current?.focus();
      }
    } catch (e) {
      // fallback
      desktopSearchRef.current?.focus();
      mobileSearchRef.current?.focus();
    }
  };

  const navigate = useNavigate();

  const myCourseIds = useMemo(
    () => new Set(myCourses.map((course) => course._id)),
    [myCourses]
  );

  const visibleCourses = activeView === "all" ? allCourses : myCourses;
  const title = activeView === "all" ? "All Courses" : "My Courses";

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    setLoading(true);

    try {
      const response = await api.get("/courses/my");
      setMyCourses(response.data);
    } catch (error) {
      console.error("Error fetching my courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    setLoading(true);

    try {
      const [allResponse, myResponse] = await Promise.all([
        api.get("/courses"),
        api.get("/courses/my"),
      ]);

      setAllCourses(allResponse.data);
      setMyCourses(myResponse.data);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const showMyCourses = () => {
    setActiveView("my");
    setSidebarOpen(false);
    fetchMyCourses();
  };

  const showAllCourses = () => {
    setActiveView("all");
    setSidebarOpen(false);
    fetchAllCourses();
  };

  const SidebarContent = () => (
    <>
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
          onClick={showMyCourses}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors ${
            activeView === "my" ? "bg-white text-indigo-700" : "bg-indigo-500 text-white hover:bg-indigo-700"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          My Courses
        </button>

        <button
          type="button"
          onClick={showAllCourses}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left border border-transparent transition-colors ${
            activeView === "all" ? "bg-white text-indigo-700" : "bg-indigo-500 text-white hover:bg-indigo-700"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          All Courses
        </button>

        <button
          type="button"
          onClick={() => navigate("/quiz")}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Quiz
        </button>

        <button
          type="button"
          onClick={() => navigate("/notes")}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Notes
        </button>
      </nav>
    </>
  );

  const addCourse = async (courseId) => {
    setAddingCourseId(courseId);

    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      setMyCourses(response.data);
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setAddingCourseId(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 w-full bg-[#F5F6FA]">
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
          <SidebarContent />
        </aside>

        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <section className="lg:col-span-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <div className="flex w-full sm:w-auto min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <h2 className="truncate text-xl font-semibold">{title}</h2>
              </div>

              <div className="flex shrink-0 items-center gap-3 w-full sm:w-auto">
                {/* Mobile search input (full width) */}
                <div className="sm:hidden w-full">
                  <input
                    ref={mobileSearchRef}
                    aria-label="Search courses"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Desktop search on right side */}
                <div className="hidden sm:block">
                  <input
                    ref={desktopSearchRef}
                    aria-label="Search courses"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={focusSearchInput}
                  aria-label="Focus search input"
                  className="text-slate-600 hover:text-slate-800"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filtered results */}
            {(() => {
              const q = (searchQuery || "").trim().toLowerCase();
              const filtered = q
                ? (visibleCourses || []).filter((c) => {
                    const hay = `${c.title || ""} ${c.description || ""}`.toLowerCase();
                    return hay.includes(q);
                  })
                : visibleCourses;

              if (loading) return <p>Loading courses...</p>;

              if (!filtered || filtered.length === 0) {
                if (!visibleCourses || visibleCourses.length === 0) {
                  return (
                    <p>
                      {activeView === "all"
                        ? "No courses available."
                        : "No courses added yet. Open All Courses and add one."}
                    </p>
                  );
                }

                return <p>No matching courses found for "{searchQuery}".</p>;
              }

              return (
                <div className="space-y-4">
                  {filtered.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      isAllCoursesView={activeView === "all"}
                      isAdded={myCourseIds.has(course._id)}
                      isAdding={addingCourseId === course._id}
                      onAddCourse={addCourse}
                      navigate={navigate}
                    />
                  ))}
                </div>
              );
            })()}
          </section>

          <aside className="lg:col-span-4 w-full space-y-6">
            <Calendar />
          </aside>
        </main>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  isAllCoursesView,
  isAdded,
  isAdding,
  onAddCourse,
  navigate,
}) {
  return (
    <div
      className={`rounded-xl p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center ${
        course.color || "bg-indigo-100"
      }`}
    >
      <div className="flex min-w-0 gap-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl object-cover bg-white"
        />

        <div className="min-w-0">
          <h3 className="font-semibold wrap-break-word">{course.title}</h3>

          <p className="text-sm text-gray-600 wrap-break-word">{course.description}</p>

          <span className="text-xs text-gray-500">
            Created by {course.author}
          </span>
        </div>
      </div>

      {isAllCoursesView ? (
        <button
          type="button"
          onClick={() => onAddCourse(course._id)}
          disabled={isAdded || isAdding}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-600 disabled:opacity-80 sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          {isAdded ? "Added" : isAdding ? "Adding..." : "Add Course"}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate(`/dashboard/course/${course._id}`)}
          className="w-full rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          Open
        </button>
      )}
    </div>
  );
}
