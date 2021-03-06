// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
var opts = {}
var tab = "notes"

document.getElementById("tabs").onclick = function(event) {
    if (event.path[0].className === "notes-btn") {
        tab = "notes"
    } else if (event.path[0].className === "todo-btn") {
        tab = "todo"
    } else if (event.path[0].className === "links-btn") {
        tab = "links"
    }
    updateTab()
}

function updateTab() {
    if (tab === "notes") {
        document.getElementsByClassName("notes-btn").style.backgoundColor = "white"
    } else if (tab === "todo") {
        document.getElementsByClassName("todo-btn").style.backgound = "white"
    } else if (tab === "links") {
        document.getElementsByClassName("links-btn").style.backgound = "white"
    }
}

window.onload = function() {
    updateTab()
    let getLocalStorageData = localStorage.getItem("pastebook-opts");
    if(getLocalStorageData == null){
        setNew()
        localStorage.setItem("pastebook-opts", JSON.stringify(opts));
    }else{
        opts = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    
}
// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

function setNew() {
    let name = prompt("Name For this book")
    alert(name)
    opts.name = name
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("pastebook-notes"); //getting localstorage
    if(getLocalStorageData == null){ //if localstorage has no data
        listArray = []; //create a blank array
    }else{
        listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("pastebook-notes", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks(){
    let getLocalStorageData = localStorage.getItem("pastebook-notes");
    if(getLocalStorageData == null){
        listArray = []; 
    }else{  
        listArray = JSON.parse(getLocalStorageData); 
    }
    if(listArray.length > 0){ //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    }else{
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})">x</span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("pastebook-notes");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("pastebook-notes", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("pastebook-notes", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}