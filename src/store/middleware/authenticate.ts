/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {
    AuthenticateSessionUtil,
    AuthenticateTokenKeys,
    OPConfigurationUtil,
    SignInUtil,
    SignOutUtil
} from "../../libs/authenticate";
import { setSignIn, setSignOut } from "../actions";
import { AppConfig, RESOURCE_ENDPOINTS } from "../../configs";
import { getAuthenticationCallbackUrl, history } from "../../utils";
import { SEND_SIGN_IN_REQUEST, SEND_SIGN_OUT_REQUEST } from "../actions/types";

const appConfig = new AppConfig();

/**
 * Handle user sign-in attempt.
 *
 * @param {any} dispatch - `dispatch` function from redux.
 * @returns {(next) => (action) => any} Passes the action to the next middleware
 */
export const handleSignIn = ({ dispatch }) => (next) => (action) => {
    next(action);

    if (action.type !== SEND_SIGN_IN_REQUEST) {
        return;
    }

    const loginSuccessRedirect = () => {
        const AuthenticationCallbackUrl = getAuthenticationCallbackUrl();
        const location = ((!AuthenticationCallbackUrl)
            || (AuthenticationCallbackUrl === appConfig.loginPath)) ? appConfig.homePath : AuthenticationCallbackUrl;

        history.push(location);
    };

    const sendSignInRequest = () => {
        const requestParams = {
            clientHost: appConfig.clientHost,
            clientId: appConfig.clientID,
            clientSecret: appConfig.clientSecret,
            enablePKCE: false,
            redirectUri: appConfig.loginCallbackURL,
            scope: null,
        };
        if (SignInUtil.hasAuthorizationCode()) {
            SignInUtil.sendTokenRequest(requestParams)
                .then((response) => {
                    AuthenticateSessionUtil.initUserSession(response,
                        SignInUtil.getAuthenticatedUser(response.idToken));
                    dispatch(setSignIn());
                    loginSuccessRedirect();
                }).catch((error) => {
                throw error;
            });
        } else {
            SignInUtil.sendAuthorizationRequest(requestParams);
        }
    };

    if (AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)) {
        dispatch(setSignIn());
        loginSuccessRedirect();
    } else {
        OPConfigurationUtil.initOPConfiguration(RESOURCE_ENDPOINTS.wellKnown, false)
            .then(() => {
                sendSignInRequest();
            }).catch(() => {
            OPConfigurationUtil.setAuthorizeEndpoint(RESOURCE_ENDPOINTS.authorize);
            OPConfigurationUtil.setTokenEndpoint(RESOURCE_ENDPOINTS.token);
            OPConfigurationUtil.setRevokeTokenEndpoint(RESOURCE_ENDPOINTS.revoke);
            OPConfigurationUtil.setEndSessionEndpoint(RESOURCE_ENDPOINTS.logout);
            OPConfigurationUtil.setJwksUri(RESOURCE_ENDPOINTS.jwks);
            OPConfigurationUtil.setOPConfigInitiated();

            sendSignInRequest();
        });
    }
};

/**
 * Handle user sign-out attempt.
 *
 * @param {any} dispatch - `dispatch` function from redux.
 * @param {any} getState - Current  redux store state.
 * @returns {(next) => (action) => any} Passes the action to the next middleware
 */
export const handleSignOut = ({ dispatch, getState }) => (next) => (action) => {
    next(action);

    if (action.type !== SEND_SIGN_OUT_REQUEST) {
        return;
    }

    if (!getState().authenticate.logoutInit) {
        SignOutUtil.sendSignOutRequest(appConfig.loginCallbackURL).then(() => {
            dispatch(setSignOut());
            AuthenticateSessionUtil.endAuthenticatedSession();
            OPConfigurationUtil.resetOPConfiguration();
        }).catch(
            // TODO show error page.
        );
    } else {
        history.push(appConfig.loginPath);
    }
};

export const authenticateMiddleware = [
    handleSignIn,
    handleSignOut
];
