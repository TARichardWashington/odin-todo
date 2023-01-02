export function createProjectTextDOM() {
    const createProjectText = document.createElement('input');
    createProjectText.setAttribute('type', 'text');
    createProjectText.setAttribute('placeholder', 'Name');
    return createProjectText;
}