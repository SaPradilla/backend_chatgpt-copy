import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
dotenv.config()

// Conexion db
export const db = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})