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

import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { AuthenticateSessionUtil } from "../lib/authenticate";
import { AppConfig, RESOURCE_ENDPOINTS } from "../configs";

const appConfig = new AppConfig();

/**
 * Proptypes for the associated accounts component.
 */
interface UsersProps {
}

/**
 * Associated accounts component.
 *
 * @param {BasicDetailsProps} props - Props injected to the basic details component.
 * @return {JSX.Element}
 */
export const Users: FunctionComponent<UsersProps> = (
    props: UsersProps
): JSX.Element => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    /**
     * Fetches associations from the API.
     */
    const fetchUsers = (): void => {
        AuthenticateSessionUtil.getAccessToken().then((token) => {
            const header = {
                headers: {
                    "Access-Control-Allow-Origin": appConfig.clientHost,
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };

            axios.get(RESOURCE_ENDPOINTS.users, header)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error("Failed get users");
                    }
                    setUsers(response.data);
                }).catch((error) => {
                    throw new Error(error);
                });
        }).catch((error) => {
            throw new Error(error);
        });
    };

    return (
        <div>
            { JSON.stringify(users) }
        </div>
    );
};
