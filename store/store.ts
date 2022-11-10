import axios from 'axios';
import create from 'zustand'
import { TodoModel } from '../models/TodoModel'

interface ITodoState
{
    todos: TodoModel[],
    setTodos: (todos: TodoModel[]) => void,
    updateTodoItem: (todo: TodoModel) => void,
    addTodoItem: (todo:TodoModel) => void,
    deleteTodoItem: (todo: TodoModel) => void

}

const useTodoStore = create<ITodoState>((set) =>({
    todos: [],
    setTodos: (newTodos) => set((state) => ({todos:newTodos})),
    updateTodoItem:  async (todo) =>{
      try 
      {
          console.log("Updating Todo: ",todo)
          const response =  await axios.put('http://localhost:4000/todos',todo);
          // axios({
          //   method: 'put',
          //   url: 'http://localhost:4000/todos',
          //   data: todo
          // });  
          console.log("After Update: ",response.data);
          set({todos: response.data});
      } 
      catch (error) 
      {
        console.log("AN ERROR: ",error)
        //set an error state?
        //maybe with popup notifications
      }

    },
    addTodoItem: async (todo) =>{
      try 
      {
          const response =  await axios.post('http://localhost:4000/todos',todo);
          // axios({
          //   method: 'post',
          //   url: 'http://localhost:4000/todos',
          //   data: todo
          // });  
          set({todos: response.data});
      } 
      catch (error) 
      {
        console.log("AN ERROR: ",error)
        //set an error state?
        //maybe with popup notifications
      }

    },
    deleteTodoItem: async (todo) =>{
      try 
      {
          const response =  await axios({
            method: 'delete',
            url: 'http://localhost:4000/todos',
            data: todo
          });  
          set({todos: response.data});
      } 
      catch (error) 
      {
        console.log("AN ERROR: ",error)
        //set an error state?
        //maybe with popup notifications
      }

    }
}));

export default useTodoStore;