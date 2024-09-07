// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;



// Todo: create a function to generate a unique task id
function generateTaskId() {
    const taskId = `task_${nextId}`;
    nextId++; // Increment nextId for the next task
    localStorage.setItem("nextId", JSON.stringify(nextId)); // Update nextId in localStorage
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("card", "mb-3", "task-card");
    taskCard.draggable = true;
    taskCard.setAttribute("id", task.id.toString());

    taskCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
      </div>
    `;
  
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const lanes = {
        'to-do': document.getElementById('todo-cards'),
        'in-progress': document.getElementById('in-progress-cards'),
        'done': document.getElementById('done-cards')
    };

    Object.values(lanes).forEach(lane => lane.innerHTML = ''); // Clear lanes

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        const lane = lanes[task.status];
        if (lane) {
            lane.appendChild(taskCard);
            $(taskCard).draggable({
                revert: "invalid",
                cursor: "move",
                start: function(event, ui) {
                    ui.helper.data('id', task.id); // Store ID in helper data
                }
            });
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault(); // Prevent the default form submission behavior

    const taskForm = document.getElementById("taskForm");
    const taskName = taskForm.elements["taskName"].value;
    const taskDescription = taskForm.elements["taskDescription"].value;
    const dueDate = taskForm.elements["dueDate"].value;
  
    const newTask = {
      id: generateTaskId(),
      name: taskName,
      description: taskDescription,
      dueDate: dueDate,
      status: 'to-do' // Default status
    };
  
    taskList.push(newTask); // Add the new task to the task list
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update tasks in localStorage
  
    renderTaskList(); // Re-render the task list with the new task
    $('#formModal').modal('hide'); // Close the modal after adding the task
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = event.target.id; // Get the ID of the task to delete
    taskList = taskList.filter(task => task.id !== taskId); // Remove the task with the matching ID
  
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update tasks in localStorage
  
    renderTaskList(); // Re-render the task list without the deleted task
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    event.preventDefault();
    event.stopPropagation(); // Prevent default and stop propagation

    const taskId = ui.helper.data('id'); // Get the ID of the dragged task
    const newStatus = $(event.target).data('status'); // Get the new status from the drop target
  
    // Update the status of the dropped task in the task list
    taskList.forEach(task => {
        if (task.id === taskId) {
            task.status = newStatus; // Update the status of the task
        }
    });
  
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update tasks in localStorage
  
    renderTaskList(); // Re-render the task list with the updated task status
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList(); // Render the task list when the page loads

    // Add event listener for form submission to handle adding a new task
    $("#taskForm").on("submit", handleAddTask);

    // Add event listener for delete buttons to handle task deletion
    $("#taskBoard").on("click", ".delete-btn", handleDeleteTask);

    $(".task-card").draggable({
        revert: "invalid",
        cursor: "move",
        helper: "clone", // Optional: creates a copy of the element during dragging
        start: function(event, ui) {
            ui.helper.data('id', $(this).attr('id')); // Store ID in helper data
        }
    });

    // Initialize droppable areas
    $(".status-lane").droppable({
        accept: ".task-card",
        drop: handleDrop,
        hoverClass: "ui-state-hover" // Optional: to highlight the droppable area on hover
    });

    // Initialize the date picker for the due date field
    $("#dueDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd"
    });
});
