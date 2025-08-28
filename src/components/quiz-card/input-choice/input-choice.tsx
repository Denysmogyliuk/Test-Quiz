import { useContext } from 'react'
import Input from '@/components/ui/input/input'
import styles from './input-choice.module.css'
import { QuizCardContext } from '../quiz-card-context'

const InputChoice: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const context = useContext(QuizCardContext)

  if (!context || context.type !== 'input') return null

  return (
    <Input
      className={styles.inputField}
      type="text"
      value={typeof context.value === 'string' ? context.value : ''}
      onChange={(e) => context.setValue(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export default InputChoice
