import { ArrowIcon } from './ArrowIcon'

function App() {
  const projects = [
    {
      title: 'Project 1',
      date: 'January 2021',
      image: '/project1.webp',
      link: 'https://example.com/project1',
    },
    {
      title: 'Project 2',
      date: 'February 2021',
      image: '/project2.webp',
      link: 'https://example.com/project2',
    },
    {
      title: 'Project 3',
      date: 'March 2021',
      image: '/project3.webp',
      link: 'https://example.com/project3',
    },
    {
      title: 'Project 4',
      date: 'April 2021',
      image: '/project4.webp',
      link: 'https://example.com/project4',
    },
    {
      title: 'Project 5',
      date: 'May 2021',
      image: '/project5.webp',
      link: 'https://example.com/project5',
    },
    {
      title: 'Project 6',
      date: 'June 2021',
      image: '/project6.webp',
      link: 'https://example.com/project6',
    },
  ]

  return (
    <main className='max-w-6xl px-4 lg:px-8 lg:pb-8 mx-auto flex flex-col flex-auto w-full'>
      <header>
        <nav className='flex flex-row justify-between items-center py-7'>
          <a href='/' className='text-2xl font-light text-picton-blue-500 dark:text-green-2-500'>
            Olivia
          </a>
          <ul className='flex flex-row space-x-4'>
            <li>
              <a
                href='#projects'
                className='text-sm font-medium decoration-purple-600 decoration-2 underline-offset-8 hover:text-black hover:underline dark:decoration-purple-400 dark:hover:text-white'
              >
                Proyectos
              </a>
            </li>
            <li>
              <a
                href='#contact'
                className='text-sm font-medium decoration-purple-600 decoration-2 underline-offset-8 hover:text-black hover:underline dark:decoration-purple-400 dark:hover:text-white'
              >
                Contratame
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className='flex justify-between flex-col md:flex-row gap-6'>
        <div className='photo w-full md:max-w-[439px] md:h-[439px] @container'>
          <img src='/photo.webp' alt='Photo' className='rounded-xl object-cover h-full @lg:w-52 @lg:h-52' />
        </div>

        <div className='intro relative flex flex-col overflow-hidden rounded-xl bg-zinc-100 p-12 dark:bg-zinc-900  md:max-w-[624px]'>
          <div
            aria-hidden='true'
            className='absolute -left-20 -top-20 size-48 rounded-full bg-yellow-500 blur-2xl'
          ></div>
          <div
            aria-hidden='true'
            className='absolute -right-10 -top-10 size-64 rounded-full bg-orange-300 blur-3xl'
          ></div>
          <div
            aria-hidden='true'
            className='absolute inset-0 bg-yellow-100/50 backdrop-blur-md dark:bg-yellow-900/75'
          ></div>
          <div className='relative mt-auto prose'>
            <h1 className='text-4xl font-bold text-black dark:text-zinc-100'>¡Hola! Soy Olivia</h1>
            <p className='mt-3 leading-relaxed text-zinc-900 dark:text-zinc-200'>
              I am a passionate graphic designer with 5+ years of experience creating beautiful and functional designs.
              I specialize in branding, web design, and print media that tells your story and connects with your
              audience.
            </p>
          </div>
        </div>
      </section>

      <section className='projects my-6 @container' id='projects'>
        <ul className='grid grid-cols-1 gap-6 md:grid-cols-3 justify-items-center'>
          {projects.map(({ title, date, link, image }) => (
            <li
              key={title}
              className='group relative overflow-hidden rounded-xl bg-zinc-100 p-6 hover:bg-zinc-200/75 active:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/75 dark:active:bg-zinc-800 md:max-w-[346px] w-full @container dark:@max-3xl:bg-purple-950 @max-3xl:bg-purple-950'
            >
              <ArrowIcon />
              <h3 className='text-lg font-medium text-zinc-950 dark:text-zinc-50 dark:@max-2xs:text-purple-500'>
                {title}
              </h3>
              <span className='text-sm text-zinc-600 dark:text-zinc-400'>{date}</span>

              <div className='aspect-h-3 aspect-w-4 mt-10 transition duration-150 ease-out group-hover:scale-105'>
                <img src={image} alt='Project 1' className='rounded-xl object-cover' />
              </div>
              <a href={link} className='absolute inset-0' aria-label={`Go to ${title}`}></a>
            </li>
          ))}
        </ul>
      </section>

      <section
        id='contact'
        className='relative mb-5 flex flex-col overflow-hidden rounded-xl bg-zinc-100 px-12 py-20 dark:bg-zinc-900 md:col-span-12'
      >
        <div aria-hidden='true' className='absolute -left-20 -top-20 size-48 rounded-full bg-pink-300 blur-2xl'></div>
        <div
          aria-hidden='true'
          className='absolute -bottom-48 -right-48 size-96 rounded-full bg-indigo-200 blur-2xl dark:bg-indigo-400/50'
        ></div>
        <div
          aria-hidden='true'
          className='absolute -right-48 -top-48 size-96 rounded-full bg-purple-200 blur-3xl dark:bg-purple-400/50'
        ></div>
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-purple-100/50 backdrop-blur-md dark:bg-purple-900/75'
        ></div>
        <div className='relative mx-auto mt-auto max-w-md'>
          <h2 className='text-4xl font-medium text-black dark:text-white'>Get in touch</h2>
          <h3 className='mt-3 leading-relaxed text-zinc-900 dark:text-zinc-200'>
            Looking for a creative partner for your next project? I am currently available for freelance work and would
            love to hear about your ideas. Whether you need branding, web design, or print materials, let is collaborate
            to bring your vision to life.
          </h3>

          <form onSubmit='return false;' className='mt-10 w-full space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='name' className='text-sm font-medium'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='block w-full rounded-lg border border-white px-5 py-3 leading-6 placeholder-zinc-500 focus:border-purple-500 focus:ring focus:ring-purple-500/50 dark:border-purple-950 dark:bg-purple-950 dark:placeholder-zinc-400 dark:focus:border-purple-500'
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='block w-full rounded-lg border border-white px-5 py-3 leading-6 placeholder-zinc-500 focus:border-purple-500 focus:ring focus:ring-purple-500/50 dark:border-purple-950 dark:bg-purple-950 dark:placeholder-zinc-400 dark:focus:border-purple-500'
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='message' className='text-sm font-medium'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows='6'
                className='block w-full rounded-lg border border-white px-5 py-3 leading-6 placeholder-zinc-500 focus:border-purple-500 focus:ring focus:ring-purple-500/50 dark:border-purple-950 dark:bg-purple-950 dark:placeholder-zinc-400 dark:focus:border-purple-500'
              ></textarea>
            </div>
            <button
              type='submit'
              className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-purple-700 bg-purple-700 px-5 py-3 text-sm font-semibold leading-6 text-white hover:border-purple-600 hover:bg-purple-600 hover:text-white focus:ring focus:ring-purple-400/50 active:border-purple-700 active:bg-purple-700 dark:focus:ring-purple-400/90 lg:w-auto'
            >
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </section>

      <footer className='text-center py-5 text-sm text-zinc-500 dark:text-zinc-100 bg-linear-to-r/oklch from-amber-300 to-amber-800 rounded-md'>
        @2021 Olivia. All rights reserved.
      </footer>
    </main>
  )
}

export default App
