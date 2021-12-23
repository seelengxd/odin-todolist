class Todo{
  constructor(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  edit(title, description, dueDate, priority){
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) this.dueDate = dueDate;
    if (priority) this.priority = priority;
  
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
    const p = document.createElement('div');
    console.log(todo);
    p.textContent = todo.title;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    task.append(p, checkbox);
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

  return {clearElement, clearTodo, addTodo, renderAddForm}
})()

const MainHandler = (function(){
  const defaultProject = new Project('default');
  const projects = [defaultProject];
  let currentProject = defaultProject;

  function addTodo(title, description, dueDate, priority){
    [index, newTodo] = currentProject.addTodo(title, description, dueDate, priority);
    DOMStuff.addTodo(newTodo, index);
  }

  return { addTodo };
})();

DOMStuff.renderAddForm();