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
 * Users Model
 */
export interface IUsers {
    Resources: IUser[];
}

export interface IUser {
    EnterpriseUser: any;
    groups: IGroup[];
    id: string;
    created: string;
    lastModified: string;
    resourceType: string;
    name: IUserName;
    familyName: string;
    userName: string;
}

export interface IRoles {
    Resources: IRole[];
}

export interface IRole {
    displayName: string;
    members: IMember[],
    id: string
}

interface IMember {
    display: string,
    value: string,
}

export interface IUserName {
    givenName: string,
    familyName: string
}

export interface IGroup {
    display: string;
    value: string;
}
