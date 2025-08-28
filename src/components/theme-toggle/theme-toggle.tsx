'use client'

import { useEffect } from 'react'
import styles from './theme-toggle.module.css'
import { useTheme } from '@/hooks/use-theme'
import classNames from 'classnames'
import ButtonRaw from '../ui/button/button-raw'
import SunIcon from '../icons/SunIcon'
import MoonIcon from '../icons/MoonIcon'

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
            <SunIcon className={styles.icon} />
          ) : (
            <MoonIcon className={styles.icon} />
          )}
        </div>
      </div>
    </ButtonRaw>
  )
}
