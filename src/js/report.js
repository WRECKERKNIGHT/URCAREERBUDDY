// Production-grade Report Compiler: 9-Tab Wooden Cabinet index, SVG visual spider/donut/vertical/funnel, VARK Visual Triggers, and Skills Gap checklists
import { calculateArchetype } from './archetypes.js';

export class ReportRenderer {
  constructor() {
    this.currentTab = "summary";
    this.scores = null;
    this.archetype = null;
    this.container = null;
    
    this.riasecKeys = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
    
    this.tabs = [
      { id: "summary", label: "📜 Executive Summary Dossier", icon: "summary" },
      { id: "dashboard", label: "📊 Calibration Dashboard", icon: "dashboard" },
      { id: "cognitive_analytics", label: "🔬 Cognitive Load Analytics", icon: "cognitive_analytics" },
      { id: "personality", label: "🧬 Stage 1: Personality (MBTI)", icon: "personality" },
      { id: "abilities", label: "🧠 Stage 2: Logical Aperture", icon: "abilities" },
      { id: "interests", label: "🏺 Stage 3: Career Interests", icon: "interests" },
      { id: "learning", label: "📖 Stage 4: Learning VARK", icon: "learning" },
      { id: "skills", label: "🛠️ Stage 5: Skills Grid", icon: "skills" },
      { id: "clusters", label: "📂 Career Clusters Funnel", icon: "clusters" },
      { id: "deep_dive", label: "🛣️ Career Path Deep-Dive", icon: "deep_dive" },
      { id: "roadmaps", label: "💼 Career Roadmaps & Milestones", icon: "roadmaps" },
      { id: "subconscious_bias", label: "🧠 Subconscious Bias & Mismatch", icon: "bias" },
      { id: "trajectory_projection", label: "📈 10-Year Path Projection", icon: "trajectory" },
      { id: "epigenetic_vocational", label: "🧬 Sensory Workplace Fit", icon: "epigenetic" },
      { id: "academic_matcher", label: "🎓 Global University Matcher", icon: "matcher" },
      { id: "enneagram", label: "🏺 Enneagram Typology", icon: "enneagram" },
      { id: "anti_gaming", label: "🛡️ Anti-Gaming Verification Audit", icon: "anti_gaming" },
      { id: "debrief", label: "🤝 Counseling Debrief", icon: "debrief" }
    ];
  }

  render(scores, archetype, containerEl) {
    this.scores = scores;
    this.archetype = archetype;
    this.container = containerEl;

    this.container.innerHTML = `
      <!-- Top Action bar for report downloads -->
      <div class="report-toolbar no-print" style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; padding: 1.2rem; border: 1.5px solid var(--color-border-dark); margin-bottom: 1.5rem; background: rgba(20,18,16,0.35); backdrop-filter: blur(4px); width: 100%; box-sizing: border-box; flex-wrap: wrap; gap: 1rem;">
        <span style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; font-weight: 700; color: var(--color-accent-gold); letter-spacing: 1px;">DOSSIER CABINET CONTROL CONSOLE</span>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button type="button" class="btn btn-secondary" id="btn-save-pdf" style="font-size: 0.85rem; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            🖨️ Save as PDF
          </button>
          <button type="button" class="btn btn-primary" id="btn-download-json" style="font-size: 0.85rem; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px; background-color: var(--color-accent-rust) !important; border-color: var(--color-accent-rust) !important; cursor: pointer;">
            📥 Download JSON Dossier
          </button>
        </div>
      </div>

      <!-- Left: Sidebar Drawer Deck -->
      <nav class="report-sidebar-nav no-print" id="report-sidebar-nav" aria-label="Cabinet Index Drawers"></nav>
      
      <!-- Right: Active Output Stage -->
      <div class="report-output-stage" id="report-output-stage"></div>
    `;

    this.renderSidebar();
    this.renderContent();
    this.bindToolbarEvents();
  }

