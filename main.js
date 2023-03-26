const form = document.querySelector(".form1");
const inputTodo = document.querySelector("#inputTodo");

const emptyState = document.querySelector(".emptyState");
const todoList = document.querySelector(".todolist1");

const todos = [];
const doneTodos = [];

let sortable = Sortable.create(todoList, // Element dragging ended
{onEnd: function (evt) {
  let itemEl = evt.item;  // dragged HTMLElement
  evt.to;    // target list
  evt.from;  // previous list
  evt.oldIndex;  // element's old index within old parent
  evt.newIndex;  // element's new index within new parent
  evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
  evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
  evt.clone // the clone element
  evt.pullMode;  // when item is in another sortable: "clone" if cloning, true if moving
  console.log(evt); 
  //reorder array based on old index and new index
  let temp = todos[evt.newIndex]; //copy of newIndex
  todos[evt.newIndex] = todos[evt.oldIndex];
  todos[evt.oldIndex] = temp;
  console.log(todos);
  drawToDoList();
},

}
);

function drawToDoList() {

  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  for (let i = 0; i < todos.length; i++) {
    const listItem = document.createElement("li");
    

    if (todos[i].isDone === true) {
      listItem.classList.add("done");
    }

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.textContent = "Delete";
    if (todos[i].isDone === true) {
      todoDeleteButton.classList.add("buttonDoneDelete");
    }
    todoDeleteButton.classList.add("todoDeleteButton");
    todoDeleteButton.dataset.index = i;
    todoDeleteButton.addEventListener("click", deleteTodo);
    

    const todoDoneButton = document.createElement("button");
    todoDoneButton.textContent = "Done";
    if (todos[i].isDone === true) {
      todoDoneButton.classList.add("buttonDone");
    }
    todoDoneButton.classList.add("todoDoneButton");
    todoDoneButton.dataset.index = i;
    todoDoneButton.addEventListener("click", doneTodo);

    const itemTextC = document.createElement("div");
    const itemText = document.createElement("p");

    if (todos[i].isDone === true) {
      itemText.classList.add("doneText");
    }

    itemText.append(todos[i].text);
    itemTextC.append(itemText);

    listItem.appendChild(todoDoneButton);
    listItem.append(itemTextC);
    listItem.appendChild(todoDeleteButton);

    if (i % 2 === 0) {
      listItem.classList.add("listOdd");
    }

    if (todos[i].isDone === true) {
      listItem.classList.add("doneItem");
    }

    todoList.appendChild(listItem);
  }

  if (todos.length < 1) {
    emptyState.style.display = "block"
    todoList.style.display = "none";
    
  } else {
    emptyState.style.display = "none"
    todoList.style.display = "flex";
  }
}

function doneTodo(event) {
  console.log("Marked as done");

  todoDeleteIndex = event.target.dataset.index;

  console.log("INDEX: ", todoDeleteIndex);

  todos[todoDeleteIndex].isDone = !todos[todoDeleteIndex].isDone;

  console.log(todos);

  drawToDoList();
}

function deleteTodo(event) {
  console.log("Delete button index", event.target.dataset.index);

  todoDeleteIndex = event.target.dataset.index;

  todos.splice(todoDeleteIndex, 1);

  drawToDoList();
}

function deleteAll() {
  console.log(todos.length);
  console.log("Delete all");
  
  while (todos.length > 0) {
    todos.pop();
  }

  drawToDoList();
}

function addTodo(event) {
  event.preventDefault();

  inputTodo.ariaValueMax;

  todos.push({
    text: inputTodo.value,
    isDone: false,
  });

  console.log(todos);

  form.reset();

  drawToDoList();
}

form.addEventListener("submit", addTodo);