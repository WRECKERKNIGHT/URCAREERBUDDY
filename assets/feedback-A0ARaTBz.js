function s(){if(document.getElementById("ucb-feedback-btn"))return;const t=document.createElement("button");t.id="ucb-feedback-btn",t.className="btn",t.style.position="fixed",t.style.right="18px",t.style.bottom="18px",t.style.zIndex=6e3,t.style.padding="10px 14px",t.style.borderRadius="8px",t.innerText="Feedback",document.body.appendChild(t);const e=document.createElement("div");e.className="modal-overlay hidden",e.id="ucb-feedback-modal",e.innerHTML=`
    <div class="vt-card modal-container" style="max-width:680px;">
      <div class="modal-header">
        <h4 style="margin:0;">Send Feedback</h4>
        <button class="modal-close-btn" id="ucb-feedback-close">&times;</button>
      </div>
      <div class="modal-body">
        <textarea id="ucb-feedback-text" rows="6" style="width:100%; padding:8px; border:1px solid var(--color-border-dark); background:var(--color-bg-base); color:var(--color-text-body);"></textarea>
        <div style="margin-top:8px; display:flex; gap:8px; justify-content:flex-end;">
          <button id="ucb-feedback-send" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e),t.addEventListener("click",()=>{e.classList.remove("hidden")}),e.querySelector("#ucb-feedback-close").addEventListener("click",()=>e.classList.add("hidden")),e.addEventListener("click",d=>{d.target===e&&e.classList.add("hidden")}),e.querySelector("#ucb-feedback-send").addEventListener("click",()=>{const d=document.getElementById("ucb-feedback-text").value.trim();if(!d){alert("Please write feedback before sending.");return}const a="ucb_feedback_submissions",n=JSON.parse(localStorage.getItem(a)||"[]");n.push({text:d,ts:new Date().toISOString(),url:location.pathname}),localStorage.setItem(a,JSON.stringify(n)),alert("Thanks for your feedback — saved locally."),e.classList.add("hidden")})}export{s as initFeedback};
