import { Router } from 'express'
import { todosController } from 'src/controllers/todosController'
import { checkAuth } from 'src/middleware/checkAuth'

export const todosRouter = Router()

todosRouter.route('')
  .get(checkAuth, todosController.getAllTodos)
  .post(checkAuth, todosController.createTodo)

todosRouter.route('/:id')
  .put(checkAuth, todosController.updateTodo)
  .delete(checkAuth, todosController.updateTodo)
