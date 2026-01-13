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

    // Empty validation
    if (title === "") {
        alert("Task required");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };

    Array.push(newTask);
    taskInput.value = ""; // Clear input
    renderTasks();
});

// 2. Clear All
clearButton.addEventListener("click", function () {
    Array = [];
    renderTasks();
});

// 3. Filter Logic
function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
}

// 4. Render Function (Updates List & Counts)
function renderTasks() {
    taskList.innerHTML = ""; // Clear current list

    // Calculate Counts
    const total = Array.length;
    const completed = Array.filter(t => t.completed).length;
    const pending = total - completed;

    totalCountSpan.innerText = total;
    completedCountSpan.innerText = completed;
    pendingCountSpan.innerText = pending;

    // Apply Filter
    let filteredTasks = Array;
    if (currentFilter === 'active') {
        filteredTasks = Array.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = Array.filter(t => t.completed);
    }

    // Create List Items
    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        // Strikethrough style if completed
        const titleStyle = task.completed ? "text-decoration: line-through;" : "";

        // Using simple innerHTML for the row content
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

// 5. Event Delegation (Handle clicks on List)
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