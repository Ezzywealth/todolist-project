import createTodo from './create.js';
import { displayTodos, todo, todoListss, todoUl } from '../src/index.js';

// logic to create new todo using javascript class
export default class NewTodo {
  constructor(description) {
    this.description = description;
    this.id = todoListss.length + 1;
  }

  add = () => {
    const item = {
      id: this.id,
      description: this.description,
      completed: false,
      disabled: true,
      icon: 'more_vert',
    };
    createTodo(item);
    todoListss.push(item);
  };
}

// reset todo id
export const idReset = (lists) => {
  lists.forEach((todo, ind) => {
    todo.id = ind + 1;
  });
};

// logic to delete all completed todos
export const deleteCompletedTodos = () => {
  const newTodos = todoListss.filter((item, ind) => item.completed !== true);
  idReset(newTodos);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  window.location.reload();
};

// logic to delete a single todo
export const deleteTodo = (id, itemContainer) => {
  const newTodos = todoListss.filter((item, ind) => item.id !== id);
  localStorage.setItem('todos', JSON.stringify(newTodos));
  if (itemContainer.parentNode) {
    itemContainer.parentNode.removeChild(itemContainer);
  }
};

// logic to update the the description of a todo
export const updateTodo = (input, id, itemForm, option, itemContainer) => {
  input.disabled = false;
  input.focus();
  itemContainer.style.background = 'yellow';
  todoListss.forEach((todo) => {
    todo.icon = 'more_vert';
    if (todo.id === id) {
      todo.disabled = false;
      if (todo.disabled === false) {
        todo.icon = 'delete';
        option.innerText = todo.icon;

        option.style.cursor = 'pointer';
        itemForm.addEventListener('submit', (e) => {
          e.preventDefault();
          todo.description = input.value;
          localStorage.setItem('todos', JSON.stringify(todoListss));
          input.disabled = true;
        });
      }
    } else {
      todo.disabled = true;
    }
  });
  todoUl.innerHTML = '';
  displayTodos(todoListss);
};

// functionality to mark a todo as completed
export const selectTodo = (checkBox, todoTitle, item) => {
  if (checkBox.checked) {
    todoTitle.style.textDecoration = 'line-through';
    item.completed = true;
  } else {
    todoTitle.style.textDecoration = 'none';
    item.completed = false;
  }
};
