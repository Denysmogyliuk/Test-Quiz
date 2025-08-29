'use client'

import { useQuizCardContext } from '../quiz-card-context'
import Input from '@/components/ui/input/input'
import styles from './input-choice.module.css'
import { QuizTypes } from '../types'

const InputChoice: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { type, value, setValue } = useQuizCardContext()

  if (type !== QuizTypes.Input) return null

  return (
    <Input
      className={styles.inputField}
      type="text"
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default InputChoice
