const API_KEY = "35382e03-7226-4c7b-9074-a5743781909c";
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=3';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const movieEl = document.querySelector('.movies');
const form = document.querySelector('.form');
const searchInput = document.querySelector('.header__search');

getMovie(API_URL_POPULAR);
async function getMovie(url){
    const response = await fetch(url, {
        headers:{
            'Content-Type':'application/json',
            'X-API-KEY': API_KEY
        }
    });
    const responseData = await response.json();
    createMovieCard(responseData);
}

function madeRateColored(rate){
    if(rate >= 7) return 'green';
    else if(rate>5) return 'orange';
    else return 'red';
}



function createMovieCard(data){
    
    data.films.forEach(movie=>{
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie');
        movieBox.innerHTML=`
        <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" class="movie__cover" alt="title">
            <div class="movie__cover--darkend"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__categorie">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
            ${movie.rating && `<div class="movie__average movie__average--${madeRateColored(movie.rating)}">${movie.rating}</div>`}
        </div>
        `;

        movieEl.append(movieBox);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`;
    if(searchInput.value){
        movieEl.innerHTML='';
        getMovie(apiSearchUrl);
        searchInput.value = '';
    }
    else{
        alert('Фильм не найден!');
    }
})