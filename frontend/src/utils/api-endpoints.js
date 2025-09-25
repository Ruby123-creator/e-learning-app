const baseUrl = "http://localhost:8000/api";

export const API_ENDPOINTS = {
  REGISTER: `${baseUrl}/user/register`,
  LOGIN: `${baseUrl}/user/loginuser`,
  MY_ACCOUNT: `${baseUrl}/user/myaccount`,
  VERIFY_USER: `${baseUrl}/user/verifyuser`,
  UPLOAD_MATERIAL: `${baseUrl}/upload`,
  GET_ALL_UPLOADS: `${baseUrl}/getUploads`,
  ADD_SUBJECT: `${baseUrl}/addSubject`,
  GET_ALL_SUBJECTS: `${baseUrl}/getAllSubjects`,
  GET_ALL_USERS: `${baseUrl}/getAllUsers`,

  RESET_PASSWORD: `${baseUrl}/user/resetPassword`,
  FORGET_PASSWORD: `${baseUrl}/user/forgetPassword`,
};
