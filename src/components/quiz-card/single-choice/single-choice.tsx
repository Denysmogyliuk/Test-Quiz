'use client'

import { QuizTypes } from '../types'
import { useId } from 'react'
import { useQuizCardContext } from '../quiz-card-context'
import classNames from 'classnames'
import styles from './single-choice.module.css'

const SingleChoice: React.FC = () => {
  const { type, options, value, setValue } = useQuizCardContext()
  const id = useId()

  if (type !== QuizTypes.Single || !options) return null

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <label
          key={option.value}
          className={classNames(
            styles.option,
            value === option.value && styles.optionSelected,
            styles.radio
          )}
        >
          <input
            type="radio"
            name={`single-choice-${id}`}
            checked={value === option.value}
            onChange={() => setValue(option.value)}
          />

          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default SingleChoice
