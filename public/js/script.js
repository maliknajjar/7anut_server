let showOrders = document.querySelectorAll(".showOrders")
let topdiv = document.querySelector(".topdiv")
let topdivChild = document.querySelector(".topdiv div")
let textInput = document.querySelector(".input")
let masterCheckbox = document.querySelector(".masterCheckbox")
let slaveCheckbox = document.querySelectorAll(".slaveCheckbox")
let options = document.querySelectorAll(".option")

// change status and adding comment
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

// activate button
let activate = document.querySelectorAll(".activate")
activate.forEach((e) => {
    let email = e.dataset.email
    e.addEventListener("click", (e) => {
        console.log("woooooow")
        fetch('/admin/activate', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        }).then((result) => {
            console.log(result)
            location.reload();
        })
    })
})