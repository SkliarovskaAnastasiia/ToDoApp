(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function d(t,e){try{const n=JSON.stringify(e);localStorage.setItem(t,n)}catch(n){console.log(n)}}function m(t){try{const e=localStorage.getItem(t);return e===null?void 0:JSON.parse(e)}catch(e){console.log(e)}}function y(t){try{localStorage.removeItem(t)}catch(e){console.log(e)}}const L=()=>{document.body.classList.add("dark-theme"),d("darkmode","active")},E=()=>{document.body.classList.remove("dark-theme"),y("darkmode")};let f=m("darkmode");f==="active"&&L();document.querySelector(".js-theme-btn").addEventListener("click",()=>{f=m("darkmode"),f!=="active"?L():E()});const s={formEl:document.querySelector(".js-form"),tasksListEl:document.querySelector(".js-list"),textContentOfEmptyList:document.querySelector(".js-empty-item"),clearTasksBtn:document.querySelector(".js-clear-taskts-btn"),tasksQuantity:document.querySelector(".js-quantity"),filters:document.querySelectorAll(".js-filter-btn")};function v(t){const e=t.filter(l=>!l.completed).length,n=e===1?"task":"tasks";s.tasksQuantity.textContent=`${e} ${n} left`}function g(t){const e=t.target.closest(".js-list-item");e&&setTimeout(()=>e.classList.add("dragging"),0),document.body.classList.add("no-scroll")}function k(t){const e=t.target.closest(".js-list-item");e&&e.classList.remove("dragging"),document.body.classList.remove("no-scroll")}function b(){s.tasksListEl.addEventListener("dragstart",g),s.tasksListEl.addEventListener("dragend",k),s.tasksListEl.addEventListener("touchstart",g),s.tasksListEl.addEventListener("touchend",k)}function p(t,e){const n=s.tasksListEl.querySelector(".dragging"),l=[...s.tasksListEl.querySelectorAll(".js-list-item:not(.dragging)")],r=e?t.touches[0].clientY:t.clientY;let i=l.find(a=>r<=a.getBoundingClientRect().top+a.offsetHeight/2);s.tasksListEl.insertBefore(n,i),C()}function S(t){t.preventDefault(),p(t,!1)}function x(t){p(t,!0)}function T(t,e){const n=document.createElement("li");return n.className="list-item js-list-item",n.id=`task-${t.id}`,n.draggable="true",n.innerHTML=`
  <input class="checkbox js-checkbox visually-hidden" type="checkbox" id="${e}"/>
  <label class="checkbox-label" for="${e}">
     <span class="custom-checkbox">
        <svg class="custom-checkbox-icon" width="10px" height="10px">
          <use href="/ToDoApp/assets/symbol-defs-BP4IDnnM.svg#icon-icon-check"></use>
        </svg>
     </span>
     <p class="task-text">${t.text}</p>
  </label>
  <button class="delate-btn" id="btn-${t.id}">
     <svg class="btn-icon">
         <use href="/ToDoApp/assets/symbol-defs-BP4IDnnM.svg#icon-icon-cross"></use>
     </svg>
  </button>
  `,n}function j(t){s.tasksListEl.innerHTML="",t.length?(s.textContentOfEmptyList.classList.add("is-hidden"),s.clearTasksBtn.disabled=!1):(s.textContentOfEmptyList.classList.remove("is-hidden"),s.clearTasksBtn.disabled=!0),t.forEach((e,n,l)=>{const r=T(e,n);s.tasksListEl.append(r);const i=r.querySelector(".js-checkbox");i.addEventListener("change",a=>{l[n].completed=a.currentTarget.checked,d("tasks",l),u(c)}),i.checked=e.completed,r.querySelector(`#btn-${e.id}`).addEventListener("click",()=>{O(e.id)})})}function u(t){let e=[];switch(t){case"active":{e=o.filter(n=>!n.completed);break}case"completed":{e=o.filter(n=>n.completed);break}default:e=[...o]}j(e),v(e),b(),s.tasksListEl.addEventListener("dragover",S),s.tasksListEl.addEventListener("dragenter",n=>n.preventDefault()),s.tasksListEl.addEventListener("touchmove",x)}let o=m("tasks")||[],c="all";o.length&&(s.textContentOfEmptyList.classList.add("is-hidden"),u(c),s.clearTasksBtn.addEventListener("click",h));function q(t){t.preventDefault();const e=s.formEl.elements.task.value.trim();if(e==="")return;const n={id:Date.now(),text:e,completed:!1};o.push(n),u(c),s.textContentOfEmptyList.classList.add("is-hidden"),d("tasks",o),s.clearTasksBtn.addEventListener("click",h),t.currentTarget.reset()}s.formEl.addEventListener("submit",q);function h(){c==="all"?o=[]:c==="active"?o=o.filter(t=>t.completed):c==="completed"&&(o=o.filter(t=>!t.completed)),d("tasks",o),u(c),o.length||(s.textContentOfEmptyList.classList.toggle("is-hidden"),s.clearTasksBtn.disabled=!0)}function O(t){o=o.filter(e=>e.id!==t),d("tasks",o),u(c),s.tasksListEl.children.length||s.textContentOfEmptyList.classList.remove("is-hidden")}s.filters.forEach(t=>{t.addEventListener("click",e=>{document.querySelector(".js-filter-btn.active").classList.remove("active"),e.target.classList.add("active"),c=e.target.id,u(c)})});function C(){o=[...s.tasksListEl.querySelectorAll(".js-list-item")].map(t=>({id:t.id,text:t.querySelector(".task-text").textContent,completed:t.querySelector(".js-checkbox").checked})),console.log(o),d("tasks",o)}
//# sourceMappingURL=index.js.map
