let taskId = 1;
let editTaskId = null;
let removeTaskId = null;

function openModal() {
    document.getElementById('task-modal').style.display = 'block';
    document.getElementById('task-name').focus();
}

function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
}

function submitTask() {
    const taskName = document.getElementById('task-name').value.trim();

    if (taskName === '') {
        alert('Task cannot be empty!');
        return;
    }

    const taskList = document.getElementById('task-list');
    document.getElementById('no-tasks-message').style.display = 'none';

    const row = document.createElement('tr');
    row.setAttribute('data-id', taskId);

    row.innerHTML = `
        <td>${taskId}</td>
        <td class="task-name">${taskName}</td>
        <td><button class="Todo" onclick="changeStatus(this)">Todo</button></td>
        <td><button class="Edit" onclick="openEditModal(${taskId})"><ion-icon name="pencil-outline"></ion-icon></button></td>
        <td><button class="remove" onclick="openRemoveModal(${taskId})"><ion-icon name="trash-bin-outline"></ion-icon></button></td>
    `;

    taskList.appendChild(row);

    document.getElementById('task-name').value = '';
    closeModal();
    taskId++;
}

function openRemoveModal(id) {
    removeTaskId = id;
    document.getElementById('remove-modal').style.display = 'block';
}

function closeRemoveModal() {
    document.getElementById('remove-modal').style.display = 'none';
}

document.getElementById('confirm-remove-button').onclick = function() {
    const taskList = document.getElementById('task-list');
    const taskRow = document.querySelector(`tr[data-id="${removeTaskId}"]`);
    
    taskList.removeChild(taskRow);

    if (taskList.children.length === 1) {
        document.getElementById('no-tasks-message').style.display = '';
    }
    closeRemoveModal();
};

function changeStatus(button) {
    const status = button.innerText;
    if (status === 'Todo') {
        button.innerText = 'In Progress';
        button.className = 'Progress';
    } else if (status === 'In Progress') {
        button.innerText = 'Complete';
        button.className = 'Complete';
    } else {
        button.innerText = 'Todo';
        button.className = 'Todo';
    }
}

function openEditModal(id) {
    editTaskId = id;
    const taskRow = document.querySelector(`tr[data-id="${id}"]`);
    const taskName = taskRow.querySelector('.task-name').innerText;

    document.getElementById('edit-task-name').value = taskName;
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('edit-task-name').focus();
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function submitEditTask() {
    const newTaskName = document.getElementById('edit-task-name').value.trim();

    if (newTaskName === '') {
        alert('Task cannot be empty!');
        return;
    }

    const taskRow = document.querySelector(`tr[data-id="${editTaskId}"]`);
    taskRow.querySelector('.task-name').innerText = newTaskName;

    closeEditModal();
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        submitTask();
    }
}

function handleEditKeyDown(event) {
    if (event.key === 'Enter') {
        submitEditTask();
    }
}
