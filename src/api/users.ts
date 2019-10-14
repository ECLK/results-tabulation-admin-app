import { AuthenticateSessionUtil } from "../libs/authenticate";
import axios from "axios";
import { AppConfig, RESOURCE_ENDPOINTS } from "../configs";
import { IUser } from "../models/users";

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

const appConfig = new AppConfig();

/**
 * Fetches users from the API.
 */
export const fetchUsers = (): Promise<any> => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        return axios.get(RESOURCE_ENDPOINTS.users, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    Promise.reject(`Failed fetch users`);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

export const addRoleToUser = (id: string, user: IUser) => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        const data = {
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "add",
                    "value": {
                        "members": [
                            {
                                "display": user.userName,
                                "value": user.id
                            }
                        ]
                    }
                }
            ]
        };

        return axios.patch(`${ RESOURCE_ENDPOINTS.groups }/${ id }`, data, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject(`Failed to add role to user`);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

export const removeRoleFromUser = (id: string, user: IUser) => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        const data = {
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "remove",
                    "path": `members[value eq ${user.id}]`
                }
            ]
        };

        return axios.patch(`${ RESOURCE_ENDPOINTS.groups }/${ id }`, data, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject(`Failed to remove role from user`);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

/**
 * Fetches roles from the API.
 */
export const fetchAvailableRoles = (): Promise<any> => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        return axios.get(RESOURCE_ENDPOINTS.groups, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed get users");
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

/**
 * Fetches an user from the API.
 */
export const fetchUser = (id: string): Promise<any> => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        return axios.get(`${ RESOURCE_ENDPOINTS.users }/${ id }`, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed fetch the user with id: " + id);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

/**
 * Fetches an user from the API.
 */
export const updateUserClaims = (id: string, value: any): Promise<any> => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        const data = {
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "replace",
                    "value": value
                }
            ]
        };

        return axios.patch(`${ RESOURCE_ENDPOINTS.users }/${ id }`, data, { headers })
            .then((response) => {
                if (response.status !== 200) {
                    return Promise.reject(`Failed to update user claim`);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${ error }`);
    });
};

