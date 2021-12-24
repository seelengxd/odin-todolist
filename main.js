/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLFlBQVksU0FBUztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsc0NBQXNDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHdDQUF3QztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7IFxuLy8gY29uc29sZS5sb2coZm9ybWF0KG5ldyBEYXRlKDIwMjEsIDExLCAyNCksICdkZCBNTU0geXl5eScpKTtcblxuY2xhc3MgVG9kb3tcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSl7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgfVxuXG4gIGVkaXQodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSl7XG4gICAgaWYgKHRpdGxlKSB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgaWYgKGRlc2NyaXB0aW9uKSB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgaWYgKGR1ZURhdGUpIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgaWYgKHByaW9yaXR5KSB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIH1cblxuICBkbygpe1xuICAgIHRoaXMuZG9uZSA9ICF0aGlzLmRvbmU7XG4gIH1cbn1cblxuY2xhc3MgUHJvamVjdHtcbiAgY29uc3RydWN0b3IobmFtZSl7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnN0b3JlID0ge307XG4gICAgdGhpcy5uZXh0SW5kZXggPSAwO1xuICB9XG5cbiAgYWRkVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KXtcbiAgICBjb25zb2xlLmxvZyh7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eX0pXG4gICAgY29uc3QgdG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgIGNvbnNvbGUubG9nKHRvZG8pO1xuICAgIHRoaXMuc3RvcmVbdGhpcy5uZXh0SW5kZXhdID0gdG9kb1xuICAgIHRoaXMubmV4dEluZGV4Kys7XG4gICAgcmV0dXJuIFt0aGlzLm5leHRJbmRleCAtIDEsIHRvZG9dXG4gIH1cbn1cblxuY29uc3QgRE9NU3R1ZmYgPSAoZnVuY3Rpb24oKXtcbiAgY29uc3QgYm9hcmRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFzaWRlXCIpXG4gIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZG9zJylcbiAgY29uc3QgYWRkRm9ybUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkZm9ybWJ1dHRvblwiKVxuICBhZGRGb3JtQnV0dG9uLm9uY2xpY2sgPSByZW5kZXJBZGRGb3JtO1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnB1dChsYWJlbCwgdHlwZSwgbmFtZSwgb3B0aW9ucyl7XG4gICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdmaWVsZCcpXG4gICAgY29uc3QgZmllbGRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZmllbGRMYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgIGxldCBpbnB1dCA9IG51bGw7XG4gICAgaWYgKHR5cGU9PSd0ZXh0YXJlYScpe1xuICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgaW5wdXQubmFtZSA9IG5hbWVcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3NlbGVjdCcpe1xuICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKVxuICAgICAgaW5wdXQubmFtZSA9IG5hbWVcbiAgICAgIGZvciAoY29uc3Qgb3B0IG9mIG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0O1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBvcHQ7XG4gICAgICAgIGlucHV0LmFwcGVuZChvcHRpb24pO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0Lm5hbWUgPSBuYW1lO1xuICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGZpZWxkLmFwcGVuZChmaWVsZExhYmVsLCBpbnB1dCk7XG4gICAgcmV0dXJuIGZpZWxkO1xuXG5cbiAgfVxuICBcbiAgY29uc3QgYWRkRm9ybSA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IHZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2aWV3LmNsYXNzTGlzdC5hZGQoJ3ZpZXcnKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xvc2UudGV4dENvbnRlbnQgPSAnWCdcbiAgICBjbG9zZS5pZCA9ICdjbG9zZScgXG4gICAgY2xvc2Uub25jbGljayA9IGhpZGVBZGRGb3JtO1xuICAgIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBoMi50ZXh0Q29udGVudCA9ICdBZGQgVG9kbyc7XG4gICAgY29uc3QgdGl0bGUgPSBtYWtlSW5wdXQoJ1RpdGxlOicsIFwidGV4dFwiLCAndGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IG1ha2VJbnB1dCgnRGVzY3JpcHRpb246JywgJ3RleHRhcmVhJywgJ2Rlc2NyaXB0aW9uJyk7XG4gICAgY29uc3QgZHVlRGF0ZSA9IG1ha2VJbnB1dCgnRHVlIGRhdGU6JywgJ2RhdGUnLCAnZHVlRGF0ZScpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gbWFrZUlucHV0KCdQcmlvcml0eTonLCAnc2VsZWN0JywgJ3ByaW9yaXR5JywgWydsb3cnLCAnbWVkJywgJ2hpZ2gnXSlcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHN1Ym1pdC50eXBlID0gJ1N1Ym1pdCc7XG4gICAgc3VibWl0LnZhbHVlID0gJ0FkZCBUb2RvJztcbiAgICBmb3JtLmFwcGVuZChjbG9zZSwgaDIsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHN1Ym1pdCk7XG4gICAgdmlldy5hcHBlbmQoZm9ybSk7XG4gICAgZm9ybS5vbnN1Ym1pdCA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgTWFpbkhhbmRsZXIuYWRkVG9kbygpO1xuICAgIH1cbiAgICByZXR1cm4gdmlldztcbiAgICBcbiAgfSkoKTtcbiAgLy8gY29uc3QgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkZm9ybVwiKTtcbiAgLy8gYWRkRm9ybS5yZW1vdmUoKTtcbiAgY29uc29sZS5sb2coYWRkRm9ybSk7XG5cbiAgZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZSl7XG4gICAgd2hpbGUgKGVsZS5maXJzdENoaWxkKXtcbiAgICAgIGVsZS5yZW1vdmVDaGlsZChlbGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNsZWFyVG9kbygpe1xuICAgIGNsZWFyRWxlbWVudCh0b2RvTGlzdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUb2RvKHRvZG8sIGlkKXtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB0YXNrLmRhdGFzZXQuaWQgPSBpZDtcbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoJ3RvZG8nKTtcbiAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgY29uc29sZS5sb2codG9kbyk7XG4gICAgaDMudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgIFxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcbiAgICBcblxuICAgIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZWZ0LmNsYXNzTGlzdC5hZGQoJ2xlZnQnKTtcbiAgICBsZWZ0LmFwcGVuZChoMywgZGF0ZSk7XG4gICAgdGFzay5hcHBlbmQobGVmdCwgY2hlY2tib3gpO1xuICAgIHRhc2suY2xhc3NMaXN0LmFkZCh0b2RvLnByaW9yaXR5KTtcbiAgICB0b2RvTGlzdC5hcHBlbmQodGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiB2aWV3VG9kbyh0b2RvKXtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlVG9kbyh0b2RvKXtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQWRkRm9ybSgpe1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQoYWRkRm9ybSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVBZGRGb3JtKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhZGRGb3JtLnJlbW92ZSgpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0QWRkRm9ybSgpIHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT0ndGl0bGUnXVwiKS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT0nZGVzY3JpcHRpb24nXVwiKS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPSdkdWVEYXRlJ11cIikudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW25hbWU9J3ByaW9yaXR5J11cIikudmFsdWU7XG4gICAgLy8gcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5fTtcbiAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHl9O1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJBZGRGb3JtKCl7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPSd0aXRsZSddXCIpLnZhbHVlID0gJyc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPSdkZXNjcmlwdGlvbiddXCIpLnZhbHVlID0gJyc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPSdkdWVEYXRlJ11cIikudmFsdWUgPSAnJztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW25hbWU9J3ByaW9yaXR5J11cIikudmFsdWUgPSAnbG93JztcblxuICB9XG5cbiAgcmV0dXJuIHsgY2xlYXJFbGVtZW50LCBjbGVhclRvZG8sIGFkZFRvZG8sIGV4dHJhY3RBZGRGb3JtLCBjbGVhckFkZEZvcm19XG59KSgpO1xuXG5jb25zdCBNYWluSGFuZGxlciA9IChmdW5jdGlvbigpe1xuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdkZWZhdWx0Jyk7XG4gIGNvbnN0IHByb2plY3RzID0gW2RlZmF1bHRQcm9qZWN0XTtcbiAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gZGVmYXVsdFByb2plY3Q7XG5cbiAgZnVuY3Rpb24gYWRkVG9kbygpe1xuICAgIGNvbnNvbGUubG9nKERPTVN0dWZmLmV4dHJhY3RBZGRGb3JtKCkpO1xuICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSB9ID0gRE9NU3R1ZmYuZXh0cmFjdEFkZEZvcm0oKTtcbiAgICBbaW5kZXgsIG5ld1RvZG9dID0gY3VycmVudFByb2plY3QuYWRkVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICBET01TdHVmZi5hZGRUb2RvKG5ld1RvZG8sIGluZGV4KTtcbiAgICBET01TdHVmZi5hZGRUb2RvKGluZGV4QW5kVG9kb1sxXSwgaW5kZXhBbmRUb2RvWzBdKTtcbiAgICBET01TdHVmZi5jbGVhckFkZEZvcm0oKTtcbiAgfVxuXG4gIHJldHVybiB7IGFkZFRvZG8gfTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=