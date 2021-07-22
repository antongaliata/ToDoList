import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./state/reducer/store";
import {App} from "./components/App";


ReactDOM.render(
    <Provider store={store}>
            <HashRouter>
            <App/>
            </HashRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
