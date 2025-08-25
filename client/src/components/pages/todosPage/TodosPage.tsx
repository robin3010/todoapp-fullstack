import { useEffect } from 'react'
import { todosApi } from '../../../app/api/todosApi'
import { useAppDispatch } from '../../../app/store/hooks'
import { todosActions } from '../../../app/store/todos/todosSlice'
import { TodoForm } from '../../todoForm/TodoForm'
import { TodoList } from '../../todoList/TodoList'

const TodosPage = () => {
  const dispatch = useAppDispatch()
  const { saveTodos } = todosActions

  const { data } = todosApi.useGetAllTodosQuery()

  useEffect(() => {
    if (data) {
      dispatch(saveTodos(data))
    }
  }, [data, dispatch, saveTodos])

  if (!data) return null

  return (
    <div className="flex w-7/12 flex-col py-4">
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default TodosPage
