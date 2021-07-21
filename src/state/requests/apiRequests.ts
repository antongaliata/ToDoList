import axios from "axios";
import {TaskType} from "../../components/Todolist";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3a123130-7eae-4888-b422-da332a4d5f0c'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})


export type ResponseTodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseAPI<D> = {
    data: D
    fieldsErrors?: []
    messages: Array<string>
    resultCode: number
}


export const todoListsAPI = {
    GetTodolist: () => instance.get<Array<ResponseTodolistType>>('todo-lists'),

    CreateTodolist: (title: string) => instance.post<ResponseAPI<{ item: ResponseTodolistType }>>('todo-lists', {title: title}),

    DeleteTodolist: (todolistId: string) => instance.delete<ResponseAPI<{}>>(`todo-lists/${todolistId}`),

    UpdateTodolist: (todolistId: string, title: string) => instance.put<ResponseAPI<{}>>(`todo-lists/${todolistId}`, {title: title})
}


export type responseTaskType = {
    addedDate: string
    deadline: null
    description: null
    id: string
    order: number
    priority: number
    startDate: null
    status: number
    title: string
    todoListId: string
}

type responseGetType<i> = {
    error: any
    items: Array<i>
    totalCount: number
}


export const taskAPI = {

    GetTask: (todolistId: string) => instance.get<responseGetType<TaskType>>(`/todo-lists/${todolistId}/tasks`),

    CreateTask: (todolistId: string, title: string) => instance.post<ResponseAPI<{ item: responseTaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: title}),

    DeleteTask: (todolistId: string, taskId: string) => instance.delete<ResponseAPI<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`),

    UpdateTask: (todolistId: string, taskId: string, title: string) => instance.put<ResponseAPI<responseTaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})

}

export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

type AuthMeType = {
    id: number,
    email: string,
    login: string
}


export const authAPI = {
    auth: (data: LoginDataType) => instance.post<ResponseAPI<{ userId?: number }>>('/auth/login', data),
    authMe: () => instance.get<ResponseAPI<AuthMeType>>('/auth/me'),
    logout: () => instance.delete<ResponseAPI<{}>>('/auth/login')
}

























