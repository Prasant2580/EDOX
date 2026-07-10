import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Video } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar.jsx";
import api from "../../services/api.js";
import "./courseLearning.css";

function toYouTubeEmbedUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.split("/").filter(Boolean)[0];
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
    }

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

export default function CourseLearning() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || "Unable to load this course.");
      }
    };

    fetchCourse();
  }, [courseId]);

  if (error) {
    return (
      <div className="course-learning-page"><Navbar /><main className="course-learning-content"><button className="back-button" onClick={() => navigate("/dashboard")}><ArrowLeft size={18} /> Back to dashboard</button><p className="course-message error-message">{error}</p></main></div>
    );
  }

  if (!course) {
    return <div className="course-learning-page"><Navbar /><p className="course-message">Loading course materials...</p></div>;
  }

  const videoUrl = toYouTubeEmbedUrl(course.videoUrl);

  return (
    <div className="course-learning-page">
      <Navbar />
      <main className="course-learning-content">
        <button type="button" className="back-button" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} /> Back to dashboard
        </button>

        <header className="course-learning-header">
          <h1>{course.title}</h1>
          {course.description && <p>{course.description}</p>}
        </header>

        <section className="learning-section">
          <h2><Video size={22} /> Course video</h2>
          {videoUrl ? (
            <div className="video-frame"><iframe src={videoUrl} title={`${course.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
          ) : (
            <p className="empty-material">A YouTube video has not been added to this course yet.</p>
          )}
        </section>

        <section className="learning-section">
          <h2><FileText size={22} /> Course notes</h2>
          {course.notesPdfUrl ? (
            <iframe className="pdf-frame" src={course.notesPdfUrl} title={`${course.title} notes PDF`} />
          ) : (
            <p className="empty-material">A notes PDF has not been added to this course yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
