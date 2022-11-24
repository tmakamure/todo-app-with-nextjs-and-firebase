import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import { ITodoDialogComponent } from "../interfaces/components/ITodoDialogComponent";

export const DeleteTodoDialog = ({value,modifyTodo: deleteTodo}:ITodoDialogComponent) =>
{
    const [isOpen, SetIsOpen] = useState(false);
    const handleOpen = () =>{
        SetIsOpen(true);
    }

    const handleClose = () => {
        SetIsOpen(false);
    }

    const handleSubmit = () =>{
        deleteTodo(value.Id);
        handleClose();
    }
    return(
        <>
            <Button size="small" variant="contained" color="warning" onClick={handleOpen} sx={{ borderRadius: 25 }}><DeleteIcon/></Button>
            <Dialog open={isOpen} onClose={handleClose} >
                <DialogTitle>Delete Todo [{value.Id}]</DialogTitle>
                <DialogContent>
                    This action is irreversible, are you sure you want to delete?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="error">Yes, Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}