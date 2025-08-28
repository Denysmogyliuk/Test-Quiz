import { I18n } from '@lingui/core'
import { IAnswers } from './types'
import { IQuizItem } from '@/types/quiz'
import { LANGUAGE_NAMES } from '@/constants'
import { QuizTypes } from '@/components/quiz-card/types'
import { stripHighlighting } from '@/helpers/render-highlighted'
import { t } from '@lingui/macro'

export const getAnswerLabel = (
  quiz: IQuizItem,
  answer: string | string[] | undefined
) => {
  if (quiz.type === QuizTypes.Language && typeof answer === 'string') {
    return LANGUAGE_NAMES[answer] || answer || '-'
  }

  if (quiz.type === QuizTypes.Single || quiz.type === QuizTypes.Tile) {
    const opt = quiz.options.find((o) => o.value === answer)
    return opt ? opt.label : answer || '-'
  }

  if (
    (quiz.type === QuizTypes.Multiple || quiz.type === QuizTypes.Bubble) &&
    Array.isArray(answer)
  ) {
    return answer
      .map((val) => quiz.options.find((o) => o.value === val)?.label || val)
      .join(', ')
  }

  if (quiz.type === QuizTypes.Input) {
    return answer || '-'
  }
  return '-'
}

const escapeCsv = (v: string) => `"${v.replace(/"/g, '""')}"`

export const downloadFile = (
  answers: IAnswers,
  quizzes: IQuizItem[],
  i18n?: I18n
) => {
  const rows: string[] = []
  const i18nSafe =
    (i18n as I18n) ||
    ({
      _: (id: string) => id,
    } as unknown as I18n)
  rows.push(
    [
      t(i18nSafe)`order`,
      t(i18nSafe)`title`,
      t(i18nSafe)`type`,
      t(i18nSafe)`answer`,
    ].join(',')
  )

  const answered = quizzes.filter((quiz) => {
    const ans = answers[quiz.id]
    if (Array.isArray(ans)) return ans.length > 0
    return ans !== undefined && ans !== ''
  })

  answered.forEach((quiz, idx) => {
    const answer = String(getAnswerLabel(quiz, answers[quiz.id]))
    rows.push(
      [
        String(idx + 1),
        stripHighlighting(quiz.question),
        String(quiz.type),
        answer,
      ]
        .map(escapeCsv)
        .join(',')
    )
  })

  const csv = rows.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${t(i18nSafe)`quiz-results`}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
