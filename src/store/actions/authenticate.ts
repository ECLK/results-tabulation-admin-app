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
    SET_SIGN_IN,
    SET_SIGN_OUT,
    RESET_AUTHENTICATION,
    SetSignInAction,
    SetSignOutAction,
    ResetAuthenticationAction,
    SEND_SIGN_OUT_REQUEST,
    SendSignInRequestAction,
    SEND_SIGN_IN_REQUEST,
    SendSignOutRequestAction,
} from "./types";

/**
 * Dispatches an action of type `SEND_SIGN_OUT_REQUEST`.
 */
export const sendSignInRequest = (): SendSignInRequestAction => ({
    type: SEND_SIGN_IN_REQUEST
});

/**
 * Dispatches an action of type `SET_SIGN_IN`.
 */
export const setSignIn = (): SetSignInAction => ({
    type: SET_SIGN_IN
});

/**
 * Dispatches an action of type `SEND_SIGN_OUT_REQUEST`.
 */
export const sendSignOutRequest = (): SendSignOutRequestAction => ({
    type: SEND_SIGN_OUT_REQUEST
});

/**
 * Dispatches an action of type `SET_SIGN_OUT`.
 */
export const setSignOut = (): SetSignOutAction => ({
    type: SET_SIGN_OUT
});

/**
 * Dispatches an action of type `RESET_AUTHENTICATION`.
 */
export const resetAuthentication = (): ResetAuthenticationAction => ({
    type: RESET_AUTHENTICATION
});
