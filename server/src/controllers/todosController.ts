import { RequestHandler } from 'express'
import createError from 'http-errors'
import { Todo, ITodo } from 'src/models/todoModel'
import { RequestWithCheckAuth } from 'src/services/authService'

const getAllTodos: RequestHandler = async (req, res) => {
  // genError()
  const todos = await Todo.findAll({ where: { userId: (req as RequestWithCheckAuth).userId } })
  res.json(todos)
}

interface RequestWithCheckAuthExtend extends RequestWithCheckAuth { body: Pick<ITodo, 'title'> }

const createTodo: RequestHandler = async (req, res) => {
  const { body, userId } = req as RequestWithCheckAuthExtend

  if (!body || !body.title?.toLowerCase()) throw createError(400, 'Invalid data')

  const newTodo = await Todo.create({ ...body, userId })

  res.status(201).json(newTodo)
}

const updateTodo: RequestHandler = async (req, res) => {
  const { userId, params: { id: todoId } } = req as RequestWithCheckAuth

  // if (!body || !body.userId?.toLowerCase()) throw createError(400, 'Invalid data')

  // const { id: todoId } = req.params
  if (!todoId) throw createError(500)

  const currentTodo = await Todo.findByPk(todoId)

  const deleteTodo = async () => {
    if (currentTodo === null) return res.sendStatus(204)
    if (currentTodo.userId !== userId) throw createError(401)

    await currentTodo.destroy()

    res.sendStatus(200)
  }

  const updateTodoStatus = async () => {
    if (currentTodo === null) throw createError(400, `Todo with id '${todoId}' not found`)
    if (currentTodo.userId !== userId) throw createError(401)

    await currentTodo.update({ completed: !currentTodo.completed })

    res.json(currentTodo)
  }

  return req.method === 'PUT' ? updateTodoStatus() : deleteTodo()
}

export const todosController = {
  getAllTodos,
  createTodo,
  updateTodo,
}
