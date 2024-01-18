import {genSalt,hash,compare } from 'bcrypt'

export async function cryptPwd(password: string): Promise<string> {

    const salt = await genSalt(10);
    const hashResult = await hash(password, salt);
    return hashResult;
}

export async function comparePwd(password: string, hashPassword: string): Promise<boolean> {
    
    const result = await compare(password, hashPassword);
    return result;
    
}