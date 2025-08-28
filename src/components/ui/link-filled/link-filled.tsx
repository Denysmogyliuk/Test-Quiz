import classNames from 'classnames'
import React from 'react'
import styles from './link.module.css'
import Link, { LinkProps } from 'next/link'

const BACKGROUND_COLOR = {
  main: styles.mainLink,
  secondary: styles.secondaryLink,
}

type BackgroundColor = keyof typeof BACKGROUND_COLOR

const getClassForColor = (color: BackgroundColor) =>
  BACKGROUND_COLOR[color] || ''

interface IProps extends LinkProps {
  color?: BackgroundColor
  blank?: boolean
  className?: string
  children?: React.ReactNode
}

export const LinkFilled: React.FC<IProps> = (props) => {
  const { className, color = 'main', children, blank = false, ...rest } = props

  const buttonColorClass = getClassForColor(color)

  return (
    <Link
      className={classNames(buttonColorClass, styles.link, className)}
      target={blank ? '_blank' : undefined}
      rel={blank ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </Link>
  )
}
