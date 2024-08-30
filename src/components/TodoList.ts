import { Todo } from "../types/Todo";
import { saveTodos, loadTodos } from "../utils/todoUtils";
import styles from "../styles/TodoList.css?inline";

const initialTodos: Todo[] = [
  { id: 1, text: "Learn Web Components", completed: true },
  { id: 2, text: "Build a Todo List app", completed: false },
  { id: 3, text: "Deploy to GitHub Pages", completed: false },
  { id: 4, text: "Write project documentation", completed: false },
  { id: 5, text: "Share project with community", completed: false },
];

class TodoList extends HTMLElement {
  private todos: Todo[] = [];
  private shadow: ShadowRoot;

  private filter: "all" | "active" | "completed" = "all";

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.loadTodos();
    this.addEventListeners();
    this.initDragAndDrop();
  }

  private render() {
    this.shadow.innerHTML = `
    <style>${styles}</style>
    <h2>My Todo List</h2>
    <a href="https://github.com/leon-tech-dev/todo-list-web-component" target="_blank" class="github-badge">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
    </a>
    <div class="todo-input">
      <input type="text" placeholder="Add a new todo">
      <button id="addTodo">Add</button>
    </div>
    <div class="filters">
      <button id="filterAll" class="filter-btn active">All</button>
      <button id="filterActive" class="filter-btn">Active</button>
      <button id="filterCompleted" class="filter-btn">Completed</button>
    </div>
    <ul></ul>
    <div class="todo-footer">
      <span class="todo-count"></span>
      <button id="clearCompleted">Clear completed</button>
    </div>
    `;
    this.updateTodoList();
  }

  private initDragAndDrop() {
    const list = this.shadow.querySelector("ul");
    if (list) {
      list.addEventListener("dragover", (e) => e.preventDefault());
    }
  }

  private addEventListeners() {
    const input = this.shadow.querySelector("input");
    const addButton = this.shadow.querySelector("#addTodo");
    const list = this.shadow.querySelector("ul");

    addButton?.addEventListener("click", () => this.addTodo());
    input?.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") this.addTodo();
    });

    list?.addEventListener("click", this.handleTodoAction.bind(this));

    this.shadow
      .querySelector("#filterAll")
      ?.addEventListener("click", () => this.setFilter("all"));
    this.shadow
      .querySelector("#filterActive")
      ?.addEventListener("click", () => this.setFilter("active"));
    this.shadow
      .querySelector("#filterCompleted")
      ?.addEventListener("click", () => this.setFilter("completed"));
    this.shadow
      .querySelector("#clearCompleted")
      ?.addEventListener("click", () => this.clearCompleted());
  }

  private clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveTodos();
    this.updateTodoList();
  }

  private handleTodoAction(e: Event) {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset.id);

    if (
      target.tagName === "INPUT" &&
      (target as HTMLInputElement).type === "checkbox"
    ) {
      this.toggleTodo(id);
    } else if (target.classList.contains("delete-btn")) {
      this.deleteTodo(id);
    } else if (target.classList.contains("edit-btn")) {
      this.editTodo(id);
    }
  }

  private addTodo() {
    const input = this.shadow.querySelector("input") as HTMLInputElement;
    const text = input.value.trim();
    if (text) {
      const newTodo: Todo = { id: Date.now(), text, completed: false };
      this.todos.unshift(newTodo);
      this.updateTodoList();
      input.value = "";
      this.saveTodos();
    }
  }

  private toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.updateTodoList();
      this.saveTodos();
    }
  }

  private deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.updateTodoList();
    this.saveTodos();
  }

  private editTodo(id: number) {
    const todoElement = this.shadow.querySelector(`li[data-id="${id}"]`);
    const todo = this.todos.find((t) => t.id === id);
    if (todoElement && todo) {
      const todoText = todoElement.querySelector(".todo-text");
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      editInput.className = "edit-input";
      todoText?.replaceWith(editInput);
      editInput.focus();

      const saveEdit = () => {
        todo.text = editInput.value.trim();
        this.updateTodoList();
        this.saveTodos();
      };

      editInput.addEventListener("blur", saveEdit);
      editInput.addEventListener("keypress", (e: KeyboardEvent) => {
        if (e.key === "Enter") saveEdit();
      });
    }
  }

  private updateTodoList() {
    const list = this.shadow.querySelector("ul");
    if (list) {
      list.innerHTML = this.getFilteredTodos()
        .map(
          (todo) => `
            <li data-id="${todo.id}" class="${
            todo.completed ? "completed" : ""
          }" draggable="true">
              <span class="drag-handle">☰</span>
              <input type="checkbox" ${todo.completed ? "checked" : ""}>
              <span class="todo-text">${todo.text}</span>
              <div class="button-group">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
              </div>
            </li>
          `
        )
        .join("");

      list.querySelectorAll("li").forEach((li) => {
        const id = Number(li.dataset.id);
        const checkbox = li.querySelector('input[type="checkbox"]');
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        checkbox?.addEventListener("change", () => this.toggleTodo(id));
        editBtn?.addEventListener("click", () => this.editTodo(id));
        deleteBtn?.addEventListener("click", () => this.deleteTodo(id));

        li.addEventListener("dragstart", this.dragStart.bind(this));
        li.addEventListener("dragover", this.dragOver.bind(this));
        li.addEventListener("drop", this.drop.bind(this));
        li.addEventListener("dragend", this.dragEnd.bind(this));
      });
    }
    this.updateFilterButtons();
    this.updateTodoCount();
  }

  private updateTodoCount() {
    const count = this.todos.filter((todo) => !todo.completed).length;
    const todoCount = this.shadow.querySelector(".todo-count");
    if (todoCount) {
      todoCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
    }
  }

  private loadTodos() {
    const savedTodos = loadTodos();
    if (savedTodos && savedTodos.length > 0) {
      console.log(savedTodos);
      this.todos = savedTodos;
    } else {
      this.todos = initialTodos;
      this.saveTodos();
    }
    this.updateTodoList();
  }

  private setFilter(filter: "all" | "active" | "completed") {
    this.filter = filter;
    this.updateTodoList();
  }

  private updateFilterButtons() {
    const buttons = this.shadow.querySelectorAll(".filter-btn");
    buttons.forEach((button) => button.classList.remove("active"));
    this.shadow
      .querySelector(
        `#filter${this.filter.charAt(0).toUpperCase() + this.filter.slice(1)}`
      )
      ?.classList.add("active");
  }

  private getFilteredTodos(): Todo[] {
    switch (this.filter) {
      case "active":
        return this.todos.filter((todo) => !todo.completed);
      case "completed":
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  // drag and drop

  private dragStart(e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === "LI") {
      e.dataTransfer?.setData("text/plain", target.dataset.id || "");
      target.classList.add("dragging");
    }
  }

  private dragOver(e: DragEvent) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const li = target.closest("li");
    if (li && !li.classList.contains("dragging")) {
      const box = li.getBoundingClientRect();
      const offsetY = e.clientY - box.top - box.height / 2;
      if (offsetY < 0) {
        li.parentElement?.insertBefore(
          this.shadow.querySelector(".dragging") as Node,
          li
        );
      } else {
        li.parentElement?.insertBefore(
          this.shadow.querySelector(".dragging") as Node,
          li.nextElementSibling
        );
      }
    }
  }

  private drop(e: DragEvent) {
    e.preventDefault();
  }

  private dragEnd(e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === "LI") {
      target.classList.remove("dragging");
      this.updateTodosOrder();
    }
  }

  private updateTodosOrder() {
    const list = this.shadow.querySelector("ul");
    if (list) {
      const newOrder = Array.from(list.querySelectorAll("li")).map((li) =>
        Number(li.dataset.id)
      );
      this.todos = newOrder
        .map((id) => this.todos.find((todo) => todo.id === id)!)
        .filter(Boolean);
      this.saveTodos();
    }
  }

  private saveTodos() {
    saveTodos(this.todos);
  }
}

customElements.define("todo-list", TodoList);
