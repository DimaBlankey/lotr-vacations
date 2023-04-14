import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import crypto from "crypto";


const secretKey = "sam is gay!";

// Create new token:
function createToken(user: UserModel): string {

    // Delete password before creating the token:
    delete user.password;

    // Create container containing the user:
    const container = { user };

    // Create options:
    const options = { expiresIn: "12h" };

    // Create token: 
    const token = jwt.sign(container, secretKey, options);

    // Return: 
    return token;
}

// The token is in a header named authorization
// authorization: "Bearer the-token"  - to receive token, extract after the word "Bearer". you can use method substring(7)
async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, err => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}

async function verifyAdmin(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        // Extract header:
        const header = request.header("authorization"); // "Bearer the-token"

        // If no header:
        if (!header) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        }

        // Extract token:
        const token = header.substring(7);

        // If no token:
        if (!token) {
            reject(new UnauthorizedError("Incorrect email or password"));
            return;
        }

        // Verify:
        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if (err) {
                reject(new UnauthorizedError("Invalid token"));
                return;
            }

            // Extract user from token:
            const user = container.user;

            // If user is not admin:
            if (user.role !== "admin") {
                reject(new UnauthorizedError("Access denied"));
                return;
            }

            // All is good:
            resolve(true);

        });

    });
}

// Hash password:
function hashPassword(plainText: string): string {

    const salt = "samAndFrodoShouldHaveKissed";

    // Hash with salt:
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}



export default {
    createToken,
    verifyToken,
    verifyAdmin,
    hashPassword,
    secretKey
};
