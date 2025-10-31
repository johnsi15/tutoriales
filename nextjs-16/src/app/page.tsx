import { CharacterSkeleton } from '@/components/character-skeleton'
import { Characters } from '@/components/characters'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className='min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans'>
      <main className='flex-1 p-4'>
        <Suspense fallback={<CharacterSkeleton />}>
          <Characters />
        </Suspense>
      </main>
    </div>
  )
}
