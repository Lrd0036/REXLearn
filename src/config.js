export const CONFIG = {
  SUPABASE_URL: "https://qigdygawsjiwrotzuwpd.supabase.co",
  SUPABASE_ANON_KEY: "11b2fee32bb7a16dcd8df183cdc96fe50bf...<add rest of key from secrets>",

  // Edge function endpoints
  EDGE_FUNCTIONS: {
    submitQuizResults: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/submit-quiz-results",
    getUserStats: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/get-user-statistics",
    openaiInsights: "https://qigdygawsjiwrotzuwpd.supabase.co/functions/v1/openai-insights"
  }
};
