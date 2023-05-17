const API_KEY = "35382e03-7226-4c7b-9074-a5743781909c";
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=3';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const movieEl = document.querySelector('.movies');
const form = document.querySelector('.form');
const searchInput = document.querySelector('.header__search');
const modalWindow = document.querySelector('.modal');
const uknownTime = 'Продолжительность неизвестна';
const d = document.body;

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
        movieBox.addEventListener('click', () => showModal(movie.filmId));
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
});

// Modal Window
function showModal(id){
    async function openModal(id){
        const response = await fetch(API_URL_DETAILS+id, {
            headers:{
                'Content-Type':'application/json',
                'X-API-KEY': API_KEY
            }
        });
        const responseData = await response.json();

        modalWindow.classList.add('modal--show');
        d.classList.add('stop-scrolling');
        modalWindow.innerHTML=`
            <div class="modal__card">
                <img class="modal__movie-backdrop" src="${responseData.posterUrl}" alt="image">
                <h2>
                    <span class="modal__movie-title">${responseData.nameRu}</span>
                    <span class="modal__movie-year">${responseData.year}</span>
                </h2>
                <ul class="modal__movie-info">
                    <div class="loader"></div>
                    <li class="modal__movie-genre">Жанр - ${responseData.genres.map((genre) => `<span>${genre.genre}</span>`)}</li>
                    <li class="modal__movie-runtime">Время (мин) - ${responseData.filmLength || uknownTime}</li>
                    <li>Сайт: <a href="${responseData.webUrl}" class="modal__movie-site">${responseData.webUrl}</a></li>
                    <li class="modal__movie-overview">Описание - ${responseData.description}</li>
                </ul>
                <button type="button" class="modal__button-close">Закрыть</button>
            </div>
        `;
        const btnClose = document.querySelector('.modal__button-close');
        btnClose.addEventListener('click', () => closeModalWindow());
    }
    openModal(id);
}

function closeModalWindow(){
    modalWindow.classList.remove('modal--show');
    d.classList.remove('stop-scrolling');
}

window.addEventListener('click', (e) => {
    if(e.target === modalWindow){
        closeModalWindow();
    }
});

window.addEventListener('keydown', (e) => {
    if(e.code ==='Escape'){
        closeModalWindow();
    }
})