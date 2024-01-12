import { findMessages } from '../../repositories/message.repository';
import { Socket } from 'socket.io';


export default async function recoveryMessages(socket: Socket){

    if(!socket.recovered){
        
        try {
            const messages = await findMessages()
            socket.emit('recovery message',messages)

        } catch (error) {
            console.log(error)
        }
    }
}