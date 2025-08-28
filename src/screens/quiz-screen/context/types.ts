import { QuizTypes } from '@/components/quiz-card/types'

export interface IQuizOption {
  value: string
  label: string
}

export interface IQuizItem {
  id: string
  type: QuizTypes
  question: string
  options: IQuizOption[]
  transitions?: IQuizTransition[]
  description?: string
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

export type IAnswers = {
  [questionId: string]: string | string[]
}

export interface IQuizFlowContext {
  ableNextButton: boolean
  answers: IAnswers
  canGoNext: boolean
  goStep: (newStep: number) => void
  handleChange: (value: string | string[]) => void
  handleFinish: () => void
  isLoading: boolean
  isTransitioning: boolean
  question?: IQuizItem
  showNextButton: boolean
  step: number
  totalSteps: number
}
