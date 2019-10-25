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
import { sanitizeRoleName, beautifyRoleName } from "../utils";

const CLAIM_PREFIX = "area_assign";

/**
 * App configuration provider class.
 * Reads the environment variables and returns the corresponding environment values
 * or falls back to the defaults.
 */
export class ECConfig {

    /**
     * Returns the list of ec roles.
     *
     * @return {string}
     */
    public get ECRoles(): string[] {
        return [
            "PRIMARY/tab_data_editor",
            "PRIMARY/tab_pol_div_rep_view",
            "PRIMARY/tab_pol_div_rep_verf",
            "PRIMARY/tab_elc_dis_rep_view",
            "PRIMARY/tab_elc_dis_rep_verf",
            "PRIMARY/tab_nat_dis_rep_view",
            "PRIMARY/tab_nat_dis_rep_verf",
            "PRIMARY/tab_ec_leadership"
        ];
    }

    /**
     * Returns the list of readonly ec roles.
     *
     * @return {string}
     */
    public get readonlyECRoles(): string[] {
        return [
            "PRIMARY/tab_nat_dis_rep_view",
            "PRIMARY/tab_nat_dis_rep_verf",
            "PRIMARY/tab_ec_leadership"
        ];
    }

    /**
     * Returns the corresponding claim mapping when a
     * role is passed in.
     *
     * @return {string}
     */
    public getClaimMapping(role): string {
        return `${CLAIM_PREFIX}_${sanitizeRoleName(role).replace("tab_", "")}`;
    }

    public getSanitizedRoleName (raw): string {
        return sanitizeRoleName(raw);
    }

    public getBeautifiedRoleName (raw): string {
        return beautifyRoleName(raw);
    }
}
