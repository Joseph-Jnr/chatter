import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
})

instance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    if (typeof window !== 'undefined') {
      const getAuthTokenFromLS = localStorage.getItem('chatterAuthToken')

      if (getAuthTokenFromLS) {
        config.headers['Authorization'] = `Bearer ${getAuthTokenFromLS}`
      } else {
        delete config.headers['Authorization']
      }
    }

    return config
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
)

instance.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => response,
  async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('chatterRefreshToken')
      const accessToken = localStorage.getItem('chatterAuthToken')

      if (refreshToken && accessToken) {
        try {
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}`,
            { refresh: refreshToken }
          )

          const newAuthToken = refreshResponse?.data?.token

          if (newAuthToken) {
            localStorage.setItem('chatterAuthToken', newAuthToken)

            // Retry the original request with the new access token
            if (error.config) {
              error.config.headers['Authorization'] = `Bearer ${newAuthToken}`
              return axios.request(error.config)
            }
          }
        } catch (refreshError) {
          // Handle refresh token failure
          console.error('Failed to refresh access token:', refreshError)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default instance
