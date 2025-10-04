import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useUI } from "../../context/ui.context";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import { address } from "../../utils/api-endpoints";
import EmptyBox from "../../components/common/empty";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    class: "",
    subject: "",
    thumbnailFile: null, // file object
    thumbnailPreview: null, // preview URL
  });
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const { userData } = useUI();

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GET_ALL_SUBJECTS}?userId=${userData._id}`
        );
        const data = response.data.allCourses || [];
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        alert("Failed to fetch subjects.");
      } finally {
        setFetching(false);
      }
    };

    if (userData?._id) fetchSubjects();
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "subject" ? value.toUpperCase() : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnailFile: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Submit form with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("userId", userData._id);
      payload.append("subjectName", formData.subject);
      payload.append("class", formData.class);
      payload.append("title", formData.title);

      if (formData.thumbnailFile) {
        // MUST match multer field
        payload.append("thumbnailImage", formData.thumbnailFile);
      }
      const response = await axios.post(API_ENDPOINTS.ADD_SUBJECT, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newSubject = {
        ...response.data.data,
        thumbnailImage: response.data.data.thumbnailImage || null,
      };

      setSubjects((prev) => [...prev, newSubject]);
      setFormData({
        title: "",
        class: "",
        subject: "",
        thumbnailFile: null,
        thumbnailPreview: null,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (subj) => {
    navigate(`${subj.subjectName}/${subj._id}`);
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
          onClick={() => !loading && setOpen(false)}
        >
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
                <option value="UPSC">UPSC</option>
                <option value="Current Affairs">Current Affairs</option>
                <option value="Other Competitive Exams">Other Competitive Exams</option>

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

              {/* Preview before upload */}
              {formData.thumbnailPreview && (
                <img
                  src={formData.thumbnailPreview}
                  alt="Preview"
                  className="thumbnail-preview"
                  style={{ marginBottom: "10px" }}
                />
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => !loading && setOpen(false)}
                  disabled={loading}
                >
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
        {fetching ? (
          <p>Loading subjects...</p>
        ) : subjects.length > 0 ? (
          subjects.map((subj) => (
            <div
              className="subject-card"
              key={subj._id}
              onClick={() => handleCardClick(subj)}
            >
              <img
                src={
                  subj.thumbnailImage
                    ? `${address}/${subj.thumbnailImage}`
                    : "https://via.placeholder.com/150"
                }
                alt={subj.subjectName}
                className="thumbnail"
              />
              <h4>{subj.subjectName}</h4>
              <p>Class: {subj.class}</p>
            </div>
          ))
        ) : (
          <EmptyBox message="No subjects added yet" />
        )}
      </div>
    </div>
  );
};

export default Courses;
