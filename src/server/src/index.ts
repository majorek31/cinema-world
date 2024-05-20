import express from 'express'
import type { Express } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path = require('path')
import { ApiRoute } from './routes/api'
// const __filename = fileURLToPath(module.filename);
// const __dirname = path.dirname(__filename);
dotenv.config()
const app: Express = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../../dist/static',), {
  setHeaders(res, path, stat) {
    if (path.endsWith('js'))
      res.setHeader("Content-Type", "text/javascript")
  },
}));
app.use('/api', ApiRoute)
app.listen(3000, () => {
  console.log('listening on port 3000')
})
