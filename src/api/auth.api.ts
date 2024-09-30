import { AuthResponse } from 'src/types/auth.type';
import http from 'src/utils/http'

export const registerAccount = (body: { emai: string; password: string }) => http.post<AuthResponse>('/register', body)
