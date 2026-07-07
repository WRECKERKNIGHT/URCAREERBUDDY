// Production-Grade Assessment Engine with Multi-Weight Mapping & Euclidean Vector Matching
import { consistencyPairs } from './questions.js';

export class AssessmentEngine {
  constructor(questions) {
    this.questions = questions;
    this.reset();
  }

  reset() {
    this.answers = {};
    this.currentIndex = 0;
    this.userInfo = {
      name: "",
      grade: "", 
      track: "A",
      stream: ""
    };
    this.activeQuestions = [];
    this.isCompleted = false;
  }

  saveToLocalStorage() {
    const data = {
      answers: this.answers,
      currentIndex: this.currentIndex,
      userInfo: this.userInfo,
      isCompleted: this.isCompleted
    };
    localStorage.setItem("psychometric_career_platform_state_v2", JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const raw = localStorage.getItem("psychometric_career_platform_state_v2");
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      this.answers = data.answers || {};
      this.currentIndex = data.currentIndex || 0;
      this.userInfo = data.userInfo || this.userInfo;
      this.isCompleted = data.isCompleted || false;
      this.setupActiveQuestions();
      return true;
    } catch (e) {
      console.error("Error loading state", e);
      return false;
    }
  }

  clearLocalStorage() {
    localStorage.removeItem("psychometric_career_platform_state_v2");
  }

  setUserInfo(info) {
    this.userInfo = { ...this.userInfo, ...info };
    this.userInfo.track = (parseInt(this.userInfo.grade) <= 10) ? "A" : "B";
    this.setupActiveQuestions();
    this.saveToLocalStorage();
  }

  setupActiveQuestions() {
    if (this.userInfo.track === "B" && this.userInfo.stream) {
      const stream = this.userInfo.stream.toLowerCase();
      this.activeQuestions = this.questions.filter(q => {
        if (q.category === "ability") {
          if (stream === "pcm") return ["numerical", "logical"].includes(q.subCategory);
          if (stream === "pcb") return ["logical", "verbal"].includes(q.subCategory);
          if (stream === "commerce") return ["numerical", "verbal"].includes(q.subCategory);
          if (stream === "humanities") return ["verbal", "logical"].includes(q.subCategory);
        }
        return true; 
      });
    } else {
      this.activeQuestions = [...this.questions];
    }
  }

  answerQuestion(id, value) {
    this.answers[id] = Number(value);
    this.saveToLocalStorage();
  }

  getCurrentQuestion() {
    return this.activeQuestions[this.currentIndex];
  }

  nextSectionIndex() {
    if (this.currentIndex < this.activeQuestions.length - 1) {
      this.currentIndex++;
      this.saveToLocalStorage();
      return true;
    }
    this.isCompleted = true;
    this.saveToLocalStorage();
    return false;
  }

  prevSectionIndex() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  getProgressPercent() {
    if (this.activeQuestions.length === 0) return 0;
    return Math.round((Object.keys(this.answers).length / this.activeQuestions.length) * 100);
  }

  getSectionProgress() {
    const total = this.activeQuestions.length;
    const answered = Object.keys(this.answers).length;
    return { total, answered, current: this.currentIndex };
  }

