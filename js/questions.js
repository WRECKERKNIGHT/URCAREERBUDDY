// Production Question Bank with Bilingual Support (English & Hindi) & Shuffled Correct Options
// Weights map response to multiple buckets (E/I, RIASEC, Skills, Abilities)

export const questions = [
  // ==========================================
  // STAGE 1: PERSONALITY (30 Items - MBTI Axes)
  // ==========================================
  // Extraversion (E) vs Introversion (I) - 8 Items
  { 
    id: "p_ei_1", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I feel energized and inspired after spending time interacting with a large group of people.", 
    textHi: "मुझे लोगों के बड़े समूह के साथ बातचीत करने के बाद ऊर्जावान और प्रेरित महसूस होता है।",
    type: "scale",
    weights: { extravert: 1.0, enterprising: 0.3, social: 0.2 } 
  },
  { 
    id: "p_ei_2", stage: 1, category: "personality", subCategory: "introvert", 
    text: "I prefer to spend my weekends in quiet, solitary reflection rather than attending social gatherings.", 
    textHi: "मैं सामाजिक समारोहों में जाने के बजाय अपने सप्ताहांत को शांत, अकेले चिंतन में बिताना पसंद करता हूँ।",
    type: "scale",
    weights: { introvert: 1.0, investigative: 0.2 } 
  },
  { 
    id: "p_ei_3", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I easily initiate conversations with unfamiliar individuals in public or professional settings.", 
    textHi: "मैं सार्वजनिक या व्यावसायिक सेटिंग्स में अपरिचित व्यक्तियों के साथ आसानी से बातचीत शुरू कर लेता हूँ।",
    type: "scale",
    weights: { extravert: 1.0, social: 0.3 }
  },
  { 
    id: "p_ei_4", stage: 1, category: "personality", subCategory: "introvert", 
    text: "I require solitary downtime to recharge my energy levels after long group meetings.", 
    textHi: "मुझे लंबी समूह बैठकों के बाद अपने ऊर्जा स्तर को रिचार्ज करने के लिए अकेले समय की आवश्यकता होती है।",
    type: "scale" 
  },
  { 
    id: "p_ei_5", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I enjoy being the center of attention and presenting pitches to active audiences.", 
    textHi: "मुझे ध्यान का केंद्र बनना और सक्रिय दर्शकों के सामने प्रस्तुतियां देना पसंद है।",
    type: "scale",
    weights: { extravert: 1.0, enterprising: 0.4, leadership: 0.3 }
  },
  { 
    id: "p_ei_6", stage: 1, category: "personality", subCategory: "introvert", 
    text: "I prefer expressively discussing concepts in one-on-one sessions rather than in large group panels.", 
    textHi: "मैं बड़े समूह पैनलों के बजाय आमने-सामने के सत्रों में अवधारणाओं पर चर्चा करना पसंद करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_ei_7", stage: 1, category: "personality", subCategory: "extravert", 
    text: "I feel restless when isolated from team interfaces for multiple consecutive days.", 
    textHi: "जब मैं लगातार कई दिनों तक टीम इंटरफेस से अलग रहता हूँ तो मुझे बेचैनी महसूस होती है।",
    type: "scale" 
  },
  { 
    id: "p_ei_8", stage: 1, category: "personality", subCategory: "introvert", 
    text: "I find that deep, internal analytical thoughts come most easily when I work alone.", 
    textHi: "मुझे लगता है कि जब मैं अकेले काम करता हूँ तो गहरे, आंतरिक विश्लेषणात्मक विचार सबसे आसानी से आते हैं।",
    type: "scale" 
  },

  // Sensing (S) vs Intuition (N) - 8 Items
  { 
    id: "p_sn_1", stage: 1, category: "personality", subCategory: "sensing", 
    text: "I focus heavily on concrete facts and immediate real-world experiences rather than speculative theories.", 
    textHi: "मैं सट्टा सिद्धांतों के बजाय ठोस तथ्यों और तत्काल वास्तविक दुनिया के अनुभवों पर भारी ध्यान केंद्रित करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_sn_2", stage: 1, category: "personality", subCategory: "intuitive", 
    text: "I frequently think about future possibilities, symbolic meanings, and conceptual structures.", 
    textHi: "मैं अक्सर भविष्य की संभावनाओं, प्रतीकात्मक अर्थों और वैचारिक संरचनाओं के बारे में सोचता हूँ।",
    type: "scale",
    weights: { intuitive: 1.0, artistic: 0.3 }
  },
  { 
    id: "p_sn_3", stage: 1, category: "personality", subCategory: "sensing", 
    text: "I prefer standard, proven methodologies over experimenting with radical, unverified systems.", 
    textHi: "मैं कट्टरपंथी, असत्यापित प्रणालियों के साथ प्रयोग करने के बजाय मानक, सिद्ध पद्धतियों को प्राथमिकता देता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_sn_4", stage: 1, category: "personality", subCategory: "intuitive", 
    text: "I enjoy reading sci-fi speculations, future roadmaps, and abstract metaphors.", 
    textHi: "मुझे विज्ञान-कथाओं के अनुमान, भविष्य के रोडमैप और अमूर्त रूपकों को पढ़ने में मज़ा आता है।",
    type: "scale" 
  },
  { 
    id: "p_sn_5", stage: 1, category: "personality", subCategory: "sensing", 
    text: "I notice minor operational errors and physical design details that others tend to overlook.", 
    textHi: "मैं छोटी परिचालन त्रुटियों और भौतिक डिज़ाइन विवरणों पर ध्यान देता हूँ जिन्हें अन्य लोग अनदेखा कर देते हैं।",
    type: "scale",
    weights: { sensing: 1.0, conventional: 0.3, administrative: 0.2 }
  },
  { 
    id: "p_sn_6", stage: 1, category: "personality", subCategory: "intuitive", 
    text: "I value strategic innovation and vision more than daily maintenance routines.", 
    textHi: "मैं दैनिक रखरखाव दिनचर्या की तुलना में रणनीतिक नवाचार और दृष्टि को अधिक महत्व देता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_sn_7", stage: 1, category: "personality", subCategory: "sensing", 
    text: "I describe situations using literal details and concrete historical examples rather than analogies.", 
    textHi: "मैं उपमाओं के बजाय शाब्दिक विवरणों और ठोस ऐतिहासिक उदाहरणों का उपयोग करके स्थितियों का वर्णन करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_sn_8", stage: 1, category: "personality", subCategory: "intuitive", 
    text: "I love connecting dots between seemingly unrelated concepts or multi-disciplinary fields.", 
    textHi: "मुझे प्रतीत होने वाले असंबंधित अवधारणाओं या बहु-विषयक क्षेत्रों के बीच बिंदुओं को जोड़ना पसंद है।",
    type: "scale" 
  },

  // Thinking (T) vs Feeling (F) - 7 Items
  { 
    id: "p_tf_1", stage: 1, category: "personality", subCategory: "thinking", 
    text: "When making decisions, I rely strictly on objective data and logical outcomes rather than feelings.", 
    textHi: "निर्णय लेते समय, मैं भावनाओं के बजाय सख्ती से वस्तुनिष्ठ डेटा और तार्किक परिणामों पर भरोसा करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_tf_2", stage: 1, category: "personality", subCategory: "feeling", 
    text: "I prioritize interpersonal harmony and team alignment when resolving disputes, even if strict rules are bent.", 
    textHi: "विवादों को सुलझाते समय मैं पारस्परिक सद्भाव और टीम संरेखण को प्राथमिकता देता हूँ, भले ही सख्त नियमों को मोड़ दिया जाए।",
    type: "scale" 
  },
  { 
    id: "p_tf_3", stage: 1, category: "personality", subCategory: "thinking", 
    text: "I value constructive truth and objective criticism more than protecting the immediate feelings of peers.", 
    textHi: "मैं साथियों की तत्काल भावनाओं की रक्षा करने से अधिक रचनात्मक सत्य और वस्तुनिष्ठ आलोचना को महत्व देता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_tf_4", stage: 1, category: "personality", subCategory: "feeling", 
    text: "I easily empathize with the emotional distress of team members during high-pressure milestones.", 
    textHi: "मैं उच्च दबाव वाले मील के पत्थर के दौरान टीम के सदस्यों के भावनात्मक संकट को आसानी से महसूस कर सकता हूँ।",
    type: "scale",
    weights: { feeling: 1.0, social: 0.3 }
  },
  { 
    id: "p_tf_5", stage: 1, category: "personality", subCategory: "thinking", 
    text: "I analyze problems using cause-and-effect algorithms rather than analyzing personal value alignments.", 
    textHi: "मैं व्यक्तिगत मूल्य संरेखण का विश्लेषण करने के बजाय कारण-और-प्रभाव एल्गोरिदम का उपयोग करके समस्याओं का विश्लेषण करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_tf_6", stage: 1, category: "personality", subCategory: "feeling", 
    text: "I value collaborative consensus and group unity above proving my personal technical point.", 
    textHi: "मैं अपने व्यक्तिगत तकनीकी बिंदु को साबित करने से ऊपर सहयोगात्मक सहमति और समूह एकता को महत्व देता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_tf_7", stage: 1, category: "personality", subCategory: "thinking", 
    text: "I evaluate work deliverables based on strict quantitative benchmarks rather than the effort invested.", 
    textHi: "मैं निवेश किए गए प्रयास के बजाय सख्त मात्रात्मक बेंचमार्क के आधार पर कार्य डिलिवरेबल्स का मूल्यांकन करता हूँ।",
    type: "scale" 
  },

  // Judging (J) vs Perceiving (P) - 7 Items
  { 
    id: "p_jp_1", stage: 1, category: "personality", subCategory: "judging", 
    text: "I feel most comfortable when my schedule is planned out and tasks are finished before deadlines.", 
    textHi: "मैं तब सबसे अधिक सहज महसूस करता हूँ जब मेरा शेड्यूल योजनाबद्ध होता है और समय सीमा से पहले काम पूरा हो जाता है।",
    type: "scale" 
  },
  { 
    id: "p_jp_2", stage: 1, category: "personality", subCategory: "perceiving", 
    text: "I prefer keeping my plans flexible, allowing myself to adapt spontaneously to changes.", 
    textHi: "मैं अपनी योजनाओं को लचीला रखना पसंद करता हूँ, जिससे मैं बदलावों के अनुसार स्वतः अनुकूल हो सकूँ।",
    type: "scale" 
  },
  { 
    id: "p_jp_3", stage: 1, category: "personality", subCategory: "judging", 
    text: "I dislike ambiguous project guidelines and prefer clear operational templates.", 
    textHi: "मुझे अस्पष्ट परियोजना दिशानिर्देश नापसंद हैं और मैं स्पष्ट परिचालन टेम्पलेट्स पसंद करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_jp_4", stage: 1, category: "personality", subCategory: "perceiving", 
    text: "I feel inspired by sudden, last-minute pressure and perform well under tight timelines.", 
    textHi: "मैं अचानक, अंतिम समय के दबाव से प्रेरित महसूस करता हूँ और तंग समय सीमा के तहत अच्छा प्रदर्शन करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_jp_5", stage: 1, category: "personality", subCategory: "judging", 
    text: "I keep my files, directories, and schedules neatly categorized and sorted.", 
    textHi: "मैं अपनी फाइलों, निर्देशिकाओं और शेड्यूल को बड़े करीने से वर्गीकृत और क्रमबद्ध रखता हूँ।",
    type: "scale",
    weights: { judging: 1.0, conventional: 0.3, administrative: 0.3 }
  },
  { 
    id: "p_jp_6", stage: 1, category: "personality", subCategory: "perceiving", 
    text: "I prefer to explore multiple implementation options before committing to a final path.", 
    textHi: "मैं अंतिम मार्ग पर प्रतिबद्ध होने से पहले कई कार्यान्वयन विकल्पों का पता लगाना पसंद करता हूँ।",
    type: "scale" 
  },
  { 
    id: "p_jp_7", stage: 1, category: "personality", subCategory: "judging", 
    text: "I feel satisfied when I check items off my task list and achieve clean closure.", 
    textHi: "जब मैं अपनी कार्य सूची से वस्तुओं की जांच करता हूँ और साफ समापन प्राप्त करता हूँ तो मुझे संतुष्टि महसूस होती है।",
    type: "scale" 
  },

  // ==========================================
  // STAGE 2: APTITUDE & COGNITIVE (30 Items - Correct options shuffled)
  // ==========================================
  // Numerical Fluidity - 10 Items
  {
    id: "a_num_1", stage: 2, category: "ability", subCategory: "numerical",
    text: "Calculate: 15% of 240.",
    textHi: "गणना करें: 240 का 15%।",
    type: "choice", 
    options: [
      { text: "32 (32)", textHi: "32", score: 0 }, 
      { text: "36 (36)", textHi: "36", score: 10 }, // Shuffled to 2nd position
      { text: "40 (40)", textHi: "40", score: 0 }, 
      { text: "38 (38)", textHi: "38", score: 0 }
    ]
  },
  {
    id: "a_num_2", stage: 2, category: "ability", subCategory: "numerical",
    text: "Identify the missing value: 2, 6, 12, 20, 30, ...",
    textHi: "लुप्त मान पहचानें: 2, 6, 12, 20, 30, ...",
    type: "choice", 
    options: [
      { text: "40 (40)", textHi: "40", score: 0 }, 
      { text: "36 (36)", textHi: "36", score: 0 }, 
      { text: "42 (42)", textHi: "42", score: 10 }, // Shuffled to 3rd position
      { text: "48 (48)", textHi: "48", score: 0 }
    ]
  },
  {
    id: "a_num_3", stage: 2, category: "ability", subCategory: "numerical",
    text: "Solve for X: 3X + 7 = 34.",
    textHi: "X के लिए हल करें: 3X + 7 = 34।",
    type: "choice", 
    options: [
      { text: "8 (8)", textHi: "8", score: 0 }, 
      { text: "10 (10)", textHi: "10", score: 0 }, 
      { text: "7 (7)", textHi: "7", score: 0 }, 
      { text: "9 (9)", textHi: "9", score: 10 } // Shuffled to 4th position
    ]
  },
  {
    id: "a_num_4", stage: 2, category: "ability", subCategory: "numerical",
    text: "A project budget of $4,000 increases by 5% and then decreases by 5%. What is the final budget?",
    textHi: "एक परियोजना का बजट $4,000 है जो 5% बढ़ता है और फिर 5% घटता है। अंतिम बजट क्या है?",
    type: "choice", 
    options: [
      { text: "$3,990 ($3,990)", textHi: "$3,990", score: 10 }, // 1st position
      { text: "$4,000 ($4,000)", textHi: "$4,000", score: 0 }, 
      { text: "$4,100 ($4,100)", textHi: "$4,100", score: 0 }, 
      { text: "$3,950 ($3,950)", textHi: "$3,950", score: 0 }
    ]
  },
  {
    id: "a_num_5", stage: 2, category: "ability", subCategory: "numerical",
    text: "If 4 builders construct a wall in 6 hours, how many builders are needed to build it in 3 hours?",
    textHi: "यदि 4 निर्माणकर्ता 6 घंटे में एक दीवार बनाते हैं, तो इसे 3 घंटे में बनाने के लिए कितने निर्माणकर्ताओं की आवश्यकता होगी?",
    type: "choice", 
    options: [
      { text: "6 (6)", textHi: "6", score: 0 }, 
      { text: "8 (8)", textHi: "8", score: 10 }, // 2nd position
      { text: "12 (12)", textHi: "12", score: 0 }, 
      { text: "10 (10)", textHi: "10", score: 0 }
    ]
  },
  {
    id: "a_num_6", stage: 2, category: "ability", subCategory: "numerical",
    text: "Calculate the average of: 14, 18, 22, 26.",
    textHi: "औसत ज्ञात करें: 14, 18, 22, 26।",
    type: "choice", 
    options: [
      { text: "18 (18)", textHi: "18", score: 0 }, 
      { text: "22 (22)", textHi: "22", score: 0 }, 
      { text: "20 (20)", textHi: "20", score: 10 }, // 3rd position
      { text: "21 (21)", textHi: "21", score: 0 }
    ]
  },
  {
    id: "a_num_7", stage: 2, category: "ability", subCategory: "numerical",
    text: "Convert 5/8 to a decimal format.",
    textHi: "5/8 को दशमलव प्रारूप में बदलें।",
    type: "choice", 
    options: [
      { text: "0.585 (0.585)", textHi: "0.585", score: 0 }, 
      { text: "0.675 (0.675)", textHi: "0.675", score: 0 }, 
      { text: "0.725 (0.725)", textHi: "0.725", score: 0 }, 
      { text: "0.625 (0.625)", textHi: "0.625", score: 10 } // 4th position
    ]
  },
  {
    id: "a_num_8", stage: 2, category: "ability", subCategory: "numerical",
    text: "Solve: (7 * 8) - (36 / 6).",
    textHi: "हल करें: (7 * 8) - (36 / 6)।",
    type: "choice", 
    options: [
      { text: "50 (50)", textHi: "50", score: 10 }, // 1st position
      { text: "48 (48)", textHi: "48", score: 0 }, 
      { text: "52 (52)", textHi: "52", score: 0 }, 
      { text: "46 (46)", textHi: "46", score: 0 }
    ]
  },
  {
    id: "a_num_9", stage: 2, category: "ability", subCategory: "numerical",
    text: "If X + Y = 12 and X - Y = 4, what is the value of X?",
    textHi: "यदि X + Y = 12 और X - Y = 4, तो X का मान क्या है?",
    type: "choice", 
    options: [
      { text: "6 (6)", textHi: "6", score: 0 }, 
      { text: "8 (8)", textHi: "8", score: 10 }, // 2nd position
      { text: "10 (10)", textHi: "10", score: 0 }, 
      { text: "7 (7)", textHi: "7", score: 0 }
    ]
  },
  {
    id: "a_num_10", stage: 2, category: "ability", subCategory: "numerical",
    text: "A store offers a 20% discount on a $120 jacket. What is the sales price?",
    textHi: "एक स्टोर $120 की जैकेट पर 20% की छूट देता है। बिक्री मूल्य क्या है?",
    type: "choice", 
    options: [
      { text: "$100 ($100)", textHi: "$100", score: 0 }, 
      { text: "$84 ($84)", textHi: "$84", score: 0 }, 
      { text: "$96 ($96)", textHi: "$96", score: 10 }, // 3rd position
      { text: "$90 ($90)", textHi: "$90", score: 0 }
    ]
  },

  // Verbal Logic & Comprehension - 10 Items
  {
    id: "a_ver_1", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'ACUMEN':",
    textHi: "'ACUMEN' (कुशाग्रता) का सबसे करीबी पर्यायवाची शब्द पहचानें:",
    type: "choice", 
    options: [
      { text: "Hesitation (संकोच)", textHi: "संकोच", score: 0 }, 
      { text: "Apathy (उदासीनता)", textHi: "उदासीनता", score: 0 }, 
      { text: "Dislike (नापसंद)", textHi: "नापसंद", score: 0 }, 
      { text: "Shrewdness (चतुराई)", textHi: "चतुराई", score: 10 } // 4th position
    ]
  },
  {
    id: "a_ver_2", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the word opposite in meaning to 'EPHEMERAL':",
    textHi: "'EPHEMERAL' (क्षणभंगुर) का विपरीतार्थक शब्द चुनें:",
    type: "choice", 
    options: [
      { text: "Permanent (स्थायी)", textHi: "स्थायी", score: 10 }, // 1st position
      { text: "Transient (अस्थायी)", textHi: "अस्थायी", score: 0 }, 
      { text: "Frail (कमजोर)", textHi: "कमजोर", score: 0 }, 
      { text: "Vague (अस्पष्ट)", textHi: "अस्पष्ट", score: 0 }
    ]
  },
  {
    id: "a_ver_3", stage: 2, category: "ability", subCategory: "verbal",
    text: "Complete the analogy: 'Lighthouse' is to 'Ship' as 'Siren' is to:",
    textHi: "समानता पूरी करें: 'लाइटहाउस' का संबंध 'जहाज' से है जैसे 'सायरन' का संबंध किससे है:",
    type: "choice", 
    options: [
      { text: "Sound (ध्वनि)", textHi: "ध्वनि", score: 0 }, 
      { text: "Ambulance (एम्बुलेंस)", textHi: "एम्बुलेंस", score: 10 }, // 2nd position
      { text: "Water (पानी)", textHi: "पानी", score: 0 }, 
      { text: "Driver (चालक)", textHi: "चालक", score: 0 }
    ]
  },
  {
    id: "a_ver_4", stage: 2, category: "ability", subCategory: "verbal",
    text: "Which word is spelled correctly?",
    textHi: "किस शब्द की वर्तनी सही है?",
    type: "choice", 
    options: [
      { text: "Consciencious", textHi: "कन्शिएन्शियस (गलत)", score: 0 }, 
      { text: "Consientious", textHi: "कन्सिएन्शियस (गलत)", score: 0 }, 
      { text: "Conscientious", textHi: "कॉन्शियस (सत्य)", score: 10 }, // 3rd position
      { text: "Conscenteous", textHi: "कॉन्सेंटियस (गलत)", score: 0 }
    ]
  },
  {
    id: "a_ver_5", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'METICULOUS':",
    textHi: "'METICULOUS' (अति सावधान) का सबसे करीबी पर्यायवाची शब्द पहचानें:",
    type: "choice", 
    options: [
      { text: "Careless (लापरवाह)", textHi: "लापरवाह", score: 0 }, 
      { text: "Rapid (तीव्र)", textHi: "तीव्र", score: 0 }, 
      { text: "Vague (अस्पष्ट)", textHi: "अस्पष्ट", score: 0 }, 
      { text: "Detailed (विस्तृत/सावधान)", textHi: "विस्तृत", score: 10 } // 4th position
    ]
  },
  {
    id: "a_ver_6", stage: 2, category: "ability", subCategory: "verbal",
    text: "Complete the analogy: 'Sublime' is to 'Awe' as 'Trivial' is to:",
    textHi: "समानता पूरी करें: 'उदात्त' (Sublime) का संबंध 'विस्मय' (Awe) से है जैसे 'तुच्छ' (Trivial) का संबंध किससे है:",
    type: "choice", 
    options: [
      { text: "Indifference (उदासीनता)", textHi: "उदासीनता", score: 10 }, // 1st position
      { text: "Fear (डर)", textHi: "डर", score: 0 }, 
      { text: "Anger (क्रोध)", textHi: "क्रोध", score: 0 }, 
      { text: "Surprise (आश्चर्य)", textHi: "आश्चर्य", score: 0 }
    ]
  },
  {
    id: "a_ver_7", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the word opposite in meaning to 'VERBOSE':",
    textHi: "'VERBOSE' (शब्दबहुल) का विपरीतार्थक शब्द चुनें:",
    type: "choice", 
    options: [
      { text: "Wordy (वाचाल)", textHi: "वाचाल", score: 0 }, 
      { text: "Succinct (संक्षिप्त)", textHi: "संक्षिप्त", score: 10 }, // 2nd position
      { text: "Silent (मौन)", textHi: "मौन", score: 0 }, 
      { text: "Complex (जटिल)", textHi: "जटिल", score: 0 }
    ]
  },
  {
    id: "a_ver_8", stage: 2, category: "ability", subCategory: "verbal",
    text: "Which word represents 'a state of balance or equilibrium'?",
    textHi: "कौन सा शब्द 'संतुलन की स्थिति' का प्रतिनिधित्व करता है?",
    type: "choice", 
    options: [
      { text: "Flux (प्रवाह)", textHi: "प्रवाह", score: 0 }, 
      { text: "Tension (तनाव)", textHi: "तनाव", score: 0 }, 
      { text: "Stasis (संतुलन/स्थिरता)", textHi: "स्थिरता", score: 10 }, // 3rd position
      { text: "Gravity (गुरुत्वाकर्षण)", textHi: "गुरुत्वाकर्षण", score: 0 }
    ]
  },
  {
    id: "a_ver_9", stage: 2, category: "ability", subCategory: "verbal",
    text: "Identify the closest synonym to 'PRAGMATIC':",
    textHi: "'PRAGMATIC' (व्यवहारिक) का सबसे करीबी पर्यायवाची शब्द पहचानें:",
    type: "choice", 
    options: [
      { text: "Idealistic (आदर्शवादी)", textHi: "आदर्शवादी", score: 0 }, 
      { text: "Scientific (वैज्ञानिक)", textHi: "वैज्ञानिक", score: 0 }, 
      { text: "Doubtful (संदेहास्पद)", textHi: "संदेहास्पद", score: 0 }, 
      { text: "Practical (व्यवहारिक)", textHi: "व्यवहारिक", score: 10 } // 4th position
    ]
  },
  {
    id: "a_ver_10", stage: 2, category: "ability", subCategory: "verbal",
    text: "Choose the spelling that is correct:",
    textHi: "सही वर्तनी चुनें:",
    type: "choice", 
    options: [
      { text: "Liaison (संपर्क)", textHi: "लायजन (सत्य)", score: 10 }, // 1st position
      { text: "Liason", textHi: "लियासन (गलत)", score: 0 }, 
      { text: "Liasion", textHi: "लियासियन (गलत)", score: 0 }, 
      { text: "Liaizon", textHi: "लायज़ोन (गलत)", score: 0 }
    ]
  },

  // Abstract/Logical Processing Speed - 10 Items
  {
    id: "a_log_1", stage: 2, category: "ability", subCategory: "logical",
    text: "If all books are files, and all files are databases. Are all books databases?",
    textHi: "यदि सभी पुस्तकें फाइलें हैं, और सभी फाइलें डेटाबेस हैं। क्या सभी पुस्तकें डेटाबेस हैं?",
    type: "choice", 
    options: [
      { text: "No, never (नहीं, कभी नहीं)", textHi: "नहीं, कभी नहीं", score: 0 }, 
      { text: "Yes, definitely (हाँ, निश्चित रूप से)", textHi: "हाँ, निश्चित रूप से", score: 10 }, // 2nd position
      { text: "Only sometimes (केवल कभी-कभी)", textHi: "केवल कभी-कभी", score: 0 }, 
      { text: "Cannot be determined (निर्धारित नहीं किया जा सकता)", textHi: "निर्धारित नहीं किया जा सकता", score: 0 }
    ]
  },
  {
    id: "a_log_2", stage: 2, category: "ability", subCategory: "logical",
    text: "Identify the pattern: A1, C3, E5, G7, ...",
    textHi: "पैटर्न पहचानें: A1, C3, E5, G7, ...",
    type: "choice", 
    options: [
      { text: "H8", textHi: "H8", score: 0 }, 
      { text: "I10", textHi: "I10", score: 0 }, 
      { text: "I9", textHi: "I9", score: 10 }, // 3rd position
      { text: "J10", textHi: "J10", score: 0 }
    ]
  },
  {
    id: "a_log_3", stage: 2, category: "ability", subCategory: "logical",
    text: "If a card deck contains only spades and hearts, and we draw a red card. What suit is it?",
    textHi: "यदि ताश के पत्तों की गड्डी में केवल हुकुम (Spades) और पान (Hearts) हैं, और हम एक लाल पत्ता निकालते हैं। वह कौन सा रंग/सूट है?",
    type: "choice", 
    options: [
      { text: "Spades (हुकुम)", textHi: "हुकुम", score: 0 }, 
      { text: "Diamonds (ईंट)", textHi: "ईंट", score: 0 }, 
      { text: "Clubs (चिड़ी)", textHi: "चिड़ी", score: 0 }, 
      { text: "Hearts (पान)", textHi: "पान", score: 10 } // 4th position
    ]
  },
  {
    id: "a_log_4", stage: 2, category: "ability", subCategory: "logical",
    text: "Look at the premise: If it rains, the grass gets wet. The grass is wet. Did it definitely rain?",
    textHi: "परिकल्पना देखें: यदि बारिश होती है, तो घास गीली हो जाती है। घास गीली है। क्या निश्चित रूप से बारिश हुई थी?",
    type: "choice", 
    options: [
      { text: "No, not necessarily (नहीं, आवश्यक नहीं)", textHi: "नहीं, आवश्यक नहीं", score: 10 }, // 1st position
      { text: "Yes, definitely (हाँ, निश्चित रूप से)", textHi: "हाँ, निश्चित रूप से", score: 0 }, 
      { text: "Only in winter (केवल सर्दियों में)", textHi: "केवल सर्दियों में", score: 0 }, 
      { text: "It cannot be determined (निर्धारित नहीं किया जा सकता)", textHi: "निर्धारित नहीं किया जा सकता", score: 0 }
    ]
  },
  {
    id: "a_log_5", stage: 2, category: "ability", subCategory: "logical",
    text: "Complete the logical series: Z, Y, X, W, V, ...",
    textHi: "तार्किक श्रृंखला पूरी करें: Z, Y, X, W, V, ...",
    type: "choice", 
    options: [
      { text: "T", textHi: "T", score: 0 }, 
      { text: "U", textHi: "U", score: 10 }, // 2nd position
      { text: "S", textHi: "S", score: 0 }, 
      { text: "R", textHi: "R", score: 0 }
    ]
  },
  {
    id: "a_log_6", stage: 2, category: "ability", subCategory: "logical",
    text: "If John is taller than Mark, and Mark is taller than Dave. Who is the shortest?",
    textHi: "यदि जॉन मार्क से लंबा है, और मार्क डेव से लंबा है। सबसे छोटा कौन है?",
    type: "choice", 
    options: [
      { text: "Mark (मार्क)", textHi: "मार्क", score: 0 }, 
      { text: "John (जॉन)", textHi: "जॉन", score: 0 }, 
      { text: "Dave (डेव)", textHi: "डेव", score: 10 }, // 3rd position
      { text: "Dave and Mark", textHi: "डेव और मार्क", score: 0 }
    ]
  },
  {
    id: "a_log_7", stage: 2, category: "ability", subCategory: "logical",
    text: "If all programmers are developers, and no developers are designers. Are programmers designers?",
    textHi: "यदि सभी प्रोग्रामर डेवलपर हैं, और कोई डेवलपर डिज़ाइनर नहीं है। क्या प्रोग्रामर डिज़ाइनर हैं?",
    type: "choice", 
    options: [
      { text: "Yes, always (हाँ, हमेशा)", textHi: "हाँ, हमेशा", score: 0 }, 
      { text: "Only some (केवल कुछ)", textHi: "केवल कुछ", score: 0 }, 
      { text: "Undetermined (अनिर्धारित)", textHi: "अनिर्धारित", score: 0 }, 
      { text: "No, never (नहीं, कभी नहीं)", textHi: "नहीं, कभी नहीं", score: 10 } // 4th position
    ]
  },
  {
    id: "a_log_8", stage: 2, category: "ability", subCategory: "logical",
    text: "Identify the next number: 1, 2, 4, 8, 16, ...",
    textHi: "अगली संख्या पहचानें: 1, 2, 4, 8, 16, ...",
    type: "choice", 
    options: [
      { text: "32 (32)", textHi: "32", score: 10 }, // 1st position
      { text: "24 (24)", textHi: "24", score: 0 }, 
      { text: "30 (30)", textHi: "30", score: 0 }, 
      { text: "40 (40)", textHi: "40", score: 0 }
    ]
  },
  {
    id: "a_log_9", stage: 2, category: "ability", subCategory: "logical",
    text: "If X is north of Y, and Y is north of Z. In what direction is Z relative to X?",
    textHi: "यदि X, Y के उत्तर में है, और Y, Z के उत्तर में है। X के सापेक्ष Z किस दिशा में है?",
    type: "choice", 
    options: [
      { text: "North (उत्तर)", textHi: "उत्तर", score: 0 }, 
      { text: "South (दक्षिण)", textHi: "दक्षिण", score: 10 }, // 2nd position
      { text: "East (पूर्व)", textHi: "पूर्व", score: 0 }, 
      { text: "West (पश्चिम)", textHi: "पश्चिम", score: 0 }
    ]
  },
  {
    id: "a_log_10", stage: 2, category: "ability", subCategory: "logical",
    text: "Complete the logical analogy: 'Hand' is to 'Glove' as 'Foot' is to:",
    textHi: "तार्किक सादृश्य पूरा करें: 'हाथ' का 'दस्ताना' से वही संबंध है जो 'पैर' का किससे है:",
    type: "choice", 
    options: [
      { text: "Shoelace (जूते का फीता)", textHi: "जूते का फीता", score: 0 }, 
      { text: "Toe (पैर की अंगुली)", textHi: "पैर की अंगुली", score: 0 }, 
      { text: "Sock (मोजा)", textHi: "मोजा", score: 10 }, // 3rd position
      { text: "Leg (पैर)", textHi: "पैर", score: 0 }
    ]
  },

  // ==========================================
  // STAGE 3: RIASEC CAREER INTERESTS (30 Items)
  // ==========================================
  // Realistic - 5 Items
  { id: "i_ria_r1", stage: 3, category: "interests", subCategory: "realistic", text: "I enjoy building physical items, repair operations, or mechanics.", textHi: "मुझे भौतिक वस्तुओं के निर्माण, मरम्मत कार्यों या यांत्रिकी का आनंद मिलता है।", type: "scale" },
  { id: "i_ria_r2", stage: 3, category: "interests", subCategory: "realistic", text: "I prefer working outdoors, doing practical fieldwork rather than desk tasks.", textHi: "मैं डेस्क कार्यों के बजाय बाहर काम करने, व्यावहारिक क्षेत्र कार्य करने को प्राथमिकता देता हूँ।", type: "scale" },
  { id: "i_ria_r3", stage: 3, category: "interests", subCategory: "realistic", text: "I like troubleshooting electronic circuits, wiring, or physical hardware.", textHi: "मुझे इलेक्ट्रॉनिक सर्किट, वायरिंग या भौतिक हार्डवेयर की समस्याओं को हल करना पसंद है।", type: "scale" },
  { id: "i_ria_r4", stage: 3, category: "interests", subCategory: "realistic", text: "I am interested in operating heavy equipment, power tools, or assembly devices.", textHi: "मेरी रुचि भारी उपकरण, पावर टूल्स या असेंबली उपकरणों को संचालित करने में है।", type: "scale" },
  { id: "i_ria_r5", stage: 3, category: "interests", subCategory: "realistic", text: "I prefer practical, concrete assignments over speculative brainstorming.", textHi: "मैं काल्पनिक विचार-मंथन के बजाय व्यावहारिक, ठोस कार्यों को प्राथमिकता देता हूँ।", type: "scale" },

  // Investigative - 5 Items
  { id: "i_ria_i1", stage: 3, category: "interests", subCategory: "investigative", text: "I love exploring scientific theories, running simulations, or compiling data charts.", textHi: "मुझे वैज्ञानिक सिद्धांतों की खोज करने, सिमुलेशन चलाने या डेटा चार्ट संकलित करने से प्यार है।", type: "scale" },
  { id: "i_ria_i2", stage: 3, category: "interests", subCategory: "investigative", text: "I find writing software code, troubleshooting program bugs, or researching formulas satisfying.", textHi: "मुझे सॉफ़्टवेयर कोड लिखने, प्रोग्राम बग्स को ठीक करने या सूत्रों पर शोध करने में संतोष मिलता है।", type: "scale" },
  { id: "i_ria_i3", stage: 3, category: "interests", subCategory: "investigative", text: "I enjoy reading scientific papers, statistics reviews, and technical diagnostics.", textHi: "मुझे वैज्ञानिक शोध पत्र, सांख्यिकी समीक्षाएं और तकनीकी निदान पढ़ना पसंद है।", type: "scale" },
  { id: "i_ria_i4", stage: 3, category: "interests", subCategory: "investigative", text: "I prefer theoretical challenges where I must deduce the underlying rules of a system.", textHi: "मैं सैद्धांतिक चुनौतियों को प्राथमिकता देता हूँ जहाँ मुझे किसी प्रणाली के अंतर्निहित नियमों का अनुमान लगाना होता है।", type: "scale" },
  { id: "i_ria_i5", stage: 3, category: "interests", subCategory: "investigative", text: "I value resolving equations, complex data blocks, or logic puzzles.", textHi: "मैं समीकरणों, जटिल डेटा ब्लॉकों या तर्क पहेलियों को हल करने को महत्व देता हूँ।", type: "scale" },

  // Artistic - 5 Items
  { id: "i_ria_a1", stage: 3, category: "interests", subCategory: "artistic", text: "I value self-expression through digital designs, layout styling, or writing content.", textHi: "मैं डिजिटल डिज़ाइन, लेआउट स्टाइलिंग या सामग्री लिखने के माध्यम से आत्म-अभिव्यक्ति को महत्व देता हूँ।", type: "scale" },
  { id: "i_ria_a2", stage: 3, category: "interests", subCategory: "artistic", text: "I feel limited by strict procedural schedules and prefer creative freedom.", textHi: "मैं सख्त प्रक्रियात्मक शेड्यूल द्वारा सीमित महसूस करता हूँ और रचनात्मक स्वतंत्रता पसंद करता हूँ।", type: "scale" },
  { id: "i_ria_a3", stage: 3, category: "interests", subCategory: "artistic", text: "I enjoy sketch work, UI layouts, aesthetic formatting, or music composition.", textHi: "मुझे स्केच वर्क, यूआई लेआउट, सौंदर्यवादी स्वरूपण या संगीत रचना का आनंद मिलता है।", type: "scale" },
  { id: "i_ria_a4", stage: 3, category: "interests", subCategory: "artistic", text: "I seek novel, original ways to present information rather than standard templates.", textHi: "मैं मानक टेम्पलेट्स के बजाय जानकारी प्रस्तुत करने के नए, अनूठे तरीके तलाशता हूँ।", type: "scale" },
  { id: "i_ria_a5", stage: 3, category: "interests", subCategory: "artistic", text: "I appreciate creative writing, copywriting, storyboards, and styling concepts.", textHi: "मैं रचनात्मक लेखन, कॉपी राइटिंग, स्टोरीबोर्ड और स्टाइलिंग अवधारणाओं की सराहना करता हूँ।", type: "scale" },

  // Social - 5 Items
  { id: "i_ria_s1", stage: 3, category: "interests", subCategory: "social", text: "I feel motivated when counseling, teaching, or advising peers on their pathways.", textHi: "जब मैं साथियों को उनके रास्तों पर सलाह देता हूँ, पढ़ाता हूँ या परामर्श देता हूँ तो मुझे प्रेरणा महसूस होती है।", type: "scale" },
  { id: "i_ria_s2", stage: 3, category: "interests", subCategory: "social", text: "I enjoy group consensus tasks, mediating conflicts, and team collaboration.", textHi: "मुझे समूह सहमति कार्यों, संघर्षों में मध्यस्थता करने और टीम सहयोग का आनंद मिलता है।", type: "scale" },
  { id: "i_ria_s3", stage: 3, category: "interests", subCategory: "social", text: "I prefer working directly with customers or student communities rather than isolated files.", textHi: "मैं अलग-थलग फाइलों के बजाय ग्राहकों या छात्र समुदायों के साथ सीधे काम करना पसंद करता हूँ।", type: "scale" },
  { id: "i_ria_s4", stage: 3, category: "interests", subCategory: "social", text: "I value active mentoring, training coordination, and helping others grow.", textHi: "मैं सक्रिय सलाह, प्रशिक्षण समन्वय और दूसरों को बढ़ने में मदद करने को महत्व देता हूँ।", type: "scale" },
  { id: "i_ria_s5", stage: 3, category: "interests", subCategory: "social", text: "I easily empathize with others and focus on maintaining social support nets.", textHi: "मैं दूसरों के साथ आसानी से सहानुभूति रखता हूँ और सामाजिक सहायता नेटवर्क बनाए रखने पर ध्यान केंद्रित करता हूँ।", type: "scale" },

  // Enterprising - 5 Items
  { id: "i_ria_e1", stage: 3, category: "interests", subCategory: "enterprising", text: "I like pitching business models, leading project teams, and commercial targeting.", textHi: "मुझे व्यावसायिक मॉडल पेश करना, परियोजना टीमों का नेतृत्व करना और वाणिज्यिक लक्ष्यीकरण पसंद है।", type: "scale" },
  { id: "i_ria_e2", stage: 3, category: "interests", subCategory: "enterprising", text: "I am comfortable taking calculated risks to secure status and financial milestones.", textHi: "मैं स्थिति और वित्तीय मील के पत्थर हासिल करने के लिए गणना किए गए जोखिम उठाने में सहज हूँ।", type: "scale" },
  { id: "i_ria_e3", stage: 3, category: "interests", subCategory: "enterprising", text: "I enjoy public speaking, marketing strategies, and negotiating contract agreements.", textHi: "मुझे सार्वजनिक भाषण, विपणन रणनीतियों और अनुबंध समझौतों पर बातचीत करने में मज़ा आता है।", type: "scale" },
  { id: "i_ria_e4", stage: 3, category: "interests", subCategory: "enterprising", text: "I focus on driving teams toward concrete executive outcomes and targets.", textHi: "मैं टीमों को ठोस कार्यकारी परिणामों और लक्ष्यों की ओर ले जाने पर ध्यान केंद्रित करता हूँ।", type: "scale" },
  { id: "i_ria_e5", stage: 3, category: "interests", subCategory: "enterprising", text: "I prefer commercial systems operations, business development, and startup growth.", textHi: "मैं वाणिज्यिक प्रणालियों के संचालन, व्यवसाय विकास और स्टार्टअप विकास को प्राथमिकता देता हूँ।", type: "scale" },

  // Conventional - 5 Items
  { id: "i_ria_c1", stage: 3, category: "interests", subCategory: "conventional", text: "I find satisfaction in organizing files, compiling databases, and checking details.", textHi: "मुझे फाइलों को व्यवस्थित करने, डेटाबेस संकलित करने और विवरणों की जांच करने में संतुष्टि मिलती है।", type: "scale" },
  { id: "i_ria_c2", stage: 3, category: "interests", subCategory: "conventional", text: "I prefer working under explicit guidelines, checklists, and templates.", textHi: "मैं स्पष्ट दिशानिर्देशों, जाँच सूचियों और टेम्पलेट्स के तहत काम करना पसंद करता हूँ।", type: "scale" },
  { id: "i_ria_c3", stage: 3, category: "interests", subCategory: "conventional", text: "I enjoy auditing budgets, checking compliance logs, and organizing records.", textHi: "मुझे बजट का ऑडिट करना, अनुपालन लॉग की जांच करना और रिकॉर्ड व्यवस्थित करना पसंद है।", type: "scale" },
  { id: "i_ria_c4", stage: 3, category: "interests", subCategory: "conventional", text: "I value precision, consistency, and maintaining standard operating models.", textHi: "मैं सटीकता, स्थिरता और मानक संचालन मॉडल बनाए रखने को महत्व देता हूँ।", type: "scale" },
  { id: "i_ria_c5", stage: 3, category: "interests", subCategory: "conventional", text: "I prefer data classification, ledger checks, and database management.", textHi: "मैं डेटा वर्गीकरण, बहीखाता जाँच और डेटाबेस प्रबंधन को प्राथमिकता देता हूँ।", type: "scale" },

  // ==========================================
  // STAGE 4: BEHAVIORAL LEARNING STYLE (20 Items - VARK)
  // ==========================================
  // Visual - 5 Items
  { id: "l_vark_v1", stage: 4, category: "learning", subCategory: "visual", text: "I learn concepts best when presented with diagrams, infographics, or slide maps.", textHi: "जब मुझे आरेख, इन्फोग्राफिक्स या स्लाइड मानचित्र प्रस्तुत किए जाते हैं तो मैं अवधारणाओं को सबसे अच्छी तरह सीखता हूँ।", type: "scale" },
  { id: "l_vark_v2", stage: 4, category: "learning", subCategory: "visual", text: "I easily recall geometric shapes, chart colors, and spatial placements.", textHi: "मैं ज्यामितीय आकृतियों, चार्ट रंगों और स्थानिक नियुक्तियों को आसानी से याद कर लेता हूँ।", type: "scale" },
  { id: "l_vark_v3", stage: 4, category: "learning", subCategory: "visual", text: "I prefer to sketch ideas out on whiteboards rather than write paragraphs.", textHi: "मैं पैराग्राफ लिखने के बजाय व्हाइटबोर्ड पर विचारों को रेखांकित करना पसंद करता हूँ।", type: "scale" },
  { id: "l_vark_v4", stage: 4, category: "learning", subCategory: "visual", text: "I look for videos and animation models to understand complex operations.", textHi: "मैं जटिल परिचालनों को समझने के लिए वीडियो और एनीमेशन मॉडल तलाशता हूँ।", type: "scale" },
  { id: "l_vark_v5", stage: 4, category: "learning", subCategory: "visual", text: "I find visual checklists and color-coded tags highly effective for recall.", textHi: "मुझे याद रखने के लिए दृश्य जाँच सूचियाँ और रंग-कोडित टैग अत्यधिक प्रभावी लगते हैं।", type: "scale" },

  // Auditory - 5 Items
  { id: "l_vark_a1", stage: 4, category: "learning", subCategory: "auditory", text: "I absorb details best when listening to spoken lectures, podcasts, or talks.", textHi: "बोले गए व्याख्यान, पॉडकास्ट या बातचीत सुनते समय मैं विवरणों को सबसे अच्छी तरह से अवशोषित करता हूँ।", type: "scale" },
  { id: "l_vark_a2", stage: 4, category: "learning", subCategory: "auditory", text: "I read paragraphs aloud to myself or repeat definitions to memorize them.", textHi: "मैं खुद से पैराग्राफ जोर से पढ़ता हूँ या उन्हें याद करने के लिए परिभाषाएँ दोहराता हूँ।", type: "scale" },
  { id: "l_vark_a3", stage: 4, category: "learning", subCategory: "auditory", text: "I prefer team debates and verbal walk-throughs over textual logs.", textHi: "मैं पाठ्य लॉग के बजाय टीम बहस और मौखिक वॉक-थ्रू पसंद करता हूँ।", type: "scale" },
  { id: "l_vark_a4", stage: 4, category: "learning", subCategory: "auditory", text: "I easily recall spoken quotes, sounds, and vocal inflections from meetings.", textHi: "मैं बैठकों से बोले गए उद्धरण, ध्वनियां और मुखर उतार-चढ़ाव आसानी से याद कर लेता हूँ।", type: "scale" },
  { id: "l_vark_a5", stage: 4, category: "learning", subCategory: "auditory", text: "I discuss ideas with peers to digest the core rules of a system.", textHi: "मैं किसी प्रणाली के मूल नियमों को समझने के लिए साथियों के साथ विचारों पर चर्चा करता हूँ।", type: "scale" },

  // Read/Write - 5 Items
  { id: "l_vark_r1", stage: 4, category: "learning", subCategory: "readwrite", text: "I prefer printed textbooks, documentation files, and manual list writing.", textHi: "मैं मुद्रित पाठ्यपुस्तकों, दस्तावेज़ीकरण फ़ाइलों और मैन्युअल सूची लेखन को प्राथमिकता देता हूँ।", type: "scale" },
  { id: "l_vark_r2", stage: 4, category: "learning", subCategory: "readwrite", text: "I find that writing summaries multiple times solidifies details in my memory.", textHi: "मुझे लगता है कि कई बार सारांश लिखने से मेरे दिमाग में विवरण पक्के हो जाते हैं।", type: "scale" },
  { id: "l_vark_r3", stage: 4, category: "learning", subCategory: "readwrite", text: "I prefer list-based glossaries and text-heavy slide decks over images.", textHi: "मैं छवियों के बजाय सूची-आधारित शब्दावली और पाठ-भारी स्लाइड डेक पसंद करता हूँ।", type: "scale" },
  { id: "l_vark_r4", stage: 4, category: "learning", subCategory: "readwrite", text: "I enjoy writing detailed progress reports, outlines, and logbooks.", textHi: "मुझे विस्तृत प्रगति रिपोर्ट, रूपरेखा और लॉगबुक लिखने में मज़ा आता है।", type: "scale" },
  { id: "l_vark_r5", stage: 4, category: "learning", subCategory: "readwrite", text: "I seek clear written definitions and text references for study.", textHi: "मैं अध्ययन के लिए स्पष्ट लिखित परिभाषाएँ और पाठ संदर्भ चाहता हूँ।", type: "scale" },

  // Kinesthetic - 5 Items
  { id: "l_vark_k1", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I understand systems best when I physically build a model or run hands-on tests.", textHi: "मैं प्रणालियों को सबसे अच्छी तरह तब समझता हूँ जब मैं शारीरिक रूप से एक मॉडल बनाता हूँ या व्यावहारिक परीक्षण चलाता हूँ।", type: "scale" },
  { id: "l_vark_k2", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I get restless during long sit-down readings and require movement breaks.", textHi: "मैं लंबे समय तक बैठकर पढ़ने के दौरान बेचैन हो जाता हूँ और मुझे मूवमेंट ब्रेक की आवश्यकता होती है।", type: "scale" },
  { id: "l_vark_k3", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I use physical actions, gestures, and tactile trials to digest concepts.", textHi: "मैं अवधारणाओं को आत्मसात करने के लिए शारीरिक क्रियाओं, इशारों और स्पर्श परीक्षणों का उपयोग करता हूँ।", type: "scale" },
  { id: "l_vark_k4", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I prefer active laboratory experiments, simulations, or fieldwork setups.", textHi: "मैं सक्रिय प्रयोगशाला प्रयोगों, सिमुलेशन या फील्डवर्क सेटअप को प्राथमिकता देता हूँ।", type: "scale" },
  { id: "l_vark_k5", stage: 4, category: "learning", subCategory: "kinesthetic", text: "I memorize details best when I can practice executing them in real-time.", textHi: "जब मैं वास्तविक समय में उन्हें निष्पादित करने का अभ्यास कर सकता हूँ तो मैं विवरणों को सबसे अच्छी तरह याद रखता हूँ।", type: "scale" },

  // ==========================================
  // STAGE 5: SPECIALIZED SKILLS GRID (20 Items)
  // ==========================================
  // Administrative & Organizing - 4 Items
  { id: "s_grid_adm1", stage: 5, category: "skills", subCategory: "administrative", text: "I keep my records neatly structured and track deadlines systematically.", textHi: "मैं अपने रिकॉर्ड को बड़े करीने से व्यवस्थित रखता हूँ और समय सीमा को व्यवस्थित रूप से ट्रैक करता हूँ।", type: "scale" },
  { id: "s_grid_adm2", stage: 5, category: "skills", subCategory: "administrative", text: "I pay high attention to minor errors, data alignment, and logs.", textHi: "मैं छोटी त्रुटियों, डेटा संरेखण और लॉग पर अत्यधिक ध्यान देता हूँ।", type: "scale" },
  { id: "s_grid_adm3", stage: 5, category: "skills", subCategory: "administrative", text: "I enjoy organizing folder hierarchies, schedules, and spreadsheet budgets.", textHi: "मुझे फ़ोल्डर पदानुक्रम, शेड्यूल और स्प्रेडशीट बजट व्यवस्थित करने में मज़ा आता है।", type: "scale" },
  { id: "s_grid_adm4", stage: 5, category: "skills", subCategory: "administrative", text: "I maintain clean documentation and update databases regularly.", textHi: "मैं साफ दस्तावेज रखता हूँ और डेटाबेस को नियमित रूप से अपडेट करता हूँ।", type: "scale" },

  // Spatial & Visual - 4 Items
  { id: "s_grid_spa1", stage: 5, category: "skills", subCategory: "spatial", text: "I can mentally rotate shapes in 3D and visualize geometric layouts easily.", textHi: "मैं 3D में आकृतियों को मानसिक रूप से घुमा सकता हूँ और ज्यामितीय लेआउट की आसानी से कल्पना कर सकता हूँ।", type: "scale" },
  { id: "s_grid_spa2", stage: 5, category: "skills", subCategory: "spatial", text: "I have a good eye for visual design balance, layout styling, and placements.", textHi: "मेरी विज़ुअल डिज़ाइन संतुलन, लेआउट स्टाइलिंग और प्लेसमेंट पर अच्छी नज़र है।", type: "scale" },
  { id: "s_grid_spa3", stage: 5, category: "skills", subCategory: "spatial", text: "I map architectural elevations or CAD models without getting disoriented.", textHi: "मैं बिना भ्रमित हुए वास्तुशिल्प ऊंचाई या सीएडी मॉडल का नक्शा बनाता हूँ।", type: "scale" },
  { id: "s_grid_spa4", stage: 5, category: "skills", subCategory: "spatial", text: "I enjoy designing web pages, digital interface diagrams, or infographics.", textHi: "मुझे वेब पेज, डिजिटल इंटरफ़ेस आरेख या इन्फोग्राफिक्स डिज़ाइन करने में मज़ा आता है।", type: "scale" } ,

  // Leadership & Decision Making - 4 Items
  { id: "s_grid_ldr1", stage: 5, category: "skills", subCategory: "leadership", text: "I feel comfortable taking final responsibility for a team's operations under crisis.", textHi: "मैं संकट के समय टीम के संचालन की अंतिम जिम्मेदारी लेने में सहज महसूस करता हूँ।", type: "scale" },
  { id: "s_grid_ldr2", stage: 5, category: "skills", subCategory: "leadership", text: "I make rational decisions quickly, prioritizing systemic progress over feelings.", textHi: "मैं भावनाओं की तुलना में प्रणालीगत प्रगति को प्राथमिकता देते हुए तेजी से तर्कसंगत निर्णय लेता हूँ।", type: "scale" },
  { id: "s_grid_ldr3", stage: 5, category: "skills", subCategory: "leadership", text: "I delegate assignments clearly based on team strengths and competencies.", textHi: "मैं टीम की ताकत और दक्षताओं के आधार पर स्पष्ट रूप से असाइनमेंट सौंपता हूँ।", type: "scale" },
  { id: "s_grid_ldr4", stage: 5, category: "skills", subCategory: "leadership", text: "I handle team negotiations and commercial pitching under pressure.", textHi: "मैं दबाव में टीम की बातचीत और व्यावसायिक पिचिंग को संभालता हूँ।", type: "scale" },

  // Social & Cooperation - 4 Items
  { id: "s_grid_soc1", stage: 5, category: "skills", subCategory: "social", text: "I easily read team dynamics, encourage quieter members, and resolve friction.", textHi: "मैं टीम की गतिशीलता को आसानी से पढ़ लेता हूँ, शांत सदस्यों को प्रोत्साहित करता हूँ और तनाव को हल करता हूँ।", type: "scale" },
  { id: "s_grid_soc2", stage: 5, category: "skills", subCategory: "social", text: "I prioritize overall team alignment and cohesion over winning personal debates.", textHi: "मैं व्यक्तिगत बहस जीतने के बजाय समग्र टीम संरेखण और सामंजस्य को प्राथमिकता देता हूँ।", type: "scale" },
  { id: "s_grid_soc3", stage: 5, category: "skills", subCategory: "social", text: "I enjoy mentoring, peer training, and coaching others systematically.", textHi: "मुझे व्यवस्थित रूप से सलाह देने, सहकर्मी प्रशिक्षण और दूसरों को कोचिंग देने में मज़ा आता है।", type: "scale" },
  { id: "s_grid_soc4", stage: 5, category: "skills", subCategory: "social", text: "I am cooperative, active, and helpful in all shared projects.", textHi: "मैं सभी साझा परियोजनाओं में सहकारी, सक्रिय और सहायक हूँ।", type: "scale" },

  // Mechanical & Technical - 4 Items
  { id: "s_grid_mec1", stage: 5, category: "skills", subCategory: "mechanical", text: "I easily understand how physical gears, engines, or electronic hardware fit together.", textHi: "मैं आसानी से समझ जाता हूँ कि भौतिक गियर, इंजन या इलेक्ट्रॉनिक हार्डवेयर एक साथ कैसे फिट होते हैं।", type: "scale" },
  { id: "s_grid_mec2", stage: 5, category: "skills", subCategory: "mechanical", text: "I enjoy troubleshooting physical control systems, circuit boards, or tools.", textHi: "मुझे भौतिक नियंत्रण प्रणालियों, सर्किट बोर्डों या उपकरणों की समस्याओं को हल करने में मज़ा आता है।", type: "scale" },
  { id: "s_grid_mec3", stage: 5, category: "skills", subCategory: "mechanical", text: "I work effectively with manual tools, hardware adjustments, or model assembly.", textHi: "मैं मैन्युअल उपकरणों, हार्डवेयर समायोजन या मॉडल असेंबली के साथ प्रभावी ढंग से काम करता हूँ।", type: "scale" },
  { id: "s_grid_mec4", stage: 5, category: "skills", subCategory: "mechanical", text: "I look to understand physical mechanics and operational dynamics.", textHi: "मैं भौतिक यांत्रिकी और परिचालन गतिशीलता को समझना चाहता हूँ।", type: "scale" }
];

export const consistencyPairs = [
  { q1: "p_ei_1", q2: "p_ei_2", construct: "Introvert-Extrovert Balance" },
  { q1: "p_sn_1", q2: "p_sn_2", construct: "Sensing-Intuitive Balance" },
  { q1: "p_tf_1", q2: "p_tf_2", construct: "Thinking-Feeling Balance" },
  { q1: "p_jp_1", q2: "p_jp_2", construct: "Judging-Perceiving Balance" },
  { q1: "i_ria_r1", q2: "i_ria_r2", construct: "Realistic Verification" },
  { q1: "i_ria_i1", q2: "i_ria_i2", construct: "Investigative Verification" }
];
