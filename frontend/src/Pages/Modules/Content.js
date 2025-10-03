import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import EmptyBox from "../../components/common/empty";

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  // Case 1: watch?v=VIDEO_ID or youtu.be/VIDEO_ID
  let regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  let match = url.match(regExp);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // Case 2: shorts/VIDEO_ID
  regExp = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;
  match = url.match(regExp);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // fallback (in case user pastes random link)
  return url;
};

function Content() {
  const { subjectId, chapterName } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("video"); // default open videos
  const [searchTerm, setSearchTerm] = useState(""); // <-- new search state

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GET_ALL_CHAPTERS}?subjectId=${subjectId}`
        );

        const chapter = response.data.chapters.find(
          (ch) => ch.chapterName === chapterName
        );

        setTopics(chapter?.topics || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subjectId, chapterName]);

  if (loading) return <p>Loading topics...</p>;
  if (topics.length === 0) return <EmptyBox message={`No topics found for ${chapterName}`} />

  const types = ["video", "notes", "assignment", "test"];
  const topicsByType = types.reduce((acc, type) => {
    acc[type] = topics
      .filter((t) => t.type === type)
      .filter(
        (t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()) // <-- filter by search
      );
    return acc;
  }, {});

  return (
    <div className="chapter-container">
      <h2 style={{ textAlign: "center", color: "white" }}>{chapterName} Topics</h2>

      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
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

      {/* Tabs */}
      <div className="tabs">
        {types.map((type) => (
          <button
            key={type}
            className={`tab-btn ${activeTab === type ? "active" : ""}`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} (
            {topicsByType[type]?.length || 0})
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {topicsByType[activeTab]?.length === 0 ? (
            <EmptyBox message={`No ${activeTab} available.`} />

        
        ) : (
          [...topicsByType[activeTab]].reverse().map((topic) => (
            <div key={topic._id} className="topic-card">
              <p className="item-title">{topic.title}</p>
              <p className="topic-date">
                {new Date(topic.createdAt).toLocaleDateString()}
              </p>
              {activeTab === "video" ? (
                <iframe
                  src={getYoutubeEmbedUrl(topic.link)}
                  title={topic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <a href={topic.link} target="_blank" rel="noopener noreferrer">
                  Open {activeTab}
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Content;
