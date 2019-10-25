import { IUserName } from "../models/users";
import { ROLE_DISPLAY_NAMES } from "../constants";

export const resolveUserDisplayName = (name: IUserName): string => {
    return (name.givenName ? name.givenName + " " : "") + (name.familyName ? name.familyName : "");
};

export const sanitizeRoleName = (roleName: string): string => {
    const nameParts = roleName.split("/");
    return nameParts[1] ? nameParts[1] : nameParts[0];
};

export const beautifyRoleName = (role: string): string => {
    return ROLE_DISPLAY_NAMES[sanitizeRoleName(role)];
};
