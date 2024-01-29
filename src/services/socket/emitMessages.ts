import { Socket,Server } from 'socket.io';
import { sendMessage } from '../../controller/chatController';
import generatePromt from '../../services/openai';

export default async function emitMessage(socket: Socket, io: Server): Promise<void> {

    socket.on('chat message',async(messages : Array<object> ,msg:string, userId: string)=>{

        let response
        try {
            // console.log(messages)
            // respuesta de chatgpt
            response = await generatePromt(messages)

            const {content} = response

            // envia el mensaje y la respuesta a la db
            await sendMessage(msg,content,userId)
            // emite el mensaje de chatgpt
            io.emit('chat message', response)
            return 
        
        } catch (e) {
            console.log(e)
            return
        }   
        
    })

}