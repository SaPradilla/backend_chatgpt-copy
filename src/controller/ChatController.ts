// username:string
import { createMessage, findMessages} from '../repositories/message.repository'

export async function sendMessage (msg: string, response: string,userId:string) : Promise<void>{

    try {

        // Crear mensaje 
        // console.log(msg)
        const messageSend = await createMessage(msg,response,userId)
        

    } catch (error) {
        console.log('error',error)
        return
    }
}
export async function findRecoveryMessages (userId:string){
    try {
        const messages = await findMessages(userId)
        return messages
    } catch (error) {
        console.log('error',error)
    }
}