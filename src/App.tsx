import React from 'react';
import { BrowserRouter, Router } from "react-router-dom";
import { history } from "./utils";
import './styles/app.scss';
import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Router history={ history }>
                <Provider store={ store }>
                    <div className="container-fluid">
                    </div>
                </Provider>
            </Router>
        </BrowserRouter>
    );
};

export default App;
