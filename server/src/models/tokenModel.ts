import { db } from 'src/db'
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { User } from './userModel'

export interface IToken extends Model<InferAttributes<IToken>, InferCreationAttributes<IToken>> {
  userId: string
  refreshToken: string
}

export const Token = db.define<IToken>('token', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    references: {
      model: User,
      key: 'id',
    },
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
}, { timestamps: false })
