import { createBrowserRouter } from 'react-router'
import App from '../App'
import StartPage from '../../components/pages/startPage/StartPage'
import AuthPage from '../../components/pages/authPage/AuthPage'
import { ROUTE_PATHS } from '../../shared/consts'
import TodosPage from '../../components/pages/todosPage/TodosPage'

export const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        index: true,
        Component: StartPage,
      },
      {
        path: ROUTE_PATHS.login,
        Component: AuthPage,
      },
      {
        path: ROUTE_PATHS.register,
        Component: AuthPage,
      },
      {
        path: ROUTE_PATHS.todos,
        Component: TodosPage,
      },
    ],
  },
])
