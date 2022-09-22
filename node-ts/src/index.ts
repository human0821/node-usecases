import decoratorsES7 from './decoratorsES7'; decoratorsES7
import * as process from 'process'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Controller from './controller'

interface Opts<L = number> { useNewUrlParser: L, useUnifiedTopology: L }

const {info: i} = console
const server = express()
const jsonParser = bodyParser.json()
const processExitCode = -1
const PORT = 3001
const MONGOOPTS: Opts<boolean> = {useNewUrlParser: true, useUnifiedTopology: true}
const MONGOURI = 'mongodb://localhost:27017/node-ts';

(async () => {
  try {
    const connection = await mongoose.connect(MONGOURI, MONGOOPTS)
    i(`mongodb: ${MONGOURI}`)
    server.get('/', Controller.index)
    server.get('/permissions', Controller.permissions)
    server.post('/permission', jsonParser, Controller.permission)
    server.delete('/permission', jsonParser, Controller.permission)
    server.get('/:uid/package', Controller.package)
    server.listen(PORT, () => i(`server: http://localhost:${PORT}`))
  }
  catch (threw) {
    i(`mongodb: ${threw.message}.`, `Process exited at code ${processExitCode}`)
    process.exit(processExitCode)
  }
})()