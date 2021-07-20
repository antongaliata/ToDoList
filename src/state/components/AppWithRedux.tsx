import React, {useCallback, useEffect} from 'react';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {Grid} from "@material-ui/core";
import {
    ChangeTodoListFilterAC, fetchCreateTodoList, fetchDeleteTodolist, fetchTodoListsTC, fetchUpdateTodolist
} from "../reducer/todolists-reducer";
import {
    fetchCreateTask, fetchDeleteTask, fetchUpdateTask,
    taskStatusAC
} from "../reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../reducer/store";
import {StatusApiRequestType} from "../reducer/app-reducer";
import {Redirect} from "react-router-dom";


export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: StatusApiRequestType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchTodoListsTC())
    }, [])


    const removeTask = useCallback((id: string, todoListId: string) => {
        const thunk = fetchDeleteTask(todoListId, id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        const thunk = fetchCreateTask(todoListId, title)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        const action = taskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }, [])

    const changeHandlerTaskTitle = useCallback((newTitle: string, idTodoList: string, idTask: string) => {
        const thunk = fetchUpdateTask(idTodoList, idTask, newTitle)
        dispatch(thunk);
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, id: string) => {
        const action = ChangeTodoListFilterAC(id, value)
        dispatch(action)
    }, [])

    const removeTodoList = useCallback((id: string) => {
        const actionThunk = fetchDeleteTodolist(id)
        dispatch(actionThunk)
    }, [])

    const addTodoList = useCallback((title: string) => {
        const actionThunk = fetchCreateTodoList(title)
        dispatch(actionThunk)
    }, [])

    const changeHandlerTodoListTitle = useCallback((newTitle: string, id: string) => {
        const actionThunk = fetchUpdateTodolist(id, newTitle)
        dispatch(actionThunk)
    }, [])

    if(!isLoggedIn){
        return <Redirect to={'/login'}/>
    }

    return <div style={{paddingLeft: '1%'}}>
        <h3>Add Todolist</h3>
        <AddItemForm addItem={addTodoList} entityStatus={false}/>
        <Grid container={true} style={{padding: '20px'}}>
            {todoLists.map((tl) => {
                const tasksForTodolist = tasks[tl.id];
                return <Grid item key={tl.id}>
                        <Todolist
                            changeHandlerTaskTitle={changeHandlerTaskTitle}
                            changeHandlerTitle={changeHandlerTodoListTitle}
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            deleteTodoList={removeTodoList}
                            entityStatus={tl.entityStatus}/>
                </Grid>
            })}
        </Grid>
    </div>
}

export default AppWithRedux;
