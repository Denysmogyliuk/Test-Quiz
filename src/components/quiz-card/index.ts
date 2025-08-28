import { QuizCard as BaseQuizCard, QuizCardProps } from './quiz-card'
import SingleChoice from './single-choice/single-choice'
import MultipleChoice from './multiple-choice/multiple-choice'
import InputChoice from './input-choice/input-choice'
import BubbleChoice from './bubble-choice/bubble-choice'
import TileChoice from './tile-choice/tile-choice'
import LanguageChoice from './language-choice/language-choice'

interface QuizCardCompound extends React.FC<QuizCardProps> {
  SingleChoice: React.FC
  MultipleChoice: React.FC
  Input: React.FC<{ placeholder?: string }>
  Bubble: React.FC
  Tile: React.FC
  Language: React.FC
}

const QuizCard = BaseQuizCard as QuizCardCompound
QuizCard.SingleChoice = SingleChoice
QuizCard.MultipleChoice = MultipleChoice
QuizCard.Input = InputChoice
QuizCard.Bubble = BubbleChoice
QuizCard.Tile = TileChoice
QuizCard.Language = LanguageChoice

export { QuizCard }
export * from './types'
export type { QuizCardProps }
