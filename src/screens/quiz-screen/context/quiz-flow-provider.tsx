'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getLocale } from '@/helpers/get-locale'
import { IQuizFlowContext, IQuizItem, IQuizTransition } from './types'
import { QUIZ_STORAGE_KEY, REDIRECT_DELAY } from '@/constants'
import { QuizTypes } from '@/components/quiz-card'
import { useLocalizedRouter } from '@/hooks/use-localized-router'
import { useParams } from 'next/navigation'
import { useQuizContext } from '@/context/quiz-context/quiz-context'

const QuizFlowContext = createContext<IQuizFlowContext | undefined>(undefined)

export const QuizFlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useLocalizedRouter()
  const { quizzes, answers, setAnswers, isLoading } = useQuizContext()

  const params = useParams<{ step?: string }>()

  const advanceTimer = useRef<number | null>(null)

  const [isTransitioning, setIsTransitioning] = useState(false)

  const getNextId = (
    item: IQuizItem,
    answer: string | string[] | undefined
  ): string | undefined => {
    if (!item.transitions || item.transitions.length === 0) return undefined

    const matches = (transition: IQuizTransition) => {
      if (!transition.when) return true
      const c = transition.when

      if (c.equals !== undefined)
        return typeof answer === 'string' && answer === c.equals

      if (c.includesAny && Array.isArray(answer))
        return answer.some((a) => c.includesAny!.includes(a))

      if (c.includesAll && Array.isArray(answer))
        return c.includesAll.every((a) => answer.includes(a))
      return false
    }
    const chosen = item.transitions.find(matches)
    return chosen?.to
  }

  const computeFlow = (): IQuizItem[] => {
    if (quizzes.length === 0) return []
    const idToItem = new Map(quizzes.map((quiz) => [quiz.id, quiz] as const))

    const result: IQuizItem[] = []

    const visited = new Set<string>()

    let current: IQuizItem | undefined =
      idToItem.get('qlang') || idToItem.get('qt1') || quizzes[0]

    while (current && !visited.has(current.id)) {
      result.push(current)
      visited.add(current.id)
      const nextId = getNextId(current, answers[current.id])
      if (!nextId) break
      current = idToItem.get(nextId)
    }

    return result
  }

  const flow = computeFlow()

  const computeMaxSteps = (): number => {
    if (quizzes.length === 0) return 0
    const idToItem = new Map(quizzes.map((quiz) => [quiz.id, quiz] as const))
    const start = idToItem.get('qlang') || idToItem.get('qt1') || quizzes[0]

    const memo = new Map<string, number>()

    const dfs = (id: string): number => {
      if (memo.has(id)) return memo.get(id) as number
      const node = idToItem.get(id)
      if (!node) return 0
      if (!node.transitions || node.transitions.length === 0) {
        memo.set(id, 1)
        return 1
      }
      let best = 0
      for (const t of node.transitions) best = Math.max(best, dfs(t.to))
      const total = 1 + best
      memo.set(id, total)
      return total
    }

    return dfs(start.id)
  }

  const totalSteps = computeMaxSteps()

  const currentLocale = getLocale()
  const stepFromPath = Array.isArray(params?.step)
    ? params?.step?.[0]
    : params?.step
  const step = Math.max(
    0,
    Math.min(Number(stepFromPath || '1') - 1, Math.max(1, totalSteps) - 1)
  )
  const question = flow[step]

  const ableNextButton =
    question?.type === QuizTypes.Single ||
    question?.type === QuizTypes.Tile ||
    question?.type === QuizTypes.Language

  const handleChange = (value: string | string[]) => {
    if (!question) return
    const idToIndex = new Map(
      flow.map((quiz, index) => [quiz.id, index] as const)
    )

    const nextAnswers = { ...answers, [question.id]: value }

    for (const key of Object.keys(nextAnswers)) {
      const idx = idToIndex.get(key)
      if (idx !== undefined && idx > step) {
        delete (nextAnswers as Record<string, string | string[]>)[key]
      }
    }

    setAnswers(nextAnswers)

    if (question?.type === QuizTypes.Language) {
      return
    }

    if (ableNextButton) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
      setIsTransitioning(true)

      advanceTimer.current = window.setTimeout(() => {
        if (step < totalSteps - 1) {
          goStep(step + 1)
          return
        }

        handleFinish()
      }, REDIRECT_DELAY)
    }
  }

  const goStep = (newStep: number) => {
    setIsTransitioning(true)
    router.push(`/quiz/${newStep + 1}`)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleFinish = () => {
    setIsTransitioning(true)
    if (typeof window !== 'undefined') {
      const storageKey = `${QUIZ_STORAGE_KEY}_${currentLocale}`
      localStorage.setItem(storageKey, JSON.stringify(answers))
    }
    router.push(`/verify`)
  }

  const showNextButton =
    question?.type === QuizTypes.Multiple ||
    question?.type === QuizTypes.Bubble ||
    question?.type === QuizTypes.Input

  const canGoNext = (() => {
    if (!question) return false
    const value = answers[question.id]
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value.trim().length > 0
    return false
  })()

  const value = {
    ableNextButton,
    answers,
    canGoNext,
    goStep,
    handleChange,
    handleFinish,
    isLoading,
    isTransitioning,
    question,
    showNextButton,
    step,
    totalSteps,
  }

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  return (
    <QuizFlowContext.Provider value={value}>
      {children}
    </QuizFlowContext.Provider>
  )
}

export const useQuizFlowContext = () => {
  const ctx = useContext(QuizFlowContext)
  if (!ctx)
    throw new Error('useQuizFlowContext must be used within QuizFlowProvider')
  return ctx
}
