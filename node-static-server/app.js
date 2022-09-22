

import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 7000
const __dirname = fs.realpathSync('.')

const fromBuild = filename => path.join(__dirname, 'build', filename || '')

app.use(express.static(fromBuild()))

app.get('/*', (request, response) => {
  response.sendFile(fromBuild('index.html'))
})

app.listen(port, () => console.log(`Server running at localhost:${port}`))