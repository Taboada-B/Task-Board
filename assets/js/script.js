// Retrieve tasks and nextId from localStorage
let taskTitle = JSON.parse(localStorage.getItem("#taskTitle"));
let taskList = JSON.parse(localStorage.getItem("#tasks"));
let taskCalendar = JSON.parse(localStorage.getItem("#calendar"));

let nextId = JSON.parse(localStorage.getItem("#nextId"));


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

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    dayjs.extend(window.dayjs_plugin_advancedFormat);

});











// Retrieve tasks and nextId from localStorage

// inputs from modal form





// function saveNextIdToStorage(nextId) {
//     localStorage.setItem('nextId', JSON.stringify(nextId));
// }


// // Todo: create a function to create a task card
// function createTaskCard(task) {
//     const now = dayjs();
//     const due = dayjs(dueDate);
//     const cardClass = '';

// }

// // Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {

// }

// // Todo: create a function to handle adding a new task
// function handleAddTask(event) {

// }

// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event) {

// }

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }




// // // ? Use JQuery UI to make task cards draggable
// // $('.draggable').draggable({
// //     opacity: 0.7,
// //     zIndex: 100,
// //     // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
// //     helper: function (e) {
// //       // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
// //       const original = $(e.target).hasClass('ui-draggable')
// //         ? $(e.target)
// //         : $(e.target).closest('.ui-draggable');
// //       // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
// //       return original.clone().css({
// //         width: original.outerWidth(),
// //       });
// //     },
// //   });


// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

// });




// $(document).ready(function () {
//     dayjs.extend(window.dayjs_plugin_advancedFormat);

//     // event listener modal submission 
//     $('form').submit(function (event) {
//         event.preventDefault(); // Prevent default form submission

//         // Capture input values
//         const taskTitle = $('#taskTitle').val();
//         const taskDescription = $('#taskList').val();
//         const taskDueDate = $('#taskDate').val();

//         // Create an object to store the task details
//         const task = {
//             title: taskTitle,
//             description: taskDescription,
//             dueDate: taskDueDate
//         };

//         // Retrieve existing tasks from localStorage or initialize an empty array
//         const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//         // Add the new task to the tasks array
//         tasks.push(task);

//         // Store the updated tasks array back in localStorage
//         localStorage.setItem('tasks', JSON.stringify(tasks));

//         // Clear the form fields
//         $('#taskTitle').val('');
//         $('#taskList').val('');
//         $('#taskDate').val('');

//         // Close the modal
//         $('#formModal').modal('hide');
//     });
// });


