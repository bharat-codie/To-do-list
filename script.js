    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load tasks from local storage on page load
    window.onload = () => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(task => addTodoItem(task.text, task.completed));
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTodoItem(input.value);
      input.value = '';
    });

    function addTodoItem(taskText, isCompleted = false) {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = taskText;
      if (isCompleted) {
        li.classList.add('completed');
      }

      span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';

      deleteBtn.addEventListener('click', () => {
        list.removeChild(li);
        saveTasks();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
      saveTasks();
    }

    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
          text: item.querySelector('.todo-text').textContent,
          completed: item.classList.contains('completed'),
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
