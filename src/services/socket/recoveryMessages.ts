// import { findMessages } from '../../repositories/message.repository';
import { Socket,Server } from 'socket.io';
import {findRecoveryMessages} from '../../controller/chatController'


export default async function recoveryMessages(socket: Socket,io: Server){

    socket.on('recovery messages',async(userId:string)=>{

        try {
            const messages = await findRecoveryMessages(userId)
            socket.emit('recovery message',messages)
    
        } catch (error) {
            console.log(error)
        }
    })


 
}