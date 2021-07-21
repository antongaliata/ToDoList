import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
    entityStatus: boolean
}

export const AddItemForm = React.memo(function (props: AddItemFormType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
        } else {
            setError("error")
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== '') {
            setError('')
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return <div>
        <TextField
            size="small"
            variant="outlined"
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
            disabled={props.entityStatus}
        />
        <IconButton onClick={addItem} disabled={props.entityStatus }> <AddBox/> </IconButton>
    </div>

})