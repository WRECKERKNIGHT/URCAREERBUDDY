import { archetypes } from './archetypes.js';

export function initEducationToolkit(rootSelector = '#report-output-stage') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const card = document.createElement('div');
  card.className = 'vt-card education-toolkit';
  card.innerHTML = `
    <h4>Skill Gap Tracker (MVP)</h4>
    <p style="font-size:0.9rem;">Select a career to compare your simulated profile and see suggested learning paths.</p>
    <select id="edu-career-select" style="margin-top:8px; padding:8px; border:1px solid var(--color-border-dark); background:var(--color-bg-base);">
      <option value="">Choose career...</option>
    </select>
    <div id="edu-gap-output" style="margin-top:10px;"></div>
  `;
  root.prepend(card);

  const select = card.querySelector('#edu-career-select');
  const out = card.querySelector('#edu-gap-output');

  // populate careers from archetypes primary titles
  Object.values(archetypes).forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.careers.primary.title;
    opt.innerText = a.careers.primary.title;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const career = select.value;
    if (!career) { out.innerHTML = ''; return; }

    // rudimentary gap: random suggestions based on keywords
    const suggestions = [];
    if (/Machine|AI|Data|Cloud/i.test(career)) {
      suggestions.push('Take an introductory ML course (Coursera/edX)');
      suggestions.push('Hands-on projects: Kaggle or open-source');
    } else if (/Designer|Product/i.test(career)) {
      suggestions.push('Build a portfolio in Figma and Blender');
      suggestions.push('Follow UI/UX micro-courses (Coursera, Interaction Design Foundation)');
    } else {
      suggestions.push('Review foundational courses related to the role');
    }

    out.innerHTML = `
      <strong>Suggested learning steps:</strong>
      <ul style="margin-top:8px;">
        ${suggestions.map(s=>`<li>${s}</li>`).join('')}
      </ul>
    `;
  });
}
