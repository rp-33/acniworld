import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import combine from './reducers/';
import { ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store = {combine}>
        <ToastContainer 
            autoClose={4000}
            position={toast.POSITION.BOTTOM_LEFT}
        />
        <App />
    </Provider>
    
,document.getElementById('root'));

serviceWorker.unregister();