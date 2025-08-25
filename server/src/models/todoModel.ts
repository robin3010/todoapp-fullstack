import { db } from 'src/db'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { User } from './userModel'

export interface ITodo extends Model<InferAttributes<ITodo>, InferCreationAttributes<ITodo>> {
  id: CreationOptional<number>
  title: string
  completed: CreationOptional<boolean>
  userId: string
}

export const Todo = db.define<ITodo>('todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, { timestamps: false })
