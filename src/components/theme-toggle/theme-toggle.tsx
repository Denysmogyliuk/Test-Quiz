'use client'

import { useEffect } from 'react'
import styles from './theme-toggle.module.css'
import { useTheme } from '@/hooks/use-theme'
import classNames from 'classnames'
import ButtonRaw from '../ui/button/button-raw'

export const ThemeToggle: React.FC = () => {
  const { theme, isMounted, updateTheme, getCurrentTheme } = useTheme()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        document.documentElement.setAttribute(
          'data-theme',
          e.matches ? 'dark' : 'light'
        )
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [theme])

  const toggleTheme = () => {
    const currentTheme = getCurrentTheme()
    const isSystemTheme = theme === 'system'

    if (isSystemTheme) {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      updateTheme(newTheme)
    } else {
      updateTheme('system')
    }
  }

  const getThemeLabel = () => {
    const currentTheme = getCurrentTheme()
    const isSystemTheme = theme === 'system'

    if (isSystemTheme) {
      return 'System theme'
    }
    return currentTheme === 'dark' ? 'Dark theme' : 'Light theme'
  }

  if (!isMounted) {
    return null
  }

  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  return (
    <ButtonRaw
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
    >
      <div
        className={classNames(
          styles.toggleThumb,
          isDark ? styles.dark : styles.light
        )}
      >
        <div className={styles.iconContainer}>
          {isDark ? (
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          ) : (
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
            </svg>
          )}
        </div>
      </div>
    </ButtonRaw>
  )
}
