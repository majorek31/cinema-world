interface LoginCredentials {
  email: string
  password: string
}
interface RegisterCredentials {
  email: string
  password: string
}
interface ApiResponse {
  error: boolean
  data: any | undefined
}
