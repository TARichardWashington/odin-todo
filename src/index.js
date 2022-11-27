import './reset.css';
import './styles.css';
import projectsModel from './project-model';
import todoItem from './todo-item';

const doc = document.body;

// Create basic layout
const nav = document.createElement('nav');
doc.appendChild(nav);

const left = document.createElement('section');
left.setAttribute('class', 'left');


// Create navigation area content

const title = document.createElement('h1');
title.innerText = 'Minimal Todo';
nav.appendChild(title);

// Create left hand side area content

const projectsTitle = document.createElement('h2');
projectsTitle.textContent = 'Projects';
left.appendChild(projectsTitle);

const listOfProjects = document.createElement('ul');

const projects = [];

left.appendChild(listOfProjects);

doc.appendChild(left);

const createProjectText = document.createElement('input');
createProjectText.setAttribute('type', 'text');
createProjectText.setAttribute('placeholder', 'Name');

const createProjectButton = document.createElement('button');
createProjectButton.innerText = 'Create';

function createProject(name) {
    if (name) {
        const project = new projectsModel(name);
        createProjectText.value = '';
        projects.push(project);

        listOfProjects.innerText = '';

        projects.forEach(project => {
            const projectItem = document.createElement('li');
            projectItem.innerText = project.name;
            listOfProjects.appendChild(projectItem);
        });
    }
}

createProjectButton.addEventListener('click', function () {
    createProject(createProjectText.value);
});

createProject('Default project');

const defaultTodoItem = new todoItem('Get me done!');
projects[0].addTodo(defaultTodoItem);

let selectedProjectIndex = 0;

left.appendChild(createProjectText);
left.appendChild(createProjectButton);

// Create right hand side section to display the current project
// and associated todo items

const right = document.createElement('section');
right.setAttribute('class', 'right');

doc.appendChild(right);

const currentProject = document.createElement('div');
currentProject.setAttribute('id', 'project');

showProject(projects[selectedProjectIndex]);

function showProject(project) {
    currentProject.innerText = '';

    const projectTitle = document.createElement('h1');
    projectTitle.innerText = project.name;

    currentProject.appendChild(projectTitle);

    if (project.todos.length !== 0) {
        const todoList = document.createElement('ul');

        project.todos.forEach(item => {
            const itemLi = document.createElement('li');
            itemLi.innerText = item.title + ' | ' + (item.status ? 'done' : 'not done');
            todoList.appendChild(itemLi);
        });

        currentProject.appendChild(todoList);
    } else {
        const noItems = document.createElement('p');
        noItems.innerText = 'There are no todos';
        currentProject.appendChild(noItems);
    }

}

right.appendChild(currentProject);

const createTodoText = document.createElement('input');
createTodoText.setAttribute('type', 'text');
createTodoText.setAttribute('placeholder', 'What do you need to get done');

const createTodoButton = document.createElement('button');
createTodoButton.innerText = 'Create';

createTodoButton.addEventListener('click', () => {
    projects[selectedProjectIndex].addTodo(new todoItem(createTodoText.value, false));
    console.log(projects[selectedProjectIndex]);
    showProject(projects[selectedProjectIndex]);
});

right.appendChild(createTodoText);
right.appendChild(createTodoButton);




