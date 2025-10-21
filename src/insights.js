import { getInsights } from './api.js';

document.getElementById('generateInsightsBtn').addEventListener('click', async () => {
  const userId = localStorage.getItem('userId');
  const loadingEl = document.getElementById('loading');
  const insightsEl = document.getElementById('insightsDisplay');
  
  loadingEl.classList.remove('hidden');
  insightsEl.textContent = '';
  
  try {
    const result = await getInsights(userId);
    loadingEl.classList.add('hidden');
    insightsEl.textContent = result.insights;
  } catch (error) {
    loadingEl.classList.add('hidden');
    insightsEl.textContent = 'Error generating insights. Please try again.';
  }
});
