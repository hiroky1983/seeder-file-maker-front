'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const PUBLISHER_ID = '1869410932032409'

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

type GoogleAdProps = {
  slot: string
  format?: string
  responsive?: string
  style?: any
}

function GoogleAd({
  slot,
  format = 'auto',
  responsive = 'true',
  style,
}: GoogleAdProps) {
  let pathname = usePathname()
  pathname = pathname || ''

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error(err)
    }
  }, [pathname])

  return (
    <div
      key={`${pathname.replace(/\//g, '-')}-${slot}`}
      data-testid="googlead-component"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', ...style }}
        data-ad-client={`ca-pub-${PUBLISHER_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}

export default GoogleAd
