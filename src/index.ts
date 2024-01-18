import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Server } from "socket.io";
import { createServer } from 'node:http'
import emitMessage from './services/socket/emitMessages';
import routes from './routes'

import morgan from 'morgan'
import recoveryMessages from './services/socket/recoveryMessages';
dotenv.config()

const port = process.env.PORT ?? 3200

const app = express()

app.use(cors())
app.use(morgan('dev'))
// manejo de datos en el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes)

const server = createServer(app)


const io = new Server(server,{
    connectionStateRecovery:{},
    cors:{}
})


io.on('connection',async(socket)=>{
    console.log('a user has connected!')
    socket.on('disconnect',()=>{
        console.log('a user has disconnected!')
    })


    // cuando el usuario envie un mensaje
    try {
        // funcion que escucha los eventos y emite el mensaje 
        await emitMessage(socket,io)
        await recoveryMessages(socket)

    } catch (error) {
        console.log('error when issuing message', error)
    }

})

server.listen(port, ()=> console.log(`conectado en http://localhost:${port}`))


