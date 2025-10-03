import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import EmptyBox from "../../components/common/empty";

function ModuleChapter() {
  const { subjectName, subjectId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // <-- new search state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GET_ALL_CHAPTERS}?subjectId=${subjectId}`
        );

        setChapters(response.data.chapters || []);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [subjectId]);

  const handleChapterClick = (chapter) => {
    navigate(`${chapter.chapterName}`);
  };

  // Filter chapters based on search term
  const filteredChapters = chapters.filter((chapter) =>
    chapter.chapterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading chapters...</p>;
if (chapters.length === 0) {
  return <EmptyBox message={`No chapters found for ${subjectName}`} />;
}

  return (
    <div className="chapter-container">
      <h2 style={{ textAlign: "center", color: "white" }}>{subjectName} Chapters</h2>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="chapters-grid">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter._id}
            className="chapter-card"
            onClick={() => handleChapterClick(chapter)}
          >
            <h4>{chapter.chapterName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleChapter;
