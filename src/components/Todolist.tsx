import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {FilterValuesType} from './AppWithRedux';
import '../style/App.css';
import '../style/todolist.css'
import {AddItemForm} from "./AddItemForm";
import {EdiTableTitle} from "./EdiTableTitle";
import {Button, ButtonGroup, Checkbox, CircularProgress, IconButton, Paper} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {fetchTaskTC} from "../state/reducer/tasks-reducer";
import {useDispatch} from "react-redux";
import {StatusApiRequestType} from "../state/reducer/app-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    entityStatus: StatusApiRequestType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
    id: string
    deleteTodoList: (id: string) => void
    changeHandlerTitle: (newTitle: string, id: string) => void
    changeHandlerTaskTitle: (newTitle: string, id: string, idTask: string) => void
}


export const Todolist = React.memo(function (props: PropsType) {


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [])
    const buttonDelete = () => props.deleteTodoList(props.id);
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const onChangeTitle = (newTitle: string ) => props.changeHandlerTitle(newTitle, props.id);

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    const dispatch = useDispatch()

    useEffect(() => {
        const thunk = fetchTaskTC(props.id)
        dispatch(thunk)
    }, [])

    return <Paper elevation={5} className={'paper-todolist'}>
        {props.entityStatus === 'loading' &&
        <div className={'todolist-at-event'}>
            <CircularProgress size={70}
                              style={{position: 'absolute', top: '35%', left: '35%'}}/>
        </div>}
        <div className={'header_todolist'}>
            <EdiTableTitle title={props.title} onChange={onChangeTitle}/>
            <button className={'buttonDelete'} onClick={buttonDelete}
                    disabled={props.entityStatus === 'loading'}><span>&#10006;</span></button>
            <AddItemForm addItem={addTask} entityStatus={props.entityStatus === 'loading'}/>
        </div>
            <ul className={'wrapperTasks'}>
                {
                    tasksForTodolist.map(t => {
                        const onChangeTaskTitle = (newTitle: string) => {
                            return props.changeHandlerTaskTitle(newTitle, props.id, t.id);
                        }

                        const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        const onClickHandler = () => props.removeTask(t.id, props.id);
                        return <div key={t.id}>
                            <Checkbox checked={t.isDone} onChange={ChangeHandler} color="primary" size="small"/>
                            <span className={t.isDone ? "task_is_done" : ""}>
                            <EdiTableTitle title={t.title} onChange={onChangeTaskTitle}/>
                        </span>
                            <IconButton onClick={onClickHandler} size="small"
                                        disabled={props.entityStatus === 'loading'}> <Delete/></IconButton>
                        </div>
                    })
                }
            </ul>
        <div className={'wrapper-button-group'}>
            <div className={'button-group'}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"
                             size="small">
                    <Button color={props.filter === "all" ? "primary" : "inherit"} onClick={onAllClickHandler}
                    >All</Button>

                    <Button color={props.filter === "active" ? "primary" : "inherit"} onClick={onActiveClickHandler}
                    >Active
                    </Button>

                    <Button color={props.filter === "completed" ? "primary" : "inherit"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    </Paper>
})
























