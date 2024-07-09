let taskId = 1;
let editTaskId = null;
let removeTaskId = null;

function openModal() {
  document.getElementById("task-modal").style.display = "block";
  document.getElementById("task-name").focus();
}

function closeModal() {
  document.getElementById("task-modal").style.display = "none";
}

function submitTask() {
  const taskName = document.getElementById("task-name").value.trim();
  const taskDate = document.getElementById("task-date").value;

  let errorMessage = "";

  if (taskName === "") {
    errorMessage += "Veuillez ajouter le nom de la tâche.";
  }

  if (taskDate === "") {
    if (errorMessage !== "") {
      errorMessage += " ";
    }
    errorMessage += "Veuillez ajouter une date.";
  }

  if (errorMessage !== "") {
    alert(errorMessage);
    return;
  }

  const taskList = document.getElementById("task-list");
  document.getElementById("no-tasks-message").style.display = "none";

  const row = document.createElement("tr");
  row.setAttribute("data-id", taskId);

  row.innerHTML = `
        <td>${taskId}</td>
        <td class="task-name">${taskName}</td>
        <td><button class="Todo" onclick="changeStatus(this)">Todo</button></td>
        <td>${taskDate}</td>
        <td>
            <button class="Edit" onclick="openEditModal(${taskId})"><ion-icon name="pencil-outline"></ion-icon></button>
            <button class="remove" onclick="openRemoveModal(${taskId})"><ion-icon name="trash-bin-outline"></ion-icon></button>
        </td>
    `;

  taskList.appendChild(row);

  document.getElementById("task-name").value = "";
  document.getElementById("task-date").value = "";
  closeModal();
  taskId++;
}

function openRemoveModal(id) {
  removeTaskId = id;
  document.getElementById("remove-modal").style.display = "block";
}

function closeRemoveModal() {
  document.getElementById("remove-modal").style.display = "none";
}

function confirmRemove() {
  const taskList = document.getElementById("task-list");
  const taskRow = document.querySelector(`tr[data-id="${removeTaskId}"]`);

  taskList.removeChild(taskRow);

  if (taskList.children.length === 1) {
    document.getElementById("no-tasks-message").style.display = "";
  }
  closeRemoveModal();
}

function changeStatus(button) {
  const status = button.innerText;
  if (status === "Todo") {
    button.innerText = "In Progress";
    button.className = "Progress";
  } else if (status === "In Progress") {
    button.innerText = "Complete";
    button.className = "Complete";
  } else {
    button.innerText = "Todo";
    button.className = "Todo";
  }
}

function openEditModal(id) {
  editTaskId = id;
  const taskRow = document.querySelector(`tr[data-id="${id}"]`);
  const taskName = taskRow.querySelector(".task-name").innerText;
  const taskDate = taskRow.querySelectorAll("td")[3].innerText;

  document.getElementById("edit-task-name").value = taskName;
  document.getElementById("edit-task-date").value = taskDate;
  document.getElementById("edit-modal").style.display = "block";
  document.getElementById("edit-task-name").focus();
}

function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

function submitEditTask() {
  const newTaskName = document.getElementById("edit-task-name").value.trim();
  const newTaskDate = document.getElementById("edit-task-date").value.trim();

  let errorMessage = "";

  if (newTaskName === "") {
    errorMessage += "Veuillez ajouter le nom de la tâche.";
  }

  if (newTaskDate === "") {
    if (errorMessage !== "") {
      errorMessage += " ";
    }
    errorMessage += "Veuillez ajouter une date.";
  }

  if (errorMessage !== "") {
    alert(errorMessage);
    return;
  }

  const taskRow = document.querySelector(`tr[data-id="${editTaskId}"]`);
  taskRow.querySelector(".task-name").innerText = newTaskName;
  taskRow.querySelectorAll("td")[3].innerText = newTaskDate;

  closeEditModal();
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    submitTask();
  }
}

function handleEditKeyDown(event) {
  if (event.key === "Enter") {
    submitEditTask();
  }
}
