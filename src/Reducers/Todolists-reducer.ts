import {TodoListType} from '../App';

export type RemoveTodolistAC = {
    type: "REMOVE-TODOLIST"
    id: string
}

export const todolistsReducer = (todolists: TodoListType[], action: any): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)

        default:
            return todolists

    }
}