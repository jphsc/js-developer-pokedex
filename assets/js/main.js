const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let pokemonListado = document.getElementById('pokemonListado')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="getPokemonDetail(${pokemon.number})" data-bs-toggle="modal" data-bs-target="#pokemonDetail">
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
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function getPokemonDetail(pokemonNumber){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    .then((responsePokemon) => responsePokemon.json())
    .then((resp) => {
        console.log(resp)
        return pokemonModel(resp)})
    .then((resp1) => {
        console.log(resp1)
        montarModal(resp1)
    })
    
}

function montarModal(resp1){
    document.getElementById('exampleModalLabel').innerHTML = resp1.nome
    let foto = document.createElement('img');
    foto.src = resp1.photo
    document.getElementById('modalBody').appendChild(foto)
    // document.getElementById('modalBody')
    // foto.src = ''
}