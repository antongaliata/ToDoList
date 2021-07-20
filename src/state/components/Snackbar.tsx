import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {setAppErrorAC} from "../reducer/app-reducer";
import {AppRootStateType} from "../reducer/store";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const dispatch = useDispatch()
    const errorMessage = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}
