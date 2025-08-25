import { hash } from 'bcrypt'
import { db } from 'src/db'

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { Token } from './tokenModel'
import { Todo } from './todoModel'

export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<string>
  username: string
  passwordHash: string
}

export const User = db.define<IUser>('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.TEXT,
    unique: true,
  },
}, { timestamps: false })

User.beforeCreate(user => hash(user.passwordHash, +process.env.BCRYPT_SALT!)
  .then((hash) => {
    user.passwordHash = hash
  })
  .catch((error) => {
    throw new Error(error)
  }),
)

User.hasOne(Token)
User.hasMany(Todo)
