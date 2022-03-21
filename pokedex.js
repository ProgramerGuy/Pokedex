function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function sortObjectByKeys(o) {
    return Object.keys(o).reverse().reduce((r, k) => (r[k] = o[k], r), {});
}

function renderPokemonData(data) {
    const pokemonNameText = document.getElementById("pokemon-name");
    const container = document.getElementById("data-types");
    const statContainer = document.getElementById("stat-container");
    
    container.innerHTML = "";
    pokemonNameText.innerText = data.name.toUpperCase();

    console.log(data);

    data.types.forEach(function(type){
        let span = document.createElement("span");
        span.classList = ['uk-badge poke-type'];
        span.innerText = type.type.name;
        container.append(span);
    });

    data.stats.forEach(function(stat){
        let div = document.createElement("div");
        let span  = document.createElement("span");
        let p  = document.createElement("p");

        div.innerHTML = "";

        span.classList = ['stat-title']

        span.innerText = stat.stat.name + ": ";
        p.innerText = stat.base_stat;
        div.append(span,p);
        statContainer.append(div);
    })
}

const fetchPokemen = (name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url).then( (res) => {
        if(res.status != 200) {
            var img = document.getElementById("pokeImg");
            img.src = './images/pokeball.png';
        } else {
            return res.json();
        }
    }).then((data) => {
        // data.sprites.forEach(function(img){
        //     renderImages(img); 
        // })
        renderPokemonData(data);
        let mainContainer = document.getElementById('poke-images');
        mainContainer.innerHTML = "";
        var sorted=sortObjectByKeys(data.sprites);
        for(var img in sorted) {
            if (data.sprites[img] != null && typeof data.sprites[img] === 'string') {
                renderImages(data.sprites[img]); 
            }
         }
    })
}


function renderImages(image) {
    let listContainer = document.createElement("li");
    let img = document.createElement("img");

    img.src = image;
    listContainer.append(img);


    let mainContainer = document.getElementById('poke-images');
    mainContainer.append(listContainer);
}


const imprimir = () => {
    const pokename = document.getElementById("pokename");
    const pokeValue = pokename.value
    console.log(pokeValue)
    fetchPokemen(pokeValue);
}

const buscar = (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        imprimir();
      }
}
const input = document.getElementById("pokename");
input.addEventListener('keydown', buscar);

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
        fetch(url)
        .then(response => response.json())
        .then(function(pokeData){
            renderPokemon(pokeData)
        })
}

function renderPokemon(data) {
    let container = document.createElement("div");
    let title = document.createElement("p");
    let img = document.createElement("img");


    container.classList = ['poke-container']

    img.src = data.sprites.front_default;
    title.innerText = data.name;
    container.append(title, img);


    let mainContainer = document.getElementById('pokemon-container');
    mainContainer.append(container);
}

const main = () => {
    const random = Math.random() * (1000 - 0) + 0;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${random}`
    fetch(url).then( (res) => {
        if(res.status != 200) {
            var img = document.getElementById("pokeImg");
            img.src = './images/pokeball.png';
        } else {
            return res.json();
        }
    }).then((data) => {
        data.results.forEach(function(pokemon){
            fetchPokemonData(pokemon); 
        })
    })
}

main();
