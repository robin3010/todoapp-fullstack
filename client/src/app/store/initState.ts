import { RTK_KEY } from '../../shared/consts'
import type { Todo, User } from '../../shared/types/types'

interface InitRootState {
  auth: User
  todos: Todo[]
}

export const initialState: InitRootState = {
  auth: {
    id: '',
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  todos: [],
}

export const getInitialState = () => {
  const localStore = localStorage.getItem(RTK_KEY)

  return localStore ? JSON.parse(localStore) as InitRootState : initialState
}
