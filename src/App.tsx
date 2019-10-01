import React from 'react';
import { BrowserRouter, Router } from "react-router-dom";
import { history } from "./utils";
import './styles/app.scss';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Router history={ history }>
                <div className="container-fluid">
                </div>
            </Router>
        </BrowserRouter>
    );
};

export default App;
