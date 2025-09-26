import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./subject.css";

const SubjectPage = () => {
  const { subjectName, id } = useParams();
  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [open, setOpen] = useState(false);
  const [chapterName, setChapterName] = useState("");

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const found = storedSubjects.find((s) => String(s.id) === id);
    setSubject(found);

    // Load chapters from localStorage
    const storedChapters = JSON.parse(localStorage.getItem(`chapters-${id}`)) || [];
    setChapters(storedChapters);
  }, [id]);

  const handleAddChapter = () => {
    if (!chapterName.trim()) return;
    const newChapter = { name: chapterName.toUpperCase(), id: Date.now() };
    const updatedChapters = [...chapters, newChapter];
    setChapters(updatedChapters);
    localStorage.setItem(`chapters-${id}`, JSON.stringify(updatedChapters));
    setChapterName("");
    setOpen(false);
  };

  if (!subject) return <h2>Subject not found</h2>;

  return (
    <div className="subject-container">
      <div className="subject-header">
        <h2>Chapters</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>
          Add Chapter
        </button>
      </div>

      {/* Modal */}
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

      {/* Chapters grid */}
      <div className="chapters-grid">
        {chapters.length > 0 ? (
          chapters.map((ch) => (
            <div className="chapter-card" key={ch.id}>
              <div className="plus-circle">+</div>
              <h4>{ch.name}</h4>
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