  calculateScores() {
    // 1. Stage 1: Personality (MBTI)
    const pers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const persCounts = { EI: 0, SN: 0, TF: 0, JP: 0 };

    // 2. Stage 2: Ability (Cognitive)
    const abilRaw = { numerical: 0, verbal: 0, logical: 0 };
    const abilCounts = { numerical: 0, verbal: 0, logical: 0 };

    // 3. Stage 3: Holland Interests (RIASEC)
    const interestsRaw = { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 };
    const interestsCounts = { realistic: 0, investigative: 0, artistic: 0, social: 0, enterprising: 0, conventional: 0 };

    // 4. Stage 4: Learning Styles (VARK)
    const learningRaw = { visual: 0, auditory: 0, readwrite: 0, kinesthetic: 0 };
    const learningCounts = { visual: 0, auditory: 0, readwrite: 0, kinesthetic: 0 };

    // 5. Stage 5: Skills Matrix
    const skillsRaw = { administrative: 0, spatial: 0, leadership: 0, social: 0, mechanical: 0 };
    const skillsCounts = { administrative: 0, spatial: 0, leadership: 0, social: 0, mechanical: 0 };

    // Set default base counts for standard questions (each gets 5 base items, except skills which get 4)
    const riasecKeys = ["realistic", "investigative", "artistic", "social", "enterprising", "conventional"];
    riasecKeys.forEach(k => interestsCounts[k] = 5);
    
    const varkKeys = ["visual", "auditory", "readwrite", "kinesthetic"];
    varkKeys.forEach(k => learningCounts[k] = 5);
    
    const skillKeys = ["administrative", "spatial", "leadership", "social", "mechanical"];
    skillKeys.forEach(k => skillsCounts[k] = 4);

    // Loop through active answers
    this.activeQuestions.forEach(q => {
      const val = this.answers[q.id];
      if (val === undefined) return;

      // Handle Multi-Dimensional Scoring Weights (PRD Stage 1 Scoring weights)
      if (q.weights) {
        Object.keys(q.weights).forEach(k => {
          const w = q.weights[k];
          const weightedScore = val * w;

          // Personality
          if (["extravert", "introvert", "sensing", "intuitive", "thinking", "feeling", "judging", "perceiving"].includes(k)) {
            if (k === "extravert") { pers.E += weightedScore; pers.I += ((6 - val) * w); persCounts.EI += w; }
            else if (k === "introvert") { pers.I += weightedScore; pers.E += ((6 - val) * w); persCounts.EI += w; }
            else if (k === "sensing") { pers.S += weightedScore; pers.N += ((6 - val) * w); persCounts.SN += w; }
            else if (k === "intuitive") { pers.N += weightedScore; pers.S += ((6 - val) * w); persCounts.SN += w; }
            else if (k === "thinking") { pers.T += weightedScore; pers.F += ((6 - val) * w); persCounts.TF += w; }
            else if (k === "feeling") { pers.F += weightedScore; pers.T += ((6 - val) * w); persCounts.TF += w; }
            else if (k === "judging") { pers.J += weightedScore; pers.P += ((6 - val) * w); persCounts.JP += w; }
            else if (k === "perceiving") { pers.P += weightedScore; pers.J += ((6 - val) * w); persCounts.JP += w; }
          }
          // Ability
          else if (["numerical", "verbal", "logical"].includes(k)) {
            abilRaw[k] += weightedScore;
            abilCounts[k] += w;
          }
          // RIASEC
          else if (riasecKeys.includes(k)) {
            interestsRaw[k] += weightedScore;
            interestsCounts[k] += w;
          }
          // Skills
          else if (skillKeys.includes(k)) {
            skillsRaw[k] += weightedScore;
            skillsCounts[k] += w;
          }
        });
      } else {
        // Fallback default single category parsing
        if (q.stage === 1) {
          if (q.subCategory === "extravert") { pers.E += val; pers.I += (6 - val); persCounts.EI++; }
          else if (q.subCategory === "introvert") { pers.I += val; pers.E += (6 - val); persCounts.EI++; }
          else if (q.subCategory === "sensing") { pers.S += val; pers.N += (6 - val); persCounts.SN++; }
          else if (q.subCategory === "intuitive") { pers.N += val; pers.S += (6 - val); persCounts.SN++; }
          else if (q.subCategory === "thinking") { pers.T += val; pers.F += (6 - val); persCounts.TF++; }
          else if (q.subCategory === "feeling") { pers.F += val; pers.T += (6 - val); persCounts.TF++; }
          else if (q.subCategory === "judging") { pers.J += val; pers.P += (6 - val); persCounts.JP++; }
          else if (q.subCategory === "perceiving") { pers.P += val; pers.J += (6 - val); persCounts.JP++; }
        }
        else if (q.stage === 2) {
          abilRaw[q.subCategory] += val;
          abilCounts[q.subCategory]++;
        }
        else if (q.stage === 3) {
          interestsRaw[q.subCategory] += val;
        }
        else if (q.stage === 4) {
          learningRaw[q.subCategory] += val;
        }
        else if (q.stage === 5) {
          skillsRaw[q.subCategory] += val;
        }
      }
    });

    // Helper functions to normalize to 0-100%
    const normLikert = (val, count) => {
      if (count === 0) return 50;
      const maxPossible = count * 5;
      const minPossible = count * 1;
      return Math.round(((val - minPossible) / (maxPossible - minPossible)) * 100);
    };

    const normAbility = (val, count) => {
      if (count === 0) return 50;
      return Math.round((val / (count * 10)) * 100);
    };

    // Stage 1: Personality normalization
    const mbti = {
      extravert: persCounts.EI > 0 ? Math.round((pers.E / (persCounts.EI * 6)) * 100) : 50,
      introvert: 0,
      sensing: persCounts.SN > 0 ? Math.round((pers.S / (persCounts.SN * 6)) * 100) : 50,
      intuitive: 0,
      thinking: persCounts.TF > 0 ? Math.round((pers.T / (persCounts.TF * 6)) * 100) : 50,
      feeling: 0,
      judging: persCounts.JP > 0 ? Math.round((pers.J / (persCounts.JP * 6)) * 100) : 50,
      perceiving: 0
    };

    mbti.introvert = 100 - mbti.extravert;
    mbti.intuitive = 100 - mbti.sensing;
    mbti.feeling = 100 - mbti.thinking;
    mbti.perceiving = 100 - mbti.judging;

    const mbtiCode = 
      (mbti.extravert >= 50 ? "E" : "I") +
      (mbti.sensing >= 50 ? "S" : "N") +
      (mbti.thinking >= 50 ? "T" : "F") +
      (mbti.judging >= 50 ? "J" : "P");

    // Stage 2: Aptitude normalization
    const ability = {
      numerical: normAbility(abilRaw.numerical, abilCounts.numerical),
      verbal: normAbility(abilRaw.verbal, abilCounts.verbal),
      logical: normAbility(abilRaw.logical, abilCounts.logical),
      spatial: normLikert(skillsRaw.spatial, skillsCounts.spatial) // spatial aptitude mapped to Stage 5 skills spatial
    };

    // Stage 3: Holland normalization
    const interests = {
      realistic: normLikert(interestsRaw.realistic, interestsCounts.realistic),
      investigative: normLikert(interestsRaw.investigative, interestsCounts.investigative),
      artistic: normLikert(interestsRaw.artistic, interestsCounts.artistic),
      social: normLikert(interestsRaw.social, interestsCounts.social),
      enterprising: normLikert(interestsRaw.enterprising, interestsCounts.enterprising),
      conventional: normLikert(interestsRaw.conventional, interestsCounts.conventional)
    };

    // Holland RIASEC Code Isolation (PRD Stage 2)
    const sortedRIASEC = Object.keys(interests)
      .map(k => ({ key: k, val: interests[k] }))
      .sort((a,b)=>b.val - a.val);
      
    const riasecCode = sortedRIASEC.slice(0,3).map(item => item.key[0].toUpperCase()).join("");

    // Stage 4: Learning styles normalization
    const learning = {
      visual: normLikert(learningRaw.visual, learningCounts.visual),
      auditory: normLikert(learningRaw.auditory, learningCounts.auditory),
      readwrite: normLikert(learningRaw.readwrite, learningCounts.readwrite),
      kinesthetic: normLikert(learningRaw.kinesthetic, learningCounts.kinesthetic)
    };

    // Stage 5: Specialized Skills normalization
    const skills = {
      administrative: normLikert(skillsRaw.administrative, skillsCounts.administrative),
      spatial: normLikert(skillsRaw.spatial, skillsCounts.spatial),
      leadership: normLikert(skillsRaw.leadership, skillsCounts.leadership),
      social: normLikert(skillsRaw.social, skillsCounts.social),
      mechanical: normLikert(skillsRaw.mechanical, skillsCounts.mechanical)
    };

    const consistency = this.calculateConsistencyScore();
    const planningStage = this.calculatePlanningStage(interests, ability, consistency);

    return {
      mbti,
      mbtiCode,
      ability,
      interests,
      riasecCode,
      learning,
      skills,
      consistency,
      planningStage
    };
  }

