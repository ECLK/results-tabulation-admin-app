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

import axios from "axios";
import { apiRequestEnd, apiRequestStart } from "../actions";
import { API_REQUEST } from "../actions/types";
import { HttpMethods, HttpRequestConfig } from "../../models/api";

/**
 * Intercepts and handles actions of type `API_REQUEST`.
 *
 * @param {any} dispatch - `dispatch` function from redux
 * @returns {(next) => (action) => any} Passes the action to the next middleware
 */
export const apiMiddleware = ({ dispatch }: { dispatch: any}) => (next) => (action) => {
    next(action);

    if (action.type !== API_REQUEST) {
        return;
    }

    const { auth, dispatcher, headers, method, onSuccess, onError, url }: HttpRequestConfig = action.meta;
    const data: any = action.payload;

    // `GET` requests and `DELETE` requests usually has params rather than data.
    const dataOrParams: string = [HttpMethods.GET, HttpMethods.DELETE].includes(method as HttpMethods) ? "params" : "data";

    // `dispatcher` is the action which invoked the `API_REQUEST` action. This is
    // useful to show placeholders specific to certain API requests.
    if (dispatcher) {
        dispatch(apiRequestStart(dispatcher));
    }

    axios
        .request({
            auth,
            [dataOrParams]: data,
            headers,
            method,
            url
        })
        .then((response) => {
            dispatch({ type: onSuccess, payload: response });
        })
        .catch((error) => {
            dispatch({ type: onError, payload: error });
        })
        .finally(() => {
            if (dispatcher) {
                dispatch(apiRequestEnd(dispatcher));
            }
        });
};
