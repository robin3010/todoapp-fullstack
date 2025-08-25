import { Sequelize } from 'sequelize'

export const db = new Sequelize({
  dialect: 'sqlite',
  host: './src/db2.sqlite3',
  logging: false,
})

db.authenticate()
  .then(() => {
    console.log('Connection to db established.')
  })
  .then(() => db.sync({ force: true }))
  .catch((error) => {
    console.log('Unable to connect to db: ', error)
  })
