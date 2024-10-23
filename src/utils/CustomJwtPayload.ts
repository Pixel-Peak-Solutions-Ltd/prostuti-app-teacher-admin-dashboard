import { JwtPayload } from "jsonwebtoken";

// Extend JwtPayload to include the role field
export interface CustomJwtPayload extends JwtPayload {
    role: string;
}
