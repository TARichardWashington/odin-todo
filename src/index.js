import './reset.css';
import './styles.css';
import projectsModel from './project-model';
import todoItem from './todo-item';

function createProject(name) {
    if (name) {
        const project = new projectsModel(name);
        createProjectText.value = '';
        projects.push(project);

        listOfProjects.innerText = '';

        projects.forEach((project, index) => {
            const projectItem = document.createElement('li');
            projectItem.innerText = project.name + '(' + project.numberOfTodos + ')';
            projectItem.setAttribute('data-id', index);

            projectItem.addEventListener('click', (e) => {
                showProject(project);
                selectedProjectIndex = projectItem.dataset.id;
            });

            listOfProjects.appendChild(projectItem);
        });
    }

    projectsJson = JSON.stringify(projects);
    localStorage.setItem('projects', projectsJson);
    console.log(projects);
}

function showProject(project) {
    currentProject.innerText = '';

    const projectTitle = document.createElement('h2');
    projectTitle.innerText = project.name;

    currentProject.appendChild(projectTitle);

    if (project.todos.length !== 0) {
        const todoList = document.createElement('ul');

        project.todos.forEach((item, index) => {
            const itemLi = document.createElement('li');
            itemLi.innerText = item.title;

            const itemDoneButton = document.createElement('button');
            itemDoneButton.innerText = (item.status ? 'Mark not done' : 'Mark done');
            itemDoneButton.classList.add('full');

            itemDoneButton.addEventListener('click', () => {
                project.todos[index].status ? project.todos[index].status = false : project.todos[index].status = true;
                showProject(project);
            });

            const itemDeleteButton = document.createElement('button');
            itemDeleteButton.innerText = 'Delete';
            itemDeleteButton.classList.add('full');

            itemDeleteButton.addEventListener('click', () => {
                project.removeTodo(index);
                showProject(project);
            });

            itemLi.appendChild(itemDoneButton);
            itemLi.appendChild(itemDeleteButton);

            todoList.appendChild(itemLi);
        });

        currentProject.appendChild(todoList);
    } else {
        const noItems = document.createElement('p');
        noItems.innerText = 'There are no todos for this project';
        currentProject.appendChild(noItems);
    }
}

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

left.appendChild(listOfProjects);

doc.appendChild(left);

const createProjectText = document.createElement('input');
createProjectText.setAttribute('type', 'text');
createProjectText.setAttribute('placeholder', 'Name');

const createProjectButton = document.createElement('button');
createProjectButton.innerText = 'Create';

createProjectButton.addEventListener('click', function () {
    createProject(createProjectText.value);
});

var projects;

if (localStorage.getItem('projects')) {
    var projectsObjects = JSON.parse(localStorage.getItem('projects'));

    projects = [];

    projectsObjects.forEach(project => {
        createProject(project._name);
    });
} else {
    projects = [];
}

var projectsJson = JSON.stringify(projects);
localStorage.setItem('projects', projectsJson);

if (projects.length === 0) {
    createProject('Default project');
    const defaultTodoItem = new todoItem('Get me done!');
    projects[0].addTodo(defaultTodoItem);
}

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

right.appendChild(currentProject);

const createTodoText = document.createElement('input');
createTodoText.setAttribute('type', 'text');
createTodoText.setAttribute('placeholder', 'What do you need to get done');

const createTodoButton = document.createElement('button');
createTodoButton.innerText = 'Create';

createTodoButton.addEventListener('click', () => {
    if (createTodoText.value !== '') {
        projects[selectedProjectIndex].addTodo(new todoItem(createTodoText.value, false));
        showProject(projects[selectedProjectIndex]);
        createTodoText.value = '';
    }
});

right.appendChild(createTodoText);
right.appendChild(createTodoButton);




