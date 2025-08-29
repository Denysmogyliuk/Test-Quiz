'use client'

import { QuizTypes } from '../types'
import { useId } from 'react'
import { useQuizCardContext } from '../quiz-card-context'
import classNames from 'classnames'
import styles from './multiple-choice.module.css'

const MultipleChoice: React.FC = () => {
  const { type, options, value, setValue } = useQuizCardContext()
  const id = useId()

  if (type !== QuizTypes.Multiple || !options) return null

  const valueArr = Array.isArray(value) ? value : []

  const handleToggle = (optionValue: string) => {
    if (valueArr.includes(optionValue)) {
      setValue(valueArr.filter((v) => v !== optionValue))
    } else {
      setValue([...valueArr, optionValue])
    }
  }

  return (
    <div className={styles.options}>
      {options.map((option) => (
        <label
          key={option.value}
          className={classNames(
            styles.option,
            valueArr.includes(option.value) && styles.optionSelected,
            styles.checkbox
          )}
        >
          <input
            type="checkbox"
            name={`multiple-choice-${id}`}
            checked={valueArr.includes(option.value)}
            onChange={() => handleToggle(option.value)}
          />

          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default MultipleChoice
