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

import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppConfig } from "../configs";

const appConfig = new AppConfig();

/**
 * Header component prop types.
 */
interface HeaderProps {
}

/**
 * Header component.
 *
 * @param {HeaderProps} props - Props supplied to the header component.
 * @return {JSX.Element}
 */
export const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps): JSX.Element => {
    const username = useSelector((state: AppState) => state.authenticate.username);

    return (
        <Menu  inverted>
            <Container>
                <Menu.Item header>
                    ECLK ADMIN APP
                </Menu.Item>
                <Menu.Menu position='right'>
                    {
                        username
                            ? (
                                <Menu.Item
                                    name="username"
                                >
                                    { username }
                                </Menu.Item>
                            )
                            : null
                    }
                    <Menu.Item as={ Link } to={ appConfig.logoutPath }>
                        <Button primary>Logout</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};

/**
 * Default proptypes for the header component.
 */
Header.defaultProps = {};
