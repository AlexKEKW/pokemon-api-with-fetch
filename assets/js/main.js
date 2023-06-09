const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0
const maxRecords = 151


function loadPokemonItens(limit, offset) {

    pokeApi.getPokemons(limit, offset).then((pokemons = []) => {  

        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
    
        </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(limit, offset)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdRecordsWithNextPage = offset + limit

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(newLimit, offset)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(limit, offset)
    }

})


