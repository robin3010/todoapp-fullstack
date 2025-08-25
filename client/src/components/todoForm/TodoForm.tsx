import { useState, type FormEvent } from 'react'
import { useAppDispatch } from '../../app/store/hooks'
import { todosActions } from '../../app/store/todos/todosSlice'
import { todosApi } from '../../app/api/todosApi'

export const TodoForm = () => {
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()
  const { todoAdd } = todosActions
  const [todoAddRequest] = todosApi.useAddTodoMutation()

  const addTodoHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const resultTodo = await todoAddRequest({ title })

    if (typeof resultTodo.data !== 'undefined') {
      dispatch(todoAdd(resultTodo.data))
      setTitle('')
    }
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <form className="space-y-6" onSubmit={addTodoHandler}>
      <div className="flex items-center justify-center gap-3">
        <div className="w-full">
          <input
            value={title}
            id="title"
            name="title"
            required
            onChange={e => setTitle(e.target.value.replace(/[\s]/g, ''))}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm/6 font-medium text-white shadow-xs hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:bg-sky-500"
          >
            Добавить
          </button>
        </div>
      </div>
    </form>
  )
}
