const inputTodo = document.getElementById("input-todo")
const addBtn = document.getElementById("add-btn")
const todoList = document.getElementById("todo-list")
const filterTodo = document.querySelector(".filter-todo")

addBtn.addEventListener("click", function(e) {
    e.preventDefault()

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const todoItem = document.createElement("li")
    todoItem.innerText = inputTodo.value
    todoItem.classList.add("todo-item")
    todoDiv.appendChild(todoItem)

    saveLocalTodos(inputTodo.value)

    const checkBtn = document.createElement("button")
    checkBtn.innerText = "\u2713"
    checkBtn.classList.add("check-btn")
    todoDiv.appendChild(checkBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "\u00D7"
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn)

    if (inputTodo.value === "") {
        alert("You must write something!")
    } else {
        todoList.appendChild(todoDiv)
    }

    inputTodo.value = ""
})

todoList.addEventListener("click", function(e) {
    const item = e.target

    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement
        removeLocalTodos(todo)
        todo.remove()
    }

    if (item.classList[0] === "check-btn") {
        const todo = item.parentElement.firstChild
        todo.classList.toggle("checked")
    }
})

filterTodo.addEventListener("click", function(e) {
    const todos = todoList.childNodes

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if (todo.firstChild.classList.contains("checked")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if (!todo.firstChild.classList.contains("checked")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
})

function saveLocalTodos(todo) {
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

document.addEventListener("DOMContentLoaded", function() {
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        const todoItem = document.createElement("li")
        todoItem.innerText = todo
        todoItem.classList.add("todo-item")
        todoDiv.appendChild(todoItem)

        const checkBtn = document.createElement("button")
        checkBtn.innerText = "\u2713"
        checkBtn.classList.add("check-btn")
        todoDiv.appendChild(checkBtn)

        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "\u00D7"
        deleteBtn.classList.add("delete-btn")
        todoDiv.appendChild(deleteBtn)

        if (todo === "") {
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            todoList.appendChild(todoDiv)
        }
    })
})

function removeLocalTodos(todo) {
    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}





























// if (todosFromLocalStorage) {
//     myTodos = todosFromLocalStorage
//     renderTodo(todosFromLocalStorage)
// }

/* addBtn.addEventListener("click", function(event) {
    event.preventDefault()

    if (inputTodo.value === "") {
        alert("You must write something!")
    } else { 
        myTodos.push(inputTodo.value)
        inputTodo.value = ""
        localStorage.setItem("todo", JSON.stringify(myTodos))
        renderTodo(myTodos)
    }
})

function renderTodo(items) {
    let item = ""
    for (let i = 0; i < items.length; i++) {
        item += `<li class="item">${items[i]}</li>`
    }
    todoItems.innerHTML = item

    createCloseBtn()
    createDoneBtn()
    checkItem()
    deleteItem()
}

function createCloseBtn() {
    let myNodelist = document.querySelectorAll("#todo-items li");
    for (let i = 0; i < myNodelist.length; i++) {
        let btn = document.createElement("button")
        let txt = document.createTextNode("\u00D7")
        btn.className = "delete-btn"
        btn.appendChild(txt)
        myNodelist[i].appendChild(btn)
    }
} 

function deleteItem() { 
    let close = document.getElementsByClassName("delete-btn")
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function(event) {
            let div = event.target.parentElement
            div.parentElement.removeChild(div)
            myTodos.splice(myTodos.indexOf(myTodos[i]), 1)
            renderTodo(myTodos)
        })
    }
}

function createDoneBtn() {
    let myNodelist = document.querySelectorAll("#todo-items li");
    for (let i = 0; i < myNodelist.length; i++) {
        let btn = document.createElement("button")
        let txt = document.createTextNode("\u2713")
        btn.className = "done-btn"
        btn.appendChild(txt)
        myNodelist[i].appendChild(btn)
    }
}

function checkItem() {
    let done = document.getElementsByClassName("done-btn")
    for (let i = 0; i < done.length; i++) {
        done[i].addEventListener("click", (event) => {
            event.target.parentElement.classList.toggle("checked")
        })
    }
} */