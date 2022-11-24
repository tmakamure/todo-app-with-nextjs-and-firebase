import axios from 'axios';
import create from 'zustand'
import { TodoModel } from '../models/TodoModel'
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore"; 
import { db } from '../database/firestore';
import { TodoList } from '../components/ToDoList';

interface ITodoState
{
    todos: TodoModel[],
    setTodos: (todos: TodoModel[]) => void,
    updateTodoItem: (todo: TodoModel) => void,
    addTodoItem: (todo:TodoModel) => void,
    deleteTodoItem: (todo: TodoModel) => void

}

const useTodoStore = create<ITodoState>((set,get) =>({
    todos: [],
    setTodos: (newTodos) => set((state) => ({todos:newTodos})),
    updateTodoItem:  async (todo) =>
    {
        console.log("Updating with: ",todo);
        
        todo && todo.Id && setDoc(doc(db,"todos",todo.Id),{
          name: todo.Name,
          uid: todo.uid,
          isComplete: todo.IsComplete
        })
        .then(() =>{
          let updatedTodos = get().todos.map(x => x.Id == todo.Id? todo: x);
          set({todos:updatedTodos});
        }).catch (error => 
        {
          console.log("AN UPDATE ERROR: ",error)
        });
    },
    addTodoItem: async (todo) =>{
      try 
      {
        const todoDocRef = await addDoc(collection(db,"todos"),{
          name: todo.Name,
          uid: todo.uid,
          isComplete: todo.IsComplete
        });
        set({todos: [...get().todos,{...todo,Id:todoDocRef.id}]});
      } 
      catch (error) 
      {
        console.log("AN ERROR: ",error)
      }
    },
    deleteTodoItem: async (todo) =>{
      try 
      {
          if(todo && todo.Id)
          {
            await deleteDoc(doc(db,"todos",todo.Id));
            let updatedTodos = get().todos.filter(x => x.Id !== todo.Id);
            set({todos:updatedTodos});
          }
      } 
      catch (error) 
      {
        console.log("AN DELETE ERROR: ",error)
      }

    }
}));

export default useTodoStore;