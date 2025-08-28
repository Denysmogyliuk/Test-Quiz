'use client'

import { Heading } from '@/components/typography/heading/heading'
import { t } from '@lingui/macro'
import { Text } from '@/components/typography/text/text'
import { Trans, useLingui } from '@lingui/react/macro'
import { useForm } from 'react-hook-form'
import { useLocalizedRouter } from '@/hooks/use-localized-router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ButtonFilled from '@/components/ui/button/button-filled'
import Input from '@/components/ui/input/input'
import styles from './email-screen.module.css'

type FormValues = { email: string }

export const EmailScreen: React.FC = () => {
  const { i18n } = useLingui()
  const router = useLocalizedRouter()

  const schema = yup.object({
    email: yup
      .string()
      .email(t(i18n)`Enter correct address`)
      .required(t(i18n)`Enter your email`),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  })

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 1200))
    router.replace('/thanks')
  }

  return (
    <section className={styles.container}>
      <div className={styles.headerWrapper}>
        <Heading center>
          <Trans>Email</Trans>
        </Heading>

        <Text center color="secondary" size={3}>
          <Trans>Enter your email to get full access</Trans>
        </Text>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder={t(i18n)`Your email`}
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        <ButtonFilled
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        >
          <Trans>Next</Trans>
        </ButtonFilled>
      </form>
    </section>
  )
}
