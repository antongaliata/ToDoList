import {Dispatch} from "redux";
import {setAppErrorType, setAppStatusAC, setAppStatusType} from "./app-reducer";
import {authAPI, LoginDataType} from "../requests/apiRequests";
import {handlerServerError, handlerServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN' : {
            return {...state, isLoggedIn: action.value}
        }
        default :
            return state
    }
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | setAppStatusType | setAppErrorType


export const setIsLoggedInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}


export const loginTC = (data: LoginDataType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.auth(data)
            .then(rec => {
                if (!rec.data.resultCode) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handlerServerError(dispatch, rec.data)
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch(error => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then(res => {
                if (!res.data.resultCode) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handlerServerError(dispatch, res.data)
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch(error => {
                handlerServerNetworkError(dispatch, error)
            })
    }
}




















