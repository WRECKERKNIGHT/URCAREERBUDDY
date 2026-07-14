export function initExperientialBoard(rootSelector = '#report-output-stage') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const card = document.createElement('div');
  card.className = 'vt-card experiential-board';
  card.innerHTML = `
    <h4>Experiential Opportunities (MVP)</h4>
    <p style="font-size:0.9rem;">A small feed of micro-internships and mentor sessions.</p>
    <div id="exp-list" style="display:grid; gap:8px; margin-top:8px;"></div>
  `;
  root.prepend(card);

  const list = card.querySelector('#exp-list');
  const samples = [
    {title:'Data Sprint — 2 week', org:'OpenData Labs', stipend: '$200'},
    {title:'Design Mentorship — 4 sessions', org:'Creative Guild', stipend: 'Free'},
    {title:'Product Shadow — 1 day', org:'Startup Hub', stipend: '$50'}
  ];

  samples.forEach(s=>{
    const el = document.createElement('div');
    el.className='vt-card'; el.style.padding='8px'; el.innerHTML = `<strong>${s.title}</strong> <div style="font-size:0.85rem; color:var(--color-text-body);">${s.org} — ${s.stipend}</div> <button class="btn btn-secondary" style="margin-top:6px;">Apply</button>`;
    el.querySelector('button').addEventListener('click', ()=> alert('Applied (placeholder)'));
    list.appendChild(el);
  });
}
