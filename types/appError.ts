export interface ApiError {
  message: string
  statusCode: number
  fields?: Record<string, string>  
}