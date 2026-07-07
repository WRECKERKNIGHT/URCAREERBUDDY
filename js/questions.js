// Production Question Bank with Multi-Dimensional Weights (Exactly 130 Items)
// Weights map response to multiple buckets (E/I, RIASEC, Skills, Abilities)

export const questions = [
  // ==========================================
  // STAGE 1: PERSONALITY (30 Items - MBTI Axes)
  // ==========================================
  // Extraversion (E) vs Introversion (I) - 8 Items
  { 
    id: "p_ei_1", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I feel energized and inspired after spending time interacting with a large group of people.", 
    type: "scale",
    weights: { extravert: 1.0, enterprising: 0.3, social: 0.2 } 
  },
  { 
    id: "p_ei_2", stage: 1, category: "personality", subCategory: "introvert", 
    text: "I prefer to spend my weekends in quiet, solitary reflection rather than attending social gatherings.", 
    type: "scale",
    weights: { introvert: 1.0, investigative: 0.2 } 
  },
  { 
    id: "p_ei_3", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I easily initiate conversations with unfamiliar individuals in public or professional settings.", 
    type: "scale",
    weights: { extravert: 1.0, social: 0.3 }
  },
  { id: "p_ei_4", stage: 1, category: "personality", subCategory: "introvert", text: "I require solitary downtime to recharge my energy levels after long group meetings.", type: "scale" },
  { 
    id: "p_ei_5", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I enjoy being the center of attention and presenting pitches to active audiences.", 
    type: "scale",
    weights: { extravert: 1.0, enterprising: 0.4, leadership: 0.3 }
  },
  { id: "p_ei_6", stage: 1, category: "personality", subCategory: "introvert", text: "I prefer expressively discussing concepts in one-on-one sessions rather than in large group panels.", type: "scale" },
  { id: "p_ei_7", stage: 1, category: "personality", subCategory: "extravert", text: "I feel restless when isolated from team interfaces for multiple consecutive days.", type: "scale" },
  { id: "p_ei_8", stage: 1, category: "personality", subCategory: "introvert", text: "I find that deep, internal analytical thoughts come most easily when I work alone.", type: "scale" },

  // Sensing (S) vs Intuition (N) - 8 Items
  { id: "p_sn_1", stage: 1, category: "personality", subCategory: "sensing", text: "I focus heavily on concrete facts and immediate real-world experiences rather than speculative theories.", type: "scale" },
  { 
    id: "p_sn_2", stage: 1, category: "personality", subCategory: "intuitive", 
    text: "I frequently think about future possibilities, symbolic meanings, and conceptual structures.", 
    type: "scale",
    weights: { intuitive: 1.0, artistic: 0.3 }
  },
  { id: "p_sn_3", stage: 1, category: "personality", subCategory: "sensing", text: "I prefer standard, proven methodologies over experimenting with radical, unverified systems.", type: "scale" },
  { id: "p_sn_4", stage: 1, category: "personality", subCategory: "intuitive", text: "I enjoy reading sci-fi speculations, future roadmaps, and abstract metaphors.", type: "scale" },
  { 
    id: "p_sn_5", stage: 1, category: "personality", subCategory: "sensing", 
    text: "I notice minor operational errors and physical design details that others tend to overlook.", 
    type: "scale",
    weights: { sensing: 1.0, conventional: 0.3, administrative: 0.2 }
  },
  { id: "p_sn_6", stage: 1, category: "personality", subCategory: "intuitive", text: "I value strategic innovation and vision more than daily maintenance routines.", type: "scale" },
  { id: "p_sn_7", stage: 1, category: "personality", subCategory: "sensing", text: "I describe situations using literal details and concrete historical examples rather than analogies.", type: "scale" },
  { id: "p_sn_8", stage: 1, category: "personality", subCategory: "intuitive", text: "I love connecting dots between seemingly unrelated concepts or multi-disciplinary fields.", type: "scale" },

  // Thinking (T) vs Feeling (F) - 7 Items
  { id: "p_tf_1", stage: 1, category: "personality", subCategory: "thinking", text: "When making decisions, I rely strictly on objective data and logical outcomes rather than feelings.", type: "scale" },
  { id: "p_tf_2", stage: 1, category: "personality", subCategory: "feeling", text: "I prioritize interpersonal harmony and team alignment when resolving disputes, even if strict rules are bent.", type: "scale" },
  { id: "p_tf_3", stage: 1, category: "personality", subCategory: "thinking", text: "I value constructive truth and objective criticism more than protecting the immediate feelings of peers.", type: "scale" },
  { 
    id: "p_tf_4", stage: 1, category: "personality", subCategory: "feeling", 
    text: "I easily empathize with the emotional distress of team members during high-pressure milestones.", 
    type: "scale",
    weights: { feeling: 1.0, social: 0.3 }
  },
  { id: "p_tf_5", stage: 1, category: "personality", subCategory: "thinking", text: "I analyze problems using cause-and-effect algorithms rather than analyzing personal value alignments.", type: "scale" },
  { id: "p_tf_6", stage: 1, category: "personality", subCategory: "feeling", text: "I value collaborative consensus and group unity above proving my personal technical point.", type: "scale" },
  { id: "p_tf_7", stage: 1, category: "personality", subCategory: "thinking", text: "I evaluate work deliverables based on strict quantitative benchmarks rather than the effort invested.", type: "scale" },

  // Judging (J) vs Perceiving (P) - 7 Items
  { id: "p_jp_1", stage: 1, category: "personality", subCategory: "judging", text: "I feel most comfortable when my schedule is planned out and tasks are finished before deadlines.", type: "scale" },
  { id: "p_jp_2", stage: 1, category: "personality", subCategory: "perceiving", text: "I prefer keeping my plans flexible, allowing myself to adapt spontaneously to changes.", type: "scale" },
  { id: "p_jp_3", stage: 1, category: "personality", subCategory: "judging", text: "I dislike ambiguous project guidelines and prefer clear operational templates.", type: "scale" },
  { id: "p_jp_4", stage: 1, category: "personality", subCategory: "perceiving", text: "I feel inspired by sudden, last-minute pressure and perform well under tight timelines.", type: "scale" },
  { 
    id: "p_jp_5", stage: 1, category: "personality", subCategory: "judging", 
    text: "I keep my files, directories, and schedules neatly categorized and sorted.", 
    type: "scale",
    weights: { judging: 1.0, conventional: 0.3, administrative: 0.3 }
  },
  { id: "p_jp_6", stage: 1, category: "personality", subCategory: "perceiving", text: "I prefer to explore multiple implementation options before committing to a final path.", type: "scale" },
  { id: "p_jp_7", stage: 1, category: "personality", subCategory: "judging", text: "I feel satisfied when I check items off my task list and achieve clean closure.", type: "scale" },

  // ==========================================
  // STAGE 2: APTITUDE & COGNITIVE (30 Items)
  // ==========================================
  // Numerical Fluidity - 10 Items
  {
    id: "a_num_1", stage: 2, category: "ability", subCategory: "numerical",
    text: "Calculate: 15% of 240.",
    type: "choice", options: [{ text: "36", score: 10 }, { text: "32", score: 0 }, { text: "40", score: 0 }, { text: "38", score: 0 }]
  },
  {
    id: "a_num_2", stage: 2, category: "ability", subCategory: "numerical",
    text: "Identify the missing value: 2, 6, 12, 20, 30, ...",
    type: "choice", options: [{ text: "42", score: 10 }, { text: "40", score: 0 }, { text: "36", score: 0 }, { text: "48", score: 0 }]
  },
  {
    id: "a_num_3", stage: 2, category: "ability", subCategory: "numerical",
    text: "Solve for X: 3X + 7 = 34.",
    type: "choice", options: [{ text: "9", score: 10 }, { text: "8", score: 0 }, { text: "10", score: 0 }, { text: "7", score: 0 }]
  },
  {
    id: "a_num_4", stage: 2, category: "ability", subCategory: "numerical",
    text: "A project budget of $4,000 increases by 5% and then decreases by 5%. What is the final budget?",
    type: "choice", options: [{ text: "$3,990", score: 10 }, { text: "$4,000", score: 0 }, { text: "$4,100", score: 0 }, { text: "$3,950", score: 0 }]
  },
  {
    id: "a_num_5", stage: 2, category: "ability", subCategory: "numerical",
    text: "If 4 builders construct a wall in 6 hours, how many builders are needed to build it in 3 hours?",
    type: "choice", options: [{ text: "8", score: 10 }, { text: "6", score: 0 }, { text: "12", score: 0 }, { text: "10", score: 0 }]
  },
  {
    id: "a_num_6", stage: 2, category: "ability", subCategory: "numerical",
    text: "Calculate the average of: 14, 18, 22, 26.",
    type: "choice", options: [{ text: "20", score: 10 }, { text: "18", score: 0 }, { text: "22", score: 0 }, { text: "21", score: 0 }]
  },
  {
    id: "a_num_7", stage: 2, category: "ability", subCategory: "numerical",
    text: "Convert 5/8 to a decimal format.",
    type: "choice", options: [{ text: "0.625", score: 10 }, { text: "0.585", score: 0 }, { text: "0.675", score: 0 }, { text: "0.725", score: 0 }]
  },
  {
    id: "a_num_8", stage: 2, category: "ability", subCategory: "numerical",
    text: "Solve: (7 * 8) - (36 / 6).",
    type: "choice", options: [{ text: "50", score: 10 }, { text: "48", score: 0 }, { text: "52", score: 0 }, { text: "46", score: 0 }]
  },
  {
    id: "a_num_9", stage: 2, category: "ability", subCategory: "numerical",
    text: "If X + Y = 12 and X - Y = 4, what is the value of X?",
    type: "choice", options: [{ text: "8", score: 10 }, { text: "6", score: 0 }, { text: "10", score: 0 }, { text: "7", score: 0 }]
  },
  {
    id: "a_num_10", stage: 2, category: "ability", subCategory: "numerical",
    text: "A store offers a 20% discount on a $120 jacket. What is the sales price?",
    type: "choice", options: [{ text: "$96", score: 10 }, { text: "$100", score: 0 }, { text: "$84", score: 0 }, { text: "$90", score: 0 }]
  },

  // Verbal Logic & Comprehension - 10 Items
  {
    id: "a_ver_1", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'ACUMEN':",
    type: "choice", options: [{ text: "Shrewdness", score: 10 }, { text: "Hesitation", score: 0 }, { text: "Apathy", score: 0 }, { text: "Dislike", score: 0 }]
  },
  {
    id: "a_ver_2", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the word opposite in meaning to 'EPHEMERAL':",
    type: "choice", options: [{ text: "Permanent", score: 10 }, { text: "Transient", score: 0 }, { text: "Frail", score: 0 }, { text: "Vague", score: 0 }]
  },
  {
    id: "a_ver_3", stage: 2, category: "ability", subCategory: "verbal",
    text: "Complete the analogy: 'Lighthouse' is to 'Ship' as 'Siren' is to:",
    type: "choice", options: [{ text: "Ambulance", score: 10 }, { text: "Sound", score: 0 }, { text: "Water", score: 0 }, { text: "Driver", score: 0 }]
  },
  {
    id: "a_ver_4", stage: 2, category: "ability", subCategory: "verbal",
    text: "Which word is spelled correctly?",
    type: "choice", options: [{ text: "Conscientious", score: 10 }, { text: "Consciencious", score: 0 }, { text: "Consientious", score: 0 }, { text: "Conscenteous", score: 0 }]
  },
  {
    id: "a_ver_5", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'METICULOUS':",
    type: "choice", options: [{ text: "Detailed", score: 10 }, { text: "Careless", score: 0 }, { text: "Rapid", score: 0 }, { text: "Vague", score: 0 }]
  },
  {
    id: "a_ver_6", stage: 2, category: "ability", subCategory: "verbal",
    text: "Complete the analogy: 'Sublime' is to 'Awe' as 'Trivial' is to:",
    type: "choice", options: [{ text: "Indifference", score: 10 }, { text: "Fear", score: 0 }, { text: "Anger", score: 0 }, { text: "Surprise", score: 0 }]
  },
  {
    id: "a_ver_7", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the word opposite in meaning to 'VERBOSE':",
    type: "choice", options: [{ text: "Succinct", score: 10 }, { text: "Wordy", score: 0 }, { text: "Silent", score: 0 }, { text: "Complex", score: 0 }]
  },
  {
    id: "a_ver_8", stage: 2, category: "ability", subCategory: "verbal",
    text: "Which word represents 'a state of balance or equilibrium'?",
    type: "choice", options: [{ text: "Stasis", score: 10 }, { text: "Flux", score: 0 }, { text: "Tension", score: 0 }, { text: "Gravity", score: 0 }]
  },
  {
    id: "a_ver_9", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'PRAGMATIC':",
    type: "choice", options: [{ text: "Practical", score: 10 }, { text: "Idealistic", score: 0 }, { text: "Scientific", score: 0 }, { text: "Doubtful", score: 0 }]
  },
  {
    id: "a_ver_10", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the spelling that is correct:",
    type: "choice", options: [{ text: "Liaison", score: 10 }, { text: "Liason", score: 0 }, { text: "Liasion", score: 0 }, { text: "Liaizon", score: 0 }]
  },

  // Abstract/Logical Processing Speed - 10 Items
  {
    id: "a_log_1", stage: 2, category: "ability", subCategory: "logical",
    text: "If all books are files, and all files are databases. Are all books databases?",
    type: "choice", options: [{ text: "Yes, definitely", score: 10 }, { text: "No, never", score: 0 }, { text: "Only sometimes", score: 0 }, { text: "Cannot be determined", score: 0 }]
  },
  {
    id: "a_log_2", stage: 2, category: "ability", subCategory: "logical",
    text: "Identify the pattern: A1, C3, E5, G7, ...",
    type: "choice", options: [{ text: "I9", score: 10 }, { text: "H8", score: 0 }, { text: "I10", score: 0 }, { text: "J10", score: 0 }]
  },
  {
    id: "a_log_3", stage: 2, category: "ability", subCategory: "logical",
    text: "If a card deck contains only spades and hearts, and we draw a red card. What suit is it?",
    type: "choice", options: [{ text: "Hearts", score: 10 }, { text: "Spades", score: 0 }, { text: "Diamonds", score: 0 }, { text: "Clubs", score: 0 }]
  },
  {
    id: "a_log_4", stage: 2, category: "ability", subCategory: "logical",
    text: "Look at the premise: If it rains, the grass gets wet. The grass is wet. Did it definitely rain?",
    type: "choice", options: [{ text: "No, not necessarily", score: 10 }, { text: "Yes, definitely", score: 0 }, { text: "Only in winter", score: 0 }, { text: "It cannot be determined", score: 0 }]
  },
  {
    id: "a_log_5", stage: 2, category: "ability", subCategory: "logical",
    text: "Complete the logical series: Z, Y, X, W, V, ...",
    type: "choice", options: [{ text: "U", score: 10 }, { text: "T", score: 0 }, { text: "S", score: 0 }, { text: "R", score: 0 }]
  },
  {
    id: "a_log_6", stage: 2, category: "ability", subCategory: "logical",
    text: "If John is taller than Mark, and Mark is taller than Dave. Who is the shortest?",
    type: "choice", options: [{ text: "Dave", score: 10 }, { text: "Mark", score: 0 }, { text: "John", score: 0 }, { text: "Dave and Mark", score: 0 }]
  },
  {
    id: "a_log_7", stage: 2, category: "ability", subCategory: "logical",
    text: "If all programmers are developers, and no developers are designers. Are programmers designers?",
    type: "choice", options: [{ text: "No, never", score: 10 }, { text: "Yes, always", score: 0 }, { text: "Only some", score: 0 }, { text: "Undetermined", score: 0 }]
  },
  {
    id: "a_log_8", stage: 2, category: "ability", subCategory: "logical",
    text: "Identify the next number: 1, 2, 4, 8, 16, ...",
    type: "choice", options: [{ text: "32", score: 10 }, { text: "24", score: 0 }, { text: "30", score: 0 }, { text: "40", score: 0 }]
  },
  {
    id: "a_log_9", stage: 2, category: "ability", subCategory: "logical",
    text: "If X is north of Y, and Y is north of Z. In what direction is Z relative to X?",
    type: "choice", options: [{ text: "South", score: 10 }, { text: "North", score: 0 }, { text: "East", score: 0 }, { text: "West", score: 0 }]
  },
  {
    id: "a_log_10", stage: 2, category: "ability", subCategory: "logical",
    text: "Complete the logical analogy: 'Hand' is to 'Glove' as 'Foot' is to:",
    type: "choice", options: [{ text: "Sock", score: 10 }, { text: "Shoelace", score: 0 }, { text: "Toe", score: 0 }, { text: "Leg", score: 0 }]
  },

  // ==========================================
  // STAGE 3: RIASEC CAREER INTERESTS (30 Items)
  // ==========================================
  // Realistic - 5 Items
  { id: "i_ria_r1", stage: 3, category: "interests", subCategory: "realistic", text: "I enjoy building physical items, repair operations, or mechanics.", type: "scale" },
  { id: "i_ria_r2", stage: 3, category: "interests", subCategory: "realistic", text: "I prefer working outdoors, doing practical fieldwork rather than desk tasks.", type: "scale" },
  { id: "i_ria_r3", stage: 3, category: "interests", subCategory: "realistic", text: "I like troubleshooting electronic circuits, wiring, or physical hardware.", type: "scale" },
  { id: "i_ria_r4", stage: 3, category: "interests", subCategory: "realistic", text: "I am interested in operating heavy equipment, power tools, or assembly devices.", type: "scale" },
  { id: "i_ria_r5", stage: 3, category: "interests", subCategory: "realistic", text: "I prefer practical, concrete assignments over speculative brainstorming.", type: "scale" },

  // Investigative - 5 Items
  { id: "i_ria_i1", stage: 3, category: "interests", subCategory: "investigative", text: "I love exploring scientific theories, running simulations, or compiling data charts.", type: "scale" },
  { id: "i_ria_i2", stage: 3, category: "interests", subCategory: "investigative", text: "I find writing software code, troubleshooting program bugs, or researching formulas satisfying.", type: "scale" },
  { id: "i_ria_i3", stage: 3, category: "interests", subCategory: "interests", text: "I enjoy reading scientific papers, statistics reviews, and technical diagnostics.", type: "scale" },
  { id: "i_ria_i4", stage: 3, category: "interests", subCategory: "investigative", text: "I prefer theoretical challenges where I must deduce the underlying rules of a system.", type: "scale" },
  { id: "i_ria_i5", stage: 3, category: "interests", subCategory: "investigative", text: "I value resolving equations, complex data blocks, or logic puzzles.", type: "scale" },

  // Artistic - 5 Items
  { id: "i_ria_a1", stage: 3, category: "interests", subCategory: "artistic", text: "I value self-expression through digital designs, layout styling, or writing content.", type: "scale" },
  { id: "i_ria_a2", stage: 3, category: "interests", subCategory: "artistic", text: "I feel limited by strict procedural schedules and prefer creative freedom.", type: "scale" },
  { id: "i_ria_a3", stage: 3, category: "interests", subCategory: "artistic", text: "I enjoy sketch work, UI layouts, aesthetic formatting, or music composition.", type: "scale" },
  { id: "i_ria_a4", stage: 3, category: "interests", subCategory: "artistic", text: "I seek novel, original ways to present information rather than standard templates.", type: "scale" },
  { id: "i_ria_a5", stage: 3, category: "interests", subCategory: "artistic", text: "I appreciate creative writing, copywriting, storyboards, and styling concepts.", type: "scale" },

  // Social - 5 Items
  { id: "i_ria_s1", stage: 3, category: "interests", subCategory: "social", text: "I feel motivated when counseling, teaching, or advising peers on their pathways.", type: "scale" },
  { id: "i_ria_s2", stage: 3, category: "interests", subCategory: "social", text: "I enjoy group consensus tasks, mediating conflicts, and team collaboration.", type: "scale" },
  { id: "i_ria_s3", stage: 3, category: "interests", subCategory: "social", text: "I prefer working directly with customers or student communities rather than isolated files.", type: "scale" },
  { id: "i_ria_s4", stage: 3, category: "interests", subCategory: "social", text: "I value active mentoring, training coordination, and helping others grow.", type: "scale" },
  { id: "i_ria_s5", stage: 3, category: "interests", subCategory: "social", text: "I easily empathize with others and focus on maintaining social support nets.", type: "scale" },

  // Enterprising - 5 Items
  { id: "i_ria_e1", stage: 3, category: "interests", subCategory: "enterprising", text: "I like pitching business models, leading project teams, and commercial targeting.", type: "scale" },
  { id: "i_ria_e2", stage: 3, category: "interests", subCategory: "enterprising", text: "I am comfortable taking calculated risks to secure status and financial milestones.", type: "scale" },
  { id: "i_ria_e3", stage: 3, category: "interests", subCategory: "enterprising", text: "I enjoy public speaking, marketing strategies, and negotiating contract agreements.", type: "scale" },
  { id: "i_ria_e4", stage: 3, category: "interests", subCategory: "enterprising", text: "I focus on driving teams toward concrete executive outcomes and targets.", type: "scale" },
  { id: "i_ria_e5", stage: 3, category: "interests", subCategory: "enterprising", text: "I prefer commercial systems operations, business development, and startup growth.", type: "scale" },

  // Conventional - 5 Items
  { id: "i_ria_c1", stage: 3, category: "interests", subCategory: "conventional", text: "I find satisfaction in organizing files, compiling databases, and checking details.", type: "scale" },
  { id: "i_ria_c2", stage: 3, category: "interests", subCategory: "conventional", text: "I prefer working under explicit guidelines, checklists, and templates.", type: "scale" },
  { id: "i_ria_c3", stage: 3, category: "interests", subCategory: "conventional", text: "I enjoy auditing budgets, checking compliance logs, and organizing records.", type: "scale" },
  { id: "i_ria_c4", stage: 3, category: "interests", subCategory: "conventional", text: "I value precision, consistency, and maintaining standard operating models.", type: "scale" },
  { id: "i_ria_c5", stage: 3, category: "interests", subCategory: "conventional", text: "I prefer data classification, ledger checks, and database management.", type: "scale" },

  // ==========================================
  // STAGE 4: BEHAVIORAL LEARNING STYLE (20 Items - VARK)
  // ==========================================
  // Visual - 5 Items
  { id: "l_vark_v1", stage: 4, category: "learning", subCategory: "visual", text: "I learn concepts best when presented with diagrams, infographics, or slide maps.", type: "scale" },
  { id: "l_vark_v2", stage: 4, category: "learning", subCategory: "visual", text: "I easily recall geometric shapes, chart colors, and spatial placements.", type: "scale" },
  { id: "l_vark_v3", stage: 4, category: "learning", subCategory: "visual", text: "I prefer to sketch ideas out on whiteboards rather than write paragraphs.", type: "scale" },
  { id: "l_vark_v4", stage: 4, category: "learning", subCategory: "visual", text: "I look for videos and animation models to understand complex operations.", type: "scale" },
  { id: "l_vark_v5", stage: 4, category: "learning", subCategory: "visual", text: "I find visual checklists and color-coded tags highly effective for recall.", type: "scale" },

  // Auditory - 5 Items
  { id: "l_vark_a1", stage: 4, category: "learning", subCategory: "auditory", text: "I absorb details best when listening to spoken lectures, podcasts, or talks.", type: "scale" },
  { id: "l_vark_a2", stage: 4, category: "learning", subCategory: "auditory", text: "I read paragraphs aloud to myself or repeat definitions to memorize them.", type: "scale" },
  { id: "l_vark_a3", stage: 4, category: "learning", subCategory: "auditory", text: "I prefer team debates and verbal walk-throughs over textual logs.", type: "scale" },
  { id: "l_vark_a4", stage: 4, category: "learning", subCategory: "auditory", text: "I easily recall spoken quotes, sounds, and vocal inflections from meetings.", type: "scale" },
  { id: "l_vark_a5", stage: 4, category: "learning", subCategory: "auditory", text: "I discuss ideas with peers to digest the core rules of a system.", type: "scale" },

  // Read/Write - 5 Items
  { id: "l_vark_r1", stage: 4, category: "learning", subCategory: "readwrite", text: "I prefer printed textbooks, documentation files, and manual list writing.", type: "scale" },
  { id: "l_vark_r2", stage: 4, category: "learning", subCategory: "readwrite", text: "I find that writing summaries multiple times solidifies details in my memory.", type: "scale" },
  { id: "l_vark_r3", stage: 4, category: "learning", subCategory: "readwrite", text: "I prefer list-based glossaries and text-heavy slide decks over images.", type: "scale" },
  { id: "l_vark_r4", stage: 4, category: "learning", subCategory: "readwrite", text: "I enjoy writing detailed progress reports, outlines, and logbooks.", type: "scale" },
  { id: "l_vark_r5", stage: 4, category: "learning", subCategory: "readwrite", text: "I seek clear written definitions and text references for study.", type: "scale" },

  // Kinesthetic - 5 Items
  { id: "l_vark_k1", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I understand systems best when I physically build a model or run hands-on tests.", type: "scale" },
  { id: "l_vark_k2", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I get restless during long sit-down readings and require movement breaks.", type: "scale" },
  { id: "l_vark_k3", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I use physical actions, gestures, and tactile trials to digest concepts.", type: "scale" },
  { id: "l_vark_k4", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I prefer active laboratory experiments, simulations, or fieldwork setups.", type: "scale" },
  { id: "l_vark_k5", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I memorize details best when I can practice executing them in real-time.", type: "scale" },

  // ==========================================
  // STAGE 5: SPECIALIZED SKILLS GRID (20 Items)
  // ==========================================
  // Administrative & Organizing - 4 Items
  { id: "s_grid_adm1", stage: 5, category: "skills", subCategory: "administrative", text: "I keep my records neatly structured and track deadlines systematically.", type: "scale" },
  { id: "s_grid_adm2", stage: 5, category: "skills", subCategory: "administrative", text: "I pay high attention to minor errors, data alignment, and logs.", type: "scale" },
  { id: "s_grid_adm3", stage: 5, category: "skills", subCategory: "administrative", text: "I enjoy organizing folder hierarchies, schedules, and spreadsheet budgets.", type: "scale" },
  { id: "s_grid_adm4", stage: 5, category: "skills", subCategory: "administrative", text: "I maintain clean documentation and update databases regularly.", type: "scale" },

  // Spatial & Visual - 4 Items
  { id: "s_grid_spa1", stage: 5, category: "skills", subCategory: "spatial", text: "I can mentally rotate shapes in 3D and visualize geometric layouts easily.", type: "scale" },
  { id: "s_grid_spa2", stage: 5, category: "skills", subCategory: "spatial", text: "I have a good eye for visual design balance, layout styling, and placements.", type: "scale" },
  { id: "s_grid_spa3", stage: 5, category: "skills", subCategory: "spatial", text: "I map architectural elevations or CAD models without getting disoriented.", type: "scale" },
  { id: "s_grid_spa4", stage: 5, category: "skills", subCategory: "spatial", text: "I enjoy designing web pages, digital interface diagrams, or infographics.", type: "scale" },

  // Leadership & Decision Making - 4 Items
  { id: "s_grid_ldr1", stage: 5, category: "skills", subCategory: "leadership", text: "I feel comfortable taking final responsibility for a team's operations under crisis.", type: "scale" },
  { id: "s_grid_ldr2", stage: 5, category: "skills", subCategory: "leadership", text: "I make rational decisions quickly, prioritizing systemic progress over feelings.", type: "scale" },
  { id: "s_grid_ldr3", stage: 5, category: "skills", subCategory: "leadership", text: "I delegate assignments clearly based on team strengths and competencies.", type: "scale" },
  { id: "s_grid_ldr4", stage: 5, category: "skills", subCategory: "leadership", text: "I handle team negotiations and commercial pitching under pressure.", type: "scale" },

  // Social & Cooperation - 4 Items
  { id: "s_grid_soc1", stage: 5, category: "skills", subCategory: "social", text: "I easily read team dynamics, encourage quieter members, and resolve friction.", type: "scale" },
  { id: "s_grid_soc2", stage: 5, category: "skills", subCategory: "social", text: "I prioritize overall team alignment and cohesion over winning personal debates.", type: "scale" },
  { id: "s_grid_soc3", stage: 5, category: "skills", subCategory: "social", text: "I enjoy mentoring, peer training, and coaching others systematically.", type: "scale" },
  { id: "s_grid_soc4", stage: 5, category: "skills", subCategory: "social", text: "I am cooperative, active, and helpful in all shared projects.", type: "scale" },

  // Mechanical & Technical - 4 Items
  { id: "s_grid_mec1", stage: 5, category: "skills", subCategory: "mechanical", text: "I easily understand how physical gears, engines, or electronic hardware fit together.", type: "scale" },
  { id: "s_grid_mec2", stage: 5, category: "skills", subCategory: "mechanical", text: "I enjoy troubleshooting physical control systems, circuit boards, or tools.", type: "scale" },
  { id: "s_grid_mec3", stage: 5, category: "skills", subCategory: "mechanical", text: "I work effectively with manual tools, hardware adjustments, or model assembly.", type: "scale" },
  { id: "s_grid_mec4", stage: 5, category: "skills", subCategory: "mechanical", text: "I look to understand physical mechanics and operational dynamics.", type: "scale" }
];

export const consistencyPairs = [
  { q1: "p_ei_1", q2: "p_ei_2", construct: "Introvert-Extrovert Balance" },
  { q1: "p_sn_1", q2: "p_sn_2", construct: "Sensing-Intuitive Balance" },
  { q1: "p_tf_1", q2: "p_tf_2", construct: "Thinking-Feeling Balance" },
  { q1: "p_jp_1", q2: "p_jp_2", construct: "Judging-Perceiving Balance" },
  { q1: "i_ria_r1", q2: "i_ria_r2", construct: "Realistic Verification" },
  { q1: "i_ria_i1", q2: "i_ria_i2", construct: "Investigative Verification" }
];