  calculateConsistencyScore() {
    let deviationSum = 0;
    let validPairs = 0;

    consistencyPairs.forEach(pair => {
      const score1 = this.answers[pair.q1];
      const score2 = this.answers[pair.q2];

      if (score1 !== undefined && score2 !== undefined) {
        deviationSum += Math.abs(score1 - score2);
        validPairs++;
      }
    });

    if (validPairs === 0) return 100;
    const avgDeviation = deviationSum / validPairs;
    return Math.round((1 - (avgDeviation / 4)) * 100);
  }

  calculatePlanningStage(interests, ability, consistency) {
    if (consistency < 62) return "ignorant";
    
    const interestVals = Object.values(interests);
    const avgInterest = interestVals.reduce((a,b)=>a+b, 0) / interestVals.length;
    if (avgInterest < 28) return "ignorant";

    const highScoresCount = interestVals.filter(v => v >= 74).length;
    if (highScoresCount >= 3) return "confused"; 

    const maxInterest = Math.max(...interestVals);
    const minInterest = Math.min(...interestVals);
    if (maxInterest - minInterest < 22) return "diffused"; 

    const avgAbility = (ability.numerical + ability.verbal + ability.logical) / 3;
    if (maxInterest >= 72 && consistency >= 78 && avgAbility >= 65) return "optimized";

    return "methodical";
  }

