
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


document.getElementById('set-reminder-btn').addEventListener('click', function() {
  const reminderText = document.getElementById('reminder').value;

  if (reminderText.trim() !== '') {
    document.getElementById('reminder-display').textContent = `Reminder: ${reminderText}`;
    document.getElementById('reminder-display').style.display = 'block'; 
    document.getElementById('reminder').value = '';
    
    
    localStorage.setItem('reminder', reminderText);
  } else {
    alert('Please add a reminder!');
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const savedReminder = localStorage.getItem('reminder');
  if (savedReminder) {
    document.getElementById('reminder-display').textContent = `Reminder: ${savedReminder}`;
    document.getElementById('reminder-display').style.display = 'block';
  }
});
