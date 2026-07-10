# URCAREERBUDDY - Next-Gen AI Psychometric Career Guidance Platform

An advanced, premium psychometric engine built in a vintage sepia-parchment ledger aesthetic. Designed to guide high school and collegiate trajectories by analyzing core cognitive aptitudes, behavioral traits, workplace values, and specialized skill levels across 130 structural data points.

---

## 1. Product Mechanism & Architecture

The application works on a multi-stage data collection and analysis pipeline. Rather than tracking single answers to static endpoints, the platform operates a mathematical vector-matching model.

```
 [User Answers] 
       │ (130 Matrix Questions with bilingual translation)
       ▼
 [Scoring Weights Mapping] 
       │ (Individual answers add fractional weights to 15+ sub-traits simultaneously)
       ▼
 [Consistency Loop Checks] 
       │ (Anti-Gaming check pairs verify profile integrity -> adjusts precision multiplier)
       ▼
 [Euclidean Alignment Engine] 
       │ (Computes vector distance against 75 career target templates in 11-dimensional space)
       ▼
 [Bespoke Reports Renderer]
         ├── Concentric Cognitive Radar Chart
         ├── Big Five Personality Trait Synthesis Grid
         ├── RIASEC Interest Column Bars
         ├── VARK Learning Style Donut
         ├── Radial Skills Speedometers
         └── Interactive Sub-Tab Explorer with Skills Gap Analysis Checklists
```

### A. The Scoring & Weights Mapping Model
Every question item has a weight parameters dictionary. Selecting a Likert rating or multiple-choice option distributes points into multiple categories simultaneously. For example:
- *Question:* "Do you enjoy presenting a new project idea to a large team?"
- *Weight Matrix:* Adds `+10` to Extraversion (Personality), `+8` to Enterprising (Interests), and `+5` to Leadership & Public speaking (Abilities).

### B. Anti-Gaming Consistency Checker
The testing matrix sprinkles "control questions" throughout the stages (e.g. Question 12 and Question 74 evaluate the same underlying trait in rephrased formats). 
- If a user rates "Strongly Agree" on Question 12 but "Strongly Disagree" on Question 74, the **Anti-Bias Integrity Index** decreases.
- A lower integrity score applies a penalty coefficient directly to the final career suitability matching fits to prevent gaming.

### C. Euclidean Vector Matching Formula
The scoring engine maps user results into an 11-dimensional coordinate space representing:
- **6 RIASEC Holland Interests:** Realistic, Investigative, Artistic, Social, Enterprising, Conventional.
- **5 Skill Aptitudes:** Administrative & Audit, Spatial Visualization, Leadership Matrix, Social Cooperation, Mechanical & Tech.

Every career option in the database has an ideal benchmark coordinate. The engine calculates the **Normalized Euclidean Distance** between the user's vector ($U$) and each career template ($C$):

\[d = \sqrt{\frac{\sum_{i=1}^{11} (u_i - c_i)^2}{11}}\]

The raw distance is converted into a **Suitability Fit Index (%)**:

\[\text{Fit} = \max\left(40, \min\left(99, \text{round}\left(100 - d \times 0.85\right) \times \left(0.8 + 0.2 \times \frac{\text{Integrity}}{100}\right)\right)\right)\]

---

## 2. The 5-Stage Assessment Diagnostic

1. **Stage 1: Personality Diagnostics (MBTI & Big Five Hybrid - 30 Items)**
   - Maps Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving dimensions.
   - Correlates MBTI outputs to model the Big Five Traits: Openness to Experience, Conscientiousness, Extroversion, Agreeableness, and Emotional Stability.
2. **Stage 2: Cognitive & Aptitude Inventory (30 Items)**
   - Shuffled multiple-choice questions assessing Numerical Fluidity, Verbal Logic, and Abstract/Logical reasoning.
3. **Stage 3: Career Interest Mapping (Holland RIASEC - 30 Items)**
   - Evaluates interest distributions across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional categories to build a 3-letter vocational anchor (e.g., *IAS*).
4. **Stage 4: Learning Style Diagnostics (VARK Model - 20 Items)**
   - Maps Visual, Auditory, Read/Write, and Kinesthetic preferences.
5. **Stage 5: Specialized Skills & Abilities (20 Items)**
   - Assesses operational competence levels in Administrative, Spatial, Leadership, Social Cooperation, and Mechanical.

---

## 3. High School Stream Filtering (75 Career Database)

All 75 career options (15 per cluster drawer) are classified under four main high school study streams:
- **PCM** (Physics, Chemistry, Math)
- **PCB** (Physics, Chemistry, Biology)
- **Commerce**
- **Arts & Humanities**

Users can filter the final Cluster explorer drawers in real-time by clicking the stream filter pills, instantly sorting compatible careers matching their academic path.

---

## 4. How to Run Locally

### Prerequisites
- Node.js (v18+)

### Development
1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/WRECKERKNIGHT/URCAREERBUDDY.git
   cd URCAREERBUDDY
   ```
2. Install dependency packages:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Access the portal at: **`http://localhost:5173`**
