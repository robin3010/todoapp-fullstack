import axios, { AxiosError } from 'axios'
import { userApi } from './userApi'
import { API_BASE_URL, API_PATHS, RTK_KEY } from '../../shared/consts'
import { initialState } from '../store/initState'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  (config) => {
    const { url } = config

    if (url !== `${API_BASE_URL}${API_PATHS.login}` && `${API_BASE_URL}${API_PATHS.register}`) {
      const localStore = localStorage.getItem(RTK_KEY)

      const { auth: { accessToken } } = localStore ? JSON.parse(localStore) as typeof initialState : initialState

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    }
    return config
  },
  (error: Error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error?.config

    if (error?.response?.status === 401 && typeof config !== 'undefined') {
      const localStore = localStorage.getItem(RTK_KEY)

      const { auth: { refreshToken } } = localStore ? JSON.parse(localStore) as typeof initialState : initialState

      const [useRefreshTokens] = userApi.useRefreshTokensMutation()
      const tokensResult = await useRefreshTokens(refreshToken)

      if (tokensResult.data) {
        // config.headers = {
        //   ...config.headers,
        //   authorization: `Bearer ${result?.accessToken}`,
        // };
        config.headers.Authorization = `Bearer ${tokensResult.data.accessToken}`
        console.log('axiosRefresh', { config })
      }

      await axiosInstance(config)
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
