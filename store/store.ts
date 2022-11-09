import create from 'zustand'
import { TodoModel } from '../models/TodoModel'

interface ITodoState
{
    todos: TodoModel[],
    setTodos: (todos: TodoModel[]) => void
}

const useTodoStore = create<ITodoState>((set) =>({
    todos: [
        {
          Id: 1,
          Name : "Zustand Todo  0",
          IsComplete : false
        },
        {
          Id: 2,
          Name : " Zustand Todo  1",
          IsComplete : true
        },
        {
          Id: 3,
          Name : "Zustand Todo  2",
          IsComplete : false
        },
        {
          Id: 4,
          Name : "Zustand Todo  3",
          IsComplete : false
        }
    
      ],
    setTodos: (newTodos) => set((state) => ({todos:newTodos})) 
}));

export default useTodoStore;