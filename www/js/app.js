// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  el: '#app', // App root element
  id: 'todo.sampleapp', // App bundle ID
  name: 'TODO app', // App name
  theme: 'auto', // Automatic theme detection
  statusbar: {
    enabled: false,
  }
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

function addTodoPicture() {
  navigator.camera.getPicture(addTodo, function () {
    alert("Failed to get camera.");
  }, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    targetWidth: 100,
    targetHeight: 100
  });
}
let img_tag = '';
function addTodo(camera_url) {
  let title = document.getElementById("todo-title").value;
  let body = document.getElementById("todo-body").value;
  if (camera_url) img_tag = `<img src="data:image/jpeg;base64,${camera_url}">`
  document.getElementById("todo-list").innerHTML += `<div class="card block block-strong">
  <div class="row">
    <div class="col-25">${img_tag}</div>
    <div class="col-75">
      <div class="margin"><b>${title}</b></div>
      <div class="margin">${body}</div>
    </div>
  </div>
</div>`
  clearInputs();
};

function clearInputs() {
  img_tag = '';
  $$('input#todo-title').val('');
  $$('input#todo-body').val('');
  $$('input#pic-file').val('');
}

function savePic(event) {
  var reader = new FileReader();
  reader.onload = function () {
    img_tag = `<img src="${reader.result}" style="max-width:100px;width:100%">`
  }
  reader.readAsDataURL(event.target.files[0]);
}