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

import { AppConfig } from "./app";

const appConfig = new AppConfig();

const IS_ENDPOINT = appConfig.ISEndpoint;
const TABULATION_ENDPOINT = appConfig.tabulationAPIEndpoint;

export const RESOURCE_ENDPOINTS = {
    area: `${TABULATION_ENDPOINT}/area`,
    authorize: `${IS_ENDPOINT}/oauth2/authorize`,
    jwks: `${IS_ENDPOINT}/oauth2/jwks`,
    logout: `${IS_ENDPOINT}/oidc/logout`,
    users: `${IS_ENDPOINT}/scim2/Users`,
    groups: `${IS_ENDPOINT}/scim2/Groups`,
    revoke: `${IS_ENDPOINT}/oauth2/revoke`,
    token: `${IS_ENDPOINT}/oauth2/token`,
    wellKnown: `${IS_ENDPOINT}/oauth2/oidcdiscovery/.well-known/openid-configuration`,
};
