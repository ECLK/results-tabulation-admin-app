import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import './styles/app.scss';
import { useDispatch } from "react-redux";
import { AppConfig } from "./configs";
import { sendSignInRequest, sendSignOutRequest } from "./store/actions";
import { ProtectedRoute, Users } from "./components";

const appConfig = new AppConfig();

const App: React.FC = () => {

    const dispatch = useDispatch();

    return (
        <div className="container-fluid">
            <Switch>
                <Redirect exact path="/" to={ appConfig.loginPath }/>
                <Route path={ appConfig.loginPath } render={ () => {
                    dispatch(sendSignInRequest());
                    return null;
                } }/>
                <Route path="/logout" render={ () => {
                    dispatch(sendSignOutRequest());
                    return null;
                } }/>
                <ProtectedRoute
                    component={ Users }
                    path="/overview"
                />
            </Switch>
        </div>
    );
};

export default App;
