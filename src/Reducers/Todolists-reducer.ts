import {TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

export const todolistsReducer = (todolists: TodoListType[], action: RemoveTodolistAT | AddTodolistAT): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]
        default:
            return todolists

    }
}