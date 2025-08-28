'use client'

import { Loader } from '@/components/ui/loader/loader'
import { QuizScreen } from '@/screens/quiz-screen/quiz-block/quiz-block'
import { Suspense } from 'react'

export default function QuizStepPage() {
  return (
    <Suspense fallback={<Loader />}>
      <QuizScreen />
    </Suspense>
  )
}
