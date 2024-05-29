import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  TextField,
} from "@mui/material";
import { CreateNoteHTTP } from "../services/Notes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddNote = ({ openAddNote, handleCloseAddNote, onNoteAdded }) => {
  const initialNoteState = {
    userId: parseInt(localStorage.getItem("userId")),
    categoryId: 1,
    title: "",
    content: "",
    createdAt: new Date(),
    lastModified: new Date(),
  };

  const [newNote, setNewNote] = React.useState(initialNoteState);

  const handleInputChange = ({ target }) => {
    setNewNote({ ...newNote, [target.name]: target.value });
  };

  const handleSubmit = () => {

    setNewNote({ ...newNote, createdAt: new Date(), lastModified: new Date() });

    CreateNoteHTTP(newNote)
      .then((resp) => {
        //console.log(resp);
        handleCloseAddNote();
        setNewNote(initialNoteState);
      })
      .catch();

      onNoteAdded();
  };

  return (
    <div>
      <Modal
        open={openAddNote}
        onClose={handleCloseAddNote}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crear Nueva Nota
          </Typography>
          <FormControl style={{ display: "flex", gap: 20, marginTop: 20 }}>
            <Box>
              <TextField
                required
                name="title"
                fullWidth
                value={newNote.title}
                onChange={handleInputChange}
                id="title"
                label="Titulo"
              />
            </Box>

            <Box>
              <TextField
                required
                name="content"
                fullWidth
                value={newNote.content}
                onChange={handleInputChange}
                id="content"
                label="Contenido"
              />
            </Box>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Crear
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
