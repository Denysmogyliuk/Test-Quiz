'use client'

import { useQuizCardContext } from '../quiz-card-context'
import styles from './tile-choice.module.css'
import cn from 'classnames'
import { parseLabel } from '@/helpers/parse-label'

const TileChoice: React.FC = () => {
  const { options = [], value, setValue } = useQuizCardContext()

  const isSelected = (optionValue: string) => {
    return Array.isArray(value)
      ? value.includes(optionValue)
      : value === optionValue
  }

  const onSelect = (optionValue: string) => setValue(optionValue)

  return (
    <div className={styles.tilesGrid}>
      {options.map((option: { value: string; label: string }) => {
        const { emoji, text } = parseLabel(option.label)
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(styles.tile, {
              [styles.tileSelected]: isSelected(option.value),
            })}
          >
            {!!emoji && (
              <span className={styles.tileEmoji} aria-hidden>
                {emoji}
              </span>
            )}

            <span className={styles.tileLabel}>{text}</span>
          </button>
        )
      })}
    </div>
  )
}

export default TileChoice
