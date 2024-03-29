
import next from 'next'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { connectDb } from '../server/utils'
import rosterRouter from './routes/roster.routes'

dotenv.config()

const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'
const apiPath = process.env.API_PATH || '/api/v1'
const dev = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'

const init = async () => {
  const nextApp = next({ dev })
  const handle = nextApp.getRequestHandler()
  await connectDb()

  nextApp.prepare().then(async () => {
    const app = express()
  
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(`${apiPath}/roster`, rosterRouter)
    
    app.all('*', (req: Request, res: Response) => handle(req, res))
    
    app.listen(port, () => {
      console.log(`> Ready on ${process.env.NODE_ENV} - ${dev ? `localhost:${port}` : `${host}`}`)
    })
  })
}

init()


