import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./CustomJwtPayload";

export const verifyToken = (jwtToken: string): CustomJwtPayload => jwtDecode<CustomJwtPayload>(jwtToken);