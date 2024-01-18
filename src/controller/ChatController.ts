// username:string
import { createMessage} from '../repositories/message.repository'

export async function sendMessage (msg: string, response: string) : Promise<void>{

    try {
        // TODO -> colocar el nombre del usuario que envio el mensaje 
        // Crear mensaje 

        // const messageSend = await createMessage(msg,response)
        

    } catch (error) {
        console.log('error',error)
        return
    }
}