// Courses.jsx
import axios from "axios";
import moment from 'moment'
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../utils/api-endpoints";


const mockVideos = [
  { id: 1, class: "10", subject: "Math", type: "Lecture", link: "https://www.youtube.com/embed/ysz5S6PUM-U" },
  { id: 2, class: "9", subject: "Science", type: "Demo", link: "https://www.youtube.com/embed/ysz5S6PUM-U" },
];

const mockNotes = [
  { id: 1, class: "10", subject: "Math", type: "PDF", link: "https://drive.google.com/file/d/12345/view" },
  { id: 2, class: "9", subject: "Science", type: "PDF", link: "https://drive.google.com/file/d/12345/view" },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [filters, setFilters] = useState({ class: "", subject: "" });
  const [allMaterial,setAllMaterial] = useState([])
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const [getAllSubjects,setAllSubjects] = useState([]);
    useEffect(()=>{
      const getSubjects = async() =>{
       const response = await axios.get(API_ENDPOINTS.GET_ALL_SUBJECTS);
       const data = response.data?.data;
       setAllSubjects(data);
       console.log(data,"jkhiieidw")
      }
      getSubjects();
    },[])
    console.log(getAllSubjects ,"RUBBBBYYYY")
   useEffect(()=>{
    const getAllUploads = async ()=>{
      const response = await axios.get(API_ENDPOINTS.GET_ALL_UPLOADS);
       console.log(response,"CHECKKKKK::::::::::::::::::::::")
          setAllMaterial(response.data?.data);
    }
    getAllUploads();
   },[])
  const filteredVideos = (allMaterial||[]).filter(
    (v) =>  v.uploadType === "video"
  );

  const filteredNotes = (allMaterial||[]).filter(
    (n) => n.uploadType === "notes"
  );

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={activeTab === "videos" ? "active" : ""}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>

      <div className="filters">
        <select name="class" onChange={handleFilterChange} value={filters.class}>
          <option value="">All Classes</option>
          {["UPSC","Current Affairs","Other Competitive Exams","VI", "VII", "VIII", "IX", "X", "XI", "XII"].map((cls) => (
            <option key={cls} value={cls}>{`Class ${cls}`}</option>
          ))}
        </select>
        <select name="subject" onChange={handleFilterChange} value={filters.subject}>
          <option value="">All Subjects</option>
          {(getAllSubjects||[]).map((sub) => (
            <option key={sub?._id} value={sub?.subjectName}>{sub?.subjectName}</option>
          ))}
        </select>
       
      </div>

      <div className="content">
        {activeTab === "videos" ? (
          <div className="grid">
            {filteredVideos.map((video) => 
            {
              const formatted = moment(video?.createdAt).format("DD/MM/YYYY");
            return(
              <div key={video._id} className="card">
                <iframe src={`https://www.youtube.com/embed/${video?.uploadLink}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                 <div style={{display:"flex",justifyContent:"space-between"}}><span>{video.subject} - Class {video.className}</span> <span>{formatted}</span></div>
               
              </div>
            )
})}
          </div>
        ) : (
          <div className="grid">
            {filteredNotes.map((note) => {
              const formatted = moment(note?.createdAt).format("DD/MM/YYYY");
            return(
              <div key={note._id} className="card">
                <a href={note.uploadLink} target="_blank" rel="noopener noreferrer">
                  Open {note?.subtype}
                </a>
                 <div style={{display:"flex",justifyContent:"space-between"}}><span>{note.subject} - Class {note.className}</span> <span>{formatted}</span></div>
               
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
