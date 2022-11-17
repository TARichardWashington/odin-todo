import './reset.css';
import './styles.css';
import projectsModel from './project-model';

console.log('I am a to do app!');

const project1 = new projectsModel('Project 1');
project1.addTodo(1);

console.log(project1.name + ': ' + project1.todos);