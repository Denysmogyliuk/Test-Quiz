'use client'

import { Heading } from '@/components/typography/heading/heading'
import { Trans } from '@lingui/react/macro'
import { useEffect, useRef, useState } from 'react'
import styles from './verify-screen.module.css'
import { useLocalizedRouter } from '@/hooks/use-localized-router'

const TIMEOUT = 5000

export const VerifyScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const router = useLocalizedRouter()

  useEffect(() => {
    const start = performance.now()

    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / TIMEOUT)
      setProgress(Math.floor(p * 100))
      if (p < 1) timeoutRef.current = requestAnimationFrame(loop)
    }

    timeoutRef.current = requestAnimationFrame(loop)

    const timer = setTimeout(() => {
      router.replace('/email')
    }, TIMEOUT + 300)

    return () => {
      if (timeoutRef.current) cancelAnimationFrame(timeoutRef.current)
      clearTimeout(timer)
    }
  }, [])

  const size = 280
  const strokeWidth = 18
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const dashoffset = circumference * (1 - progress / 100)

  return (
    <section className={styles.container}>
      <div className={styles.progressWrapper}>
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            className={styles.track}
            cx={cx}
            cy={cy}
            r={r}
            strokeWidth={strokeWidth}
          />

          <circle
            className={styles.progress}
            cx={cx}
            cy={cy}
            r={r}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />

          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            className={styles.center}
          >
            {progress}%
          </text>
        </svg>
      </div>

      <Heading size={2}>
        <Trans>Finding collections for you…</Trans>
      </Heading>
    </section>
  )
}
