import { TodoModel } from "../../models/TodoModel"

export interface ITodoDialogComponent
{
    value: TodoModel

    //the one to set/delete the todo it self
    modifyTodo: any
}