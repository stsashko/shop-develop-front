import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ButtonWithLoading from "../ButtonWithLoading";
import Dialog from "@mui/material/Dialog";

export default ({confirmDelete, loading, setConfirmDelete, handleDelete}) => {
    return (
        <Dialog
            open={Boolean(confirmDelete)}
            onClose={() => setConfirmDelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you confirming the action?
            </DialogTitle>
            <DialogActions>
                <Button onClick={() => setConfirmDelete(false)}>No</Button>
                <ButtonWithLoading variant="text" onClick={() => handleDelete(confirmDelete)}
                                   loading={loading}>Yes</ButtonWithLoading>
            </DialogActions>
        </Dialog>
    );
}