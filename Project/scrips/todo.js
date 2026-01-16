// ============================================
// DYNAMIC TO-DO APP - Full Featured Version
// ============================================

// Application State
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;
const TASKS_KEY = 'aidetox_tasks';

/**
 * Check authentication on page load
 */
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return false;
    }

    const currentUser = sessionStorage.getItem('currentUser') || 'GUEST';
    document.getElementById('userBadge').textContent = currentUser.toUpperCase();
    return true;
}

/**
 * Logout and redirect to login page
 */
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Load tasks from localStorage
 */
function loadTasks() {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
        try {
            tasks = JSON.parse(stored);
            // Filter out any invalid tasks (empty titles)
            tasks = tasks.filter(t => t && t.id && t.title && t.title.trim() !== '');
            saveTasks(); // Save cleaned list
        } catch (e) {
            tasks = [];
        }
    } else {
        tasks = [];
    }
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Generate unique ID
 */
function generateId() {
    return Date.now();
}

/**
 * Show validation error message
 */
function showError(message) {
    const errorEl = document.getElementById('inputError');
    errorEl.textContent = message;
    errorEl.classList.add('show');

    // Add shake animation to input
    const input = document.getElementById('taskInput');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);

    // Hide error after 3 seconds
    setTimeout(() => {
        errorEl.classList.remove('show');
    }, 3000);
}

/**
 * Hide validation error
 */
function hideError() {
    const errorEl = document.getElementById('inputError');
    errorEl.classList.remove('show');
}

/**
 * Add a new task
 */
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    // Empty input validation
    if (!text) {
        showError('!! Task required !!');
        input.focus();
        return;
    }

    hideError();

    // Create task object with required structure
    const task = {
        id: generateId(),
        title: text,
        completed: false
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();

    // Clear input and refocus
    input.value = '';
    input.focus();
}

/**
 * Toggle task completion
 */
function toggleTask(id) {
    const taskId = parseInt(id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

/**
 * Delete a task
 */
function deleteTask(id) {
    const taskId = parseInt(id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
    }
}

/**
 * Start editing a task
 */
function startEdit(id) {
    editingTaskId = parseInt(id);
    renderTasks();

    // Focus the edit input
    setTimeout(() => {
        const editInput = document.getElementById(`edit-input-${editingTaskId}`);
        if (editInput) {
            editInput.focus();
            editInput.select();
        }
    }, 50);
}

/**
 * Save edited task
 */
function saveEdit(id) {
    const taskId = parseInt(id);
    const editInput = document.getElementById(`edit-input-${taskId}`);
    const newTitle = editInput.value.trim();

    if (!newTitle) {
        showError('!! Task cannot be empty !!');
        return;
    }

    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = newTitle;
        saveTasks();
    }

    editingTaskId = null;
    hideError();
    renderTasks();
}

/**
 * Cancel editing
 */
function cancelEdit() {
    editingTaskId = null;
    hideError();
    renderTasks();
}

/**
 * Clear all tasks
 */
function clearAll() {
    if (tasks.length === 0) return;

    // Show confirmation
    if (confirm('DELETE ALL TASKS?\n\nThis action cannot be undone!')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

/**
 * Clear completed tasks only
 */
function clearCompleted() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) return;

    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

/**
 * Filter tasks
 */
function filterTasks(filter) {
    currentFilter = filter;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    renderTasks();
}

/**
 * Get filtered tasks based on current filter
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

/**
 * Update task statistics
 */
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    progressBar.style.width = `${percentage}%`;

    // Change color based on progress
    if (percentage === 100) {
        progressBar.style.background = 'var(--success-color)';
    } else if (percentage >= 50) {
        progressBar.style.background = 'var(--accent-color)';
    } else {
        progressBar.style.background = '#6366f1';
    }
}

/**
 * Render tasks to DOM using event delegation
 */
function renderTasks() {
    const list = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const filteredTasks = getFilteredTasks();

    // Update statistics
    updateStats();

    // Show/hide empty state
    if (filteredTasks.length === 0) {
        list.style.display = 'none';
        emptyState.classList.add('show');

        // Update empty state message based on filter
        const emptyText = document.querySelector('.empty-state p');
        const emptyHint = document.querySelector('.empty-state span');

        if (currentFilter === 'completed') {
            emptyText.textContent = 'No completed tasks!';
            emptyHint.textContent = 'Complete some tasks to see them here';
        } else if (currentFilter === 'active') {
            emptyText.textContent = 'All tasks completed!';
            emptyHint.textContent = 'Great job!';
        } else {
            emptyText.textContent = 'No tasks yet!';
            emptyHint.textContent = 'Add your first task above';
        }
    } else {
        list.style.display = 'block';
        emptyState.classList.remove('show');
    }

    // Render task items
    list.innerHTML = filteredTasks.map(task => {
        if (editingTaskId === task.id) {
            // Render edit mode
            return `
                <li class="task-item editing" data-id="${task.id}">
                    <input type="text" 
                        id="edit-input-${task.id}" 
                        class="edit-input" 
                        value="${escapeHtml(task.title)}"
                        maxlength="100">
                    <div class="edit-actions">
                        <button class="save-btn" data-action="save" data-id="${task.id}" aria-label="Save">Y</button>
                        <button class="cancel-btn" data-action="cancel" aria-label="Cancel">N</button>
                    </div>
                </li>
            `;
        }

        return `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                    data-action="toggle"
                    data-id="${task.id}"
                    role="checkbox" 
                    aria-checked="${task.completed}"
                    tabindex="0">
                    ${task.completed ? '<span class="check-mark">X</span>' : ''}
                </div>
                <span class="task-text">${escapeHtml(task.title)}</span>
                <div class="task-actions">
                    <button class="task-edit" data-action="edit" data-id="${task.id}" aria-label="Edit task">/</button>
                    <button class="task-delete" data-action="delete" data-id="${task.id}" aria-label="Delete task">X</button>
                </div>
            </li>
        `;
    }).join('');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handle all click events using event delegation
 */
function handleTaskListClick(e) {
    const target = e.target;

    // Find the element with data-action (could be the target or a parent)
    let actionElement = target;
    if (!actionElement.dataset.action) {
        actionElement = target.closest('[data-action]');
    }

    if (!actionElement) return;

    const action = actionElement.dataset.action;
    const id = actionElement.dataset.id;

    if (!action) return;

    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();

    switch (action) {
        case 'toggle':
            if (id) toggleTask(id);
            break;
        case 'delete':
            if (id) deleteTask(id);
            break;
        case 'edit':
            if (id) startEdit(id);
            break;
        case 'save':
            if (id) saveEdit(id);
            break;
        case 'cancel':
            cancelEdit();
            break;
    }
}

/**
 * Handle keyboard events
 */
function handleKeyboard(e) {
    // Add task on Enter in main input
    if (e.target.id === 'taskInput' && e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }

    // Handle edit input
    if (e.target.classList.contains('edit-input')) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const id = e.target.id.replace('edit-input-', '');
            saveEdit(id);
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    }

    // Toggle task on checkbox Enter/Space
    if (e.target.classList.contains('task-checkbox') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const taskId = e.target.dataset.id;
        toggleTask(taskId);
    }
}

/**
 * Initialize the application
 */
function init() {
    if (!checkAuth()) return;

    loadTasks();
    renderTasks();

    // Focus input on load
    document.getElementById('taskInput').focus();

    // Add event delegation for task list
    document.getElementById('taskList').addEventListener('click', handleTaskListClick);

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboard);

    // Add input event to hide error when typing
    document.getElementById('taskInput').addEventListener('input', hideError);

    // Initialize mascot speech bubble functionality
    initMascot();
}

