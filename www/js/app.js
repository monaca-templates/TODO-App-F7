// Global variables
const $$ = Dom7;
const LOCALSTORAGE_KEY = 'MONACA_TODO_APP';
let imgTag = '';
let todos = [];

// Add Picture from Camera Plugin (on Phone)
function addTodoPicture() {
  navigator.camera.getPicture(addTodo, function () {
    alert('Failed to get camera.');
  }, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    targetWidth: 100,
    targetHeight: 100
  });
}

// Add Todo element to the todo-list element
function addTodo(camera_url) {
  const title = document.getElementById('todo-title').value;
  const body = document.getElementById('todo-body').value;
  if (camera_url) imgTag = `<img src="data:image/jpeg;base64,${camera_url}">`
  render(body, title, imgTag);
  saveToMemory({body, title, imgTag});
  clearInputs();
};

// Render each todo element
function render(body, title, img) {
  document.getElementById('todo-list').innerHTML += 
  `
    <div class="card block block-strong">
      <div class="row">
        <div class="col-25">${img}</div>
        <div class="col-75">
          <div class="margin"><b>${title}</b></div>
          <div class="margin">${body}</div>
        </div>
      </div>
    </div>
  `;
}

// Clear all todo items
function clearData() {
  todos = [];
  localStorage.removeItem(LOCALSTORAGE_KEY);
  clearInputs();
  document.getElementById('todo-list').innerHTML = '';
}

// Clear input
function clearInputs() {
  imgTag = '';
  $$('input#todo-title').val('');
  $$('input#todo-body').val('');
  $$('input#pic-file').val('');
}

// Add picture from file browser (on Desktop)
function savePic(event) {
  const reader = new FileReader();
  reader.onload = function () {
    imgTag = `<img src="${reader.result}" style="max-width:100px;width:100%">`
  }
  reader.readAsDataURL(event.target.files[0]);
}

// Save to memory (localstorage)
function saveToMemory(todo) {
  todos.push(todo);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todos));
}

// Init Framework7
function initFramework7() {

  // Framework7 App main instance
  const app = new Framework7({
    el: '#app', // App root element
    id: 'todo.sampleapp', // App bundle ID
    name: 'TODO app', // App name
    theme: 'auto', // Automatic theme detection
    statusbar: {
      enabled: false,
    }
  });

  // Init/Create main view
  app.views.create('.view-main', {
    url: '/'
  });
}

// Load data from localstorage
function loadDataFromMemory() {
  try {
    todos = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  } catch (e) {
    console.error(e);
    todos = []
  }
  if (todos && todos.length > 0) {
    todos.forEach(todo => render(todo.title, todo.body, todo.imgTag))
  }
}

// Main function
function main() {
  initFramework7();
  loadDataFromMemory()
}

// loading
main();