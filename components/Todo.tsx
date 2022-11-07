import { Checkbox, Stack, Typography } from "@mui/material"
import { NextComponentType, NextPage } from "next"
import { FunctionComponent, useEffect, useState } from "react"
import { TodoModel } from "../models/TodoModel"

interface ITodoComponent
{
    //attributes
    todo: TodoModel,
    
    //methods
    onUpdate: any
}
export const Todo = ({todo,onUpdate: toggleIsComplete}: ITodoComponent) =>
{
    //state hooks
    //const [isComplete, setIsComplete] =  useState(todo.IsComplete);
    const [todoState, setTodoState] =  useState(todo);
    
    //state mutations
    const toggleTodo = () =>{
        setTodoState({...todoState,IsComplete:!todoState.IsComplete})
        
    }

    // //side effects
    useEffect(() => {
        toggleIsComplete(todoState); //we can do this because the above effects are not immediate
    },[todoState]);

    return (
        <div style={{display:'flex', flexDirection:'row', padding:4 }}>
            <Checkbox checked={todoState.IsComplete}  onChange = {toggleTodo} size = "small"/>
            <Typography variant="h5" sx={ todoState.IsComplete ? 
                {color:'grey', textDecorationLine: 'line-through'} : 
                {color: 'black', textDecorationLine: 'none'}}>
                {todoState.Name}
            </Typography>
        </div>
    );
}