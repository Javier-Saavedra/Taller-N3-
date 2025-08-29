import { fetchPokemon } from './services/Api.js';
import { showPokemon } from './ui/ui.js';

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let current = 1;
const MIN = 1;
const MAX = 1025;

async function load(id){
  try{
    const pokemon = await fetchPokemon(id);
    showPokemon(pokemon);
  }catch(err){
    console.error(err);
    alert('No se pudo cargar el Pokémon.');
  }
}

prevBtn.addEventListener('click', () => {
  current = current <= MIN ? MAX : current - 1;
  load(current);
});
nextBtn.addEventListener('click', () => {
  current = current >= MAX ? MIN : current + 1;
  load(current);
});

load(current);
