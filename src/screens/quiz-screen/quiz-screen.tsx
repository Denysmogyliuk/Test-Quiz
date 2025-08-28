'use client'

import { AnimatedBlock } from '@/components/animated-block/animated-block'
import { Loader } from '@/components/ui/loader/loader'
import { ProgressBar } from '@/components/ui/progress-bar/progress-bar'
import { ReactNode } from 'react'
import { Trans } from '@lingui/react/macro'
import { useQuizFlowContext } from './context/quiz-flow-provider'
import ButtonFilled from '@/components/ui/button/button-filled'
import ButtonRaw from '@/components/ui/button/button-raw'
import styles from './quiz-screen.module.css'

type Props = { children: ReactNode }

export const QuizFlowLayout: React.FC<Props> = ({ children }) => {
  const {
    canGoNext,
    goStep,
    handleFinish,
    isLoading,
    isTransitioning,
    showNextButton,
    step,
    totalSteps,
  } = useQuizFlowContext()

  return (
    <section className={styles.quizContainer}>
      <Loader overlay open={isLoading} />

      {!isLoading && (
        <ProgressBar
          value={(step + 1) / Math.max(1, totalSteps)}
          current={step + 1}
          total={totalSteps}
        >
          <ButtonRaw
            disabled={step === 0}
            onClick={() => goStep(step - 1)}
            className={styles.prevButton}
          />
        </ProgressBar>
      )}

      <AnimatedBlock keyValue={step} className={styles.animatedContent}>
        {children}
      </AnimatedBlock>

      <nav className={styles.navigationBlock}>
        {showNextButton && step < totalSteps - 1 && (
          <ButtonFilled
            onClick={() => goStep(step + 1)}
            disabled={!canGoNext || isTransitioning}
          >
            <Trans>Next</Trans>
          </ButtonFilled>
        )}

        {showNextButton && step >= totalSteps - 1 && (
          <ButtonFilled
            onClick={handleFinish}
            disabled={!canGoNext || isTransitioning}
          >
            <Trans>Finish</Trans>
          </ButtonFilled>
        )}
      </nav>
    </section>
  )
}

export default QuizFlowLayout
