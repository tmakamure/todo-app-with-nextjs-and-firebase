import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit'
import { ITodoDialogComponent } from "../interfaces/components/ITodoDialogComponent";


export const EditTodoDialog = ({value,modifyTodo: updateTodoName}:ITodoDialogComponent) =>{
    const [isOpen,SetIsOpen] = useState(false);
    const [todoName,setTodoName] = useState(value.Name);
    //mutators
    const handleOpen = () =>{
        SetIsOpen(true);
    }

    const handleClose = () => {
        SetIsOpen(false);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setTodoName(e.target.value);
    }

    const handleSubmit = () =>{
        updateTodoName(todoName);
        handleClose();
    }

    useEffect(() =>{

    },[todoName]);
    return(
        <>
            <Button size="small" variant="contained" onClick={handleOpen} sx={{ borderRadius: 25 }}><EditIcon/></Button>
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <DialogTitle>Edit Todo [{value.Id}]</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="todoValue"
                        label="Todo name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={todoName}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

