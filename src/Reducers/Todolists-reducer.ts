import {TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionTypes = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string
    newTitle: string
}

export const todolistsReducer = (todolists: TodoListType[], action: ActionTypes): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListId = v1()
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)

        default:
            return todolists

    }
}