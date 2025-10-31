export interface Character {
  id: number
  name: string
  age: number
  gender: string
  race: string
  description: string
  img: string
  affiliation_id: number
  arc_id: number
  quote: string
}

export interface CharacterClean extends Omit<Character, 'affiliation_id' | 'arc_id' | 'img'> {
  image: string
}
