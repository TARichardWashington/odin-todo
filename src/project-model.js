export default class Project {
  constructor(name) {
    this._todos = [];
    this.name = name;
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  get todos() {
    return this._todos;
  }

  get numberOfTodos() {
    return this._todos.length;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
}
