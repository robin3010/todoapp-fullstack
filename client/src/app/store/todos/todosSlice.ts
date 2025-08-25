import { createSlice, type CaseReducer, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo } from '../../../shared/types/types'
import { getInitialState } from '../initState'

type TodoSliceReducer<P> = CaseReducer<Todo[], PayloadAction<P>>

const saveTodos: TodoSliceReducer<Todo[]> = (state, action) => state = action.payload
const todoAdd: TodoSliceReducer<Todo> = (state, action) => {
  state.push(action.payload)
}
const todoEdit: TodoSliceReducer<Todo> = (state, action) => state.map((todo) => {
  if (todo.id === action.payload.id) {
    return {
      ...todo,
      ...action.payload,
    }
  }
  return todo
})

const todoDelete: TodoSliceReducer<Todo> = (state, action) => state.filter(todo => todo.id !== action.payload.id)

// const initialState: Todo[] = []

export const todosSlice = createSlice({
  name: 'todosSlice',
  initialState: getInitialState().todos,
  reducers: {
    saveTodos,
    todoAdd,
    todoEdit,
    todoDelete,
  },
})

export const { actions: todosActions, reducer: todosReducer, selectors: todosSelectors } = todosSlice
