import { cookies } from 'next/headers'

export type Theme = 'light' | 'dark' | 'system'

export const getThemeFromCookies = async (): Promise<Theme> => {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value as Theme

  if (theme && ['light', 'dark', 'system'].includes(theme)) {
    return theme
  }

  return 'system'
}

export const getInitialTheme = async (): Promise<'light' | 'dark'> => {
  const theme = await getThemeFromCookies()

  if (theme === 'system') {
    return 'dark'
  }

  return theme
}
