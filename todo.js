let inputELement = document.querySelector(".input");
let sumbitElement = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let containerDiv = document.querySelector(".container");
let deleteAll = document.querySelector(".delete-all");

let arrayOfTasks= [];
if( localStorage.getItem("task")){
    arrayOfTasks = JSON.parse(localStorage.getItem("task"))
}
getTaskFormLocalStorage();
sumbitElement.onclick = function(){
    if(inputELement.value !== ""){
        addTasksToArray(inputELement.value);
        inputELement.value ="";
    }
}

function addTasksToArray(taskText){
    const task = {
        id: arrayOfTasks.length,
        // id: Date.now(),
        title: taskText,
        complated : false,
    }
    arrayOfTasks.push(task);
    // console.log(arrayOfTasks);
    addTaskToPage(arrayOfTasks);
    addTaskToLocalStorage(arrayOfTasks)
}

function addTaskToPage(arrayOfTasks){
    tasksDiv.innerHTML ="";
    arrayOfTasks.forEach((task) => {
        let newDiv = document.createElement("div")
        newDiv.classList.add("task")
        if(task.complated){
            newDiv.classList.add = "done"
        }

        newDiv.setAttribute("data-id",task.id);
        newDiv.appendChild(document.createTextNode(task.title));
        let  span = document.createElement("button");
        span.classList.add("del")
        span.appendChild(document.createTextNode("delete"));
        newDiv.appendChild(span)

        tasksDiv.appendChild(newDiv)
        // console.log(tasksDiv)
    });

}

function addTaskToLocalStorage(arrayOfTasks){
    localStorage.setItem("task", JSON.stringify(arrayOfTasks))
}
function getTaskFormLocalStorage(){
    let data  = localStorage.getItem("task")

    if(data){
        let tasks  =JSON.parse(data);
        addTaskToPage(tasks)
    }
}
tasksDiv.onclick = ((e)=>{
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"))
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done")
        updateTaskFromLocalStorage(e.target.getAttribute("data-id"))
    }
})

function deleteTaskFromLocalStorage(taskId){
    arrayOfTasks= arrayOfTasks.filter((task)=> task.id != taskId);
    addTaskToLocalStorage(arrayOfTasks)
}
function updateTaskFromLocalStorage(taskId){
    arrayOfTasks.forEach(task =>{
        if(task.id ==taskId){

            task.complated == false ? task.complated = true : task.complated =false;
        }
    })
    addTaskToLocalStorage(arrayOfTasks)
}

deleteAll.onclick = function(){
    tasksDiv.innerHTML="";
    localStorage.removeItem("task")
}

