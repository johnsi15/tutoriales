import { Skeleton } from '@/components/ui/skeleton'

export function CharacterSkeleton() {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Skeleton className='h-8 w-64 mx-auto mb-4' />
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className='border border-gray-200 dark:border-gray-800 p-4 rounded-lg'>
            <Skeleton className='w-full h-64 rounded mb-2' />
            <Skeleton className='h-6 w-3/4 mb-2' />
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-2/3 mb-2' />
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-3/4' />
          </li>
        ))}
      </ul>
    </div>
  )
}