import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css'
import reducer from './reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware  from './middlewares';

const store = createStore(reducer, middleware);



// Attach the store to the window object only in development or testing mode
if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
