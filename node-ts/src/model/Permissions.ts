
import {getModelForClass, prop} from '@typegoose/typegoose'

// permission collection: {uid: 1} {uid: 2} ...
class Permission {
  @prop() public uid?: number
}

const PermissionModel = getModelForClass(Permission)

export {PermissionModel, Permission}