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