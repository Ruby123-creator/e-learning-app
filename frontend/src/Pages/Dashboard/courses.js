import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    thumbnail: "",
  });
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "subject" ? value.toUpperCase() : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubject = { ...formData, id: Date.now() }; // unique id
    const updatedSubjects = [...subjects, newSubject];
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    setSubjects(updatedSubjects);
    setFormData({ title: "", class: "", subject: "", thumbnail: "" });
    setOpen(false);
  };

  const handleCardClick = (subj) => {
    navigate(`${subj.subject}/${subj.id}`);
  };

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h2>Subjects</h2>
        <button className="add-btn" onClick={() => setOpen(true)}>
          Add Subject
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="modal-overlay"
          onClick={() => setOpen(false)} // close when clicking overlay
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h3>Add Subject</h3>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <label>Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="VI">Class VI</option>
                <option value="VII">Class VII</option>
                <option value="VIII">Class VIII</option>
                <option value="IX">Class IX</option>
                <option value="X">Class X</option>
                <option value="XI">Class XI</option>
                <option value="XII">Class XII</option>
              </select>

              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <label>Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display subjects */}
      <div className="subjects-grid">
        {subjects.length > 0 ? (
          subjects.map((subj) => (
            <div
              className="subject-card"
              key={subj.id}
              onClick={() => handleCardClick(subj)}
            >
              {subj.thumbnail && (
                <img
                  src={subj.thumbnail}
                  alt={subj.title}
                  className="thumbnail"
                />
              )}
              <h4>{subj.title}</h4>
              <p>Class: {subj.class}</p>
              <p>Subject: {subj.subject}</p>
            </div>
          ))
        ) : (
          <p>No subjects added yet</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
