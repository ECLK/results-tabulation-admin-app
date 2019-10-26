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
import { DashboardLayout } from "../layouts";
import { Table, Header, Label, Image } from "semantic-ui-react";
import { resolveUserDisplayName } from "../utils";
import { Link } from "react-router-dom";
import { fetchUsers } from "../api";
import { IUsers } from "../models/users";

/**
 * Proptypes for the associated accounts component.
 */
interface UsersProps {
}

/**
 * Associated accounts component.
 *
 * @param {UsersProps} props - Props injected to the component.
 * @return {JSX.Element}
 */
export const Users: FunctionComponent<UsersProps> = (
    props: UsersProps
): JSX.Element => {
    const [ users, setUsers ] = useState<IUsers>({ Resources: [] });

    useEffect(() => {
        fetchUsers()
            .then((response) => {
                console.log(response)
                setUsers(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <DashboardLayout pageTitle="Users">
            {
                users && users.Resources && users.Resources.length > 0
                    ? (
                        <Table basic='very' celled unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>User</Table.HeaderCell>
                                    <Table.HeaderCell>NIC</Table.HeaderCell>
                                    <Table.HeaderCell>Phone Numbers</Table.HeaderCell>
                                    <Table.HeaderCell>Roles</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <tbody>
                            </tbody>
                            <Table.Body>
                                {
                                    users.Resources.map((user) => (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as="h4" image>
                                                        <Header.Content>
                                                            {
                                                                user.name
                                                                    ? resolveUserDisplayName(user.name)
                                                                    : null
                                                            }
                                                            <Header.Subheader>{ user.userName }</Header.Subheader>
                                                        </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        user && user.EnterpriseUser && user.EnterpriseUser.nationalId
                                                            ? (<span>{ user.EnterpriseUser.nationalId }</span>)
                                                            : null
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        user && user.phoneNumbers && user.phoneNumbers.length > 0
                                                            ? user.phoneNumbers.map((number) => (
                                                                <span>{ number.value }&ensp;</span>
                                                            ))
                                                            : null
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        user.groups.map((group) => (
                                                            <Label color="red" size="mini" style={ { marginBottom: "0.5em" } }
                                                                   horizontal circular>
                                                                { group.display }
                                                            </Label>
                                                        ))
                                                    }
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link to={ `/user/${ user.id }` }>Edit</Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    )
                                }
                            </Table.Body>
                        </Table>
                    )
                    : null
            }
        </DashboardLayout>
    );
};
