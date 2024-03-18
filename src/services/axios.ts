import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// Function to retrieve the bearer token from local storage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('chatterAuthToken')
  }
  return null
}

const token = getAuthToken()

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
)

const successHandler = (response: AxiosResponse): AxiosResponse => response
const errorHandler = (error: AxiosError | Error): Promise<AxiosError> =>
  Promise.reject(error)

instance.interceptors.response.use(successHandler, errorHandler)

export default instance
