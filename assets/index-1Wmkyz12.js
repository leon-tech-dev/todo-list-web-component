var u=Object.defineProperty;var p=(s,d,t)=>d in s?u(s,d,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[d]=t;var l=(s,d,t)=>p(s,typeof d!="symbol"?d+"":d,t);(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();function h(s){localStorage.setItem("todos",JSON.stringify(s))}function f(){const s=localStorage.getItem("todos");return s?JSON.parse(s):[]}const g=":host{display:block;font-family:Arial,sans-serif;max-width:500px;margin:2rem auto;background-color:#f8f9fa;padding:2rem;border-radius:8px;box-shadow:0 4px 6px #0000001a;position:relative}h2{color:#343a40;text-align:center;margin-bottom:1.5rem}.todo-input{display:flex;margin-bottom:1.5rem}input[type=text]{flex-grow:1;padding:.75rem;font-size:1rem;border:1px solid #ced4da;border-radius:4px 0 0 4px;transition:border-color .3s ease}input[type=text]:focus{outline:none;border-color:#007bff}button{padding:.75rem 1.5rem;font-size:1rem;background-color:#007bff;color:#fff;border:none;cursor:pointer;transition:background-color .3s ease}button:hover{background-color:#0056b3}#addTodo{border-radius:0 4px 4px 0}ul{list-style-type:none;padding:0}li{display:flex;align-items:center;padding:1rem;background-color:#fff;border:1px solid #e9ecef;border-radius:4px;margin-bottom:.5rem;transition:background-color .3s ease}li:hover{background-color:#f1f3f5}li input[type=checkbox]{margin-right:1rem}.todo-text{flex-grow:1;margin-right:1rem}.completed .todo-text{text-decoration:line-through;color:#6c757d}.edit-input{flex-grow:1;padding:.5rem;font-size:1rem;border:1px solid #ced4da;border-radius:4px;margin-right:1rem}.button-group{display:flex;gap:.5rem}.edit-btn,.delete-btn{padding:.4rem .8rem;font-size:.875rem;border-radius:4px;transition:background-color .3s ease}.edit-btn{background-color:#28a745}.edit-btn:hover{background-color:#218838}.delete-btn{background-color:#dc3545}.delete-btn:hover{background-color:#c82333}.filters{display:flex;justify-content:center;margin-bottom:1rem}.filter-btn{margin:0 .5rem;padding:.5rem 1rem;background-color:#f8f9fa;border:1px solid #ced4da;border-radius:4px;color:#495057;cursor:pointer;transition:all .3s ease}.filter-btn:hover,.filter-btn.active{background-color:#007bff;border-color:#007bff;color:#fff}.todo-footer{display:flex;justify-content:space-between;align-items:center;margin-top:1rem;padding-top:1rem;border-top:1px solid #e9ecef}#todoCount{color:#6c757d}#clearCompleted{background-color:#6c757d;color:#fff;border:none;padding:.5rem 1rem;border-radius:4px;cursor:pointer;transition:background-color .3s ease}#clearCompleted:hover{background-color:#5a6268}li{display:flex;align-items:center;padding:.5rem;background-color:#fff;border-radius:4px;margin-bottom:.5rem;cursor:move}.drag-handle{margin-right:.5rem;cursor:move;color:#aaa}li.dragging{opacity:.5;border:2px dashed #aaa}li:hover .drag-handle{color:#333}.github-badge{position:absolute;top:10px;right:10px}.github-badge img{width:30px;height:30px;transition:opacity .3s ease}.github-badge img:hover{opacity:.8}",m=[{id:1,text:"Learn Web Components",completed:!0},{id:2,text:"Build a Todo List app",completed:!1},{id:3,text:"Deploy to GitHub Pages",completed:!1},{id:4,text:"Write project documentation",completed:!1},{id:5,text:"Share project with community",completed:!1}];class b extends HTMLElement{constructor(){super();l(this,"todos",[]);l(this,"shadow");l(this,"filter","all");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.loadTodos(),this.addEventListeners(),this.initDragAndDrop()}render(){this.shadow.innerHTML=`
    <style>${g}</style>
    <h2>My Todo List</h2>
    <a href="https://github.com/leon-tech-dev/todo-list-web-component" target="_blank" class="github-badge">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
    </a>
    <div class="todo-input">
      <input type="text" placeholder="Add a new todo">
      <button id="addTodo">Add</button>
    </div>
    <div class="filters">
      <button id="filterAll" class="filter-btn active">All</button>
      <button id="filterActive" class="filter-btn">Active</button>
      <button id="filterCompleted" class="filter-btn">Completed</button>
    </div>
    <ul></ul>
    <div class="todo-footer">
      <span class="todo-count"></span>
      <button id="clearCompleted">Clear completed</button>
    </div>
    `,this.updateTodoList()}initDragAndDrop(){const t=this.shadow.querySelector("ul");t&&t.addEventListener("dragover",e=>e.preventDefault())}addEventListeners(){var r,i,a,n;const t=this.shadow.querySelector("input"),e=this.shadow.querySelector("#addTodo"),o=this.shadow.querySelector("ul");e==null||e.addEventListener("click",()=>this.addTodo()),t==null||t.addEventListener("keypress",c=>{c.key==="Enter"&&this.addTodo()}),o==null||o.addEventListener("click",this.handleTodoAction.bind(this)),(r=this.shadow.querySelector("#filterAll"))==null||r.addEventListener("click",()=>this.setFilter("all")),(i=this.shadow.querySelector("#filterActive"))==null||i.addEventListener("click",()=>this.setFilter("active")),(a=this.shadow.querySelector("#filterCompleted"))==null||a.addEventListener("click",()=>this.setFilter("completed")),(n=this.shadow.querySelector("#clearCompleted"))==null||n.addEventListener("click",()=>this.clearCompleted())}clearCompleted(){this.todos=this.todos.filter(t=>!t.completed),this.saveTodos(),this.updateTodoList()}handleTodoAction(t){const e=t.target,o=Number(e.dataset.id);e.tagName==="INPUT"&&e.type==="checkbox"?this.toggleTodo(o):e.classList.contains("delete-btn")?this.deleteTodo(o):e.classList.contains("edit-btn")&&this.editTodo(o)}addTodo(){const t=this.shadow.querySelector("input"),e=t.value.trim();if(e){const o={id:Date.now(),text:e,completed:!1};this.todos.unshift(o),this.updateTodoList(),t.value="",this.saveTodos()}}toggleTodo(t){const e=this.todos.find(o=>o.id===t);e&&(e.completed=!e.completed,this.updateTodoList(),this.saveTodos())}deleteTodo(t){this.todos=this.todos.filter(e=>e.id!==t),this.updateTodoList(),this.saveTodos()}editTodo(t){const e=this.shadow.querySelector(`li[data-id="${t}"]`),o=this.todos.find(r=>r.id===t);if(e&&o){const r=e.querySelector(".todo-text"),i=document.createElement("input");i.type="text",i.value=o.text,i.className="edit-input",r==null||r.replaceWith(i),i.focus();const a=()=>{o.text=i.value.trim(),this.updateTodoList(),this.saveTodos()};i.addEventListener("blur",a),i.addEventListener("keypress",n=>{n.key==="Enter"&&a()})}}updateTodoList(){const t=this.shadow.querySelector("ul");t&&(t.innerHTML=this.getFilteredTodos().map(e=>`
            <li data-id="${e.id}" class="${e.completed?"completed":""}" draggable="true">
              <span class="drag-handle">☰</span>
              <input type="checkbox" ${e.completed?"checked":""}>
              <span class="todo-text">${e.text}</span>
              <div class="button-group">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
              </div>
            </li>
          `).join(""),t.querySelectorAll("li").forEach(e=>{const o=Number(e.dataset.id),r=e.querySelector('input[type="checkbox"]'),i=e.querySelector(".edit-btn"),a=e.querySelector(".delete-btn");r==null||r.addEventListener("change",()=>this.toggleTodo(o)),i==null||i.addEventListener("click",()=>this.editTodo(o)),a==null||a.addEventListener("click",()=>this.deleteTodo(o)),e.addEventListener("dragstart",this.dragStart.bind(this)),e.addEventListener("dragover",this.dragOver.bind(this)),e.addEventListener("drop",this.drop.bind(this)),e.addEventListener("dragend",this.dragEnd.bind(this))})),this.updateFilterButtons(),this.updateTodoCount()}updateTodoCount(){const t=this.todos.filter(o=>!o.completed).length,e=this.shadow.querySelector(".todo-count");e&&(e.textContent=`${t} item${t!==1?"s":""} left`)}loadTodos(){const t=f();t&&t.length>0?(console.log(t),this.todos=t):(this.todos=m,this.saveTodos()),this.updateTodoList()}setFilter(t){this.filter=t,this.updateTodoList()}updateFilterButtons(){var e;this.shadow.querySelectorAll(".filter-btn").forEach(o=>o.classList.remove("active")),(e=this.shadow.querySelector(`#filter${this.filter.charAt(0).toUpperCase()+this.filter.slice(1)}`))==null||e.classList.add("active")}getFilteredTodos(){switch(this.filter){case"active":return this.todos.filter(t=>!t.completed);case"completed":return this.todos.filter(t=>t.completed);default:return this.todos}}dragStart(t){var o;const e=t.target;e.tagName==="LI"&&((o=t.dataTransfer)==null||o.setData("text/plain",e.dataset.id||""),e.classList.add("dragging"))}dragOver(t){var r,i;t.preventDefault();const o=t.target.closest("li");if(o&&!o.classList.contains("dragging")){const a=o.getBoundingClientRect();t.clientY-a.top-a.height/2<0?(r=o.parentElement)==null||r.insertBefore(this.shadow.querySelector(".dragging"),o):(i=o.parentElement)==null||i.insertBefore(this.shadow.querySelector(".dragging"),o.nextElementSibling)}}drop(t){t.preventDefault()}dragEnd(t){const e=t.target;e.tagName==="LI"&&(e.classList.remove("dragging"),this.updateTodosOrder())}updateTodosOrder(){const t=this.shadow.querySelector("ul");if(t){const e=Array.from(t.querySelectorAll("li")).map(o=>Number(o.dataset.id));this.todos=e.map(o=>this.todos.find(r=>r.id===o)).filter(Boolean),this.saveTodos()}}saveTodos(){h(this.todos)}}customElements.define("todo-list",b);
