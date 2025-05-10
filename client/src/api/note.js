import axiosInstance from "../utils/axiosInstance";

export const createNote = async (formData, token) => {
  return await axiosInstance.post("/notes/create", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserNotes = async (token) => {
  return await axiosInstance.get("/notes/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllNotes = async (token) => {
  return await axiosInstance.get("/notes/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editANote = async (noteId, formData, token) => {
  return await axiosInstance.patch(`/notes/${noteId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteANote = async (noteId, token) => {
  return await axiosInstance.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getANote = async (noteId, token) => {
  return await axiosInstance.get(`/notes/get/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
