import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { db } from '../../config/conexionDB'

const adapter = new PrismaLibSQL(db)
const userClient = new PrismaClient({ adapter }).users

export async function createUser(name:string,email:string,password:string ) : Promise<object>{

    try {
        console.log()
        const newUser = await userClient.create({
            data: {
                name,
                email,
                password,
            },
        });
        return newUser
    } catch (error) {
        console.log('error', error)
    }

}

export async function findAccountUser(email:string){
    try {

        const findUser = await userClient.findFirst({
            where:{email:email}
        })
        return findUser
        
    } catch (error) {
        console.log('error',error)
        
    }

}