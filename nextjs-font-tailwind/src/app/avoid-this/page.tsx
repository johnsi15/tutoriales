import Head from 'next/head'

export default function AvoidThisPage() {
  // -> https://fonts.google.com/
  return (
    <section className='m-6'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin=''></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <div>
        <h1 style={{ fontFamily: 'Noto Serif', fontSize: '36px' }}>Avoid This Page</h1>
        <p>This page is intentionally left blank to demonstrate a specific behavior.</p>
      </div>
    </section>
  )
}
