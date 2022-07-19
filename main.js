const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const filterTaskInput = document.querySelector('#filterTasksInput');
const clearAllTaskBtn = document.querySelector('#clearAllTasksBtn');
const confirmModal = document.querySelector('#confirmModal');
const taskList = document.querySelector('#taskList');

let tasks = [];

loadEvents();

function loadEvents() {
    document.addEventListener('DOMContentLoaded', initializeModals);
    document.addEventListener('DOMContentLoaded', loadTasksFromStroage);
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearAllTaskBtn.addEventListener('click', clearTasks);
    filterTaskInput.addEventListener('keyup', filterTasks);
}

function initializeModals(evt) {
    const options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
}

function loadTasksFromStroage(evt) {
    const loadTasksFromStroage = JSON.parse(localStorage.getItem('tasks'));
    if (tasksFromStorage !== null) {
        tasksFromStorage.forEach(function(task) {
            createTaskElement(task);
        });
    }
    tasks = tasksFromStorage;
}

function addTask(evt) {
    evt.preventDefault();
    const task = taskInput.value;
    if (task === '') {
        const instance = M.Modal.getInstance(confirmModal);
        instance.open();
    } else {
        createTaskElement(task);
        taskInput.value = '';
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(evt) {
    evt.preventDefault();
    let taskName = '';
    const elem = evt.target;
    if (elem.classList.contains('delete-item')) {
        taskName = elem.parentElement.textContent;
        elem.parentElement.remove();
    } else if (elem.parentElement.classList.contains('delete-item')) {
        taskName = elem.parentElement.parentElement.textContent;
        elem.parentElement.parentElement.remove();
    }
    if (taskName !== '') {
        const indexOfDelete = taskName.lastIndexOf('delete');
        taskName = taskName.substring(0, indexOfDelete);

        tasks = tasks.filter(function(task) { return task !== taskName; });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function clearAllTasks(evt) {
    evt.preventDefault();
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // slower approach to remove all the child from the browsers memory!
    // taskList.innerHTML = ''; here you are just making it empty space so there will be memeory

    // faster approach to remove all the child from the browsers memory!
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(evt) {
    const filterText = filterTaskInput.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(taskElem) {
        const taskElemText = taskElem.firstChild.textContent.toLowerCase();
        if (taskElemText.indexOf(filterText) == -1) {
            taskElem.style.display = 'none';
        } else {
            taskElem.style.display = 'block';
        }
    })
}