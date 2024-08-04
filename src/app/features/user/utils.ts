import { setCookie } from 'cookies-next'

export const setAuthCookie = (token: string, name: string) => {

  setCookie(name, `Bearer ${token}`, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    domain: 'http://185.125.231.131/',
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  })
}