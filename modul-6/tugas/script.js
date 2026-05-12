const input = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-msg");
const itemsLeft = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "semua";

// 1. Fungsi Utama: Render List
function renderTodos() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "aktif") return !todo.completed;
    if (currentFilter === "selesai") return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.priority} ${todo.completed ? "completed" : ""}`;
    li.draggable = true;
    li.dataset.index = index;

    li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})">
            <span class="todo-text" ondblclick="editTodo(${todo.id})">${todo.text}</span>
            <small>(${todo.priority})</small>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">×</button>
        `;

    // Fitur Drag & Drop
    li.addEventListener("dragstart", () => li.classList.add("dragging"));
    li.addEventListener("dragend", () => li.classList.remove("dragging"));

    todoList.appendChild(li);
  });

  updateCounter();
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 2. Fungsi Tambah & Validasi
addBtn.addEventListener("click", () => {
  const val = input.value.trim();
  if (val.length < 3 || val.length > 100) {
    errorMsg.innerText = "Minimal 3 karakter & maksimal 100!";
    return;
  }
  errorMsg.innerText = "";

  todos.push({
    id: Date.now(),
    text: val,
    completed: false,
    priority: prioritySelect.value,
  });

  input.value = "";
  renderTodos();
});

// 3. Edit Tugas (Double Click)
window.editTodo = (id) => {
  const todo = todos.find((t) => t.id === id);
  const textSpan = event.target;
  const originalText = todo.text;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = originalText;

  textSpan.replaceWith(editInput);
  editInput.focus();

  const saveEdit = () => {
    const newText = editInput.value.trim();
    if (newText.length >= 3) {
      todo.text = newText;
    }
    renderTodos();
  };

  editInput.addEventListener("blur", saveEdit);
  editInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit();
  });
};

// 4. Toggle Selesai & Delete
window.toggleTodo = (id) => {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
  renderTodos();
};

window.deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
};

// 5. Filter & Counter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

function updateCounter() {
  const activeCount = todos.filter((t) => !t.completed).length;
  itemsLeft.innerText = `${activeCount} tugas tersisa`;
}

clearCompleted.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  renderTodos();
});

// 6. Drag and Drop Logic
todoList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const siblings = [...todoList.querySelectorAll(".todo-item:not(.dragging)")];

  const nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  todoList.insertBefore(draggingItem, nextSibling);
});

// Inisialisasi awal
renderTodos();


