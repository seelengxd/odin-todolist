import { format } from 'date-fns'; 
// console.log(format(new Date(2021, 11, 24), 'yyyy-MM-dd'));

class Todo{
  constructor(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    if (typeof dueDate == 'string'){
      let [year, month, day] = dueDate.split('-');
      month--;
      dueDate = new Date(year, month, day);

    }
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }

  edit(title, description, dueDate, priority){
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) {
      let [year, month, day] = dueDate.split('-');
      month--;
      dueDate = new Date(year, month, day);
      this.dueDate = dueDate;
    }
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

  removeTodo(id){
    delete this.store[id];
    console.log(this.store);
  }

  editTodo(id, title, description, dueDate, priority){
    if (id in this.store){
      this.store[id].edit(title, description, dueDate, priority)
      return true;
    }
    return false;
  }
}

const DOMStuff = (function(){
  const boardList = document.querySelector("aside")
  const todoList = document.querySelector('#todos')
  const addFormButton = document.querySelector("#addformbutton")
  addFormButton.onclick = renderAddForm;
  const addHandler = e => {
    MainHandler.addTodo();
    hideForm(e);
  };

  const editHandler = (todo, todoDOM, id) => e => {
    MainHandler.editTodo(todo, todoDOM, id);
    hideForm(e);
  }

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
    input.required = true;
    field.append(fieldLabel, input);
    return field;


  }
  
  const view = (function(){
    const view = document.createElement('div');
    view.classList.add('view');
    const form = document.createElement('form');
    const close = document.createElement('button');
    close.textContent = 'X'
    close.id = 'close' 
    close.onclick = hideForm;
    const h2 = document.createElement('h2');
    h2.textContent = 'Add Todo';
    const title = makeInput('Title:', "text", 'title');
    const description = makeInput('Description:', 'textarea', 'description');
    const dueDate = makeInput('Due date:', 'date', 'dueDate');
    const priority = makeInput('Priority:', 'select', 'priority', ['low', 'med', 'high'])
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Add Todo';
    form.append(close, h2, title, description, dueDate, priority, submit);
    view.append(form);
    form.onsubmit = addHandler;
    return {main:view, form, h2, title, description, dueDate, priority, submit};
    
  })();

  function clearElement(ele){
    while (ele.firstChild){
      ele.removeChild(ele.firstChild);
    }
  }
  function clearTodos(){
    clearElement(todoList);
  }

  function addTodo(todo, id, deleteCallback){
    const task = document.createElement('div')
    task.dataset.id = id;
    task.classList.add('todo');
    const h3 = document.createElement('h3');
    console.log(todo);
    h3.textContent = todo.title;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const date = document.createElement('p');
    date.textContent = format(todo.dueDate, 'dd MMM yyyy');
    

    const left = document.createElement('div');
    const right = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.onclick = deleteCallback(task);
    const viewButton = document.createElement('button');
    viewButton.textContent = 'view';
    viewButton.onclick = () => viewTodo(todo, task, id);
    left.classList.add('left');
    left.append(h3, date);
    right.append(checkbox, deleteButton, viewButton);
    right.classList.add('right');
    task.append(left, right);
    task.classList.add(todo.priority);
    todoList.append(task);
    return task;
  }

  function viewTodo(todo, todoDOM, id){
    // title, description, dueDate, priority
    view.h2.textContent = 'View Todo'
    view.title.querySelector('input').value = todo.title;
    view.description.querySelector('textarea').value = todo.description;
    view.dueDate.querySelector('input').value = format(todo.dueDate, 'yyyy-MM-dd');
    view.priority.querySelector('select').value = todo.priority;
    view.submit.value = 'Edit todo'
    view.form.onsubmit = editHandler(todo, todoDOM, id);
    console.log(view.onsubmit);
    document.querySelector('body').append(view.main);

  }

  function deleteTodo(todo){
    todo.remove();
  }

  function renderAddForm(){
    view.h2.textContent = 'Add Form';
    view.submit.value = 'Add Form';
    view.title.querySelector('input').value = '';
    view.description.querySelector('textarea').value = '';
    view.dueDate.querySelector('input').value = '';
    view.priority.querySelector('select').value = '';
    document.querySelector('body').append(view.main);

  }

  function hideForm(e){
    if (e) e.preventDefault();
    view.main.remove();

  }

  function extractForm() {
    const title = document.querySelector("[name='title']").value;
    const description = document.querySelector("[name='description']").value;
    const dueDate = document.querySelector("[name='dueDate']").value;
    const priority = document.querySelector("[name='priority']").value;
    return {title, description, dueDate, priority};
  }

  function clearForm(){
    document.querySelector("[name='title']").value = '';
    document.querySelector("[name='description']").value = '';
    document.querySelector("[name='dueDate']").value = '';
    document.querySelector("[name='priority']").value = 'low';

  }

  function editTodo(todo, todoDOM){
    todoDOM.querySelector('h3').textContent = todo.title;
    todoDOM.querySelector('p').textContent = format(todo.dueDate, 'dd MMM yyyy');
    todoDOM.classList.remove('low', 'med', 'high');
    todoDOM.classList.add(todo.priority);

  }

  return { clearElement, clearTodos, addTodo, extractForm, clearForm, deleteTodo, editTodo, hideForm }
})();

const MainHandler = (function(){
  const defaultProject = new Project('default');
  const projects = [defaultProject];
  let currentProject = defaultProject;

  function addTodo(){
    const { title, description, dueDate, priority } = DOMStuff.extractForm();
    const [ index, newTodo ] = currentProject.addTodo(title, description, dueDate, priority);
    const deleteCallback = domTodo => e => {
      e.preventDefault();
      deleteTodo(domTodo);
    }
    DOMStuff.addTodo(newTodo, index, deleteCallback);
    DOMStuff.clearForm();
  }

  function deleteTodo(todoDOM){
    const id = todoDOM.dataset.id;
    DOMStuff.deleteTodo(todoDOM);
    currentProject.removeTodo(id);

  }

  function editTodo(todo, todoDOM, id){
    const { title, description, dueDate, priority } = DOMStuff.extractForm();
    if (currentProject.editTodo(id, title, description, dueDate, priority)){
      DOMStuff.editTodo(todo, todoDOM)
    }
    
  }

  return { addTodo, editTodo };
})();
