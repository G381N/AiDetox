// Elements
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("task-list");
const clearButton = document.getElementById("clearButton");
const totalCountSpan = document.getElementById("total-count");
const completedCountSpan = document.getElementById("completed-count");
const pendingCountSpan = document.getElementById("pending-count");

// State
let Array = [];
let currentFilter = 'all';

// 1. Add Task
addButton.addEventListener("click", function () {
    const title = taskInput.value.trim();

    // Validation to check if the input is empty
    if (title === "") {
        alert("Task required");
        return;
    }
    //structure of the Object
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };

    Array.push(newTask);
    taskInput.value = ""; // make sure input field is cleared
    renderTasks();// Update the screen
});

// what the clear button does
clearButton.addEventListener("click", function () {
    Array = [];
    renderTasks();
});

//what the filter buttons do
function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
}

// how the tasks are displayed on the screen
function renderTasks() {
    taskList.innerHTML = ""; // Clear current list

    // how counts are calculated
    const total = Array.length;
    
    let completed = 0;
    for(let i=0; i < Array.length; i++) {
        if(Array[i].completed === true) {
            completed++;
        }
    }
    
    const pending = total - completed;

    totalCountSpan.innerText = total;
    completedCountSpan.innerText = completed;
    pendingCountSpan.innerText = pending;

    // how we are actually filtering the tasks

    let filteredTasks = [];// new array to hold filtered tasks
    if (currentFilter === 'all') 
        {
        filteredTasks = Array;
        } 
    else 
        {
        for (let i = 0; i < Array.length; i++) 
            {
            const task = Array[i];
            if (currentFilter === 'active' && !task.completed) 
            {
                filteredTasks.push(task);
            }
            else if (currentFilter === 'completed' && task.completed) 
            {
                filteredTasks.push(task);
            }
        }
    }

    // Create List Items
    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        // Strikethrough style if completed
        const titleStyle = task.completed ? "text-decoration: line-through;" : "";

        li.innerHTML = `
                        <span style="${titleStyle}">${task.title}</span>
                        <button class="complete-btn" data-id="${task.id}">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button class="edit-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-id="${task.id}">Delete</button>
                    `;

        taskList.appendChild(li);
    });
}

// Event Delegation for Task Actions
taskList.addEventListener("click", function (event) {
    const target = event.target;
    const id = Number(target.getAttribute("data-id"));

    // Delete
    if (target.classList.contains("delete-btn")) {
        Array = Array.filter(t => t.id !== id);
        renderTasks();
    }

    // Toggle Complete
    if (target.classList.contains("complete-btn")) {
        const task = Array.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    }

    // Edit
    if (target.classList.contains("edit-btn")) {
        const task = Array.find(t => t.id === id);
        if (task) {
            const newTitle = prompt("Update task name:", task.title);
            if (newTitle !== null && newTitle.trim() !== "") {
                task.title = newTitle.trim();
                renderTasks();
            }
        }
    }
});