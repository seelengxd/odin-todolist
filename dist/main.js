class Todo{
  constructor(title, description, dueDate, priority){
    self.title = title;
    self.description = description;
    self.dueDate = dueDate;
    self.priority = priority;
  }

  edit(title, description, dueDate, priority){
    if (title) self.title = title;
    if (description) self.description = description;
    if (dueDate) self.dueDate = dueDate;
    if (priority) self.priority = priority;
  
  }
}

class Project{
  constructor(name){
    self.name = name;
    self.store = {};
    self.nextIndex = 0;
  }

  addTodo(title, description, dueDate, priority){
    todo = new Todo(title, description, dueDate, priority);
    self.arr[self.nextIndex] = todo
  }
}

const DOMStuff = (function(){
  const boardList = document.querySelector("aside")
  const todoList = document.querySelector('#todos')

  function clearElement(ele){
    while (ele.firstChild){
      ele.removeChild(ele.firstChild);
    }
  }
  function clearTodo(){
    clearElement(todoList);
  }

  function addTodo(todo){

  }

  function viewTodo(todo){

  }

  function deleteTodo(todo){

  }

  return {clearElement, clearTodo}
})()

const MainHandler = (function(){
  const defaultProject = new Project('default');
  const projects = [defaultProject];
  let currentProject = defaultProject;
  todo = defaultProject.addTodo('Task 1');
})