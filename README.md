# Todo List Web Component

## Overview

This project implements a feature-rich Todo List as a Web Component using TypeScript and modern web technologies.

## Demo

Check out the live demo: [Todo List Web Component](https://leon-tech-dev.github.io/todo-list-web-component/)

## Features

- Add new todos
- Edit existing todos
- Mark todos as complete/incomplete
- Delete todos
- Filter todos (All, Active, Completed)
- Drag and drop to reorder todos
- Clear all completed todos
- Persistent storage using localStorage
- Responsive design

## Technologies Used

- TypeScript
- Web Components
- HTML5 Drag and Drop API
- CSS3
- Vite

## Project Structure

The project is organized into two main components:

1. `TodoList`: The main component that manages the overall todo list.

Key files:

- `src/components/TodoList.ts`: Main TodoList component
- `src/types/Todo.ts`: TypeScript interface for Todo items
- `src/utils/todoUtils.ts`: Utility functions for todo management
- `src/styles/TodoList.css`: Styles for the TodoList component

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

## Future Enhancements

Potential areas for future development:

- Add due dates to todos
- Implement categories or tags for todos
- Add a search functionality
- Implement user authentication and cloud storage

## License

[MIT License](LICENSE)

## Acknowledgements

This project was developed as a learning exercise to demonstrate proficiency in Web Components, TypeScript, and modern web development practices.
