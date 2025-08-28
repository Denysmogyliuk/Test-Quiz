import { I18n } from '@lingui/core'
import { t } from '@lingui/core/macro'

export interface RouteMetadata {
  title: (i18n: I18n) => string
  description: (i18n: I18n) => string
}

export const routesMetadata: Record<string, RouteMetadata> = {
  '/': {
    title: (i18n: I18n) => t(i18n)`Select language`,
    description: (i18n: I18n) => t(i18n)`Select language to continue`,
  },
  '/quiz': {
    title: (i18n: I18n) => t(i18n)`Quiz`,
    description: (i18n: I18n) => t(i18n)`Your quiz`,
  },
  '/result': {
    title: (i18n: I18n) => t(i18n)`Quiz results`,
    description: (i18n: I18n) => t(i18n)`Your results`,
  },
}
