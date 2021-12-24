// import { format } from 'date-fns'; 
// console.log(format(new Date(2021, 11, 24), 'dd MMM yyyy'));

class Todo{
  constructor(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }

  edit(title, description, dueDate, priority){
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) this.dueDate = dueDate;
    if (priority) this.priority = priority;
  }

  do(){
    this.done = !this.done;
  }
}

class Project{
  constructor(name){
    this.name = name;
    this.store = {};
    this.nextIndex = 0;
  }

  addTodo(title, description, dueDate, priority){
    console.log({title, description, dueDate, priority})
    const todo = new Todo(title, description, dueDate, priority);
    console.log(todo);
    this.store[this.nextIndex] = todo
    this.nextIndex++;
    return [this.nextIndex - 1, todo]
  }
}

const DOMStuff = (function(){
  const boardList = document.querySelector("aside")
  const todoList = document.querySelector('#todos')
  const addFormButton = document.querySelector("#addformbutton")
  addFormButton.onclick = renderAddForm;

  function makeInput(label, type, name, options){
    const field = document.createElement('div');
    field.classList.add('field')
    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = label;
    let input = null;
    if (type=='textarea'){
      input = document.createElement('textarea');
      input.name = name
    } else if (type == 'select'){
      input = document.createElement('select')
      input.name = name
      for (const opt of options){
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        input.append(option);
      }

    } else {
      input = document.createElement('input');
      input.name = name;
      input.type = type;
    }
    field.append(fieldLabel, input);
    return field;


  }
  
  const addForm = (function(){
    const view = document.createElement('div');
    view.classList.add('view');
    const form = document.createElement('form');
    const close = document.createElement('button');
    close.textContent = 'X'
    close.id = 'close' 
    close.onclick = hideAddForm;
    const h2 = document.createElement('h2');
    h2.textContent = 'Add Todo';
    const title = makeInput('Title:', "text", 'title');
    const description = makeInput('Description:', 'textarea', 'description');
    const dueDate = makeInput('Due date:', 'date', 'dueDate');
    const priority = makeInput('Priority:', 'select', 'priority', ['low', 'med', 'high'])
    const submit = document.createElement('input');
    submit.type = 'Submit';
    submit.value = 'Add Todo';
    form.append(close, h2, title, description, dueDate, priority, submit);
    view.append(form);
    form.onsubmit = e => {
      e.preventDefault();
      MainHandler.addTodo();
    }
    return view;
    
  })();
  // const addForm = document.getElementById("addform");
  // addForm.remove();
  console.log(addForm);

  function clearElement(ele){
    while (ele.firstChild){
      ele.removeChild(ele.firstChild);
    }
  }
  function clearTodo(){
    clearElement(todoList);
  }

  function addTodo(todo, id){
    const task = document.createElement('div')
    task.dataset.id = id;
    task.classList.add('todo');
    const h3 = document.createElement('h3');
    console.log(todo);
    h3.textContent = todo.title;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const date = document.createElement('p');
    date.textContent = todo.dueDate;
    

    const left = document.createElement('div');
    left.classList.add('left');
    left.append(h3, date);
    task.append(left, checkbox);
    task.classList.add(todo.priority);
    todoList.append(task);
  }

  function viewTodo(todo){

  }

  function deleteTodo(todo){

  }

  function renderAddForm(){
    document.querySelector('body').append(addForm);

  }

  function hideAddForm(e){
    e.preventDefault();
    addForm.remove();

  }

  function extractAddForm() {
    const title = document.querySelector("[name='title']").value;
    const description = document.querySelector("[name='description']").value;
    const dueDate = document.querySelector("[name='dueDate']").value;
    const priority = document.querySelector("[name='priority']").value;
    // return {title, description, dueDate, priority};
    return {title, description, dueDate, priority};
  }

  function clearAddForm(){
    document.querySelector("[name='title']").value = '';
    document.querySelector("[name='description']").value = '';
    document.querySelector("[name='dueDate']").value = '';
    document.querySelector("[name='priority']").value = 'low';

  }

  return { clearElement, clearTodo, addTodo, extractAddForm, clearAddForm}
})();

const MainHandler = (function(){
  const defaultProject = new Project('default');
  const projects = [defaultProject];
  let currentProject = defaultProject;

  function addTodo(){
    console.log(DOMStuff.extractAddForm());
    const { title, description, dueDate, priority } = DOMStuff.extractAddForm();
    [index, newTodo] = currentProject.addTodo(title, description, dueDate, priority);
    DOMStuff.addTodo(newTodo, index);
    DOMStuff.addTodo(indexAndTodo[1], indexAndTodo[0]);
    DOMStuff.clearAddForm();
  }

  return { addTodo };
})();
