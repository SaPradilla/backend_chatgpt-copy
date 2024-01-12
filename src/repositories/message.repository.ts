import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { db } from '../../config/conexionDB'

const adapter = new PrismaLibSQL(db)
const messageClient = new PrismaClient({ adapter }).messages

export async function createMessage(msg: string, reponse: string): Promise<object> {
  try {
    const newMessage = await messageClient.create({
      data: {
        content: msg,
        response: reponse
      }
    })
    console.log(newMessage)
    return newMessage

  } catch (error) {
    console.log('error', error)
  }
}

export async function findMessages() {
  try {

    const messages = await messageClient.findMany()
    console.log(messages)
    
    return messages

  } catch (error) {
    console.log('error', error)
  }
}

