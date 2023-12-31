import Script from 'next/script'

const PUBLISHER_ID = '1869410932032409'

export function GoogleAdScript() {
  if (process.env.VERCEL_ENV === 'production') {
    return (
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    )
  }
  return <></>
}
