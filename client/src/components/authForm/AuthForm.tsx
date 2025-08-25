import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ROUTE_PATHS } from '../../shared/consts'
import { useAppDispatch } from '../../app/store/hooks'
import { userApi } from '../../app/api/userApi'
import { authActions } from '../../app/store/auth/authSlice'
import type { Credentials, LocationState } from '../../shared/types/types'

interface AuthFormProps {
  isSignUpRoute: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUpRoute }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation().state as LocationState

  const [userInput, setUserInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [login, loginResult] = userApi.useLoginMutation()
  const [register] = userApi.useRegisterMutation()

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: unknown = Object.fromEntries(new FormData(e.currentTarget))

    if (isSignUpRoute) {
      const { data } = await register(formData as Credentials)

      if (data) {
        dispatch(authActions.saveUser(data))

        return navigate('/')
      }
      return
    }
    const { data } = await login(formData as Credentials)

    if (data) {
      dispatch(authActions.saveUser(data))

      if (location?.from) return navigate(location.from)

      return navigate('/')
    }
  }
  console.log('authForm', { loginResult })

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 sm:w-full sm:max-w-sm lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-stone-700">
          {isSignUpRoute ? 'Регистрация' : 'Авторизация'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-stone-800">
              Имя пользователя
            </label>
            <div className="mt-2">
              <input
                value={userInput}
                id="username"
                name="username"
                required
                autoComplete="username"
                onChange={e => setUserInput(e.target.value.replace(/[\s]/g, ''))}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-stone-800">
                Пароль
              </label>
              {!isSignUpRoute && (
                <div className="text-sm">
                  <a href="#" className="font-semibold text-sky-700 transition duration-200 ease-[cubic-bezier(.645,.045,.355,1)] hover:text-sky-600 active:text-sky-500">
                    Забыли пароль?
                  </a>
                </div>
              )}
            </div>
            <div className="mt-2">
              <input
                value={passwordInput}
                id="password"
                name="password"
                type="password"
                required
                onChange={e => setPasswordInput(e.target.value.replace(/[\s]/g, ''))}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!userInput && !passwordInput}
              className="flex w-full justify-center rounded-md bg-sky-700  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs transition duration-300 ease-[cubic-bezier(.645,.045,.355,1)] hover:not-disabled:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:not-disabled:bg-sky-500 disabled:bg-sky-600/50"
            >
              {isSignUpRoute ? 'Регистрация' : 'Вход'}
            </button>
          </div>
        </form>
        {loginResult.isError && <p className="mt-4 w-full rounded-md bg-red-100 p-3 text-center text-sm/6 font-medium text-pretty text-red-500">errorrrrrrrrrr</p>}
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {isSignUpRoute ? 'Уже' : 'Еще не'}
          {' '}
          зарегистрированы?
          {' '}
          <Link
            to={isSignUpRoute ? ROUTE_PATHS.login : ROUTE_PATHS.register}
            className="font-semibold text-sky-700 transition duration-200 ease-[cubic-bezier(.645,.045,.355,1)]
     hover:text-sky-600 active:text-sky-500"
          >
            {!isSignUpRoute ? 'Регистрация' : 'Авторизация'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
