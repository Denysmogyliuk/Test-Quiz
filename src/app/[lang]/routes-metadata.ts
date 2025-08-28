import { I18n } from '@lingui/core'
import { t } from '@lingui/core/macro'

export interface RouteMetadata {
  title: (i18n: I18n) => string
  description: (i18n: I18n) => string
}

export const routesMetadata: Record<string, RouteMetadata> = {
  '/': {
    title: (i18n: I18n) => t(i18n)`Quiz`,
    description: (i18n: I18n) => t(i18n)`Your quiz`,
  },

  '/quiz/1': {
    title: (i18n: I18n) => t(i18n)`Select Language`,
    description: (i18n: I18n) => t(i18n)`Select Quiz Language`,
  },

  '/verify': {
    title: (i18n: I18n) => t(i18n)`Getting Results`,
    description: (i18n: I18n) => t(i18n)`Getting Your Results`,
  },

  '/email': {
    title: (i18n: I18n) => t(i18n)`Send Results`,
    description: (i18n: I18n) => t(i18n)`Send Quiz Results`,
  },

  '/thanks': {
    title: (i18n: I18n) => t(i18n)`Thanks!`,
    description: (i18n: I18n) => t(i18n)`Thank you for your time!`,
  },
}
