import {useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  TextField,
} from "@mui/material";
import { CreateNoteHTTP, UpdateNoteHTTP } from "../services/Notes";

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

export const UpdateNote = ({ noteState, openUpdateNote, handleCloseUpdateNote, onNoteAdded}) => {
 
  const [noteData, setNoteData] = useState(noteState);

 
  const handleInputChange = ({ target }) => {
    setNoteData({ ...noteData, [target.name]: target.value });
  };

  const handleSubmit = () => {

    setNoteData({ ...noteData, lastModified: new Date() });

    UpdateNoteHTTP(noteData).then((resp)=>{
      //console.log(resp);
      handleCloseUpdateNote();
      onNoteAdded();
    }).catch();

    // CreateNoteHTTP(newNote)
    //   .then((resp) => {
    //     //console.log(resp);
    //     handleCloseAddNote();
    //     setNewNote(initialNoteState);
    //   })
    //   .catch();

    //   onNoteAdded();
  };

  useEffect(() => {
    setNoteData(noteState);
  }, [noteState]);


  return (
    <div>
      <Modal
        open={openUpdateNote}
        onClose={handleCloseUpdateNote}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Nota
          </Typography>
          <FormControl style={{ display: "flex", gap: 20, marginTop: 20 }}>
            <Box>
              <TextField
                required
                name="title"
                fullWidth
                value={noteData.title}
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
                value={noteData.content}
                onChange={handleInputChange}
                id="content"
                label="Contenido"
              />
            </Box>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Editar
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
