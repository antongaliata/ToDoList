import {ErrorSnackbar} from "./Snackbar";
import {
    AppBar,
    Button, CircularProgress,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./login";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../reducer/store";
import {fetchTodoListsTC, StatusApiRequestType} from "../reducer/app-reducer";
import AppWithRedux from "./AppWithRedux";
import {logoutTC} from "../reducer/auth-reducer";

export const App = () => {
    const appStatus = useSelector<AppRootStateType, StatusApiRequestType>(state => state.app.status)
    const initializeApp = useSelector<AppRootStateType, boolean>(state => state.app.initializeApp)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const logout = () => {
        dispatch(logoutTC())
    }

    if (!initializeApp) {
        return <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: "center",
            display: 'flex',
            justifyContent: 'center',
        }}>
            <CircularProgress size={120}/></div>
    }

    return <div className="App">
        <AppBar position="static">
            <Toolbar style={{display: 'flex', justifyContent: 'space-between', background: '#4B4453'}}>
                <Typography variant="h4">Todolist</Typography>
                {isLoggedIn ? <Button color="inherit" onClick={logout}>sign out</Button> : null}
            </Toolbar>
        </AppBar>
        <div style={{height: '4px', width: '100%'}}>
            {appStatus === 'loading' && <LinearProgress style={{color: '#B39CD0'}}/>}
        </div>
        <ErrorSnackbar/>
        <Switch>
            <Route exact path={'/'} render={() => <AppWithRedux/>}/>
            <Route exact path={'/login'} render={() => <Login isLoggedIn={isLoggedIn}/>}/>
            <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
            <Redirect from={'*'} to={'/404'}/>
        </Switch>
    </div>
}