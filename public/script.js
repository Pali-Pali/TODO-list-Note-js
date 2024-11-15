
document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});


function selectDay(element) {
  const days = document.querySelectorAll('.days-of-week div');
  days.forEach(day => day.classList.remove('selected', 'active-click'));
  
  element.classList.add('selected');
  element.classList.add('active-click');
  
  setTimeout(() => {
    element.classList.remove('active-click');
  }, 150); 
}
function openBook() {
  const bookCover = document.getElementById('book-cover');
  const book = document.getElementById('book');

  // Add the 'open' class to animate the cover and reveal the book
  bookCover.classList.add('open');
  book.classList.add('open');
}

function addTask() {
  const todoInput = document.getElementById("todo-input");
  const taskText = todoInput.value.trim();

  if (taskText) {
    const todoList = document.getElementById("todo-list");
    const listItem = document.createElement("li");

    const toggleButton = document.createElement("button");
    toggleButton.innerText = "✔";
    toggleButton.classList.add("toggle-complete");
    toggleButton.onclick = () => toggleComplete(listItem);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.onclick = () => removeTask(listItem);

    listItem.innerText = taskText;
    listItem.appendChild(toggleButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    saveTaskToLocalStorage(taskText, false); 
    todoInput.value = "";
  }
}


function removeTask(listItem) {
  const taskText = listItem.childNodes[0].nodeValue;
  listItem.remove();
  removeTaskFromLocalStorage(taskText);
}

function toggleComplete(listItem) {
  listItem.classList.toggle("completed");
  const taskText = listItem.childNodes[0].nodeValue;
  const isCompleted = listItem.classList.contains('completed');
  updateTaskStatusInLocalStorage(taskText, isCompleted); 
}


function saveTaskToLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}


function updateTaskStatusInLocalStorage(taskText, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => {
    if (task.text === taskText) {
      return { text: task.text, completed: isCompleted };
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const todoList = document.getElementById("todo-list");

  tasks.forEach(task => {
    const listItem = document.createElement("li");
    listItem.innerText = task.text;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const toggleButton = document.createElement("button");
    toggleButton.innerText = "✔";
    toggleButton.classList.add("toggle-complete");
    toggleButton.onclick = () => toggleComplete(listItem);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.onclick = () => removeTask(listItem);

    listItem.appendChild(toggleButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}



const reminderInput = document.getElementById('reminder');
const setReminderBtn = document.getElementById('set-reminder-btn');
const reminderDisplay = document.getElementById('reminder-display');

// Function to add a reminder
function addReminder() {
  const reminderText = reminderInput.value.trim();

  // Check if the input is not empty
  if (reminderText !== '') {
    // Create a new div to hold the reminder
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item';
    
    // Create the reminder text element
    const reminderTextElement = document.createElement('span');
    reminderTextElement.textContent = reminderText;

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    // Add event listener to delete the reminder
    deleteBtn.addEventListener('click', () => {
      reminderDisplay.removeChild(reminderItem);
    });

    // Append the text and delete button to the reminder item
    reminderItem.appendChild(reminderTextElement);
    reminderItem.appendChild(deleteBtn);
    
    // Append the reminder item to the display section
    reminderDisplay.appendChild(reminderItem);

    // Clear the input field
    reminderInput.value = '';
  }
}

// Add event listener to the "Set Reminder" button
setReminderBtn.addEventListener('click', addReminder);
