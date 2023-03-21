import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionTypes = RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistTitleAT |
    ChangeTodolistFilterAT

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
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string
    filter: FilterValuesType
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
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
        default:
            return todolists

    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistAT => ({
    type: 'REMOVE-TODOLIST',
    id:todolistID
})


export const AddTodolist = (title: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    title: title,
})

export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistID: todolistID,
    newTitle: newTitle
})

export const ChangeTodolistFilterAC = (todolistID: string, newFilter: FilterValuesType): ChangeTodolistFilterAT => ({
 type: 'CHANGE-TODOLIST-FILTER',
 todolistID: todolistID,
 filter: newFilter
})