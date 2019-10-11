import { AuthenticateSessionUtil } from "../libs/authenticate";
import axios from "axios";
import { AppConfig, RESOURCE_ENDPOINTS } from "../configs";

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

export const fetchAreas = (areaType: string = null, areaId: number = null): Promise<any> => {
    return AuthenticateSessionUtil.getAccessToken().then((token) => {
        const headers = {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": appConfig.clientHost,
            "Authorization": `Bearer ${ token }`,
            "Content-Type": "application/json"
        };

        const params = {
            areaType,
            associatedAreaId: areaId
        };

        return axios.get(RESOURCE_ENDPOINTS.area, { params, headers })
            .then((response) => {
                if (response.status !== 200) {
                    Promise.reject(`Failed fetch electoral districts`);
                }
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }).catch((error) => {
        return Promise.reject(`Failed to retrieve access token: ${error}`);
    });
};
