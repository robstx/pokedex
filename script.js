const pokemonListElement = document.querySelector('.pokemon-list');
const searchInput = document.getElementById('search-input');

let pokemonList = [];

async function fetchPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}

async function displayPokemon(pokemonData) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.classList.add(pokemonData.types[0].type.name);

  const pokemonNumber = pokemonData.id;
  const imageUrl = pokemonData.sprites.front_default;
  const name = pokemonData.name;
  const types = pokemonData.types.map(type => type.type.name).join(', ');

  pokemonCard.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <h3>${name}</h3>
    <p>#${pokemonNumber}</p>
    <p>Types: ${types}</p>
  `;

  pokemonListElement.appendChild(pokemonCard);
}

async function fetchAllPokemons() {
  const totalPokemonCount = 1008;
  const batchSize = 50; // Tamanho do lote (quantos Pokémon por lote)
  const totalBatches = Math.ceil(totalPokemonCount / batchSize);

  for (let batch = 0; batch < totalBatches; batch++) {
    const startId = batch * batchSize + 1;
    const endId = Math.min((batch + 1) * batchSize, totalPokemonCount);

    for (let i = startId; i <= endId; i++) {
      const pokemonData = await fetchPokemonData(i);
      pokemonList.push(pokemonData);
      displayPokemon(pokemonData);
    }

    // Adicionando um intervalo de 500 milissegundos entre os lotes
    if (batch < totalBatches - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

function searchPokemon(searchTerm) {
  if (searchTerm.trim() === "") {
    pokemonListElement.innerHTML = '';
    pokemonList.forEach(displayPokemon);
    return;
  }

  let filteredPokemons = [];
  if (isNumeric(searchTerm)) {
    const pokemonNumber = parseInt(searchTerm);
    filteredPokemons = pokemonList.filter(pokemon => pokemon.id === pokemonNumber);
  } else {
    filteredPokemons = pokemonList.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
  }

  pokemonListElement.innerHTML = '';
  filteredPokemons.forEach(displayPokemon);
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function showPokemonDetails(pokemonData) {
  // Implemente a função showPokemonDetails se necessárioconst pokemonListElement = document.querySelector('.pokemon-list');
const searchInput = document.getElementById('search-input');

let pokemonList = [];
let currentPage = 1;
const itemsPerPage = 20; // Número de Pokémon por página

async function fetchPokemonData(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return data;
}

async function displayPokemon(pokemonData) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.classList.add(pokemonData.types[0].type.name);

  const pokemonNumber = pokemonData.id;
  const imageUrl = pokemonData.sprites.front_default;
  const name = pokemonData.name;
  const types = pokemonData.types.map(type => type.type.name).join(', ');

  pokemonCard.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <h3>${name}</h3>
    <p>#${pokemonNumber}</p>
    <p>Types: ${types}</p>
  `;

  pokemonListElement.appendChild(pokemonCard);
}

async function fetchPokemonsByPage(page) {
  const startId = (page - 1) * itemsPerPage + 1;
  const endId = page * itemsPerPage;

  for (let i = startId; i <= endId; i++) {
    const pokemonData = await fetchPokemonData(i);
    pokemonList.push(pokemonData);
    displayPokemon(pokemonData);
  }
}

function clearPokemonList() {
  pokemonListElement.innerHTML = '';
}

function displayCurrentPage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentPokemons = pokemonList.slice(start, end);

  clearPokemonList();
  currentPokemons.forEach(displayPokemon);
}

function goToPage(page) {
  if (page < 1 || page > Math.ceil(pokemonList.length / itemsPerPage)) {
    return;
  }

  currentPage = page;
  displayCurrentPage();
}

function previousPage() {
  goToPage(currentPage - 1);
}

function nextPage() {
  goToPage(currentPage + 1);
}

async function fetchAllPokemons() {
  await fetchPokemonsByPage(currentPage);
}

function searchPokemon(searchTerm) {
  const filteredPokemons = pokemonList.filter(pokemon => {
    if (isNumeric(searchTerm)) {
      const pokemonNumber = parseInt(searchTerm);
      return pokemon.id === pokemonNumber;
    } else {
      return pokemon.name.includes(searchTerm.toLowerCase());
    }
  });

  clearPokemonList();
  filteredPokemons.forEach(displayPokemon);
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

// ... Outras funções (showPokemonDetails, closePokemonDetails) ...

// Event listeners para paginação
document.getElementById('prev-page').addEventListener('click', previousPage);
document.getElementById('next-page').addEventListener('click', nextPage);

searchInput.addEventListener('input', (event) => searchPokemon(event.target.value.toLowerCase()));

fetchAllPokemons();

}

function closePokemonDetails() {
  // Implemente a função closePokemonDetails se necessário
}

searchInput.addEventListener('input', (event) => searchPokemon(event.target.value.toLowerCase()));

fetchAllPokemons();
