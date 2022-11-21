import './reset.css';
import './styles.css';
import projectsModel from './project-model';
import todoItem from './todo-item';

const doc = document.body;

const nav = document.createElement('nav');
nav.innerText = 'Todo';

doc.appendChild(nav);

const left = document.createElement('section');
left.setAttribute('class', 'left');

const listOfProjects = document.createElement('ul'); 

const projects = [];

projects.forEach(project => {
    const projectItem = document.createElement('li');
    projectItem.innerText = project.name;
    listOfProjects.appendChild(projectItem);
});

left.appendChild(listOfProjects);

doc.appendChild(left);

const createProjectText = document.createElement('input');
createProjectText.setAttribute('type', 'text');
createProjectText.setAttribute('placeholder', 'project name');

const createProjectButton = document.createElement('button');
createProjectButton.innerText = 'create project';

createProjectButton.addEventListener('click', function() {
    const project = new projectsModel(createProjectText.value);
    createProjectText.value = '';
    projects.push(project);

    listOfProjects.innerText = '';

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.innerText = project.name;
        listOfProjects.appendChild(projectItem);
    });
    
    left.insertBefore(listOfProjects, left.firstChild);

    console.info(projects);

});

left.appendChild(createProjectText);
left.appendChild(createProjectButton);

const right = document.createElement('section');
right.setAttribute('class', 'right');

doc.appendChild(right);