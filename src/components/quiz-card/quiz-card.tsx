import { useState, ReactNode } from 'react'
import styles from './quiz-card.module.css'
import { IQuizOption, QuizTypes } from './types'
import { Card } from '../ui/card/card'
import { Text } from '../typography/text/text'
import { QuizCardContext } from './quiz-card-context'
import classNames from 'classnames'

export interface QuizCardProps {
  children: ReactNode
  defaultValue?: string | string[]
  description?: string
  isLoading?: boolean
  onChange?: (value: string | string[]) => void
  options?: IQuizOption[]
  question: string
  type: QuizTypes
  value?: string | string[]
}

export const QuizCard: React.FC<QuizCardProps> = (props) => {
  const {
    children,
    defaultValue,
    description,
    isLoading,
    onChange,
    options,
    question,
    type,
    value,
  } = props

  const isControlled = value !== undefined

  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue !== undefined
      ? defaultValue
      : type === QuizTypes.Multiple || type === QuizTypes.Bubble
        ? []
        : ''
  )

  const currentValue = isControlled ? value! : internalValue

  const setValue = (value: string | string[]) => {
    if (!isControlled) setInternalValue(value)
    onChange?.(value)
  }
  return (
    <Card className={classNames(styles.quizCard, isLoading && styles.loading)}>
      <Text size={2} bold>
        {question}
      </Text>

      {description && (
        <Text size={4} color="secondary">
          {description}
        </Text>
      )}

      <QuizCardContext.Provider
        value={{ value: currentValue, setValue, type, options }}
      >
        {children}
      </QuizCardContext.Provider>
    </Card>
  )
}
