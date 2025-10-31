import React, { Suspense } from 'react'
import { ThemeToggle } from './theme-toggle'
import { StarsCount } from './stars-count'
import Link from 'next/link'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const Header: React.FC = () => {
  return (
    <header className='flex gap-2 sticky top-0 z-50 h-14 shrink-0 items-center p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800'>
      <div className='flex w-full items-center h-full gap-1 px-4 md:px-6 max-w-[1400px] mx-auto'>
        <Link href='/' className='hidden md:flex items-center gap-2'>
          <h2 className={`${'retro'} hidden font-bold md:inline-block`}>NextJS 16 Cache Components</h2>
        </Link>
        <div className='ml-auto flex items-center'>
          <Link href='https://github.com/johnsi15/linknote' target='_blank'>
            <Button size='sm' variant='ghost' className='flex items-center'>
              <svg viewBox='0 0 24 24' className='size-4 fill-current'>
                <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
              </svg>
              <Suspense fallback={<Skeleton className='h-4 w-12 ml-2' />}>
                <StarsCount />
              </Suspense>
            </Button>
          </Link>

          <div className='size-8 flex items-center justify-center'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
