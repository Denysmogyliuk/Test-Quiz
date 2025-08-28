import type { Metadata } from 'next'

import type { I18n } from '@lingui/core'
import { RouteMetadata, routesMetadata } from './routes-metadata'
import { t } from '@lingui/core/macro'

const getRouteMetadata = (path: string): RouteMetadata | null => {
  if (routesMetadata[path]) {
    return routesMetadata[path]
  }

  const dynamicRoutes = Object.keys(routesMetadata).filter((route) =>
    route.includes('[')
  )

  for (const route of dynamicRoutes) {
    const routePattern = route.replace(/\[.*?\]/g, '[^/]+')
    const regex = new RegExp(`^${routePattern}$`)
    if (regex.test(path)) {
      return routesMetadata[route]
    }
  }

  return routesMetadata['/'] || null
}

interface GenerateMetadataParams {
  path: string
  i18n: I18n
}

export const generatePageMetadata = ({
  path,
  i18n,
}: GenerateMetadataParams): Metadata => {
  const routeMetadata = getRouteMetadata(path)

  if (!routeMetadata) {
    return {
      title: t(i18n)`Test quiz`,
      description: t(i18n)`Test quiz`,
    }
  }

  const metadata: Metadata = {
    title: routeMetadata.title(i18n),
    description: routeMetadata.description(i18n),

    alternates: {
      languages: {
        en: `/en${path}`,
        es: `/es${path}`,
        'x-default': `/en${path}`,
      },
    },
    icons: {
      icon: '/favicon.png',
    },
  }

  return metadata
}
