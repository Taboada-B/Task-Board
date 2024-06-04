
// handling information in 
document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskDescription = document.getElementById('task').value;

    // Create task object
    const task = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription
    };

    // Get tasks from local storage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add new task to array
    tasks.push(task);

    // Save updated tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Close modal
    const modalElement = document.getElementById('formModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Reset form
    document.getElementById('taskForm').reset();

    // Add the new task to the DOM
    $('#todo-cards').append(createTaskCard(task));

    draggableAndDelete(`#task-${task.id}`);

});

let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

function generateTaskId() {
    localStorage.setItem("nextId", JSON.stringify(nextId + 1));
    return nextId++;
}

function createTaskCard(task) {
    // creating container for task info
    const divContainer = $('<div>').attr('id', `task-${task.id}`);
    // adding title info
    const titleElm = $('<h4>').text(task.title);
    divContainer.append(titleElm);
    // adding date info
    const formattedDueDate = dayjs(task.dueDate).format('MMM D, YYYY');
    const dateElm = $('<p>').text(`Due on: ${formattedDueDate}`);
    divContainer.append(dateElm);
    //adding description
    const descElm = $('<p>').text(task.description);
    divContainer.append(descElm);
    //adding button to delete
    const deleteElm = $('<button>').addClass('btn btn-secondary delete-btn').text('Delete');
    divContainer.append(deleteElm);
    // giving container class draggable and calling getCardColor for background color
    divContainer.addClass('p-2 draggable m-2').css({
        'border': 'grey 5px solid',
        'border-radius': '15px',
        'background-color': getCardColor(task.dueDate)
    });

    return divContainer;
}
// outputting a color to update createTaskCard background color
function getCardColor(event) {
    // establishing today and input's date
    const now = dayjs();
    const due = dayjs(event);
    // logic for background color
    // Past due
    if (due.isBefore(now, 'day')) {
        return 'red';
        // Due today
    } else if (due.isSame(now, 'day')) {
        return 'yellow';
        // Default color
    } else {
        return 'white';
    }
}

// displaying the data to the page
function renderTaskList() {
    // establishing data from local storage
    const data = JSON.parse(localStorage.getItem('tasks')) || [];

    for (let i = 0; i < data.length; i++) {
        //creating task card for each index of data.  data includes id, title, date, description
        const taskCard = createTaskCard(data[i]);
        // adding task card to the todo section
        $('#todo-cards').append(taskCard);
        // calling function to make draggable and delete according to id= task-# according to the index
        draggableAndDelete(`#task-${data[i].id}`);
    }
}

//deleting tasks
function handleDeleteTask(event) {
    // selecting parent div 
    const parentDiv = $(event.target).closest('div');
    // splitting bc id comes as task-#, and selecting index 1
    const taskId = parentDiv.attr('id').split('-')[1];
    // removing from Dom
    parentDiv.remove();

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // removing task with matching taskID
    tasks = tasks.filter(function (task) {
        return task.id != taskId;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function draggableAndDelete(selector) {
    // takes 'task-#
    $(selector).draggable({
        // visually and make sure it's on top
        opacity: 0.5,
        zIndex: 100,
        // picking an element to be dragged
        helper: function (event) {
            // initializing original
            let original;
            // helps find draggable container
            if ($(event.target).hasClass('ui-draggable')) {
                original = $(event.target);
            } else {
                original = $(event.target).closest('.ui-draggable');
            }

            return original.clone().css({
                width: original.outerWidth(),
            });
        },

    });
    $(selector).find('.delete-btn').on('click',handleDeleteTask);
}

$(document).ready(function () {
    // when the document is ready, render the tasks, make lanes droppable
    renderTaskList();
    // making todo, in progress, and done droppable with class call
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});

//dropping the divContainer
function handleDrop(event, ui) {
    const droppedCard = $(ui.draggable);
    droppedCard.detach().css({ top: 0, left: 0 }).appendTo($(this));
}
