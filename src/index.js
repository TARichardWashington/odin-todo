import './reset.css';
import './styles.css';
import projectsModel from './project-model';
import todoItem from './todo-item';

console.log('I am a to do app!');

const project1 = new projectsModel('Project 1');
project1.addTodo(1);

console.log(project1.name + ': ' + project1.todos);

const todo1 = new todoItem('get this done', false);

console.log(todo1.toString());

todo1.status = true;

console.log(todo1.toString());

project1.addTodo(todo1);

console.log(project1.todos);

const doc = document.body;

const nav = document.createElement('nav');
nav.innerText = 'Todo';

doc.appendChild(nav);

const left = document.createElement('section');
left.setAttribute('class', 'left');
left.innerText = 'Menu';

const listOfProjects = document.createElement('ul'); 

const projects = [];

projects.push(project1);

projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.innerText = project.name;
    listOfProjects.appendChild(projectItem);
});

left.appendChild(listOfProjects);

doc.appendChild(left);

const createProjectText = document.createElement('input');
createProjectText.setAttribute('type', 'text');

const createProjectButton = document.createElement('button');
createProjectButton.innerText = 'Create project';

createProjectButton.addEventListener('click', function() {
    const project = new projectsModel(createProjectText.value);
    createProjectText.value = '';
    projects.push(project);

    listOfProjects
    .innerText = '';

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.innerText = project.name;
        listOfProjects.appendChild(projectItem);
    });
    
    left.appendChild(listOfProjects);

});

left.appendChild(createProjectText);
left.appendChild(createProjectButton);

const right = document.createElement('section');
right.setAttribute('class', 'right');

doc.appendChild(right);




