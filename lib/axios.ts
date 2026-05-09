// import { env } from "@/config/envConfig"
import { ApiError } from "@/types/appError"
import axios, {
  AxiosError,
  AxiosResponse,
} from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Terjadi kesalahan"
    const apiError: ApiError = {
      message,
      statusCode: error.response?.status ?? 0,
      fields: error.response?.data?.fields,
    }
    return Promise.reject(apiError)
  }
)

export default api