// window.addEventListener('load', function () {
//     console.log("It's loaded!")
// })

let options = document.querySelector(".options")
let navPop = document.querySelector(".navPop")
let remove = document.querySelector(".navPop > .header > .remove")
let langauge = document.querySelectorAll(".language")
let langPop = document.querySelector(".langPop")

options.addEventListener("click", () => {
    console.log("wooooow")
    navPop.style.display = "unset"
})

remove.addEventListener("click", () => {
    console.log("wooooow")
    navPop.style.display = "none"
})

langauge.forEach((item) => {
    item.addEventListener("click", () => {
        langPop.style.display = "flex"
    })
})

langPop.addEventListener("click", () => {
    langPop.style.display = "none"
})