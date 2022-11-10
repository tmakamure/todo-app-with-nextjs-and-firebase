import { Checkbox, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { TodoModel } from "../models/TodoModel"
import { DeleteTodoDialog } from "./DeleteTodoDialog"
import { EditTodoDialog } from "./EditTodoDialog"

interface ITodoComponent
{
    //attributes
    todo: TodoModel,
    
    //methods
    UpdateTodo: any,
    DeleteTodo: any
}
export const Todo = ({todo,UpdateTodo,DeleteTodo}: ITodoComponent) =>
{
    //state hooks
    const [todoState, setTodoState] =  useState(todo);
    const [isStateChange, setIsStateChange] = useState(false);
    
    //state mutations
    const toggleTodo = () =>{
        setIsStateChange(true);
        setTodoState({...todoState,IsComplete:!todoState.IsComplete})
    }
    const changeTodoName = (name:string) =>{
        setIsStateChange(true);
        setTodoState({...todoState,Name:name});
    }

    const deleteTodoFromList = () =>
    {
        setIsStateChange(true);
        setTodoState({...todoState,Name: null});
    }

    //side effects
    useEffect(() => 
    {
        console.log("TODO STATE CHANGE: "+isStateChange)
        if(isStateChange)
        {
            if(todoState.Name !== null)
                UpdateTodo(todoState); 
            else
                DeleteTodo(todoState)
        }
        
    },[todoState]);

    return (
        <>
            <Grid container spacing={1} padding={0.75}>
                <Grid item md={1}>
                    <Checkbox checked={todoState.IsComplete}  onChange = {toggleTodo} size = "small"/>
                </Grid>
                <Grid item md={7}>
                    <Typography variant="h6" sx={ todoState.IsComplete ? 
                        {color:'grey', textDecorationLine: 'line-through'} : 
                        {color: 'black', textDecorationLine: 'none'}}>
                        {todoState.Name}
                    </Typography>
                </Grid>
                <Grid item md={4}>
                    <Stack direction="row" spacing={0.5} justifyContent="left">
                        <EditTodoDialog value={todoState} modifyTodo={changeTodoName}/>
                        <DeleteTodoDialog value={todoState} modifyTodo={deleteTodoFromList} />
                    </Stack>
                </Grid>
            </Grid>
            
        </>
        );
}