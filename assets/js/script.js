
// Retrieve tasks and nextId from localStorage

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskDescription = document.getElementById('task').value;

    // Create task object
    const task = {
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription
    };

    // Get tasks from local storage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Making sure tasks is an array
    if (!Array.isArray(tasks)) {
        tasks = [];
    }

    // Add new task to array
    tasks.push(task);

    // Save updated tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Close modal    I don't really understand this part
    var modalElement = document.getElementById('formModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Reset form
    document.getElementById('taskForm').reset();
});



// Todo: create a function to generate a unique task id

function generateTaskId() {
    // if its empty make nextId 1 or nextId = nextId + 1;
    if (nextId === null || nextId === undefined) {
        nextId = 1;
    }
    else {
        nextId = nextId + 1;
    }
    // storing nextId to localStorage
    localStorage.setItem("nextId", JSON.stringify(nextId));
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    const divContainer = $('<div/>');
    const titleElm = $('<p>');
    titleElm.append(task.title);
    divContainer.append(titleElm);
    return divContainer;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const data = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < data.length; i++){
        $('#todo-cards').append(createTaskCard(data[i]));
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask() {
    const title = $('#taskTitle').val();
  $('#todo-cards').append(createTaskCard({ title }));


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
});


$('#taskBtn').on('click', handleAddTask)