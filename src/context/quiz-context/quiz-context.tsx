'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'

import { clearStorageAnswers } from '@/helpers/clear-storage-answers'
import { getLocale } from '@/helpers/get-locale'
import { IAnswers, IQuizItem } from '@/types/quiz'
import { IQuizContext } from './types'
import { QUIZ_STORAGE_KEY } from '@/constants'
import { quizMocks } from './quiz-mocks'

const QuizContext = createContext<IQuizContext | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props

  const [quizzes, setQuizzes] = useState<IQuizItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const currentLocale = getLocale()

  const storageKey = `${QUIZ_STORAGE_KEY}_${currentLocale}`

  const getAnswers = () => {
    if (typeof window === 'undefined') return {}
    const saved = localStorage.getItem(storageKey)
    if (saved) return JSON.parse(saved)
    return {}
  }

  const [answers, setAnswersState] = useState<IAnswers>(getAnswers)

  const setAnswers = useCallback(
    (nextAnswers: IAnswers) => {
      setAnswersState(nextAnswers)
      if (typeof window === 'undefined') return

      localStorage.setItem(storageKey, JSON.stringify(nextAnswers))
    },
    [storageKey]
  )

  const loadQuizzes = useCallback(async () => {
    try {
      setIsLoading(true)
      await new Promise((res) => setTimeout(res, 500))
      setQuizzes(quizMocks[currentLocale] || [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [currentLocale])

  useEffect(() => {
    loadQuizzes()
  }, [loadQuizzes, currentLocale])

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)

    if (saved) setAnswersState(JSON.parse(saved))
  }, [storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers))
  }, [answers, storageKey])

  const clearAnswers = useCallback(() => {
    setAnswers({})

    clearStorageAnswers()
  }, [setAnswers])

  return (
    <QuizContext.Provider
      value={{
        answers,
        clearAnswers,
        isLoading,
        loadQuizzes,
        quizzes,
        setAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuizContext = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider!')
  }

  return context
}
