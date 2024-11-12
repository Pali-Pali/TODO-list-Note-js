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

      todoInput.value = "";
  }
}

function removeTask(listItem) {
  listItem.remove();
}

function toggleComplete(listItem) {
  listItem.classList.toggle("completed");
}
document.getElementById('set-reminder-btn').addEventListener('click', function() {
  
  const reminderText = document.getElementById('reminder').value;

  
  if (reminderText.trim() !== '') {
    document.getElementById('reminder-display').textContent = `Reminder: ${reminderText}`;
    document.getElementById('reminder-display').style.display = 'block'; 

   
    document.getElementById('reminder').value = '';
  } else {
    alert('Please add a reminder!');
  }
});
