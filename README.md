🎨 REXLearn: Sherwin-Williams Product Code Trainer
REXLearn is an interactive training webapp designed to help Sherwin-Williams store associates quickly memorize and master product REX numbers — transforming repetitive learning into an engaging, intelligent experience.

🚀 Project Overview
This app dynamically quizzes users on Sherwin-Williams paint and primer products using data stored in Supabase.
It evaluates performance, tracks user progress, and provides AI-powered insights about individual weak spots and personalized improvement recommendations using OpenAI.

📂 Project Structure
text
REXLearn/
├── public/                   # Web frontend
│   ├── index.html            # Login / start page
│   ├── quiz.html             # Main quiz interface
│   ├── insights.html         # AI-driven insights page
│   ├── profile.html          # User profile / stats area
│   └── styles.css            # Global styling
├── src/                      # Frontend logic
│   ├── api.js                # Connects to Supabase & Edge Functions
│   ├── quiz.js               # Quiz logic, hints, and session tracking
│   ├── insights.js           # Fetches and displays OpenAI analysis
│   └── profile.js            # Loads personal user statistics
├── supabase/                 # Edge Functions for backend API logic
│   ├── get-insights/         # Generates AI progress summaries
│   ├── submit-quiz-attempt/  # Records quiz attempts & scoring
│   └── get-user-stats/       # Retrieves profile data and statistics
├── config.js                 # Supabase environment variables (frontend)
└── main.py                   # CLI-based prototype trainer version
🧠 Features
✅ Dynamic Quizzing
users are asked:

“What is the REX number for Emerald Urethane Trim Enamel Satin Deep Base?”

They get:

3 attempts per question

Progressive hint reveal (_______ → K3_______ → K3_____51)

Real-time correctness feedback

✅ User Profiles

Each user’s performance is tracked in Supabase

Session data stored and analyzed over time

✅ AI-Powered Insights
Supabase Edge Function integrates with OpenAI to:

Detect weak product categories (e.g., confusion between satin﻿ vs semi-gloss﻿)

Generate personalized improvement insights

Recommend focused review topics

✅ Edge Functions (Supabase)

submit-quiz-attempt — Logs user performance

get-user-stats — Retrieves stats dashboard

get-insights — Sends user history to OpenAI and returns analyzed insights

✅ Fully Serverless

Hosted frontend (Amplify or Vercel)

Supabase Postgres + REST API for data

Edge Functions for server logic

OpenAI for intelligent grading

⚙️ Tech Stack
Layer	Technology Used
Frontend	HTML, CSS, JavaScript (Vanilla)
Hosting	AWS Amplify
Database	Supabase (PostgreSQL)
Auth	Supabase Public Schema
AI Analyst	OpenAI GPT‑4 via Supabase Edge Function
Version Control	GitHub
🚧 Setup Instructions
1. Clone the Repository
bash
git clone https://github.com/<your-username>/REXLearn.git
cd REXLearn
2. Configure Supabase
Set up your environment variables and tables, then deploy Edge Functions:

bash
supabase functions deploy submit-quiz-attempt
supabase functions deploy get-user-stats
supabase functions deploy get-insights
supabase secrets set OPENAI_API_KEY=<your-openai-api-key>
3. Run Locally
You can serve the /public folder using live-server or any static server:

bash
npm install -g live-server
live-server public
Access at: http://localhost:8080

4. Deploy via AWS Amplify
Push your repo to GitHub, then:

Connect the GitHub repo via Amplify Console

Set base directory = public

Deploy for instant web hosting

📊 Database Structure
users
Column	Type	Description
user_id	SERIAL	Unique ID
username	TEXT	Unique username
total_score	INT	Accumulated score
total_questions	INT	Total quizzes taken
quiz_attempts
Column	Type	Description
attempt_id	SERIAL	Unique ID
user_id	INT	FK → users.user_id
rex_number	TEXT	FK → sherwin_products.rex_number
correct	BOOLEAN	Whether user answered correctly
attempts_used	INT	Attempts used (1–3)
timestamp	TIMESTAMP	Auto‑generated
sherwin_products
Stores all product names, bases, sheens, and REX numbers used in the quiz.

💡 AI Insights Example
When the user visits the Insights page, REXLearn calls the get-insights function:

json
{
  "userId": 23,
  "analysis": "User tends to miss Emerald and Duration Satin variants. Recommend focusing on Satin sheens and Ultradeep bases."
}
Displayed naturally in the interface as:

“You’ve scored best in ProMar and A‑100 series but are struggling with Emerald Satin bases.
Consider daily review of K37W01753, K37T01754, and similar trims.”

🧩 Future Enhancements
Admin dashboard for managers

Difficulty scaling (easy → advanced)

Image-based questions (visual identification)

Gamification system (badges, leaderboards)

🧑‍💻 Maintainer
Author: Lance Dye
Affiliation: Auburn University / Sherwin-Williams Project
GitHub: github.com/yourname
Tech Stack: Python - Supabase - AWS Amplify - OpenAI API
