//Define UI Variables

const form = document.querySelector('#task-form')
const tasklist = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListerners()

function reset(){
    let tasks
    if (localStorage.getItem('tasks') == null) {
        tasks = []
        tasklist.style.visibility = "hidden";
    }
}

debugger
//Load all event listeners
function loadEventListerners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)

    //Add task event
    form.addEventListener('submit', addTask)

    //Remove a task
    tasklist.addEventListener('click', removeTask)

    //Clear the tasks
    clearBtn.addEventListener('click', clearTasks)

    //Filter Tasks
    filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS 
function getTasks() {

    let tasks
    if (localStorage.getItem('tasks') == null) {
        tasks = []
        tasklist.style.visibility = "hidden";
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(
        function (task) {
            //create li element
            const li = document.createElement('li')

            //Adding class
            li.className = 'collection-item'

            //create TextNode
            li.appendChild(document.createTextNode(task))

            //create new link element
            const link = document.createElement('a')

            //Add class
            link.className = 'delete-item secondary-content'

            //Add icon HTML
            link.innerHTML = '<i class ="fa fa-remove"> </i>'

            //Append the link to li
            li.appendChild(link)

            // //Append li to ul
            tasklist.appendChild(li)
        }
    )
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }
    else{
        tasklist.style.visibility = "visible";

        //create li element
        const li = document.createElement('li')

        //Adding class
        li.className = 'collection-item'

        //create TextNode
        li.appendChild(document.createTextNode(taskInput.value))

        //create new link element
        const link = document.createElement('a')

        //Add class
        link.className = 'delete-item secondary-content'

        //Add icon HTML
        link.innerHTML = '<i class ="fa fa-remove"> </i>'

        //Append the link to li
        li.appendChild(link)

        // console.log(li)

        // //Append li to ul
        tasklist.appendChild(li)
        storeTaskInLocalStorage(taskInput.value)

        //clear input
        taskInput.value = ''
    }

    //PREVENTING DEFAULT BEHAVIOUR 
    e.preventDefault()
}

//Store in LS
function storeTaskInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Delete Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent)
        } 
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
        tasklist.style.visibility = "hidden";
        clearTasksFromLocalStorage()
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.trim()  == task){
            console.log(index);
            tasks.splice(index, 1)
            if(tasks == 0) {
                clearTasksFromLocalStorage()
            }
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear Tasks
function clearTasks() {
    // tasklist.innerHTML = ''
    if(tasklist.firstChild == null){
        alert('No tasks to clear')
    }
    else{
        if (confirm('Are you sure to clear all the tasks?')) {
            while (tasklist.firstChild) {
                tasklist.removeChild(tasklist.firstChild)
            }
        }
    }
    
    //Clear from LS
    clearTasksFromLocalStorage()
}
//Clearing tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear()
    tasklist.style.visibility = "hidden";

    
}

//Filter Tasks
function filterTasks(e) {
    tasklist.style.visibility = "visible";
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'
                
            }
            else {
                task.style.display = 'none'
                // tasklist.style.visibility = "hidden";

            }
        }
    )
}
