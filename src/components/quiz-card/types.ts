export enum QuizTypes {
  Single = 'single',
  Multiple = 'multiple',
  Input = 'input',
  Bubble = 'bubble',
  Tile = 'tile',
  Language = 'language',
}

export interface IQuizOption {
  value: string
  label: string
}

export interface IQuizCardContext {
  value: string | string[]
  setValue: (value: string | string[]) => void
  type: QuizTypes
  options?: IQuizOption[]
}
