import { IUserName } from "../models/users";

export const resolveUserDisplayName = (name: IUserName): string => {
    return (name.givenName ? name.givenName + " " : "") + (name.familyName ? name.familyName : "");
};

export const sanitizeRoleName = (roleName: string): string => {
    return roleName.split("/")[1];
};
