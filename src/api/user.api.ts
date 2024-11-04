import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<User, '_id' | 'role' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userAPI = {
  getProfile(): Promise<SuccessResponse<User>> {
    return http.get('me')
  },
  updateProfile(body: BodyUpdateProfile): Promise<SuccessResponse<User>> {
    return http.put('user', body)
  }, 
  uploadAvatar(body: FormData): Promise<SuccessResponse<string>>{
    return http.post('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
