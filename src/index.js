import React from 'react';
import ReactDOM from 'react-dom/client';
import thunk from "redux-thunk";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import {BrowserRouter} from "react-router-dom";
import HeadProvider from "./providers/HeadProvider";

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <HeadProvider>
                        <App/>
                    </HeadProvider>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
