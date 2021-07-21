import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EdiTableTitlePropsType = {
    title: string
    onChange: (newTitle: string | undefined) => void
}

export function EdiTableTitle(props: EdiTableTitlePropsType) {

    let [editMode, setEditMode] = useState<boolean>()
    let [title, setTitle] = useState<string>()
    let [error, setError] = useState<boolean>(false)

    const activeEditMode = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const switchOfActiveEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length < 100) {
            setTitle(e.currentTarget.value)
            setError(false)
        } else {
            setError(true)
        }


    }

    return editMode
        ? <TextField size="small"
                     autoFocus={true}
                     onKeyDown={(e) => {
                         e.key === 'Enter' && switchOfActiveEditMode()
                     }}
                     onChange={titleHandler}
                     onBlur={switchOfActiveEditMode}
                     value={title}
                     color={error ? 'secondary' : 'primary'}
        />
        : <span onDoubleClick={activeEditMode} className={'title'}>{props.title}</span>
}