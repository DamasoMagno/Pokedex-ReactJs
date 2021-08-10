export interface Pokemon {
  name: string;
  id: number;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    }
  }>
  base_experience: number;
  sprites: {
    front_default: string;
  }
  types: Array<{
    type: {
      name: string;
      url: string;
    }
  }>
}