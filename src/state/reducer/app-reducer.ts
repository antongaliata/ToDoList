import {Dispatch} from "redux";
import {authAPI} from "../requests/apiRequests";
import {handlerServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";


export type StatusApiRequestType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: "loading" as StatusApiRequestType,
    error: '',
    initializeApp: false

}
type InitialStateType = {
    status: StatusApiRequestType
    error: string | null
    initializeApp: boolean
}


export type setAppStatusType = {
    type: 'APP/REQUEST-STATUS'
    status: StatusApiRequestType
}

export type setAppErrorType = {
    type: 'APP/SET-ERROR'
    error: string | null
}

export type initializeAppType = {
    type: 'APP/INITIALIZE-APP'
    initializeApp: boolean
}

type ActionType = setAppStatusType | setAppErrorType | initializeAppType


export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'APP/REQUEST-STATUS' : {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR' : {
            return {...state, error: action.error}
        }
        case 'APP/INITIALIZE-APP' : {
            return {...state, initializeApp: action.initializeApp}
        }
        default :
            return state
    }
}

export const setAppStatusAC = (status: StatusApiRequestType): setAppStatusType => {
    return {type: 'APP/REQUEST-STATUS', status}
}
export const setAppErrorAC = (error: string | null): setAppErrorType => {
    return {type: 'APP/SET-ERROR', error}
}

export const initializeAppAC = (initializeApp: boolean): initializeAppType => {
    return {type: 'APP/INITIALIZE-APP', initializeApp}
}


export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.authMe()
            .then(res => {
                if (!res.data.resultCode) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(initializeAppAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    dispatch(setAppStatusAC('failed'))
                }
                dispatch(initializeAppAC(true))
            })
            .catch((error) => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}