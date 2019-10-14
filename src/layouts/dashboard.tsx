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

import * as React from "react";
import { Header, Footer } from "../components";
import { Container } from "semantic-ui-react";

interface DashboardLayoutProps {
    children?: React.ReactNode;
    pageTitle: string;
    pageDescription?: string;
}

export const DashboardLayout = (props: DashboardLayoutProps) => {
    const { children, pageTitle, pageDescription, } = props;

    return (
        <div className="dashboard-layout">
            <Header />
            <Container className="dashboard-layout-content">
                <div className="page-title">
                    <h1>{ pageTitle }</h1>
                    <h3>{ pageDescription }</h3>
                </div>
                { children }
            </Container>
            <Footer />
        </div>
    )
};
