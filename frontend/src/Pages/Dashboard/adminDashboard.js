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
        </div>

        {/* Right side: Upload Actions and Announcement */}
        <div className="upload-section">
          <div className="admin-actions">
            <Button variant="contained" onClick={() => setVideoModalOpen(true)}>
              Upload Video
            </Button>
            <Button variant="contained" onClick={() => setNoteModalOpen(true)}>
              Upload Notes
            </Button>
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
        type="video"
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

const UploadModal = ({ open, handleClose, title, type }) => {
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className="modal-content">
        <TextField
          label={type === "video" ? "YouTube Link" : "Drive Link"}
          fullWidth
          margin="normal"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Class</InputLabel>
          <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
            {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
              <MenuItem key={cls} value={cls}>{`Class ${cls}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Subject"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminDashboard;