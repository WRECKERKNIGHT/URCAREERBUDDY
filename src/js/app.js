// Main Application Coordinator (Upgraded with 5-Stage Testing and Parallax bindings)
import { questions } from './questions.js';
import { AssessmentEngine } from './engine.js';
import { calculateArchetype } from './archetypes.js';
import { ReportRenderer } from './report.js';
import { initGamification } from './gamification.js';
import { initEncyclopedia } from './career-encyclopedia.js';
import { fetchLMIForCareer } from './lmi.js';
import { initEducationToolkit } from './education.js';
import { initWhatIfSandbox } from './whatif.js';
import { initExperientialBoard } from './experiential.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // DOM Views
  const landingView = document.getElementById("landing-view");
  const onboardingView = document.getElementById("onboarding-view");
  const assessmentView = document.getElementById("assessment-view");
  const reportView = document.getElementById("report-view");
  
  // Navigation Links
  const logo = document.getElementById("platform-logo");
  const navLinkHome = document.getElementById("nav-link-home");
  const navLinkReset = document.getElementById("nav-link-reset");
  
  // Action Buttons
  const btnEnterPortal = document.getElementById("btn-enter-portal");
  const btnStartTest = document.getElementById("btn-start-test");
  const btnSimulateReport = document.getElementById("btn-simulate-report");
  const btnPrevQuestion = document.getElementById("btn-prev-question");
  const btnNextQuestion = document.getElementById("btn-next-question");
  const btnThemeToggle = document.getElementById("btn-theme-toggle");
  const themeSwitchSlider = document.getElementById("theme-switch-slider");

  // Bilingual Selectors
  const btnLangEn = document.getElementById("btn-lang-en");
  const btnLangHi = document.getElementById("btn-lang-hi");
  
  // Intake Form
  const onboardingForm = document.getElementById("onboarding-form");
  const studentNameInput = document.getElementById("student-name");
  const academicGradeSelect = document.getElementById("academic-grade");
  const streamSelectionContainer = document.getElementById("stream-selection-container");
  const selectedStreamInput = document.getElementById("selected-stream");
  const streamCards = document.querySelectorAll(".track-selection-card");
  
  // Assessment layout nodes
  const questionCategoryBadge = document.getElementById("question-category-badge");
  const sectionItemCounter = document.getElementById("section-item-counter");
  const progressPercentLabel = document.getElementById("progress-percent-label");
  const answeredQuestionsLabel = document.getElementById("answered-questions-label");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const questionBoxWrapper = document.getElementById("question-box-wrapper");

  // Language State
  let activeLang = "en";

  const translations = {
    en: {
      navHome: "Home",
      navReset: "Reset Portal",
      heroTitle: "URCAREERBUDDY",
      heroBy: "BY HARSHIT MISHRA",
      heroSubtitle: "An advanced psychometric engine designed to guide student trajectories through scientific diagnostic metrics. Calibrating Core Aptitude, Behavioral Traits, Workplace Values, and Skill Matrix maps across 130 structural data points.",
      btnEnterPortal: "Access Diagnostic Portal",
      intakeTitle: "Intake Profile Registration",
      labelName: "Student Name",
      labelGrade: "Academic Grade / Stream Track",
      btnStartTest: "Begin Diagnostic Testing",
      btnSimulate: "Simulate Diagnostic Dossier Report",
      prevBtn: "Previous",
      nextBtn: "Next",
      disclaimerTitle: "Registry Waiver & Psychometric Accord",
      disclaimerAgree: "I Agree & Accept Terms",
      disclaimerClose: "Decline"
    },
    hi: {
      navHome: "होम",
      navReset: "पोर्टल रीसेट करें",
      heroTitle: "यूआरकैरियरबडी",
      heroBy: "हर्षित मिश्रा द्वारा निर्मित",
      heroSubtitle: "छात्रों के करियर विकल्पों को वैज्ञानिक डायग्नोस्टिक मेट्रिक्स के माध्यम से मार्गदर्शन करने के लिए डिज़ाइन किया गया एक उन्नत साइकोमेट्रिक इंजन। 130 संरचनात्मक डेटा बिंदुओं पर मूल योग्यता, व्यवहार लक्षण, कार्यस्थल मूल्यों और कौशल मैट्रिक्स को कैलिब्रेट करना।",
      btnEnterPortal: "डायग्नोस्टिक पोर्टल खोलें",
      intakeTitle: "दाखिला प्रोफ़ाइल पंजीकरण",
      labelName: "छात्र का नाम",
      labelGrade: "शैक्षणिक ग्रेड / स्ट्रीम ट्रैक",
      btnStartTest: "डायग्नोस्टिक परीक्षण शुरू करें",
      btnSimulate: "डायग्नोस्टिक रिपोर्ट का अनुकरण करें",
      prevBtn: "पीछे",
      nextBtn: "आगे",
      disclaimerTitle: "पंजीकरण छूट और साइकोमेट्रिक समझौता",
      disclaimerAgree: "मैं सहमत हूँ और शर्तें स्वीकार करता हूँ",
      disclaimerClose: "अस्वीकार करें"
    }
  };

  function translateStaticUI() {
    const t = translations[activeLang];
    
    const homeEl = document.getElementById("nav-link-home");
    const resetEl = document.getElementById("nav-link-reset");
    if (homeEl) homeEl.innerText = t.navHome;
    if (resetEl) resetEl.innerText = t.navReset;

    const heroTitleEl = document.getElementById("parallax-text-1");
    const heroByEl = heroTitleEl ? heroTitleEl.nextElementSibling : null;
    const heroSubtitleEl = document.getElementById("parallax-text-2");
    if (heroTitleEl) heroTitleEl.innerText = t.heroTitle;
    if (heroByEl) heroByEl.innerText = t.heroBy;
    if (heroSubtitleEl) heroSubtitleEl.innerText = t.heroSubtitle;
    if (btnEnterPortal) {
      btnEnterPortal.innerHTML = `${t.btnEnterPortal} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 8px; vertical-align: middle;"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    }

    const intakeTitleEl = document.querySelector("#onboarding-view h2");
    if (intakeTitleEl) intakeTitleEl.innerText = t.intakeTitle;
    
    const labelNameEl = document.querySelector("label[for='student-name']");
    if (labelNameEl) labelNameEl.innerText = t.labelName;
    
    const labelGradeEl = document.querySelector("label[for='academic-grade']");
    if (labelGradeEl) labelGradeEl.innerText = t.labelGrade;

    if (btnStartTest) btnStartTest.innerText = t.btnStartTest;
    if (btnSimulateReport) btnSimulateReport.innerText = t.btnSimulate;

    if (btnPrevQuestion) btnPrevQuestion.innerText = t.prevBtn;
    if (btnNextQuestion) btnNextQuestion.innerText = t.nextBtn;
  }

  function setLanguage(lang) {
    activeLang = lang;
    localStorage.setItem("career_guidance_lang", lang);

    if (!btnLangEn || !btnLangHi) return;

    if (lang === "hi") {
      btnLangEn.style.background = "none";
      btnLangEn.style.color = "var(--color-text-body)";
      btnLangEn.style.opacity = "0.85";
      btnLangHi.style.background = "var(--color-accent-rust)";
      btnLangHi.style.color = "var(--color-bg-base)";
      btnLangHi.style.opacity = "1";
    } else {
      btnLangHi.style.background = "none";
      btnLangHi.style.color = "var(--color-text-body)";
      btnLangHi.style.opacity = "0.85";
      btnLangEn.style.background = "var(--color-accent-rust)";
      btnLangEn.style.color = "var(--color-bg-base)";
      btnLangEn.style.opacity = "1";
    }

    translateStaticUI();

    if (!assessmentView.classList.contains("hidden")) {
      renderCurrentQuestion();
    }
  }

  if (btnLangEn && btnLangHi) {
    btnLangEn.addEventListener("click", () => setLanguage("en"));
    btnLangHi.addEventListener("click", () => setLanguage("hi"));
  }

  // Instances
  const engine = new AssessmentEngine(questions);
  const renderer = new ReportRenderer();

  // Initialize (Moved to the bottom of the DOMContentLoaded scope to prevent TDZ ReferenceErrors)

  // ==========================================
  // 1. SCROLL & MOUSE INTERACTIVE PARALLAX
  // ==========================================
  window.addEventListener("scroll", () => {
    const scrollVal = window.scrollY;
    
    // Scroll Parallax hero text (applied if mouse is not shifting the card)
    const title = document.getElementById("parallax-text-1");
    const sub = document.getElementById("parallax-text-2");
    
    // Only apply scroll parallax if screen width is large and scroll is active
    if (window.innerWidth > 768) {
      if (title) title.style.transform = `translate3d(0, ${scrollVal * 0.18}px, 0)`;
      if (sub) sub.style.transform = `translate3d(0, ${scrollVal * 0.08}px, 0)`;
    }
    
  });

  // Interactive mousemove parallax on the central hero card
  const heroBlock = document.querySelector(".hero-block");
  const heroCard = document.querySelector(".hero-central-card");
  const heroGear1 = document.getElementById("hero-gear-1");
  const heroGear2 = document.getElementById("hero-gear-2");

  if (heroBlock && heroCard && window.innerWidth > 768) {
    heroBlock.addEventListener("mousemove", (e) => {
      const rect = heroBlock.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      const tiltX = (y / (rect.height / 2)) * -12;
      const tiltY = (x / (rect.width / 2)) * 12;
      
      heroCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${x * 0.02}px, ${y * 0.02}px, 20px) scale(1.015)`;
      
      if (heroGear1) heroGear1.style.transform = `translate3d(${x * -0.01}px, ${y * -0.01}px, 0) rotate(${x * 0.04}deg)`;
      if (heroGear2) heroGear2.style.transform = `translate3d(${x * -0.005}px, ${y * -0.005}px, 0) rotate(${x * -0.02}deg)`;
    });

    heroBlock.addEventListener("mouseleave", () => {
      heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)";
      if (heroGear1) heroGear1.style.transform = "translate3d(0, 0, 0)";
      if (heroGear2) heroGear2.style.transform = "translate3d(0, 0, 0)";
    });
  }

  // ==========================================
  // 2. THEME CONTROLS (LIGHT/DARK)
  // ==========================================
  function initTheme() {
    const savedTheme = localStorage.getItem("career_guidance_theme") || "dark";
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === "light") {
      root.classList.remove("theme-dark");
      root.classList.add("theme-light");
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      if (themeSwitchSlider) themeSwitchSlider.innerText = "☀️";
    } else {
      root.classList.remove("theme-light");
      root.classList.add("theme-dark");
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      if (themeSwitchSlider) themeSwitchSlider.innerText = "🌙";
    }
    localStorage.setItem("career_guidance_theme", theme);
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // ==========================================
  // 3. STATE RESET & NAVIGATION (HOME RE-ACCESS)
  // ==========================================
  function resetToHome() {
    engine.reset();
    engine.clearLocalStorage();
    
    // Clear checklist indicators
    const keys = Object.keys(localStorage);
    keys.forEach(k => {
      if (k.startsWith("career_guidance_skill_")) localStorage.removeItem(k);
    });

    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.classList.remove("layout-expanded");

    landingView.classList.remove("hidden");
    onboardingView.classList.add("hidden");
    assessmentView.classList.add("hidden");
    reportView.classList.add("hidden");
  }

  if (logo) logo.addEventListener("click", resetToHome);
  if (navLinkHome) navLinkHome.addEventListener("click", resetToHome);

  if (navLinkReset) navLinkReset.addEventListener("click", () => {
    engine.reset();
    engine.clearLocalStorage();
    
    landingView.classList.add("hidden");
    onboardingView.classList.remove("hidden");
    assessmentView.classList.add("hidden");
    reportView.classList.add("hidden");
    
    studentNameInput.value = "";
    academicGradeSelect.value = "";
    clearSelectedStream();
    streamSelectionContainer.classList.add("hidden");
  });

  function triggerQuantumLoader(callback) {
    const overlay = document.getElementById("quantum-loader-overlay");
    const target = document.getElementById("loader-flyin-text");
    const fillIndicator = document.getElementById("loader-bar-fill-indicator");
    const statusText = document.getElementById("loader-status-text");
    const canvas = document.getElementById("loader-stars-canvas");
    
    if (!overlay || !target || !fillIndicator || !statusText || !canvas) {
      callback();
      return;
    }
    
    overlay.classList.remove("hidden");
    fillIndicator.style.width = "0%";
    statusText.innerText = "INITIALIZING ENGINE MATRICES...";
    
    const text = "MADE BY HARSHIT MISHRA";
    target.innerHTML = "";
    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      if (char === " ") {
        span.className = "fly-letter-space";
      } else {
        span.className = "fly-letter";
        span.innerText = char;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 400 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        span.style.setProperty("--tx", `${Math.round(tx)}px`);
        span.style.setProperty("--ty", `${Math.round(ty)}px`);
        span.style.setProperty("--delay", `${index * 0.045}s`);
      }
      target.appendChild(span);
    });
    
    const ctx = canvas.getContext("2d");
    let animationId;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    const stars = [];
    const numStars = 85;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        color: i % 2 === 0 ? "rgba(255, 223, 109, " + (0.35 + Math.random() * 0.6) + ")" : "rgba(235, 94, 40, " + (0.35 + Math.random() * 0.6) + ")"
      });
    }
    
    function drawStars() {
      ctx.fillStyle = "rgba(11, 14, 20, 0.28)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      stars.forEach(star => {
        star.z -= 6.5;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - cx;
          star.y = Math.random() * canvas.height - cy;
        }
        
        const k = 140 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;
        const size = (1 - star.z / canvas.width) * 3.5 + 0.5;
        
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        }
      });
      animationId = requestAnimationFrame(drawStars);
    }
    drawStars();
    
    let progress = 0;
    const intervalTime = 30;
    const totalDuration = 3000;
    const increment = (100 / (totalDuration / intervalTime));
    
    const progressTimer = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressTimer);
      }
      fillIndicator.style.width = `${progress}%`;
    }, intervalTime);
    
    setTimeout(() => { statusText.innerText = "CALIBRATING COGNITIVE VECTOR SPACE..."; }, 650);
    setTimeout(() => { statusText.innerText = "ALIGNING TRAIT NEURAL MESH..."; }, 1300);
    setTimeout(() => { statusText.innerText = "CALIBRATING RIASEC SYSTEM METRICS..."; }, 2000);
    setTimeout(() => { statusText.innerText = "TRAVERSAL SECURE. SYNCING INTAKE..."; }, 2700);
    
    setTimeout(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      overlay.classList.add("hidden");
      callback();
    }, 3200);
  }

  btnEnterPortal.addEventListener("click", () => {
    triggerQuantumLoader(() => {
      landingView.classList.add("hidden");
      onboardingView.classList.remove("hidden");
      onboardingView.classList.add("tab-slide-3d");
      setTimeout(() => {
        onboardingView.classList.remove("tab-slide-3d");
      }, 600);
    });
  });

  academicGradeSelect.addEventListener("change", () => {
    const gradeVal = parseInt(academicGradeSelect.value);
    if (gradeVal >= 11) {
      streamSelectionContainer.classList.remove("hidden");
    } else {
      streamSelectionContainer.classList.add("hidden");
      clearSelectedStream();
    }
  });

  streamCards.forEach(card => {
    card.addEventListener("click", () => {
      streamCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedStreamInput.value = card.getAttribute("data-stream");
    });
  });

  function clearSelectedStream() {
    streamCards.forEach(c => c.classList.remove("active"));
    selectedStreamInput.value = "";
  }

  // ==========================================
  // 4. INTAKE ROUTING
  // ==========================================
  onboardingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = studentNameInput.value.trim();
    const grade = academicGradeSelect.value;
    const stream = selectedStreamInput.value;
    
    if (parseInt(grade) >= 11 && !stream) {
      alert("Please select your academic stream concentration to customize the diagnostic questions.");
      return;
    }

    engine.setUserInfo({ name, grade, stream });
    startAssessment();
  });

  btnSimulateReport.addEventListener("click", () => {
    let name = studentNameInput.value.trim();
    let grade = academicGradeSelect.value;
    let stream = selectedStreamInput.value;
    
    if (!name) name = "Sarah Jenkins";
    if (!grade) grade = "12";
    if (parseInt(grade) >= 11 && !stream) stream = "pcm";

    engine.setUserInfo({ name, grade, stream });
    engine.generateMockAnswers();
    showFinalReport();
  });

  function startAssessment() {
    landingView.classList.add("hidden");
    onboardingView.classList.add("hidden");
    assessmentView.classList.remove("hidden");
    reportView.classList.add("hidden");
    
    assessmentView.classList.add("tab-slide-3d");
    setTimeout(() => {
      assessmentView.classList.remove("tab-slide-3d");
    }, 600);
    
    renderCurrentQuestion();
  }

  // ==========================================
  // 5. GAMIFIED TESTING LOOPS
  // ==========================================
  function renderCurrentQuestion() {
    const q = engine.getCurrentQuestion();
    if (!q) {
      showFinalReport();
      return;
    }

    const progress = engine.getSectionProgress();
    const percent = engine.getProgressPercent();
    
    // Set category label
    questionCategoryBadge.innerText = q.category;
    questionCategoryBadge.className = `category-pill ${q.category}`;
    sectionItemCounter.innerText = `Question ${progress.current + 1} of ${progress.total}`;
    progressPercentLabel.innerText = `Pacing: ${percent}%`;
    answeredQuestionsLabel.innerText = `${progress.answered} / ${progress.total} completed`;
    progressBarFill.style.width = `${percent}%`;

    // Map stages to bulbs: 0: personality, 1: ability, 2: interests, 3: learning, 4: skills
    const categoryIndex = { personality: 0, ability: 1, interests: 2, learning: 3, skills: 4 };
    const activeChapter = categoryIndex[q.category] !== undefined ? categoryIndex[q.category] : 0;
    
    updateChapterBulbs(activeChapter);

    questionBoxWrapper.classList.remove("question-transition-active");
    void questionBoxWrapper.offsetWidth; // trigger reflow
    questionBoxWrapper.classList.add("question-transition-active");

    // Initializing structure for typewriter reveal
    questionBoxWrapper.innerHTML = `
      <div class="question-text" id="typewriter-question-text"></div>
      <div class="answer-controls-area hidden" id="answer-controls-stage">
        ${renderAnswerControls(q)}
      </div>
    `;

    const textTarget = document.getElementById("typewriter-question-text");
    const controlsTarget = document.getElementById("answer-controls-stage");

    const textToPrint = activeLang === "hi" && q.textHi ? q.textHi : q.text;

    typePrintText(textToPrint, textTarget, () => {
      controlsTarget.classList.remove("hidden");
      bindAnswerEvents(q);
    });

    btnPrevQuestion.disabled = (engine.currentIndex === 0);
    const currentAns = engine.answers[q.id];
    btnNextQuestion.disabled = (currentAns === undefined);
  }

  function updateChapterBulbs(activeChapter) {
    const bulbs = document.querySelectorAll(".chapter-bulb");
    const categories = ["personality", "ability", "interests", "learning", "skills"];
    const chapterCompletion = [false, false, false, false, false];

    // Compute completion metrics
    for (let c = 0; c < 5; c++) {
      const cat = categories[c];
      const catQuestions = engine.activeQuestions.filter(q => q.category === cat);
      if (catQuestions.length === 0) {
        chapterCompletion[c] = true;
        continue;
      }
      const isCompleted = catQuestions.every(q => engine.answers[q.id] !== undefined);
      chapterCompletion[c] = isCompleted;
    }

    bulbs.forEach((bulb, idx) => {
      bulb.classList.remove("active", "completed");
      if (idx === activeChapter) {
        bulb.classList.add("active");
      }
      if (chapterCompletion[idx]) {
        bulb.classList.add("completed");
      }
    });
  }

  // Typewriter printed text loops
  function typePrintText(text, targetEl, onComplete) {
    targetEl.innerHTML = "";
    let charIndex = 0;
    
    if (window.typewriterTimer) clearInterval(window.typewriterTimer);
    
    window.typewriterTimer = setInterval(() => {
      if (charIndex < text.length) {
        targetEl.innerHTML = text.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
        charIndex++;
      } else {
        clearInterval(window.typewriterTimer);
        targetEl.innerHTML = text;
        if (onComplete) onComplete();
      }
    }, 18);
  }

  function renderAnswerControls(question) {
    const savedVal = engine.answers[question.id];
    
    if (question.type === "choice") {
      return `
        <div class="choice-options-grid">
          ${question.options.map((opt, idx) => {
            const isSelected = savedVal !== undefined && question.options[idx].score === savedVal;
            const displayChoiceText = activeLang === "hi" && opt.textHi ? opt.textHi : opt.text;
            return `
              <button type="button" class="choice-option-btn ${isSelected ? 'selected' : ''}" data-score="${opt.score}">
                ${displayChoiceText}
              </button>
            `;
          }).join("")}
        </div>
      `;
    } else if (question.type === "scale") {
      const scaleLabelsEn = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
      const scaleLabelsHi = ["दृढ़ता से असहमत", "असहमत", "तटस्थ", "सहमत", "दृढ़ता से सहमत"];
      const scaleLabels = activeLang === "hi" ? scaleLabelsHi : scaleLabelsEn;
      return `
        <div class="likert-scale-container">
          ${[1, 2, 3, 4, 5].map(val => {
            const isSelected = savedVal !== undefined && savedVal === val;
            return `
              <div class="likert-option ${isSelected ? 'selected' : ''}" data-value="${val}">
                <div class="likert-circle">${val}</div>
                <span class="likert-label">${scaleLabels[val - 1]}</span>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }
    return "";
  }

  function bindAnswerEvents(question) {
    if (question.type === "choice") {
      const buttons = questionBoxWrapper.querySelectorAll(".choice-option-btn");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          const score = parseInt(btn.getAttribute("data-score"));
          
          engine.answerQuestion(question.id, score);
          btnNextQuestion.disabled = false;
          
          setTimeout(() => {
            handleNextAction();
          }, 350);
        });
      });
    } else if (question.type === "scale") {
      const options = questionBoxWrapper.querySelectorAll(".likert-option");
      options.forEach(opt => {
        opt.addEventListener("click", () => {
          options.forEach(o => o.classList.remove("selected"));
          opt.classList.add("selected");
          const val = parseInt(opt.getAttribute("data-value"));
          
          engine.answerQuestion(question.id, val);
          btnNextQuestion.disabled = false;
          
          setTimeout(() => {
            handleNextAction();
          }, 350);
        });
      });
    }
  }

  btnPrevQuestion.addEventListener("click", () => {
    if (window.typewriterTimer) clearInterval(window.typewriterTimer);
    if (engine.prevSectionIndex()) {
      renderCurrentQuestion();
    }
  });

  btnNextQuestion.addEventListener("click", () => {
    handleNextAction();
  });

  function handleNextAction() {
    if (window.typewriterTimer) clearInterval(window.typewriterTimer);
    
    const currentQ = engine.getCurrentQuestion();
    const currentCategory = currentQ ? currentQ.category : "";

    const hasNext = engine.nextSectionIndex();
    if (hasNext) {
      const nextQ = engine.getCurrentQuestion();
      if (nextQ && nextQ.category !== currentCategory) {
        showCategoryCheckpoint(currentCategory, nextQ.category);
      } else {
        renderCurrentQuestion();
      }
    } else {
      showFinalReport();
    }
  }

  function showCategoryCheckpoint(oldCat, newCat) {
    btnPrevQuestion.disabled = true;
    btnNextQuestion.disabled = true;

    const categoryNamesEn = {
      personality: "Stage 1: Personality Diagnostics",
      ability: "Stage 2: Logical Aperture & Aptitude",
      interests: "Stage 3: Vocational Career Interests",
      learning: "Stage 4: Behavioral Learning Styles",
      skills: "Stage 5: Specialized Skills Grid"
    };

    const categoryNamesHi = {
      personality: "चरण 1: व्यक्तित्व निदान",
      ability: "चरण 2: तार्किक क्षमता और योग्यता",
      interests: "चरण 3: व्यावसायिक कैरियर रुचि",
      learning: "चरण 4: व्यवहार संबंधी सीखने की शैली",
      skills: "चरण 5: विशिष्ट कौशल ग्रिड"
    };

    const catNameOld = activeLang === "hi" ? categoryNamesHi[oldCat] : categoryNamesEn[oldCat];
    const catNameNew = activeLang === "hi" ? categoryNamesHi[newCat] : categoryNamesEn[newCat];

    const blockCompleteText = activeLang === "hi" ? "डायग्नोस्टिक ब्लॉक पूरा हुआ" : "DIAGNOSTIC BLOCK COMPLETE";
    const sealedText = activeLang === "hi" ? "सत्यापित और सुरक्षित" : "Sealed";
    const descText = activeLang === "hi" 
      ? "इस अनुभाग के लिए आपके उत्तरों को प्रमाणित कर दिया गया है और फ़ाइल अलमारी में लॉक कर दिया गया है। अगला अंशांकन खंड शुरू करने के लिए तैयार।" 
      : "Your responses for this section have been certified and locked into the dossier cabinet. Ready to initiate the next calibration segment.";
    const btnText = activeLang === "hi" ? `${catNameNew} खोलें &rarr;` : `Unlock ${catNameNew} &rarr;`;

    questionBoxWrapper.innerHTML = `
      <div class="vt-card checkpoint-card fade-in-section" style="padding: 2.5rem 1.5rem; border: 2.2px double var(--color-accent-rust); text-align: center; background: var(--color-bg-card); box-shadow: var(--shadow-flat); margin-top: 1.5rem;">
        <div style="font-family: 'Courier Prime', monospace; font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent-rust); margin-bottom: 0.8rem; font-weight: 700; letter-spacing: 2px;">
          ${blockCompleteText}
        </div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; margin-bottom: 1.2rem; color: var(--color-text-heading); line-height: 1.3;">
          ${catNameOld} ${sealedText}
        </h3>
        <p style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 2rem; max-width: 440px; margin-inline: auto; color: var(--color-text-body);">
          ${descText}
        </p>
        <button class="btn btn-primary" id="btn-checkpoint-proceed" style="font-size: 1rem; padding: 0.7rem 1.8rem; box-shadow: 4px 4px 0px var(--color-border-dark);">
          ${btnText}
        </button>
      </div>
    `;

    const proceedBtn = document.getElementById("btn-checkpoint-proceed");
    proceedBtn.addEventListener("click", () => {
      renderCurrentQuestion();
    });
  }

  // ==========================================
  // 6. SHOW COMPREHENSIVE REPORT
  // ==========================================
  function showFinalReport() {
    landingView.classList.add("hidden");
    onboardingView.classList.add("hidden");
    assessmentView.classList.add("hidden");
    reportView.classList.remove("hidden");
    
    reportView.classList.add("tab-slide-3d");
    setTimeout(() => {
      reportView.classList.remove("tab-slide-3d");
    }, 600);

    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.classList.add("layout-expanded");

    const finalScores = engine.calculateScores();
    finalScores.userName = engine.userInfo.name;
    finalScores.userGrade = engine.userInfo.grade;
    finalScores.userTrack = engine.userInfo.track;
    finalScores.userStream = engine.userInfo.stream ? getStreamFullName(engine.userInfo.stream) : "";

    // Mapped proxies to match vector signature inside archetypes.js
    const valuesProxy = {
      creative: finalScores.interests.artistic,
      autonomy: finalScores.interests.investigative,
      stability: finalScores.interests.conventional,
      financial: finalScores.interests.enterprising
    };

    const aptitudeProxy = {
      spatial: finalScores.ability.spatial,
      verbal: finalScores.ability.verbal,
      numerical: finalScores.ability.numerical,
      abstract: finalScores.ability.logical
    };

    const eqProxy = {
      stress: finalScores.skills.leadership,
      grit: Math.round(finalScores.skills.administrative * 0.7 + finalScores.ability.logical * 0.3),
      collaboration: finalScores.skills.social
    };

    const archetype = calculateArchetype(
      finalScores.interests,
      valuesProxy,
      aptitudeProxy,
      eqProxy
    );

    renderer.render(finalScores, archetype, reportView);
  }

  function getStreamFullName(stream) {
    const streams = {
      pcm: "Science (PCM)",
      pcb: "Science (PCB)",
      commerce: "Commerce & Finance",
      humanities: "Humanities & Arts"
    };
    return streams[stream.toLowerCase()] || stream;
  }

  // ==========================================
  // 7. STATE RESTORE RESUME
  // ==========================================
  function checkAndResumeState() {
    if (engine.loadFromLocalStorage()) {
      if (engine.isCompleted) {
        showFinalReport();
      } else if (Object.keys(engine.answers).length > 0) {
        const resume = confirm("An in-progress psychometric diagnostic session was found. Do you want to resume?");
        if (resume) {
          startAssessment();
        } else {
          engine.reset();
          engine.clearLocalStorage();
        }
      }
    }
  }

  // ==========================================
  // DISCLAIMER MODAL
  // ==========================================
  const disclaimerModal = document.getElementById("disclaimer-modal");
  const btnOpenDisclaimer = document.getElementById("btn-open-disclaimer-modal");
  const btnCloseDisclaimer = document.getElementById("btn-close-disclaimer-modal");
  const btnAgreeDisclaimer = document.getElementById("btn-agree-disclaimer");

  function initDisclaimerModal() {
    if (!btnOpenDisclaimer) return;
    
    btnOpenDisclaimer.addEventListener("click", () => {
      disclaimerModal.classList.remove("hidden");
    });
    
    btnCloseDisclaimer.addEventListener("click", () => {
      disclaimerModal.classList.add("hidden");
    });
    
    btnAgreeDisclaimer.addEventListener("click", () => {
      disclaimerModal.classList.add("hidden");
      localStorage.setItem("disclaimer_agreed", "true");
    });
    
    disclaimerModal.addEventListener("click", (e) => {
      if (e.target === disclaimerModal) {
        disclaimerModal.classList.add("hidden");
      }
    });
  }

  // ==========================================
  // APPARATUS SIMULATOR PANEL
  // ==========================================
  const simLogic = document.getElementById("sim-range-logic");
  const simArt = document.getElementById("sim-range-art");
  const simSocial = document.getElementById("sim-range-social");

  const simValLogic = document.getElementById("sim-val-logic");
  const simValArt = document.getElementById("sim-val-art");
  const simValSocial = document.getElementById("sim-val-social");

  const simSvgStage = document.getElementById("sim-svg-stage");
  const simMatchCareer = document.getElementById("sim-match-career");

  function initSimulator() {
    if (!simLogic) return;

    [simLogic, simArt, simSocial].forEach(el => {
      el.addEventListener("input", updateSimulator);
    });

    updateSimulator();
  }

  function updateSimulator() {
    const valLogic = parseInt(simLogic.value);
    const valArt = parseInt(simArt.value);
    const valSocial = parseInt(simSocial.value);

    simValLogic.innerText = valLogic;
    simValArt.innerText = valArt;
    simValSocial.innerText = valSocial;

    // Matching logic
    let career = "";
    let score = 0;

    if (valLogic >= valArt && valLogic >= valSocial) {
      career = "Machine Learning Engineer";
      score = Math.round(valLogic * 0.85 + valArt * 0.1 + valSocial * 0.05);
    } else if (valArt >= valLogic && valArt >= valSocial) {
      career = "UI/UX Product Designer";
      score = Math.round(valArt * 0.9 + valLogic * 0.08 + valSocial * 0.02);
    } else {
      career = "Clinical Trials Director";
      score = Math.round(valSocial * 0.8 + valLogic * 0.15 + valArt * 0.05);
    }

    simMatchCareer.innerText = `${career} (${score}% Match)`;

    // Draw triangle grid polygon
    const cx = 65;
    const cy = 65;
    const maxExt = 50;

    const logicExt = (valLogic / 100) * maxExt;
    const artExt = (valArt / 100) * maxExt;
    const socialExt = (valSocial / 100) * maxExt;

    const pLogic = { x: cx, y: cy - logicExt };
    const pArt = { x: cx + artExt * 0.866, y: cy + artExt * 0.5 };
    const pSocial = { x: cx - socialExt * 0.866, y: cy + socialExt * 0.5 };

    const polyStr = `${pLogic.x},${pLogic.y} ${pArt.x},${pArt.y} ${pSocial.x},${pSocial.y}`;

    simSvgStage.innerHTML = `
      <svg viewBox="0 0 130 130" style="width:100%; height:auto;">
        <polygon points="65,10 110,90 20,90" fill="none" stroke="var(--color-border)" stroke-dasharray="2 2" stroke-width="1" />
        <polygon points="65,25 94,80 36,80" fill="none" stroke="var(--color-border)" stroke-dasharray="2 2" stroke-width="1" />
        <polygon points="65,40 79,70 51,70" fill="none" stroke="var(--color-border)" stroke-dasharray="2 2" stroke-width="1" />
        
        <line x1="65" y1="65" x2="65" y2="10" stroke="var(--color-border-dark)" stroke-width="1.2" />
        <line x1="65" y1="65" x2="110" y2="90" stroke="var(--color-border-dark)" stroke-width="1.2" />
        <line x1="65" y1="65" x2="20" y2="90" stroke="var(--color-border-dark)" stroke-width="1.2" />

        <text x="65" y="8" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">LOGIC</text>
        <text x="115" y="94" text-anchor="end" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">ART</text>
        <text x="15" y="94" text-anchor="start" font-family="'Courier Prime', monospace" font-size="7" font-weight="700" fill="var(--color-text-heading)">SOCIAL</text>

        <polygon points="${polyStr}" fill="var(--color-accent-rust)" fill-opacity="0.25" stroke="var(--color-accent-rust)" stroke-width="2" />
        <circle cx="${pLogic.x}" cy="${pLogic.y}" r="2.5" fill="var(--color-accent-rust)" />
        <circle cx="${pArt.x}" cy="${pArt.y}" r="2.5" fill="var(--color-accent-rust)" />
        <circle cx="${pSocial.x}" cy="${pSocial.y}" r="2.5" fill="var(--color-accent-rust)" />
      </svg>
    `;
  }

  // Lightweight Floating Particles Script
  function initHeroParticles() {
    const container = document.getElementById("hero-particles-container");
    if (!container) return;

    const maxParticles = 12;
    const particles = [];
    let mouseX = null;
    let mouseY = null;

    // Track mouse position over the hero area
    const heroBlock = document.querySelector(".hero-block");
    if (heroBlock) {
      heroBlock.addEventListener("mousemove", (e) => {
        const rect = heroBlock.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = 100 - (((e.clientY - rect.top) / rect.height) * 100);
      });
      heroBlock.addEventListener("mouseleave", () => {
        mouseX = null;
        mouseY = null;
      });
    }

    function spawnParticle() {
      const p = document.createElement("div");
      p.className = "data-particle";
      
      const size = Math.random() * 3 + 1.8;
      const left = Math.random() * 100;
      const bottom = Math.random() * 25;
      const speed = Math.random() * 0.8 + 0.4;
      const wobbleSpeed = Math.random() * 0.015 + 0.008;
      const wobbleRange = Math.random() * 15 + 8;
      
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${left}%`;
      p.style.bottom = `${bottom}%`;
      
      container.appendChild(p);
      
      particles.push({
        element: p,
        x: left,
        y: bottom,
        speed: speed,
        wobbleSpeed: wobbleSpeed,
        wobbleRange: wobbleRange,
        wobbleOffset: Math.random() * 100,
        opacity: Math.random() * 0.45 + 0.35
      });
    }

    for (let i = 0; i < maxParticles; i++) {
      spawnParticle();
      particles[i].y = Math.random() * 100;
      particles[i].element.style.bottom = `${particles[i].y}%`;
    }

    function updateParticles() {
      particles.forEach((p) => {
        p.y += p.speed * 0.16;
        p.wobbleOffset += p.wobbleSpeed;
        
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          p.x += dx * 0.035;
          p.y += dy * 0.035;
        }

        const currentX = p.x + Math.sin(p.wobbleOffset) * (p.wobbleRange / 10);
        
        p.element.style.bottom = `${p.y}%`;
        p.element.style.left = `${currentX}%`;
        p.element.style.opacity = p.opacity * (1 - (p.y / 100));

        if (p.y >= 100 || p.y < 0 || p.x < 0 || p.x > 100) {
          p.y = 0;
          p.x = Math.random() * 100;
          p.speed = Math.random() * 0.8 + 0.4;
        }
      });
      requestAnimationFrame(updateParticles);
    }

    requestAnimationFrame(updateParticles);

    // Interactive Central Astrolabe Speed-up on CTA Hover + Magnet Title Parallax
    const centralAstrolabe = document.querySelector(".hero-compass-svg");
    const ctaBtn = document.getElementById("btn-enter-portal");
    if (ctaBtn && centralAstrolabe) {
      ctaBtn.addEventListener("mouseenter", () => {
        centralAstrolabe.style.animationDuration = "15s";
      });
      ctaBtn.addEventListener("mouseleave", () => {
        centralAstrolabe.style.animationDuration = "80s";
      });
    }

    const text1 = document.getElementById("parallax-text-1");
    const text2 = document.getElementById("parallax-text-2");
    if (heroBlock && text1 && text2) {
      heroBlock.addEventListener("mousemove", (e) => {
        const rect = heroBlock.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        text1.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px)`;
        text2.style.transform = `translate(${x * -0.02}px, ${y * -0.02}px)`;
      });
      heroBlock.addEventListener("mouseleave", () => {
        text1.style.transform = "translate(0, 0)";
        text2.style.transform = "translate(0, 0)";
        text1.style.transition = "transform 0.5s ease-out";
        text2.style.transition = "transform 0.5s ease-out";
      });
      heroBlock.addEventListener("mouseenter", () => {
        text1.style.transition = "none";
        text2.style.transition = "none";
      });
    }
  }

  // Scroll reveal intersection observer
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, { threshold: 0.05 });

    reveals.forEach(el => observer.observe(el));
  }

  let ecgExcitement = 0;
  let ecgPhase = 0;

  function triggerECGPulse() {
    ecgExcitement = 20;
    const statusText = document.getElementById("ecg-status-text");
    if (statusText) {
      statusText.innerText = "SYSTEM TELEMETRY: CALIBRATING RESPONSE SPECTRUM...";
      statusText.style.color = "var(--color-accent-rust)";
      setTimeout(() => {
        if (ecgExcitement < 5 && statusText) {
          statusText.innerText = "SYSTEM TELEMETRY: WAVE CALIBRATION IDLE";
          statusText.style.color = "var(--color-accent-gold)";
        }
      }, 1500);
    }
  }

  function initECGWave() {
    const canvas = document.getElementById("calibrator-ECG-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function draw() {
      const assessmentView = document.getElementById("assessment-view");
      if (assessmentView && !assessmentView.classList.contains("hidden")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "rgba(235, 94, 40, 0.55)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();

        const h = canvas.height;
        const w = canvas.width;
        const midY = h / 2;

        for (let x = 0; x < w; x++) {
          let wave = Math.sin(x * 0.025 + ecgPhase) * 2;
          
          if (ecgExcitement > 0) {
            const distanceToCenter = Math.abs(x - (w / 2));
            const envelope = Math.max(0, 1 - distanceToCenter / (w / 2.5));
            wave += Math.sin(x * 0.16 - ecgPhase * 2.2) * ecgExcitement * envelope * 1.6;
            wave += Math.cos(x * 0.32 + ecgPhase) * (ecgExcitement * 0.45) * envelope;
          }

          const y = midY + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();

        if (ecgExcitement > 0) {
          ecgExcitement -= 0.22;
          if (ecgExcitement < 0) ecgExcitement = 0;
        }

        ecgPhase += 0.045 + (ecgExcitement * 0.012);
      }
      requestAnimationFrame(draw);
    }
    
    const qBox = document.getElementById("question-box-wrapper");
    if (qBox) {
      qBox.addEventListener("click", (e) => {
        const btn = e.target.closest(".choice-option-btn");
        if (btn) {
          triggerECGPulse();
        }
      });
    }

    draw();
  }

  function initHero3DScene() {
    const container = document.getElementById("hero-3d-astrolabe-container");
    if (!container || typeof THREE === "undefined") return;

    // Use full billboard container client width/height
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear any duplicate canvas in hot reload/reinitialization
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Dynamic responsive resizing
    window.addEventListener("resize", () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Recalculate once layout resolves fully
    setTimeout(() => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }, 250);

    // --- Lighting System (Required for MeshStandardMaterial) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6070a0, 0.6);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // Dynamic mouse-tracking PointLights to create gorgeous specular glows
    const mouseLight1 = new THREE.PointLight(0x6070a0, 4.0, 15);
    scene.add(mouseLight1);

    // Muted Gold
    const mouseLight2 = new THREE.PointLight(0xc5a880, 3.0, 12);
    scene.add(mouseLight2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Sphere - Faceted Geodesic Ball (catches light at angles)
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Subtle outer glowing wireframe sphere around the core
    const wireCoreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const wireCoreMat = new THREE.MeshBasicMaterial({
      color: 0x6070a0,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const wireCore = new THREE.Mesh(wireCoreGeo, wireCoreMat);
    mainGroup.add(wireCore);

    // 2. Outer revolving orbit rings (3D Torus geometries catch lighting)
    const rings = [];
    const ringColors = [0x6070a0, 0xc5a880, 0x6070a0];
    const ringRadii = [2.4, 3.1, 3.7];
    const ringTubeWidths = [0.035, 0.025, 0.02];

    ringRadii.forEach((radius, i) => {
      // Use Torus instead of flat Ring so light wraps around the thickness
      const ringGeo = new THREE.TorusGeometry(radius, ringTubeWidths[i], 8, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[i],
        metalness: 0.92,
        roughness: 0.12,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      
      mainGroup.add(ring);
      rings.push({
        mesh: ring,
        speedX: (Math.random() - 0.5) * 0.005,
        speedY: (0.003 + Math.random() * 0.005)
      });
    });

    // 3. Ambient Starfield Particles
    const starGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const c1 = new THREE.Color(0xc5a880);
    const c2 = new THREE.Color(0x6070a0);

    for (let i = 0; i < starCount; i++) {
      const r = 4.0 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2.0 * Math.random() - 1.0);

      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = c1.clone().lerp(c2, Math.random());
      starColors[i * 3] = mixedColor.r;
      starColors[i * 3 + 1] = mixedColor.g;
      starColors[i * 3 + 2] = mixedColor.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starParticles = new THREE.Points(starGeo, starMat);
    mainGroup.add(starParticles);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Dynamically tracking lights and rotation
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      targetRotationY = mouseX * 0.4;
      targetRotationX = mouseY * 0.4;
    });

    function onResize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Try to dynamically load OrbitControls and a small GLTF model for a richer hero.
    // If loading fails, fall back to the procedural astrolabe above.
    (async () => {
      try {
        const [{ OrbitControls }, { GLTFLoader }] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js'),
          import('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js')
        ]);

        // Create controls attached to the camera and renderer element
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.07;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;

        // Load a small GLTF model (fallback to an online sample). Keep it lightweight.
        const loader = new GLTFLoader();
        const modelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf';

        loader.load(modelUrl, (gltf) => {
          try {
            // Remove heavy procedural pieces to replace with model
            mainGroup.clear();
          } catch (e) {
            // older three.js versions may not have Group.clear(); remove children manually
            while (mainGroup.children.length) mainGroup.remove(mainGroup.children[0]);
          }

          const model = gltf.scene || gltf.scenes[0];
          model.scale.setScalar(2.2);
          model.position.set(0, -0.6, 0);
          model.rotation.y = Math.PI * 0.12;
          mainGroup.add(model);

          // subtle point light for nicer shading
           const pLight = new THREE.PointLight(0xc5a880, 0.7, 12);
           pLight.position.set(2, 3, 6);
           scene.add(pLight);

          // keep controls updating
          (function updateControls() {
            controls.update();
            requestAnimationFrame(updateControls);
          })();
        }, undefined, (err) => {
          // model failed to load; keep procedural astrolabe
          console.warn('Hero GLTF failed to load, using procedural astrolabe', err);
        });
      } catch (err) {
        // dynamic import failed (CSP or network); ignore and continue
        console.warn('Optional hero controls/model not available', err);
      }
    })();

    function animate() {
      requestAnimationFrame(animate);

      core.rotation.y += 0.003;
      core.rotation.x += 0.0015;
      wireCore.rotation.y -= 0.001;

      rings.forEach(ringObj => {
        ringObj.mesh.rotation.x += ringObj.speedX;
        ringObj.mesh.rotation.y += ringObj.speedY;
      });

      starParticles.rotation.y -= 0.0004;

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Update Point Lights in 3D space to follow the cursor (adds interactive reflection highlights)
      mouseLight1.position.x = THREE.MathUtils.lerp(mouseLight1.position.x, mouseX * 6, 0.08);
      mouseLight1.position.y = THREE.MathUtils.lerp(mouseLight1.position.y, -mouseY * 6, 0.08);
      mouseLight1.position.z = 2.5;

      mouseLight2.position.x = THREE.MathUtils.lerp(mouseLight2.position.x, -mouseX * 4, 0.08);
      mouseLight2.position.y = THREE.MathUtils.lerp(mouseLight2.position.y, mouseY * 4, 0.08);
      mouseLight2.position.z = 1.8;

      const scrollY = window.scrollY;
      camera.position.z = 7.5 + (scrollY * 0.0025);

      renderer.render(scene, camera);
    }

    animate();
  }

  // Initialize at the end to prevent Temporal Dead Zone ReferenceErrors on const declarations
  initTheme();
  const savedLang = localStorage.getItem("career_guidance_lang") || "en";
  setLanguage(savedLang);
  checkAndResumeState();
  initDisclaimerModal();
  initSimulator();
  initHeroParticles();
  initScrollReveal();
  initECGWave();
  
  // Only initialize heavy 3D hero on sufficiently large viewports to save mobile CPU
  if (window.innerWidth >= 680) {
    initHero3DScene();
  }
  
  initGSAPMotionEngine();
  initScrollProgressBar();
  initMagneticButtons();
  initMouseTrail();
  initCounterAnimations();
  initRedesignFeatures();

  // Initialize feature MVPs (placeholders for full features)
  try { initGamification('#landing-view'); } catch (e) { console.warn(e); }
  try { initEncyclopedia('#report-output-stage'); } catch (e) { console.warn(e); }
  try { initEducationToolkit('#report-output-stage'); } catch (e) { console.warn(e); }
  try { initWhatIfSandbox('#report-output-stage'); } catch (e) { console.warn(e); }
  try { initExperientialBoard('#report-output-stage'); } catch (e) { console.warn(e); }
  // feedback widget
  try { import('./feedback.js').then(m => m.initFeedback()).catch(e => console.warn('Feedback widget failed to load', e)); } catch (e) { console.warn('Feedback widget failed to load', e); }

// ============================================================
//  GSAP MOTION ENGINE - Scroll-driven animations & micro-FX
// ============================================================
function initGSAPMotionEngine() {
  // --- Hero floating stat orbs entrance ---
  gsap.from('.hero-stat-float', {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.2,
    delay: 1.5
  });

  // --- Stagger all gsap-stagger-items (quadrant cards, timeline) via ScrollTrigger ---
  const staggerGroups = document.querySelectorAll('.quadrants-section, .timeline-section, .stats-strip');
  staggerGroups.forEach(group => {
    const items = group.querySelectorAll('.gsap-stagger-item');
    if (!items.length) return;

    gsap.fromTo(items,
      { opacity: 0, y: 45, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // --- gsap-fade-up generic scroll reveals ---
  gsap.utils.toArray('.gsap-fade-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // --- gsap-fade-left / right ---
  gsap.utils.toArray('.gsap-fade-left').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });
  gsap.utils.toArray('.gsap-fade-right').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // --- gsap-scale-in ---
  gsap.utils.toArray('.gsap-scale-in').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // --- Parallax depth on hero block ---
  const heroBlock = document.querySelector('.hero-block');
  if (heroBlock) {
    gsap.to('.orb-1', {
      y: -100,
      ease: 'none',
      scrollTrigger: { trigger: heroBlock, start: 'top top', end: 'bottom top', scrub: 1.5 }
    });
    gsap.to('.orb-2', {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: heroBlock, start: 'top top', end: 'bottom top', scrub: 2 }
    });
  }

  // --- Stat cards count-up on scroll ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    gsap.fromTo({ val: 0 },
      { val: target },
      {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + '+'; },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });

  // --- Hero title glow pulse ---
  const heroTitle = document.querySelector('.hero-title-new');
  if (heroTitle) {
    gsap.to(heroTitle, {
      filter: 'drop-shadow(0 0 20px rgba(235,94,40,0.35))',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// ============================================================
//  SCROLL PROGRESS BAR
// ============================================================
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ============================================================
//  MAGNETIC BUTTONS - subtle cursor attraction
// ============================================================
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-indicator-glow, .btn-primary');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============================================================
//  CURSOR TRAIL - neon particle trail following mouse
// ============================================================
function initMouseTrail() {
  const trailColors = ['rgba(235,94,40,0.65)', 'rgba(255,223,109,0.55)', 'rgba(235,94,40,0.35)'];
  let trailIndex = 0;
  let lastTime = 0;

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTime < 40) return; // throttle to ~25fps
    lastTime = now;

    const dot = document.createElement('div');
    const color = trailColors[trailIndex % trailColors.length];
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 5px; height: 5px;
      border-radius: 50%;
      background: ${color};
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: opacity 0.5s ease, transform 0.5s ease;
      box-shadow: 0 0 6px ${color};
    `;
    document.body.appendChild(dot);
    trailIndex++;
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      setTimeout(() => dot.remove(), 500);
    });
  }, { passive: true });
}

// ============================================================
//  COUNTER ANIMATIONS - animate stat numbers
// ============================================================
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const numMatch = text.match(/[\d]+/);
        if (!numMatch) return;
        const target = parseInt(numMatch[0], 10);
        let start = 0;
        const duration = 2000;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = current + (text.includes('+') ? '+' : (text.includes('%') ? '%' : ''));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ============================================================
//  REDESIGN FEATURES - CAROUSEL, CANVAS PREVIEWS & TIMELINE
// ============================================================
function initRedesignFeatures() {
  // --- Vertical scrolling 3D Carousel active card scaling ---
  const scrollContainer = document.getElementById("carousel-scroll-container");
  const wrapper = document.querySelector(".career-carousel-wrapper");
  if (scrollContainer && wrapper) {
    const cards = scrollContainer.querySelectorAll(".carousel-card");
    
    function updateActiveCard() {
      const wrapperRect = wrapper.getBoundingClientRect();
      const centerY = wrapperRect.top + wrapperRect.height / 2;
      
      let closestCard = null;
      let closestDist = Infinity;
      
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const dist = Math.abs(cardCenterY - centerY);
        
        if (dist < closestDist) {
          closestDist = dist;
          closestCard = card;
        }
      });
      
      cards.forEach(card => {
        if (card === closestCard) {
          card.classList.add("active-center");
        } else {
          card.classList.remove("active-center");
          card.classList.remove("expanded-card"); // collapse if scrolls away
        }
      });
    }
    
    scrollContainer.addEventListener("scroll", updateActiveCard, { passive: true });
    // Run initially
    setTimeout(updateActiveCard, 150);

    // Expand active card on click
    cards.forEach(card => {
      card.addEventListener("click", (e) => {
        if (card.classList.contains("active-center")) {
          // If already active, toggle expand/collapse
          card.classList.toggle("expanded-card");
        } else {
          // If not active, scroll internally to center without moving the viewport
          const containerTop = scrollContainer.getBoundingClientRect().top;
          const cardTop = card.getBoundingClientRect().top;
          const currentScroll = scrollContainer.scrollTop;
          const targetScroll = currentScroll + (cardTop - containerTop) - (scrollContainer.clientHeight / 2) + (card.clientHeight / 2);
          scrollContainer.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      });
    });
    
    // Bind click of "Calibrate Alignment" button to enter portal
    const shortcutBtns = scrollContainer.querySelectorAll(".start-portal-shortcut-btn");
    shortcutBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card toggling
        const portalBtn = document.getElementById("btn-enter-portal");
        if (portalBtn) {
          portalBtn.click();
        }
      });
    });

    // --- Dynamic interactive neural hologram canvas ---
    function initNeuralHologram() {
      const canvas = document.getElementById("neural-hologram-canvas");
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      let width = canvas.width = canvas.offsetWidth;
      let height = canvas.height = canvas.offsetHeight;

      const particles = [];
      const particleCount = 45;
      const maxDistance = 65;

      let mouseX = width / 2;
      let mouseY = height / 2;
      let isHovering = false;

      // Resize listener
      const resizeObserver = new ResizeObserver(() => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      });
      resizeObserver.observe(canvas);

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3
        });
      }

      // Mouse listeners
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isHovering = true;
      });

      canvas.addEventListener("mouseleave", () => {
        isHovering = false;
      });

      // Pulse factor
      let pulseAngle = 0;

      function animate() {
        ctx.clearRect(0, 0, width, height);

        pulseAngle += 0.02;
        const corePulse = Math.sin(pulseAngle) * 5 + 25;

        // Draw central glowing core
        const coreX = width / 2;
        const coreY = height / 2;
        const coreGrad = ctx.createRadialGradient(coreX, coreY, 2, coreX, coreY, corePulse);
        coreGrad.addColorStop(0, "rgba(129, 140, 248, 0.8)");
        coreGrad.addColorStop(0.3, "rgba(129, 140, 248, 0.2)");
        coreGrad.addColorStop(1, "rgba(129, 140, 248, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(coreX, coreY, corePulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw concentric orbit path lines
        ctx.strokeStyle = "rgba(226, 192, 141, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(coreX, coreY, 80, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(coreX, coreY, 130, 0, Math.PI * 2);
        ctx.stroke();

        // Update and draw particles
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          p.x = Math.max(0, Math.min(p.x, width));
          p.y = Math.max(0, Math.min(p.y, height));

          if (isHovering) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const force = (80 - dist) / 80;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const connAlpha = (1 - dist / maxDistance) * 0.15;
              ctx.strokeStyle = `rgba(129, 140, 248, ${connAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          const dxCore = p.x - coreX;
          const dyCore = p.y - coreY;
          const distCore = Math.sqrt(dxCore * dxCore + dyCore * dyCore);
          if (distCore < 120) {
            const coreConnAlpha = (1 - distCore / 120) * 0.08;
            ctx.strokeStyle = `rgba(226, 192, 141, ${coreConnAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(coreX, coreY);
            ctx.stroke();
          }
        });

        requestAnimationFrame(animate);
      }

      animate();

      const statusLabel = document.getElementById("hologram-status-label");
      if (statusLabel) {
        const statuses = [
          "COGNITIVE_SYNC",
          "MAPPING_APTITUDE",
          "VECTORS_ALIGNING",
          "CALIBRATING_FIT",
          "INTEGRITY_CHECK",
          "APPARATUS_ACTIVE"
        ];
        let statusIdx = 0;
        setInterval(() => {
          statusIdx = (statusIdx + 1) % statuses.length;
          statusLabel.innerText = statuses[statusIdx];
        }, 2500);
      }
    }

    initNeuralHologram();
  }

  // --- Horizontal Marquee pause on hover ---
  const marqueeTrack = document.querySelector(".marquee-content-track");
  if (marqueeTrack) {
    marqueeTrack.addEventListener("mouseenter", () => {
      marqueeTrack.style.animationPlayState = "paused";
    });
    marqueeTrack.addEventListener("mouseleave", () => {
      marqueeTrack.style.animationPlayState = "running";
    });
  }

  // --- Skills Radar Canvas Draw ---
  const radarCanvas = document.getElementById("dashboard-radar-canvas");
  if (radarCanvas) {
    const ctx = radarCanvas.getContext("2d");
    const w = radarCanvas.clientWidth || 160;
    const h = radarCanvas.clientHeight || 160;
    radarCanvas.width = w;
    radarCanvas.height = h;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    
    const axes = ["Logic", "Design", "Social", "Grit", "Adaptability"];
    const values = [0.9, 0.72, 0.65, 0.85, 0.78];
    const angleStep = (Math.PI * 2) / axes.length;
    
    let animPercent = 0;
    
    function drawRadar() {
      ctx.clearRect(0, 0, w, h);
      
      // Draw grid rings
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        ctx.beginPath();
        for (let i = 0; i < axes.length; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius * r;
          const y = cy + Math.sin(angle) * radius * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(255, 223, 109, 0.1)";
        ctx.stroke();
      }
      
      // Draw axis lines
      ctx.beginPath();
      for (let i = 0; i < axes.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      }
      ctx.strokeStyle = "rgba(255, 223, 109, 0.14)";
      ctx.stroke();
      
      // Draw data polygon
      ctx.beginPath();
      for (let i = 0; i < axes.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const val = values[i] * animPercent;
        const x = cx + Math.cos(angle) * radius * val;
        const y = cy + Math.sin(angle) * radius * val;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(235, 94, 40, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(235, 94, 40, 0.8)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      
      // Draw labels
      ctx.fillStyle = "rgba(186, 168, 148, 0.7)";
      ctx.font = "bold 8px Courier Prime, monospace";
      ctx.textAlign = "center";
      for (let i = 0; i < axes.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const labelX = cx + Math.cos(angle) * radius * 1.25;
        const labelY = cy + Math.sin(angle) * radius * 1.25 + 2;
        ctx.fillText(axes[i].toUpperCase(), labelX, labelY);
      }
      
      if (animPercent < 1) {
        animPercent += 0.02;
        requestAnimationFrame(drawRadar);
      }
    }
    
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animPercent = 0;
          drawRadar();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(radarCanvas);
  }

  // --- Curve Trend Plot Canvas ---
  const trendCanvas = document.getElementById("dashboard-trend-canvas");
  if (trendCanvas) {
    const ctx = trendCanvas.getContext("2d");
    const w = trendCanvas.clientWidth || 160;
    const h = trendCanvas.clientHeight || 100;
    trendCanvas.width = w;
    trendCanvas.height = h;
    
    let animPct = 0;
    
    function drawTrend() {
      ctx.clearRect(0, 0, w, h);
      
      // Grid lines
      ctx.strokeStyle = "rgba(186,168,148,0.05)";
      ctx.lineWidth = 1;
      for (let y = 15; y < h; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      
      // Draw bezier curve
      ctx.beginPath();
      ctx.moveTo(0, h - 8);
      
      const cp1x = w * 0.25;
      const cp1y = h - 8;
      const cp2x = w * 0.65;
      const cp2y = h * 0.45;
      const destx = w;
      const desty = h * 0.2;
      
      const currentDestY = h - 8 - (h - 8 - desty) * animPct;
      const currentCP2Y = h - 8 - (h - 8 - cp2y) * animPct;
      
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, currentCP2Y, destx, currentDestY);
      
      // Fill under curve
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(255, 223, 109, 0.15)");
      grad.addColorStop(1, "rgba(255, 223, 109, 0.0)");
      
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      
      // Curve stroke
      ctx.beginPath();
      ctx.moveTo(0, h - 8);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, currentCP2Y, destx, currentDestY);
      ctx.strokeStyle = "var(--color-accent-gold)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      
      if (animPct < 1) {
        animPct += 0.02;
        requestAnimationFrame(drawTrend);
      }
    }
    
    const trendObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animPct = 0;
          drawTrend();
          trendObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    trendObs.observe(trendCanvas);
  }

  // --- Success Prediction Circle Progress ---
  const successMeter = document.getElementById("dashboard-success-meter");
  if (successMeter) {
    const meterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Total circumference = 2 * Math.PI * 42 = 263.8
          // offset for 88% is 263.8 * (1 - 0.88) = 31.6
          successMeter.style.strokeDashoffset = "31.6";
          
          // Animate percent number
          const scorePercent = document.getElementById("success-score-percent");
          if (scorePercent) {
            let val = 0;
            const interval = setInterval(() => {
              val++;
              scorePercent.innerText = val;
              if (val >= 88) clearInterval(interval);
            }, 18);
          }
          meterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    meterObs.observe(successMeter);
  }

  // --- Horizontal stages timeline scroll lock (GSAP pinning) ---
  const stagesTrack = document.getElementById("stages-horizontal-scroll-track");
  const stagesWrapper = document.getElementById("stages-pin-wrapper");
  
  function initStagesPinner() {
    const slides = stagesTrack.querySelectorAll(".stage-slide-card");
    
    const getScrollDistance = () => {
      // scrollWidth of track minus the 100vw visible window area
      return stagesTrack.scrollWidth - window.innerWidth;
    };
    
    gsap.to(stagesTrack, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: stagesWrapper,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: { min: 0.15, max: 0.4 },
          delay: 0.08,
          ease: "power1.inOut"
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Update scrollbar progress bar width
          const scrollbarFill = document.getElementById("stages-scrollbar-fill-indicator");
          if (scrollbarFill) {
            scrollbarFill.style.width = (progress * 100) + "%";
          }
          
          // Calculate which slide card is active (nearest to viewport center)
          const activeIndex = Math.min(
            Math.round(progress * (slides.length - 1)),
            slides.length - 1
          );
          
          slides.forEach((slide, idx) => {
            if (idx === activeIndex) {
              if (!slide.classList.contains("active")) {
                slide.classList.add("active");
                playUIBlip(750, 0.05);
              }
              slide.classList.add("stage-completed");
            } else {
              slide.classList.remove("active");
              if (idx < activeIndex) {
                slide.classList.add("stage-completed");
              } else {
                slide.classList.remove("stage-completed");
              }
            }
          });
        }
      }
    });

    // Force recalculate offsets after initial layout resolves
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  if (stagesTrack && stagesWrapper) {
    initStagesPinner();
  }

  // Bind click sound indicators to all buttons and cards
  const clickAudioTargets = document.querySelectorAll(".btn, .carousel-card, .foundation-card, #btn-open-disclaimer-modal");
  clickAudioTargets.forEach(target => {
    target.addEventListener("click", () => {
      // Play a standard round UI tone
      playUIBlip(550, 0.08);
    });
    target.addEventListener("mouseenter", () => {
      // Play an extremely quiet high hover blip
      playUIBlip(920, 0.03);
    });
  });

  // Bind click of Hero Portal shortcut button
  const heroPortalBtn = document.querySelector(".btn-hero-portal-shortcut");
  if (heroPortalBtn) {
    heroPortalBtn.addEventListener("click", () => {
      const enterPortalBtn = document.getElementById("btn-enter-portal");
      if (enterPortalBtn) {
        enterPortalBtn.click();
      }
    });
  }

  // Start perspective tilt engine & text scramble
  init3DTiltCards();
  initTextScramble();
}

// ============================================================
//  TEXT SCRAMBLE EFFECT
// ============================================================
function initTextScramble() {
  const elements = document.querySelectorAll(".scramble-text");
  elements.forEach(el => {
    const finalVal = el.getAttribute("data-scramble") || el.innerText;
    let iteration = 0;
    const interval = setInterval(() => {
      el.innerText = finalVal.split("").map((char, index) => {
        if (index < iteration) {
          return finalVal[index];
        }
        return "01X_/*?"[Math.floor(Math.random() * 7)];
      }).join("");
      
      if (iteration >= finalVal.length) {
        clearInterval(interval);
      }
      iteration += 1/3;
    }, 30);
  });
}

// ============================================================
//  WEB AUDIO SYNTHESIZER
// ============================================================
let audioCtx = null;
function playUIBlip(freq = 600, duration = 0.08) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);
    
    // Kept extremely quiet to feel like a subtle premium feedback
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Audio Context blocked or not supported", e);
  }
}

// ============================================================
//  3D PERSPECTIVE CARD TILT
// ============================================================
function init3DTiltCards() {
  const tiltCards = document.querySelectorAll(".foundation-card, .marquee-card");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const angleX = -(y - yc) / 12;
      const angleY = (x - xc) / 12;
      
      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.boxShadow = "";
      card.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
    });
  });
}
});


