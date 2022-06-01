const catImg = document.querySelectorAll('.cat-img')
const catImgLike = document.querySelectorAll('.like-img')
const navItemAll = document.querySelector('.nav-item-all')
const navItemLike = document.querySelector('.nav-item-like')

navItemAll.addEventListener('click', function() {
    event.preventDefault()
    navItemAll.classList.add('active')
    navItemAll.parentNode.classList.add('active')
    navItemLike.classList.remove('active')
    navItemLike.parentNode.classList.remove('active')
})

navItemLike.addEventListener('click', function() {
    event.preventDefault()
    navItemLike.classList.add('active')
    navItemLike.parentNode.classList.add('active')
    navItemAll.classList.remove('active')
    navItemAll.parentNode.classList.remove('active')
})

// catImg.addEventListener('mouseover', function() {
//     catImgLike.style.display = "block"
// })

// catImg.addEventListener('mouseout', function() {
//     catImgLike.style.display = "none"
// })