  // Production-grade Euclidean Career distance matcher (PRD Stage 3 Cross-Referencing)
  calculateCareerSuitability(careerName, userScores) {
    const database = {
      "Machine Learning Engineer": {
        interests: { realistic: 60, investigative: 95, artistic: 40, social: 40, enterprising: 55, conventional: 80 },
        skills: { administrative: 70, spatial: 80, leadership: 60, social: 50, mechanical: 60 }
      },
      "Full-Stack Product Builder": {
        interests: { realistic: 80, investigative: 85, artistic: 60, social: 50, enterprising: 70, conventional: 70 },
        skills: { administrative: 80, spatial: 80, leadership: 70, social: 60, mechanical: 70 }
      },
      "UI/UX Product Designer": {
        interests: { realistic: 35, investigative: 70, artistic: 95, social: 65, enterprising: 75, conventional: 50 },
        skills: { administrative: 60, spatial: 95, leadership: 70, social: 80, mechanical: 35 }
      },
      "Technical Systems Animator": {
        interests: { realistic: 70, investigative: 50, artistic: 90, social: 40, enterprising: 60, conventional: 50 },
        skills: { administrative: 50, spatial: 90, leadership: 60, social: 50, mechanical: 80 }
      },
      "Cybersecurity Infrastructure lead": {
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
      "Robotics Sensor Fusion Developer": {
        interests: { realistic: 95, investigative: 90, artistic: 40, social: 40, enterprising: 60, conventional: 70 },
        skills: { administrative: 60, spatial: 85, leadership: 65, social: 50, mechanical: 95 }
      },
      "Industrial CAD Prototyper": {
        interests: { realistic: 90, investigative: 75, artistic: 70, social: 45, enterprising: 55, conventional: 80 },
        skills: { administrative: 75, spatial: 95, leadership: 60, social: 50, mechanical: 90 }
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

  generateMockAnswers() {
    const mockProfileType = Math.floor(Math.random() * 5); 
    
    this.activeQuestions.forEach(q => {
      if (q.stage === 1) {
        let baseVal = 3;
        if (mockProfileType === 0) { 
          if (["introvert", "intuitive", "thinking", "judging"].includes(q.subCategory)) baseVal = 5;
          else baseVal = 1;
        } else if (mockProfileType === 1) { 
          if (["extravert", "intuitive", "feeling", "perceiving"].includes(q.subCategory)) baseVal = 5;
          else baseVal = 2;
        } else if (mockProfileType === 2) { 
          if (["extravert", "sensing", "thinking", "judging"].includes(q.subCategory)) baseVal = 5;
          else baseVal = 2;
        } else if (mockProfileType === 3) { 
          if (["introvert", "intuitive", "feeling", "judging"].includes(q.subCategory)) baseVal = 4;
          else baseVal = 2;
        } else { 
          if (["introvert", "sensing", "thinking", "perceiving"].includes(q.subCategory)) baseVal = 5;
          else baseVal = 1;
        }
        const noise = Math.floor(Math.random() * 3) - 1;
        this.answers[q.id] = Math.max(1, Math.min(5, baseVal + noise));
      }
      else if (q.stage === 2) {
        const correctIndex = q.options.findIndex(opt => opt.score === 10);
        const rand = Math.random();
        let solved = rand < 0.80; 
        this.answers[q.id] = solved ? q.options[correctIndex].score : q.options[Math.floor(Math.random() * q.options.length)].score;
      }
      else {
        let baseVal = 3;
        if (mockProfileType === 0) { 
          if (["investigative", "realistic", "visual", "readwrite", "spatial", "mechanical"].includes(q.subCategory)) baseVal = 5;
        } else if (mockProfileType === 1) { 
          if (["artistic", "social", "visual", "auditory", "spatial", "leadership"].includes(q.subCategory)) baseVal = 5;
        } else if (mockProfileType === 2) { 
          if (["conventional", "enterprising", "readwrite", "administrative", "leadership"].includes(q.subCategory)) baseVal = 5;
        } else if (mockProfileType === 3) { 
          if (["social", "investigative", "auditory", "social", "administrative"].includes(q.subCategory)) baseVal = 5;
        } else { 
          if (["realistic", "investigative", "kinesthetic", "mechanical", "spatial"].includes(q.subCategory)) baseVal = 5;
        }
        const noise = Math.floor(Math.random() * 3) - 1;
        this.answers[q.id] = Math.max(1, Math.min(5, baseVal + noise));
      }
    });

    this.isCompleted = true;
    this.saveToLocalStorage();
  }
}
