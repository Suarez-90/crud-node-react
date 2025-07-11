import sql from "mssql";
import * as dotenv from 'dotenv'

//Config for sql server
dotenv.config()
const config = {
    server:process.env.BD_SERVER,
    database: process.env.BD_DATABASE,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    options: {
        encrypt:false,
        enableArithAbort:true,
        trustServerCertificate: true
    },
    port: parseInt( process.env.DB_PORT)
}
export const connection = async() => {
    try {
        const pool = await sql.connect(config)
        console.log('CONNECTED TO DATABASE')
        return pool;
    } catch (error) {
        console.log('DATABASE CONNECTION FAILED ', error);
    }
}


