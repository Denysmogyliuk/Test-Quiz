import { createContext, useContext } from 'react'
import { IQuizCardContext } from './types'

export const QuizCardContext = createContext<IQuizCardContext | undefined>(
  undefined
)

export const useQuizCardContext = () => {
  const ctx = useContext(QuizCardContext)
  if (!ctx) {
    throw new Error(
      'useQuizCardContext must be used within a QuizCard provider'
    )
  }
  return ctx
}
