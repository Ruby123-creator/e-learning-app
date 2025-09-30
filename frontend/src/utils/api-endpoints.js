export const address = "http://localhost:8000";
export const baseUrl = `${address}/api`;

export const API_ENDPOINTS = {
  REGISTER: `${baseUrl}/user/register`,
  LOGIN: `${baseUrl}/user/loginuser`,
  MY_ACCOUNT: `${baseUrl}/user/myaccount`,
  VERIFY_USER: `${baseUrl}/user/verifyuser`,
  UPLOAD_MATERIAL: `${baseUrl}/upload`,
  GET_ALL_UPLOADS: `${baseUrl}/getUploads`,
  GET_ALL_SUBJECTS: `${baseUrl}/course/getAllSubjects`,
  GET_ALL_USERS: `${baseUrl}/user/getAllUsers`,
  UPDATE_STATUS: `${baseUrl}/user/updateStatus`,
  RESET_PASSWORD: `${baseUrl}/user/resetPassword`,
  FORGET_PASSWORD: `${baseUrl}/user/forgetPassword`,
  ADD_SUBJECT: `${baseUrl}/addSubject`,
  GET_ALL_CHAPTERS: `${baseUrl}/course/getAllChapters`,
  ADD_TOPICS: `${baseUrl}/addTopics`,
  ADD_CHAPTERS: `${baseUrl}/addChapters`,
};
