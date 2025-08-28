import React, { ReactNode } from 'react'
import styles from './quiz-layout.module.css'

interface IProps {
  children: ReactNode
}

export const QuizLayout: React.FC<IProps> = ({ children }) => {
  return <main className={styles.quizLayout}>{children}</main>
}
