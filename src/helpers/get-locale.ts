export const getLocale = () => {
  if (typeof window === 'undefined') return 'en'
  const match = window.location.pathname.match(/^\/?([a-z]{2})\b/)
  return match ? match[1] : 'en'
}
