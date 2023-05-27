//Funcion para obtener la lista de  tareas guardadas en el LocalStorage
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
}

//Funcion para guardar las tareas en el LocalStorage
function saveTasks(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funcion para MOSTRAR las tareas en la lista
function renderTasks(){
    taskList.innerHTML = '';
    const tasks = getTasks();

    tasks.forEach(function(task){
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function(){
            deleteTask(task);
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    })
}

//Funcion para Agregar Tareas
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
}


//Funcion para Eliminar Tarea
function deleteTask(task) {
    const tasks = getTasks();
    const index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    }
}
//Funcion para MANEJAR el envio del formulario de la tarea
taskForm.addEventListener('submit', function(e){
    e.preventDefault();
    const taskValue = taskInput.value.trim();
    if(taskValue !== ''){
        addTask(taskValue);
        taskInput.value = '';
    }
})


//FUNCION para cargar tareas a la pagina
window.onload = function(){
    renderTasks();
}