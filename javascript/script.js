let taskId = 1;

function openModal() {
    document.getElementById('task-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
}

function submitTask() {
    const taskName = document.getElementById('task-name').value.trim();

    if (taskName === '') {
        alert('Veuiller ecrire une tache');
        return;
    }

    const taskList = document.getElementById('task-list');

    const row = document.createElement('tr');
    row.setAttribute('data-id', taskId);

    row.innerHTML = `
        <td>${taskId}</td>
        <td>${taskName}</td>
        <td><button class="Todo" onclick="changeStatus(this)">Todo</button></td>
        <td><button class="Edit" onclick="editTask(${taskId})"><ion-icon name="pencil-outline"></ion-icon></button></td>
        <td><button class="remove" onclick="removeTask(${taskId})"><ion-icon name="trash-bin-outline"></ion-icon></button></td>
    `;

    taskList.appendChild(row);

    document.getElementById('task-name').value = '';
    closeModal();
    taskId++;
}

function changeStatus(button) {
    if (button.innerText === 'Todo') {
        button.innerText = 'In Progress';
        button.className = 'Progress';
    } else if (button.innerText === 'In Progress') {
        button.innerText = 'Complete';
        button.className = 'Complete';
    } else {
        button.innerText = 'Todo';
        button.className = 'Todo';
    }
}

function editTask(id) {
    const taskName = prompt('Edit your task:');
    if (taskName) {
        const row = document.querySelector(`tr[data-id='${id}']`);
        row.children[1].innerText = taskName;
    }
}

function removeTask(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    row.remove();
}
