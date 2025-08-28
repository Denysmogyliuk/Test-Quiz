import { useContext, useId } from 'react'
import classNames from 'classnames'
import styles from './single-choice.module.css'
import { QuizCardContext } from '../quiz-card-context'

const SingleChoice: React.FC = () => {
  const context = useContext(QuizCardContext)
  const id = useId()

  if (!context || context.type !== 'single' || !context.options) return null

  return (
    <div className={styles.options}>
      {context.options.map((option) => (
        <label
          key={option.value}
          className={classNames(
            styles.option,
            context.value === option.value && styles.optionSelected,
            styles.radio
          )}
        >
          <input
            type="radio"
            name={`single-choice-${id}`}
            checked={context.value === option.value}
            onChange={() => context.setValue(option.value)}
          />

          <span>{option.label}</span>
        </label>
      ))}
    </div>
  )
}

export default SingleChoice
