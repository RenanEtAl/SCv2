import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

const jsx = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));

serviceWorker.unregister();
