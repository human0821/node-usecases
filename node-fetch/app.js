

import express from 'express'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const app = express()
const port = 7000
const __dirname = fs.realpathSync('.')

app.get('/weather', async (request, res) => {
  const response = await fetch('https://www.google.com/search?q=google+weather')
  const buffer = await response.buffer()
  res.end(buffer, 'utf8')
})

app.listen(port, () => console.log(`Running at localhost:${port}`))