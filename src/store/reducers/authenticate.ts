
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

import { AuthenticateSessionUtil, AuthenticateTokenKeys, AuthenticateUserKeys } from "@wso2is/authenticate";
import {
    ApiActionTypes,
    AuthenticateActionTypes,
    RESET_AUTHENTICATION,
    SET_SIGN_IN,
    SET_SIGN_OUT
} from "../actions/types";
import { AppConfig } from "../../configs";

const appConfig = new AppConfig();

/**
 * Initial authenticate state.
 */
const initialState = {
    displayName: "",
    emails: "",
    isAuth: false,
    location: appConfig.homePath,
    loginInit: false,
    logoutInit: false,
    username: ""
};

/**
 * Reducer to handle the state of authentication related actions.
 *
 * @param state - Previous state
 * @param action - Action type
 * @returns The new state
 */
export function authenticateReducer(
    state = initialState, action: AuthenticateActionTypes | ApiActionTypes
) {
    switch (action.type) {
        case SET_SIGN_IN:
            if (AuthenticateSessionUtil.getSessionParameter(AuthenticateTokenKeys.ACCESS_TOKEN)) {
                return {
                    ...state,
                    displayName: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.DISPLAY_NAME),
                    emails: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.EMAIL),
                    isAuth: true,
                    loginInit: true,
                    logoutInit: false,
                    username: AuthenticateSessionUtil.getSessionParameter(AuthenticateUserKeys.USERNAME),
                };
            }
        case SET_SIGN_OUT:
            return {
                ...state,
                loginInit: false,
                logoutInit: true
            };
        case RESET_AUTHENTICATION:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
