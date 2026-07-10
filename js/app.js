// Main Application Coordinator (Upgraded with 5-Stage Testing and Parallax bindings)
import { questions } from './questions.js';
import { AssessmentEngine } from './engine.js';
import { calculateArchetype } from './archetypes.js';
import { ReportRenderer } from './report.js';

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
    
    // Spinning background canvas gears
    const gear1 = document.getElementById("parallax-gear-1");
    const gear2 = document.getElementById("parallax-gear-2");
    if (gear1) gear1.style.transform = `rotate(${scrollVal * 0.08}deg)`;
    if (gear2) gear2.style.transform = `rotate(${-scrollVal * 0.05}deg)`;
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
      
      // Shift card slightly
      heroCard.style.transform = `translate3d(${x * 0.015}px, ${y * 0.015}px, 0) scale(1.005)`;
      
      // Shift background gears
      if (heroGear1) heroGear1.style.transform = `translate3d(${x * -0.01}px, ${y * -0.01}px, 0) rotate(${x * 0.04}deg)`;
      if (heroGear2) heroGear2.style.transform = `translate3d(${x * -0.005}px, ${y * -0.005}px, 0) rotate(${x * -0.02}deg)`;
    });

    heroBlock.addEventListener("mouseleave", () => {
      heroCard.style.transform = "translate3d(0, 0, 0) scale(1)";
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
      themeSwitchSlider.innerText = "☀️";
    } else {
      root.classList.remove("theme-light");
      root.classList.add("theme-dark");
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      themeSwitchSlider.innerText = "🌙";
    }
    localStorage.setItem("career_guidance_theme", theme);
  }

  btnThemeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    applyTheme(isDark ? "light" : "dark");
  });

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

  logo.addEventListener("click", resetToHome);
  navLinkHome.addEventListener("click", resetToHome);
  
  navLinkReset.addEventListener("click", () => {
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

  btnEnterPortal.addEventListener("click", () => {
    landingView.classList.add("hidden");
    onboardingView.classList.remove("hidden");
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

    const maxParticles = 24;
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

    // Interactive Central Astrolabe Speed-up on CTA Hover
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

  // Initialize at the end to prevent Temporal Dead Zone ReferenceErrors on const declarations
  initTheme();
  const savedLang = localStorage.getItem("career_guidance_lang") || "en";
  setLanguage(savedLang);
  checkAndResumeState();
  initDisclaimerModal();
  initSimulator();
  initHeroParticles();
  initScrollReveal();
});
