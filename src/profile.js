import { getUserStats } from './api.js';

async function loadProfile() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  
  document.getElementById('usernameDisplay').textContent = username;
  
  const { stats } = await getUserStats(userId);
  document.getElementById('totalScore').textContent = stats.totalScore;
  document.getElementById('totalQuestions').textContent = stats.totalQuestions;
  document.getElementById('accuracy').textContent = `${stats.accuracy}%`;
}

loadProfile();
