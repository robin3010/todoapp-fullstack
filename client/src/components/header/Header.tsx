import { Link, NavLink } from 'react-router'
import { useAppSelector } from '../../app/store/hooks'

export const Header: React.FC = () => {
  const { username, refreshToken } = useAppSelector(state => state.auth)

  const isSignIn = username && refreshToken

  return (
    <header className="flex items-center gap-5 border-b-2 border-b-sky-600/30 bg-linear-30 from-white/80 from-0% to-sky-200/30 to-55% p-5 text-stone-500  drop-shadow-sm drop-shadow-sky-600/25 sm:gap-3">
      <Link to="/" className="-mt-1 mr-auto text-xl text-stone-900 md:text-2xl">TodoApp</Link>
      <NavLink to="/todos" className="text-sm hover:text-stone-700 md:text-base">Задачи</NavLink>
      <div className="flex items-center gap-5">
        <Link to="/login" className="flex items-center gap-1 text-lg hover:text-stone-700 md:text-2xl">
          {isSignIn && (
            <span className="text-sm md:text-base">
              {username}
            </span>
          )}
          <i className="fa-solid fa-user"></i>
        </Link>
        { isSignIn && <Link to="/" className="text-lg hover:text-stone-700 md:text-2xl"><i className="fa-solid fa-right-from-bracket"></i></Link>}
      </div>
    </header>
  )
}
