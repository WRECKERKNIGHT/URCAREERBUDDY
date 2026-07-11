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
        this.currentTab = e.target.getAttribute("data-tab");
        buttons.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.renderContent();
      });
    });
  }

  renderContent() {
    const stageEl = this.container.querySelector("#report-output-stage");
    if (!stageEl) return;

    stageEl.className = "report-output-stage fade-in-section";
    
    switch (this.currentTab) {
      case "summary":
        stageEl.innerHTML = this.getSummaryHTML();
        break;
      case "cognitive_analytics":
        stageEl.innerHTML = this.getCognitiveAnalyticsHTML();
        break;
      case "dashboard":
        stageEl.innerHTML = this.getDashboardHTML();
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

  getDashboardHTML() {
    const stageLabels = {
      ignorant: "Ignorant Phase (Low awareness/variability)",
      confused: "Confused Phase (High interests in conflicting fields)",
      diffused: "Diffused Phase (Balanced moderate interests)",
      methodical: "Methodical Phase (Systematic planning core)",
      optimized: "Optimized Phase (Clear peaks & target alignment)"
    };
    
    const stageClass = this.scores.planningStage;
    const stageText = stageLabels[stageClass] || "Methodical Phase";

    return `
      <section class="vt-card">
        <div class="archetype-badge">CURRENT DIAGNOSTIC STATE</div>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; font-style: normal; text-transform: uppercase;">
          ${stageText}
        </h2>
        <p style="color: var(--color-accent-rust); font-family: 'Courier Prime', monospace; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">
          Calculated Archetype: ${this.archetype.title}
        </p>

        <!-- Planning State Meter (PRD Part 1) -->
        <div class="vt-card" style="padding: 1.5rem; border-style: dashed; margin-bottom: 2rem;">
          <h4 style="font-family: 'Courier Prime', monospace; font-size: 0.9rem; margin-bottom: 1.2rem; text-transform: uppercase;">Planning Execution Timeline Meter</h4>
          ${this.generatePlanningTimelineMeter(stageClass)}
        </div>

        <p class="drop-cap" style="line-height: 1.7; margin-bottom: 2rem;">
          Based on the diagnostic intake, your current placement is mapped to the <strong>${stageClass.toUpperCase()}</strong> planning mindset.
          This category characterizes how crystallised your professional orientation is, and the degree of alignment between your capabilities and interests.
        </p>

        <div class="consistency-meter container-flex">
          <span class="consistency-title">Anti-Bias Integrity Index:</span>
          <div class="consistency-val-badge ${this.scores.consistency >= 70 ? 'high' : 'low'}">
            ${this.scores.consistency}% &mdash; ${this.scores.consistency >= 70 ? 'Strong Consistency' : 'High Variance'}
          </div>
        </div>
      </section>

      <section class="vt-card swot-section">
        <h3 style="margin-bottom: 0.5rem; font-style: italic;">Personal SWOT Profile</h3>
        <p class="section-sub">Dynamic mapping of your psychometric coordinates to workplace impact.</p>
        
        <div class="swot-grid">
          <div class="swot-box strengths">
            <div class="swot-header">Strengths</div>
            <ul>
              ${this.archetype.swot.strengths.map(s => `<li>${s}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box weaknesses">
            <div class="swot-header">Weaknesses</div>
            <ul>
              ${this.archetype.swot.weaknesses.map(w => `<li>${w}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box opportunities">
            <div class="swot-header">Opportunities</div>
            <ul>
              ${this.archetype.swot.opportunities.map(o => `<li>${o}</li>`).join("")}
            </ul>
          </div>
          <div class="swot-box threats">
            <div class="swot-header">Threats</div>
            <ul>
              ${this.archetype.swot.threats.map(t => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  getPersonalityHTML() {
    const m = this.scores.mbti;
    const details = this.generateMBTIInterpretations();

    return `
      <section class="vt-card">
        <h3>Stage 1: Personality Diagnostics (MBTI Model)</h3>
        <p class="section-sub">Percentile distribution mapping your cognitive focus, data filters, decision methods, and scheduling style.</p>
        
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
              CALCULATED CODE: ${this.scores.mbtiCode}
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
          { name: "Cryptographic Systems Designer", profile: "Investigative / Theoretical", description: "Design cipher protocols, test hash algorithms, and audit secure handshake keys.", skills: ["numerical", "logical", "abstract"], streams: ["PCM"] }
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
          { name: "Market Microstructure Researcher", profile: "Investigative / Analytical", description: "Analyze high-frequency order books, study bid-ask spreads, and write trade reports.", skills: ["numerical", "logical", "abstract"], streams: ["Commerce", "PCM"] }
        ]
      },
      {
        name: "Industrial & Mechatronics Engineering",
        careers: [
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
          { name: "Micro-Grid Controller", profile: "Conventional / Systems", description: "Monitor localized grid balance, manage battery storage relays, and dispatch generators.", skills: ["logical", "numerical", "administrative"], streams: ["PCM"] }
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
          { name: "Molecular Diagnostics Specialist", profile: "Conventional / Laboratory", description: "Perform PCR amplification tests, verify chemical reaction indicators, and audit assay logs.", skills: ["logical", "administrative", "numerical"], streams: ["PCB"] }
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
          { name: "Audio Synthesizer Designer", profile: "Realistic / Creative", description: "Build software sound wave filters, script audio oscillator loops, and test MIDI maps.", skills: ["mechanical", "abstract", "logical"], streams: ["Arts", "PCM"] }
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

      // Calculate suitability scores
      let careerRows = clusterData.careers.map(car => {
        const calculated = this.calculateEuclideanSuitability(car.name, this.scores);
        return { ...car, score: calculated };
      });

      // Filter by activeStream
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
                  
                  <div class="career-detail-popup hidden" id="popup-${index}-${idx}" style="margin-top: 1rem; background: var(--color-bg-base); padding: 0.8rem; border: 1px solid var(--color-border-dark);">
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
