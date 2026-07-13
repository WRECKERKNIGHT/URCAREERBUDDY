export function initGamification(rootSelector = '#landing-view') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const panel = document.createElement('div');
  panel.className = 'vt-card gamification-panel';
  panel.style.marginTop = '1.6rem';
  panel.innerHTML = `
    <h4 style="margin-bottom:0.6rem;">Gamified Quickplay</h4>
    <p style="font-size:0.9rem; margin-bottom:0.8rem;">Drag your top 5 interests to rank them and earn micro-rewards.</p>
    <div id="gd-rank-list" style="display:flex; gap:8px; flex-wrap:wrap;"></div>
    <div style="margin-top:0.8rem; display:flex; gap:8px; align-items:center;">
      <div id="gd-points" style="font-weight:800;">Points: 0</div>
      <button id="gd-claim" class="btn btn-secondary">Claim Badge</button>
    </div>
  `;

  root.appendChild(panel);

  const items = ['Logic', 'Design', 'Social', 'Business', 'Research', 'Hands-on'];
  const list = panel.querySelector('#gd-rank-list');
  items.forEach((it, i) => {
    const el = document.createElement('div');
    el.draggable = true;
    el.className = 'track-selection-card';
    el.style.padding = '8px 12px';
    el.style.cursor = 'move';
    el.style.border = '1px dashed var(--color-border-dark)';
    el.innerText = it;
    el.dataset.index = i;
    list.appendChild(el);
  });

  let points = 0;
  const pointsEl = panel.querySelector('#gd-points');
  const claimBtn = panel.querySelector('#gd-claim');

  list.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.index);
  });

  list.addEventListener('dragover', (e) => { e.preventDefault(); });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const from = e.dataTransfer.getData('text/plain');
    const toEl = e.target.closest('.track-selection-card');
    if (!toEl) return;
    const fromEl = list.querySelector(`[data-index="${from}"]`);
    if (!fromEl || fromEl === toEl) return;

    // swap nodes
    const next = toEl.nextSibling;
    list.insertBefore(fromEl, next);

    // award points for ordering
    points += 5;
    pointsEl.innerText = `Points: ${points}`;
  });

  claimBtn.addEventListener('click', () => {
    alert('Badge claimed! (placeholder)');
  });
}
