/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function() {

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
async function getMovie(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
    }
  });
  const responseData = await response.json();
  createMovieCard(responseData);
}

// Change rate color
function madeRateColored(rate) {
  if (rate >= 7) return 'green';else if (rate > 5) return 'orange';else return 'red';
}
function createMovieCard(data) {
  data.films.forEach(movie => {
    const movieBox = document.createElement('div');
    movieBox.classList.add('movie');
    movieBox.innerHTML = `
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
  });
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${searchInput.value}`;
  if (searchInput.value) {
    movieEl.innerHTML = '';
    getMovie(apiSearchUrl);
    searchInput.value = '';
  } else {
    alert('Фильм не найден!');
  }
});

// Modal Window
function showModal(id) {
  async function openModal(id) {
    const response = await fetch(API_URL_DETAILS + id, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      }
    });
    const responseData = await response.json();
    modalWindow.classList.add('modal--show');
    d.classList.add('stop-scrolling');
    modalWindow.innerHTML = `
            <div class="modal__card">
                <img class="modal__movie-backdrop" src="${responseData.posterUrl}" alt="image">
                <h2>
                    <span class="modal__movie-title">${responseData.nameRu}</span>
                    <span class="modal__movie-year">${responseData.year}</span>
                </h2>
                <ul class="modal__movie-info">
                    <div class="loader"></div>
                    <li class="modal__movie-genre">Жанр - ${responseData.genres.map(genre => `<span>${genre.genre}</span>`)}</li>
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

// Close modal window
function closeModalWindow() {
  modalWindow.classList.remove('modal--show');
  d.classList.remove('stop-scrolling');
}
;
window.addEventListener('click', e => {
  if (e.target === modalWindow) {
    closeModalWindow();
  }
});
window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeModalWindow();
  }
});

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\n<html lang=\"ru\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Movie App</title>\n</head>\n<body>\n    <header class=\"container\">\n        <div class=\"header__content\">\n            <a href=\"./index.html\" class=\"header__logo\">MovieApp</a>\n            <form action=\"\" method=\"get\" class=\"form\">\n                <input type=\"text\" name=\"search\" class=\"header__search\" placeholder=\"Поиск\">\n            </form>\n        </div>  \n    </header>\n    <div class=\"container\">\n        <div class=\"movies\"></div>\n        <div class=\"modal\"></div>\n    </div>\n</body>\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/app.js */ "./src/js/app.js");
/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_app_js__WEBPACK_IMPORTED_MODULE_2__);



}();
/******/ })()
;
//# sourceMappingURL=main-95fa915399388147a3b8.js.map