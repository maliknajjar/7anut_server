let showOrders = document.querySelectorAll(".showOrders")
let topdiv = document.querySelector(".topdiv")
let topdivChild = document.querySelector(".topdiv div")
let textInput = document.querySelector(".input")
let masterCheckbox = document.querySelector(".masterCheckbox")
let slaveCheckbox = document.querySelectorAll(".slaveCheckbox")
let options = document.querySelectorAll(".option")

showOrders.forEach((element) => {
    element.addEventListener("click", (e) => {
        topdiv.style.display = "flex"
        topdivChild.innerHTML = element.dataset.orders
    })
})
topdiv.addEventListener("click", (e) => {
    topdiv.style.display = "none"
})
textInput.addEventListener("input", () => {
    options.forEach((item) => {
        let newObject = JSON.parse(item.value)
        newObject["message"] = textInput.value == "" ? null : textInput.value
        item.value = JSON.stringify(newObject)
    })
})
masterCheckbox.addEventListener("change", () => {
    slaveCheckbox.forEach((item) => {
        item.checked = masterCheckbox.checked
    })
})