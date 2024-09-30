type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: string[]
  email: string
  name: string
  date_of_birh: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}