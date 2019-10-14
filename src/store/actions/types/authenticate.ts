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

/**
 * Action type to handle the sign in requests
 *
 * @type {string}
 */
export const SEND_SIGN_IN_REQUEST = "SEND_SIGN_IN_REQUEST";

/**
 * Set sign-in request action interface.
 */
export interface SendSignInRequestAction {
    type: typeof SEND_SIGN_IN_REQUEST;
}

/**
 * Action type to handle the sign in.
 *
 * @type {string}
 */
export const SET_SIGN_IN = "SET_SIGN_IN";

/**
 * Set sign-in action interface.
 */
export interface SetSignInAction {
    type: typeof SET_SIGN_IN;
}

/**
 * Action type to handle the sign out requests.
 *
 * @type {string}
 */
export const SEND_SIGN_OUT_REQUEST = "SEND_SIGN_OUT_REQUEST";

/**
 * Set sign-out request action interface.
 */
export interface SendSignOutRequestAction {
    type: typeof SEND_SIGN_OUT_REQUEST;
}

/**
 * Action type to handle the sign out.
 *
 * @type {string}
 */
export const SET_SIGN_OUT = "SET_SIGN_OUT";

/**
 * Set sign-out action interface.
 */
export interface SetSignOutAction {
    type: typeof SET_SIGN_OUT;
}

/**
 * Action type to handle the reset authentication requests
 *
 * @type {string}
 */
export const RESET_AUTHENTICATION = "RESET_AUTHENTICATION";

/**
 * Reset authenticated session action interface.
 */
export interface ResetAuthenticationAction {
    type: typeof RESET_AUTHENTICATION;
}

/**
 * Action type to specify authentication actions.
 */
export type AuthenticateActionTypes =
    SendSignInRequestAction
    | SetSignInAction
    | SendSignOutRequestAction
    | SetSignOutAction
    | ResetAuthenticationAction;
