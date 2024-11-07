const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');


todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const taskText = todoInput.value.trim();
  
  if (taskText !== '') {
    const li = document.createElement('li');
    
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function () {
      li.remove();
    });

    
    taskSpan.addEventListener('click', function () {
      taskSpan.classList.toggle('completed');
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
    
    
    todoInput.value = '';
  }
});
