import {TasksStateType} from '../components/AppWithRedux';
import {
    AddTodoListActionType,
    RemoveTodoListActionType, setTodoListEntityStatusAC,
    SetTodoListsActionType,

} from './todolists-reducer'
import {Dispatch} from "redux";
import {taskAPI} from "../requests/apiRequests";
import {TaskType} from "../components/Todolist";
import {handlerServerError, handlerServerNetworkError} from "../utils/error-utils";


export type RemoveActionCreatorType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionCreatorType = {
    type: 'ADD-TASK'
    titleTask: string
    todolistId: string
    taskId: string
}

export type TaskStatusActionCreatorType = {
    type: 'TASK-STATUS'
    taskId: string
    todolistId: string
    taskStatus: boolean
}

export type ChangeTitleTaskActionCreatorType = {
    type: 'CHANGE-TITLE'
    taskId: string
    todolistId: string
    taskTitle: string
}


export type SetTaskActionCreatorType = {
    type: 'SET-TASK'
    task: Array<TaskType>
    todoListId: string
}


type ActionType =
    RemoveActionCreatorType
    | AddTaskActionCreatorType
    | TaskStatusActionCreatorType
    | ChangeTitleTaskActionCreatorType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTaskActionCreatorType


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {

            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId];
            copyState[action.todolistId] = todolistTasks.filter(t => t.id !== action.taskId);
            return copyState
        }
        case 'ADD-TASK' : {

            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId];
            const NewTask = {id: action.taskId, title: action.titleTask, isDone: false};
            copyState[action.todolistId] = [NewTask, ...todolistTasks];
            return copyState
        }
        case 'TASK-STATUS' : {

            const copyState = {...state}
            const todolistTasks = copyState[action.todolistId];
            const task = todolistTasks.find((t) => t.id === action.taskId);
            if (task) {
                task.isDone = action.taskStatus;
            }
            copyState[action.todolistId] = [...todolistTasks]
            return copyState
        }
        case 'CHANGE-TITLE' : {
            const copyState = {...state}
            const todoLists = copyState[action.todolistId]
            const todoList = todoLists.find((t) => t.id === action.taskId);
            if (todoList) {
                todoList.title = action.taskTitle;
                copyState[action.todolistId] = [...todoLists]
            }
            return copyState
        }
        case 'ADD-TODOLIST' : {
            const copyState = {...state}
            return {...copyState, [action.todoList.id]: []}
        }
        case 'REMOVE-TODOLIST' : {
            const copyState = {...state}
            delete copyState[action.id]
            return {...copyState}
        }

        case 'SET-TODO-LISTS' : {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'SET-TASK' : {
            const copyState = {...state}
            copyState[action.todoListId] = action.task
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveActionCreatorType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (titleTask: string, todolistId: string, taskId: string): AddTaskActionCreatorType => {
    return {type: 'ADD-TASK', titleTask: titleTask, todolistId: todolistId, taskId}
}

export const taskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): TaskStatusActionCreatorType => {
    return {type: 'TASK-STATUS', taskId: taskId, todolistId: todolistId, taskStatus: taskStatus}
}

export const taskTitleAC = (taskId: string, todolistId: string, taskTitle: string): ChangeTitleTaskActionCreatorType => {
    return {type: "CHANGE-TITLE", taskId, taskTitle, todolistId}
}

export const setTaskAC = (task: Array<TaskType>, todoListId: string): SetTaskActionCreatorType => {
    return {type: 'SET-TASK', task, todoListId}

}

export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        taskAPI.GetTask(todolistId)
            .then(res => {
                const tasks = res.data.items
                const action = setTaskAC(tasks, todolistId)
                dispatch(action)
                dispatch(setTodoListEntityStatusAC('idle', todolistId))
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchCreateTask = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        taskAPI.CreateTask(todolistId, title)
            .then(res => {
                if (!res.data.messages[0]) {
                    const action = addTaskAC(title, todolistId, res.data.data.item.id)
                    dispatch(action)
                    dispatch(setTodoListEntityStatusAC('idle', todolistId))
                    return;
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchDeleteTask = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        taskAPI.DeleteTask(todolistId, taskId)
            .then((res) => {
                if (!res.data.messages[0]) {
                    const action = removeTaskAC(taskId, todolistId)
                    dispatch(action)
                    dispatch(setTodoListEntityStatusAC('idle', todolistId))
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch(error => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchUpdateTask = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        taskAPI.UpdateTask(todolistId, taskId, title)
            .then((res) => {
                console.log(res.data.messages + ' update task')
                if (!res.data.messages[0]) {
                    console.log('true')
                    const action = taskTitleAC(taskId, todolistId, title)
                    dispatch(action)
                    dispatch(setTodoListEntityStatusAC('idle', todolistId))
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch(error => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}








