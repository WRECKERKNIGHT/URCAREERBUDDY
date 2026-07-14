export function initFeedback() {
  if (document.getElementById('ucb-feedback-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'ucb-feedback-btn';
  btn.className = 'btn';
  btn.style.position = 'fixed';
  btn.style.right = '18px';
  btn.style.bottom = '18px';
  btn.style.zIndex = 6000;
  btn.style.padding = '10px 14px';
  btn.style.borderRadius = '8px';
  btn.innerText = 'Feedback';
  document.body.appendChild(btn);

  const modal = document.createElement('div');
  modal.className = 'modal-overlay hidden';
  modal.id = 'ucb-feedback-modal';
  modal.innerHTML = `
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
  `;
  document.body.appendChild(modal);

  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  modal.querySelector('#ucb-feedback-close').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  const send = modal.querySelector('#ucb-feedback-send');
  send.addEventListener('click', () => {
    const text = document.getElementById('ucb-feedback-text').value.trim();
    if (!text) { alert('Please write feedback before sending.'); return; }

    const key = 'ucb_feedback_submissions';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({ text, ts: new Date().toISOString(), url: location.pathname });
    localStorage.setItem(key, JSON.stringify(arr));

    alert('Thanks for your feedback — saved locally.');
    modal.classList.add('hidden');
  });
}
