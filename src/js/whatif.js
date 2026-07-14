export function initWhatIfSandbox(rootSelector = '#report-output-stage') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const panel = document.createElement('div');
  panel.className = 'vt-card whatif-sandbox';
  panel.innerHTML = `
    <h4>What-If Timeline Sandbox (MVP)</h4>
    <p style="font-size:0.9rem;">Drag milestones to build a 3-step timeline.</p>
    <div id="wf-steps" style="display:flex; gap:8px; margin-top:8px;"></div>
    <button id="wf-run" class="btn btn-primary" style="margin-top:8px;">Simulate Outcome</button>
    <div id="wf-result" style="margin-top:8px;"></div>
  `;
  root.prepend(panel);

  const steps = panel.querySelector('#wf-steps');
  ['Cert/Degree','Internship','Job/Bootcamp'].forEach((s,i)=>{
    const el = document.createElement('div');
    el.className='track-selection-card'; el.style.padding='8px'; el.innerText=s; el.draggable=true;
    el.dataset.idx=i; steps.appendChild(el);
  });

  let order = [0,1,2];
  steps.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', e.target.dataset.idx));
  steps.addEventListener('dragover', e=> e.preventDefault());
  steps.addEventListener('drop', e=>{
    e.preventDefault(); const from=e.dataTransfer.getData('text/plain'); const toEl=e.target.closest('.track-selection-card');
    if(!toEl) return; const fromEl=steps.querySelector(`[data-idx="${from}"]`); if(!fromEl||fromEl===toEl) return; const next=toEl.nextSibling; steps.insertBefore(fromEl,next);
  });

  panel.querySelector('#wf-run').addEventListener('click', ()=>{
    const result = Array.from(steps.children).map(n=>n.innerText).join(' → ');
    panel.querySelector('#wf-result').innerHTML = `<strong>Projected Path:</strong> ${result}`;
  });
}
