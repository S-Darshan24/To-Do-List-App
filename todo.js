// DOM Element References
const todoinput = document.getElementById("task-input"); // Input field
const addbtn = document.getElementById("addbtn"); // Add/Edit button
const tasklist = document.getElementById("todobox"); // Todo list container
let editTodo = null; // Stores reference to todo being edited

// Main Todo Creation/Edit Function
const addtodo = () => {
    const inputText = todoinput.value.trim();
    
    // Input Validation
    if (inputText.length <= 0) {
        alert("Please enter a valid todo item");
        return false;
    }

    // Edit Existing Todo
    if (addbtn.value === "Edit") {
        // Update localStorage and DOM with edited text
        editlocaltodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addbtn.value = "Add";
        todoinput.value = "";
    } 
    // Create New Todo
    else {
        // Create List Item Structure
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;

        // Create Action Buttons
        const editbtn = document.createElement("button");
        editbtn.innerHTML = "Edit";
        editbtn.classList.add("btn", "deletebtn");

        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = "Remove";
        deletebtn.classList.add("btn", "editbtn");

        // Assemble Todo Item
        li.appendChild(p);
        li.appendChild(editbtn);
        li.appendChild(deletebtn);
        tasklist.appendChild(li);

        // Clear Input & Save
        todoinput.value = "";
        savalocaltodo(inputText);
    }
}

// Todo Update Handler (Edit/Delete)
const updatetodo = (e) => {
    // Edit Mode Activation
    if (e.target.innerHTML === "Edit") {
        todoinput.value = e.target.previousElementSibling.innerHTML;
        todoinput.focus();
        addbtn.value = "Edit";
        editTodo = e; // Store reference to edited item
    }
    
    // Delete Todo
    if (e.target.innerHTML === "Remove") {
        tasklist.removeChild(e.target.parentElement);
        deletetodo(e.target.parentElement);
    }
}

// LocalStorage Operations

// Save Todo to LocalStorage
const savalocaltodo = (todo) => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load Todos from LocalStorage
const getlocaltodo = () => {
    let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    
    todos.forEach(todo => {
        // Recreate DOM elements for each stored todo
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;

        const editbtn = document.createElement("button");
        editbtn.innerHTML = "Edit";
        editbtn.classList.add("btn", "deletebtn");

        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = "Remove";
        deletebtn.classList.add("btn", "editbtn");

        li.appendChild(p);
        li.appendChild(editbtn);
        li.appendChild(deletebtn);
        tasklist.appendChild(li);
    });
}

// Delete Todo from LocalStorage
const deletetodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todotext = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todotext), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Edit Todo in LocalStorage
const editlocaltodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoindex = todos.indexOf(todo);
    todos[todoindex] = todoinput.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
document.addEventListener("DOMContentLoaded", getlocaltodo); // Load todos on page load
addbtn.addEventListener("click", addtodo); // Add/edit button handler
tasklist.addEventListener("click", updatetodo); // Todo list interactions 
