import { IAnswers, IQuizItem } from '@/types/quiz'

export interface IQuizContext {
  answers: IAnswers
  clearAnswers: () => void
  isLoading: boolean
  loadQuizzes: () => Promise<void>
  quizzes: IQuizItem[]
  setAnswers: (answers: IAnswers) => void
}
