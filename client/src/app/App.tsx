import { Provider } from 'react-redux'
import { store } from './store/store'
import Footer from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router'

const App = () => (
  <Provider store={store}>
    <div className="font-noto flex min-h-dvh flex-col text-stone-800">
      <Header />
      <main className="flex w-full grow justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  </Provider>
)

export default App
