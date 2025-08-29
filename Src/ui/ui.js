function capitalize(word){
  if(!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const imgEl = document.getElementById('pokemon-img');
const nameEl = document.getElementById('pokemon-name');
const idEl = document.getElementById('pokemon-id');
const typesWrap = document.getElementById('types');

// Modal refs
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalId = document.getElementById('modal-id');
const modalImg = document.getElementById('modal-img');
const modalHeight = document.getElementById('modal-height');
const modalWeight = document.getElementById('modal-weight');
const modalAbilities = document.getElementById('modal-abilities');
const modalStats = document.getElementById('modal-stats');

export function showPokemon(pokemon){
  imgEl.src = pokemon.sprite;
  imgEl.alt = `Imagen de ${capitalize(pokemon.name)}`;
  nameEl.textContent = capitalize(pokemon.name);
  idEl.textContent = `#${pokemon.id}`;

  typesWrap.innerHTML = '';
  pokemon.types.forEach(type => {
    const span = document.createElement('span');
    span.classList.add('type', type);
    span.textContent = capitalize(type);
    typesWrap.appendChild(span);
  });

  imgEl.onclick = () => showModal(pokemon);
}

function formatMeasures({ height, weight }){
  const meters = (height ?? 0) / 10;
  const kg = (weight ?? 0) / 10;
  return { meters: `${meters.toFixed(1)} m`, kg: `${kg.toFixed(1)} kg` };
}

export function showModal(pokemon){
  modalTitle.textContent = capitalize(pokemon.name);
  modalId.textContent = `#${pokemon.id}`;
  modalImg.src = pokemon.sprite;
  modalImg.alt = `Imagen de ${capitalize(pokemon.name)}`;

  const { meters, kg } = formatMeasures(pokemon);
  modalHeight.textContent = meters;
  modalWeight.textContent = kg;

  modalAbilities.innerHTML = '';
  pokemon.abilities.forEach(ab => {
    const li = document.createElement('li');
    li.textContent = capitalize(ab.replace('-', ' '));
    modalAbilities.appendChild(li);
  });

  modalStats.innerHTML = '';
  const maxBase = Math.max(1, ...pokemon.stats.map(s => s.base || 0));
  pokemon.stats.forEach(s => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = capitalize(s.name.replace('-', ' '));
    const value = document.createElement('strong');
    value.textContent = s.base;
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${Math.round((s.base / maxBase) * 100)}%`;
    li.appendChild(label);
    li.appendChild(value);
    li.appendChild(bar);
    modalStats.appendChild(li);
  });

  modal.classList.remove('hidden');
}

function hideModal(){ modal.classList.add('hidden'); }
modalOverlay?.addEventListener('click', hideModal);
modalClose?.addEventListener('click', hideModal);
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && !modal.classList.contains('hidden')) hideModal();
});

export { hideModal };
