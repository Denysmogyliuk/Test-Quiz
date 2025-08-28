import type { QuizTypes } from '@/components/quiz-card/types'

export interface IQuizOption {
  value: string
  label: string
}

export interface IQuizTransitionCondition {
  equals?: string
  includesAny?: string[]
  includesAll?: string[]
}

export interface IQuizTransition {
  to: string
  when?: IQuizTransitionCondition
}

export interface IQuizItem {
  id: string
  type: QuizTypes
  question: string
  options: IQuizOption[]
  transitions?: IQuizTransition[]
  description?: string
}

export interface IAnswers {
  [questionId: string]: string | string[]
}
