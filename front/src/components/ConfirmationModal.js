import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteNoteHTTP } from "../services/Notes";

export const ConfirmationModal = ({ open, handleClose, idDelete, onNoteAdded }) => {
  const handleDeleteNote = () => {
    DeleteNoteHTTP(idDelete)
      .then(() => {
        //console.log(resp);
        handleClose();
        onNoteAdded();
      })
      .catch();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Seguro que quieres eliminar la nota?
      </DialogTitle>
      {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent> */}
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" onClick={handleDeleteNote}>
          Si
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          autoFocus
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
