/**
 * @jest-environment node
 */
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'

describe('siteConfig', () => {
  const originalPostListStyle = BLOG.POST_LIST_STYLE
  const originalPublicLink = process.env.NEXT_PUBLIC_LINK

  afterEach(() => {
    BLOG.POST_LIST_STYLE = originalPostListStyle
    if (originalPublicLink === undefined) {
      delete process.env.NEXT_PUBLIC_LINK
    } else {
      process.env.NEXT_PUBLIC_LINK = originalPublicLink
    }
  })

  it('uses BLOG/env config before caller default for server-only keys', () => {
    BLOG.POST_LIST_STYLE = 'scroll'

    expect(siteConfig('POST_LIST_STYLE', 'page', {})).toBe('scroll')
  })

  it('keeps extend config higher priority than BLOG/env config', () => {
    BLOG.POST_LIST_STYLE = 'scroll'

    expect(siteConfig('POST_LIST_STYLE', 'page', { POST_LIST_STYLE: 'page' })).toBe(
      'page'
    )
  })

  it('uses NEXT_PUBLIC_LINK before a stale Notion LINK', () => {
    process.env.NEXT_PUBLIC_LINK = 'https://gaoran.cc/'

    expect(
      siteConfig('LINK', 'https://fallback.example', {
        LINK: 'https://blog.gaoran.xyz'
      })
    ).toBe('https://gaoran.cc/')
  })

  it('falls back to the Notion LINK when NEXT_PUBLIC_LINK is absent', () => {
    delete process.env.NEXT_PUBLIC_LINK

    expect(
      siteConfig('LINK', 'https://fallback.example', {
        LINK: 'https://blog.gaoran.xyz'
      })
    ).toBe('https://blog.gaoran.xyz')
  })

  it('reads inner page parent path toggle from Notion Config', () => {
    expect(
      siteConfig('INNER_PAGE_URL_PARENT_PATH', false, {
        INNER_PAGE_URL_PARENT_PATH: 'true'
      })
    ).toBe(true)
  })
})
