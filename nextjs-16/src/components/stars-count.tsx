import { cacheLife } from 'next/cache'

export async function StarsCount() {
  // const data = await fetch('https://api.github.com/repos/johnsi15/linknote', { next: { revalidate: 86400 } }) // Revalidate once a day
  'use cache'
  cacheLife('hours')

  const data = await fetch('https://api.github.com/repos/johnsi15/linknote') // Revalidate once a day
  const json = await data.json()
  const stars = json.stargazers_count

  return (
    <span className='text-muted-foreground w-12 text-xs tabular-nums retro mt-0.5'>
      {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
    </span>
  )
}
