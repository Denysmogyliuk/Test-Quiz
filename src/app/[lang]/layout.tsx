import '../../styles/globals.css'
import '../../styles/variables.css'

import { allMessages, getI18nInstance } from '../../appRouterI18n'
import { generatePageMetadata } from './generate-metadata'
import { headers } from 'next/headers'
import { initLingui, PageLangParam } from '../../initLingui'
import { LinguiClientProvider } from '@/context/lingui-client-context/lingui-client-context'
import linguiConfig from '../../../lingui.config'
import React from 'react'
import { QuizProvider } from '@/context/quiz-context/quiz-context'
import { getInitialTheme } from '@/helpers/get-init-theme'
import { ThemeInit } from '@/helpers/theme-init'
import { ThemeToggle } from '@/components/theme-toggle/theme-toggle'
import { QuizLayout } from '@/components/layouts/quiz-layout/quiz-layout'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export async function generateMetadata(props: PageLangParam) {
  const params = await props.params
  const lang = params.lang
  const i18n = getI18nInstance(lang)

  const headersList = await headers()

  const pathname = headersList.get('x-pathname') || '/'

  const cleanPath = pathname.replace(`/${lang}`, '') || '/'

  return generatePageMetadata({
    path: cleanPath,
    i18n,
  })
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'es' | 'fr' | 'de' }>
}>) {
  const lang = (await params).lang
  const initialTheme = await getInitialTheme()

  await initLingui(lang)

  return (
    <LinguiClientProvider
      initialLocale={lang}
      initialMessages={allMessages[lang]!}
    >
      <QuizProvider>
        <html lang={lang} data-theme={initialTheme}>
          <head>
            <ThemeInit />
          </head>
          <body>
            <QuizLayout>{children}</QuizLayout>

            <ThemeToggle />
          </body>
        </html>
      </QuizProvider>
    </LinguiClientProvider>
  )
}
