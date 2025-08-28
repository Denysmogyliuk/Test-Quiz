import React from 'react'
import styles from './card.module.css'
import classNames from 'classnames'

type IProps = React.HTMLAttributes<HTMLDivElement>

export const Card = React.forwardRef<HTMLDivElement, IProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div ref={ref} className={classNames(styles.card, className)} {...rest} />
    )
  }
)

Card.displayName = 'Card'