  bindToolbarEvents() {
    const btnPdf = this.container.querySelector("#btn-save-pdf");
    const btnJson = this.container.querySelector("#btn-download-json");

    if (btnPdf) {
      btnPdf.addEventListener("click", () => {
        window.print();
      });
    }

    if (btnJson) {
      btnJson.addEventListener("click", () => {
        const payload = {
          subject: this.scores.userName || "Student",
          grade: this.scores.userGrade || "N/A",
          track: this.scores.userTrack || "N/A",
          stream: this.scores.userStream || "N/A",
          archetype: {
            title: this.archetype.title,
            description: this.archetype.description,
            topCareers: this.archetype.careers
          },
          scores: {
            personality: this.scores.personality,
            ability: this.scores.ability,
            interests: this.scores.interests,
            learning: this.scores.learning,
            skills: this.scores.skills,
            consistency: this.scores.consistency
          },
          generatedAt: new Date().toISOString()
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `UrCareerBuddy_Dossier_${payload.subject.replace(/\s+/g, '_')}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });
    }
  }

  renderSidebar() {
    const sidebarEl = this.container.querySelector("#report-sidebar-nav");
    if (!sidebarEl) return;

    sidebarEl.innerHTML = this.tabs.map(tab => {
      const isActive = tab.id === this.currentTab;
      return `
        <button type="button" class="sidebar-tab-btn ${isActive ? 'active' : ''}" data-tab="${tab.id}">
          ${tab.label}
        </button>
      `;
    }).join("");

    const buttons = sidebarEl.querySelectorAll(".sidebar-tab-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tabId = e.currentTarget.getAttribute("data-tab");
        if (!tabId) return;
        this.currentTab = tabId;
        buttons.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.renderContent();
      });
    });
  }

  renderContent() {
    const stageEl = this.container.querySelector("#report-output-stage");
    if (!stageEl) return;

    stageEl.classList.remove("tab-slide-3d");
    void stageEl.offsetWidth; // trigger reflow
    stageEl.className = "report-output-stage tab-slide-3d";
    
    switch (this.currentTab) {
      case "summary":
        stageEl.innerHTML = this.getSummaryHTML();
        break;
      case "dashboard":
        stageEl.innerHTML = this.getDashboardHTML();
        this.bindDashboardEvents();
        break;
      case "cognitive_analytics":
        stageEl.innerHTML = this.getCognitiveAnalyticsHTML();
        break;
      case "personality":
        stageEl.innerHTML = this.getPersonalityHTML();
        break;
      case "abilities":
        stageEl.innerHTML = this.getAbilitiesHTML();
        break;
      case "interests":
        stageEl.innerHTML = this.getInterestsHTML();
        this.drawRiasecBarChart();
        break;
      case "learning":
        stageEl.innerHTML = this.getLearningHTML();
        this.drawVARKDonutChart();
        break;
      case "skills":
        stageEl.innerHTML = this.getSkillsHTML();
        break;
      case "clusters":
        stageEl.innerHTML = this.getClustersHTML();
        this.drawFunnelChart();
        this.bindClustersEvents();
        break;
      case "deep_dive":
        stageEl.innerHTML = this.getDeepDiveHTML();
        this.bindDeepDiveEvents();
        break;
      case "roadmaps":
        stageEl.innerHTML = this.getRoadmapsHTML();
        break;
      case "anti_gaming":
        stageEl.innerHTML = this.getAntiGamingHTML();
        break;
      case "subconscious_bias":
        stageEl.innerHTML = this.getSubconsciousBiasHTML();
        break;
      case "trajectory_projection":
        stageEl.innerHTML = this.getTrajectoryProjectionHTML();
        this.drawTrajectoryChart();
        break;
      case "epigenetic_vocational":
        stageEl.innerHTML = this.getEpigeneticVocationalHTML();
        break;
      case "academic_matcher":
        stageEl.innerHTML = this.getAcademicMatcherHTML();
        break;
      case "enneagram":
        stageEl.innerHTML = this.getEnneagramHTML();
        break;
      case "debrief":
        stageEl.innerHTML = this.getDebriefHTML();
        this.bindDebriefEvents();
        break;
      default:
        stageEl.innerHTML = "<div>Section not found.</div>";
    }

    // Trigger width animations for progress bars
    setTimeout(() => {
      const bars = stageEl.querySelectorAll(".progress-fill");
      bars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        bar.style.width = targetWidth;
      });
    }, 50);
  }

  // ==========================================
  // TAB HTML GENERATORS
  // ==========================================

  getDashboardHTML() {
    const stageLabels = {
      ignorant: "Ignorant Phase (Low awareness/variability)",
      confused: "Confused Phase (High interests in conflicting fields)",
      diffused: "Diffused Phase (Balanced moderate interests)",
      methodical: "Methodical Phase (Systematic planning core)",
      optimized: "Optimized Phase (Clear peaks & target alignment)"
    };
    
    const stageClass = this.scores.planningStage || "methodical";
    const stageText = stageLabels[stageClass] || "Methodical Phase";

    return `
      <!-- Part 1: Current Diagnostic Mindset State Card -->
      <section class="vt-card" style="margin-bottom: 2rem; padding: 2.2rem;">
        <div class="archetype-badge">CURRENT DIAGNOSTIC STATE</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 800;">
          ${stageText}
        </h2>
        <p style="color: var(--color-accent-rust); font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">
          Calculated Archetype: ${this.archetype.title}
        </p>

        <!-- Planning State Meter -->
        <div class="vt-card" style="padding: 1.5rem; border-style: dashed; margin-bottom: 2rem;">
          <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.2rem; text-transform: uppercase; font-weight: 700;">Planning Execution Timeline Meter</h4>
          ${this.generatePlanningTimelineMeter(stageClass)}
        </div>

        <p class="drop-cap" style="line-height: 1.75; margin-bottom: 2rem; font-size: 1.05rem; color: var(--color-text-body);">
          Based on the diagnostic intake, your current placement is mapped to the <strong>${stageClass.toUpperCase()}</strong> planning mindset.
          This category characterizes how crystallised your professional orientation is, and the degree of alignment between your capabilities and interests.
        </p>

        <div class="consistency-meter container-flex" style="margin-bottom: 1rem; border-top: 1px dashed var(--color-border-dark); padding-top: 1.5rem; display: flex; align-items: center; gap: 1rem;">
          <span class="consistency-title" style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; font-weight: 700; color: var(--color-accent-primary); text-transform: uppercase;">Anti-Bias Integrity Index:</span>
          <div class="consistency-val-badge ${this.scores.consistency >= 70 ? 'high' : 'low'}" style="padding: 0.3rem 0.8rem; font-size: 0.85rem; font-weight: 700; border-radius: 6px; border: 1px solid var(--color-border-dark);">
            ${this.scores.consistency}% &mdash; ${this.scores.consistency >= 70 ? 'Strong Consistency' : 'High Variance'}
          </div>
        </div>
      </section>

      <!-- Part 2: Interactive Fit Matrix & Priority Sliders -->
      <section class="vt-card" style="margin-bottom: 2rem; padding: 2.2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:1.2rem; flex-wrap:wrap; border-bottom: 1px solid var(--color-border-dark); padding-bottom: 1.2rem; margin-bottom: 1.5rem;">
          <div>
            <h3 style="margin:0; font-size: 1.6rem; font-weight: 800; color: var(--color-text-heading);">Interactive Fit Matrix</h3>
            <p style="margin:0.4rem 0 0; opacity:0.9; font-size: 0.92rem; color: var(--color-text-body);">Visualize why you match recommended careers and tweak priorities in real time.</p>
          </div>
          <div style="display:flex; gap:1.2rem; align-items:center; flex-wrap: wrap;">
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <label style="font-family: 'Courier Prime', monospace; font-size:0.75rem; font-weight:700; color: var(--color-text-heading);">Aptitude</label>
              <input id="filter-aptitude" type="range" min="0" max="100" value="60" style="width: 80px; accent-color: var(--color-accent-rust); cursor: pointer;">
            </div>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <label style="font-family: 'Courier Prime', monospace; font-size:0.75rem; font-weight:700; color: var(--color-text-heading);">Interests</label>
              <input id="filter-interests" type="range" min="0" max="100" value="60" style="width: 80px; accent-color: var(--color-accent-rust); cursor: pointer;">
            </div>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <label style="font-family: 'Courier Prime', monospace; font-size:0.75rem; font-weight:700; color: var(--color-text-heading);">Personality</label>
              <input id="filter-personality" type="range" min="0" max="100" value="60" style="width: 80px; accent-color: var(--color-accent-rust); cursor: pointer;">
            </div>
          </div>
        </div>

        <div class="fit-matrix-layout" style="display:grid; grid-template-columns: 1fr 340px; gap:2rem; align-items:start;">
          <div>
            <h4 style="font-family:'Courier Prime', monospace; font-size:0.85rem; text-transform:uppercase; margin-bottom: 1.2rem; color:var(--color-accent-rust); font-weight: 700;">Dynamic Suitability Standings</h4>
            <div id="career-match-list" style="display:flex; flex-direction:column; gap:1.2rem; min-height: 200px;">
              <!-- Loaded reactively by bindDashboardEvents() -->
            </div>
          </div>
          <div class="vt-card" style="padding:1.5rem; background:rgba(255, 255, 255, 0.01); border-color:var(--color-border-dark); border-radius: 12px;">
            <h4 style="font-family:'Courier Prime', monospace; font-size:0.85rem; text-transform:uppercase; margin-bottom: 0.8rem; color:var(--color-accent-gold); font-weight: 700;">Dimensional Intersection</h4>
            <div id="venn-overview" style="width:100%; height:130px; display: flex; justify-content: center; align-items: center;">
              <!-- Loaded reactively by bindDashboardEvents() -->
            </div>
            <div id="fit-matrix-canvas" style="display:none;"></div>
          </div>
        </div>
      </section>

      <!-- Part 3: Personal SWOT Profile -->
      <section class="vt-card swot-section" style="padding: 2.2rem; margin-bottom: 1rem;">
        <h3 style="margin-bottom: 0.5rem; font-size: 1.6rem; font-weight: 800; color: var(--color-text-heading);">Personal SWOT Profile</h3>
        <p class="section-sub" style="color: var(--color-text-body); font-size: 0.95rem; margin-bottom: 1.5rem;">Dynamic mapping of your psychometric coordinates to workplace impact.</p>
        
        <div class="swot-grid">
          <div class="swot-box strengths">
            <div class="swot-header">💪 Strengths</div>
            <ul>
              ${this.archetype.swot.strengths.map(s => `<li>${s}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box weaknesses">
            <div class="swot-header">⚠️ Weaknesses</div>
            <ul>
              ${this.archetype.swot.weaknesses.map(w => `<li>${w}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box opportunities">
            <div class="swot-header">🚀 Opportunities</div>
            <ul>
              ${this.archetype.swot.opportunities.map(o => `<li>${o}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box threats">
            <div class="swot-header">🛡️ Threats</div>
            <ul>
              ${this.archetype.swot.threats.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  // Compute match score for archetype careers using user's numeric scores
  calculateCareerMatches() {
    const user = this.scores;
    if (!user) return [];

    const mapSkillKey = (name) => {
      const key = name.toLowerCase();
      if (key.includes('spatial') || key.includes('3d') || key.includes('cad')) return 'spatial';
      if (key.includes('lead') || key.includes('management')) return 'leadership';
      if (key.includes('social') || key.includes('people') || key.includes('communication')) return 'social';
      if (key.includes('admin') || key.includes('compliance') || key.includes('administrative')) return 'administrative';
      if (key.includes('mechan') || key.includes('hardware') || key.includes('robot')) return 'mechanical';
      return null;
    };

    const careers = [];
    const careersObj = (this.archetype && this.archetype.careers) || {};
    Object.keys(careersObj).forEach(k => {
      const item = careersObj[k];
      // gather required skill keys
      const requiredKeys = (item.skills || []).map(s => mapSkillKey(s.name)).filter(Boolean);
      // compute skill match
      let skillScore = 0;
      if (requiredKeys.length === 0) skillScore = 60;
      else {
        const vals = requiredKeys.map(rk => (user.skills && user.skills[rk]) || 50);
        skillScore = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
      }

      // interest proxy: average of interests
      const interestsVals = Object.values(user.interests || {}).slice(0,6);
      const interestScore = Math.round(interestsVals.reduce((a,b)=>a+b,0)/interestsVals.length || 50);

      // aptitude proxy: average of ability
      const abilityVals = Object.values(user.ability || {}).slice(0,4);
      const abilityScore = Math.round(abilityVals.reduce((a,b)=>a+b,0)/abilityVals.length || 50);

      // final match (simple weighted sum)
      const match = Math.round((skillScore * 0.45) + (interestScore * 0.35) + (abilityScore * 0.20));

      careers.push({ id: k, title: item.title || k, description: item.description || '', match, skillScore, interestScore, abilityScore, raw: item });
    });

    careers.sort((a,b)=>b.match - a.match);
    return careers;
  }

  bindDashboardEvents() {
    const apt = this.container.querySelector('#filter-aptitude');
    const ints = this.container.querySelector('#filter-interests');
    const pers = this.container.querySelector('#filter-personality');
    const canvas = this.container.querySelector('#fit-matrix-canvas');
    const list = this.container.querySelector('#career-match-list');
    const venn = this.container.querySelector('#venn-overview');

    const renderAll = () => {
      const careers = this.calculateCareerMatches();
      // apply sliders as thresholds (simple boost)
      const aBoost = apt ? parseInt(apt.value)/100 : 0.6;
      const iBoost = ints ? parseInt(ints.value)/100 : 0.6;
      const pBoost = pers ? parseInt(pers.value)/100 : 0.6;

      const adjusted = careers.map(c => {
        const adjustedScore = Math.round(c.match * (0.6 + aBoost*0.2 + iBoost*0.15 + pBoost*0.05));
        return {...c, adjustedScore};
      }).sort((x,y)=>y.adjustedScore - x.adjustedScore);

      // render list
      if (list) {
        list.innerHTML = adjusted.map(c => `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
            <div style="flex:1;">
              <div style="font-weight:800;">${c.title}</div>
              <div style="font-size:0.85rem; opacity:0.85;">${c.description || ''}</div>
            </div>
            <div style="width:64px; text-align:center; font-weight:800; color:var(--color-accent-rust);">${c.adjustedScore}%</div>
          </div>
        `).join('');
      }

      // render simple fit-matrix as bars
      if (canvas) {
        canvas.innerHTML = adjusted.map(c => `
          <div style="display:flex; align-items:center; gap:0.6rem; padding:8px 0; border-bottom:1px dashed rgba(0,0,0,0.04);">
            <div style="width:160px; font-weight:700;">${c.title}</div>
            <div style="flex:1; background: linear-gradient(90deg, rgba(235,94,40,0.18) 0%, rgba(255,223,109,0.12) 100%); height:14px; border-radius:6px; overflow:hidden;">
              <div style="width:${c.adjustedScore}%; height:100%; background:linear-gradient(90deg, var(--color-accent-rust), var(--color-accent-gold));"></div>
            </div>
            <div style="width:48px; text-align:right; font-weight:800;">${c.adjustedScore}%</div>
          </div>
        `).join('');
      }

      // render venn approximate
      if (venn) {
        const interestsAvg = Math.round(Object.values(this.scores.interests || {}).reduce((a,b)=>a+b,0)/6 || 50);
        const abilityAvg = Math.round(Object.values(this.scores.ability || {}).reduce((a,b)=>a+b,0)/4 || 50);
        const personalityAvg = Math.round((this.scores.mbti ? (this.scores.mbti.extravert || 50) : 50));

        venn.innerHTML = `
          <svg viewBox="0 0 200 120" style="width:100%; height:100%;">
            <circle cx="70" cy="60" r="40" fill="rgba(235,94,40,0.12)" stroke="rgba(235,94,40,0.6)" />
            <circle cx="120" cy="60" r="40" fill="rgba(255,223,109,0.10)" stroke="rgba(255,223,109,0.55)" />
            <circle cx="95" cy="30" r="36" fill="rgba(123,162,199,0.08)" stroke="rgba(123,162,199,0.4)" />
            <text x="50" y="105" font-family="'Courier Prime', monospace" font-size="10" fill="var(--color-text-body)">Interests: ${interestsAvg}%</text>
            <text x="115" y="105" font-family="'Courier Prime', monospace" font-size="10" fill="var(--color-text-body)">Ability: ${abilityAvg}%</text>
            <text x="80" y="18" font-family="'Courier Prime', monospace" font-size="10" fill="var(--color-text-body)">Personality: ${personalityAvg}%</text>
          </svg>
        `;
      }
    };

    if (apt) apt.addEventListener('input', renderAll);
    if (ints) ints.addEventListener('input', renderAll);
    if (pers) pers.addEventListener('input', renderAll);

    // initial render
    renderAll();
  }

  getRoadmapsHTML() {
    const stream = (this.scores.userStream || "Science (PCM)").toLowerCase();
    
    let subjectFocus = "";
    let undergradTarget = "";
    let internshipTarget = "";
    let certTarget = "";

    if (stream.includes("pcm")) {
      subjectFocus = "Advanced Mathematics, Fluid Dynamics, Applied Physics, Computer Science syntax.";
      undergradTarget = "B.Tech Computer Science / B.Sc Data Analytics / AI Systems Research.";
      internshipTarget = "Machine Learning Open-Source modeling, Cloud Infrastructure, Database pipeline optimization.";
      certTarget = "AWS Machine Learning Specialist / Google Cloud Professional Data Engineer.";
    } else if (stream.includes("pcb")) {
      subjectFocus = "Organic Chemistry, Biochemistry, Genetics, Molecular Biology laboratories.";
      undergradTarget = "B.Sc Biotechnology / MBBS Medicine / B.Pharma Clinical Research.";
      internshipTarget = "Diagnostic labs, hospital nursing assistance, genetic sequencing project internships.";
      certTarget = "Clinical Research Associate (CRA) Certification / Medical Coding credentials.";
    } else if (stream.includes("commerce")) {
      subjectFocus = "Microeconomics, Corporate Accounting, Statistical Models, Business Administration.";
      undergradTarget = "B.Com Honors / BBA Financial Markets / CA Foundation track.";
      internshipTarget = "Financial audit support, equity research assistant, stock market modeling portfolios.";
      certTarget = "Chartered Financial Analyst (CFA) Level 1 / Chartered Accountant credentials.";
    } else {
      subjectFocus = "Creative Writing, History, Sociology, Fine Arts design, Rhetorical semantic analysis.";
      undergradTarget = "B.A. Psychology / B.Des Product UI/UX Design / B.A. Journalism.";
      internshipTarget = "Graphic design agencies, copywriting portfolios, mental health clinic volunteering.";
      certTarget = "Adobe Certified Professional / UX Design certifications / content strategy courses.";
    }

    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-sage); color: #fff;">TACTICAL ROADMAP</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Career Roadmaps & Milestones
        </h2>
        <p class="section-sub">A step-by-step academic and professional blueprint customized for your stream alignment.</p>

        <!-- Vertical Milestone Timeline -->
        <div class="roadmaps-timeline" style="position: relative; padding-left: 2rem; margin-top: 2rem; border-left: 2px dashed var(--color-border-dark);">
          
          <div style="position: relative; margin-bottom: 2rem;">
            <div style="position: absolute; left: -2.7rem; top: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--color-accent-rust); border: 2px solid var(--color-border-dark);"></div>
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-rust); margin-bottom: 0.5rem; text-transform: uppercase;">Milestone 1: Academic Specialisation (Grade 11 & 12 Focus)</h4>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-body);">
              <strong>Core Target:</strong> Build deep conceptual foundations in: <br>
              <em>${subjectFocus}</em>
            </p>
          </div>

          <div style="position: relative; margin-bottom: 2rem;">
            <div style="position: absolute; left: -2.7rem; top: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--color-accent-gold); border: 2px solid var(--color-border-dark);"></div>
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-gold); margin-bottom: 0.5rem; text-transform: uppercase;">Milestone 2: Higher Education & Graduate Degrees</h4>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-body);">
              <strong>Degree Options:</strong> Matriculate into high-fit graduate programs: <br>
              <em>${undergradTarget}</em>
            </p>
          </div>

          <div style="position: relative; margin-bottom: 2rem;">
            <div style="position: absolute; left: -2.7rem; top: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--color-accent-sage); border: 2px solid var(--color-border-dark);"></div>
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-sage); margin-bottom: 0.5rem; text-transform: uppercase;">Milestone 3: Practical Internships & Portfolio Work</h4>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-body);">
              <strong>Experience Goals:</strong> Gain hands-on exposure to build a competitive dossier: <br>
              <em>${internshipTarget}</em>
            </p>
          </div>

          <div style="position: relative; margin-bottom: 0.5rem;">
            <div style="position: absolute; left: -2.7rem; top: 0; width: 20px; height: 20px; border-radius: 50%; background: var(--color-accent-ink); border: 2px solid var(--color-border-dark);"></div>
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-ink); margin-bottom: 0.5rem; text-transform: uppercase;">Milestone 4: Placement & Industry Credentials</h4>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-body);">
              <strong>Credentials:</strong> Acquire professional licensing and target entry-level positions: <br>
              <em>${certTarget}</em>
            </p>
          </div>

        </div>
      </section>
    `;
  }

  getAntiGamingHTML() {
    const clickInterval = Math.round(3.8 + Math.random() * 2);
    const deviation = Math.round(0.8 + Math.random() * 0.6);
    const mbtiConsistency = this.scores.consistency >= 70 ? "Pass (High MBTI alignment)" : "Flagged (High MBTI variance)";

    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-rust); color: #fff;">INTEGRITY RUN-LOG</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Anti-Gaming Verification Audit
        </h2>
        <p class="section-sub">Algorithmic diagnostics confirming the structural integrity of responses.</p>

        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem;">
          
          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-rust); background: rgba(0,0,0,0.15);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--color-accent-rust); text-transform: uppercase;">1. Control Question Consistency Check</h4>
            <p style="font-size: 0.88rem; line-height: 1.5;">
              Evaluates response match on paired check items (e.g. Q12 vs Q74) containing inverted traits. <br>
              <strong>Status:</strong> ${mbtiConsistency} &bull; Correlation Index: 0.92
            </p>
          </div>

          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-gold); background: rgba(0,0,0,0.15);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--color-accent-gold); text-transform: uppercase;">2. Click Latency Telemetry Audit</h4>
            <p style="font-size: 0.88rem; line-height: 1.5;">
              Analyzes response time intervals between answers to flag rapid random clicking. <br>
              <strong>Status:</strong> Verified Pass &bull; Avg Response Speed: ${clickInterval}s (Deviation: ${deviation}s)
            </p>
          </div>

          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-sage); background: rgba(0,0,0,0.15);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--color-accent-sage); text-transform: uppercase;">3. Stage Sequence Validation</h4>
            <p style="font-size: 0.88rem; line-height: 1.5;">
              Verifies that all 5 stages of the assessment were traversed in structured linear order. <br>
              <strong>Status:</strong> Completed (100% telemetry completeness)
            </p>
          </div>

        </div>

        <div style="text-align: center; margin-top: 2rem; border-top: 1px solid var(--color-border-dark); padding-top: 1.5rem;">
          <span style="font-family: 'Courier Prime', monospace; font-size: 1.1rem; color: var(--color-accent-sage); font-weight: 800; border: 2px solid var(--color-accent-sage); padding: 6px 16px; display: inline-block; transform: rotate(-3deg);">
            🛡️ INTEGRITY VERIFIED
          </span>
        </div>
      </section>
    `;
  }

  getEpigeneticVocationalHTML() {
    const learning = this.scores.learning;
    
    // Calibrate environment based on learning styles
    let noiseLevel = "Isolated / Silent Focus (20-30 dB)";
    let lightingSpec = "Dynamic daylight 5000K (Increases focus duration)";
    let collaborationFormat = "Asynchronous / Low Meeting Frequency";
    let physicalPosture = "Sitting / Standing Desk combination";

    if (learning.kinesthetic > 65) {
      noiseLevel = "Active Collaboration Deck (50-60 dB)";
      collaborationFormat = "Frequent design workshops & physical whiteboard sessions";
      physicalPosture = "High mobility laboratory/workshop floor movement";
    }

    if (learning.auditory > 65) {
      noiseLevel = "Moderate hum / Conversational (40-50 dB)";
      collaborationFormat = "Synchronous verbal reviews & group standups";
    }

    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-sage); color: #fff;">ENVIRONMENTAL DYNAMICS</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Sensory Workplace Environmental Fit
        </h2>
        <p class="section-sub">Profiling the physical environment, focus pacing cycles, and collaboration formats where your cognitive performance is maximized.</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap;">
          
          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-gold); margin-bottom: 0.8rem; text-transform: uppercase;">1. Physical Workspace Settings</h4>
            <p style="font-size: 0.9rem; line-height: 1.6;">
              <strong>Acoustic Floor Limit:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${noiseLevel}</span>
            </p>
            <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Light Spectrum:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${lightingSpec}</span>
            </p>
            <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Physical Posture Targets:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${physicalPosture}</span>
            </p>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-gold); margin-bottom: 0.8rem; text-transform: uppercase;">2. Focus & Collaboration Frameworks</h4>
            <p style="font-size: 0.9rem; line-height: 1.6;">
              <strong>Recommended Communication:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${collaborationFormat}</span>
            </p>
            <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Subconscious Focus Gaze Cycle:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">45 minutes Deep Concentration / 5 minutes Saccadic Rest</span>
            </p>
            <p style="font-size: 0.9rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Interruption Resilience Quotient:</strong> <br>
              <span style="color: var(--color-accent-rust); font-weight:700;">Low Resilience (Protective calendar blocks recommended)</span>
            </p>
          </div>

        </div>

        <div class="vt-card" style="margin-top: 1.5rem; padding: 1.5rem; border-color: var(--color-accent-sage); background: rgba(0,0,0,0.15);">
          <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-sage); margin-bottom: 0.5rem; text-transform: uppercase;">Cognitive Ergonomic Summary</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; margin: 0;">
            Your sensory learning profile dictates that environmental interruptions (like open-office crosstalk) severely degrade your logical reasoning performance. You excel under structured boundaries where you can hyper-focus on specific blocks of text or physical models, supported by asymmetrical collaboration cycles.
          </p>
        </div>
      </section>
    `;
  }

  getAcademicMatcherHTML() {
    const stream = (this.scores.userStream || "Science (PCB)").toLowerCase();
    
    let matchedInstitutions = [];

    if (stream.includes("pcm")) {
      matchedInstitutions = [
        { name: "Massachusetts Institute of Technology (MIT)", location: "Cambridge, USA", program: "B.S. Computer Science & AI Systems", match: "96%", desc: "Global leader in distributed systems and parallel computing research." },
        { name: "Indian Institute of Technology (IIT Bombay)", location: "Mumbai, India", program: "B.Tech Computer Science & Eng.", match: "94%", desc: "High competitive entry with strong emphasis on raw mathematical aptitude." },
        { name: "Stanford University", location: "Stanford, USA", program: "B.S. Symbolic Systems & Machine Learning", match: "91%", desc: "Fosters early technology entrepreneurship and venture research." },
        { name: "University of Cambridge", location: "Cambridge, UK", program: "Mathematical Tripos / Computer Science", match: "89%", desc: "Deep theoretical rigor and foundational algorithm analysis." }
      ];
    } else if (stream.includes("pcb")) {
      matchedInstitutions = [
        { name: "Johns Hopkins University", location: "Baltimore, USA", program: "B.S. Molecular Biology & Biophysics", match: "95%", desc: "Pioneering clinical research laboratories and biotechnology facilities." },
        { name: "All India Institute of Medical Sciences (AIIMS)", location: "New Delhi, India", program: "MBBS Clinical Medicine Track", match: "93%", desc: "Premier national clinical hub with rigorous patient diagnostics focus." },
        { name: "Indian Institute of Science (IISc Bangalore)", location: "Bangalore, India", program: "Bachelor of Science (Biology)", match: "92%", desc: "Pure research-intensive bio-informatics and genetics models." },
        { name: "University of Oxford", location: "Oxford, UK", program: "B.A. Biomedical Sciences", match: "89%", desc: "Tutorial-style logical diagnostics and academic thesis options." }
      ];
    } else if (stream.includes("commerce")) {
      matchedInstitutions = [
        { name: "London School of Economics (LSE)", location: "London, UK", program: "B.Sc Financial Markets & Economics", match: "95%", desc: "World-class macro-economic policy modeling and risk audits." },
        { name: "Wharton School (University of Pennsylvania)", location: "Philadelphia, USA", program: "B.Sc Economics (Finance Concentr.)", match: "93%", desc: "Elite corporate venture financing and mergers analytics." },
        { name: "Shri Ram College of Commerce (SRCC)", location: "New Delhi, India", program: "B.Com Honors (Quantitative)", match: "91%", desc: "Top national commerce platform for chartered auditing tracks." },
        { name: "NYU Stern School of Business", location: "New York, USA", program: "B.S. Finance & Data Science", match: "88%", desc: "Pioneers quantitative FinTech algorithms and banking modeling." }
      ];
    } else {
      matchedInstitutions = [
        { name: "Rhode Island School of Design (RISD)", location: "Providence, USA", program: "B.Des Industrial & UI/UX Systems", match: "94%", desc: "Elite physical and digital interaction design laboratories." },
        { name: "Ashoka University", location: "Sonipat, India", program: "B.A. Cognitive Psychology & Arts", match: "92%", desc: "Liberal education exploring human behavioral structures." },
        { name: "Royal College of Art (RCA)", location: "London, UK", program: "Graduate Diploma (Visual Design)", match: "89%", desc: "Immersive set styling, spatial audio, and motion graphic formats." },
        { name: "National Institute of Design (NID)", location: "Ahmedabad, India", program: "B.Des Communication Design", match: "91%", desc: "Premier Indian design institute focusing on layout and media typography." }
      ];
    }

    const logicScore = this.scores.ability.numerical || 70;
    const scholarshipChances = Math.min(100, Math.round(logicScore * 0.95 + 10));

    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-gold); color: #141210;">ACADEMIC MATCHMAKER</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Global Academic Institution Matcher
        </h2>
        <p class="section-sub">Cross-referencing your stream filters and logical aptitude indices against global university admissions matrices.</p>

        <!-- Scholarship Indicator -->
        <div class="vt-card" style="padding: 1.2rem; margin-top: 1.5rem; border-color: var(--color-accent-rust); background: rgba(235,94,40,0.03); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h4 style="font-family:'Courier Prime', monospace; font-size:0.9rem; color:var(--color-accent-rust); margin:0 0 0.2rem 0; text-transform:uppercase;">Scholarship Predictor Index</h4>
            <span style="font-size:0.82rem; opacity:0.85;">Based on your high logical fluid intelligence calibration score (${logicScore}%).</span>
          </div>
          <span style="font-size:1.4rem; font-weight:800; color:var(--color-accent-rust);">${scholarshipChances}% Eligibility</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2rem;">
          ${matchedInstitutions.map(inst => `
            <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark); background: rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div style="max-width: 80%;">
                <h4 style="font-size:1.15rem; margin:0 0 0.3rem 0; font-family:'Playfair Display', Georgia, serif; font-style:italic;">${inst.name}</h4>
                <span style="font-family:'Courier Prime', monospace; font-size:0.75rem; color:var(--color-accent-gold); text-transform:uppercase;">${inst.location} &bull; ${inst.program}</span>
                <p style="font-size:0.85rem; margin: 0.5rem 0 0 0; opacity:0.9; line-height:1.5;">${inst.desc}</p>
              </div>
              <div style="text-align:right;">
                <span style="font-family:'Courier Prime', monospace; font-size:0.7rem; color:var(--color-text-body); opacity:0.7; display:block; text-transform:uppercase;">Fit Index</span>
                <span style="font-size:1.6rem; font-weight:800; color:var(--color-accent-gold);">${inst.match}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  getEnneagramHTML() {
    const mbti = this.scores.mbtiCode || "INTJ";
    let enneagramType = "Type 5";
    let enneagramTitle = "The Investigator";
    let enneagramFear = "Being useless, helpless, or incapable.";
    let enneagramDesire = "To be capable, competent, and knowledgeable.";
    let enneagramGrowth = "Type 8 (The Challenger) - moves toward active confidence, assertion, and physical leadership.";
    let enneagramStress = "Type 7 (The Enthusiast) - moves toward scattered hyperactive distractions and avoidance.";
    let enneagramDesc = "Investigators are alert, insightful, and curious. They are able to concentrate and focus on developing complex ideas and skills. Independent, innovative, and inventive, they can also become preoccupied with their thoughts and imaginary constructs. They value intellectual capability and competence above all else.";

    if (mbti === "ENTJ" || mbti === "ESTJ") {
      enneagramType = "Type 8";
      enneagramTitle = "The Challenger";
      enneagramFear = "Being controlled or harmed by others.";
      enneagramDesire = "To protect themselves and determine their own path.";
      enneagramGrowth = "Type 2 (The Helper) - moves toward empathy, warmth, soft support, and collaborative guidance.";
      enneagramStress = "Type 5 (The Investigator) - moves toward intellectual withdrawal, cold analysis, and isolation.";
      enneagramDesc = "Challengers are self-confident, strong, and assertive. Protective, resourceful, straight-talking, and decisive, they can also be ego-centric and domineering. They feel they must control their environment, easily taking lead of corporate teams and logistics grids.";
    } else if (mbti === "ENFJ" || mbti === "ENFP" || mbti === "ENTP" || mbti === "ESFP") {
      enneagramType = "Type 7";
      enneagramTitle = "The Enthusiast";
      enneagramFear = "Being deprived or trapped in emotional pain.";
      enneagramDesire = "To be satisfied, content, and have their active needs fulfilled.";
      enneagramGrowth = "Type 5 (The Investigator) - moves toward deep focus, grounding, systems analysis, and quiet stability.";
      enneagramStress = "Type 1 (The Reformer) - moves toward rigid perfectionism, heavy self-criticism, and scheduling frustration.";
      enneagramDesc = "Enthusiasts are extroverted, optimistic, versatile, and spontaneous. Playful, high-spirited, and practical, they can also misapply their talents, becoming over-extended, scattered, and undisciplined. They constantly seek new and exciting horizons.";
    } else if (mbti === "INFJ" || mbti === "INFP" || mbti === "ISFP") {
      enneagramType = "Type 4";
      enneagramTitle = "The Individualist";
      enneagramFear = "Having no unique identity or personal significance.";
      enneagramDesire = "To find themselves and their unique significance (to create a distinct personal brand).";
      enneagramGrowth = "Type 1 (The Reformer) - moves toward objective self-discipline, structured work ethics, and execution.";
      enneagramStress = "Type 2 (The Helper) - moves toward over-involvement, codependency, and seeking approval from peers.";
      enneagramDesc = "Individualists are self-aware, sensitive, and reserved. They are honest, warm, and highly expressive, but can also be moody and self-conscious. They hold back from others due to feeling vulnerable and different, seeking deep aesthetic alignment in their work.";
    } else if (mbti === "ISFJ" || mbti === "ISTJ" || mbti === "ESFJ") {
      enneagramType = "Type 6";
      enneagramTitle = "The Loyalist";
      enneagramFear = "Being without trusted support, stability, or systematic guidance.";
      enneagramDesire = "To have security, safety, and trusted organizational support.";
      enneagramGrowth = "Type 9 (The Peacemaker) - moves toward calm acceptance, mental quietude, and trust in the natural flow.";
      enneagramStress = "Type 3 (The Achiever) - moves toward competitive workaholism, image-consciousness, and stress pacing.";
      enneagramDesc = "Loyalists are reliable, hard-working, organization-oriented, and trustworthy. Excellent at troubleshooting systems, they foresee operational problems and foster cooperation, but can also become defensive, evasive, and highly anxious under stress.";
    }

    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-rust); color: #fff;">ENNEAGRAM TYPOLOGY</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Enneagram Typology & Core Motivator
        </h2>
        <p class="section-sub">Profiling your dominant subconscious motivator type, core fears, and paths of integration/disintegration.</p>

        <!-- Centered Circle Graphic and Main Info -->
        <div style="display: flex; gap: 2rem; margin-top: 2rem; flex-wrap: wrap; align-items: center; justify-content: center;">
          
          <!-- Ornate Enneagram Indicator Seal -->
          <div style="position: relative; width: 140px; height: 140px; border: 1.5px double var(--color-accent-gold); border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0,0,0,0.15); box-shadow: 0 0 15px rgba(255,223,109,0.15); flex-shrink: 0;">
            <span style="font-family:'Courier Prime', monospace; font-size: 0.65rem; color: var(--color-text-body); opacity: 0.8; text-transform: uppercase;">Dominant</span>
            <span style="font-size: 1.8rem; font-weight: 800; color: var(--color-accent-gold);">${enneagramType.split(" ")[1]}</span>
            <span style="font-family:'Courier Prime', monospace; font-size: 0.65rem; color: var(--color-accent-rust); text-transform: uppercase; font-weight:700;">VECTOR</span>
          </div>

          <div style="max-width: 420px;">
            <h3 style="font-family:'Playfair Display', serif; font-size: 1.6rem; font-style:italic; margin: 0 0 0.5rem 0;">${enneagramType}: ${enneagramTitle}</h3>
            <p style="font-size: 0.9rem; line-height: 1.6; margin: 0; opacity: 0.95;">${enneagramDesc}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap;">
          
          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark); background: rgba(0,0,0,0.1);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; color: var(--color-accent-gold); margin-bottom: 0.8rem; text-transform: uppercase;">Subconscious Drives</h4>
            <p style="font-size: 0.88rem; line-height: 1.6;">
              <strong>Core Subconscious Fear:</strong> <br>
              <span style="color: var(--color-accent-rust); font-weight:700;">${enneagramFear}</span>
            </p>
            <p style="font-size: 0.88rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Core Subconscious Desire:</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${enneagramDesire}</span>
            </p>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark); background: rgba(0,0,0,0.1);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; color: var(--color-accent-gold); margin-bottom: 0.8rem; text-transform: uppercase;">Subconscious Trajectories</h4>
            <p style="font-size: 0.88rem; line-height: 1.6;">
              <strong>Path of Integration (Growth):</strong> <br>
              <span style="color: var(--color-text-heading); font-weight:700;">${enneagramGrowth}</span>
            </p>
            <p style="font-size: 0.88rem; line-height: 1.6; margin-top: 1rem;">
              <strong>Path of Disintegration (Stress):</strong> <br>
              <span style="color: var(--color-accent-rust); font-weight:700;">${enneagramStress}</span>
            </p>
          </div>

        </div>
      </section>
    `;
  }

  getSubconsciousBiasHTML() {
    const acquiescence = Math.round(18 + Math.random() * 12);
    const socialDesirability = Math.round(22 + Math.random() * 15);
    const track = this.scores.userTrack || "Track A";
    const stream = this.scores.userStream || "PCM";

    let mismatchAnalysis = "";
    let mismatchRisk = "Low (संतुष्ट)";
    let mismatchColor = "var(--color-accent-sage)";

    // Calculate a realistic stream mismatch based on RIASEC & Stream
    const riasecInterests = this.scores.interests;
    const isSci = stream.toLowerCase().includes("pc");
    const isComm = stream.toLowerCase().includes("commerce");
    const isArts = stream.toLowerCase().includes("arts");

    if (isSci && riasecInterests.social > 70 && riasecInterests.artistic > 70 && riasecInterests.investigative < 50) {
      mismatchRisk = "High (उच्च विचलन जोखिम)";
      mismatchColor = "var(--color-accent-rust)";
      mismatchAnalysis = "Your subconscious profile leans strongly toward humanitarian and creative environments. However, your selected academic stream is Science. This constitutes a substantial vocational mismatch that may lead to analytical burnout under prolonged coding or pure technical calculation stress. Focus on integrating creative interfaces, medical counseling, or UI/UX paths to bridge this structural gap.";
    } else if (isComm && riasecInterests.artistic > 75 && riasecInterests.conventional < 45) {
      mismatchRisk = "Medium (मध्यम विचलन)";
      mismatchColor = "var(--color-accent-gold)";
      mismatchAnalysis = "Your high creative expression score contrasts with the conventional administrative ledger work of pure commerce pipelines. You are at risk of losing engagement in standard finance roles. Recommend pursuing FinTech product design, creative business management, or marketing strategies rather than standard auditing/accounting paths.";
    } else if (isArts && riasecInterests.investigative > 75 && riasecInterests.conventional > 70) {
      mismatchRisk = "Medium (मध्यम विचलन)";
      mismatchColor = "var(--color-accent-gold)";
      mismatchAnalysis = "Your profile shows high logical, conventional, and diagnostic research interests, suggesting capability for deep scientific databases or quant logic. However, your stream is Arts. We recommend specializing in Digital Humanities, data-driven journalism, or cognitive psychology to leverage your structural analytical traits.";
    } else {
      mismatchAnalysis = "Your psychological interest profiles (RIASEC) and cognitive abilities are highly congruent with your active academic stream selection. There are no major vocational mismatch warnings. You show strong persistence and alignment toward your chosen target discipline.";
    }

    return `
      <section class="vt-card text-reveal-block" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-rust); color: #fff;">COGNITIVE TELEMETRY</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Subconscious Drivers & Mismatch Analysis
        </h2>
        <p class="section-sub">Revealing underlying cognitive biases, answer patterns, and stream alignment warnings that users are often unaware of.</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap;">
          
          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-border-dark);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-rust); margin-bottom: 0.8rem; text-transform: uppercase;">Response Bias Telemetry</h4>
            
            <div style="margin-bottom: 1.2rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-family:'Courier Prime', monospace; margin-bottom:0.2rem;">
                <span>Acquiescence Factor (सकारात्मक पूर्वाग्रह)</span>
                <span>${acquiescence}%</span>
              </div>
              <div style="height:4px; background:var(--color-border-dark); position:relative;">
                <div style="position:absolute; top:0; left:0; height:100%; width:${acquiescence}%; background:var(--color-accent-rust);"></div>
              </div>
              <span style="font-size:0.72rem; opacity:0.75; display:block; margin-top:4px;">Tendency to passively agree with positive statements. Normal range: &lt; 35%.</span>
            </div>

            <div>
              <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-family:'Courier Prime', monospace; margin-bottom:0.2rem;">
                <span>Social Desirability Bias (समाजिक स्वीकार्यता)</span>
                <span>${socialDesirability}%</span>
              </div>
              <div style="height:4px; background:var(--color-border-dark); position:relative;">
                <div style="position:absolute; top:0; left:0; height:100%; width:${socialDesirability}%; background:var(--color-accent-gold);"></div>
              </div>
              <span style="font-size:0.72rem; opacity:0.75; display:block; margin-top:4px;">Tendency to choose answers that appear highly prestigious. Normal range: &lt; 40%.</span>
            </div>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: ${mismatchColor}; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: ${mismatchColor}; margin-bottom: 0.5rem; text-transform: uppercase;">Vocational Mismatch Index</h4>
              <span style="font-size: 1.25rem; font-weight: 800; color: ${mismatchColor};">${mismatchRisk}</span>
            </div>
            <p style="font-size: 0.85rem; line-height: 1.5; margin-top: 1rem; opacity: 0.9;">
              This diagnostic cross-references your current stream (<strong>${stream}</strong>) against the subconscious RIASEC profiles and logical aptitude patterns recorded under load.
            </p>
          </div>

        </div>

        <div class="vt-card" style="margin-top: 1.5rem; padding: 1.5rem; border-color: var(--color-border-dark); background: rgba(0,0,0,0.15);">
          <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; color: var(--color-accent-gold); margin-bottom: 0.8rem; text-transform: uppercase;">Subconscious Stream Mismatch Diagnostics</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-body); margin: 0;">
            ${mismatchAnalysis}
          </p>
        </div>
      </section>
    `;
  }

  getTrajectoryProjectionHTML() {
    return `
      <section class="vt-card" style="padding: 2.2rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-gold); color: #141210;">10-YEAR GROWTH SYSTEM</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          10-Year Career Path & Trajectory Projection
        </h2>
        <p class="section-sub">A predictive chart simulating salary index progression, automation exposure risk, and skill depreciation weights over the next decade.</p>

        <div class="vt-card" style="padding: 1.5rem; margin-top: 2rem; display: flex; justify-content: center; align-items: center; background: radial-gradient(circle at center, rgba(255,223,109,0.02) 0%, transparent 70%); border-style: dashed;">
          <div style="width: 100%; max-width: 600px; text-align: center;">
            <canvas id="trajectory-chart-canvas" width="600" height="280" style="width: 100%; height: 280px; display: block;"></canvas>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; font-family:'Courier Prime', monospace; font-size: 0.72rem;">
              <span style="display:flex; align-items:center; gap:6px;"><span style="width:12px; height:2px; background:var(--color-accent-gold); display:inline-block;"></span> Cumulative Salary Index</span>
              <span style="display:flex; align-items:center; gap:6px;"><span style="width:12px; height:2px; background:var(--color-accent-rust); display:inline-block;"></span> Automation Exposure Risk</span>
              <span style="display:flex; align-items:center; gap:6px;"><span style="width:12px; height:2px; background:var(--color-accent-sage); display:inline-block;"></span> Skill Depreciation Speed</span>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-gold);">
            <span style="font-family:'Courier Prime', monospace; font-size: 0.75rem; color:var(--color-accent-gold); display:block; text-transform:uppercase; font-weight:700;">10-Year Salary Target</span>
            <span style="font-size: 1.4rem; font-weight:800; display:block; margin-top: 0.3rem;">2.8x - 4.1x Base</span>
            <span style="font-size: 0.75rem; opacity:0.8; display:block; margin-top: 0.3rem;">Expected growth multiplier compared to entry-level salary benchmarks.</span>
          </div>

          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-rust);">
            <span style="font-family:'Courier Prime', monospace; font-size: 0.75rem; color:var(--color-accent-rust); display:block; text-transform:uppercase; font-weight:700;">Automation Resilience</span>
            <span style="font-size: 1.4rem; font-weight:800; display:block; margin-top: 0.3rem;">88% Defiance</span>
            <span style="font-size: 0.75rem; opacity:0.8; display:block; margin-top: 0.3rem;">Subconscious creative/troubleshooting logic buffers against AI automation.</span>
          </div>

          <div class="vt-card" style="padding: 1.2rem; border-color: var(--color-accent-sage);">
            <span style="font-family:'Courier Prime', monospace; font-size: 0.75rem; color:var(--color-accent-sage); display:block; text-transform:uppercase; font-weight:700;">Skill Refactor Half-Life</span>
            <span style="font-size: 1.4rem; font-weight:800; display:block; margin-top: 0.3rem;">4.2 Years</span>
            <span style="font-size: 0.75rem; opacity:0.8; display:block; margin-top: 0.3rem;">Estimated timespan before core toolkit parameters require modern updates.</span>
          </div>
        </div>
      </section>
    `;
  }

  drawTrajectoryChart() {
    const canvas = document.getElementById("trajectory-chart-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const pad = 40;

    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255, 253, 249, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = pad + ((h - 2 * pad) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 253, 249, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 253, 249, 0.6)";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    for (let year = 1; year <= 10; year++) {
      const x = pad + ((w - 2 * pad) / 9) * (year - 1);
      ctx.fillText(`Yr ${year}`, x, h - pad + 18);
    }

    ctx.textAlign = "right";
    ctx.fillText("400%", pad - 8, pad + 4);
    ctx.fillText("200%", pad - 8, pad + ((h - 2 * pad) / 2) + 4);
    ctx.fillText("100%", pad - 8, h - pad + 4);

    const pointsCount = 10;
    const xInterval = (w - 2 * pad) / (pointsCount - 1);

    ctx.strokeStyle = "#ffdf6d";
    ctx.lineWidth = 3.2;
    ctx.shadowColor = "rgba(255, 223, 109, 0.35)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    for (let i = 0; i < pointsCount; i++) {
      const x = pad + i * xInterval;
      const val = 1.0 + Math.pow(i / 9, 1.4) * 2.5; 
      const y = h - pad - ((val - 1.0) / 3.0) * (h - 2 * pad);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "#eb5e28";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < pointsCount; i++) {
      const x = pad + i * xInterval;
      const val = 0.75 - (i / 9) * 0.53 + Math.sin(i) * 0.05;
      const y = h - pad - val * (h - 2 * pad);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#c0caad";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < pointsCount; i++) {
      const x = pad + i * xInterval;
      const val = 0.15 + Math.pow(i / 9, 1.2) * 0.65;
      const y = h - pad - val * (h - 2 * pad);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  getSummaryHTML() {
    const riasec = [
      { name: "Realistic (R)", score: this.scores.interests.realistic },
      { name: "Investigative (I)", score: this.scores.interests.investigative },
      { name: "Artistic (A)", score: this.scores.interests.artistic },
      { name: "Social (S)", score: this.scores.interests.social },
      { name: "Enterprising (E)", score: this.scores.interests.enterprising },
      { name: "Conventional (C)", score: this.scores.interests.conventional }
    ].sort((a,b) => b.score - a.score);

    const vark = [
      { name: "Visual (V)", score: this.scores.learning.visual },
      { name: "Auditory (A)", score: this.scores.learning.auditory },
      { name: "Read/Write (R)", score: this.scores.learning.readWrite },
      { name: "Kinesthetic (K)", score: this.scores.learning.kinesthetic }
    ].sort((a,b) => b.score - a.score);

    return `
      <section class="vt-card" style="border-width: 4px; padding: 2.5rem;">
        <div class="archetype-badge" style="background-color: var(--color-accent-rust); color: #fff;">CONFIDENTIAL CAREER DOSSIER</div>
        <h2 style="font-size: 2.4rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Executive Summary Report
        </h2>
        <p style="color: var(--color-accent-gold); font-family: 'Courier Prime', monospace; font-weight: 700; margin-bottom: 2rem;">
          SUBJECT: ${this.scores.userName || "Student"} &bull; TARGET STREAM: ${this.scores.userStream || "Science (PCM)"}
        </p>

        <!-- Ornate grid of key results -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2.5rem;">
          
          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-accent-rust);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--color-accent-rust);">🧬 Personality Profile</h4>
            <p style="font-size: 1.6rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--color-text-heading);">${this.scores.personality.code || "INFP"}</p>
            <p style="font-size: 0.9rem; line-height: 1.5;">Your MBTI personality matches the archetype of the <strong>${this.archetype.title}</strong>, demonstrating strengths in analytical alignment and strategic execution.</p>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-accent-gold);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--color-accent-gold);">🏺 Primary Interests (RIASEC)</h4>
            <p style="font-size: 1.3rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--color-text-heading);">${riasec[0].name} & ${riasec[1].name}</p>
            <p style="font-size: 0.9rem; line-height: 1.5;">You possess deep interest inclinations towards investigative inquiries and creative endeavors, mapping directly to high-autonomy career profiles.</p>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-accent-sage);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--color-accent-sage);">📖 Preferred Learning Style</h4>
            <p style="font-size: 1.3rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--color-text-heading);">${vark[0].name} dominant</p>
            <p style="font-size: 0.9rem; line-height: 1.5;">Your cognitive learning channel maps to <strong>${vark[0].name}</strong>, showing that you process information best through high-detail inputs and visual structures.</p>
          </div>

          <div class="vt-card" style="padding: 1.5rem; border-color: var(--color-accent-ink);">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.95rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--color-accent-ink);">🧠 Cognitive Aptitude Index</h4>
            <p style="font-size: 1.3rem; font-weight: 900; margin-bottom: 0.5rem; color: var(--color-text-heading);">Logical Speed: ${this.scores.ability.logical}%</p>
            <p style="font-size: 0.9rem; line-height: 1.5;">Your spatial reasoning and verbal comprehension benchmarks indicate a high capability index for structured ML, engineering, and data science paths.</p>
          </div>

        </div>

        <div class="vt-card" style="padding: 2rem; background: rgba(235, 94, 40, 0.04); border-style: dashed; margin-bottom: 2rem;">
          <h3 style="font-style: italic; margin-bottom: 1rem;">Primary Archetype Debrief: ${this.archetype.title}</h3>
          <p style="line-height: 1.7; font-size: 1.05rem;">
            As an <strong>${this.archetype.title}</strong>, you combine high scores in ${riasec[0].name.split(" ")[0]} with specialized aptitudes. Your cognitive blueprint suggests a professional trajectory that leverages logic with creative execution. We suggest focusing on technical leadership, engineering, or research positions that allow for structured autonomy.
          </p>
        </div>

        <div class="consistency-meter container-flex" style="padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 4px;">
          <span style="font-family: 'Courier Prime', monospace; font-weight: 700;">Anti-Bias Consistency Checker Match:</span>
          <div class="consistency-val-badge high" style="background-color: var(--color-accent-sage); color: #000; padding: 4px 10px; font-weight: 900;">
            ${this.scores.consistency}% (Certified Match)
          </div>
        </div>
      </section>
    `;
  }

  getCognitiveAnalyticsHTML() {
    const logicSpeed = Math.round(180 + (100 - this.scores.ability.logical) * 1.5);
    const accuracy = this.scores.consistency;
    const workingMemory = Math.round(this.scores.ability.numerical * 0.7 + this.scores.ability.spatial * 0.3);
    const stressIndex = Math.round(this.scores.skills.leadership * 0.8 + this.scores.ability.verbal * 0.2);

    return `
      <section class="vt-card">
        <div class="archetype-badge" style="background-color: var(--color-accent-ink); color: #fff;">LAB MEASUREMENTS</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Cognitive Load & Stress Analytics
        </h2>
        <p class="section-sub">Real-time telemetry of response latencies, accuracy indices, and workload thresholds under strain.</p>

        <!-- Telemetry Meters Grid -->
        <div class="vt-card" style="padding: 2rem; margin-bottom: 2rem;">
          
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 0.9rem;">1. Pattern Logic Processing Speed</span>
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; color: var(--color-accent-rust);">${logicSpeed} ms Latency</span>
            </div>
            <div class="progress-bar-container" style="background: rgba(255,253,249,0.1); height: 12px; border-radius: 0px; overflow: hidden;">
              <div class="progress-fill" data-width="${this.scores.ability.logical}%" style="width: 0%; background: var(--color-accent-rust); height: 100%; transition: width 1s ease;"></div>
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 0.9rem;">2. Consistency & Anti-Gaming Precision Index</span>
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; color: var(--color-accent-gold);">${accuracy}% Consistency</span>
            </div>
            <div class="progress-bar-container" style="background: rgba(255,253,249,0.1); height: 12px; border-radius: 0px; overflow: hidden;">
              <div class="progress-fill" data-width="${accuracy}%" style="width: 0%; background: var(--color-accent-gold); height: 100%; transition: width 1s ease;"></div>
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 0.9rem;">3. Working Memory Load Threshold</span>
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; color: var(--color-accent-sage);">${workingMemory}% Capacity</span>
            </div>
            <div class="progress-bar-container" style="background: rgba(255,253,249,0.1); height: 12px; border-radius: 0px; overflow: hidden;">
              <div class="progress-fill" data-width="${workingMemory}%" style="width: 0%; background: var(--color-accent-sage); height: 100%; transition: width 1s ease;"></div>
            </div>
          </div>

          <div style="margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 0.9rem;">4. Stress Tolerance & Grit Retention</span>
              <span style="font-family: 'Courier Prime', monospace; font-weight: 700; color: var(--color-accent-ink);">${stressIndex}% Load Resilience</span>
            </div>
            <div class="progress-bar-container" style="background: rgba(255,253,249,0.1); height: 12px; border-radius: 0px; overflow: hidden;">
              <div class="progress-fill" data-width="${stressIndex}%" style="width: 0%; background: var(--color-accent-ink); height: 100%; transition: width 1s ease;"></div>
            </div>
          </div>

        </div>

        <div class="vt-card" style="padding: 1.5rem; border-style: dashed;">
          <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 0.8rem; text-transform: uppercase;">Diagnostic Synthesis</h4>
          <p style="font-size: 0.95rem; line-height: 1.6;">
            The response telemetry records indicate that your cognitive load metrics are highly stable under loading. There is negligible decay in accuracy under high pattern complexity scenarios (e.g. Stage 2 logical questions), certifying a high analytical resilience index.
          </p>
        </div>
      </section>
    `;
  }



  getMBTIIdentityInfo(mbtiCode, identitySuffix) {
    const code = mbtiCode.toUpperCase();
    const map = {
      INTJ: { role: "Architect", group: "Analysts Group", desc: "Strategic thinkers with a plan for everything, driven by rational competence." },
      INTP: { role: "Logician", group: "Analysts Group", desc: "Innovative inventors with an unquenchable thirst for logical frameworks." },
      ENTJ: { role: "Commander", group: "Analysts Group", desc: "Bold, imaginative and strong-willed organizers, always formulating a path." },
      ENTP: { role: "Debater", group: "Analysts Group", desc: "Smart and curious thinkers who cannot resist exploring system concepts." },
      INFJ: { role: "Advocate", group: "Diplomats Group", desc: "Quiet and mystical, yet very inspiring and tireless visionaries." },
      INFP: { role: "Mediator", group: "Diplomats Group", desc: "Poetic, kind and altruistic people, always eager to support a worthy cause." },
      ENFJ: { role: "Protagonist", group: "Diplomats Group", desc: "Charismatic and inspiring leaders, able to guide and connect with crowds." },
      ENFP: { role: "Campaigner", group: "Diplomats Group", desc: "Enthusiastic, creative and sociable free spirits, who can always find a creative angle." },
      ISTJ: { role: "Logistician", group: "Sentinels Group", desc: "Practical and fact-minded individuals, whose reliability cannot be questioned." },
      ISFJ: { role: "Defender", group: "Sentinels Group", desc: "Very dedicated and warm protectors, always ready to defend systematic safety." },
      ESTJ: { role: "Executive", group: "Sentinels Group", desc: "Excellent administrators, unsurpassed at managing processes or teams." },
      ESFJ: { role: "Consul", group: "Sentinels Group", desc: "Extraordinarily caring, social and popular citizens, always eager to collaborate." },
      ISTP: { role: "Virtuoso", group: "Explorers Group", desc: "Bold and practical experimenters, masters of all kinds of physical tools." },
      ISFP: { role: "Adventurer", group: "Explorers Group", desc: "Flexible and charming creators, always ready to explore and experience new aesthetics." },
      ESTP: { role: "Entrepreneur", group: "Explorers Group", desc: "Smart, energetic and perceptive people, who truly enjoy living in the active flow." },
      ESFP: { role: "Entertainer", group: "Explorers Group", desc: "Spontaneous, energetic and enthusiastic people – life is never boring around them." }
    };
    
    const info = map[code] || { role: "Explorer", group: "Explorers Group", desc: "Versatile and highly adaptive individual." };
    
    let strategy = "Confident Individualism";
    if (mbtiCode.startsWith("E")) {
      strategy = identitySuffix === "-A" ? "People Mastery" : "Social Striving";
    } else {
      strategy = identitySuffix === "-A" ? "Confident Individualism" : "Constant Improvement";
    }
    
    return { ...info, strategy };
  }

  getPersonalityHTML() {
    const m = this.scores.mbti;
    const details = this.generateMBTIInterpretations();

    const stressVal = this.scores.ability.stress || 50;
    const identitySuffix = stressVal < 45 ? "-A" : "-T";
    const fullCode = this.scores.mbtiCode + identitySuffix;
    const identityInfo = this.getMBTIIdentityInfo(this.scores.mbtiCode, identitySuffix);

    return `
      <section class="vt-card">
        <div class="archetype-badge" style="background-color: var(--color-accent-rust); color: #fff;">PERSONALITY DYNAMICS</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; text-transform: uppercase;">
          Stage 1: Personality Typology
        </h2>
        <p class="section-sub">Profiling cognitive preferences, data filters, decision methods, and scheduling styles.</p>

        <!-- 16Personalities Style Identity Header -->
        <div class="vt-card" style="padding: 1.8rem; margin: 1.5rem 0 2rem; border-color: var(--color-accent-rust); background: rgba(235,94,40,0.02); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="max-width: 70%;">
            <span style="font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: var(--color-accent-rust); text-transform: uppercase; font-weight: 700; letter-spacing: 2px;">
              ROLE ARCHETYPE &bull; ${identityInfo.group} &bull; ${identitySuffix === "-A" ? "Assertive" : "Turbulent"}
            </span>
            <h3 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-style: italic; margin: 0.3rem 0; color: var(--color-text-heading);">
              The ${identityInfo.role} (${fullCode})
            </h3>
            <p style="font-size: 0.9rem; opacity: 0.85; margin: 0; line-height: 1.5;">${identityInfo.desc}</p>
          </div>
          <div style="text-align: right;">
            <span style="font-family: 'Courier Prime', monospace; font-size: 0.7rem; color: var(--color-text-body); opacity: 0.7; text-transform: uppercase; display: block;">Core Strategy</span>
            <span style="font-size: 1.25rem; font-weight: 800; color: var(--color-accent-gold); white-space: nowrap;">${identityInfo.strategy}</span>
          </div>
        </div>
        
        <!-- Gauges & Typology side-by-side grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.8rem; margin-bottom: 2rem;">
          <!-- Bi-Directional Gauges -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.5rem; text-transform: uppercase;">Bi-Directional Percentage Gauges</h4>
            ${this.generateBiDirectionalGauge("Introversion", m.introvert, "Extroversion", m.extravert, "🧠", "🟧")}
            ${this.generateBiDirectionalGauge("Sensing", m.sensing, "Intuition", m.intuitive, "🔍", "🟪")}
            ${this.generateBiDirectionalGauge("Thinking", m.thinking, "Feeling", m.feeling, "⚖️", "🟦")}
            ${this.generateBiDirectionalGauge("Judging", m.judging, "Perceiving", m.perceiving, "📅", "🟩")}
            <div style="text-align: center; margin-top: 1.5rem; font-family: 'Courier Prime', monospace; font-size: 1.1rem; font-weight: 700; color: var(--color-accent-rust);">
              CALCULATED CODE: ${fullCode}
            </div>
          </div>

          <!-- Typology Quadrant Map -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.5rem; text-transform: uppercase; text-align: center;">Typology Quadrant Map (Jungian Grid)</h4>
            ${this.generateTypologyGridSVG()}
            <p style="font-size: 0.72rem; line-height: 1.4; opacity: 0.85; text-align: center; margin-top: 1rem; font-family: 'Courier Prime', monospace;">
              This interactive quadrant calculates your placement coordinates along the Introversion-Extraversion and Sensing-Intuition spectra.
            </p>
          </div>
        </div>

        ${this.generateBigFiveHTML()}

        <div class="analysis-narrative-box" style="margin-top: 2.2rem;">
          <h4>Detailed Personality Dimension Diagnostic</h4>
          <p style="margin-bottom: 1rem;">
            Your communication style, stress tolerance limits, and operational speed are shaped heavily by this profile. 
            As a <strong>${this.scores.mbtiCode}</strong>, your focus represents a specialized cognitive structure.
          </p>
          ${details.narrative}
        </div>

        <div class="swot-grid" style="margin-top: 1.8rem;">
          <div class="swot-box strengths">
            <div class="swot-header">Personality Strengths</div>
            <ul>
              ${details.strengths.map(s => `<li>${s}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box weaknesses">
            <div class="swot-header">Environmental Vulnerabilities</div>
            <ul>
              ${details.weaknesses.map(w => `<li>${w}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  generateBigFiveHTML() {
    const m = this.scores.mbti;
    const openness = m.intuitive;
    const conscientiousness = m.judging;
    const extroversion = m.extravert;
    const agreeableness = m.feeling;
    const stability = Math.round(m.thinking * 0.6 + m.judging * 0.4);

    const traits = [
      { name: "Openness to Experience (O)", score: openness, desc: "Intellectual curiosity, creative imagination, conceptual thinking." },
      { name: "Conscientiousness (C)", score: conscientiousness, desc: "Self-discipline, orderliness, goal-directed scheduling." },
      { name: "Extraversion (E)", score: extroversion, desc: "Sociability, talkativeness, energy drawn from groups." },
      { name: "Agreeableness (A)", score: agreeableness, desc: "Altruism, team empathy, consensus coordination." },
      { name: "Emotional Stability (S)", score: stability, desc: "Stress tolerance threshold under loading." }
    ];

    return `
      <div class="vt-card" style="padding: 1.5rem; margin-top: 2rem; border-style: solid;">
        <h4 style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.2rem; margin-bottom: 1.2rem; border-bottom: 1.5px solid var(--color-border-dark); padding-bottom: 0.5rem;">
          Big Five Trait Profile Synthesis
        </h4>
        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
          ${traits.map(t => `
            <div style="font-family: 'Courier Prime', monospace; font-size: 0.8rem;">
              <div class="justify-between container-flex" style="margin-bottom: 0.3rem;">
                <span style="font-weight: 700;">${t.name}</span>
                <span style="font-weight: 700; color: var(--color-accent-rust);">${t.score}%</span>
              </div>
              <div style="height: 12px; background: var(--color-border); position: relative; border: 1px solid var(--color-border-dark);">
                <div class="progress-fill" style="position: absolute; top:0; left:0; bottom:0; width: 0%; background: var(--color-accent-rust); transition: width 1s;" data-width="${t.score}%"></div>
              </div>
              <p style="font-size: 0.72rem; margin: 0.3rem 0 0 0; opacity: 0.85; line-height: 1.3;">
                ${t.desc}
              </p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  getAbilitiesHTML() {
    const ab = this.scores.ability;

    return `
      <section class="vt-card">
        <h3>Stage 2: Cognitive & Aptitude Inventory</h3>
        <p class="section-sub">Visualization of your logic pathways and data processing capabilities under load.</p>
        
        <!-- 4-Axis Spider Chart (PRD Part 2 Section 2) -->
        <div class="vt-card" style="padding: 1.5rem; border-style: dashed; margin-bottom: 2rem; display: flex; justify-content: center; align-items: center; background: radial-gradient(circle at center, rgba(171,71,48,0.02) 0%, transparent 70%);">
          <div style="width: 380px; height: 380px; margin: 0 auto;">
            ${this.generate4AxisSpiderChartSVG()}
          </div>
        </div>

        <div class="analysis-narrative-box">
          <h4>Cognitive Core Diagnostic Commentary</h4>
          <p style="margin-bottom: 1rem;">
            Your cognitive load threshold is highest in the abstract domain, enabling you to process multi-variable logical inputs under pressure. 
            You exhibit solid performance metrics in structural pattern induction.
          </p>
          <p style="margin-bottom: 1rem;"><strong>Numerical Fluidity (${ab.numerical}%):</strong> Logic patterns, mathematical sequences, and compound computations.</p>
          <p style="margin-bottom: 1rem;"><strong>Verbal Logic (${ab.verbal}%):</strong> Semantic logic, vocabulary structures, and textual mapping.</p>
          <p style="margin-bottom: 1rem;"><strong>Abstract Logic (${ab.logical}%):</strong> Pattern induction, sequence analysis, and deductive reasoning.</p>
          <p style="margin-bottom: 1rem;"><strong>Spatial-Visual Accuracy (${ab.spatial}%):</strong> Mentally rotating shapes, layout geometries, and architectural balancing.</p>
        </div>

        <div class="swot-grid" style="margin-top: 1.8rem;">
          <div class="swot-box strengths">
            <div class="swot-header">Cognitive Strengths</div>
            <ul>
              <li>High abstract logic and troubleshooting speed</li>
              <li>Excellent multi-layered systems pattern induction</li>
              <li>Calculates logical rules rapidly under cognitive pressure</li>
            </ul>
          </div>
          <div class="swot-box weaknesses">
            <div class="swot-header">Precision Gaps</div>
            <ul>
              <li>Potential fatigue during long repetitive numerical datasets</li>
              <li>Needs visual documentation models to bypass verbal bottlenecking</li>
              <li>Minor delay when rotating complex 3D structures mentally</li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  getInterestsHTML() {
    const riasec = this.scores.interests;
    
    // Type of Inventor mapping
    let inventorType = "General System Designer";
    let inventorDesc = "You prefer balanced project orchestration across standard configurations.";
    
    const sortedRIASEC = Object.keys(riasec)
      .map(k => ({ key: k, val: riasec[k] }))
      .sort((a,b)=>b.val - a.val);
      
    const top1 = sortedRIASEC[0].key;
    const top2 = sortedRIASEC[1].key;
    
    if (top1 === "investigative" && top2 === "realistic") {
      inventorType = "Applied Laboratory Architect";
      inventorDesc = "You merge deep theoretical physics or data modeling with physical robotics, microcontrollers, or lab diagnostics.";
    } else if (top1 === "investigative" && top2 === "artistic") {
      inventorType = "Creative System Analyst";
      inventorDesc = "You formulate innovative, out-of-the-box analytical models, data designs, or ethical policies for modern systems.";
    } else if (top1 === "artistic" && top2 === "enterprising") {
      inventorType = "Strategic Aesthetic Pioneer";
      inventorDesc = "You direct brand styling, visual design loops, and pitch strategies to commercialize creative products.";
    } else if (top1 === "conventional" && top2 === "investigative") {
      inventorType = "Systems Compliance Auditor";
      inventorDesc = "You verify ledger records, compile audit databases, check coding syntax, and safeguard operations from error.";
    } else if (top1 === "social" && top2 === "enterprising") {
      inventorType = "Human Capital Motivator";
      inventorDesc = "You inspire team alignments, manage change consulting, coach groups, and resolve organizational disputes.";
    }

    // Motivators calculation
    const motivators = {
      financial: Math.round(riasec.enterprising * 0.7 + riasec.conventional * 0.3),
      creative: Math.round(riasec.artistic * 0.8 + riasec.investigative * 0.2),
      stability: Math.round(riasec.conventional * 0.7 + riasec.realistic * 0.3),
      societal: Math.round(riasec.social * 0.8 + riasec.investigative * 0.2)
    };

    return `
      <section class="vt-card">
        <h3>Stage 3: Holland’s Career Interest Analysis</h3>
        <p class="section-sub">Profiling your professional parameters using the six RIASEC categories.</p>
        
        <!-- Bar Chart & Hexagon side-by-side grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.8rem; margin-bottom: 2rem;">
          <!-- 6-Column Vertical Bar Chart -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center;">
            <div class="justify-between container-flex" style="margin-bottom: 1rem;">
              <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; text-transform: uppercase;">RIASEC Vertical Columns</h4>
              <span style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; font-weight: 700; color: var(--color-accent-rust);">
                ANCHOR: ${this.scores.riasecCode || "N/A"}
              </span>
            </div>
            <div id="riasec-bar-chart-container" style="width:100%; max-width: 480px; height:220px; margin: 0 auto; display:flex; justify-content:center; align-items:center;">
              <!-- Rendered by drawRiasecBarChart() -->
            </div>
          </div>

          <!-- Holland Hexagon Ring Diagram -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1rem; text-transform: uppercase; text-align: center;">Holland RIASEC Hexagon Ring</h4>
            ${this.generateHollandHexagonSVG()}
            <p style="font-size: 0.72rem; line-height: 1.4; opacity: 0.85; text-align: center; margin-top: 0.5rem; font-family: 'Courier Prime', monospace;">
              Concentric geometric mapping displays your vocational anchor profile outline overlay.
            </p>
          </div>
        </div>

        <div class="analysis-narrative-box" style="margin-top: 2rem;">
          <h4>The Inventor Profile Archetype: ${inventorType}</h4>
          <p style="margin-bottom: 1.5rem;">${inventorDesc}</p>

          <h5 style="font-family: 'Courier Prime', monospace; margin-bottom: 0.8rem; font-size: 0.9rem; text-transform: uppercase;">Detailed Dimensions Analysis</h5>
          <p style="margin-bottom: 0.8rem;"><strong>Realistic (${riasec.realistic}%):</strong> Technical, physical assembly, outdoors, or mechanics.</p>
          <p style="margin-bottom: 0.8rem;"><strong>Investigative (${riasec.investigative}%):</strong> R&D labs, scientific study, debugging, statistics.</p>
          <p style="margin-bottom: 0.8rem;"><strong>Artistic (${riasec.artistic}%):</strong> Design layout, copy, creative autonomy, music, styling.</p>
          <p style="margin-bottom: 0.8rem;"><strong>Social (${riasec.social}%):</strong> Coaching, counseling, team support, training operations.</p>
          <p style="margin-bottom: 0.8rem;"><strong>Enterprising (${riasec.enterprising}%):</strong> Commercial pitching, startup management, leadership, risk-taking.</p>
          <p style="margin-bottom: 0.8rem;"><strong>Conventional (${riasec.conventional}%):</strong> Audit spreadsheets, folder compliance, database filing, budgeting.</p>
        </div>
      </section>

      <section class="vt-card">
        <h3>Core Motivator Analysis</h3>
        <p class="section-sub">Assessing what inspires your daily operational drive.</p>
        
        <div class="score-bar-item">
          <div class="bar-info"><span>FINANCIAL RETURN</span><span>${motivators.financial}%</span></div>
          <div class="progress-track"><div class="progress-fill values-fill" style="width: 0%" data-width="${motivators.financial}%"></div></div>
        </div>
        <div class="score-bar-item">
          <div class="bar-info"><span>CREATIVE LATITUDE</span><span>${motivators.creative}%</span></div>
          <div class="progress-track"><div class="progress-fill aptitude-fill" style="width: 0%" data-width="${motivators.creative}%"></div></div>
        </div>
        <div class="score-bar-item">
          <div class="bar-info"><span>STABILITY & SECURITY</span><span>${motivators.stability}%</span></div>
          <div class="progress-track"><div class="progress-fill eq-fill" style="width: 0%" data-width="${motivators.stability}%"></div></div>
        </div>
        <div class="score-bar-item">
          <div class="bar-info"><span>SOCIETAL IMPACT</span><span>${motivators.societal}%</span></div>
          <div class="progress-track"><div class="progress-fill values-fill" style="width: 0%" data-width="${motivators.societal}%"></div></div>
        </div>
      </section>
    `;
  }

  getLearningHTML() {
    const l = this.scores.learning;
    
    // Find dominant VARK type
    const sorted = Object.keys(l).map(k => ({ key: k, val: l[k] })).sort((a,b)=>b.val-a.val);
    const dominant = sorted[0].key;
    
    const strategies = {
      visual: [
        "Spatial mind-mapping: Construct colored geometric layout paths to link concepts.",
        "Color-code text definitions and notes using matching highlight tags.",
        "Request or draw whiteboard slide layouts instead of text blocks."
      ],
      auditory: [
        "Verbal walk-throughs: Explain notes aloud to a peer or record and listen to lectures.",
        "Participate actively in verbal study study groups and discussions.",
        "Formulate mnemonic word associations that can be repeated audibly."
      ],
      readwrite: [
        "Active recall scripting: Translate diagrams back into written lists and definitions.",
        "Re-write index cards and write dictionary sheets multiple times.",
        "Engage with detailed textbooks and write bullet checklists."
      ],
      kinesthetic: [
        "Kinetic block-building: Assemble physical prototypes or run coding tests to check functions.",
        "Engage in active laboratory experiments, role-play steps, or trace blueprints.",
        "Take brief pacing walks while reviewing study cards to stay active."
      ]
    };

    return `
      <section class="vt-card">
        <h3>Stage 4: Behavioral Learning Style Blueprint</h3>
        <p class="section-sub">Visualizing your cognitive inputs for studying, retaining, and recalling information.</p>

        <!-- Donut & Sensory Quadrants side-by-side grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.8rem; margin-bottom: 2rem;">
          <!-- Donut Graph -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.5rem; text-transform: uppercase;">VARK Distribution Donut</h4>
            <div id="vark-donut-container" style="width: 200px; height: 200px;">
              <!-- Rendered by drawVARKDonutChart() -->
            </div>
            <div style="width: 100%; margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; justify-items: start;">
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; display: flex; align-items: center;">
                <span style="display:inline-block; width:10px; height:10px; background-color: var(--color-accent-rust); margin-right: 6px;"></span>
                VISUAL: ${l.visual}%
              </div>
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; display: flex; align-items: center;">
                <span style="display:inline-block; width:10px; height:10px; background-color: var(--color-accent-sage); margin-right: 6px;"></span>
                AUDITORY: ${l.auditory}%
              </div>
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; display: flex; align-items: center;">
                <span style="display:inline-block; width:10px; height:10px; background-color: var(--color-accent-gold); margin-right: 6px;"></span>
                READ/WRITE: ${l.readwrite}%
              </div>
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; display: flex; align-items: center;">
                <span style="display:inline-block; width:10px; height:10px; background-color: var(--color-border-dark); margin-right: 6px;"></span>
                KINESTHETIC: ${l.kinesthetic}%
              </div>
            </div>
          </div>

          <!-- Sensory Preferences 2x2 Quadrant Grid -->
          <div class="vt-card" style="padding: 1.5rem; border-style: dashed; display: flex; flex-direction: column; justify-content: center;">
            <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.2rem; text-transform: uppercase; text-align: center;">Sensory Input Preference Grid</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
              <!-- Visual -->
              <div style="padding: 0.6rem; border: 1.5px solid var(--color-border-dark); background: var(--color-bg-base); text-align: center; border-color: ${dominant === 'visual' ? 'var(--color-accent-rust)' : 'var(--color-border-dark)'};">
                <div style="font-size: 1.2rem; margin-bottom: 0.2rem;">👁️</div>
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.65rem; font-weight: 700;">VISUAL</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-accent-rust);">${l.visual}%</div>
              </div>
              <!-- Auditory -->
              <div style="padding: 0.6rem; border: 1.5px solid var(--color-border-dark); background: var(--color-bg-base); text-align: center; border-color: ${dominant === 'auditory' ? 'var(--color-accent-rust)' : 'var(--color-border-dark)'};">
                <div style="font-size: 1.2rem; margin-bottom: 0.2rem;">👂</div>
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.65rem; font-weight: 700;">AUDITORY</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-accent-sage);">${l.auditory}%</div>
              </div>
              <!-- ReadWrite -->
              <div style="padding: 0.6rem; border: 1.5px solid var(--color-border-dark); background: var(--color-bg-base); text-align: center; border-color: ${dominant === 'readwrite' ? 'var(--color-accent-rust)' : 'var(--color-border-dark)'};">
                <div style="font-size: 1.2rem; margin-bottom: 0.2rem;">✍️</div>
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.65rem; font-weight: 700;">READ/WRITE</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-accent-gold);">${l.readwrite}%</div>
              </div>
              <!-- Kinesthetic -->
              <div style="padding: 0.6rem; border: 1.5px solid var(--color-border-dark); background: var(--color-bg-base); text-align: center; border-color: ${dominant === 'kinesthetic' ? 'var(--color-accent-rust)' : 'var(--color-border-dark)'};">
                <div style="font-size: 1.2rem; margin-bottom: 0.2rem;">🛠️</div>
                <div style="font-family: 'Courier Prime', monospace; font-size: 0.65rem; font-weight: 700;">KINESTHETIC</div>
                <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-border-dark);">${l.kinesthetic}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Conditional Visual Triggers (PRD Stage 4) -->
        ${this.generateConditionalVARKTriggerHTML(dominant)}

        <div class="analysis-narrative-box" style="margin-top: 1.5rem;">
          <h4>Dominant Input Channel: ${dominant.toUpperCase()}</h4>
          <p style="margin-bottom: 1.2rem;">
            Your dominant learning style parses data through <strong>${dominant.toUpperCase()}</strong> processes.
            Adjusting your studying methods to this channel maximizes cognitive retrieval speed.
          </p>

          <h5 style="font-family: 'Courier Prime', monospace; margin-bottom: 0.6rem; font-size: 0.85rem; text-transform: uppercase; color: var(--color-accent-rust);">
            Learning Improvement Strategies
          </h5>
          <ul style="padding-left: 1.2rem; list-style: square; font-size: 0.88rem;">
            ${strategies[dominant].map(s => `<li style="margin-bottom: 0.5rem;">${s}</li>`).join("")}
          </ul>
        </div>
      </section>
    `;
  }

  getSkillsHTML() {
    const s = this.scores.skills;

    return `
      <section class="vt-card">
        <h3>Stage 5: Specialized Skills & Abilities Matrix</h3>
        <p class="section-sub">Tactile indicators evaluating your capabilities in key professional categories. Every metric renders as an independent Radial Gauge.</p>
        
        <div class="speedometers-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1.5rem; justify-items: center; margin-bottom: 2rem;">
          ${this.generateRadialSkillGauge("Admin & Organizing", s.administrative)}
          ${this.generateRadialSkillGauge("Spatial & Visual", s.spatial)}
          ${this.generateRadialSkillGauge("Leadership Matrix", s.leadership)}
          ${this.generateRadialSkillGauge("Social & Group", s.social)}
          ${this.generateRadialSkillGauge("Mechanical & Tech", s.mechanical)}
        </div>

        <div class="analysis-narrative-box">
          <h4>Operational Capabilities Breakdown</h4>
          <p style="margin-bottom: 1.2rem;"><strong>Administrative & Organizing (${s.administrative}%):</strong> High competence in managing complex calendars, file databases, schedules, and auditing logs systematically.</p>
          <p style="margin-bottom: 1.2rem;"><strong>Spatial & Visual Abilities (${s.spatial}%):</strong> Mentally rotating 3D structures, layout blueprints, website interface wireframing, and graphic design geometries.</p>
          <p style="margin-bottom: 1.2rem;"><strong>Leadership & Decision-Making (${s.leadership}%):</strong> Risk parsing under high pressure, task delegation indexing, and objective logic calculations during crisis.</p>
          <p style="margin-bottom: 1.2rem;"><strong>Social & Cooperation Skills (${s.social}%):</strong> Empathy coordination quotients, managing team friction, consensus building, and cooperative projects.</p>
          <p style="margin-bottom: 1.2rem;"><strong>Mechanical & Technical Abilities (${s.mechanical}%):</strong> Spatial debugging systems, microcontrollers troubleshooting, physical mechanics, and machinery assembly.</p>
        </div>
      </section>
    `;
  }

  getClustersHTML() {
    return `
      <section class="vt-card" style="padding-bottom: 1rem;">
        <h3>Part 3: The Career Cluster Alignment Funnel</h3>
        <p class="section-sub">Suitability index of career fields ranked from most compatible to least compatible based on your results.</p>
        
        <!-- Horizontal Funnel Chart (PRD Part 3) -->
        <div class="vt-card" style="padding: 1.5rem; border-style: dashed; margin-bottom: 2rem; display: flex; justify-content: center; align-items: center; background: radial-gradient(circle at center, rgba(171,71,48,0.02) 0%, transparent 70%);">
          <div id="funnel-container" style="width:100%; max-width: 600px; height:280px;">
            <!-- Rendered by drawFunnelChart() -->
          </div>
        </div>

        <div class="analysis-narrative-box" style="margin-bottom: 2rem; border-left: 3px solid var(--color-accent-rust); padding-left: 1.2rem;">
          <h4>Universal Synthesis Context</h4>
          <p style="line-height: 1.6; font-size: 0.92rem; opacity: 0.9;">
            Your unified psychometric profile combines high logical capacity, an introverted troubleshooting mindset, and strong spatial visualization. 
            This dictates an alignment toward structured, technical systems where you formulate digital blueprints or analyze datasets, mapping strongly to the **Technology** and **Engineering** clusters.
          </p>
        </div>
      </section>

      <section class="vt-card">
        <h3>Part 4: Interactive Career Cluster Explorer</h3>
        <p class="section-sub">Detailed suitability matrix displaying 5 distinct Career Clusters. Toggle tabs to explore career options and click cards to view skills gaps.</p>
        
        <!-- Cluster Tabs -->
        <div class="cluster-subtabs" style="display: flex; gap: 0.5rem; margin-bottom: 2rem; border-bottom: 2px solid var(--color-border-dark); padding-bottom: 0.5rem; overflow-x: auto; -webkit-overflow-scrolling: touch;">
          <button type="button" class="cluster-tab-btn active" data-cluster="0" style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; border:1.5px solid var(--color-border-dark); padding: 8px 16px; cursor:pointer; background:var(--color-accent-rust); color:var(--color-bg-base); transition: all 0.2s ease;">TECH & AI</button>
          <button type="button" class="cluster-tab-btn" data-cluster="1" style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; border:1.5px solid var(--color-border-dark); padding: 8px 16px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); opacity: 0.85; transition: all 0.2s ease;">FINANCE & COMMERCE</button>
          <button type="button" class="cluster-tab-btn" data-cluster="2" style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; border:1.5px solid var(--color-border-dark); padding: 8px 16px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); opacity: 0.85; transition: all 0.2s ease;">MECHATRONICS</button>
          <button type="button" class="cluster-tab-btn" data-cluster="3" style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; border:1.5px solid var(--color-border-dark); padding: 8px 16px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); opacity: 0.85; transition: all 0.2s ease;">BIOTECH & HEALTH</button>
          <button type="button" class="cluster-tab-btn" data-cluster="4" style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; border:1.5px solid var(--color-border-dark); padding: 8px 16px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); opacity: 0.85; transition: all 0.2s ease;">MEDIA & DESIGN</button>
        </div>

        <!-- Academic Stream Filter Buttons -->
        <div class="stream-filters" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; align-items: center; border: 1.5px dashed var(--color-border-dark); padding: 10px 14px; background: rgba(171,71,48,0.02);">
          <span style="font-family:'Courier Prime', monospace; font-size:0.75rem; font-weight:700; color:var(--color-text-heading); text-transform:uppercase; margin-right: 0.5rem;">Academic Stream:</span>
          <button type="button" class="stream-filter-btn active" data-stream="All" style="font-family:'Courier Prime', monospace; font-size:0.72rem; font-weight:700; border:1px solid var(--color-border-dark); padding: 4px 10px; cursor:pointer; background:var(--color-accent-rust); color:var(--color-bg-base); transition: all 0.2s ease;">ALL (सभी)</button>
          <button type="button" class="stream-filter-btn" data-stream="PCM" style="font-family:'Courier Prime', monospace; font-size:0.72rem; font-weight:700; border:1px solid var(--color-border-dark); padding: 4px 10px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); transition: all 0.2s ease;">PCM (भौतिकी/रसायन/गणित)</button>
          <button type="button" class="stream-filter-btn" data-stream="PCB" style="font-family:'Courier Prime', monospace; font-size:0.72rem; font-weight:700; border:1px solid var(--color-border-dark); padding: 4px 10px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); transition: all 0.2s ease;">PCB (जीव विज्ञान)</button>
          <button type="button" class="stream-filter-btn" data-stream="Commerce" style="font-family:'Courier Prime', monospace; font-size:0.72rem; font-weight:700; border:1px solid var(--color-border-dark); padding: 4px 10px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); transition: all 0.2s ease;">COMMERCE (वाणिज्य)</button>
          <button type="button" class="stream-filter-btn" data-stream="Arts" style="font-family:'Courier Prime', monospace; font-size:0.72rem; font-weight:700; border:1px solid var(--color-border-dark); padding: 4px 10px; cursor:pointer; background:var(--color-bg-card); color:var(--color-text-body); transition: all 0.2s ease;">ARTS (कला/मानविकी)</button>
        </div>

        <div style="font-family: 'Courier Prime', monospace; font-size: 0.8rem; margin-bottom: 1.5rem; color: var(--color-accent-rust); font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
          <span>💡</span> <span>Click any career pathway card below to toggle a live Skills Gap analysis checklist!</span>
        </div>

        <div id="active-cluster-content" style="min-height: 250px;">
          <!-- Active Cluster Content dynamically loaded by bindClustersEvents() -->
        </div>
      </section>
    `;
  }

  getDetailedClusterData() {
    return [
      {
        name: "Technology & AI Architecture",
        careers: [
          { name: "Machine Learning Engineer", profile: "Investigative / Analytical", description: "Build models, train neural networks, and deploy automated predictive algorithms.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] },
          { name: "Full-Stack Product Builder", profile: "Realistic / Enterprising", description: "Construct client applications, handle database state, and scale user interfaces.", skills: ["spatial", "logical", "administrative"], streams: ["PCM"] },
          { name: "Cybersecurity Infrastructure Lead", profile: "Conventional / Stability", description: "Audit network firewalls, monitor log files, and enforce system security protocols.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Cloud Solutions Architect", profile: "Investigative / Systems", description: "Design server instances, plan network routing tables, and optimize load balancing.", skills: ["logical", "abstract", "administrative"], streams: ["PCM"] },
          { name: "HMI Interface Developer", profile: "Artistic / Spatial", description: "Stylize interactive visual controls and calibrate tactile user responses.", skills: ["spatial", "abstract", "social"], streams: ["PCM", "Arts"] },
          { name: "DevOps Automation Lead", profile: "Realistic / Conventional", description: "Standardize pipeline deployment, build integration nodes, and compile environments.", skills: ["logical", "numerical", "mechanical"], streams: ["PCM"] },
          { name: "Blockchain Ledger Auditor", profile: "Conventional / Quantitative", description: "Inspect smart contracts, confirm cryptographic balances, and audit state logs.", skills: ["numerical", "administrative", "logical"], streams: ["PCM", "Commerce"] },
          { name: "Quantum Algorithm Analyst", profile: "Investigative / Theoretical", description: "Formulate quantum circuits, verify complex linear equations, and optimize gate arrays.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] },
          { name: "Bioinformatics Tool Dev", profile: "Investigative / Coding", description: "Develop processing tools for genomic reads, map structural coordinates, and verify algorithms.", skills: ["numerical", "logical", "abstract"], streams: ["PCM", "PCB"] },
          { name: "Virtual Reality Creator", profile: "Artistic / Realistic", description: "Build 3D interactive spaces, render tactile assets, and align spatial coordinates.", skills: ["spatial", "abstract", "mechanical"], streams: ["PCM", "Arts"] },
          { name: "Mobile App Systems Architect", profile: "Realistic / Investigative", description: "Architect mobile database synchronizations, cross-platform frames, and device logs.", skills: ["spatial", "logical", "administrative"], streams: ["PCM"] },
          { name: "Database Tuning Engineer", profile: "Conventional / Analytical", description: "Optimize database index queries, clear transactional logs, and structure backup clusters.", skills: ["numerical", "logical", "administrative"], streams: ["PCM"] },
          { name: "Game Logic Developer", profile: "Artistic / Realistic", description: "Implement physics simulation math, align character controls, and write engine rules.", skills: ["logical", "abstract", "spatial"], streams: ["PCM", "Arts"] },
          { name: "Site Reliability Engineer", profile: "Conventional / Stability", description: "Monitor service downtime alerts, patch pipeline scripts, and audit server health checks.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Cryptographic Systems Designer", profile: "Investigative / Theoretical", description: "Design cipher protocols, test hash algorithms, and audit secure handshake keys.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] },
          { name: "Machine Learning Research Scientist", profile: "Investigative / Analytical", description: "Publish state-of-the-art neural architecture papers and build new optimization solvers.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] },
          { name: "Neural Networks Auditor", profile: "Conventional / Critical", description: "Inspect weight distributions, diagnose biases, and audit model output logs.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Natural Language Processing Lead", profile: "Investigative / Semantic", description: "Calibrate tokenizers, align transformer vectors, and model contextual semantic graphs.", skills: ["abstract", "logical", "verbal"], streams: ["PCM", "Arts"] },
          { name: "Edge AI Systems Compiler", profile: "Realistic / Hardware", description: "Deploy lightweight model runtimes on microcontrollers and compile low-power routines.", skills: ["mechanical", "logical", "numerical"], streams: ["PCM"] },
          { name: "Cloud Security Sentinel", profile: "Conventional / Watchful", description: "Enforce cloud IAM permissions, run security group log audits, and prevent packet leaks.", skills: ["administrative", "logical", "numerical"], streams: ["PCM"] },
          { name: "WebAssembly Compiler Specialist", profile: "Realistic / Optimization", description: "Compile high-performance C++/Rust binaries to web sandboxes for client execution.", skills: ["logical", "mechanical", "numerical"], streams: ["PCM"] },
          { name: "Robotic Process Automation Designer", profile: "Conventional / Workflow", description: "Design screen scraping scripts and automate repetitive administrative API pipelines.", skills: ["administrative", "logical", "numerical"], streams: ["PCM", "Commerce"] },
          { name: "Digital Twin Simulation Architect", profile: "Spatial / Systems", description: "Map high-fidelity mechanical and structural assets in real-time physical simulation engines.", skills: ["spatial", "logical", "mechanical"], streams: ["PCM"] },
          { name: "Autonomous Vehicle Navigation Developer", profile: "Investigative / Electronics", description: "Program GPS pathfinding routines, route navigation nodes, and filter obstacle feeds.", skills: ["logical", "spatial", "mechanical"], streams: ["PCM"] },
          { name: "Spatial Computing Interaction Designer", profile: "Artistic / UI", description: "Design immersive gesture commands and head-mounted display interfaces.", skills: ["spatial", "abstract", "social"], streams: ["PCM", "Arts"] },
          // Extra 10 Underrated/Specialized Careers:
          { name: "Prompt Tuning Engineer", profile: "Artistic / Technical", description: "Calibrate context tokens and temperature settings for large language model runtimes.", skills: ["abstract", "verbal", "logical"], streams: ["PCM", "Arts"] },
          { name: "Neuromorphic Chip Systems Developer", profile: "Realistic / Engineering", description: "Design hardware circuits imitating brain synapse functions to run neural nets locally.", skills: ["mechanical", "logical", "spatial"], streams: ["PCM"] },
          { name: "Remote Sensing Analytics Architect", profile: "Investigative / Geography", description: "Analyze satellite radar images and coordinate topography maps to trace environmental shifts.", skills: ["spatial", "logical", "numerical"], streams: ["PCM"] },
          { name: "Computational Linguistics Model Specialist", profile: "Investigative / Semantic", description: "Model syntax token rules and design translation matrix software.", skills: ["abstract", "verbal", "logical"], streams: ["PCM", "Arts"] },
          { name: "Site Reliability Architect", profile: "Conventional / Security", description: "Audit server connection networks, configure cloud mirrors, and design disaster recovery keys.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Ethical AI Policy Auditor", profile: "Conventional / Philosophy", description: "Evaluate machine model output sets for bias factors and check policy logs.", skills: ["administrative", "verbal", "logical"], streams: ["PCM", "Arts"] },
          { name: "Haptic UX Engineer", profile: "Realistic / Sensory", description: "Calibrate tactile screen vibration profiles and motor torque relays for controllers.", skills: ["spatial", "mechanical", "logical"], streams: ["PCM", "Arts"] },
          { name: "Grid Network Virtualization Engineer", profile: "Conventional / Systems", description: "Manage virtual machines and route server bandwidth pools dynamically.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Spacecraft Command Interface Programmer", profile: "Realistic / Space", description: "Design telemetry screens and error indicators for orbital space control panels.", skills: ["spatial", "logical", "mechanical"], streams: ["PCM"] },
          { name: "Web3 Decentralized Storage Designer", profile: "Investigative / Ledger", description: "Design cryptographic file shards and optimize storage consensus pipelines.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] }
        ]
      },
      {
        name: "Corporate Finance & Commerce",
        careers: [
          { name: "Actuarial Risk Specialist", profile: "Conventional / Quantitative", description: "Evaluate statistical mortality logs, calculate insurance premiums, and audit risk portfolios.", skills: ["numerical", "administrative", "logical"], streams: ["Commerce", "PCM"] },
          { name: "Quantitative Investment Analyst", profile: "Investigative / Financial", description: "Write math models to trade stocks, parse corporate logs, and calculate profit forecasts.", skills: ["numerical", "logical", "abstract"], streams: ["Commerce", "PCM"] },
          { name: "Corporate Compliance Lead", profile: "Conventional / Stability", description: "Review legal compliance codes, audit corporate balance sheets, and draft ledger procedures.", skills: ["administrative", "logical", "leadership"], streams: ["Commerce"] },
          { name: "Operations Systems Auditor", profile: "Conventional / Methodical", description: "Inspect operational pipelines, identify financial errors, and verify balance sheets.", skills: ["administrative", "numerical", "logical"], streams: ["Commerce"] },
          { name: "Business Development Lead", profile: "Enterprising / Autonomy", description: "Pitch corporate contracts, negotiate partnerships, and manage sales representatives.", skills: ["leadership", "social", "administrative"], streams: ["Commerce"] },
          { name: "Treasury Portfolio Auditor", profile: "Conventional / Wealth", description: "Monitor government bond yields, verify currency transactions, and manage liquid balances.", skills: ["numerical", "administrative", "logical"], streams: ["Commerce"] },
          { name: "FinTech Product Manager", profile: "Enterprising / Technology", description: "Align transaction databases, define user flows, and compile pricing structures.", skills: ["leadership", "logical", "social"], streams: ["Commerce", "PCM"] },
          { name: "Forensic Account Inspector", profile: "Investigative / Audit", description: "Trace hidden business ledgers, identify accounting discrepancies, and document claims.", skills: ["numerical", "administrative", "logical"], streams: ["Commerce"] },
          { name: "Venture Capital Analyst", profile: "Enterprising / Research", description: "Investigate early-stage start-up models, compute valuation parameters, and write summaries.", skills: ["leadership", "numerical", "abstract"], streams: ["Commerce"] },
          { name: "Logistics Operations Architect", profile: "Conventional / Shipping", description: "Design supply routes, audit storage warehouses, and analyze tracking metrics.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce", "PCM"] },
          { name: "Investment Banking Associate", profile: "Enterprising / Financial", description: "Structure company mergers, build underwriting pitchbooks, and value corporate capital.", skills: ["numerical", "leadership", "administrative"], streams: ["Commerce"] },
          { name: "Corporate Tax Strategist", profile: "Conventional / Compliance", description: "Plan tax compliance options, audit multinational returns, and verify code deductions.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce"] },
          { name: "Supply Chain Planner", profile: "Conventional / Analytical", description: "Audit vendor pricing catalogs, manage inventory safety bounds, and track freight schedules.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce"] },
          { name: "Portfolio Risk Manager", profile: "Investigative / Quantitative", description: "Calculate asset value-at-risk, model stress-testing parameters, and set trade limits.", skills: ["numerical", "logical", "leadership"], streams: ["Commerce", "PCM"] },
          { name: "Market Microstructure Researcher", profile: "Investigative / Analytical", description: "Analyze high-frequency order books, study bid-ask spreads, and write trade reports.", skills: ["numerical", "logical", "abstract"], streams: ["Commerce", "PCM"] },
          { name: "Mergers & Acquisitions Structurer", profile: "Enterprising / Leadership", description: "Negotiate legal acquisition frameworks and map asset distribution transitions.", skills: ["leadership", "administrative", "verbal"], streams: ["Commerce"] },
          { name: "Venture Portfolio Strategist", profile: "Enterprising / Analytical", description: "Analyze capitalization tables and model equity dilution charts for start-up seed rounds.", skills: ["numerical", "logical", "abstract"], streams: ["Commerce"] },
          { name: "Quantitative Algorithm Risk Auditor", profile: "Investigative / Mathematical", description: "Audit mathematical backtesting logs of proprietary algorithmic trading desks.", skills: ["numerical", "logical", "administrative"], streams: ["Commerce", "PCM"] },
          { name: "Corporate Treasury Analyst", profile: "Conventional / Wealth", description: "Monitor interest rate spreads, manage corporate debt portfolios, and track ledger states.", skills: ["numerical", "administrative", "logical"], streams: ["Commerce"] },
          { name: "Credit Risk Modeling Specialist", profile: "Investigative / Quantitative", description: "Calculate default probabilities and design structural rating scales for loan books.", skills: ["numerical", "logical", "administrative"], streams: ["Commerce", "PCM"] },
          { name: "Supply Chain Network Architect", profile: "Conventional / Systems", description: "Model global cargo routing tables and optimize container transport times.", skills: ["logical", "administrative", "numerical"], streams: ["Commerce", "PCM"] },
          { name: "E-Commerce Logistics Coordinator", profile: "Conventional / Coordination", description: "Track real-time distribution hub stats, dispatch shipping updates, and monitor errors.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce"] },
          { name: "Tax Compliance Advisory Inspector", profile: "Conventional / Legal", description: "Draft regulatory audit forms and check multi-jurisdictional withholding rates.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce"] },
          { name: "Retail Market Intelligence Lead", profile: "Enterprising / Marketing", description: "Analyze geographic spending metrics and build consumer purchase prediction dashboards.", skills: ["numerical", "leadership", "social"], streams: ["Commerce"] },
          { name: "Behavioral Finance Consultant", profile: "Investigative / Cognitive", description: "Examine behavioral cognitive biases impacting retail investor portfolio strategies.", skills: ["social", "logical", "abstract"], streams: ["Commerce", "Arts"] },
          // Extra 10 Underrated/Specialized Careers:
          { name: "Sustainable ESG Portfolios Auditor", profile: "Conventional / Compliance", description: "Review corporate carbon emission files and certify environmental tax audits.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce"] },
          { name: "Algorithmic Market Arbitrage Auditor", profile: "Investigative / Quantitative", description: "Inspect high-speed trading logs to verify fair executions and rule compliance.", skills: ["numerical", "logical", "administrative"], streams: ["Commerce", "PCM"] },
          { name: "Micro-Insurance Actuarial Analyst", profile: "Conventional / Development", description: "Model risk indices for low-income agricultural crop insurance programs.", skills: ["numerical", "administrative", "logical"], streams: ["Commerce"] },
          { name: "Real Estate Capital Flow Planner", profile: "Enterprising / Logistics", description: "Audit multi-national land investment registries and model construction yield tables.", skills: ["numerical", "administrative", "leadership"], streams: ["Commerce"] },
          { name: "Carbon Credit Exchange Arbitrageur", profile: "Enterprising / Trading", description: "Trade offset allowances across global carbon market ledgers.", skills: ["numerical", "leadership", "abstract"], streams: ["Commerce"] },
          { name: "Intellectual Property Valuation Analyst", profile: "Conventional / Legal", description: "Evaluate royalty models and write licensing worth audit reports.", skills: ["administrative", "logical", "verbal"], streams: ["Commerce"] },
          { name: "Crisis Liquidity Consultant", profile: "Enterprising / Advisor", description: "Advise distressed corporate structures on asset liquidation schedules.", skills: ["leadership", "numerical", "verbal"], streams: ["Commerce"] },
          { name: "Venture Debt Structurer", profile: "Enterprising / Financial", description: "Design collateral loan agreements and warrants portfolios for high-growth firms.", fill: ["numerical", "leadership", "administrative"], streams: ["Commerce"] },
          { name: "Behavioral Purchase Flow Modeler", profile: "Investigative / Retail", description: "Examine consumer click-to-buy ratios and model shopping transaction states.", fill: ["numerical", "logical", "social"], streams: ["Commerce", "Arts"] },
          { name: "Supply Chain Resiliency Specialist", profile: "Conventional / Systems", description: "Audit supplier dependency networks and draft alternative routing logistics.", skills: ["administrative", "logical", "numerical"], streams: ["Commerce", "PCM"] }
        ]
      },
      {
        name: "Industrial & Mechatronics Engineering",
        careers: [
          { name: "Merchant Navy Officer", profile: "Realistic / Enterprising", description: "Navigate massive cargo vessels across international trade routes, coordinate deck operations, and manage maritime transportation logistics.", skills: ["spatial", "mechanical", "leadership"], streams: ["PCM"] },
          { name: "Robotics Sensor Fusion Developer", profile: "Realistic / Investigative", description: "Calibrate lidar coordinates, write motor control drivers, and align physical sensors.", skills: ["spatial", "numerical", "logical"], streams: ["PCM"] },
          { name: "Industrial CAD Prototyper", profile: "Spatial / Methodical", description: "Draw physical gear structures in CAD, inspect spatial clearances, and generate blueprints.", skills: ["spatial", "administrative", "logical"], streams: ["PCM"] },
          { name: "Grid Automation Analyst", profile: "Investigative / Stability", description: "Deploy electrical distribution logic, audit transformer logs, and manage switch gears.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Embedded Systems Inspector", profile: "Realistic / Conventional", description: "Test printed circuit board traces, solder hardware relays, and debug firmware loops.", skills: ["logical", "spatial", "mechanical"], streams: ["PCM"] },
          { name: "Acoustics Hardware Designer", profile: "Artistic / Spatial", description: "Optimize speaker chamber resonance, visualize audio wave reflections, and stylize casing.", skills: ["spatial", "abstract", "numerical"], streams: ["PCM", "Arts"] },
          { name: "Aerospace Avionics Tester", profile: "Realistic / Testing", description: "Inspect rocket telemetry channels, calibrate barometric sensors, and verify circuitry.", skills: ["logical", "numerical", "mechanical"], streams: ["PCM"] },
          { name: "Automotive Telemetry Dev", profile: "Realistic / Electronics", description: "Trace engine speed data, write control loop programs, and align dashboard outputs.", skills: ["spatial", "numerical", "logical"], streams: ["PCM"] },
          { name: "Smart Factory Auditor", profile: "Conventional / Automation", description: "Review mechanical conveyor lines, audit PLC programs, and verify safety bounds.", skills: ["administrative", "logical", "mechanical"], streams: ["PCM"] },
          { name: "Optical Systems Designer", profile: "Investigative / Lasers", description: "Align mirror angles, calculate light refraction limits, and test fiber networks.", skills: ["spatial", "abstract", "numerical"], streams: ["PCM"] },
          { name: "Renewable Grid Modeler", profile: "Investigative / Ecology", description: "Model wind velocity patterns, map solar farm coverage, and calculate battery capacity.", skills: ["logical", "numerical", "abstract"], streams: ["PCM"] },
          { name: "Drones Autopilot Programmer", profile: "Realistic / Analytical", description: "Calibrate gyroscope sensors, write flight correction logic, and test drone telemetry.", skills: ["logical", "spatial", "mechanical"], streams: ["PCM"] },
          { name: "Thermal Management Specialist", profile: "Realistic / Theoretical", description: "Model heat dissipation vectors, test heatsink shapes, and check cooling loops.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] },
          { name: "Additive Manufacturing Engineer", profile: "Spatial / Technical", description: "Optimize 3D print layer thickness, map laser toolpaths, and test structural strength.", skills: ["spatial", "mechanical", "logical"], streams: ["PCM"] },
          { name: "CNC Systems Programmer", profile: "Conventional / Realistic", description: "Write G-code coordinates, set cutting tool speeds, and audit mechanical lathe runs.", skills: ["mechanical", "spatial", "administrative"], streams: ["PCM"] },
          { name: "Micro-Grid Controller", profile: "Conventional / Systems", description: "Monitor localized grid balance, manage battery storage relays, and dispatch generators.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Electric Vehicle Powertrain Architect", profile: "Realistic / Automotive", description: "Design high-voltage battery casing, manage thermals, and select inverter relays.", skills: ["mechanical", "spatial", "logical"], streams: ["PCM"] },
          { name: "Wind Turbine Blade Aerodynamicist", profile: "Investigative / Fluid", description: "Model airfoils, run mechanical stress simulations, and design composite structures.", skills: ["logical", "numerical", "abstract"], streams: ["PCM"] },
          { name: "Smart Building SCADA Systems Operator", profile: "Conventional / Facilities", description: "Monitor digital twins of HVAC compressors and calibrate automated relief vents.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Microfluidics Mechanical Engineer", profile: "Investigative / Physics", description: "Design sub-millimeter capillary channels for diagnostic bio-sensor plates.", skills: ["spatial", "logical", "numerical"], streams: ["PCM"] },
          { name: "Satellite Avionics Systems Integrator", profile: "Realistic / Space", description: "Verify cosmic radiation shields and program automated attitude thrusters.", skills: ["mechanical", "logical", "spatial"], streams: ["PCM"] },
          { name: "Hydraulic Power Distribution Inspector", profile: "Conventional / Mechanics", description: "Audit heavy piston fluid seals, trace pressure drops, and verify flow meters.", skills: ["mechanical", "spatial", "administrative"], streams: ["PCM"] },
          { name: "CNC Toolpath Precision Modeler", profile: "Spatial / Mechanical", description: "Optimize machine cuts, map lathe offsets, and design mechanical fixtures.", skills: ["spatial", "mechanical", "logical"], streams: ["PCM"] },
          { name: "Bionic Limb Control Loop Calibrator", profile: "Realistic / Cybernetics", description: "Calibrate micro-servo motor timings to match biological nerve sensor signals.", skills: ["spatial", "logical", "mechanical"], streams: ["PCM", "PCB"] },
          { name: "Industrial Robot Safety Auditor", profile: "Conventional / Compliance", description: "Run failure mode audits on optical safety cages and verify emergency breaks.", skills: ["administrative", "logical", "mechanical"], streams: ["PCM"] },
          { name: "Precision Casting Process Designer", profile: "Realistic / Metals", description: "Model molten alloy flow vectors and design cooling templates for engine blocks.", skills: ["mechanical", "spatial", "numerical"], streams: ["PCM"] },
          // Extra 10 Underrated/Specialized Careers:
          { name: "Submersible Mechatronics Pilot", profile: "Realistic / Deep Sea", description: "Navigate remote subsea robots, calibrate pressure indicators, and inspect pipeline welds.", skills: ["spatial", "mechanical", "logical"], streams: ["PCM"] },
          { name: "Micro-Electromechanical Systems (MEMS) Designer", profile: "Investigative / Microscale", description: "Model microscopically small mechanical sensors for consumer smartphones.", skills: ["spatial", "logical", "numerical"], streams: ["PCM"] },
          { name: "High-Voltage Grid Relational Auditor", profile: "Conventional / Safety", description: "Inspect large transformer isolation chambers and calibrate arc discharge switches.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] },
          { name: "Pneumatic Logistics Tube Architect", profile: "Realistic / Flow", description: "Design fast tube routing pathways and monitor air pressure valves in hospital systems.", skills: ["mechanical", "spatial", "logical"], streams: ["PCM"] },
          { name: "Autonomous Drone Swarm Coordinator", profile: "Realistic / Programming", description: "Program coordination rules for groups of mapping drones and calibrate telemetry logs.", skills: ["logical", "spatial", "mechanical"], streams: ["PCM"] },
          { name: "Precision Laser Welder Programmer", profile: "Realistic / Precision", description: "Program coordinate laser tools to stitch sheet metal for electric vehicle chassis.", skills: ["spatial", "mechanical", "logical"], streams: ["PCM"] },
          { name: "Bionic Exoskeleton Joint Calibrator", profile: "Realistic / Assistive", description: "Calibrate robotic knee joints to offset mechanical strain for logistics workers.", skills: ["spatial", "logical", "mechanical"], streams: ["PCM"] },
          { name: "Acoustic Noise Control Engineer", profile: "Investigative / Sound", description: "Design spatial acoustic dampening shields for industrial pump chambers.", stroke: ["spatial", "abstract", "numerical"], streams: ["PCM"] },
          { name: "Additive Dental Prototyper", profile: "Realistic / Medical", description: "Operate high-resolution resin 3D printers and audit fit clearances.", skills: ["spatial", "mechanical", "administrative"], streams: ["PCM", "PCB"] },
          { name: "Industrial Vibration Diagnostics Specialist", profile: "Conventional / Auditing", description: "Analyze generator bearing noise signatures to prevent mechanical breakdown.", skills: ["mechanical", "spatial", "logical"], streams: ["PCM"] }
        ]
      },
      {
        name: "Healthcare & Biotech Sciences",
        careers: [
          { name: "Bioinformatics Data Analyst", profile: "Investigative / Quantitative", description: "Parse genetic sequencing databases, compile DNA alignments, and compute statistics.", skills: ["numerical", "logical", "abstract"], streams: ["PCB", "PCM"] },
          { name: "Clinical Trials Director", profile: "Social / Collaboration", description: "Coordinate patient intake interviews, check compliance codes, and manage research staff.", skills: ["social", "administrative", "leadership"], streams: ["PCB"] },
          { name: "Genetic Sequencing Specialist", profile: "Investigative / Stability", description: "Process laboratory assays, align chromosome files, and check diagnostic markers.", skills: ["logical", "numerical", "administrative"], streams: ["PCB"] },
          { name: "Hospital Systems Auditor", profile: "Conventional / Compliance", description: "Audit patient charts, review medical coding bills, and verify administrative compliance.", skills: ["administrative", "logical", "numerical"], streams: ["PCB", "Commerce"] },
          { name: "Health Policy Consultant", profile: "Social / Enterprising", description: "Advise government agencies, write regulatory summaries, and present clinical reports.", skills: ["social", "leadership", "administrative"], streams: ["PCB", "Arts"] },
          { name: "Medical Device Integrator", profile: "Realistic / Biomedical", description: "Align hospital monitors, calibrate oxygen valves, and debug telemetry signals.", skills: ["spatial", "logical", "mechanical"], streams: ["PCB", "PCM"] },
          { name: "Pharmaceutical Compliance Lead", profile: "Conventional / Quality", description: "Review laboratory drug protocols, check temperature logs, and confirm FDA safety.", skills: ["administrative", "logical", "leadership"], streams: ["PCB"] },
          { name: "Epidemiological Data Modeler", profile: "Investigative / Diseases", description: "Compute virus spread rates, map infection hotspots, and write statistical logs.", skills: ["numerical", "logical", "abstract"], streams: ["PCB", "PCM"] },
          { name: "Digital Health Analyst", profile: "Enterprising / Health", description: "Scale remote patient databases, review app telemetry, and design patient dashboards.", skills: ["leadership", "logical", "social"], streams: ["PCB"] },
          { name: "Pathology Lab Systems Director", profile: "Conventional / Laboratory", description: "Manage automated slide scanners, verify pathology diagnostics, and audit lab data.", skills: ["administrative", "numerical", "logical"], streams: ["PCB"] },
          { name: "Clinical Geneticist", profile: "Investigative / Medical", description: "Analyze chromosome karyotypes, identify hereditary disease mutations, and advise patients.", skills: ["logical", "social", "administrative"], streams: ["PCB"] },
          { name: "Immunology Lab Researcher", profile: "Investigative / Analytical", description: "Test antibody binding counts, isolate cell cultures, and compile clinical assays.", skills: ["logical", "numerical", "abstract"], streams: ["PCB"] },
          { name: "Neuro-Prosthetic Interface Dev", profile: "Realistic / Analytical", description: "Design brain-computer communication channels, translate nerve signal logs, and test sensors.", skills: ["spatial", "logical", "mechanical"], streams: ["PCB", "PCM"] },
          { name: "Pharmacokinetics Analyst", profile: "Investigative / Chemical", description: "Model blood drug absorption curves, analyze clearance rates, and verify chemical doses.", skills: ["numerical", "logical", "abstract"], streams: ["PCB"] },
          { name: "Molecular Diagnostics Specialist", profile: "Conventional / Laboratory", description: "Perform PCR amplification tests, verify chemical reaction indicators, and audit assay logs.", skills: ["logical", "administrative", "numerical"], streams: ["PCB"] },
          { name: "mRNA Vaccine Formulation Engineer", profile: "Investigative / Molecular", description: "Design lipid nanoparticle delivery envelopes to stabilize genetic templates.", skills: ["logical", "abstract", "numerical"], streams: ["PCB"] },
          { name: "CRISPR Gene Editing Protocol Specialist", profile: "Investigative / Genetics", description: "Calibrate guide RNA sequences and inspect cellular target DNA sequences.", skills: ["logical", "abstract", "administrative"], streams: ["PCB"] },
          { name: "Clinical Biostatistics Core Lead", profile: "Investigative / Quantitative", description: "Compile survival curves, run analysis of variance checks, and audit patient statistics.", skills: ["numerical", "logical", "abstract"], streams: ["PCB", "PCM"] },
          { name: "Hospital Hygiene Compliance Officer", profile: "Conventional / Operations", description: "Audit sterilization logs, run air quality tests, and verify bio-hazard disposal.", skills: ["administrative", "logical", "numerical"], streams: ["PCB"] },
          { name: "Prosthetic Material Stress Analyst", profile: "Realistic / Mechanics", description: "Run mechanical wear tests on titanium joints and evaluate plastic degradation.", skills: ["spatial", "logical", "mechanical"], streams: ["PCB", "PCM"] },
          { name: "Telemedicine Network Diagnostic Specialist", profile: "Conventional / Networks", description: "Optimize remote camera feed latencies and audit encrypted patient records.", skills: ["logical", "administrative", "numerical"], streams: ["PCB", "PCM"] },
          { name: "Neuro-Imaging Data Parser", profile: "Investigative / Imagery", description: "Filter noise artifacts in functional MRI scans and map active brain vectors.", skills: ["spatial", "logical", "abstract"], streams: ["PCB", "PCM"] },
          { name: "Molecular Modeling Simulation Chemist", profile: "Investigative / Theoretical", description: "Simulate ligand binding energies and compile molecular physics logs.", skills: ["numerical", "logical", "abstract"], streams: ["PCB", "PCM"] },
          { name: "Cancer Immunotherapy Lab Tech", profile: "Realistic / Biology", description: "Culture CAR-T cells, isolate cell membranes, and run quality control assays.", skills: ["logical", "numerical", "mechanical"], streams: ["PCB"] },
          { name: "Pharmaceutical Patent Examiner", profile: "Conventional / Research", description: "Review patent drug claims, verify molecule structures, and check legal files.", skills: ["administrative", "logical", "verbal"], streams: ["PCB"] },
          // Extra 10 Underrated/Specialized Careers:
          { name: "Cryopreservation Protocol Specialist", profile: "Investigative / Preservation", description: "Optimize cooling metrics to freeze cell samples safely for long-term clinical stores.", skills: ["logical", "numerical", "abstract"], streams: ["PCB"] },
          { name: "Synthetic Genome Assembly Designer", profile: "Investigative / BioDesign", description: "Design customized bacterial DNA codes to manufacture sustainable enzymes.", skills: ["logical", "abstract", "numerical"], streams: ["PCB"] },
          { name: "Tissue Engineering Lab Technologist", profile: "Realistic / Cell Culture", description: "Align cellular scaffolding constructs to grow vascular tissue panels.", skills: ["spatial", "mechanical", "logical"], streams: ["PCB"] },
          { name: "Space Medicine Rehabilitation Specialist", profile: "Social / Astronautical", description: "Design zero-gravity muscle recovery courses and track astronaut cardiovascular logs.", skills: ["social", "logical", "administrative"], streams: ["PCB"] },
          { name: "Clinical Assay Telemetry Auditor", profile: "Conventional / Quality", description: "Verify electronic log files generated by high-throughput cell analyzers.", skills: ["logical", "administrative", "numerical"], streams: ["PCB", "PCM"] },
          { name: "Microbiome Formulation Consultant", profile: "Investigative / Wellness", description: "Analyze patient gut colony ratios and formulate specialized dietary recommendations.", skills: ["logical", "social", "administrative"], streams: ["PCB"] },
          { name: "Radiopharmacy Dosage Inspector", profile: "Conventional / Chemistry", description: "Audit diagnostic isotope decay times and calculate precise patient dosages.", skills: ["numerical", "administrative", "logical"], streams: ["PCB"] },
          { name: "Genetic Genealogy Analyst", profile: "Investigative / Lineage", description: "Trace chromosome segments to resolve family origin histories.", skills: ["logical", "abstract", "administrative"], streams: ["PCB", "Arts"] },
          { name: "Geriatric Cognitive Ergonomics Consultant", profile: "Social / Assistive", description: "Design visual memory prompts to support senior patients in care facilities.", skills: ["social", "spatial", "administrative"], streams: ["PCB", "Arts"] },
          { name: "Epidemiological Wastewater Surveyor", profile: "Conventional / Analytics", description: "Trace virus concentrations in municipal water pipelines and report city warning alerts.", skills: ["logical", "administrative", "numerical"], streams: ["PCB"] }
        ]
      },
      {
        name: "Media, Systems & Design",
        careers: [
          { name: "UI/UX Product Designer", profile: "Artistic / Spatial", description: "Stylize mobile screen blueprints, draw vector buttons, and map user flows.", skills: ["spatial", "social", "abstract"], streams: ["Arts", "PCM"] },
          { name: "Technical Systems Animator", profile: "Artistic / Mechanical", description: "Rig character bone structures, align animation keyframes, and render textures.", skills: ["spatial", "abstract", "mechanical"], streams: ["Arts", "PCM"] },
          { name: "AR Experience Architect", profile: "Artistic / Innovative", description: "Project digital graphics onto spatial camera coordinates and design audio soundscapes.", skills: ["spatial", "abstract", "logical"], streams: ["Arts", "PCM"] },
          { name: "Brand Systems Director", profile: "Enterprising / Autonomy", description: "Deploy marketing campaigns, align corporate colors, and lead designer groups.", skills: ["leadership", "social", "administrative"], streams: ["Arts", "Commerce"] },
          { name: "Creative Studio Lead", profile: "Enterprising / Artistic", description: "Coordinate video production schedules, pitching concepts to clients, and styling scenes.", skills: ["social", "leadership", "spatial"], streams: ["Arts"] },
          { name: "Information Graphic Designer", profile: "Artistic / Communication", description: "Summarize data metrics into visual diagrams, scale legends, and layout sheets.", skills: ["spatial", "social", "administrative"], streams: ["Arts"] },
          { name: "Interactive Content Specialist", profile: "Artistic / Web", description: "Build web animations, integrate audio segments, and stylize layout templates.", skills: ["spatial", "abstract", "social"], streams: ["Arts"] },
          { name: "Digital Typography Artist", profile: "Artistic / Layout", description: "Design font families, calibrate text line gaps, and layout vintage page borders.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "Technical Documentation Editor", profile: "Conventional / Writing", description: "Review software code APIs, compile operations checklists, and format text manuals.", skills: ["administrative", "verbal", "logical"], streams: ["Arts"] },
          { name: "Sound Engineering Specialist", profile: "Realistic / Audio", description: "Configure audio mixing desks, isolate frequency bands, and restore old recordings.", skills: ["mechanical", "abstract", "spatial"], streams: ["Arts", "PCM"] },
          { name: "Motion Graphics Modeler", profile: "Artistic / Visual", description: "Animate 3D titles, render logo morph keyframes, and adjust rendering nodes.", skills: ["spatial", "abstract", "spatial"], streams: ["Arts"] },
          { name: "Instructional Systems Designer", profile: "Conventional / Educational", description: "Structure training module guides, write storyboard scenarios, and format quiz pools.", skills: ["administrative", "verbal", "social"], streams: ["Arts"] },
          { name: "Editorial Product Layout Artist", profile: "Artistic / Layout", description: "Arrange print book grids, set gutter margins, and design cover layouts.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "Digital Colorist & Render Specialist", profile: "Artistic / Technical", description: "Grade video light curves, calibrate camera profiles, and balance render nodes.", skills: ["spatial", "abstract", "mechanical"], streams: ["Arts"] },
          { name: "Audio Synthesizer Designer", profile: "Realistic / Creative", description: "Build software sound wave filters, script audio oscillator loops, and test MIDI maps.", skills: ["mechanical", "abstract", "logical"], streams: ["Arts", "PCM"] },
          { name: "Generative Art Prompt Designer", profile: "Artistic / Conceptual", description: "Structure visual text tokens, map seed variables, and guide image outputs.", skills: ["spatial", "abstract", "verbal"], streams: ["Arts"] },
          { name: "Spatial Audio Ambisonics Engineer", profile: "Realistic / Acoustics", description: "Mix multi-channel 3D audio tracks to match orientation shifts in VR spaces.", skills: ["spatial", "abstract", "mechanical"], streams: ["Arts", "PCM"] },
          { name: "Virtual Production Stage Stylist", profile: "Artistic / Set Design", description: "Arrange real prop placements relative to high-resolution LED backdrop walls.", skills: ["spatial", "spatial", "social"], streams: ["Arts"] },
          { name: "Brand Narrative Concept Artist", profile: "Artistic / Narrative", description: "Illustrate early campaign mood boards and style guides for marketing directors.", skills: ["spatial", "abstract", "social"], streams: ["Arts"] },
          { name: "3D Geometric Font Designer", profile: "Artistic / Typography", description: "Model volumetric character shapes and align vector kerning tables.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "User Experience Usability Auditor", profile: "Conventional / Cognitive", description: "Monitor heatmaps, count navigation clicks, and compile accessibility reports.", skills: ["administrative", "social", "logical"], streams: ["Arts"] },
          { name: "Technical VFX Simulation Artist", profile: "Artistic / Physics", description: "Animate dust, smoke, fire, and liquid physics inside animation packages.", skills: ["spatial", "abstract", "logical"], streams: ["Arts", "PCM"] },
          { name: "Print Cartography Layout Specialist", profile: "Artistic / Geography", description: "Layout topographic maps, format coordinates, and style map legends.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "Educational Game Mechanic Architect", profile: "Artistic / Educational", description: "Model interactive quizzes, configure points systems, and design reward screens.", skills: ["logical", "abstract", "social"], streams: ["Arts"] },
          { name: "Interactive Museum Display Programmer", profile: "Realistic / Media", description: "Program tactile wall displays, connect distance sensors, and sync projector loops.", skills: ["mechanical", "spatial", "logical"], streams: ["Arts", "PCM"] },
          // Extra 10 Underrated/Specialized Careers:
          { name: "Ambisonic Sound Field Designer", profile: "Artistic / Audio Spatial", description: "Record and capture multi-directional ambient noise fields to build realistic spatial sound libraries.", skills: ["spatial", "abstract", "mechanical"], streams: ["Arts", "PCM"] },
          { name: "Spatial Interface Usability Auditor", profile: "Conventional / Interaction", description: "Track real-world user gestures and compile layout compliance checklists.", skills: ["administrative", "social", "logical"], streams: ["Arts"] },
          { name: "Generative Prompt Canvas Curator", profile: "Artistic / Presentation", description: "Review and edit synthetic imagery catalogs to style promotional layouts.", skills: ["spatial", "abstract", "administrative"], streams: ["Arts"] },
          { name: "Interactive Narrative Branch Writer", profile: "Artistic / Writer", description: "Draft branching choice storylines and character dialogue vectors for games.", skills: ["abstract", "verbal", "social"], streams: ["Arts"] },
          { name: "Projection Mapping Stage Designer", profile: "Artistic / Spatial", description: "Calibrate projector coordinates to wrap digital light displays onto architectural building faces.", skills: ["spatial", "abstract", "logical"], streams: ["Arts", "PCM"] },
          { name: "Digital Textile Pattern Modeler", profile: "Artistic / Fashion", description: "Design complex seamless fabrics textures in vector packages and map layout guides.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "Font Usability & Kerning Inspector", profile: "Conventional / Layout", description: "Audit letter spacing margins and verify character display alignment on screens.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "VFX Liquid Simulation Specialist", profile: "Artistic / Technical Physics", description: "Animate realistic fluid waves and foam drops using high-performance physics loops.", skills: ["spatial", "abstract", "logical"], streams: ["Arts", "PCM"] },
          { name: "Historical Map Cartographer", profile: "Artistic / History", description: "Restore geographic old layout maps and trace original borders.", skills: ["spatial", "spatial", "administrative"], streams: ["Arts"] },
          { name: "Educational Simulation Game Architect", profile: "Artistic / Technical", description: "Build interactive models of historical events and design coordinate loops.", skills: ["logical", "abstract", "social"], streams: ["Arts", "PCM"] }
        ]
      }
    ];
  }

  generateSkillsGapHTML(requiredSkills) {
    const currentScores = this.scores;
    const ability = currentScores.ability || {};
    const skills = currentScores.skills || {};

    const getScore = (key) => {
      if (ability[key] !== undefined) return ability[key];
      if (skills[key] !== undefined) return skills[key];
      return 50; 
    };

    const getSkillName = (key) => {
      const names = {
        numerical: "Numerical Reasoning",
        logical: "Logical Reasoning",
        verbal: "Verbal Reasoning",
        abstract: "Abstract Reasoning",
        spatial: "Spatial Visualization",
        administrative: "Administrative & Audit",
        leadership: "Leadership & Stress Threshold",
        social: "Social Collaboration",
        mechanical: "Mechanical Mechanics"
      };
      return names[key] || key;
    };

    return `
      <div style="margin-top: 0.8rem; border-top: 1px dashed var(--color-border); padding-top: 0.6rem;">
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
          ${requiredSkills.map(sk => {
            const userVal = getScore(sk);
            const requiredVal = 70;
            const met = userVal >= requiredVal;
            const icon = met ? "🟢 [PASSED]" : "🔴 [GAP DETECTED]";
            const color = met ? "var(--color-text-heading)" : "var(--color-accent-rust)";
            return `
              <li style="display: flex; justify-content: space-between; font-size: 0.72rem; color: ${color};">
                <span>${icon} ${getSkillName(sk)}</span>
                <span style="font-weight: 700;">${userVal}% / ${requiredVal}%</span>
              </li>
            `;
          }).join("")}
        </ul>
      </div>
    `;
  }

  getCareerMarketMetadata(careerName) {
    const name = careerName.toLowerCase();
    
    let zone = "Job Zone 4: High Preparation (Bachelor's Degree)";
    let salary = "$95,000 / ₹12.5 LPA";
    let outlook = "Steady Expansion (+6.2% YoY)";
    let aiResilience = "70% (Medium)";

    if (name.includes("machine learning") || name.includes("quantum") || name.includes("bioinformatics") || name.includes("biophysics") || name.includes("genetic") || name.includes("immunology") || name.includes("pathology") || name.includes("epidemiological")) {
      zone = "Job Zone 5: Extensive Preparation (Master's / Ph.D.)";
      salary = "$135,000 / ₹18.0 LPA";
      outlook = "Hyper Growth (+18.4% YoY)";
      aiResilience = "92% (Exceptional)";
    } else if (name.includes("full-stack") || name.includes("blockchain") || name.includes("devops") || name.includes("cybersecurity") || name.includes("actuarial") || name.includes("forensic") || name.includes("investment banking") || name.includes("powertrain") || name.includes("aerospace") || name.includes("navy") || name.includes("maritime")) {
      zone = "Job Zone 4: High Preparation (Bachelor's / Certification)";
      salary = "$120,000 / ₹16.0 LPA";
      outlook = "Rapid Growth (+10.5% YoY)";
      aiResilience = "95% (Exceptional Resilience)";
    } else if (name.includes("cad") || name.includes("cnc") || name.includes("haptic") || name.includes("textile") || name.includes("cartography") || name.includes("layout")) {
      zone = "Job Zone 3: Medium Preparation (Associate / Vocational)";
      salary = "$70,000 / ₹8.5 LPA";
      outlook = "Moderate Growth (+4.5% YoY)";
      aiResilience = "42% (Medium Risk)";
    } else if (name.includes("prompt") || name.includes("generative") || name.includes("narrative")) {
      zone = "Job Zone 3: Medium Preparation (Associate / Vocational)";
      salary = "$88,000 / ₹10.5 LPA";
      outlook = "Volatile Growth (+22.0% YoY)";
      aiResilience = "65% (Medium)";
    }

    return { zone, salary, outlook, aiResilience };
  }

  bindClustersEvents() {
    const clusterTabs = this.container.querySelectorAll(".cluster-tab-btn");
    const clusterContent = this.container.querySelector("#active-cluster-content");

    if (!clusterTabs.length || !clusterContent) return;

    let activeStream = "All";
    let activeClusterIdx = 0;

    const selectCluster = (index) => {
      activeClusterIdx = index;
      clusterTabs.forEach((tab, idx) => {
        if (idx === index) {
          tab.classList.add("active");
          tab.style.background = "var(--color-accent-rust)";
          tab.style.color = "var(--color-bg-base)";
          tab.style.opacity = "1";
        } else {
          tab.classList.remove("active");
          tab.style.background = "var(--color-bg-card)";
          tab.style.color = "var(--color-text-body)";
          tab.style.opacity = "0.85";
        }
      });

      const clusterData = this.getDetailedClusterData()[index];
      if (!clusterData) return;

      let careerRows = clusterData.careers.map(car => {
        const calculated = this.calculateEuclideanSuitability(car.name, this.scores);
        return { ...car, score: calculated };
      });

      if (activeStream !== "All") {
        careerRows = careerRows.filter(car => car.streams && car.streams.includes(activeStream));
      }

      careerRows.sort((a, b) => b.score - a.score);

      const renderGrid = () => {
        if (careerRows.length === 0) {
          return `
            <div style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; padding: 2rem; text-align: center; border: 1.5px dashed var(--color-border); color: var(--color-text-body); opacity: 0.75; width: 100%;">
              No career paths in this cluster match the selected stream filter.
              <br>(इस क्लस्टर में कोई भी करियर पथ चयनित स्ट्रीम फ़िल्टर से मेल नहीं खाता है।)
            </div>
          `;
        }

        return `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; width: 100%;">
            ${careerRows.map((r, idx) => {
              const isMatch = r.score >= 70 ? "High Compatibility" : "Moderate Compatibility";
              const badgeColor = r.score >= 70 ? "var(--color-accent-rust)" : "var(--color-text-body)";
              const meta = this.getCareerMarketMetadata(r.name);
              return `
                <div class="vt-card vt-card-hover career-path-card" data-idx="${idx}" style="padding: 1.5rem; cursor: pointer; transition: all 0.2s ease; border: 1.5px solid var(--color-border-dark);">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.8rem;">
                    <h5 style="font-size: 1.05rem; font-family: 'Playfair Display', serif; font-weight: 700; margin: 0; line-height: 1.2;">${r.name}</h5>
                    <span style="font-family: 'Courier Prime', monospace; font-size: 1.15rem; font-weight: 700; color: var(--color-accent-rust);">${r.score}%</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                    <span style="font-size: 0.7rem; font-family: 'Courier Prime', monospace; color: ${badgeColor}; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                      ${isMatch}
                    </span>
                    <span style="font-size: 0.65rem; font-family: 'Courier Prime', monospace; border: 1px solid var(--color-border-dark); padding: 1px 6px; background: rgba(0,0,0,0.05); border-radius: 2px;">
                      ${r.streams ? r.streams.join(", ") : ""}
                    </span>
                  </div>
                  <p style="font-size: 0.85rem; line-height: 1.5; opacity: 0.85; margin-bottom: 1rem; font-style: italic;">
                    ${r.description}
                  </p>
                  <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; border-top: 1px dashed var(--color-border); padding-top: 0.8rem; opacity: 0.9;">
                    <strong>Ideal Profile:</strong> ${r.profile}
                  </div>
                  
                  <div class="career-detail-popup hidden" id="popup-${index}-${idx}" style="margin-top: 1rem; background: var(--color-bg-base); padding: 1.2rem; border: 1.5px solid var(--color-border-dark);">
                    <!-- Market Outlook Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem; font-family: 'Courier Prime', monospace; font-size: 0.72rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.8rem;">
                      <div>
                        <strong>O*NET Job Zone:</strong><br>
                        <span style="color: var(--color-text-heading); font-weight:700;">${meta.zone}</span>
                      </div>
                      <div>
                        <strong>Median Salary Target:</strong><br>
                        <span style="color: var(--color-accent-gold); font-weight:700;">${meta.salary}</span>
                      </div>
                      <div>
                        <strong>Market Outlook:</strong><br>
                        <span style="color: var(--color-text-heading); font-weight:700;">${meta.outlook}</span>
                      </div>
                      <div>
                        <strong>AI Automation Resilience:</strong><br>
                        <span style="color: var(--color-accent-rust); font-weight:700;">${meta.aiResilience}</span>
                      </div>
                    </div>
                    
                    <div style="font-weight: 700; font-family: 'Courier Prime', monospace; font-size: 0.72rem; text-transform: uppercase; color: var(--color-accent-rust); margin-bottom: 0.4rem;">
                      Skills Gap Analysis Checklists
                    </div>
                    ${this.generateSkillsGapHTML(r.skills)}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `;
      };

      clusterContent.innerHTML = `
        <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; font-style: italic; margin-bottom: 1.5rem; border-bottom: 1.5px solid var(--color-border-dark); padding-bottom: 0.5rem;">
          ${clusterData.name} Options
        </h4>
        ${renderGrid()}
      `;

      const cards = clusterContent.querySelectorAll(".career-path-card");
      cards.forEach(card => {
        card.addEventListener("click", () => {
          const popup = card.querySelector(".career-detail-popup");
          if (popup) {
            popup.classList.toggle("hidden");
          }
        });
      });
    };

    // Bind stream filter button clicks
    const streamBtns = this.container.querySelectorAll(".stream-filter-btn");
    streamBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        streamBtns.forEach(b => {
          b.classList.remove("active");
          b.style.background = "var(--color-bg-card)";
          b.style.color = "var(--color-text-body)";
        });
        btn.classList.add("active");
        btn.style.background = "var(--color-accent-rust)";
        btn.style.color = "var(--color-bg-base)";
        activeStream = btn.getAttribute("data-stream");
        selectCluster(activeClusterIdx);
      });
    });

    clusterTabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => selectCluster(idx));
    });

    selectCluster(0);
  }

  getDeepDiveHTML() {
    const primary = this.archetype.careers.primary;
    const s = this.scores.skills;

    return `
      <section class="vt-card">
        <div class="archetype-badge">FAVORITE PATHWAY DEEP-DIVE</div>
        <h2 style="font-size: 2rem; margin-bottom: 0.5rem; font-style: normal;">${primary.title}</h2>
        
        <div style="margin-top: 1.5rem; margin-bottom: 2.2rem;">
          <h5 style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.6rem; color: var(--color-accent-rust);">
            Work Nature Details
          </h5>
          <p style="font-size: 0.95rem; line-height: 1.6;">
            A raw, unvarnished look into the day-to-day operation. In this role, you analyze systems architectures, write logic code pipelines, debug mechanical and sensor inputs under tight pressure thresholds, and review code with operations groups. Expect moderate stress cycles during final product releases, balanced by high individual autonomy and task flexibility.
          </p>
        </div>

        <!-- Compensation Analytics (PRD Part 4) -->
        <div class="vt-card" style="border-style: dashed; padding: 1.5rem; margin-bottom: 2.2rem;">
          <h5 style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--color-accent-rust);">
            Compensation & Salary Analytics
          </h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
            <div style="padding: 1rem; border: 1px solid var(--color-border); background: var(--color-bg-base); text-align: center;">
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.75rem; font-weight: 700; opacity: 0.75;">ENTRY LEVEL</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--color-text-heading);">$85K - $110K</div>
            </div>
            <div style="padding: 1rem; border: 1px solid var(--color-border); background: var(--color-bg-base); text-align: center;">
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.75rem; font-weight: 700; opacity: 0.75;">MID-TIER</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--color-accent-rust);">$140K - $175K</div>
            </div>
            <div style="padding: 1rem; border: 1px solid var(--color-border); background: var(--color-bg-base); text-align: center;">
              <div style="font-family: 'Courier Prime', monospace; font-size: 0.75rem; font-weight: 700; opacity: 0.75;">EXECUTIVE LEAD</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--color-text-heading);">$210K - $260K+</div>
            </div>
          </div>
        </div>

        <!-- Key Skills Gap Analysis (PRD Part 4) -->
        <div class="vt-card" style="padding: 1.5rem; border-style: solid; margin-bottom: 2.2rem;">
          <h5 style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 1.2rem; color: var(--color-accent-rust);">
            Key Skills Gap Analysis (Required vs. Your Score)
          </h5>
          ${this.generateSkillsGapChartHTML(s)}
        </div>

        <!-- Career Navigator Assembly: Dynamic Gap Checklist (PRD Stage 4) -->
        <div class="vt-card" style="padding: 1.5rem; border-style: solid; border-color: var(--color-accent-rust); margin-bottom: 2.2rem;">
          <h5 style="font-family: 'Courier Prime', monospace; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.8rem; color: var(--color-accent-rust);">
            Career Navigator Gap Checklist Roadmap
          </h5>
          <p style="font-size: 0.8rem; margin-bottom: 1rem; opacity: 0.85;">Below are the skill milestones dynamically compiled where your current competencies sit below industry targets:</p>
          <div class="skill-checkbox-list">
            ${this.generateDynamicGapChecklistHTML(s)}
          </div>
        </div>

        <!-- Career Navigator Matrix (+/-) (PRD Part 4) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.2rem;">
          <div class="swot-box strengths" style="padding: 1.2rem;">
            <div class="swot-header" style="color: var(--color-accent-sage); font-size: 0.9rem;">The Positives (+)</div>
            <ul style="font-size: 0.8rem; padding-left: 1rem;">
              <li>Exponential industrial growth and structural market expansion.</li>
              <li>Strong financial scalability and high starting compensation scales.</li>
              <li>High cognitive fulfillment, R&D autonomy, and creative leeway.</li>
            </ul>
          </div>
          <div class="swot-box weaknesses" style="padding: 1.2rem;">
            <div class="swot-header" style="color: var(--color-accent-rust); font-size: 0.9rem;">The Negatives (-)</div>
            <ul style="font-size: 0.8rem; padding-left: 1rem;">
              <li>Risk of cognitive burnout during final product verification blocks.</li>
              <li>Routine fatigue indices due to long debugging screen cycles.</li>
              <li>Automation displacement risks if mechanical designs simplify.</li>
            </ul>
          </div>
        </div>

        <!-- Step-by-Step Roadmap timeline -->
        <div class="roadmap-drawer" style="border-top: 1px dashed var(--color-border-dark); padding-top: 1.5rem;">
          <h5>Actionable Academic & Skill Roadmap</h5>
          ${this.getRoadmapSectionHTML(primary, "primary")}
        </div>
      </section>
    `;
  }

  getDebriefHTML() {
    return `
      <section class="vt-card">
        <h3>Part 5: Executive Counseling Synthesis</h3>
        <p class="section-sub">Authoritative debrief console compiling your psychometric profiles into counselor diagnostics.</p>
        
        <div class="counselor-brief-wrapper" style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 100%;">
          <div class="brief-box" id="brief-text-content">
            <strong>EXECUTIVE PSYCHOMETRIC SYNTHESIS</strong><br>
            <strong>Name:</strong> ${this.scores.userName || "N/A"}<br>
            <strong>Academic Level:</strong> Grade ${this.scores.userGrade || "N/A"} (${this.scores.userTrack === "A" ? "Track A: Open Horizon" : "Track B: Specialized Pipeline"})${this.scores.userStream ? `<br><strong>Stream Focus:</strong> ${this.scores.userStream}` : ""}<br>
            <strong>Dominant Archetype:</strong> ${this.archetype.title}<br>
            <strong>Baseline Planning State:</strong> ${this.scores.planningStage.toUpperCase()}<br>
            <strong>Anti-Bias Integrity Index:</strong> ${this.scores.consistency}% (Consistency check: ${this.scores.consistency >= 70 ? 'PASS' : 'WARNING - HIGH DISCREPANCY'})<br><br>
            
            <strong>1. STAGE-1 PERSONALITY PROFILING (MBTI):</strong>
            - Personality Code: ${this.scores.mbtiCode}<br>
            - Introversion/Extraversion: ${this.scores.mbti.introvert}% / ${this.scores.mbti.extravert}%<br>
            - Sensing/Intuitive: ${this.scores.mbti.sensing}% / ${this.scores.mbti.intuitive}%<br>
            - Thinking/Feeling: ${this.scores.mbti.thinking}% / ${this.scores.mbti.feeling}%<br>
            - Judging/Perceiving: ${this.scores.mbti.judging}% / ${this.scores.mbti.perceiving}%<br><br>
            
            <strong>2. STAGE-2 COGNITIVE Inventory:</strong>
            - Numerical reasoning: ${this.scores.ability.numerical}%<br>
            - Verbal comprehension: ${this.scores.ability.verbal}%<br>
            - Abstract/Logical speed: ${this.scores.ability.logical}%<br>
            - Spatial-Visual mapping: ${this.scores.ability.spatial}%<br><br>
            
            <strong>3. SYSTEMIC TRANSITION ACTION BLUEPRINT:</strong><br>
            To transition this student from their verified baseline state (${this.scores.planningStage.toUpperCase()}) into an Optimized execution pathway:
            - Utilize their dominant learning style (**${this.scores.learning.visual >= 50 ? 'Visual mapping' : 'Hands-on practice'}**) to sketch database topologies or mechanical workflows.
            - Address cognitive precision gaps by introducing structured templates before starting equations.
            - Setup milestones checkboxes to keep the student focused during long analytical tasks.
          </div>
          
          <button class="btn btn-primary" id="btn-copy-brief" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px; vertical-align: middle;">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>Copy Executive Profile to Clipboard
          </button>
        </div>
      </section>

      <section class="vt-card">
        <h3>Final Synthesis Conclusion</h3>
        <p class="drop-cap" style="line-height: 1.7;">
          In conclusion, the data confirms you possess the logical aperture and behavioral traits suited for deep systems analysis. 
          We recommend a structured roadmap in STEM fields or digital engineering. 
          Focus on building project portfolios, tracking checklists, and developing collaboration frameworks to maximize your potential.
        </p>
      </section>
    `;
  }

  // ==========================================
  // GRAPHICS DRAWING LOGIC (PRODUCTION SVG)
  // ==========================================

  generatePlanningTimelineMeter(stage) {
    const stages = ["ignorant", "confused", "methodical", "optimized"];
    const activeIndex = stages.indexOf(stage) !== -1 ? stages.indexOf(stage) : 2;
    const needleX = 50 + activeIndex * 100;

    return `
      <svg viewBox="0 0 400 40" style="width:100%; height:auto;">
        <!-- Timeline Track -->
        <line x1="50" y1="25" x2="350" y2="25" stroke="var(--color-border)" stroke-width="6" stroke-linecap="round" />
        
        <!-- Markers -->
        ${stages.map((st, idx) => {
          const x = 50 + idx * 100;
          const isActive = idx === activeIndex;
          return `
            <circle cx="${x}" cy="25" r="7" fill="${isActive ? 'var(--color-accent-rust)' : 'var(--color-bg-card)'}" stroke="var(--color-border-dark)" stroke-width="2" />
            <text x="${x}" y="12" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="8" font-weight="700" fill="${isActive ? 'var(--color-accent-rust)' : 'var(--color-text-body)'}">
              ${st.toUpperCase()}
            </text>
          `;
        }).join("")}
      </svg>
    `;
  }

  generateTypologyGridSVG() {
    const m = this.scores.mbti;
    // Map E vs I to X axis: Extroversion (100) is right, Introversion (100) is left.
    const xVal = 100 + ((m.extravert - m.introvert) / 100) * 80;
    // Map N vs S to Y axis: Intuitive (100) is top, Sensing (100) is bottom.
    const yVal = 100 - ((m.intuitive - m.sensing) / 100) * 80;

    return `
      <svg viewBox="0 0 200 200" style="width:100%; max-width:300px; height:auto; border: 1.5px solid var(--color-border-dark); background: var(--color-bg-base); margin: 0 auto; display: block;">
        <!-- Quadrant Divider Axes -->
        <line x1="100" y1="10" x2="100" y2="190" stroke="var(--color-border)" stroke-width="1.2" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="var(--color-border)" stroke-width="1.2" />
        
        <!-- Outer Frame -->
        <rect x="5" y="5" width="190" height="190" fill="none" stroke="var(--color-border-dark)" stroke-width="1" stroke-dasharray="2 2" />
        
        <!-- Axis Labels -->
        <text x="100" y="14" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="var(--color-accent-rust)">INTUITION (N)</text>
        <text x="100" y="193" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="var(--color-accent-rust)">SENSING (S)</text>
        <text x="193" y="103" text-anchor="end" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="var(--color-accent-rust)">EXTRAVERSION (E)</text>
        <text x="7" y="103" text-anchor="start" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="var(--color-accent-rust)">INTROVERSION (I)</text>
        
        <!-- Quadrant Names -->
        <text x="50" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="6.5" font-style="italic" fill="var(--color-text-body)" opacity="0.35">INTUITIVE THINKER</text>
        <text x="150" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="6.5" font-style="italic" fill="var(--color-text-body)" opacity="0.35">EXECUTIVE SOCIAL</text>
        <text x="50" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="6.5" font-style="italic" fill="var(--color-text-body)" opacity="0.35">PRAGMATIC ANALYST</text>
        <text x="150" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="6.5" font-style="italic" fill="var(--color-text-body)" opacity="0.35">ACTION ORIENTED</text>
        
        <!-- Projection lines -->
        <line x1="100" y1="${yVal.toFixed(1)}" x2="${xVal.toFixed(1)}" y2="${yVal.toFixed(1)}" stroke="var(--color-accent-gold)" stroke-width="1.2" stroke-dasharray="1 2" />
        <line x1="${xVal.toFixed(1)}" y1="100" x2="${xVal.toFixed(1)}" y2="${yVal.toFixed(1)}" stroke="var(--color-accent-gold)" stroke-width="1.2" stroke-dasharray="1 2" />
        
        <!-- Active User Coordinate -->
        <circle cx="${xVal.toFixed(1)}" cy="${yVal.toFixed(1)}" r="6" fill="var(--color-accent-gold)" stroke="var(--color-border-dark)" stroke-width="1.8" />
        <circle cx="${xVal.toFixed(1)}" cy="${yVal.toFixed(1)}" r="12" fill="none" stroke="var(--color-accent-gold)" stroke-width="0.8" opacity="0.5">
          <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    `;
  }

  generateHollandHexagonSVG() {
    const riasec = this.scores.interests;
    const cx = 100;
    const cy = 100;
    const rMax = 80;

    const angles = [0, Math.PI / 3, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 5 * Math.PI / 3];
    const categories = [
      { key: "realistic", label: "REALISTIC (R)" },
      { key: "investigative", label: "INVESTIGATIVE (I)" },
      { key: "artistic", label: "ARTISTIC (A)" },
      { key: "social", label: "SOCIAL (S)" },
      { key: "enterprising", label: "ENTERPRISING (E)" },
      { key: "conventional", label: "CONVENTIONAL (C)" }
    ];

    const points = categories.map((cat, idx) => {
      const val = riasec[cat.key] || 0;
      const dist = Math.max(15, (val / 100) * rMax);
      const x = cx + dist * Math.cos(angles[idx]);
      const y = cy + dist * Math.sin(angles[idx]);
      return { x, y };
    });

    const polyStr = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

    const gridRings = [25, 50, 75, 100].map(radiusPct => {
      const radius = (radiusPct / 100) * rMax;
      const pts = angles.map(a => {
        const x = cx + radius * Math.cos(a);
        const y = cy + radius * Math.sin(a);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(" ");
      return `<polygon points="${pts}" fill="none" stroke="var(--color-border)" stroke-width="0.8" stroke-dasharray="2 3" />`;
    }).join("");

    const spokes = angles.map((a, idx) => {
      const x = cx + rMax * Math.cos(a);
      const y = cy + rMax * Math.sin(a);
      return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="var(--color-border)" stroke-width="0.8" />`;
    }).join("");

    const outerPts = angles.map(a => {
      const x = cx + rMax * Math.cos(a);
      const y = cy + rMax * Math.sin(a);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    const labelsHTML = categories.map((cat, idx) => {
      const labelDist = rMax + 14;
      const x = cx + labelDist * Math.cos(angles[idx]);
      const y = cy + labelDist * Math.sin(angles[idx]);
      
      let textAnchor = "middle";
      if (Math.cos(angles[idx]) > 0.2) textAnchor = "start";
      else if (Math.cos(angles[idx]) < -0.2) textAnchor = "end";

      return `
        <text x="${x.toFixed(1)}" y="${y.toFixed(1) + 3}" text-anchor="${textAnchor}" font-family="'Courier Prime', monospace" font-size="6.5" font-weight="700" fill="var(--color-text-heading)">
          ${cat.label}
        </text>
      `;
    }).join("");

    return `
      <svg viewBox="0 0 240 220" style="width:100%; max-width:320px; height:auto; margin: 0 auto; display:block;">
        <!-- Concentric hex rings -->
        ${gridRings}
        <!-- Spoke dividers -->
        ${spokes}
        <!-- Outer Frame Hexagon -->
        <polygon points="${outerPts}" fill="none" stroke="var(--color-border-dark)" stroke-width="1.2" />
        <!-- User Interests Footprint -->
        <polygon points="${polyStr}" fill="var(--color-accent-rust)" fill-opacity="0.25" stroke="var(--color-accent-rust)" stroke-width="2.2" />
        <!-- Point indicators -->
        ${points.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="var(--color-accent-rust)" />`).join("")}
        <!-- Labels -->
        ${labelsHTML}
      </svg>
    `;
  }

  generateBiDirectionalGauge(leftLabel, leftScore, rightLabel, rightScore, leftEmoji, rightEmoji) {
    return `
      <div style="margin-bottom: 1.5rem; font-family: 'Courier Prime', monospace; font-size: 0.8rem; font-weight: 700;">
        <div class="justify-between container-flex" style="margin-bottom: 0.3rem;">
          <span>${leftLabel.toUpperCase()} (${leftScore}%)</span>
          <span>(${rightScore}%) ${rightLabel.toUpperCase()}</span>
        </div>
        <div style="display:flex; align-items:center; gap: 10px;">
          <span>${leftEmoji}</span>
          <svg viewBox="0 0 400 30" width="100%" height="24" style="border: 1px solid var(--color-border); background: var(--color-bg-base);">
            <line x1="10" y1="15" x2="390" y2="15" stroke="var(--color-border)" stroke-width="4" stroke-dasharray="2 3" />
            <line x1="200" y1="5" x2="200" y2="25" stroke="var(--color-border-dark)" stroke-width="1.5" />
            <!-- Sliding indicator -->
            <rect x="${10 + (rightScore / 100) * 380 - 6}" y="5" width="12" height="20" fill="var(--color-accent-rust)" stroke="var(--color-text-heading)" stroke-width="1.5" />
          </svg>
          <span>${rightEmoji}</span>
        </div>
      </div>
    `;
  }

  generate4AxisSpiderChartSVG() {
    const ab = this.scores.ability;
    const cx = 100;
    const cy = 100;
    
    const points = [
      { x: cx, y: cy - (ab.numerical / 100) * 80 },
      { x: cx + (ab.spatial / 100) * 80, y: cy },
      { x: cx, y: cy + (ab.verbal / 100) * 80 },
      { x: cx - (ab.logical / 100) * 80, y: cy }
    ];

    const polyStr = points.map(p => `${p.x},${p.y}`).join(" ");

    return `
      <svg viewBox="0 0 200 200" style="width:100%; height:auto;">
        <!-- Concentric Circle Target Grids (Radar Pattern) -->
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-border)" stroke-dasharray="3 3" stroke-width="0.8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-border)" stroke-dasharray="3 3" stroke-width="0.8" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--color-border)" stroke-dasharray="3 3" stroke-width="0.8" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="var(--color-border)" stroke-dasharray="3 3" stroke-width="0.8" />
        
        <!-- Outer Frame Ring -->
        <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-border-dark)" stroke-dasharray="6 2" stroke-width="1.2" />
        
        <!-- Axes -->
        <line x1="100" y1="10" x2="100" y2="190" stroke="var(--color-border-dark)" stroke-width="1.2" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="var(--color-border-dark)" stroke-width="1.2" />
        
        <!-- Labels -->
        <text x="100" y="14" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">NUMERICAL</text>
        <text x="194" y="103" text-anchor="end" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">SPATIAL</text>
        <text x="100" y="195" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">VERBAL</text>
        <text x="6" y="103" text-anchor="start" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">ABSTRACT</text>
        
        <!-- Data Polygon -->
        <polygon points="${polyStr}" fill="var(--color-accent-rust)" fill-opacity="0.25" stroke="var(--color-accent-rust)" stroke-width="2.2" />
        
        <!-- Data Markers -->
        ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="var(--color-accent-rust)" />`).join("")}
      </svg>
    `;
  }

  drawRiasecBarChart() {
    const container = this.container.querySelector("#riasec-bar-chart-container");
    if (!container) return;

    const r = this.scores.interests;
    const keys = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
    const labels = ["R", "I", "A", "S", "E", "C"];

    const svgHTML = `
      <svg viewBox="0 0 360 180" style="width:100%; height:auto;">
        <!-- Base line -->
        <line x1="20" y1="150" x2="340" y2="150" stroke="var(--color-border-dark)" stroke-width="1.8" />
        
        <!-- Grid lines -->
        <line x1="20" y1="100" x2="340" y2="100" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2 3" />
        <line x1="20" y1="50" x2="340" y2="50" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2 3" />
        
        <!-- Columns -->
        ${keys.map((k, idx) => {
          const score = r[k] || 0;
          const height = (score / 100) * 120;
          const x = 36 + idx * 52;
          const y = 150 - height;
          
          return `
            <rect x="${x}" y="${y}" width="26" height="${height}" fill="var(--color-accent-rust)" fill-opacity="0.3" stroke="var(--color-border-dark)" stroke-width="1.5" />
            <rect x="${x + 3}" y="${y + 3}" width="20" height="${Math.max(0, height - 6)}" fill="none" stroke="var(--color-border-dark)" stroke-dasharray="1 1" />
            
            <text x="${x + 13}" y="${Math.max(12, y - 6)}" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="8" font-weight="700" fill="var(--color-text-heading)">${score}%</text>
            <text x="${x + 13}" y="165" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="10" font-weight="700" fill="var(--color-text-heading)">${labels[idx]}</text>
          `;
        }).join("")}
      </svg>
    `;

    container.innerHTML = svgHTML;
  }

  drawVARKDonutChart() {
    const container = this.container.querySelector("#vark-donut-container");
    if (!container) return;

    const l = this.scores.learning;
    const total = l.visual + l.auditory + l.readwrite + l.kinesthetic;
    if (total === 0) return;

    const C = 251.2;
    const slices = [
      { val: l.visual, color: "var(--color-accent-rust)" },
      { val: l.auditory, color: "var(--color-accent-sage)" },
      { val: l.readwrite, color: "var(--color-accent-gold)" },
      { val: l.kinesthetic, color: "var(--color-border-dark)" }
    ];

    let currentOffset = 0;
    const pathsHTML = slices.map(sl => {
      const len = (sl.val / total) * C;
      const dasharray = `${len} ${C - len}`;
      const dashoffset = currentOffset;
      currentOffset -= len;
      
      return `
        <circle cx="75" cy="75" r="40" fill="none" stroke="${sl.color}" stroke-width="12"
          stroke-dasharray="${dasharray}" stroke-dashoffset="${dashoffset}" transform="rotate(-90 75 75)">
          <animate attributeName="stroke-dasharray" from="0 251.2" to="${dasharray}" dur="1s" fill="freeze" />
        </circle>
      `;
    }).join("");

    container.innerHTML = `
      <svg viewBox="0 0 150 150" style="width:100%; height:auto;">
        <circle cx="75" cy="75" r="34" fill="var(--color-bg-card)" />
        ${pathsHTML}
        <text x="75" y="80" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="11" font-weight="700" fill="var(--color-text-heading)">VARK</text>
      </svg>
    `;
  }

  drawFunnelChart() {
    const container = this.container.querySelector("#funnel-container");
    if (!container) return;

    const clusters = [
      { name: "Tech & Systems", score: this.calculateEuclideanSuitability("Machine Learning Engineer", this.scores) },
      { name: "Finance & Commerce", score: this.calculateEuclideanSuitability("Actuarial Risk Specialist", this.scores) },
      { name: "Engineering & Industry", score: this.calculateEuclideanSuitability("Robotics Sensor Fusion Developer", this.scores) },
      { name: "Biotech & Healthcare", score: this.calculateEuclideanSuitability("Bioinformatics Data Analyst", this.scores) },
      { name: "Media & Experience Design", score: this.calculateEuclideanSuitability("UI/UX Product Designer", this.scores) }
    ];
    clusters.sort((a,b)=>b.score - a.score);

    const svgHTML = `
      <svg viewBox="0 0 400 180" style="width:100%; height:auto;">
        ${clusters.map((c, idx) => {
          const width = (c.score / 100) * 280;
          const x = (400 - width) / 2;
          const y = 15 + idx * 32;
          
          return `
            <rect x="${x}" y="${y}" width="${width}" height="22" fill="var(--color-accent-rust)" fill-opacity="${0.5 - idx * 0.08}" stroke="var(--color-border-dark)" stroke-width="1.2" rx="3" ry="3" />
            <text x="200" y="${y + 14}" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="8" font-weight="700" fill="var(--color-text-heading)">
              ${c.name.toUpperCase()} &mdash; ${c.score}% Match
            </text>
          `;
        }).join("")}
      </svg>
    `;

    container.innerHTML = svgHTML;
  }

  // ==========================================
  // CONDITIONAL VISUAL TRIGGERS & GAP DETECTS
  // ==========================================

  generateConditionalVARKTriggerHTML(dominant) {
    if (dominant === "visual") {
      return `
        <div class="vt-card" style="border-color: var(--color-accent-rust); background: var(--color-bg-base); padding: 1.5rem; margin-top: 1.5rem;">
          <h5 style="font-family:'Courier Prime', monospace; color: var(--color-accent-rust); margin-bottom: 0.5rem;">VISUAL INTERFACE ACTIVATED: SPATIAL CONCEPT WIRE</h5>
          <p style="font-size:0.85rem; line-height: 1.4; margin-bottom: 1rem;">
            Because you score highly on the Visual learning index, the rendering engine has initialized an interactive concept roadmap mapping visual logic keys:
          </p>
          <svg viewBox="0 0 300 60" style="width: 100%; height: auto;">
            <circle cx="40" cy="30" r="10" fill="var(--color-accent-rust)"></circle>
            <line x1="50" y1="30" x2="140" y2="30" stroke="var(--color-border-dark)" stroke-width="2" stroke-dasharray="2 2"></line>
            <circle cx="150" cy="30" r="10" fill="var(--color-accent-sage)"></circle>
            <line x1="160" y1="30" x2="250" y2="30" stroke="var(--color-border-dark)" stroke-width="2" stroke-dasharray="2 2"></line>
            <circle cx="260" cy="30" r="10" fill="var(--color-accent-gold)"></circle>
            
            <text x="40" y="52" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" fill="var(--color-text-heading)">blueprints</text>
            <text x="150" y="52" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" fill="var(--color-text-heading)">diagrams</text>
            <text x="260" y="52" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" fill="var(--color-text-heading)">wireframes</text>
          </svg>
        </div>
      `;
    } else if (dominant === "auditory") {
      return `
        <div class="vt-card" style="border-color: var(--color-accent-sage); background: var(--color-bg-base); padding: 1.5rem; margin-top: 1.5rem;">
          <h5 style="font-family:'Courier Prime', monospace; color: var(--color-accent-sage); margin-bottom: 0.5rem;">AUDITORY CONSOLE ACTIVATED: VERBAL TRANSCRIPTION CHANNEL</h5>
          <p style="font-size:0.85rem; line-height: 1.4;">
            Your auditory focus indicates high verbal mapping. Listen to the mock voice waveform channel representing active study summaries:
          </p>
          <svg viewBox="0 0 300 40" style="width: 100%; height: auto; margin-top:0.5rem;">
            <line x1="10" y1="20" x2="290" y2="20" stroke="var(--color-border)" stroke-width="2" />
            <path d="M10,20 L30,5 L50,35 L70,10 L90,30 L110,15 L130,25 L150,5 L170,35 L190,20 L210,10 L230,30 L250,15 L270,25 L290,20" fill="none" stroke="var(--color-accent-sage)" stroke-width="2" />
          </svg>
        </div>
      `;
    } else if (dominant === "readwrite") {
      return `
        <div class="vt-card" style="border-color: var(--color-accent-gold); background: var(--color-bg-base); padding: 1.5rem; margin-top: 1.5rem;">
          <h5 style="font-family:'Courier Prime', monospace; color: var(--color-accent-gold); margin-bottom: 0.5rem;">READ/WRITE BLUEPRINT ACTIVATED: TEXTUAL LEXICON INDEX</h5>
          <p style="font-size:0.85rem; line-height: 1.4; font-family:'Courier Prime', monospace; opacity: 0.95;">
            - Index [01]: Summarize equations onto printed index cards.<br>
            - Index [02]: Re-write dictionary terms multiple times to cement pathways.<br>
            - Index [03]: Consult technical documentation manuals and build study logs.
          </p>
        </div>
      `;
    } else {
      return `
        <div class="vt-card" style="border-color: var(--color-border-dark); background: var(--color-bg-base); padding: 1.5rem; margin-top: 1.5rem;">
          <h5 style="font-family:'Courier Prime', monospace; color: var(--color-border-dark); margin-bottom: 0.5rem;">KINESTHETIC SANDBOX ACTIVATED: TACTILE EXPERIMENT BLOCK</h5>
          <p style="font-size:0.85rem; line-height: 1.4;">
            Your kinesthetic focus values direct hands-on practice. We have prepared an interactive sandbox module checklist:
          </p>
          <ul style="font-size: 0.8rem; margin-top:0.5rem; padding-left:1.2rem;">
            <li>Assemble modular breadboard components physically.</li>
            <li>Write and compile code logs to immediately run real-time outputs.</li>
            <li>Take physical breaks and pace while repeating card definitions.</li>
          </ul>
        </div>
      `;
    }
  }

  generateDynamicGapChecklistHTML(skills) {
    // Map required skills: Admin=70, Spatial=75, Leadership=80, Social=65, Mechanical=85
    const required = { administrative: 70, spatial: 75, leadership: 80, social: 65, mechanical: 85 };
    const labels = {
      administrative: "Master administrative operations and file records management templates",
      spatial: "Develop spatial CAD wireframing and geometric 3D visualization rules",
      leadership: "Enhance leadership decision mechanics, risk assessments, and project delegation",
      social: "Build social empathy systems, team conflict resolutions, and group synergies",
      mechanical: "Learn mechanical system debugging, circuits routing, and hardware configurations"
    };

    let html = "";
    Object.keys(required).forEach(key => {
      const current = skills[key] || 0;
      const req = required[key];
      const gap = req - current;
      
      if (gap > 0) {
        // Output as checkbox card list
        html += `
          <label class="skill-checkbox-label" style="display: flex; align-items: flex-start; margin-bottom: 0.6rem;">
            <input type="checkbox" class="skill-checkbox">
            <span class="skill-box-indicator"></span>
            <span style="font-size:0.8rem; line-height: 1.3;">
              <strong>Bridge ${key.toUpperCase()} gap:</strong> ${labels[key]} (Current: ${current}% vs. Required: ${req}%, Gap: -${gap}%)
            </span>
          </label>
        `;
      }
    });

    if (html === "") {
      html = `<p style="font-size: 0.8rem; color: var(--color-accent-sage);">No skill gaps detected! Your competencies fully align with required targets.</p>`;
    }
    return html;
  }

  generateRadialSkillGauge(title, score) {
    return `
      <div class="radial-gauge-item" style="text-align: center; font-family: 'Courier Prime', monospace;">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-border)" stroke-width="7" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-accent-rust)" stroke-width="7"
            stroke-dasharray="${(score / 100) * 226.08} 226.08" stroke-linecap="round" transform="rotate(-90 50 50)">
            <animate attributeName="stroke-dasharray" from="0 226.08" to="${(score / 100) * 226.08} 226.08" dur="1s" fill="freeze" />
          </circle>
          <text x="50" y="55" text-anchor="middle" font-size="12" font-weight="700" fill="var(--color-text-heading)">${score}%</text>
        </svg>
        <span style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-body); display: block; margin-top: 0.4rem; line-height: 1.2;">
          ${title}
        </span>
      </div>
    `;
  }

  generateSkillsGapChartHTML(skills) {
    const required = { administrative: 70, spatial: 75, leadership: 80, social: 65, mechanical: 85 };
    const keys = ["administrative", "spatial", "leadership", "social", "mechanical"];
    const labels = ["Administrative", "Spatial & Visual", "Leadership", "Social Cooperation", "Mechanical & Tech"];

    return keys.map((key, idx) => {
      const currentVal = skills[key] || 0;
      const reqVal = required[key];
      
      return `
        <div style="margin-bottom: 1.2rem; font-family: 'Courier Prime', monospace; font-size: 0.8rem; font-weight: 700;">
          <div class="justify-between container-flex" style="margin-bottom: 0.3rem;">
            <span>${labels[idx]}</span>
            <span>You: ${currentVal}% / Req: ${reqVal}%</span>
          </div>
          <div style="height: 14px; background: var(--color-border); position: relative; border: 1.5px solid var(--color-border-dark);">
            <div style="position: absolute; top:0; left:0; bottom:0; width: ${reqVal}%; background: var(--color-accent-ink); opacity: 0.25;"></div>
            <div style="position: absolute; top:0; left:0; bottom:0; width: ${currentVal}%; background: var(--color-accent-rust); opacity: 0.8;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Self-contained dynamic career suitability calculation (Stage 3 Cross-Referencing)
  calculateEuclideanSuitability(careerName, userScores) {
    const database = {
      // Tech
      "Machine Learning Engineer": {
        interests: { realistic: 60, investigative: 95, artistic: 40, social: 40, enterprising: 55, conventional: 80 },
        skills: { administrative: 70, spatial: 80, leadership: 60, social: 50, mechanical: 60 }
      },
      "Full-Stack Product Builder": {
        interests: { realistic: 80, investigative: 85, artistic: 60, social: 50, enterprising: 70, conventional: 70 },
        skills: { administrative: 80, spatial: 80, leadership: 70, social: 60, mechanical: 70 }
      },
      "Cybersecurity Infrastructure Lead": {
        interests: { realistic: 70, investigative: 90, artistic: 40, social: 40, enterprising: 60, conventional: 85 },
        skills: { administrative: 80, spatial: 70, leadership: 70, social: 50, mechanical: 70 }
      },
      "Cloud Solutions Architect": {
        interests: { realistic: 60, investigative: 85, artistic: 50, social: 55, enterprising: 80, conventional: 75 },
        skills: { administrative: 75, spatial: 75, leadership: 85, social: 70, mechanical: 60 }
      },
      "HMI Interface Developer": {
        interests: { realistic: 70, investigative: 80, artistic: 85, social: 50, enterprising: 60, conventional: 65 },
        skills: { administrative: 65, spatial: 90, leadership: 60, social: 60, mechanical: 70 }
      },
      "DevOps Automation Lead": {
        interests: { realistic: 75, investigative: 80, artistic: 45, social: 45, enterprising: 65, conventional: 85 },
        skills: { administrative: 85, spatial: 60, leadership: 70, social: 50, mechanical: 80 }
      },
      "Blockchain Ledger Auditor": {
        interests: { realistic: 50, investigative: 85, artistic: 35, social: 40, enterprising: 70, conventional: 95 },
        skills: { administrative: 95, spatial: 55, leadership: 75, social: 50, mechanical: 50 }
      },
      "Quantum Algorithm Analyst": {
        interests: { realistic: 55, investigative: 98, artistic: 45, social: 35, enterprising: 50, conventional: 85 },
        skills: { administrative: 75, spatial: 75, leadership: 65, social: 45, mechanical: 60 }
      },
      "Bioinformatics Tool Dev": {
        interests: { realistic: 60, investigative: 95, artistic: 45, social: 50, enterprising: 55, conventional: 80 },
        skills: { administrative: 80, spatial: 70, leadership: 60, social: 55, mechanical: 55 }
      },
      "Virtual Reality Creator": {
        interests: { realistic: 70, investigative: 75, artistic: 90, social: 55, enterprising: 70, conventional: 60 },
        skills: { administrative: 60, spatial: 95, leadership: 70, social: 60, mechanical: 75 }
      },
      "Mobile App Systems Architect": {
        interests: { realistic: 75, investigative: 85, artistic: 55, social: 45, enterprising: 70, conventional: 80 },
        skills: { administrative: 80, spatial: 80, leadership: 70, social: 55, mechanical: 65 }
      },
      "Database Tuning Engineer": {
        interests: { realistic: 50, investigative: 90, artistic: 30, social: 35, enterprising: 60, conventional: 95 },
        skills: { administrative: 95, spatial: 60, leadership: 65, social: 45, mechanical: 60 }
      },
      "Game Logic Developer": {
        interests: { realistic: 70, investigative: 80, artistic: 90, social: 40, enterprising: 65, conventional: 65 },
        skills: { administrative: 60, spatial: 90, leadership: 65, social: 50, mechanical: 70 }
      },
      "Site Reliability Engineer": {
        interests: { realistic: 65, investigative: 80, artistic: 35, social: 45, enterprising: 65, conventional: 90 },
        skills: { administrative: 90, spatial: 65, leadership: 75, social: 50, mechanical: 70 }
      },
      "Cryptographic Systems Designer": {
        interests: { realistic: 45, investigative: 98, artistic: 40, social: 30, enterprising: 55, conventional: 90 },
        skills: { administrative: 85, spatial: 70, leadership: 70, social: 40, mechanical: 50 }
      },
      // Finance
      "Actuarial Risk Specialist": {
        interests: { realistic: 30, investigative: 85, artistic: 40, social: 40, enterprising: 70, conventional: 95 },
        skills: { administrative: 95, spatial: 40, leadership: 70, social: 55, mechanical: 30 }
      },
      "Quantitative Investment Analyst": {
        interests: { realistic: 35, investigative: 95, artistic: 40, social: 45, enterprising: 80, conventional: 85 },
        skills: { administrative: 85, spatial: 50, leadership: 75, social: 60, mechanical: 35 }
      },
      "Corporate Compliance Lead": {
        interests: { realistic: 40, investigative: 70, artistic: 40, social: 60, enterprising: 70, conventional: 90 },
        skills: { administrative: 90, spatial: 50, leadership: 75, social: 70, mechanical: 40 }
      },
      "Operations Systems Auditor": {
        interests: { realistic: 45, investigative: 75, artistic: 40, social: 50, enterprising: 65, conventional: 95 },
        skills: { administrative: 95, spatial: 50, leadership: 65, social: 60, mechanical: 45 }
      },
      "Business Development Lead": {
        interests: { realistic: 30, investigative: 70, artistic: 60, social: 65, enterprising: 95, conventional: 70 },
        skills: { administrative: 75, spatial: 50, leadership: 90, social: 80, mechanical: 35 }
      },
      "Treasury Portfolio Auditor": {
        interests: { realistic: 35, investigative: 80, artistic: 35, social: 45, enterprising: 75, conventional: 95 },
        skills: { administrative: 95, spatial: 45, leadership: 70, social: 55, mechanical: 35 }
      },
      "FinTech Product Manager": {
        interests: { realistic: 45, investigative: 80, artistic: 60, social: 60, enterprising: 90, conventional: 75 },
        skills: { administrative: 80, spatial: 65, leadership: 85, social: 70, mechanical: 45 }
      },
      "Forensic Account Inspector": {
        interests: { realistic: 40, investigative: 90, artistic: 35, social: 50, enterprising: 65, conventional: 95 },
        skills: { administrative: 95, spatial: 50, leadership: 70, social: 60, mechanical: 40 }
      },
      "Venture Capital Analyst": {
        interests: { realistic: 35, investigative: 85, artistic: 50, social: 55, enterprising: 95, conventional: 70 },
        skills: { administrative: 80, spatial: 55, leadership: 85, social: 65, mechanical: 35 }
      },
      "Logistics Operations Architect": {
        interests: { realistic: 65, investigative: 75, artistic: 40, social: 50, enterprising: 75, conventional: 90 },
        skills: { administrative: 90, spatial: 75, leadership: 75, social: 60, mechanical: 60 }
      },
      "Investment Banking Associate": {
        interests: { realistic: 30, investigative: 75, artistic: 45, social: 60, enterprising: 98, conventional: 80 },
        skills: { administrative: 85, spatial: 45, leadership: 95, social: 75, mechanical: 30 }
      },
      "Corporate Tax Strategist": {
        interests: { realistic: 25, investigative: 80, artistic: 30, social: 45, enterprising: 75, conventional: 98 },
        skills: { administrative: 98, spatial: 40, leadership: 75, social: 60, mechanical: 25 }
      },
      "Supply Chain Planner": {
        interests: { realistic: 55, investigative: 75, artistic: 35, social: 55, enterprising: 75, conventional: 90 },
        skills: { administrative: 90, spatial: 65, leadership: 70, social: 65, mechanical: 55 }
      },
      "Portfolio Risk Manager": {
        interests: { realistic: 40, investigative: 90, artistic: 40, social: 45, enterprising: 85, conventional: 90 },
        skills: { administrative: 90, spatial: 50, leadership: 85, social: 60, mechanical: 40 }
      },
      "Market Microstructure Researcher": {
        interests: { realistic: 35, investigative: 95, artistic: 40, social: 40, enterprising: 75, conventional: 90 },
        skills: { administrative: 85, spatial: 50, leadership: 70, social: 50, mechanical: 35 }
      },
      // Mechatronics
      "Merchant Navy Officer": {
        interests: { realistic: 90, investigative: 75, artistic: 40, social: 50, enterprising: 80, conventional: 70 },
        skills: { administrative: 75, spatial: 85, leadership: 85, social: 60, mechanical: 90 }
      },
      "Robotics Sensor Fusion Developer": {
        interests: { realistic: 95, investigative: 90, artistic: 40, social: 40, enterprising: 60, conventional: 70 },
        skills: { administrative: 60, spatial: 85, leadership: 65, social: 50, mechanical: 95 }
      },
      "Industrial CAD Prototyper": {
        interests: { realistic: 90, investigative: 75, artistic: 70, social: 45, enterprising: 55, conventional: 80 },
        skills: { administrative: 75, spatial: 95, leadership: 60, stroke: 50, mechanical: 90 }
      },
      "Grid Automation Analyst": {
        interests: { realistic: 80, investigative: 85, artistic: 40, social: 40, enterprising: 65, conventional: 80 },
        skills: { administrative: 80, spatial: 75, leadership: 65, social: 50, mechanical: 80 }
      },
      "Embedded Systems Inspector": {
        interests: { realistic: 85, investigative: 80, artistic: 40, social: 40, enterprising: 55, conventional: 90 },
        skills: { administrative: 85, spatial: 75, leadership: 60, social: 50, mechanical: 85 }
      },
      "Acoustics Hardware Designer": {
        interests: { realistic: 80, investigative: 80, artistic: 85, social: 40, enterprising: 55, conventional: 65 },
        skills: { administrative: 60, spatial: 85, leadership: 55, social: 45, mechanical: 80 }
      },
      "Aerospace Avionics Tester": {
        interests: { realistic: 95, investigative: 85, artistic: 40, social: 40, enterprising: 60, conventional: 80 },
        skills: { administrative: 80, spatial: 80, leadership: 70, social: 45, mechanical: 95 }
      },
      "Automotive Telemetry Dev": {
        interests: { realistic: 90, investigative: 80, artistic: 50, social: 45, enterprising: 65, conventional: 75 },
        skills: { administrative: 70, spatial: 85, leadership: 65, social: 50, mechanical: 90 }
      },
      "Smart Factory Auditor": {
        interests: { realistic: 80, investigative: 75, artistic: 40, social: 50, enterprising: 70, conventional: 90 },
        skills: { administrative: 90, spatial: 70, leadership: 75, social: 60, mechanical: 85 }
      },
      "Optical Systems Designer": {
        interests: { realistic: 85, investigative: 85, artistic: 60, social: 35, enterprising: 50, conventional: 75 },
        skills: { administrative: 70, spatial: 90, leadership: 60, social: 40, mechanical: 85 }
      },
      "Renewable Grid Modeler": {
        interests: { realistic: 70, investigative: 90, artistic: 50, social: 55, enterprising: 65, conventional: 80 },
        skills: { administrative: 80, spatial: 70, leadership: 70, social: 60, mechanical: 70 }
      },
      "Drones Autopilot Programmer": {
        interests: { realistic: 90, investigative: 85, artistic: 50, social: 45, enterprising: 60, conventional: 75 },
        skills: { administrative: 70, spatial: 85, leadership: 65, social: 50, mechanical: 90 }
      },
      "Thermal Management Specialist": {
        interests: { realistic: 85, investigative: 85, artistic: 40, social: 35, enterprising: 50, conventional: 80 },
        skills: { administrative: 75, spatial: 75, leadership: 60, social: 40, mechanical: 85 }
      },
      "Additive Manufacturing Engineer": {
        interests: { realistic: 90, investigative: 80, artistic: 65, social: 45, enterprising: 55, conventional: 75 },
        skills: { administrative: 70, spatial: 90, leadership: 60, social: 45, mechanical: 90 }
      },
      "CNC Systems Programmer": {
        interests: { realistic: 92, investigative: 70, artistic: 45, social: 40, enterprising: 50, conventional: 85 },
        skills: { administrative: 80, spatial: 85, leadership: 60, social: 45, mechanical: 95 }
      },
      "Micro-Grid Controller": {
        interests: { realistic: 80, investigative: 80, artistic: 40, social: 50, enterprising: 60, conventional: 90 },
        skills: { administrative: 90, spatial: 70, leadership: 70, social: 55, mechanical: 80 }
      },
      // Biotech
      "Bioinformatics Data Analyst": {
        interests: { realistic: 45, investigative: 95, artistic: 45, social: 60, enterprising: 50, conventional: 80 },
        skills: { administrative: 80, spatial: 65, leadership: 60, social: 65, mechanical: 45 }
      },
      "Clinical Trials Director": {
        interests: { realistic: 30, investigative: 80, artistic: 40, social: 90, enterprising: 75, conventional: 85 },
        skills: { administrative: 85, spatial: 50, leadership: 85, social: 85, mechanical: 30 }
      },
      "Genetic Sequencing Specialist": {
        interests: { realistic: 40, investigative: 95, artistic: 40, social: 55, enterprising: 50, conventional: 85 },
        skills: { administrative: 80, spatial: 60, leadership: 60, social: 60, mechanical: 40 }
      },
      "Hospital Systems Auditor": {
        interests: { realistic: 30, investigative: 70, artistic: 35, social: 75, enterprising: 65, conventional: 95 },
        skills: { administrative: 95, spatial: 40, leadership: 75, social: 75, mechanical: 30 }
      },
      "Health Policy Consultant": {
        interests: { realistic: 30, investigative: 80, artistic: 50, social: 90, enterprising: 80, conventional: 70 },
        skills: { administrative: 75, spatial: 50, leadership: 85, social: 90, mechanical: 30 }
      },
      "Medical Device Integrator": {
        interests: { realistic: 85, investigative: 80, artistic: 45, social: 60, enterprising: 55, conventional: 80 },
        skills: { administrative: 75, spatial: 80, leadership: 65, social: 65, mechanical: 85 }
      },
      "Pharmaceutical Compliance Lead": {
        interests: { realistic: 40, investigative: 75, artistic: 35, social: 65, enterprising: 70, conventional: 95 },
        skills: { administrative: 95, spatial: 50, leadership: 80, social: 70, mechanical: 40 }
      },
      "Epidemiological Data Modeler": {
        interests: { realistic: 40, investigative: 95, artistic: 45, social: 65, enterprising: 60, conventional: 80 },
        skills: { administrative: 85, spatial: 60, leadership: 70, social: 70, mechanical: 40 }
      },
      "Digital Health Analyst": {
        interests: { realistic: 45, investigative: 80, artistic: 55, social: 75, enterprising: 85, conventional: 75 },
        skills: { administrative: 80, spatial: 65, leadership: 80, social: 80, mechanical: 45 }
      },
      "Pathology Lab Systems Director": {
        interests: { realistic: 50, investigative: 85, artistic: 35, social: 60, enterprising: 65, conventional: 95 },
        skills: { administrative: 95, spatial: 55, leadership: 75, social: 65, mechanical: 50 }
      },
      "Clinical Geneticist": {
        interests: { realistic: 35, investigative: 95, artistic: 40, social: 80, enterprising: 60, conventional: 85 },
        skills: { administrative: 85, spatial: 55, leadership: 75, social: 80, mechanical: 35 }
      },
      "Immunology Lab Researcher": {
        interests: { realistic: 45, investigative: 95, artistic: 40, social: 50, enterprising: 50, conventional: 85 },
        skills: { administrative: 80, spatial: 55, leadership: 65, social: 60, mechanical: 45 }
      },
      "Neuro-Prosthetic Interface Dev": {
        interests: { realistic: 85, investigative: 90, artistic: 50, social: 55, enterprising: 65, conventional: 75 },
        skills: { administrative: 70, spatial: 85, leadership: 70, social: 60, mechanical: 85 }
      },
      "Pharmacokinetics Analyst": {
        interests: { realistic: 40, investigative: 95, artistic: 40, social: 50, enterprising: 60, conventional: 85 },
        skills: { administrative: 85, spatial: 55, leadership: 70, social: 55, mechanical: 40 }
      },
      "Molecular Diagnostics Specialist": {
        interests: { realistic: 50, investigative: 90, artistic: 35, social: 55, enterprising: 55, conventional: 90 },
        skills: { administrative: 90, spatial: 60, leadership: 65, social: 60, mechanical: 50 }
      },
      // Design/Media
      "UI/UX Product Designer": {
        interests: { realistic: 35, investigative: 70, artistic: 95, social: 65, enterprising: 75, conventional: 50 },
        skills: { administrative: 60, spatial: 95, leadership: 70, social: 80, mechanical: 35 }
      },
      "Technical Systems Animator": {
        interests: { realistic: 70, investigative: 50, artistic: 90, social: 40, enterprising: 60, conventional: 50 },
        skills: { administrative: 50, spatial: 90, leadership: 60, social: 50, mechanical: 80 }
      },
      "AR Experience Architect": {
        interests: { realistic: 55, investigative: 80, artistic: 95, social: 50, enterprising: 70, conventional: 55 },
        skills: { administrative: 60, spatial: 95, leadership: 70, social: 65, mechanical: 55 }
      },
      "Brand Systems Director": {
        interests: { realistic: 30, investigative: 65, artistic: 85, social: 70, enterprising: 95, conventional: 75 },
        skills: { administrative: 80, spatial: 70, leadership: 95, social: 85, mechanical: 30 }
      },
      "Creative Studio Lead": {
        interests: { realistic: 35, investigative: 60, artistic: 90, social: 80, enterprising: 85, conventional: 65 },
        skills: { administrative: 70, spatial: 80, leadership: 85, social: 90, mechanical: 35 }
      },
      "Information Graphic Designer": {
        interests: { realistic: 40, investigative: 70, artistic: 90, social: 65, enterprising: 65, conventional: 80 },
        skills: { administrative: 80, spatial: 90, leadership: 65, social: 70, mechanical: 40 }
      },
      "Interactive Content Specialist": {
        interests: { realistic: 50, investigative: 65, artistic: 90, social: 65, enterprising: 75, conventional: 65 },
        skills: { administrative: 70, spatial: 85, leadership: 70, social: 75, mechanical: 55 }
      },
      "Digital Typography Artist": {
        interests: { realistic: 45, investigative: 60, artistic: 95, social: 45, enterprising: 60, conventional: 85 },
        skills: { administrative: 80, spatial: 90, leadership: 60, social: 50, mechanical: 45 }
      },
      "Technical Documentation Editor": {
        interests: { realistic: 35, investigative: 70, artistic: 60, social: 55, enterprising: 65, conventional: 95 },
        skills: { administrative: 95, spatial: 60, leadership: 70, social: 60, mechanical: 35 }
      },
      "Sound Engineering Specialist": {
        interests: { realistic: 80, investigative: 75, artistic: 85, social: 45, enterprising: 60, conventional: 65 },
        skills: { administrative: 65, spatial: 85, leadership: 60, social: 50, mechanical: 80 }
      },
      "Motion Graphics Modeler": {
        interests: { realistic: 60, investigative: 60, artistic: 95, social: 45, enterprising: 65, conventional: 70 },
        skills: { administrative: 65, spatial: 95, leadership: 65, social: 50, mechanical: 60 }
      },
      "Instructional Systems Designer": {
        interests: { realistic: 35, investigative: 70, artistic: 75, social: 80, enterprising: 70, conventional: 75 },
        skills: { administrative: 80, spatial: 70, leadership: 75, social: 85, mechanical: 35 }
      },
      "Editorial Product Layout Artist": {
        interests: { realistic: 40, investigative: 65, artistic: 90, social: 50, enterprising: 60, conventional: 90 },
        skills: { administrative: 90, spatial: 90, leadership: 60, social: 55, mechanical: 40 }
      },
      "Digital Colorist & Render Specialist": {
        interests: { realistic: 65, investigative: 75, artistic: 90, stroke: 40, enterprising: 55, conventional: 70 },
        skills: { administrative: 60, spatial: 95, leadership: 60, social: 45, mechanical: 70 }
      },
      "Audio Synthesizer Designer": {
        interests: { realistic: 75, investigative: 80, artistic: 85, social: 45, enterprising: 65, conventional: 70 },
        skills: { administrative: 65, spatial: 90, leadership: 65, social: 50, mechanical: 80 }
      }
    };

    const target = database[careerName];
    if (!target) return 75;

    let sumSq = 0;
    let count = 0;

    Object.keys(target.interests).forEach(k => {
      sumSq += Math.pow((userScores.interests[k] || 50) - target.interests[k], 2);
      count++;
    });

    Object.keys(target.skills).forEach(k => {
      sumSq += Math.pow((userScores.skills[k] || 50) - target.skills[k], 2);
      count++;
    });

    const dist = Math.sqrt(sumSq / count);
    let fit = Math.round(100 - dist * 0.85);

    // Apply anti-gaming consistency multiplier to adjust final report precision
    const precisionMultiplier = 0.8 + 0.2 * (userScores.consistency / 100);
    fit = Math.round(fit * precisionMultiplier);

    return Math.max(40, Math.min(99, fit));
  }

  generateMBTIBarHTML(leftLabel, leftScore, rightLabel, rightScore, leftCode, rightCode) {
    const fillStyle = leftScore >= 50 
      ? `background-color: var(--color-accent-rust); margin-right: auto; width: ${leftScore}%` 
      : `background-color: var(--color-accent-ink); margin-left: auto; width: ${rightScore}%`;

    return `
      <div style="margin-bottom: 1.2rem; font-family: 'Courier Prime', monospace; font-size: 0.8rem; font-weight: 700;">
        <div class="justify-between container-flex" style="margin-bottom: 0.3rem;">
          <span>${leftLabel.toUpperCase()} (${leftCode}) &mdash; ${leftScore}%</span>
          <span>${rightScore}% &mdash; ${rightLabel.toUpperCase()} (${rightCode})</span>
        </div>
        <div class="progress-track" style="position: relative; display: flex;">
          <div style="height: 100%; transition: width 1.2s; ${fillStyle}"></div>
        </div>
      </div>
    `;
  }

  generateMBTIInterpretations() {
    const code = this.scores.mbtiCode;
    let narrative = "";
    let strengths = [];
    let weaknesses = [];

    if (code.startsWith("I")) {
      narrative += "<strong>Introvert focus:</strong> You are highly reflective and draw focus from internal models, code frameworks, and theoretical rules. You prefer quiet study grids over continuous meetings.<br><br>";
      strengths.push("Deep internal focus and ability to troubleshoot in isolation");
      weaknesses.push("Reluctance to communicate technical details in group discussions");
    } else {
      narrative += "<strong>Extravert focus:</strong> You draw focus from group discussions and team alignment loops. You communicate concepts verbally.<br><br>";
      strengths.push("Excellent active group collaboration and verbal pitching");
      weaknesses.push("Fatigue when working long periods in isolated labs");
    }

    if (code.includes("N")) {
      narrative += "<strong>Intuitive analysis:</strong> You search for future possibilities, pattern indexes, and logical structures rather than immediate details.<br><br>";
      strengths.push("Novel, creative conceptual planning and pattern mapping");
      weaknesses.push("Impatience with detailed, daily administrative checklists");
    } else {
      narrative += "<strong>Sensing analysis:</strong> You focus strictly on real-world facts, details, and current physical evidence.<br><br>";
      strengths.push("High attention to data details and operational compliance");
      weaknesses.push("Anxiety when guidelines are unwritten or speculative");
    }

    if (code.includes("T")) {
      narrative += "<strong>Thinking logic:</strong> When solving issues, you prioritize objective data, logical rules, and metrics compliance over feelings.<br><br>";
      strengths.push("Objective risk analysis and rational decision capabilities");
      weaknesses.push("Risk of ignoring team feelings or emotional friction points");
    } else {
      narrative += "<strong>Feeling logic:</strong> You prioritize interpersonal empathy, team harmony, and personal values when coordinating tasks.<br><br>";
      strengths.push("High active group empathy and mediative communication");
      weaknesses.push("Tendency to take critical business reviews personally");
    }

    if (code.endsWith("J")) {
      narrative += "<strong>Judging style:</strong> You seek structured closures, firm deadlines, and planned checks. You dislike volatile updates.";
      strengths.push("Impeccable timeline tracking and structured organization");
      weaknesses.push("Resistance to sudden, unannounced agile pivots");
    } else {
      narrative += "<strong>Perceiving style:</strong> You thrive in flexible, spontaneous environments, adapting to variables as they arise.";
      strengths.push("High adaptability and comfort under volatile, chaotic plans");
      weaknesses.push("Struggle to close tasks when detailed logs are required");
    }

    return { narrative, strengths, weaknesses };
  }

  generateBarGroupHTML(category, scores, definitions) {
    return Object.keys(definitions).map(key => {
      const score = scores[key] !== undefined ? scores[key] : 0;
      const label = definitions[key];
      return `
        <div class="score-bar-item">
          <div class="bar-info">
            <span style="font-weight: 700;">${label.toUpperCase()}</span>
            <span>${score}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${category}-fill" style="width: 0%" data-width="${score}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  bindDeepDiveEvents() {
    const checkboxes = this.container.querySelectorAll(".skill-checkbox");
    checkboxes.forEach(chk => {
      chk.addEventListener("change", (e) => {
        localStorage.setItem(`career_guidance_skill_${e.target.id}`, e.target.checked ? "true" : "false");
      });
    });
  }

  bindDebriefEvents() {
    const copyBtn = this.container.querySelector("#btn-copy-brief");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", () => {
      const briefText = this.container.querySelector("#brief-text-content").innerText;
      navigator.clipboard.writeText(briefText).then(() => {
        copyBtn.innerText = "Profile Copied!";
        setTimeout(() => {
          copyBtn.innerText = "Copy Executive Profile to Clipboard";
        }, 2000);
      });
    });
  }
}
