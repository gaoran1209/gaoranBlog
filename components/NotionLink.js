import { siteConfig } from '@/lib/config'

const EXTERNAL_HTTP_LINK = /^https?:\/\//i
const LEGACY_SITE_HOSTS = new Set(['blog.gaoran.xyz'])

export const normalizeInternalNotionLink = (href, canonicalSiteUrl) => {
  if (
    typeof href !== 'string' ||
    !EXTERNAL_HTTP_LINK.test(href) ||
    !canonicalSiteUrl
  ) {
    return href
  }

  try {
    const hrefUrl = new URL(href)
    if (!LEGACY_SITE_HOSTS.has(hrefUrl.hostname)) {
      return href
    }

    const canonicalUrl = new URL(canonicalSiteUrl)
    hrefUrl.protocol = canonicalUrl.protocol
    hrefUrl.host = canonicalUrl.host
    return hrefUrl.toString()
  } catch {
    return href
  }
}

const mergeRelValues = (...values) => {
  const rel = new Set()

  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .forEach(token => rel.add(token))

  return rel.size > 0 ? Array.from(rel).join(' ') : undefined
}

const isExternalHttpLink = (href, siteOrigin) => {
  if (typeof href !== 'string' || !EXTERNAL_HTTP_LINK.test(href)) {
    return false
  }

  if (!siteOrigin) {
    return true
  }

  try {
    const hrefUrl = new URL(href)
    return hrefUrl.origin !== siteOrigin
  } catch {
    return true
  }
}

export const shouldOpenNotionLinkInNewTab = (href, target, siteOrigin) => {
  if (target === '_blank') {
    return true
  }

  const fallbackOrigin =
    siteOrigin ||
    (typeof window !== 'undefined' && window.location
      ? window.location.origin
      : null)

  return isExternalHttpLink(href, fallbackOrigin)
}

const NotionLink = ({ href, target, rel, ...props }) => {
  const canonicalSiteUrl = siteConfig('LINK')
  const normalizedHref = normalizeInternalNotionLink(href, canonicalSiteUrl)
  const canonicalOrigin = (() => {
    try {
      return new URL(canonicalSiteUrl).origin
    } catch {
      return null
    }
  })()
  const shouldOpenInNewTab = shouldOpenNotionLinkInNewTab(
    normalizedHref,
    target,
    canonicalOrigin
  )
  const normalizedTarget = shouldOpenInNewTab ? '_blank' : target
  const normalizedRel = shouldOpenInNewTab
    ? mergeRelValues(rel, 'noopener noreferrer')
    : rel

  return (
    <a
      {...props}
      href={normalizedHref}
      target={normalizedTarget}
      rel={normalizedRel}
    />
  )
}

export default NotionLink
