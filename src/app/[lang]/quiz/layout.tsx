import { QuizFlowProvider } from '@/screens/quiz-screen/context/quiz-flow-provider'
import QuizFlowLayout from '@/screens/quiz-screen/quiz-screen'

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QuizFlowProvider>
      <QuizFlowLayout>{children}</QuizFlowLayout>
    </QuizFlowProvider>
  )
}
