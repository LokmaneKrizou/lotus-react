import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './translation/i18n';
import {I18nextProvider} from 'react-i18next';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            </I18nextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
