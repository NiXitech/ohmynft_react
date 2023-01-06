import cookie from 'react-cookies'

// 获取当前用户cookie
export const LoginUserCookie = () => {
  return cookie.load('userInfo')
}

// 用户登录，保存cookie
export const OnLoginCookie = (user) => {
  cookie.save('userInfo', user, {
    path: '/'
  })
}

// 用户登出，删除cookie
export const LogoutCookie = () => {
  cookie.remove('userInfo')
  // window.location.href = '/Login'
}


// export const AddDomain = (str) => {
//   return `${RESOURCE_DOMAIN}${str}`;
// };