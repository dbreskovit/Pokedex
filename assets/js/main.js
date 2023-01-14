const chk = document.getElementById("chk");
const html = document.querySelector("html");
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const prevButton = document.getElementById("prevButton");
const limit = 12;
let offset = 0;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme:dark)").matches
) {
  html.classList.add("dark-mode");
  chk.checked = true;
}

chk.addEventListener("change", () => {
  html.classList.toggle("dark-mode");
});

const maxRecords = 151;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML = pokemons
      .map(
        (pokemon) =>
          `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map(
                    (type) => `<li class="type ${pokemon.type}">${type}</li>`
                  )
                  .join("")}
              </ol>
              <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
              />
              <img class="pokeball" src="./assets/img/pokeball.png"/>
            </div>
          </li>`
      )
      .join("");
  });
}

function verifyOffset() {
  if (offset > 0) {
    prevButton.style.display = "flex";
  } else {
    prevButton.style.display = "none";
  }
  if (offset + limit <= maxRecords) {
    loadMoreButton.style.display = "flex";
  }
}

loadPokemonItens(offset, limit);
verifyOffset();

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.style.display = "none";
  } else {
    loadPokemonItens(offset, limit);
  }
  verifyOffset();
});

prevButton.addEventListener("click", () => {
  offset -= limit;
  loadPokemonItens(offset, limit);
  verifyOffset();
});
