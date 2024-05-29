import { url, GetNotesByUser, CreateNote, DeleteNote, GetNoteById, UpdateNote } from "../endpoints/endpoints";

export const GetNotesByUserHTTP = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url + GetNotesByUser + "/" + userId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const GetNoteByIdHTTP = async (noteId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url + GetNoteById + "/" + noteId, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const CreateNoteHTTP = async (note) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url + CreateNote, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const UpdateNoteHTTP = async (note) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url + UpdateNote + "/" + note.id, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const DeleteNoteHTTP = async (noteId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url + DeleteNote + "/" + noteId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //const json = await response.json();
    //return json;
  } catch (error) {
    return error;
  }
};