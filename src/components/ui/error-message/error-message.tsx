import styles from './error-message.module.css'

interface IProps {
  errorMessage: string
}

export const ErrorMessage: React.FC<IProps> = ({ errorMessage }) => {
  return (
    <span
      className={styles.error}
      role="alert"
      aria-live="assertive"
      title={errorMessage}
    >
      {errorMessage}
    </span>
  )
}
