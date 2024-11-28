// import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post('/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post('/login', body),
  logout: () => http.post('/logout')
}

export default authApi