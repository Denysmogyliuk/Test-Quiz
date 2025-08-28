'use client'

import styles from './quiz-block.module.css'
import { QuizCard } from '@/components/quiz-card'
import { QuizTypes } from '@/components/quiz-card'
import { useQuizFlowContext } from '../context/quiz-flow-provider'

export const QuizScreen = () => {
  const { answers, handleChange, isTransitioning, question } =
    useQuizFlowContext()

  if (!question) return null

  return (
    <section className={styles.quizContainer}>
      <QuizCard
        question={question?.question}
        type={question?.type}
        options={question?.options}
        value={answers[question?.id]}
        onChange={handleChange}
        isLoading={isTransitioning}
        description={question?.description}
      >
        {question?.type === QuizTypes.Single && <QuizCard.SingleChoice />}
        {question?.type === QuizTypes.Multiple && <QuizCard.MultipleChoice />}
        {question?.type === QuizTypes.Bubble && <QuizCard.Bubble />}
        {question?.type === QuizTypes.Tile && <QuizCard.Tile />}
        {question?.type === QuizTypes.Input && <QuizCard.Input />}
        {question?.type === QuizTypes.Language && <QuizCard.Language />}
      </QuizCard>
    </section>
  )
}
