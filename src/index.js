import './reset.css';
import './styles.css';
import ProjectsModel from './project-model';
import TodoItem from './todo-item';
import { createProjectTextDOM } from './dom';

let projects;

const createProjectText = createProjectTextDOM();

const listOfProjects = document.createElement('ul');

const currentProject = document.createElement('div');
currentProject.setAttribute('id', 'project');

let selectedProjectIndex = 0;

function storeProjects() {
  const projectsJson = JSON.stringify(projects);
  localStorage.setItem('projects', projectsJson);
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
      itemDoneButton.innerText = item.status ? 'Mark not done' : 'Mark done';
      itemDoneButton.classList.add('full');

      itemDoneButton.addEventListener('click', () => {
        project.todos[index].status = !project.todos[index].status;
        showProject(project);
        storeProjects();
      });

      const itemShowButton = document.createElement('button');
      itemShowButton.innerText = 'Show';
      itemShowButton.classList.add('full');

      itemShowButton.addEventListener('click', () => {
        const current = document.querySelector('.current');
        current.innerText = '';

        const currentTitle = document.createElement('h2');
        currentTitle.innerText = item.title;
        current.appendChild(currentTitle);

        const currentList = document.createElement('ul');
        current.appendChild(currentList);

        const currentDescription = document.createElement('li');
        currentDescription.innerText = item.description;
        currentList.appendChild(currentDescription);

        const currentPriority = document.createElement('li');
        currentPriority.innerText = `Priority: ${item.priority}`;
        currentList.appendChild(currentPriority);

        const currentDueDate = document.createElement('li');
        currentDueDate.innerText = `Due date: ${(item.dueDate ?? 'Not set')}`;
        currentList.appendChild(currentDueDate);

        const currentEditButton = document.createElement('button');
        currentEditButton.innerText = 'Edit';
        currentEditButton.classList.add('full');
        currentEditButton.addEventListener('click', () => {
          const formNameElement = document.getElementById('name');
          formNameElement.value = item.title;

          const formDescriptionElement = document.getElementById('description');
          formDescriptionElement.value = item.description;

          const formDueDateElement = document.getElementById('dueDate');
          formDueDateElement.value = item.dueDate;

          const formPriorityElement = document.getElementById('priority');
          formPriorityElement.value = item.priority;
        });
        current.appendChild(currentEditButton);
      });

      const itemDeleteButton = document.createElement('button');
      itemDeleteButton.innerText = 'Delete';
      itemDeleteButton.classList.add('full');

      itemDeleteButton.addEventListener('click', () => {
        project.removeTodo(index);
        showProject(project);

        storeProjects();
      });

      itemLi.appendChild(itemDoneButton);
      itemLi.appendChild(itemDeleteButton);
      itemLi.appendChild(itemShowButton);

      todoList.appendChild(itemLi);
    });

    currentProject.appendChild(todoList);
  } else {
    const noItems = document.createElement('p');
    noItems.innerText = 'There are no todos for this project';
    currentProject.appendChild(noItems);
  }
}

