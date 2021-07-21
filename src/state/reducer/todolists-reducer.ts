import {TodoListType, FilterValuesType} from '../components/AppWithRedux';
import {ResponseTodolistType, todoListsAPI} from "../requests/apiRequests";
import {Dispatch} from "redux";
import {setAppStatusAC, StatusApiRequestType} from "./app-reducer";
import {handlerServerError, handlerServerNetworkError} from "../utils/error-utils";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string | any
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoList: ResponseTodolistType
}


export type SetTodoListsActionType = {
    type: 'SET-TODO-LISTS'
    todoLists: Array<ResponseTodolistType>
}

type setTodoListEntityStatusType = {
    type: 'ENTITY-STATUS'
    entityStatus: StatusApiRequestType
    todolistId: string
}

type ActionType =
    RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListActionType
    | AddTodoListActionType
    | SetTodoListsActionType
    | setTodoListEntityStatusType


const initialState: Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let todoLists = state.filter((tl) => tl.id !== action.id);
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.id) {
                    delete state[i]
                }
            }
            return [...todoLists]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find((t) => t.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            state.find((tl) => {
                if (tl.id === action.id) {
                    tl.filter = action.filter;
                }
            })
            return [...state]
        }
        case 'ADD-TODOLIST' : {
            const newTodoList: TodoListType = {...action.todoList, filter: "all", entityStatus: "idle"}
            return [newTodoList, ...state ]
        }

        case 'SET-TODO-LISTS' : {
            return action.todoLists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        }

        case 'ENTITY-STATUS' : {
            state.find((tl) => {
                if (tl.id === action.todolistId) {
                    tl.entityStatus = action.entityStatus
                }
            })
            return [...state]
        }

        default:
            return state
    }
}


export const setTodoListEntityStatusAC = (entityStatus: StatusApiRequestType, todolistId: string): setTodoListEntityStatusType => {
    return {type: 'ENTITY-STATUS', todolistId, entityStatus}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const ChangeTodoListTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId,
        title: newTodolistTitle
    }
}

export const ChangeTodoListFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodoListActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId,
        filter: newFilter
    }
}

export const AddTodoListAC = (todoList: ResponseTodolistType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList: todoList}
}

export const setTodoListsAC = (todoLists: Array<ResponseTodolistType>): SetTodoListsActionType => {
    return {type: 'SET-TODO-LISTS', todoLists}
}


export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.GetTodolist()
            .then(data => {
                dispatch(setTodoListsAC(data.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchCreateTodoList = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.CreateTodolist(title)
            .then(res => {
                if (!res.data.messages[0]) {
                    dispatch(AddTodoListAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchDeleteTodolist = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        todoListsAPI.DeleteTodolist(todolistId)
            .then((res) => {
                if (!res.data.messages[0]) {
                    dispatch(RemoveTodolistAC(todolistId))
                    dispatch(setTodoListEntityStatusAC('idle', todolistId))
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const fetchUpdateTodolist = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setTodoListEntityStatusAC('loading', todolistId))
        todoListsAPI.UpdateTodolist(todolistId, title)
            .then((res) => {
                if (!res.data.messages[0]) {
                    dispatch(ChangeTodoListTitleAC(todolistId, title))
                    dispatch(setTodoListEntityStatusAC('idle', todolistId))
                } else {
                    handlerServerError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}
















