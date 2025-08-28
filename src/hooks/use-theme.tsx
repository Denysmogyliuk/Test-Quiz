'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import type { Theme } from '@/helpers/get-init-theme'
import {
  DATA_THEME_ATTRIBUTE,
  THEME_COOKIE_MAX_AGE_SECONDS,
  THEME_COOKIE_NAME,
  THEME_DARK_MEDIA_QUERY,
} from '@/constants'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const savedTheme = getCookie(THEME_COOKIE_NAME) as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    setCookie(THEME_COOKIE_NAME, newTheme, {
      maxAge: THEME_COOKIE_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
    })

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia(THEME_DARK_MEDIA_QUERY).matches
      document.documentElement.setAttribute(
        DATA_THEME_ATTRIBUTE,
        prefersDark ? 'dark' : 'light'
      )
    } else {
      document.documentElement.setAttribute(DATA_THEME_ATTRIBUTE, newTheme)
    }
  }

  const getCurrentTheme = (): 'light' | 'dark' => {
    if (!isMounted) {
      const currentTheme =
        document.documentElement.getAttribute(DATA_THEME_ATTRIBUTE)
      return (currentTheme as 'light' | 'dark') || 'dark'
    }

    if (theme === 'system') {
      return window.matchMedia(THEME_DARK_MEDIA_QUERY).matches
        ? 'dark'
        : 'light'
    }
    return theme
  }

  return {
    theme,
    isMounted,
    updateTheme,
    getCurrentTheme,
  }
}
