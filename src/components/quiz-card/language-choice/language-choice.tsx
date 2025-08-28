'use client'

import { LANGUAGE_NAMES, LOCALES } from '@/constants'
import { useQuizCardContext } from '../quiz-card-context'
import { useQuizContext } from '@/context/quiz-context/quiz-context'
import { useRouter } from 'next/navigation'
import ButtonRaw from '@/components/ui/button/button-raw'
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './language-choice.module.css'

const LanguageChoice: React.FC = () => {
  const { setValue, value } = useQuizCardContext()
  const router = useRouter()
  const { clearAnswers } = useQuizContext()

  const isSelected = (optionValue: string) => {
    return Array.isArray(value)
      ? value.includes(optionValue)
      : value === optionValue
  }

  const redirectTimer = useRef<number | null>(null)

  const onSelect = async (locale: string) => {
    clearAnswers()
    setValue(locale)

    if (redirectTimer.current) window.clearTimeout(redirectTimer.current)
    redirectTimer.current = window.setTimeout(() => {
      router.push(`/${locale}/quiz/2`)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (redirectTimer.current) window.clearTimeout(redirectTimer.current)
    }
  }, [])

  return (
    <div className={styles.options}>
      {LOCALES.map((locale) => {
        const label = LANGUAGE_NAMES[locale] || locale

        return (
          <ButtonRaw
            key={locale}
            type="button"
            onClick={() => onSelect(locale)}
            className={classNames(
              styles.option,
              isSelected(locale) && styles.optionSelected
            )}
          >
            {label}
          </ButtonRaw>
        )
      })}
    </div>
  )
}

export default LanguageChoice
