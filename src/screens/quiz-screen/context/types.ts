import { IAnswers, IQuizItem } from '@/types/quiz'

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
