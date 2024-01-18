import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export function generateTokenAuth(userData:object):string {
    const token = sign(
        userData,  process.env.TOKEN_KEY ,{ expiresIn: process.env.TOKEN_EXPIRE, }
    )
    return token
}
// export function verifyTokenAuth(){

// }