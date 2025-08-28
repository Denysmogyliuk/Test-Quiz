'use client'

import { downloadFile } from '@/screens/result-screen/helpers'
import { Heading } from '@/components/typography/heading/heading'
import { Text } from '@/components/typography/text/text'
import { Trans, useLingui } from '@lingui/react/macro'
import { useQuizContext } from '@/context/quiz-context/quiz-context'
import { useRouter } from 'next/navigation'
import ButtonFilled from '@/components/ui/button/button-filled'
import DownloadIcon from '@/components/icons/DownloadIcon'
import styles from './thanks-screen.module.css'

export const ThanksScreen: React.FC = () => {
  const { answers, quizzes } = useQuizContext()
  const router = useRouter()
  const { i18n } = useLingui()
  const { clearAnswers } = useQuizContext()

  const restartQuiz = () => {
    clearAnswers()
    router.push('/')
  }

  return (
    <section className={styles.container}>
      <div className={styles.headerWrapper}>
        <Heading center>
          <Trans>Thank you</Trans>
        </Heading>

        <Text center color="secondary" size={3}>
          <Trans>for supporting us and passing quiz</Trans>
        </Text>
      </div>

      <div className={styles.actions}>
        <ButtonFilled onClick={() => downloadFile(answers, quizzes, i18n)}>
          <DownloadIcon width={20} height={20} />

          <Trans>Download my answers</Trans>
        </ButtonFilled>

        <ButtonFilled
          onClick={restartQuiz}
          className={styles.restartQuiz}
          color="secondary"
        >
          <Trans>Retake quiz</Trans>
        </ButtonFilled>
      </div>
    </section>
  )
}
