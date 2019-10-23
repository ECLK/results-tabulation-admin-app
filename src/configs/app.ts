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

const DEFAULT_CONFIG = {
    BASE_PATH: "admin",
    HOME_PATH: "/overview",
    LOGIN_PATH: "/login",
    LOGOUT_PATH: "/logout",
    IS_ENDPOINT: "https://localhost:9443",
    TABULATION_API_ENDPOINT: "https://api.tabulation.ecstag.opensource.lk",
    CLIENT_ID: "ECLK_ADMIN_APP",
    CLIENT_SECRET: null,
    CLIENT_HOST: "https://localhost:9000",
    LOGIN_CALLBACK_URL: "https://localhost:9000/login",
    LOGOUT_CALLBACK_URL: "https://localhost:9000/logout"
};

/**
 * App configuration provider class.
 * Reads the environment variables and returns the corresponding environment values
 * or falls back to the defaults.
 */
export class AppConfig {
    /**
     * Returns the app base path.
     *
     * @return {string}
     */
    public get basePath(): string {
        return process.env.REACT_APP_BASE_PATH
            ? process.env.REACT_APP_BASE_PATH
            : DEFAULT_CONFIG.BASE_PATH;
    }

    /**
     * Returns the app home path.
     *
     * @return {string}
     */
    public get homePath(): string {
        return process.env.REACT_APP_HOME_PATH
            ? process.env.REACT_APP_HOME_PATH
            : DEFAULT_CONFIG.HOME_PATH;
    }

    /**
     * Returns the app login path.
     *
     * @return {string}
     */
    public get loginPath(): string {
        return process.env.REACT_APP_LOGIN_PATH
            ? process.env.REACT_APP_LOGIN_PATH
            : DEFAULT_CONFIG.LOGIN_PATH;
    }

    /**
     * Returns the app logout path.
     *
     * @return {string}
     */
    public get logoutPath(): string {
        return process.env.REACT_APP_LOGOUT_PATH
            ? process.env.REACT_APP_LOGOUT_PATH
            : DEFAULT_CONFIG.LOGOUT_PATH;
    }

    /**
     * Returns the IS server endpoint.
     *
     * @return {string}
     */
    public get ISEndpoint(): string {
        return process.env.REACT_APP_IS_ENDPOINT
            ? process.env.REACT_APP_IS_ENDPOINT
            : DEFAULT_CONFIG.IS_ENDPOINT;
    }

    /**
     * Returns the tabulation API endpoint.
     *
     * @return {string}
     */
    public get tabulationAPIEndpoint(): string {
        return process.env.REACT_APP_TABULATION_API_ENDPOINT
            ? process.env.REACT_APP_TABULATION_API_ENDPOINT
            : DEFAULT_CONFIG.TABULATION_API_ENDPOINT;
    }

    /**
     * Returns the client id.
     *
     * @return {string}
     */
    public get clientID(): string {
        return process.env.REACT_APP_CLIENT_ID
            ? process.env.REACT_APP_CLIENT_ID
            : DEFAULT_CONFIG.CLIENT_ID;
    }

    /**
     * Returns the client secret.
     *
     * @return {string}
     */
    public get clientSecret(): string {
        return process.env.REACT_APP_CLIENT_SECRET
            ? process.env.REACT_APP_CLIENT_SECRET
            : DEFAULT_CONFIG.CLIENT_SECRET;
    }

    REACT_APP_CLIENT_SECRET

    /**
     * Returns the client host.
     *
     * @return {string}
     */
    public get clientHost(): string {
        return process.env.REACT_APP_CLIENT_HOST
            ? process.env.REACT_APP_CLIENT_HOST
            : DEFAULT_CONFIG.CLIENT_HOST;
    }

    /**
     * Returns the login callback url.
     *
     * @return {string}
     */
    public get loginCallbackURL(): string {
        return process.env.REACT_APP_LOGIN_CALLBACK_URL
            ? process.env.REACT_APP_LOGIN_CALLBACK_URL
            : DEFAULT_CONFIG.LOGIN_CALLBACK_URL;
    }

    /**
     * Returns the logout callback url.
     *
     * @return {string}
     */
    public get logoutCallbackURL(): string {
        return process.env.REACT_APP_LOGOUT_CALLBACK_URL
            ? process.env.REACT_APP_LOGOUT_CALLBACK_URL
            : DEFAULT_CONFIG.LOGOUT_CALLBACK_URL;
    }
}
