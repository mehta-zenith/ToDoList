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


}