export default class Project {
    constructor(name) {
        this._todos = [];
        this.name = name;
    }

    addTodo(todo) {
        this._todos.push(todo);
    }

    get todos() {
        return this._todos;
    }

    get name() {
        return this._name;
    }
    
    set name(name) {
        this._name = name;
    }
}