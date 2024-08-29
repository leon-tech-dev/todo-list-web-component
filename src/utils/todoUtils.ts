import { Todo } from "../types/Todo";

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodos(): Todo[] {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}
