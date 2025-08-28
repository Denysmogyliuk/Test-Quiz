'use client'

import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import type { Theme } from '@/helpers/get-init-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const savedTheme = getCookie('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    setCookie('theme', newTheme, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      document.documentElement.setAttribute(
        'data-theme',
        prefersDark ? 'dark' : 'light'
      )
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }

  const getCurrentTheme = (): 'light' | 'dark' => {
    if (!isMounted) {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      return (currentTheme as 'light' | 'dark') || 'dark'
    }

    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
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
