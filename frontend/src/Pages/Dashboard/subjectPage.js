import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./subject.css";
import { API_ENDPOINTS, baseUrl } from "../../utils/api-endpoints";
import EmptyBox from "../../components/common/empty";

const SECTION_KEYS = {
  Videos: "video",
  Notes: "notes",
  Assignments: "assignment",
  Tests: "tests",
};

const SubjectPage = () => {
  const { id } = useParams();
  const [subjectName, setSubjectName] = useState("");
  const [chapters, setChapters] = useState([]);
  const [open, setOpen] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [expandedSub, setExpandedSub] = useState({});
  const [subModal, setSubModal] = useState({
    open: false,
    type: "",
    chId: null,
  });
  const [subName, setSubName] = useState("");
  const [subLink, setSubLink] = useState("");
  const [expandedItem, setExpandedItem] = useState({});
  const [loading, setLoading] = useState(true);

  // Convert YouTube URL to embed URL
  const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  // Case 1: normal watch?v=...
  let match = url.match(/(?:\?v=|&v=)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // Case 2: shorts/VIDEO_ID
  match = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  // Case 3: youtu.be/VIDEO_ID
  match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;

  return "";
};


  // Fetch chapters from backend
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_ENDPOINTS.GET_ALL_CHAPTERS}?subjectId=${id}`
        );

        const data = response.data;
        setSubjectName(data.subjectName || "");

        const TYPE_TO_KEY = {
          video: "video",
          notes: "notes",
          assignment: "assignment",
          tests: "tests",
        };

        const normalizedChapters = data.chapters.map((ch) => {
          const normalized = {
            ...ch,
            video: [],
            notes: [],
            assignment: [],
            tests: [],
          };

          if (ch.topics && ch.topics.length > 0) {
            ch.topics.forEach((topic) => {
              const key = TYPE_TO_KEY[topic.type] || "notes";
              normalized[key] = [
                ...(normalized[key] || []),
                { id: topic._id, name: topic.title, link: topic.link },
              ];
            });
          }

          return normalized;
        });

        setChapters(normalizedChapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        alert("Failed to load chapters.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [id]);

  const toggleChapter = (chId) =>
    setExpandedChapter(expandedChapter === chId ? null : chId);
  const toggleSub = (chId, section) =>
    setExpandedSub((prev) => ({
      ...prev,
      [chId]: prev[chId] === section ? null : section,
    }));

  // Add chapter to backend
  const handleAddChapter = async () => {
    if (!chapterName.trim()) return;

    try {
      await axios.post(
        `${
          API_ENDPOINTS.ADD_CHAPTERS
        }?id=${id}&chapterName=${encodeURIComponent(chapterName)}`
      );

      // Refetch all chapters from backend to sync state
      const response = await axios.get(
        `${API_ENDPOINTS.GET_ALL_CHAPTERS}?subjectId=${id}`
      );
      const data = response.data;

      const TYPE_TO_KEY = {
        video: "video",
        notes: "notes",
        assignment: "assignment",
        tests: "tests",
      };

      const normalizedChapters = data.chapters.map((ch) => {
        const normalized = {
          ...ch,
          video: [],
          notes: [],
          assignment: [],
          tests: [],
        };

        if (ch.topics && ch.topics.length > 0) {
          ch.topics.forEach((topic) => {
            const key = TYPE_TO_KEY[topic.type] || "notes";
            normalized[key] = [
              ...(normalized[key] || []),
              { id: topic._id, name: topic.title, link: topic.link },
            ];
          });
        }

        return normalized;
      });

      setChapters(normalizedChapters); // latest chapter first
      setChapterName("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding chapter:", error);
      alert("Failed to add chapter. Please try again.");
    }
  };

  // Add sub-item (video, note, assignment, test) to backend
  const handleAddSubItem = async () => {
    if (!subName.trim() || !subLink.trim()) return;

    try {
      const sectionKey = SECTION_KEYS[subModal.type];

      const payload = {
        chapterId: subModal.chId,
        subjectId: id,
        title: subName,
        link: subLink,
        type: sectionKey,
        accessible: "private",
      };

      const response = await axios.post(API_ENDPOINTS.ADD_TOPICS, payload);

      const newTopic = response.data?.data || {
        id: Date.now(),
        name: subName,
        link: subLink,
      };

      const updatedChapters = chapters.map((ch) => {
        if (ch._id === subModal.chId) {
          return {
            ...ch,
            [sectionKey]: [...(ch[sectionKey] || []), newTopic],
          };
        }
        return ch;
      });

      setChapters(updatedChapters);
      setExpandedChapter(subModal.chId);
      setExpandedSub((prev) => ({ ...prev, [subModal.chId]: subModal.type }));
      setSubModal({ open: false, type: "", chId: null });
      setSubName("");
      setSubLink("");
    } catch (error) {
      console.error("Error adding topic:", error);
      alert("Failed to add topic. Please try again.");
    }
  };

  if (loading) return <p>Loading chapters...</p>;
  if (!subjectName) return <h2>Subject not found</h2>;

  return (
    <div className="subject-container">
      <div className="subject-header">
        <h2>{subjectName} - Chapters</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>
          Add Chapter
        </button>
      </div>

      {/* Add Chapter Modal */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Chapter</h3>
            <input
              type="text"
              placeholder="Chapter Name"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button className="add-btn" onClick={handleAddChapter}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub Item Modal */}
      {subModal.open && (
        <div
          className="modal-overlay"
          onClick={() => setSubModal({ open: false, type: "", chId: null })}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add {subModal.type}</h3>
            <input
              type="text"
              placeholder={`${subModal.type} Name`}
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Drive/URL link"
              value={subLink}
              onChange={(e) => setSubLink(e.target.value)}
            />
            <div className="modal-actions">
              <button
                onClick={() =>
                  setSubModal({ open: false, type: "", chId: null })
                }
              >
                Cancel
              </button>
              <button className="add-btn" onClick={handleAddSubItem}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters Accordion */}
      <div className="chapters-accordion">
        {chapters.length > 0 ? (
          chapters.map((ch) => (
            <div
              key={ch._id}
              className={`chapter-item ${
                expandedChapter === ch._id ? "open" : ""
              }`}
            >
              <div
                className="chapter-header"
                onClick={() => toggleChapter(ch._id)}
              >
                <h4>{ch.chapterName}</h4>
                <span
                  className={`arrow ${
                    expandedChapter === ch._id ? "up" : "down"
                  }`}
                >
                  ▼
                </span>
              </div>

              {expandedChapter === ch._id && (
                <div className="chapter-content">
                  {Object.entries(SECTION_KEYS).map(([displayName, key]) => {
                    const isSubOpen = expandedSub[ch._id] === displayName;
                    return (
                      <div
                        key={key}
                        className={`sub-accordion ${isSubOpen ? "open" : ""}`}
                      >
                        <div
                          className="sub-header"
                          onClick={() => toggleSub(ch._id, displayName)}
                        >
                          <span>{displayName}</span>
                          <button
                            className="open-btn"
                            onClick={() =>
                              setSubModal({
                                open: true,
                                type: displayName,
                                chId: ch._id,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                        {isSubOpen && (
                          <div className="sub-content scrollable">
                            {ch[key] && ch[key].length > 0 ? (
                              key === "video" ? (
                                <div className="video-container">
                                  {[...ch[key]].reverse().map((item) => (
                                    <div key={item.id} className="video-item">
                                      <p className="item-title">{item.name}</p>
                                      <iframe
                                        width="200"
                                        height="120"
                                        src={getYoutubeEmbedUrl(item.link)}
                                        title={item.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                [...ch[key]].reverse().map((item) => (
                                  <div key={item.id} className="item">
                                    <p className="item-title">{item.name}</p>
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="item-link"
                                    >
                                      {item.link}
                                    </a>
                                  </div>
                                ))
                              )
                            ) : (
                              <EmptyBox
                                message={`No ${displayName.toLowerCase()} added yet.`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <EmptyBox message="No subjects added yet" />
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
