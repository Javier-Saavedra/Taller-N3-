// Conexión con PokéAPI usando fetch()
import { Pokemon } from '../models/pokemon.js';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchPokemon(idOrName){
  const res = await fetch(`${BASE_URL}${idOrName}`);
  if(!res.ok){
    throw new Error(`Pokémon no encontrado: ${idOrName}`);
  }
  const data = await res.json();

  const types = data.types.map(t => t.type.name);
  const sprite = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
  const abilities = data.abilities.map(a => a.ability.name);
  const stats = data.stats.map(s => ({
    name: s.stat.name,
    base: s.base_stat
  }));

  return new Pokemon({
    id: data.id,
    name: data.name,
    types,
    sprite,
    height: data.height,
    weight: data.weight,
    abilities,
    stats
  });
}
