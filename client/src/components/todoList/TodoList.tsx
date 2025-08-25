import { useAppSelector } from '../../app/store/hooks'
import { TodoItem } from '../todoItem/TodoItem'

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos)

  return (
    <div className="mt-8 flex flex-col">
      {todos?.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  )
}
