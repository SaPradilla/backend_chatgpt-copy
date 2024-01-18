import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { sendMessage } from '../../controller/chatController';
import generatePromt from '../../services/openai';

export default async function emitMessage(socket: Socket, io: Server): Promise<void> {

    socket.on('chat message',async(msg : string )=>{
        let response

        try {
            console.log(msg)
            // respuesta de chatgpt
            response = await generatePromt(msg)

            const {content} = response
            console.log('RESPUESTA',response)
            // envia el mensaje y la respuesta a la db
            await sendMessage(msg,content)
            // emite el mensaje de chatgpt
            io.emit('chat message',response)
            return 
        
        } catch (e) {
            console.log(e)
            return
        }   
        
    })

}