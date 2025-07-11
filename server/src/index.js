import app from './app.js'
import { connection } from "./database/connection.js";


connection()
app.listen(3000, ()=> console.log('Servidor Iniciado OK'))
