import Routes from '@/data/routes'
import { accessTokenAtom } from '@/data/store'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { isEmpty } from 'lodash-es'
import { useNavigate } from 'react-router-dom'
export const AXIOS_INSTANCE = Axios.create({ baseURL: import.meta.env.VITE_AUTH_API_BASE_URL })

export const useCustomInstance = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
  const headers: { 'x-platform': string; Authorization?: string } = {
    'x-platform': 'cause-i',
  }

  if (!isEmpty(accessToken)) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source()

    // Adding a response interceptor
    AXIOS_INSTANCE.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          setAccessToken(RESET)
          navigate(Routes.LOGIN)
        }
        // Always return a rejected promise so the error can be handled downstream as well
        return Promise.reject(error)
      }
    )

    const promise = AXIOS_INSTANCE({
      ...config,
      headers,
      cancelToken: source.token,
    }).then(({ data }) => {
      if (config.method === 'DELETE') {
        setAccessToken(RESET)
      }
      
      return data
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query')
    }

    return promise
  }
}

export default useCustomInstance

export type ErrorType<Error> = AxiosError<Error>
