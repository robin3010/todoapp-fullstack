import { todosApi } from '../../app/api/todosApi'
import { useAppDispatch } from '../../app/store/hooks'
import type { Todo } from '../../shared/types/types'
import { todosActions } from '../../app/store/todos/todosSlice'

export const TodoItem: React.FC<Todo> = (todo) => {
  const [toggleTodoStatus] = todosApi.useEditTodoMutation()
  const { todoEdit } = todosActions
  const dispatch = useAppDispatch()

  const toggleTodoStatusHandler = async () => {
    const todoEditResult = await toggleTodoStatus(todo.id)

    if (typeof todoEditResult.data !== 'undefined') {
      dispatch(todoEdit(todoEditResult.data))
    }
  }

  return (
    <div className="flex items-center gap-1 border-y-1 border-y-stone-300 py-2 hover:bg-gray-50">
      <div>
        <div className="group grid size-4 grid-cols-1">
          <input
            id="completed"
            name="completed"
            type="checkbox"
            checked={todo.completed}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={toggleTodoStatusHandler}
            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-sky-600 checked:bg-sky-600 indeterminate:border-sky-600 indeterminate:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
          />
          <svg
            fill="none"
            viewBox="0 0 14 14"
            className="pointer-events-none col-start-1 row-start-1 size-3.5 place-self-center stroke-white group-has-disabled:stroke-gray-950/25"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-checked:opacity-100"
            />
            <path
              d="M3 7H11"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 group-has-indeterminate:opacity-100"
            />
          </svg>
        </div>
      </div>
      <div>{todo.title}</div>
      <div></div>
    </div>

  )
}