/**
 * Initialize mascot and speech bubble interactions
 */
function initMascot() {
    const mascotBoy = document.getElementById('mascotBoy');
    const speechBubble = document.getElementById('speechBubble');
    const closeBubble = document.getElementById('closeBubble');
    const ctaBubble = document.getElementById('ctaBubble');
    const ctaText = document.getElementById('ctaText');

    if (!mascotBoy || !speechBubble) return;

    // Random CTA messages
    const ctaMessages = [
        "Click me!",
        "Hey there!",
        "Projects!",
        "Explore!",
        "Tap here!",
        "See more!",
        "What's up?",
        "Yo!",
        "Over here!",
        "Check this!"
    ];

    // Function to show CTA with random message
    function showCTA() {
        if (ctaText && ctaBubble && !speechBubble.classList.contains('active')) {
            const randomIndex = Math.floor(Math.random() * ctaMessages.length);
            ctaText.textContent = ctaMessages[randomIndex];
            ctaBubble.classList.remove('hidden');

            // Hide after random time (2-4 seconds)
            const hideDelay = 2000 + Math.random() * 2000;
            setTimeout(hideCTA, hideDelay);
        }
    }

    // Function to hide CTA
    function hideCTA() {
        if (ctaBubble && !speechBubble.classList.contains('active')) {
            ctaBubble.classList.add('hidden');

            // Show again after random short interval (1.5-3 seconds)
            const showDelay = 1500 + Math.random() * 1500;
            setTimeout(showCTA, showDelay);
        }
    }

    // Start the CTA cycle - initially hidden, then show after a short delay
    if (ctaBubble) {
        ctaBubble.classList.add('hidden');
        setTimeout(showCTA, 1000); // First appearance after 1 second
    }

    // Toggle speech bubble on mascot click
    mascotBoy.addEventListener('click', function (e) {
        e.stopPropagation();
        speechBubble.classList.toggle('active');

        // Hide/show CTA bubble
        if (ctaBubble) {
            ctaBubble.classList.toggle('hidden', speechBubble.classList.contains('active'));
        }
    });

    // Also toggle on CTA bubble click
    if (ctaBubble) {
        ctaBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.add('active');
            ctaBubble.classList.add('hidden');
        });
    }

    // Close bubble on close button click
    if (closeBubble) {
        closeBubble.addEventListener('click', function (e) {
            e.stopPropagation();
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        });
    }

    // Close bubble when clicking outside
    document.addEventListener('click', function (e) {
        if (!speechBubble.contains(e.target) && !mascotBoy.contains(e.target)) {
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        }
    });

    // Close bubble on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && speechBubble.classList.contains('active')) {
            speechBubble.classList.remove('active');
            if (ctaBubble) {
                ctaBubble.classList.remove('hidden');
            }
        }
    });
}

// Initialize when DOM is ready
// Info Modal Logic
function initInfoModal() {
    const infoBtn = document.getElementById('infoIcon');
    const infoModal = document.getElementById('infoModal');
    const closeInfoBtn = document.getElementById('closeInfoModal');

    if (infoBtn && infoModal && closeInfoBtn) {
        infoBtn.addEventListener('click', () => {
            infoModal.classList.add('active');
        });

        closeInfoBtn.addEventListener('click', () => {
            infoModal.classList.remove('active');
        });

        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.classList.remove('active');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
// Extend init to include info modal
const originalInit = init;
// Overwrite listener not needed as we can just add the call to the end of file which runs after definition
document.addEventListener('DOMContentLoaded', initInfoModal);
