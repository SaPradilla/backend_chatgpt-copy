import { cryptPwd,comparePwd } from "../middleware/bcrypt";
import { Request,Response} from 'express';
import {createUser,findAccountUser} from '../repositories/user.respository'
import { generateTokenAuth } from "../middleware/jwt";
import { userFormatDataToken } from "../adapter/mapping/userMappingData";


interface UserData {
    name:string,
    email:string,
    password:string
}

export async function registerUser (req: Request, res: Response) {

    const {name,email,password}: UserData = req.body
    try {
        const hashedPassword = await cryptPwd(password)

        const newUser = await createUser(name,email,hashedPassword)

        return res.status(201).json({
            msg:'user successfully created',
            newUser
        })

    } catch (error) {
        console.log('error',error)
        
    }
}
export async function loginUser (req: Request, res: Response){
    const {email,password} : UserData = req.body

    try {
        // verifica la existencia de la cuenta
        const userFind = await findAccountUser(email)
        if(!userFind) return res.status(404).json('user not found')

        // verifica que la contrasena sea correcta
        const verifypwd = await comparePwd(password,userFind.password)
        if(!verifypwd) return res.status(401).json({msg:'incorrect credentials'})

        const formatUser = userFormatDataToken(userFind)

        const token = generateTokenAuth(formatUser)
        
        return res.status(200).header(`Authorization`,`Bearer ${token}`).json({
            msg:'successful login',
            user:userFind.name,
            token
        })  


    } catch (error) {
        console.log('error',error)
    }


}




