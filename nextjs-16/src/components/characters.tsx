import { CharactersList } from '@/components/characters-list'
import { Character, CharacterClean } from '@/types'

export async function Characters() {
  async function getCharacters(): Promise<CharacterClean[]> {
    const response = await fetch('https://www.demonslayer-api.com/api/v1/characters?limit=12')
    const data = await response.json()

    const characters = data.content.map((c: Character) => ({
      id: c.id,
      name: c.name,
      image: c.img,
      description: c.description,
      quote: c.quote,
    }))

    await new Promise(resolve => setTimeout(resolve, 3000)) // Simula una demora de 3 segundos

    return characters
  }

  return <CharactersList characters={await getCharacters()} />
}
