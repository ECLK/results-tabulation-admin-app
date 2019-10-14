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
import { Navbar } from "react-bootstrap";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

/**
 * Header component prop types.
 */
interface FooterProps {
}

/**
 * Footer component.
 *
 * @param {FooterProps} props - Props supplied to the component.
 * @return {JSX.Element}
 */
export const Footer: React.FunctionComponent<FooterProps> = (props: FooterProps): JSX.Element => {
    return (
        <Menu attached="bottom" inverted fluid>
            <Container>
                <Menu.Item header>Copyright 2019. All rights reserved.</Menu.Item>
            </Container>
        </Menu>
    );
};

/**
 * Default proptypes for the component.
 */
Footer.defaultProps = {};
