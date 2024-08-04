import { getCookie } from 'cookies-next';

const getAuthCookie = (name: string) => {
  const cookie = getCookie(name)

  if (!cookie) return undefined

  return cookie
};

export const getValidAuthTokens = () => {
  const token = getAuthCookie('access_token')

  const now = new Date()
  const tokenDate = new Date(token || 0)

  return {
    token: now < tokenDate ? token : undefined,
  }
}