import { useContext, useId } from 'react'
import classNames from 'classnames'
import styles from './multiple-choice.module.css'
import { QuizCardContext } from '../quiz-card-context'

const MultipleChoice: React.FC = () => {
  const context = useContext(QuizCardContext)
  const id = useId()

  if (!context || context.type !== 'multiple' || !context.options) return null

  const valueArr = Array.isArray(context.value) ? context.value : []

  const handleToggle = (optionValue: string) => {
    if (valueArr.includes(optionValue)) {
      context.setValue(valueArr.filter((v) => v !== optionValue))
    } else {
      context.setValue([...valueArr, optionValue])
    }
  }

  return (
    <div className={styles.options}>
      {context.options.map((option) => (
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
