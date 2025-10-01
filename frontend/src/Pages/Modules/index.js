import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUI } from "../../context/ui.context";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { address, API_ENDPOINTS } from "../../utils/api-endpoints";
import EmptyBox from "../../components/common/empty";

function AdminModule({ subjects, onCardClick }) {
  return (
    <div>
      {subjects.length > 0 ? (
        
            <div className="modules-grid">
              {
                subjects.map((subj) => (
          <div
            key={subj._id}
            className="module-card"
            onClick={() => onCardClick(subj)}
          >
            <img
              src={
                subj.thumbnailImage
                  ? `${address}/${subj.thumbnailImage.replace(/\\/g, "/")}`
                  : "https://via.placeholder.com/150"
              }
              alt={subj.subjectName}
              className="thumbnail"
            />
            <h4>{subj.subjectName}</h4>
            <p>Class: {subj.class}</p>
          </div>
        ))
              }
</div>
      ) : (
        <EmptyBox message={"No Subject is Available for your class"}/>
      )}
    </div>
  );
}

function StudentModule({ subjects, onCardClick }) {
  return (
    <div >
      {subjects.length > 0 ? (
        <div className="modules-grid">
          {
             subjects.map((subj) => (
          <div
            key={subj._id}
            className="module-card"
            onClick={() => onCardClick(subj)}
          >
            <img
              src={
                subj.thumbnailImage
                  ? `${address}/${subj.thumbnailImage.replace(/\\/g, "/")}`
                  : "https://via.placeholder.com/150"
              }
              alt={subj.subjectName}
              className="thumbnail"
            />
            <h4>{subj.subjectName}</h4>
          </div>
        ))
          }
        </div>
       
      ) : (
        <EmptyBox message={"No Subject is Available for your class"}/>
      )}
    </div>
  );
}

function Modules() {
  const { userData } = useUI();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (subj) => {
    navigate(`/modules/${subj.subjectName}/${subj._id}`);
  };

  useEffect(() => {
    if (!userData) return;

    let isMounted = true;

    const fetchSubjects = async () => {
      setLoading(true);
      const url = userData.isAdmin
        ? `${API_ENDPOINTS.GET_ALL_SUBJECTS}?userId=${userData._id}`
        : `${API_ENDPOINTS.GET_ALL_SUBJECTS}?class=${userData.class}`;

      try {
        const response = await axios.get(url);
        const data = response.data.allCourses || [];
        if (isMounted) setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSubjects();
    return () => {
      isMounted = false;
    };
  }, [userData?._id, userData?.class, userData?.isAdmin]);

  if (loading) return <p>Loading modules...</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white"}}>Modules</h2>
      {userData?.isAdmin ? (
        <AdminModule subjects={subjects} onCardClick={handleCardClick} />
      ) : (
        <StudentModule subjects={subjects} onCardClick={handleCardClick} />
      )}
    </div>
  );
}

export default Modules;
