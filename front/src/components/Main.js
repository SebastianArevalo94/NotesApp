import React, { useEffect, useState } from "react";
import { NoteCard } from "./NoteCard";
import { Box, Button } from "@mui/material";
import { DeleteNoteHTTP, GetNotesByUserHTTP } from "../services/Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddNote } from "./AddNote";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  

  const [idToDelete, setIdToDelete] = useState(0);

  const handleOpenAddNote = () => setOpenAddNote(true);
  const handleCloseAddNote = () => setOpenAddNote(false);

  //const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleNoteAdded = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    GetNotesByUserHTTP(userId)
      .then((resp) => {
        console.log(resp);
        setNotes(resp);
      })
      .catch();
  }, [refresh]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{ marginTop: 10, marginRight: 10 }}
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleOpenAddNote}
        >
          Agregar Nueva Nota
        </Button>
      </Box>

      <AddNote
        openAddNote={openAddNote}
        handleCloseAddNote={handleCloseAddNote}
        onNoteAdded={handleNoteAdded}
      />

      <Box
        sx={{
          marginTop: 5,
          marginLeft: 5,
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {notes.map((note, index) => (
          <NoteCard
           key={index}
            id={note.id}
            title={note.title}
            content={note.content}
            onNoteAdded={handleNoteAdded}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Main;
