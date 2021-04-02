const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const clearButton = document.querySelector('clearBut')
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()



const generateTemplate = todo => {
    
    const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
    `;

    list.innerHTML += html;

};

addForm.addEventListener('submit', e => {
    
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if(todo.length){
      generateTemplate(todo);
      addForm.reset();
    }
});

list.addEventListener('click', e => {

 if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();
 }
})


const filterTodos = (term) => {

  Array.from(list.children)
    .filter((todo) => !todo.textContent.includes(term))
    .forEach((todo) => todo.classList.add('filtered'))

   
    Array.from(list.children)
    .filter((todo) => todo.textContent.includes(term))
    .forEach((todo) => todo.classList.remove('filtered'))
    
};

search.addEventListener('keyup', () =>  {
    const term = search.value.trim();
    filterTodos(term);
});

const Store = require('electron-store');
const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined