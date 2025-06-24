const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const filterCategory = document.getElementById('filter-category');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('toggle-theme');

let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];

function saveTasks() {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  const search = searchInput.value.toLowerCase();
  const filter = filterCategory.value;

  let completed = 0;

  tasks.forEach((task, index) => {
    if (
      (filter !== "All" && task.category !== filter) ||
      !task.desc.toLowerCase().includes(search)
    ) return;

    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    if (new Date(task.time) < new Date() && !task.completed) li.classList.add('overdue');

    li.setAttribute('data-category', task.category);
    li.innerHTML = `
      <div class="task-info">
        <strong>${task.desc}</strong>
        <div class="task-meta">
          ${task.category} | Priority: ${task.priority} | Due: ${new Date(task.time).toLocaleString()}
        </div>
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    if (task.completed) completed++;
    taskList.appendChild(li);
  });

  document.getElementById('total-count').textContent = tasks.length;
  document.getElementById('completed-count').textContent = completed;
  document.getElementById('pending-count').textContent = tasks.length - completed;
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const desc = document.getElementById('task-input').value;
  const time = document.getElementById('task-time').value;
  const category = document.getElementById('task-category').value;
  const priority = document.getElementById('task-priority').value;

  tasks.push({ desc, time, category, priority, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  const newDesc = prompt('Edit Task:', task.desc) || task.desc;
  const newCategory = prompt('Edit Category:', task.category) || task.category;
  const newPriority = prompt('Edit Priority:', task.priority) || task.priority;
  const newTime = prompt('Edit Due Time (YYYY-MM-DDTHH:MM):', task.time) || task.time;

  tasks[index] = { ...task, desc: newDesc, category: newCategory, priority: newPriority, time: newTime };
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

filterCategory.addEventListener('change', renderTasks);
searchInput.addEventListener('input', renderTasks);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

(function init() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(savedTheme);
  renderTasks();
})();
