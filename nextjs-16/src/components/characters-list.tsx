import Image from 'next/image'
import { CharacterClean } from '@/types'

export function CharactersList({ characters }: { characters: CharacterClean[] }) {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Personajes de Demon Slayer</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {characters.map(character => (
          <li key={character.id} className='border border-gray-200 dark:border-gray-800 p-4 rounded-lg'>
            <Image
              src={character.image}
              alt={character.name}
              width={250}
              height={256}
              className='w-full h-64 object-contain rounded mb-2'
            />
            <h3 className='font-semibold text-lg'>{character.name}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Edad: {character.age} | Género: {character.gender} | Raza: {character.race}
            </p>
            <p className='text-sm mt-2'>{character.description}</p>
            <blockquote className='text-sm italic mt-2 border-l-4 border-gray-300 pl-4'>"{character.quote}"</blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
