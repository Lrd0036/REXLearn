export const CONFIG = {
  SUPABASE_URL: "https://qigdygawsjiwrotzuwpd.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ2R5Z2F3c2ppd3JvdHp1d3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NzczNjMsImV4cCI6MjA3NjU1MzM2M30.dnI-VGZhVReR7E9FdxRwFwH_ay8pAYgXrstMNyX9d-A", // <-- THIS COMMA WAS MISSING

  // Edge function endpoints
  EDGE_FUNCTIONS: {
    submitQuizResults: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/submit-quiz-results",
    getUserStats: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/get-user-statistics",
    openaiInsights: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/openai-insights"
  }
};