import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { isEmpty } from 'lodash-es'
import { useNavigate } from 'react-router-dom'
import Routes from '@/data/routes'
import { accessTokenAtom } from '@/data/store'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'

export const AXIOS_INSTANCE = Axios.create({ baseURL: import.meta.env.VITE_SURVEY_API_BASE_URL })

export const useCustomInstance = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
  const navigate = useNavigate()
  const headers: { Authorization?: string } = {}
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
    }).then(({ data }) => data)

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
