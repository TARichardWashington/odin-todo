import './reset.css';
import './styles.css';
import projectsModel from './project-model';
import todoItem from './todo-item';

console.log('I am a to do app!');

const project1 = new projectsModel('Project 1');
project1.addTodo(1);

console.log(project1.name + ': ' + project1.todos);

const todo1 = new todoItem('get this done', false);

console.log(todo1.title + ' is ' + (todo1.status ? 'done': 'not done'));

todo1.status = true;

console.log(todo1.title + ' is ' + (todo1.status ? 'done': 'not done'));

project1.addTodo(todo1);

console.log(project1.todos);

