import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './TodoList';
import EditableSpan from './EditableSpan';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler =
                (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
            const changeTaskTitleHandler = (title: string) =>
                props.changeTaskTitle(task.id, title, props.todoListId)
            return (
                <ListItem
                    disableGutters={true}
                    divider
                    secondaryAction={
                        <IconButton
                            size={'small'}
                            color={'secondary'}
                        >
                            <HighlightOffIcon onClick={removeTaskHandler}/>
                        </IconButton>
                    }
                    key={task.id}>
                    <Checkbox
                        size={'small'}
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan title={task.title} spanClasses={taskClasses} changeTitle={changeTaskTitleHandler}/>
                    {/*<button onClick={removeTaskHandler}>x</button>*/}
                    {/*<IconButton*/}
                    {/*size={'small'}*/}
                    {/*color={'secondary'}*/}
                    {/*>*/}
                    {/*    <HighlightOffIcon onClick={removeTaskHandler}/>*/}
                    {/*</IconButton>*/}
                </ListItem>
            )
        })
        : <span>Your taskslist is empty</span>
    return (
        <List
        disablePadding={false}>
            {tasksItems}
        </List>
    );
};

export default TasksList;