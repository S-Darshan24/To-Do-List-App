// online offline event
addEventListener("offline", () => {
    alert('you are offline');
});
addEventListener("online", () => {
    alert('you are online');
});

let todoinput = document.getElementById("task-input")
let addbtn = document.getElementById("addbtn")
let tasklist = document.getElementById("todobox");

let editTodo = null;
let 

const addtodo = () => {
    const inputText = todoinput.value.trim();
    if (inputText.length <= 0) {
        alert("you must write something in your to do")
        return false
    }
    if (addbtn.value === "Edit") {
        editlocaltodos(editTodo.target.previousElementSibling.innerHTML)
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addbtn.value = "Add";
        todoinput.value = "";
    }
    else {
        // Creating a li and p tag for HTML
        const li = document.createElement("li")
        const p = document.createElement("p")

        p.innerHTML = inputText
        li.appendChild(p)
        tasklist.appendChild(li)
        todoinput.value = ""

        // create a edit btn
        const editbtn = document.createElement("button")
        editbtn.innerHTML = "Edit"
        editbtn.classList.add("btn", "deletebtn")
        li.appendChild(editbtn);

        // create Delete btn 
        const deletebtn = document.createElement("button")
        deletebtn.innerHTML = "Remove"
        deletebtn.classList.add("btn", "editbtn")
        li.appendChild(deletebtn);
        tasklist.appendChild(li)
        todoinput.value = ""

        savatodo(inputText)
    }
}

const updatetodo = (e) => {
    // Edit a edit button
    if (e.target.innerHTML === "Edit") {
        todoinput.value = e.target.previousElementSibling.innerHTML;
        todoinput.focus();
        addbtn.value = "Edit";
        editTodo = e;
    }
    // Remover todo list
    if (e.target.innerHTML === "Remove") {
        tasklist.removeChild(e.target.parentElement)
        deletetodo(e.target.parentElement)
    }
}

const savatodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

const gettodo = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            // Creating a li and p tag for HTML
            const li = document.createElement("li")
            const p = document.createElement("p")

            p.innerHTML = todo
            li.appendChild(p)
            tasklist.appendChild(li)
            todoinput.value = ""

            // create a edit btn
            const editbtn = document.createElement("button")
            editbtn.innerHTML = "Edit"
            editbtn.classList.add("btn", "deletebtn")
            li.appendChild(editbtn);

            // create Delete btn 
            const deletebtn = document.createElement("button")
            deletebtn.innerHTML = "Remove"
            deletebtn.classList.add("btn", "editbtn")
            li.appendChild(deletebtn);
            tasklist.appendChild(li)


        });
    }
}

const deletetodo = (todo) =>{
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todotext = todo.children[0].innerHTML;
    let todoindex = todos.indexOf(todotext);
    todos.splice(todoindex , 1)
    localStorage.setItem('todos' , JSON.stringify(todos))
    console.log(todoindex)
}

const editlocaltodos = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("todos"))
    let todoindex = todos.indexOf(todo)
    todos[todoindex] = todoinput.value;
    localStorage.setItem('todos', JSON.stringify(todos))
}
// addEventListener to click button
document.addEventListener('DOMContentLoaded' , gettodo)
addbtn.addEventListener("click", addtodo);
tasklist.addEventListener('click', updatetodo)