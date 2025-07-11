import express from 'express'
import empresasRoutes from './routes/empresas.routes.js'
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(empresasRoutes)
// app.use(cors)

export default app