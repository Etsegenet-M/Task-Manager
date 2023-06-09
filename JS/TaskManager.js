// Create the HTML for a task
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `
  <li class="list-group-item" data-task-id = ${id}>
      <div class="d-flex w-100 justify-content-between align-items-center">
        <h5 class="card-title">${name}</h5>
        <span class="badge ${
          status === "TODO" ? "badge-danger" : "badge-success"
        }">${status}</span>
      </div>
        <h6 class="card-subtitle mb-2 text-muted">${description}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Assigned To:${assignedTo}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Due: ${dueDate}</h6>
        <div class="d-flex w-100 justify-content-end">
                <button class="btn btn-outline-success ${
                  status === "TODO" ? "" : "d-none"
                } done-button">Mark As Done</button>
            <button class="btn btn-outline-danger delete-button"> Delete</button>
        </div>
  </li>`;

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }
  addTask(name, description, assignedTo, dueDate) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: "TODO",
    };

    this.tasks.push(task);
  }

  getTaskById = (taskId) => {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  };
  save() {
    // converts tasks to json string of tasks
    const tasksJson = JSON.stringify(this.tasks);
    // store json string in local storage under the key tasks
    localStorage.setItem("tasks", tasksJson);
    // converts current id to string
    const currentId = String(this.currentId);
    // stores current id in local storage
    localStorage.setItem("currentId", currentId);
    //we'll call taskManager.save() in index.js  to save tasks in local storage
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this.tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }
  // Create the deleteTask method
  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }

  // Create the render method
  render() {
    // Create an array to store the tasks' HTML
    const tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#tasksList");
    tasksList.innerHTML = tasksHtml;

    //To see the HTML elements of the tasks
    // console.log(tasksHtml);
  }
}

