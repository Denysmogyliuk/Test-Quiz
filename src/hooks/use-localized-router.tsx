'use client'

import { useRouter } from 'next/navigation'
import { useLingui } from '@lingui/react'

export const useLocalizedRouter = () => {
  const router = useRouter()
  const { i18n } = useLingui()

  const push = (path: string) => {
    const withLocale = path.startsWith('/')
      ? `/${i18n.locale}${path}`
      : `/${i18n.locale}/${path}`
    router.push(withLocale)
  }

  const replace = (path: string) => {
    const withLocale = path.startsWith('/')
      ? `/${i18n.locale}${path}`
      : `/${i18n.locale}/${path}`
    router.replace(withLocale)
  }

  return {
    ...router,
    push,
    replace,
  }
}
