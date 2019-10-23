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
import { ECConfig } from "../configs";
import { Button, Divider, Form, Header, Icon, List, Modal, Select } from "semantic-ui-react";
import { IGroup, IRoles, IUser } from "../models/users";
import { Link } from "react-router-dom";
import { beautifyRoleName, resolveUserDisplayName, sanitizeRoleName } from "../utils";
import { history } from "../utils";
import { DashboardLayout } from "../layouts";
import {
    addRoleToUser,
    fetchAvailableRoles,
    fetchAreas,
    fetchUser,
    updateUserClaims,
    removeRoleFromUser
} from "../api";

const ecConfig = new ECConfig();

/**
 * Proptypes for the associated accounts component.
 */
interface UserEditProps {
    editingUser: IUser,
    assignedRoles: IGroup[],
    match: any
}

/**
 * User edit component.
 *
 * @param {UserEditProps} props - Props injected to the basic details component.
 * @return {JSX.Element}
 */
export const User: FunctionComponent<UserEditProps> = (
    props: UserEditProps
): JSX.Element => {
    const [user, setUser] = useState<IUser>(null);
    const [editingRole, setEditingRole] = useState<string>("");
    const [electoralDistricts, setElectoralDistricts] = useState([]);
    const [countingCentres, setCountingCentres] = useState([]);
    const [pollingDivisions, setPollingDivisions] = useState([]);
    const [electoralDistrict, setElectoralDistrict] = useState(null);
    const [countingCentre, setCountingCentre] = useState(null);
    const [pollingDivision, setPollingDivision] = useState(null);
    const [availableRoles, setAvailableRoles] = useState<IRoles>({ Resources: [] });
    const [showUserEditView, setShowUserEditView] = useState<boolean>(false);

    useEffect(() => {
        if (!(props.match && props.match.params && props.match.params.id)) {
            history.push("/users");
        }
        fetchUser(props.match.params.id)
            .then((response) => {
                setUser(response);
            })
            .catch((error) => {
                console.log(error);
            });

        fetchAvailableRoles()
            .then((response) => {
                setAvailableRoles(response);
            })
            .catch((error) => {
                console.log(error);
            });

        fetchAreas("ElectoralDistrict", null)
            .then((response) => {
                console.log(response)
                setElectoralDistricts(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.match]);

    const generateConfigurableRole = (role): JSX.Element => {
        if (!ecConfig.ECRoles.includes(role.displayName)) {
            return null;
        }
        return (
            <List.Item className="roles-list">
                <List.Content floated="left">{ beautifyRoleName(role.displayName) }</List.Content>
                <List.Content floated="right">
                    {
                        user.groups.find((group) => group.value === role.id)
                            ? (user.EnterpriseUser && user.EnterpriseUser[ecConfig.getClaimMapping(role.displayName)])
                            ? (
                                <>
                                    {
                                        !ecConfig.readonlyECRoles.includes(role.displayName)
                                            ? <Button onClick={ () => handleRoleConfiguration(role.displayName) }
                                                      primary>Configure</Button>
                                            : null
                                    }
                                    <Button onClick={ () => handleRoleRemoveFromUser(role) } negative>Remove</Button>
                                </>
                            )
                            : (
                                <>
                                    {
                                        !ecConfig.readonlyECRoles.includes(role.displayName)
                                            ? <Button onClick={ () => handleRoleConfiguration(role.displayName) }
                                                      primary>Configure</Button>
                                            : null
                                    }
                                    <Button onClick={ () => handleRoleRemoveFromUser(role) } negative>Remove</Button>
                                </>
                            )
                            : <Button onClick={ () => handleAddRoleToUser(role) } primary>Add</Button>
                    }
                    {

                    }
                </List.Content>
            </List.Item>
        );
    };

    const handleAddRoleToUser = (role) => {
        setEditingRole(role.displayName);
        addRoleToUser(role.id, user)
            .then((response) => {
                if (ecConfig.readonlyECRoles.includes(role.displayName)) {
                    const value = {
                        "EnterpriseUser": {
                            [ecConfig.getClaimMapping(editingRole)]: "[]"
                        }
                    };

                    handleClaimUpdate(value);
                }

                fetchUser(props.match.params.id)
                    .then((response) => {
                        setUser(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                console.log(response)
            })
    };

    const handleRoleRemoveFromUser = (role) => {
        removeRoleFromUser(role.id, user)
            .then((response) => {
                fetchUser(props.match.params.id)
                    .then((response) => {
                        setUser(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                console.log(response)
            })
    };

    const handleRoleConfiguration = (roleName: string) => {
        setShowUserEditView(true);
        setEditingRole(roleName);
    };

    const handleRoleConfigModalClose = (): void => {
        setShowUserEditView(false);
    };

    const onElectoralDistrictSelect = (e, { value }): void => {
        const district = JSON.parse(value);
        setElectoralDistrict(district);
        if (sanitizeRoleName(editingRole) === "data_editor") {
            fetchAreas("CountingCentre", district.areaId)
                .then((response) => {
                    setCountingCentres(response);
                })
        } else if (sanitizeRoleName(editingRole) === "pol_div_rep_view" || sanitizeRoleName(editingRole) === "pol_div_rep_verf") {
            fetchAreas("PollingDivision", district.areaId)
                .then((response) => {
                    setPollingDivisions(response);
                })
        }
    };

    const onCountingCentreSelect = (e, { name, value }): void => {
        const centre = JSON.parse(value);
        setCountingCentre(centre);
    };

    const onPollingDivisionSelect = (e, { name, value }): void => {
        const division = JSON.parse(value);
        setPollingDivision(division);
    };

    const roleConfigModal = () => {
        const electoralDistrictOptions = [...electoralDistricts].map((district, index) => {
            return {
                key: index,
                text: district.areaName,
                value: JSON.stringify(district)
            }
        });

        const countingCentreOptions = [...countingCentres].map((centre, index) => {
            return {
                key: index,
                text: centre.areaName,
                value: JSON.stringify(centre)
            }
        });

        const pollingDivisionOptions = [...pollingDivisions].map((division, index) => {
            return {
                key: index,
                text: division.areaName,
                value: JSON.stringify(division)
            }
        });

        const ecClaim = user
            && user.EnterpriseUser
            && user.EnterpriseUser[ecConfig.getClaimMapping(editingRole)];

        return (
            <Modal
                open={ showUserEditView }
                onClose={ handleRoleConfigModalClose }
                dimmer="blurring"
            >
                <Modal.Content>
                    {
                        ecClaim
                            ? (
                                <>
                                    <Header as="h3">Already Assigned</Header>
                                    <Divider hidden/>
                                    <List divided verticalAlign="middle">
                                        {
                                            JSON.parse(ecClaim).length > 0
                                                ? JSON.parse(ecClaim).map((item) => (
                                                    <List.Item>
                                                        <List.Content floated="right">
                                                            <Button negative size="mini"
                                                                    onClick={ () => handleClaimRemove(JSON.parse(ecClaim), item) }>Remove</Button>
                                                        </List.Content>
                                                        <List.Content>{ item.areaName }</List.Content>
                                                    </List.Item>
                                                ))
                                                : null
                                        }
                                    </List>
                                </>
                            )
                            : null
                    }
                    <Divider hidden/>
                    <Header as="h3">Add New</Header>
                    <Form onSubmit={ onFormSubmit }>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={ Select }
                                options={ electoralDistrictOptions }
                                label={ {
                                    children: "Electoral District",
                                    htmlFor: "form-select-control-electoral-district"
                                } }
                                placeholder="Electoral District"
                                onChange={ onElectoralDistrictSelect }
                                search
                                searchInput={ { id: "form-select-control-electoral-district" } }
                            />
                            {
                                sanitizeRoleName(editingRole) === "data_editor"
                                    ? (
                                        <>
                                            <Form.Field
                                                control={ Select }
                                                options={ countingCentreOptions }
                                                label={ {
                                                    children: "Counting Centres",
                                                    htmlFor: "form-select-control-counting-centres"
                                                } }
                                                placeholder="Counting Centres"
                                                disabled={ !electoralDistrict }
                                                onChange={ onCountingCentreSelect }
                                                search
                                                searchInput={ { id: "form-select-control-counting-centres" } }
                                            />
                                        </>
                                    )
                                    : null
                            }
                            {
                                (sanitizeRoleName(editingRole) === "pol_div_rep_view" || sanitizeRoleName(editingRole) === "pol_div_rep_verf")
                                    ? (
                                        <>
                                            <Form.Field
                                                control={ Select }
                                                options={ pollingDivisionOptions }
                                                label={ {
                                                    children: "Polling Divisions",
                                                    htmlFor: "form-select-control-poling-divisions"
                                                } }
                                                placeholder="Polling Divisions"
                                                disabled={ !electoralDistrict }
                                                onChange={ onPollingDivisionSelect }
                                                search
                                                searchInput={ { id: "form-select-control-poling-divisions" } }
                                            />
                                        </>
                                    )
                                    : null
                            }
                        </Form.Group>
                        <Button primary type="submit">Add</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    };

    const handleClaimRemove = (claim, removingValue) => {
        const value = {
            "EnterpriseUser": {
                [ecConfig.getClaimMapping(editingRole)]: JSON.stringify(claim.filter((val) => val.areaId !== removingValue.areaId))
            }
        };

        updateUserClaims(user.id, value)
            .then((response) => {
                console.log(response);
                setUser(response)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClaimUpdate = (value) => {
        updateUserClaims(user.id, value)
            .then((response) => {
                console.log(response);
                setUser(response)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onFormSubmit = (e, test) => {
        let value = {};
        let existingArr = [];

        try {
            existingArr = JSON.parse(user && user.EnterpriseUser && user.EnterpriseUser[ecConfig.getClaimMapping(editingRole)]);
        } catch (e) {
            console.log(e);
        }

        console.log('ex', existingArr)

        if (sanitizeRoleName(editingRole) === "data_editor") {
            value = {
                "EnterpriseUser": {
                    [ecConfig.getClaimMapping(editingRole)]: existingArr
                        ? JSON.stringify([...existingArr, {
                            areaId: countingCentre.areaId,
                            areaName: countingCentre.areaName
                        }])
                        : JSON.stringify([{ areaId: countingCentre.areaId, areaName: countingCentre.areaName }])
                }
            };
        } else if (sanitizeRoleName(editingRole) === "elc_dis_rep_view" || sanitizeRoleName(editingRole) === "elc_dis_rep_verf") {
            value = {
                "EnterpriseUser": {
                    [ecConfig.getClaimMapping(editingRole)]: existingArr
                        ? JSON.stringify([...existingArr, {
                            areaId: electoralDistrict.areaId,
                            areaName: electoralDistrict.areaName
                        }])
                        : JSON.stringify([{ areaId: electoralDistrict.areaId, areaName: electoralDistrict.areaName }])
                }
            };
        } else if (sanitizeRoleName(editingRole) === "pol_div_rep_view" || sanitizeRoleName(editingRole) === "pol_div_rep_verf") {
            value = {
                "EnterpriseUser": {
                    [ecConfig.getClaimMapping(editingRole)]: existingArr
                        ? JSON.stringify([...existingArr, {
                            areaId: pollingDivision.areaId,
                            areaName: pollingDivision.areaName
                        }])
                        : JSON.stringify([{ areaId: pollingDivision.areaId, areaName: pollingDivision.areaName }])
                }
            };
        }

        handleClaimUpdate(value)
    };

    return (
        <DashboardLayout pageTitle={ user ? user.userName : "" }>
            <div className="back-button"><Link to="/users"><Icon link name="arrow left"/>Go back to users</Link></div>
            { user
                ? (
                    <div className="user-info">
                        <div className="section">
                            <div className="key">Username</div>
                            <div className="value">{ user.userName }</div>
                        </div>
                        {
                            user.name
                                ? (
                                    <div className="section">
                                        <div className="key">Name</div>
                                        <div className="value">{ resolveUserDisplayName(user.name) }</div>
                                    </div>
                                )
                                : null
                        }
                        <div className="section">
                            <div className="key">Configure Roles</div>
                            {
                                availableRoles && availableRoles.Resources && availableRoles.Resources.length > 0
                                    ? (
                                        <div className="value list">
                                            < List divided verticalAlign='middle'>
                                                {
                                                    availableRoles.Resources.map((role) => (
                                                        generateConfigurableRole(role)
                                                    ))
                                                }
                                            </List>
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    </div>
                )
                : null
            }
            {
                showUserEditView
                    ? roleConfigModal()
                    : null
            }
        </DashboardLayout>
    );
};
