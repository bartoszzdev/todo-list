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

    const checkBtn = document.createElement("button")
    checkBtn.innerText = "\u2713"
    checkBtn.classList.add("check-btn")
    todoDiv.appendChild(checkBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "\u00D7"
    deleteBtn.classList.add("delete-btn")
    todoDiv.appendChild(deleteBtn)

    if (inputTodo.value.charAt(0) === "" || inputTodo.value.charAt(0) === " ") {
        alert("You must write something!")
    } else {
        todoList.appendChild(todoDiv)
        saveLocalTodos(inputTodo.value)
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