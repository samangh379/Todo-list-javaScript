"use strict";

// selector

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".fas");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");
// event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodo);

//function
function addTodo(e) {
  e.preventDefault();
  console.log(e);
  if (todoInput.value !== "" && todoInput.value.length >= 4) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = `<li class="task1">${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;

    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
    saveLocalTodo(todoInput.value);

    todoInput.value = "";
  } else {
    alert("Please Enter Something!");
  }
}

function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  console.log(classList);
  if (classList[1] === "fa-check-square") {
    item.parentElement.parentElement.classList.toggle("completed");
  } else if (classList[1] === "fa-trash-alt") {
    item.parentElement.parentElement.remove();
  }
}

function filterTodos(event) {
  const todos = [...todoList.childNodes];
  // console.log(todos);
  console.log(event.target.value);
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  let saveData = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveData.push(todo);
  localStorage.setItem("todos", JSON.stringify(saveData));
}

function getLocalTodo() {
  let saveData = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveData.forEach((el) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = `<li class="task1">${el}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;

    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
  });
}
