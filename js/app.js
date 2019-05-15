import { addTask, bindTaskEvents, taskCompleted, taskIncomplete, restaureList } from '/js/core/listCore.js'
import { initLocal, localGet } from '/js/core/data.js'
import { dbSync } from '/js/services/dbSync.js'


document.addEventListener('connection-changed', ({ detail }) => {
    console.log(detail);
});
initLocal();
dbSync();

const incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
const addButton = document.getElementsByTagName("button")[0]; //first button
addButton.addEventListener("click", addTask);

// cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


// Get local data
localGet(restaureList);
