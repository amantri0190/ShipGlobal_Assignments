// Initialize an empty array to store tasks
let tasks = [];

// Define the different task statuses that tasks can have
const inner_containers = ['backlog', 'todo', 'ongoing', 'done'];

/**
 This Function is use to render tasks on the web page
 Clears existing tasks from the task lists
 Loops through each task and creates a new HTML element for it
 Appends the task to the appropriate status container
 */
function renderTasks() {
    // Clear all existing tasks in the task lists
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

    // Loop through each task in the tasks array
    tasks.forEach(task => {
        // Create a new div element for each task
        const taskElement = document.createElement('div');
        taskElement.id = task.id; // Set the task's id
        taskElement.className = 'task'; // Assign the task CSS class
        taskElement.innerHTML = `
            ${task.name}
            <div class="status">${task.status}</div>
            <div class="move-buttons">
            ${inner_containers.indexOf(task.status) > 0 ? '<button onclick="moveTask(\'' + task.id + '\', \'left\')">←</button>' : ''}
            ${inner_containers.indexOf(task.status) < inner_containers.length - 1 ? '<button onclick="moveTask(\'' + task.id + '\', \'right\')">→</button>' : ''}
            </div>
        `;

        // Append the task element to the appropriate status container
        document.querySelector(`#${task.status} .task-list`).appendChild(taskElement);
    });
}

/**
This Function is use to add a new task to the tasks list
 Retrieves the task name and status from user input
 Validates the task name and adds the task to the tasks array
 Clears the input fields after adding the task
 Re-renders the tasks on the page
 */
function addTask() {
    
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;

    if (taskName.trim() === '') {
        alert('Please enter a task name');
        return; 
    }
    const newTask = {
        id: 'task-' + (tasks.length + 1), 
        name: taskName, 
        status: taskStatus 
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Re-render the tasks on the page
    renderTasks();

    // Clear the task name input field after adding the task
    document.getElementById('taskName').value = '';
}

/**
  This Function is use to move a task to a different status
  Finds the task by its ID and updates its status
  Re-renders the tasks on the page after moving
 */
function moveTask(taskId, direction) {
    
    const task = tasks.find(t => t.id === taskId);
    
    if (task) { 
        const currentIndex = inner_containers.indexOf(task.status); // Get the current status index
        let newIndex;

        // Determine the new index based on the direction
        if (direction === 'left' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (direction === 'right' && currentIndex < inner_containers.length - 1) {
            newIndex = currentIndex + 1;
        }

        // Update the task's status and re-render the tasks
        if (newIndex !== undefined) {
            task.status = inner_containers[newIndex];
            renderTasks();
        }
    }
}

// Load initial tasks from the JSON file
fetch('tasks.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        tasks = data.tasks; // Set the tasks array to the loaded tasks
        renderTasks(); // Render the loaded tasks
    })
    .catch(error => console.error('Error loading tasks:', error)); // Handle any errors
