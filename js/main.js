const inputUser = document.getElementById('input-user');
const buttonAdd = document.getElementById('button-add-task');
const listTask = document.getElementById('task-list');

buttonAdd.addEventListener('click', () => {
    if(!inputUser.value.trim()) return clearAndFocus();
    createItemContent(inputUser.value)
    clearAndFocus();
    saveTask();
})

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if(!inputUser.value.trim()) return clearAndFocus();
        createItemContent(inputUser.value);
        clearAndFocus();
        saveTask();
    }
})

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.getAttribute('id') === 'delete'){
        el.parentElement.remove();
        saveTask();
    }
})

addTaskSave();

function saveTask() {
    const itemList = listTask.querySelectorAll('label')
    const arrayTask = []
    for (let i of itemList){
        let textLabel = i.textContent.trim();
        arrayTask.push(textLabel)
    }

    const taskJSON = JSON.stringify(arrayTask);
    localStorage.setItem('tarefas', taskJSON);
}

function addTaskSave() {
    const task = localStorage.getItem('tarefas');
    const arrayTask = JSON.parse(task);
    for (let i of arrayTask) {
        createItemContent(i)
    }
}

function clearAndFocus(){
    inputUser.value = '';
    inputUser.focus();
}

function createItemContent (inputValue) {
    const listItem = document.createElement('p');
    const inputCheckbox = createCheckbox();
    const label = document.createElement('label');
    label.textContent = inputValue;
    listItem.append(inputCheckbox, label);
    listTask.append(listItem);
    createButtonDelete(listItem);
}

function createCheckbox (){
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.classList.add('checkbox');
    return checkbox;
}

function createButtonDelete (li) {
    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('far', 'fa-trash-alt');
    buttonDelete.setAttribute('id', 'delete');
    li.appendChild(buttonDelete);
}
