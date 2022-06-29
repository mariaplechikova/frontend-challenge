const navItemAll = document.querySelector('.nav-all')
const navItemLike = document.querySelector('.nav-like')
const catBlock = document.querySelector('.block')
const buttonMore = document.querySelector('.more')
let cats
let pageCount = 1

async function init(limit, page) {
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=ASC`;
  
    const res = await fetch(url, {
      headers: {
        "x-api-key": "a6d4c1eb-17c5-483c-8a1c-ecae17d6f463"
      }
    });
  
    const newCats = await res.json();

    for ( let i = 0; i < newCats.length; i++) {
        newCats[i].favorite = false
    }

    pageCount++;
    return newCats;
}

//Загрузка  первых 15 котиков
(async function () {
    cats = await init(15, pageCount);
    catsRender(cats, 0)
    return cats
})();

navItemAll.classList.add('active')

//Загрузка следующих 15 котиков
buttonMore.addEventListener('click', async function() {
    const start = cats.length
    console.log(start)
    const newCats = await init(15, pageCount);
    cats = cats.concat(newCats)
    catsRender(cats, start)
    return cats
})


//Переход на страницу "Все котики"
navItemAll.addEventListener('click', function() {
    event.preventDefault()
    catBlock.innerHTML = ""
    // Можно через toogle
    navItemAll.classList.add('active')
    navItemLike.classList.remove('active')
    catsRender(cats, 0)
    buttonMore.style.display = "block"
})

//Переход на страницу "Любимые котики"
navItemLike.addEventListener('click', function() {
    console.log('nav item like')
    event.preventDefault()
    catBlock.innerHTML = ""
    // Можно через toogle
    navItemLike.classList.add('active')
    navItemAll.classList.remove('active')
    const favoriteCats = getCatsFavorite()
    catsRender(favoriteCats, 0)
    console.log(favoriteCats)
    buttonMore.style.display = "none"
})

//Отрисовка котиков
function catsRender(arr, start) {
    for ( let i = start; i < arr.length; i++) {
        // const isFavorite = arr[i].favorite === true ? 'show' : 'hide'
        // ${isFavorite ? '' : 'hidden'}
        // ${isFavorite ? 'hidden' : ''}

        catBlock.innerHTML += `
            <div class="cat-block" id="${arr[i].id}">
                <div class="cat-block-img cat-block-favorite">
                    <img src=${arr[i].url} class="cat-img">
                    <img src="Vector-red.png" class="like-img-red">
                    <img src="Vector.png" class="like-img hide">
                </div>    
            </div>  `
    }
    
    const likeImgRed = document.querySelectorAll(".like-img-red")

    for (let i = start; i < arr.length; i++) {
        if (arr[i].favorite === true) {
            likeImgRed[i].style.display = "block"
        }
    }
}

//Клик на котике
catBlock.addEventListener("click", function (event) {
    let elem = event.target

    while(elem) {
        if (elem.matches(".cat-block")) {
            break;
        }

        elem = elem.parentElement
    }

    if (elem) {
        const imgRed = elem.querySelector('.like-img-red')
        const id = elem.getAttribute("id")

        if (getComputedStyle(imgRed).display === 'block') {
            imgRed.style.display = "none"
            setCatsFavorite(id, false)
        } else {
            imgRed.style.display = "block"
            setCatsFavorite(id, true)
        }
    }
});

//Меняем статус котика
function setCatsFavorite(id, status) {
    const i = cats.findIndex((item) => item.id === id);

    cats[i].favorite = status
}

//Получам массив Любимых котиков
function getCatsFavorite() {
    const favoriteCats = []

    for (let i = 0; i < cats.length; i++) {
        console.log(cats[i].favorite)

        if (cats[i].favorite === true) {
            favoriteCats.push(cats[i])
        }
    }

    return favoriteCats
}
