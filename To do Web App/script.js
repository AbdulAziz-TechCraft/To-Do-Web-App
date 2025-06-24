const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');

const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const remainingTasksEl = document.getElementById('remainingTasks');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

clearAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  updateTaskCounts();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.textContent = taskText;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'task-buttons';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✓';
  completeBtn.className = 'complete-btn';
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTaskCounts();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateTaskCounts();
  });

  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(buttonGroup);
  taskList.appendChild(li);

  taskInput.value = '';
  updateTaskCounts();
}

function updateTaskCounts() {
  const allTasks = taskList.querySelectorAll('li.task-item');
  const completed = taskList.querySelectorAll('li.completed');

  totalTasksEl.textContent = `Total: ${allTasks.length}`;
  completedTasksEl.textContent = `Completed: ${completed.length}`;
  remainingTasksEl.textContent = `Remaining: ${allTasks.length - completed.length}`;
}
