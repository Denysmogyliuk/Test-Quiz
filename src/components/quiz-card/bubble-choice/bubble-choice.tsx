'use client'

import { parseLabel } from '@/helpers/parse-label'
import { useQuizCardContext } from '../quiz-card-context'
import styles from './bubble-choice.module.css'
import cn from 'classnames'

const BubbleChoice: React.FC = () => {
  const { options = [], value, setValue, type } = useQuizCardContext()

  const isMultiple =
    type === 'multiple' || type === 'bubble' || Array.isArray(value)

  const handleToggle = (optionValue: string) => {
    if (isMultiple) {
      const current = Array.isArray(value) ? value : []
      const exists = current.includes(optionValue)
      const next = exists
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue]
      setValue(next)
    } else {
      setValue(optionValue)
    }
  }

  const isSelected = (optionValue: string) => {
    return Array.isArray(value)
      ? value.includes(optionValue)
      : value === optionValue
  }

  return (
    <div className={styles.bubblesGrid}>
      {options.map((option: { value: string; label: string }) => {
        const { emoji, text } = parseLabel(option.label)

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={cn(
              styles.bubble,
              isSelected(option.value) && styles.selected
            )}
          >
            {!!emoji && (
              <span className={styles.bubbleEmoji} aria-hidden>
                {emoji}
              </span>
            )}

            <span className={styles.bubbleLabel}>{text}</span>
          </button>
        )
      })}
    </div>
  )
}

export default BubbleChoice
