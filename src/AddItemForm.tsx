import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    maxLengthUserMessage: number
    addNewItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = ({
    maxLengthUserMessage,
    addNewItem
}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addNewItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addItem()


    const userErrorMessage = error && <div style={{color: "hotpink"}}>Title is required!</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: "hotpink"}}>Task title is to long!</div>
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    const onKeyDownHandler = isAddBtnDisabled ? undefined : onKeyDownAddItem
    return (
        <div>
            <input
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownHandler}
                className={inputErrorClasses}
            />
            {/*<button disabled={isAddBtnDisabled} onClick={addItem}>+</button>*/}
            <IconButton
                disabled={isAddBtnDisabled}
                size={'small'}
                color={'primary'}
            >
                <AddCircleOutlineIcon
                    onClick={addItem}/>
            </IconButton>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};

export default AddItemForm;