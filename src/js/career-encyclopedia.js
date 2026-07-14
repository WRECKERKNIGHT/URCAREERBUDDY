import { archetypes } from './archetypes.js';

export function initEncyclopedia(rootSelector = '#report-output-stage') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const panel = document.createElement('div');
  panel.className = 'vt-card encyclopedia-panel';
  panel.style.padding = '1rem';
  panel.innerHTML = `
    <h4 style="margin-bottom:0.6rem;">Career Encyclopedia (MVP)</h4>
    <p style="font-size:0.9rem; margin-bottom:0.8rem;">Browse archetype profiles and open deep-dive cards.</p>
    <div id="encyclopedia-list" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px;"></div>
  `;
  root.prepend(panel);

  const list = panel.querySelector('#encyclopedia-list');
  Object.values(archetypes).forEach(a => {
    const card = document.createElement('div');
    card.className = 'vt-card career-card';
    card.style.padding = '0.8rem';
    card.innerHTML = `
      <strong style="display:block; font-size:1rem; margin-bottom:6px;">${a.title}</strong>
      <div style="font-size:0.85rem; color:var(--color-text-body); margin-bottom:8px;">${a.tagline}</div>
      <button class="btn btn-secondary" data-id="${a.id}">Open Profile</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => openProfile(a.id));
    list.appendChild(card);
  });

  function openProfile(id) {
    const a = archetypes[id];
    if (!a) return;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="vt-card modal-container" style="max-width:760px;">
        <div class="modal-header">
          <h4 style="margin:0;">${a.title}</h4>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-weight:700;">${a.tagline}</p>
          <p>${a.description}</p>
          <h5 style="margin-top:12px;">Sample Career: ${a.careers.primary.title}</h5>
          <p>${a.careers.primary.description}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" id="encyc-action">Save to Plan</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close-btn').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    modal.querySelector('#encyc-action').addEventListener('click', () => {
      alert('Saved to your plan (placeholder)');
      modal.remove();
    });
  }
}
