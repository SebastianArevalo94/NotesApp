import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmationModal } from "./ConfirmationModal";
import { UpdateNote } from "./UpdateNote";
import { GetNoteByIdHTTP } from "../services/Notes";

export const NoteCard = ({ id, title, content, onNoteAdded }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdateNote, setOpenUpdateNote] = useState(false);
  const [noteToUpdateData, setNoteToUpdateData] = useState({});

  const [idDelete, setIdDelete] = useState(0);
  const [idUpdate, setIdUpdate] = useState(0);

  const handleOpenModal = () => setOpenDelete(true);
  const handleClose = () => setOpenDelete(false);

  const handleOpenUpdateNote = () => setOpenUpdateNote(true);
  const handleCloseUpdateNote = () => setOpenUpdateNote(false);

  const handleGetNoteById = (idUpdate) => {
    GetNoteByIdHTTP(idUpdate)
      .then((resp) => {
        //console.log(resp);
        setNoteToUpdateData(resp);
        handleOpenUpdateNote();
      })
      .catch();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            //setIdUpdate(id);
            handleGetNoteById(id);
          }}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => {
            handleOpenModal();
            setIdDelete(id);
          }}
        >
          {" "}
          Eliminar
        </Button>
      </CardActions>
      <ConfirmationModal
        open={openDelete}
        handleClose={handleClose}
        idDelete={idDelete}
        onNoteAdded={onNoteAdded}
      />
      <UpdateNote
        openUpdateNote={openUpdateNote}
        handleCloseUpdateNote={handleCloseUpdateNote}
        idUpdate={idUpdate}
        noteState={noteToUpdateData}
        onNoteAdded={onNoteAdded}
      />
    </Card>
  );
};
