
import express from 'express'
import path from 'path'
import fs from 'fs'
import util from 'util'

import {PermissionModel, Permission} from './../model/Permissions'

const readdir = util.promisify(fs.readdir)

class Controller {
  #projectPath = path.normalize(__dirname + '/../../')
  #visibleFiles = ['package.json']

  #containsPermission = async (uid: number): Promise<boolean> => await PermissionModel.exists({uid})
  #permissions = async () => await PermissionModel.find({}).exec()

  #end403 = (response: express.Response, status = '403 (Forbidden)') => response.status(403).send(status)
  #end500 = (response: express.Response, error = '', status = '500 (Internal Server Error)') => response.status(500).send(`${status}: ${error}`)

  /**
   * @handls GET /register
   */
  register() {}
  
  /**
   * @handles GET /
   */
  async index(request: express.Request, response: express.Response) {
    try {
      const permissions = await this.#permissions()
      const permissionsStringified = permissions.map(permission => permission.uid).toString()
      const visibleLabel = '(visible)'
      const first = `[${permissionsStringified}] users are permitted to view files marked 'visible'\nGo to /uid/filename to view a file\n`
    
      let files = [first, ...await readdir(this.#projectPath)]
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (this.#visibleFiles.includes(file)) {
          files[i] = file.concat(visibleLabel)
        }
      }
      response.header('Content-Type', 'text/plain')
      response.write(files.join('\n'))
      response.end()
    }
    catch (threw) {
      this.#end500(response, threw)
    }
  }

  /**
   * @handles GET /:uid/package
   */
  async package(request: express.Request, response: express.Response) {
    try {
      const allowedAccess = await this.#containsPermission(+request.params.uid)
      const packageName = 'package.json'
      const packageJSONPath = this.#projectPath.concat(packageName)
      if (allowedAccess) {
        response.sendFile(packageJSONPath)
      }
      else {
        this.#end403(response)
      }
    }
    catch (threw) {
      this.#end500(response, threw)
    }
  }

  /**
   * @handles GET /permissions
   */
  permissions(request: express.Request, response: express.Response) {
    const permissionsHTMLPath = path.normalize(this.#projectPath + '/src/pages/permissions.html')
    response.sendFile(permissionsHTMLPath)
  }
  
  /**
   * @handles POST|DELETE /permission
   * @request body: JSON {uid: string}
   * @response body: JSON {status: 'ok'|'invalidBody'|'exist'}
   */
  async permission(request: express.Request, response: express.Response) {
    try {
      const method = request.method
      const uid = request.body.uid
      const postRequest = method === 'POST'
      const deleteRequest = method === 'DELETE'
      const okResponse = {status: 'ok'}
      const invalidBodyResponse = {status: 'invalidBody'}
      const existResponse = {status: 'exist'}
      const isValidBody = (typeof uid === 'string') && uid.length > 0
      if (isValidBody) {
        const containsPermission = await this.#containsPermission(+uid)
        if (containsPermission) {
          if (postRequest) {
            response.json(existResponse)
          }
          else if (deleteRequest) {
            const removedPermission = await PermissionModel.findOneAndRemove({uid: +uid} as Permission).exec()
            response.json(okResponse)
          }
        }
        else {
          if (postRequest) {
            const permission = await PermissionModel.create({uid: +uid} as Permission)
          }
          response.json(okResponse)
        }
      }
      else {
        response.status(400).json(invalidBodyResponse)
      }
    }
    catch (threw) {
      this.#end500(response, threw)
    }
  }
}

const controller = new Controller
controller.permissions = controller.permissions.bind(controller)
controller.permission = controller.permission.bind(controller)
controller.index = controller.index.bind(controller)
controller.package = controller.package.bind(controller)

export default controller