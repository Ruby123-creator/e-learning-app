import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./style.css";
import UploadModal from "../../components/Modals/uploads/uploadMaterial";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
const AdminDashboard = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const uploadedVideos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY"
  ];

  const uploadedNotes = [
    { title: "Math Notes", link: "https://drive.google.com/file/d/xyz/view" },
    { title: "Science Notes", link: "https://drive.google.com/file/d/abc/view" }
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="dashboard-layout">
        {/* Left side: Display Uploaded Content */}
        <div className="uploaded-section">
          <div className="uploaded-videos">
            <h2>Uploaded Videos</h2>
            {uploadedVideos.map((url, index) => (
              <iframe
                key={index}
                src={url}
                title={`Video ${index + 1}`}
                allowFullScreen
              ></iframe>
            ))}
          </div>

          <div className="uploaded-notes">
            <h2>Uploaded Notes</h2>
            <ul>
              {uploadedNotes.map((note, index) => (
                <li key={index}>
                  <a href={note.link} target="_blank" rel="noopener noreferrer">{note.title}</a>
                </li>
              ))}
            </ul>
          </div>
           <div onClick={()=>{
            localStorage.removeItem('loginData');
            window.location.href = "/";
           }}>
              <span><LogoutOutlinedIcon color="red"/></span>
              <span>Logout</span>
             </div>
        </div>
            
        {/* Right side: Upload Actions and Announcement */}
        <div className="upload-section">
          <div className="admin-actions">
            <button  className="submit-button" onClick={() => setVideoModalOpen(true)}>
            Upload Video
          </button>
          <button  className="submit-button" onClick={() => setNoteModalOpen(true)}>
             Upload Notes
          </button>
           
          </div>

          <div className="announcement-section">
            <h2>Important Announcement</h2>
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Write important announcement here..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Upload Video Modal */}
      <UploadModal
        open={videoModalOpen}
        handleClose={() => setVideoModalOpen(false)}
        title="Upload YouTube Video"
        type="videos"
      />

      {/* Upload Notes Modal */}
      <UploadModal
        open={noteModalOpen}
        handleClose={() => setNoteModalOpen(false)}
        title="Upload Drive Notes"
        type="notes"
      />
    </div>
  );
};



export default AdminDashboard;