import { Alert, Button, Card, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { TodoModel } from "../models/TodoModel";
import useTodoStore from "../store/store";
import { AddTodoDialog } from "./AddTodoDialog";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from 'uuid';

export const TodoList = () => {
    
    const {todos, setTodos, updateTodoItem, addTodoItem,deleteTodoItem} = useTodoStore(); //zustand store

    const filterTodos = (filterValue:string): TodoModel[]  =>{
        switch (filterValue)
        {
            case "COMPLETE":
                return todos.filter(x => x.IsComplete == true)
            case "INCOMPLETE":
                return todos.filter(x => x.IsComplete == false)
            case "ALL":
            default:
                return todos;
        }
    }
    const [todofilter, setTodoFilter] = useState("ALL");
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [loading, setLoading] = useState(true);
    const [error, setError] =  useState(false)

    useEffect(() =>
    {
        if(loading)
        {
           axios.get('http://localhost:4000/todos')
           .then((response) =>{
                setTodos(response.data)
           })
           .catch(error =>{
                console.log("Error Fetching Todos: ",error)
                setError(true);
            }).finally(() =>{
                setLoading(false);
            })
        }
        setFilteredTodos(filterTodos(todofilter));
    }, [todofilter,todos])

    const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        let newFilter:string = e.target.value;
        setTodoFilter(newFilter);
        // console.log("Filter is now: "+todofilter);
        // let filterResult = filterTodos(todofilter);
        // console.log(todofilter+ " = "+JSON.stringify(filterResult));
        // setFilteredTodos(filterResult);
        // console.log("After Setting Filtered = "+ JSON.stringify(filteredTodos));

        /**
         * NOTE: The above code didnt work, because I was setting the todoFilter
         * and immediately trying to read its value, which resulted in the initial values being read
         * 
         * This happens because set state methods are asyncronous, so results are not guaranteed immediately. Another reason is functio closures
         * 
         * What you rather need to do is make use of side effects, and add the todofilter as a dependency of the side effect (in the array)
         * such that the side effect is run whenever a mutation is attempted on the the todofilter state variable
         * 
         * Then you put the function "setFilteredTodos" that depended on the new result in the side effect, that way every time you mutate
         * the "todoFilter" state variable, it will trigger the side effect and run the "setFilteredTodos" method and re-render.
         * 
         * 
         */
    }

    const updateTodoList = (todo: TodoModel) =>
    {
        updateTodoItem(todo);
    }

    const DeleteTodoFromList = (todo: TodoModel) =>
    {
        deleteTodoItem(todo);
    }

    const AddTodoItem = (todoName: string) =>
    {
        addTodoItem({Name:todoName, IsComplete:false,Id:uuidv4()});
    }
    
    if(loading)
        return <Typography variant="body1" color={grey[400]}>Loading . . . </Typography>
    if(error)
        return <Typography variant="body1" color={red[400]}>An error occured while fetching todos</Typography>
    return (
        <>
            <Stack spacing={2}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <Card sx={{padding:2}}>
                            <FormControl>
                                <FormLabel id="todo-filter-controls">Filter By</FormLabel>
                                <RadioGroup name="filter-radios" value={todofilter} onChange={changeFilter} row aria-labelledby="todo-filter-controls">
                                    <FormControlLabel value="ALL" control={<Radio />} label="All" checked = {todofilter == "ALL" ? true: false}/>
                                    <FormControlLabel value="COMPLETE" control={<Radio />} label="Completed" checked = {todofilter == "COMPLETE" ? true: false}/>
                                    <FormControlLabel value="INCOMPLETE" control={<Radio />} label="Not Completed" checked = {todofilter == "INCOMPLETE" ? true: false}/>
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>
                    <Grid item md={2} alignItems="center">
                        <Card sx={{padding:1.5}}>
                            <div style={{ display:'flex', justifyContent:'center' }}>
                                <AddTodoDialog addTodo={AddTodoItem}/>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
                <Card sx={{padding:2, maxHeight:"70vh", overflow:'auto', scrollbarWidth:"thin"}} >
                {
                    filteredTodos.length > 0 ? filteredTodos.map((todo,index) =>{
                        return (
                        <>
                            <Todo todo={todo} UpdateTodo={updateTodoList} DeleteTodo={DeleteTodoFromList} key={todo.Id}/>
                            <Divider/>
                        </>
                        );
                    }) : <Typography variant="body1" sx = {{fontStyle:'italic', fontFamily:'monospace', color: grey[400]}} >No items to show</Typography>
                }
                </Card>
            </Stack>
            
        </>
    );
    
}