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
    if(name) {
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

createProjectButton.addEventListener('click', function() {
    createProject(createProjectText.value);
});

createProject('Default project');

left.appendChild(createProjectText);
left.appendChild(createProjectButton);

const right = document.createElement('section');
right.setAttribute('class', 'right');

doc.appendChild(right);