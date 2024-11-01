const path = {
  home:'/',
  user:'/user',
  profile:'/user/profile',
  changePassword: '/user/password',
  historyBuy: '/user/history-buy',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart'
} as const

export default path