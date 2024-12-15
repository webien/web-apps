const addNewTaskBtn = document.querySelector('.add-task-btn');
const inputBox = document.querySelector('.task-input');
const taskList = document.querySelector('#task-list');
const dateText = document.querySelector('#date-text');

let taskArr = JSON.parse(localStorage.getItem('tasks')) || [];

function renderUi(arr) {
    taskList.innerHTML = '';
    arr.forEach((el, index) => {

        const li = document.createElement('li');
        li.dataset.taskId = index;
        taskList.prepend(li);

        const div = document.createElement('div');
        div.setAttribute('class', 'list-wrapper');
        li.append(div);

        const checkboxBtn = document.createElement('button');
        div.append(checkboxBtn);

        const checkboxIcon = document.createElement('img');
        checkboxIcon.setAttribute('class', 'checkbox-icon');
        checkboxIcon.setAttribute('src', el.isTaskCompleted ? 'assets/check-circle.svg' : 'assets/circle.svg');
        checkboxIcon.setAttribute('alt', el.isTaskCompleted ? 'checked circle icon' : 'unchecked circle icon');
        checkboxBtn.append(checkboxIcon);

        const span = document.createElement('span');
        span.textContent = el.taskName;
        span.style.color = el.isTaskCompleted ? '#909090' : '#D3D3D3';
        div.append(span);

        const deleteBtn = document.createElement('button');
        li.append(deleteBtn);

        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('class', 'del-task-icon');
        deleteIcon.setAttribute('src', 'assets/x.svg');
        deleteIcon.setAttribute('alt', 'delete icon');
        deleteBtn.append(deleteIcon);
    })

}

function modifyLocalStorage(updatedTaskArr) {
    localStorage.setItem('tasks', JSON.stringify(updatedTaskArr));
    taskArr = JSON.parse(localStorage.getItem('tasks'));
    renderUi(taskArr);
}

function checkUncheck(e) {
    const updatedTaskArr = taskArr.map((obj, index) => {
        if (index === Number(e.target.parentElement.parentElement.parentElement.dataset.taskId)) {
            if (obj.isTaskCompleted) {
                obj.isTaskCompleted = false;
            } else {
                obj.isTaskCompleted = true;
                return obj;
            }
        }
        return obj;
    })
    modifyLocalStorage(updatedTaskArr);
}


function deleteTask(e) {
    const updatedTaskArr = taskArr.filter((obj, index) => index !== Number(e.target.parentElement.parentElement.dataset.taskId));
    modifyLocalStorage(updatedTaskArr);
}

function addNewTask(taskName) {
    taskArr.push({
        taskName: taskName,
        isTaskCompleted: false
    })
    modifyLocalStorage(taskArr);
}


function handleAddTaskEvent(e) {
    const taskName = inputBox.value.trim();
    if ((e.type === 'click' || e.key === 'Enter') && taskName !== '') {
        addNewTask(taskName);
        inputBox.value = '';
    }
}

(function getCurrentDate() {
    const currentDate = new Date().toDateString();
    const formattedDate = currentDate.split(' ').slice(1, currentDate.length).join(' ');
    dateText.textContent = formattedDate;
})()

renderUi(taskArr);
addNewTaskBtn.addEventListener('click', handleAddTaskEvent)
inputBox.addEventListener('keydown', handleAddTaskEvent)
taskList.addEventListener('click', (e) => {
    if (e.target.matches('.checkbox-icon')) {
        checkUncheck(e);
    } else if (e.target.matches('.del-task-icon')) {
        deleteTask(e);
    }
})