function createProject(name) {
  if (name) {
    const newProject = new ProjectsModel(name);
    createProjectText.value = '';
    projects.push(newProject);

    listOfProjects.innerText = '';

    projects.forEach((project, index) => {
      const projectItem = document.createElement('li');
      projectItem.innerText = `${project.name} ( ${project.numberOfTodos} )`;
      projectItem.setAttribute('data-id', index);

      projectItem.addEventListener('click', () => {
        showProject(project);
        selectedProjectIndex = projectItem.dataset.id;
      });

      listOfProjects.appendChild(projectItem);
    });

    storeProjects();

    // return index of this new project in the projects collection
    return projects.length - 1;
  }

  return false;
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

left.appendChild(listOfProjects);

doc.appendChild(left);

const createProjectButton = document.createElement('button');
createProjectButton.innerText = 'Create';

createProjectButton.addEventListener('click', () => {
  createProject(createProjectText.value);
});

if (localStorage.getItem('projects')) {
  const projectsObjects = JSON.parse(localStorage.getItem('projects'));

  projects = [];

  projectsObjects.forEach((project) => {
    const projectsIndex = createProject(project._name);

    project._todos.forEach((storedTodo) => {
      const todo = new TodoItem(
        storedTodo._title,
        storedTodo._status,
        storedTodo._description,
        storedTodo._dueDate,
        storedTodo._priority,
      );

      projects[projectsIndex].addTodo(todo);
    });
  });
} else {
  projects = [];
}

storeProjects();

if (projects.length === 0) {
  createProject('Default project');
  const defaultTodoItem = new TodoItem('Get me done!');
  projects[0].addTodo(defaultTodoItem);
}

left.appendChild(createProjectText);
left.appendChild(createProjectButton);

// Create right hand side section to display the current project
// and associated todo items

const right = document.createElement('section');
right.setAttribute('class', 'right');

doc.appendChild(right);

showProject(projects[selectedProjectIndex]);

right.appendChild(currentProject);

const newTodoFormDiv = document.createElement('div');
newTodoFormDiv.classList.add('formArea');

const newTodoForm = document.createElement('form');

const createTodoTitle = document.createElement('input');
createTodoTitle.setAttribute('type', 'text');
createTodoTitle.setAttribute('id', 'name');
createTodoTitle.setAttribute('required', 'required');
createTodoTitle.setAttribute('minlength', '3');
createTodoTitle.setAttribute('maxlength', '20');
createTodoTitle.setAttribute('placeholder', 'What do you need to get done');

createTodoTitle.addEventListener('input', (e) => {
  const input = e.target;
  const validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Please set a sensible name');
  } else if (validityState.tooShort) {
    input.setCustomValidity('Please enter at least three characters');
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
});

const createTodoDueDate = document.createElement('input');
createTodoDueDate.setAttribute('type', 'text');
createTodoDueDate.setAttribute('id', 'dueDate');
createTodoDueDate.setAttribute('required', 'required');
createTodoDueDate.setAttribute('maxlength', '10');
createTodoDueDate.setAttribute('pattern', '([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)[0-9]{4}');
createTodoDueDate.setAttribute('placeholder', 'When do you need to do it by');

createTodoDueDate.addEventListener('input', (e) => {
  const input = e.target;
  const validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Please set a date when this needs to be complete by');
  } else if (validityState.patternMismatch) {
    input.setCustomValidity('Please use the dd/mm/yyyy format');
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
});

const createTodoDescription = document.createElement('textarea');
createTodoDescription.setAttribute('placeholder', 'More info');
createTodoDescription.setAttribute('required', 'required');
createTodoDescription.setAttribute('minlength', '3');
createTodoDescription.setAttribute('id', 'description');

createTodoDescription.addEventListener('input', (e) => {
  const input = e.target;
  const validityState = input.validity;

  console.log(validityState);

  if (validityState.valueMissing) {
    input.setCustomValidity('A description is required');
  } else if (validityState.tooShort) {
    input.setCustomValidity('Please enter at least three characters, ideally a good description for this item');
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();
});

const createTodoPriority = document.createElement('input');
createTodoPriority.setAttribute('type', 'number');
createTodoPriority.setAttribute('id', 'priority');
createTodoPriority.setAttribute('required', 'required');
createTodoPriority.setAttribute('min', '0');
createTodoPriority.setAttribute('max', '10');
createTodoPriority.setAttribute('placeholder', 'Priority (1-10)');

const createTodoButton = document.createElement('button');
createTodoButton.innerText = 'Create';

createTodoButton.addEventListener('click', () => {
  if (newTodoForm.checkValidity()) {
    const newToDo = new TodoItem(
      createTodoTitle.value,
      false,
      createTodoDescription.value,
      createTodoDueDate.value,
      createTodoPriority.value,
    );

    projects[selectedProjectIndex].addTodo(newToDo);

    showProject(projects[selectedProjectIndex]);
    createTodoTitle.value = '';
    createTodoDescription.value = '';
    createTodoDueDate.value = '';
    createTodoPriority.value = '';

    storeProjects();
  }
});

right.appendChild(newTodoFormDiv);
newTodoFormDiv.appendChild(newTodoForm);
newTodoForm.appendChild(createTodoTitle);
newTodoForm.appendChild(createTodoDueDate);
newTodoForm.appendChild(createTodoDescription);
newTodoForm.appendChild(createTodoPriority);
newTodoForm.appendChild(createTodoButton);

const current = document.createElement('section');
current.setAttribute('class', 'current');

doc.appendChild(current);
