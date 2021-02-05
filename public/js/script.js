let showOrders = document.querySelectorAll(".showOrders")
let topdiv = document.querySelector(".topdiv")
let topdivChild = document.querySelector(".topdiv div")

showOrders.forEach((element) => {
    element.addEventListener("click", (e) => {
        topdiv.style.display = "flex"
        topdivChild.innerHTML = element.dataset.orders
    })
})
topdiv.addEventListener("click", (e) => {
    topdiv.style.display = "none"
})