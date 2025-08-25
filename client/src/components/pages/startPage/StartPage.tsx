import { Link } from 'react-router'
import { ROUTE_PATHS } from '../../../shared/consts'
import type { PropsWithChildren } from 'react'
import type React from 'react'
import { useAppSelector } from '../../../app/store/hooks'

interface StartPageLinkProps extends PropsWithChildren {
  route: string
}

const StartPageLink: React.FC<StartPageLinkProps> = ({ route, children }) => (
  <Link
    to={route}
    className="font-semibold text-sky-700 transition duration-200 ease-[cubic-bezier(.645,.045,.355,1)]
         hover:text-sky-600 active:text-sky-500"
  >
    {children}
  </Link>
)

const StartPage = () => {
  const { username, refreshToken } = useAppSelector(state => state.auth)

  const isSignIn = username && refreshToken

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-6 text-lg md:text-xl">
      <span className="text-center text-pretty">Добро пожаловать в TodoApp</span>
      {!isSignIn && (
        <span className="text-center text-pretty">
          Для продолжения
          {' '}
          <StartPageLink route={ROUTE_PATHS.register}>зарегистрируйтесь</StartPageLink>
          {' '}
          или
          {' '}
          <StartPageLink route={ROUTE_PATHS.login}>авторизуйтесь</StartPageLink>
        </span>
      )}

    </div>
  )
}

export default StartPage
