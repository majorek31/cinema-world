import express from 'express'
import type { Express } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import Routes from './routes'
// const __filename = fileURLToPath(module.filename);
// const __dirname = path.dirname(__filename);
dotenv.config()
const app: Express = express()
app.use(bodyParser.json())

app.use('/', Routes)
app.listen(3000, () => {
  console.log('listening on port 3000')
})
