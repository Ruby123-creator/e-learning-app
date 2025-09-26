import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./subject.css";

const SECTION_KEYS = {
  Videos: "video",
  Notes: "notes",
  Assignments: "assignment",
  Tests: "tests",
};

const SubjectPage = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [open, setOpen] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [expandedSub, setExpandedSub] = useState({});
  const [subModal, setSubModal] = useState({ open: false, type: "", chId: null });
  const [subName, setSubName] = useState("");
  const [subLink, setSubLink] = useState("");
  const [expandedItem, setExpandedItem] = useState({});

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const found = storedSubjects.find((s) => String(s.id) === id);
    setSubject(found);

    let storedChapters = JSON.parse(localStorage.getItem(`chapters-${id}`)) || [];

    // Normalize keys to match SECTION_KEYS
    storedChapters = storedChapters.map((ch) => {
      const normalized = { ...ch };
      Object.values(SECTION_KEYS).forEach((key) => {
        if (!normalized[key]) normalized[key] = [];
      });
      return normalized;
    });

    setChapters(storedChapters);

    // Auto-expand sub-accordions with existing data
    const initExpandedSub = {};
    storedChapters.forEach((ch) => {
      Object.entries(SECTION_KEYS).forEach(([displayName, key]) => {
        if (ch[key] && ch[key].length > 0) {
          initExpandedSub[ch.id] = displayName;
        }
      });
    });
    setExpandedSub(initExpandedSub);

  }, [id]);

  const handleAddChapter = () => {
    if (!chapterName.trim()) return;

    const newChapter = {
      id: Date.now(),
      name: chapterName.toUpperCase(),
      video: [],
      notes: [],
      assignment: [],
      tests: [],
    };

    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
    localStorage.setItem(`chapters-${id}`, JSON.stringify(updatedChapters));

    setChapterName("");
    setOpen(false);
  };

  const handleAddSubItem = () => {
    if (!subName.trim() || !subLink.trim()) return;

    const sectionKey = SECTION_KEYS[subModal.type];

    const updatedChapters = chapters.map((ch) => {
      if (ch.id === subModal.chId) {
        return {
          ...ch,
          [sectionKey]: [
            ...(ch[sectionKey] || []),
            { id: Date.now(), name: subName, link: subLink },
          ],
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    localStorage.setItem(`chapters-${id}`, JSON.stringify(updatedChapters));

    setExpandedChapter(subModal.chId);
    setExpandedSub((prev) => ({ ...prev, [subModal.chId]: subModal.type }));

    setSubModal({ open: false, type: "", chId: null });
    setSubName("");
    setSubLink("");
  };

  const toggleChapter = (chId) => {
    setExpandedChapter(expandedChapter === chId ? null : chId);
  };

  const toggleSub = (chId, section) => {
    setExpandedSub((prev) => ({
      ...prev,
      [chId]: prev[chId] === section ? null : section,
    }));
  };

  const toggleItem = (chId, section, itemId) => {
    const key = `${chId}_${section}`;
    setExpandedItem((prev) => ({ ...prev, [key]: prev[key] === itemId ? null : itemId }));
  };

  if (!subject) return <h2>Subject not found</h2>;

  return (
    <div className="subject-container">
      <div className="subject-header">
        <h2>Chapters</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>Add Chapter</button>
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
              <button className="add-btn" onClick={handleAddChapter}>Add</button>
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
              <button onClick={() => setSubModal({ open: false, type: "", chId: null })}>Cancel</button>
              <button className="add-btn" onClick={handleAddSubItem}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters Accordion */}
      <div className="chapters-accordion">
        {chapters.length > 0 ? (
          chapters.map((ch) => (
            <div key={ch.id} className={`chapter-item ${expandedChapter === ch.id ? "open" : ""}`}>
              <div className="chapter-header" onClick={() => toggleChapter(ch.id)}>
                <h4>{ch.name}</h4>
                <span className={`arrow ${expandedChapter === ch.id ? "up" : "down"}`}>▼</span>
              </div>

              <div className="chapter-content">
                {Object.entries(SECTION_KEYS).map(([displayName, key]) => {
                  const isSubOpen = expandedSub[ch.id] === displayName;
                  return (
                    <div key={key} className={`sub-accordion ${isSubOpen ? "open" : ""}`}>
                      <div className="sub-header" onClick={() => toggleSub(ch.id, displayName)}>
                        <span>{displayName}</span>
                        <button
                          className="open-btn"
                          onClick={() => setSubModal({ open: true, type: displayName, chId: ch.id })}
                        >
                          +
                        </button>
                      </div>
                      <div className="sub-content">
                        {ch[key] && ch[key].length > 0 ? (
                          ch[key].map((item) => {
                            const itemKey = `${ch.id}_${key}`;
                            const isOpen = expandedItem[itemKey] === item.id;
                            return (
                              <div key={item.id} className="item-accordion">
                                <div className="item-header" onClick={() => toggleItem(ch.id, key, item.id)}>
                                  {item.name}
                                  <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
                                </div>
                                {isOpen && (
                                  <div className="item-content">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p>No {displayName.toLowerCase()} added yet.</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p>No chapters added yet</p>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
