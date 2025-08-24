import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  AppBar,
} from "@mui/material";
import { useState } from "react";
import { API_ENDPOINTS } from "../../../utils/api-endpoints";
import toaster from "../../common/toaster";
import axios from "axios";

const UploadModal = ({ open, handleClose, title, type }) => {
  const [link, setLink] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("Math");
  const [accessible, setAccessible] = useState("");
  const [topic, setTopic] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [addSubject, setMoreSubject] = useState("");
  const [getAllSubjects,setAllSubjects] = useState([]);
  useEffect(()=>{
    const getSubjects = async() =>{
     const response = await axios.get(API_ENDPOINTS.GET_ALL_SUBJECTS);
     const data = response.data?.data;
     setAllSubjects(data);
     console.log(data,"jkhiieidw")
    }
    getSubjects();
  },[addSubject])
  console.log(getAllSubjects ,"RUBBBBYYYY")
const handleSubject = async() =>{
  try {
    const payload = {
  subjectName: addSubject,
}

const response = await axios.post(API_ENDPOINTS.ADD_SUBJECT,payload);
      toaster(response?.data?.message);

  } catch (error) {
    console.error(
        "Error during sign-up/login:",
        error?.response?.data?.message
      );
      toaster(error?.response?.data?.message);
  }

  setOpenModal(false);
}

  const handleSubmit = async () => {
    try {
      const payload = {
        uploadType: type,
        topic: topic,
        subtype: materialType,
        uploadLink: link,
        className: grade,
        subject: subject,
        isPublic: accessible === "Public" ? true : false,
      };

      const response = await axios.post(API_ENDPOINTS.UPLOAD_MATERIAL, payload);
      console.log("Response data:", response.data);

      //  if(response.data?.success){
      toaster(response?.data?.message);

      //  }
    } catch (error) {
      console.error(
        "Error during sign-up/login:",
        error?.response?.data?.message
      );
      toaster(error?.response?.data?.message);
    }
    handleClose(true);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className="modal-content">
          <form className="custom-form">
            <div className="form-group">
              <label>{type === "video" ? "YouTube Link" : "Drive Link"}</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Topic Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label> Type</label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                required
              >
                <option value="">Select Type</option>

                {type === "video"
                  ? ["Shorts", "Lectures"].map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))
                  : ["PYQ's", "Notes", "Practice Paper", "Mock Test"].map(
                      (cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      )
                    )}
              </select>
            </div>
            <div className="form-group">
              <label>Class</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <option value="">Select Class</option>
                {["VI", "VII", "VIII", "IX", "X", "XI", "XII"].map((cls) => (
                  <option key={cls} value={cls}>{`Class ${cls}`}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Subject</span>
                <span
                  style={{
                    color: "dodgerblue",
                    cursor: "pointer",
                    textDecoration: "underline",
                    font: "12px",
                  }}
                  onClick={()=>setOpenModal(true)}
                >
                  +Add Subject
                </span>
              </label>
  <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                {(getAllSubjects||[]).map((sub) => (
                  <option key={sub?._id} value={sub?.subjectName}>{sub?.subjectName}</option>
                ))}
              </select>
             
            </div>

            <div className="form-group">
              <label>Class</label>
              <select
                value={accessible}
                onChange={(e) => setAccessible(e.target.value)}
                required
              >
                <option value="">Accessibilty</option>
                {["Private", "Public"].map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <button className="submit-button" onClick={handleClose}>Cancel</button>
          <button
            type="submit"
            className="submit-button"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <DialogTitle>Add Subject</DialogTitle>
        <DialogContent>
          <div className="form-group">
            <label>Enter Subject</label>
            <input
              type="text"
              value={addSubject}
              onChange={(e) => setMoreSubject(e.target.value)}
              required
            />
          </div>
        </DialogContent>
         <DialogActions>
          <button
            type="submit"
            className="submit-button"
            onClick={() => {
                handleSubject()
            }}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadModal;
