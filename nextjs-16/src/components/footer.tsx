import Link from 'next/link'

function Footer() {
  return (
    <footer className='flex gap-5 items-center p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto'>
      <p className='text-xs md:text-sm text-muted-foreground'>
        Desarrollado por{' '}
        <Link href='https://johnserrano.co/' className='underline' target='_blank'>
          John Serrano
        </Link>
        . Todo el código disponible en{' '}
        <Link href='#' className='underline' target='_blank'>
          GitHub
        </Link>
        .
      </p>
    </footer>
  )
}

export default Footer
