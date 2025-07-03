import { Noto_Serif, Inter } from 'next/font/google'
import localFont from 'next/font/local'

const notoSerifFont = Noto_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700'],
})

const interFontVariable = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistSansFont = localFont({
  src: [
    {
      path: '../fonts/geist-sans-latin-200-normal.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/geist-sans-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/geist-sans-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
})

// -> https://nextjs.org/docs/app/getting-started/fonts
// -> https://nextjs.org/docs/app/api-reference/components/font#with-tailwind-css
export default function FontExamplePage() {
  return (
    <>
      <section className={`m-6 ${notoSerifFont.className}`}>
        <h1 className='text-4xl font-bold'>Font Example Noto Serif</h1>
        <p>This page demonstrates the use of Noto Serif font with className.</p>
      </section>

      <section className={`m-6 ${interFontVariable.variable}`}>
        <h1 className='text-4xl' style={{ fontFamily: 'var(--font-inter)' }}>
          Font Example Inter
        </h1>
        <p>This page demonstrates the use of Inter font Variable.</p>
      </section>

      <section className={`m-6 ${geistSansFont.variable}`}>
        <h1 className='text-4xl' style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Font Example Geist Sans
        </h1>
        <p>This page demonstrates the use of Geist font Sans local.</p>
      </section>

      <section className={`m-6`}>
        <h1 className='text-4xl font-geist-mono'>Font Example Geist Mono</h1>
        <p className='font-geist-mono'>This page demonstrates the use of Geist font Sans local.</p>
      </section>
    </>
  )
}
