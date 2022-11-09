import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ITodoDialogComponent } from "../interfaces/components/ITodoDialogComponent";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Stack } from "@mui/system";

interface IAddTodoDialogueComponent
{
    addTodo: any
}
export const AddTodoDialog =  ({addTodo}:IAddTodoDialogueComponent) => {
    
    const [isOpen,SetIsOpen] = useState(false);
    const [todoName,SetTodoName] = useState("");

    //mutators
    const handleOpen = () =>{
        SetIsOpen(true);
    }
    const handleClose = () => {
        SetIsOpen(false);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        SetTodoName(e.target.value);
    }

    const handleSubmit = () =>{
        addTodo(todoName);
        SetTodoName("");
        handleClose();
    }

    return(
        <>
            <Stack spacing={1}>
                <Typography variant="body1">Add Todo</Typography>
                <Button variant="contained" onClick={handleOpen} color="success" size="large" sx={{ borderRadius: 25 }}><NoteAddIcon/></Button>
            </Stack>
            <Dialog open={isOpen} onClose={handleClose} fullWidth>
                <DialogTitle>Add Todo</DialogTitle>
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
                        placeholder="Type in a todo e.g Wash the dishes"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}