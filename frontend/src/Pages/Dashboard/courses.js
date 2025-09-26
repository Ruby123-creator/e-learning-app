import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API request
      const payload = {
        subjectName: formData.subject,
        class: formData.class,
        title: formData.title,
      };
      const response = await axios.post("http://localhost:8000/api/addSubject", payload);

      // Optionally, you can get the returned subject from the API
      const newSubject = {
        ...formData,
        id: Date.now(), // or use response.data.id if API returns id
      };

      const updatedSubjects = [...subjects, newSubject];
      setSubjects(updatedSubjects);
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

      setFormData({ title: "", class: "", subject: "", thumbnail: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <div className="modal-overlay" onClick={() => !loading && setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Subject</h3>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <label>Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                disabled={loading}
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
                disabled={loading}
              />

              <label>Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />

              <div className="modal-actions">
                <button type="button" onClick={() => !loading && setOpen(false)} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="add-btn" disabled={loading}>
                  {loading ? "Adding..." : "Add"}
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
