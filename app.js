document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const task = {
    title,
    description,
  };

  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  e.preventDefault();
  getTask();
  document.getElementById("formTask").reset();
}

function getTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");

  tasksView.innerHTML = "";

  tasks.forEach((task) => {
    tasksView.innerHTML += `<div class="card">
    <div class="tasks-body">
      <p>${task.title} - ${task.description}</p>
      <button class="btn-delete" onclick="deleteTask('${task.title}')">Delete</button>
    </div>
  </div>`;
  });
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTask();
}
getTask();
