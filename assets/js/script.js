// Retrieve tasks and nextId from localStorage

document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values from the form
    const taskTitle = document.getElementById('taskTitle').value;
    let taskDueDate = document.getElementById('taskDueDate').value;
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

function generateTaskId() {
    // if its empty make nextId 1 or nextId = nextId + 1;
    if (nextId === null || nextId === undefined) {
        nextId = 1;
    }
    else {
        nextId = nextId + 1;
    }
    // storing nextId to localStorage
    return localStorage.setItem("nextId", JSON.stringify(nextId));
}


// Todo: create a function to create a task card
function createTaskCard(task) {
    // container for info
    const divContainer = $('<div/>')
    // .attr('data-project-id', project.id);
    //inserting title to card
    const titleElm = $('<h4>')
    titleElm.append(task.title);
    divContainer.append(titleElm);
    // inserting date to card
    const dateElm = $('<p>');
    const formattedDueDate = dayjs(task.dueDate).format('MMM D, YYYY');
    dateElm.append(`Due on: ${formattedDueDate}`);
    divContainer.append(dateElm);
    // inserting description to card
    const descElm = $('<p>');
    descElm.append(task.description);
    divContainer.append(descElm);
    //    adding styling and class to card
    divContainer.addClass('p-2 draggable m-2');
    divContainer.css('border', 'grey 5px  solid ');
    divContainer.css('border-radius', '15px');
    // currently working on!
    // styling according to due date logic
    if (due.isBefore(now, 'day')) {
        cardClass = 'past-due';
    } else if (due.isSame(now.add(1, 'day'), 'day')) {
        cardClass = 'due-tomorrow';
    }

    // will have to change according to date
    divContainer.css('background-color', 'white');

    return divContainer;


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





