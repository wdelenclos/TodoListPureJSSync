const taskInput = document.getElementById("new-task"); //new-task
const incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
import { localAdd, localRemove, localUpdateStatus, localUpdateName} from './data.js'

/**
 * New Task List Item
 * @param taskString
 * @returns {HTMLElement}
 */
function createNewTaskElement(taskString) {
    // Create List Item
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); // text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

/**
 * Inject a new task
 */
function injectTask(task) {
    // Create a new list item with the text from #new-task:
    let listItem = createNewTaskElement(task.name);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    listItem.dataset.id = task._id;
    bindTaskEvents(listItem, taskCompleted);
    if(task.status === 1){
        console.log(listItem.children[0].click());
    }
};

/**
 * Add a new task
 */
function addTask() {
    //Create a new list item with the text from #new-task:
    let listItem = createNewTaskElement(taskInput.value);
    let id =  Date.now().toString();
    listItem.dataset.id = id;
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    localAdd({_id: id, "name": taskInput.value, "status": 0});
    taskInput.value = "";
};

/**
 * Edit an existing task
 */
function editTask() {
    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
        localUpdateName(listItem.dataset.id, label.innerText)
    } else {
        //Switch to .editMode
        //input value becomes the label's text
        editInput.value = label.innerText;
    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

}

/**
 * Delete an existing task
 */
function deleteTask() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    localRemove(listItem.dataset.id);
    //Remove the parent list item from the ul
    ul.removeChild(listItem);

}

/**
 * Mark a task as complete
 */
function taskCompleted() {
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    localUpdateStatus(listItem.dataset.id, {"status": 1});
    bindTaskEvents(listItem, taskIncomplete);
}

/**
 * Mark a task as incomplete
 */
function taskIncomplete() {
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    localUpdateStatus(listItem.dataset.id, {"status": 0});
    bindTaskEvents(listItem, taskCompleted);
}

/**
 * List item event binder
 * @param taskListItem
 * @param checkBoxEventHandler
 */
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    // select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

function restaureList(data){
    console.log(data);
    for (let i = 0; i < data.length; i++){
        injectTask(data[i].doc);
    }
}

export { addTask, bindTaskEvents, taskCompleted, taskIncomplete, restaureList }