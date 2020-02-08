import Cookies from 'js-cookie'
import Config from '@/config'

const TokenKey = Config.TokenKey
const RoleKey = Config.RoleKey
const UserKey = Config.UserKey
const WorknoKey = Config.WorknoKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires / 24})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(role, rememberMe) {
  if (rememberMe) {
    return Cookies.set(RoleKey, role, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(RoleKey,role, { expires: Config.tokenCookieExpires / 24})
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}

export function setUser(user, rememberMe) {
  if (rememberMe) {
    return Cookies.set(UserKey, user, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(UserKey, user, { expires: Config.tokenCookieExpires / 24})
}

export function getUser() {
  return JSON.parse(Cookies.get(UserKey))
}
export function removeUser() {
  return Cookies.remove(UserKey)
}

export function setWorkno(workno, rememberMe) {
  if (rememberMe) {
    return Cookies.set(WorknoKey, workno, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(WorknoKey, workno, { expires: Config.tokenCookieExpires / 24})
}

export function getWorkno() {
  return Cookies.get(WorknoKey)
}

export function removeWorkno() {
  return Cookies.remove(WorknoKey)
}

export function hasRole(role){
  let roles = getRole() ? getRole().split(",") : ''
  for(let i = 0, len = roles.length; i < len; i++) {
    if(roles[i] == role){
      return true
    }
  }
  return false
}