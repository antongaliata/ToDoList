import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from "../reducer/app-reducer";
import {Dispatch} from "redux";
import {ResponseAPI} from "../requests/apiRequests";


export const handlerServerError = <T>(dispatch: Dispatch<setAppStatusType | setAppErrorType>, data: ResponseAPI<T>) => {
    if (data.messages[0].length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handlerServerNetworkError = (dispatch: Dispatch<setAppStatusType | setAppErrorType>, error: any) => {
    dispatch(setAppErrorAC(error.messages ? error.messages : 'failed loading'))
    dispatch(setAppStatusAC('failed'))
}
