
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    // console.log(pokemon.url)
    return fetch(pokemon.url)
        .then((response) => { 
            // console.log(response)
            return response.json()})
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

function pokemonModel(pokemonObject){
    let pokemon = new PokemonModel();

    pokemon.nome = pokemonObject.name;
    pokemon.numero = pokemonObject.id;
    const tipos = pokemonObject.types.map((typeSlot) => typeSlot.type.name)
    pokemon.tipos = [...tipos]
    pokemon.peso = pokemonObject.weight;
    pokemon.altura = pokemonObject.height;
    pokemon.photo = pokemonObject.sprites.other.dream_world.front_default
    return pokemon
}