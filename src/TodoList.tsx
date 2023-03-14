import React, {FC} from 'react';
import TasksList from './TasksList';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import Button from '@mui/material/Button';
import {IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList: FC<TodoListPropsType> = (props) => {

    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton
                    size={'small'}
                    color={'secondary'}
                >
                    <HighlightOffIcon onClick={removeTodoList}/>
                </IconButton>
            </h3>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask} />
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-btn-container">
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="all" ? 'secondary' : 'primary'}
                    onClick={handlerCreator('all')}
                >All</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="active" ? 'secondary' : 'primary'}
                    onClick={handlerCreator("active")}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="completed" ? 'secondary' : 'primary'}
                    onClick={handlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;