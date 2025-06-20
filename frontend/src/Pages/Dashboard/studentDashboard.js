import React from "react";
import "./style.css"; // Custom styles

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <div className="dashboard-grid">
        {/* Uploaded Videos */}
        <Card title="Uploaded Videos">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video 1"
              allowFullScreen
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="YouTube video 2"
              allowFullScreen
            ></iframe>
          </div>
        </Card>

        {/* Uploaded Notes */}
        <Card title="Uploaded Notes">
          <ul className="link-list">
            <li><a href="https://drive.google.com/file/d/xyz" target="_blank" rel="noopener noreferrer">Math Notes</a></li>
            <li><a href="https://drive.google.com/file/d/abc" target="_blank" rel="noopener noreferrer">Science Notes</a></li>
          </ul>
        </Card>

        {/* Test Series */}
        <Card title="Test Series">
          <ul className="bullet-list">
            <li>Maths Test</li>
            <li>Science Test</li>
            <li>English Test</li>
          </ul>
        </Card>

        {/* Messages & Announcements */}
        <Card title="Messages & Announcements">
          <ul className="bullet-list">
            <li>New course available!</li>
            <li>Submit assignment by Friday</li>
          </ul>
        </Card>

        {/* Progress Tracker */}
        <Card title="Progress Tracker">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <p className="progress-text">70% course completed</p>
        </Card>

        {/* Events */}
        <Card title="Events">
          <ul className="bullet-list">
            <li>Webinar on AI - June 25</li>
            <li>Live Doubt Session - June 28</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="custom-card">
    <h2 className="card-title">{title}</h2>
    {children}
  </div>
);

export default StudentDashboard;
