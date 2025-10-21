import { CONFIG } from './config.js';

export async function login(username) {
  const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/users?username=eq.${username}`, {
    headers: {
      'apikey': CONFIG.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
    },
  });
  const users = await response.json();
  
  if (users.length > 0) {
    return users[0].user_id;
  } else {
    // Create new user
    const createResponse = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'apikey': CONFIG.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ username }),
    });
    const newUser = await createResponse.json();
    return newUser[0].user_id;
  }
}

export async function fetchProducts() {
  const response = await fetch(`${CONFIG.SUPABASE_URL}/rest/v1/sherwin_products?select=*`, {
    headers: {
      'apikey': CONFIG.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
    },
  });
  return response.json();
}

export async function submitQuizAttempt(userId, rexNumber, correct, attemptsUsed) {
  // AFTER
const response = await fetch(`${CONFIG.SUPABASE_URL}/functions/v1/submit-quiz-results`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, rexNumber, correct, attemptsUsed }),
  });
  return response.json();
}

export async function getUserStats(userId) {
  const response = await fetch(`${CONFIG.SUPABASE_URL}/functions/v1/get-user-stats`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}

export async function getInsights(userId) {
  const response = await fetch(`${CONFIG.SUPABASE_URL}/functions/v1/get-insights`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
}
