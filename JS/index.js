const taskManager = new TaskManager(0);

// calls load method to see the previously created task loaded and rendered to the page! 
taskManager.load();
taskManager.save();
taskManager.render();



//to see the Task's element logged I need to put the task hard coded here like id = 1, name = going shopping... I don't know why
//  const taskHTML = createTaskHtml();
//  console.log(taskHTML);

const newTaskForm = document.querySelector("#newTaskForm");

newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#description");
  const newTaskAssignedTo = document.querySelector("#assignment");
  const newTaskDueDate = document.querySelector("#due-date");

  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const assignedTo = newTaskAssignedTo.value;
  const dueDate = newTaskDueDate.value;


  taskManager.addTask(name, description, assignedTo, dueDate);
  console.log(taskManager.getTaskById(0));
  // Render the tasks
  taskManager.save();
  taskManager.render();

  newTaskNameInput.value = "";
  newTaskDescription.value = "";
  newTaskAssignedTo.value = "";
  newTaskDueDate.value = "";

  //validation code

  if (
    name === "" ||
    description === "" ||
    assignedTo === "" ||
    dueDate === ""
  ) {
    alert("Fields can not be left blank!");
    return;
  }

  const theTaskList = document.querySelector("#tasksList");

  theTaskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("done-button")) {
      const parentTask = event.target.closest("li");
      console.log(parentTask);
      // turns task id of parent task and turns it into number
      const taskId = Number(parentTask.dataset.taskId);
      // gets the task from the task manager using the task id
      const task = taskManager.getTaskById(taskId);
      // updates task status to done
      task.status = "Done";
      
      // calls save method to save tasks to local storage
      taskManager.save();
      taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
  });

  
});   








// function validFormFieldInput() {
//   event.preventDefault();

//   const theTaskManager = new TaskManager();

//   const form = document.getElementById("Task");
//   const newTaskNameInput = document.querySelector("#newTaskNameInput");
//   const name = newTaskNameInput.value;
//   console.log("Name:", name);

//   const taskDescription = document.querySelector("#description");
//   const description = taskDescription.value;
//   console.log("Description:", description);

//   const assignedTo = document.querySelector("#assignment");
//   const assignment = assignedTo.value;
//   console.log("Assigned To:", assignment);

//   const dueDate = document.querySelector("#due-date");
//   const date = dueDate.value;
//   console.log("Due Date:", date);

//   form.addEventListener('submit', (event) => {

//   })

//   document
//     .getElementById("submitButton")
//     .addEventListener("click", function (event) {
//       event.preventDefault(); // Prevent the form from being submitted

//       // let taskName = document.getElementById("newTaskNameInput").value;
//       // let descriptionText = document.getElementById("description").value;
//       // let assignedTo = document.getElementById("assignment").value;
//       // let theDate = document.getElementById("due-date").value;

//       if (validFormFieldInput()) {
//         event.preventDefault();
//         theTaskManager.addTask(name, description, assignedTo, theDate);

//         name = "";
//         description = "";
//         assignedTo = "";
//         theDate = "";
//       }

//       if (
//         name === "" ||
//         description === "" ||
//         assignedTo === "" ||
//         theDate === ""
//       ) {
//         alert("Important fields can not be left blank!");
//         return;
//       }

//     });
//   console.log(theTaskManager);

// };

// // theTaskManager.addTask(
// //   "Take out the trash",
// //   "Take out the trash to the front of the house",
// //   "John Doe",
// //   "2023-06-01"
// // );

// // theTaskManager.addTask(
// //   "Cook Dinner",
// //   "Prepare a healthy serving of pancakes for the family tonight",
// //   "Nick",
// //   "2020-09-20"
// // );
