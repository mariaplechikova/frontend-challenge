;(async () => {
    await getAllCats();
})();

async function getAllCats() {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
        headers: {
            "x-api-key": "a6d4c1eb-17c5-483c-8a1c-ecae17d6f463"
        }
    });
    const cats = await res.json();

    console.log(cats)

    return cats
}

async function init(limit, page) {
    if (!limit) {
      limit = 15;
    }
  
    if (!page) {
      page = 1;
    }
  
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=ASC`;
  
    const res = await fetch(url, {
      headers: {
        "x-api-key": "a6d4c1eb-17c5-483c-8a1c-ecae17d6f463"
      }
    });
  
    const cats = await res.json();
  
    console.log(cats);
  
    pageCount = pageCount + 15;
  
    return cats;
  }
  
  const buttonLoading = document.querySelector("#loading");
  const buttonMore = document.querySelector("#more");
  
  let limitcount = 15;
  let pageCount = 1;
  let cats;
  
  (async function () {
    cats = await init(15, pageCount);
  
    const newCats = [{ id: "1" }];
  
    cats = cats.concat(newCats);
  
    console.log(cats);
  })();
  
  buttonLoading.addEventListener("click", function () {
    const inputLimit = document.querySelector("#limit");
    const inputPage = document.querySelector("#page");
    init(inputLimit.value, inputPage.value);
  });
  
  buttonMore.addEventListener("click", function () {
    init(limitcount, pageCount);
  });
  