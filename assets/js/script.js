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
    const modalElement = document.getElementById('formModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Reset form
    document.getElementById('taskForm').reset();
});

// Todo: create a function to generate a unique task id


let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

function generateTaskId() {
    // if its empty make nextId 1 or nextId = nextId + 1;
    return nextId++;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    // task.preventDefault()
    const id = generateTaskId();
    // making container for all of the info, giving it an unique taskid
    const divContainer = $('<div>').attr('id', `task-${id}`);
    // adding title into h4
    const titleElm = $('<h4>').text(task.title);
    divContainer.append(titleElm);
    // adding date into p and formatting
    const formattedDueDate = dayjs(task.dueDate).format('MMM D, YYYY');
    const dateElm = $('<p>').text(`Due on: ${formattedDueDate}`);
    divContainer.append(dateElm);
    // adding task desctiption into p 
    const descElm = $('<p>').text(task.description);
    divContainer.append(descElm);
    // creating a delete button with class of delete-btn
    const deleteElm = $('<button>').addClass('btn btn-secondary delete-btn').text('Delete');
    divContainer.append(deleteElm);
    // adding class of draggable
    divContainer.addClass('p-2 draggable m-2').css({
        'border': 'grey 5px solid',
        'border-radius': '15px',
        'background-color':  getCardColor(task.dueDate)
    });

    return divContainer;
}

function getCardColor(event) {
    const now = dayjs();
    console.log(now)
    const due = dayjs(event);
console.log(due)
    if (due.isBefore(now, 'day')) {
        return 'red'; // Past due
    } else if (due.isSame(now.add(1, 'day'), 'day')) {
        return 'yellow'; // Due tomorrow
    } else {
        return 'white'; // Default color
    }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const data = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < data.length; i++) {
        $('#todo-cards').append(createTaskCard(data[i]));
    }
    // draggable with class of .draggable targeting takscard <div>
    $('.draggable').draggable({
        opacity: 0.5,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (event) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(event.target).hasClass('ui-draggable')
                ? $(event.target)
                : $(event.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });

    $('.delete-btn').on('click', handleDeleteTask);
}


// Todo: create a function to handle adding a new task
// recieving info from click and adding it to #todo-cards
function handleAddTask() {
    const title = $('#taskTitle').val();
    $('#todo-cards').append(createTaskCard({ title }));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const parentDiv = $(event.target).closest('div');
    parentDiv.remove();

    // removes tasks in local storage after deletion
    const taskId = parentDiv.attr('id').split('-')[1];
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(taskId, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $('card').droppable({
        accept: '.draggable',
        drop: function (event, ui) {
            const droppedCard = $(ui.draggable);
            droppedCard.detach().css({ top: 0, left: 0 }).appendTo($(this));
        }
    });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
});


$('#taskBtn').on('click', handleAddTask);
handleDrop();




