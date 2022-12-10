export default class todo {
  constructor(title, status, description = 'DO ME', dueDate = null, priority = 1) {
    this._title = title;
    this._status = status;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  toggleStatus() {
    if (this._status === true) {
      this._status = false;
    } else {
      this._status = true;
    }
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
  }

  toString() {
    return `${this.title}  is  ${this.status ? 'complete' : 'not complete'}`;
  }
}
