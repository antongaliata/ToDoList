import React, {useEffect, useState} from "react";
import {taskAPI, todoListsAPI} from "../requests/apiRequests";


export const GetTodolist = () => {
    const [state, setState] = useState()
    useEffect(() => {
        todoListsAPI.GetTodolist()
            .then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

// export const CreateTodolist = () => {
//     const [state, setState] = useState()
//     useEffect(() => {
//         todoListsAPI.CreateTodolist()
//             .then((data) => setState(data.data))
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }

export const UpdateTodolist = () => {
    let todolistId: string = '9ce5c9f6-9238-4dfb-b8a1-12c9f454f3ef'
    const [state, setState] = useState()
    useEffect(() => {
        todoListsAPI.UpdateTodolist(todolistId, 'TodolistSSSSSSSSS')
            .then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    let todolistId: string = '14a6531f-4132-40b9-bc9d-06f10e576c88'
    const [state, setState] = useState()
    useEffect(() => {
        todoListsAPI.DeleteTodolist(todolistId)
            .then((data) => setState(data.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const GetTask = () => {
    let todolistId: string = '8261f30f-217e-4386-8c6c-3f57c4d7f75f'
    const [state, setState] = useState()
    useEffect(()=>{
        taskAPI.GetTask(todolistId)
            .then((data)=> {

                setState(data.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    let todolistId: string = '8261f30f-217e-4386-8c6c-3f57c4d7f75f'
    const [state, setState] = useState()
    useEffect(()=>{
        taskAPI.CreateTask(todolistId, 'new task!!!!!')
            .then((data)=> {

                setState(data.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    let todolistId: string = '8261f30f-217e-4386-8c6c-3f57c4d7f75f'
    let taskId: string = '841763e9-4d32-4ba3-b2ae-c83867853be2'
    const [state, setState] = useState()
    useEffect(()=>{
        taskAPI.DeleteTask(todolistId, taskId)
            .then((data)=> {

                setState(data.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    let todolistId: string = '8261f30f-217e-4386-8c6c-3f57c4d7f75f'
    let taskId: string = '336870aa-bbe2-4e87-826f-3b45559cf1fd'
    const [state, setState] = useState()
    useEffect(()=>{
        taskAPI.UpdateTask(todolistId, taskId, 'TASKAAAA!!!!!!!!!!')
            .then((data)=> {
                setState(data.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

































