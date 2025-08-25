import { useLocation } from 'react-router'
import { ROUTE_PATHS } from '../../../shared/consts'
import AuthForm from '../../authForm/AuthForm'

const AuthPage = () => {
  const { pathname } = useLocation()

  const isSignUpRoute = pathname === ROUTE_PATHS.register

  return (
    <AuthForm isSignUpRoute={isSignUpRoute} />
  )
}

export default AuthPage
