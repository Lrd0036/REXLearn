import { getUserStats } from './api.js';

async function loadProfile() {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  console.log('User ID from localStorage:', userId); // <-- ADD THIS
  console.log('Username from localStorage:', username); // <-- ADD THIS

  // Check if IDs exist before making the API call
  if (!userId) {
    console.error('User ID not found in localStorage. Cannot load profile.');
    // Optionally, redirect to login or show an error message
    return; 
  }

  document.getElementById('usernameDisplay').textContent = username || 'User'; // Display something even if username is missing

  try {
    console.log('Calling getUserStats with userId:', userId); // <-- ADD THIS
    const result = await getUserStats(userId);
    console.log('Received result from getUserStats:', result); // <-- ADD THIS

    // Check if the expected structure exists
    if (result && result.stats) {
      document.getElementById('totalScore').textContent = result.stats.totalScore ?? '0'; // Use nullish coalescing for safety
      document.getElementById('totalQuestions').textContent = result.stats.totalQuestions ?? '0';
      document.getElementById('accuracy').textContent = `${result.stats.accuracy ?? '0'}%`;
    } else {
      console.error('Unexpected data structure received:', result);
      // Display default values or an error message
      document.getElementById('totalScore').textContent = 'Error';
      document.getElementById('totalQuestions').textContent = 'Error';
      document.getElementById('accuracy').textContent = 'Error';
    }

  } catch (error) {
    console.error('Error calling getUserStats or processing result:', error); // <-- ADD THIS TO CATCH FETCH ERRORS
    // Display error state in UI
    document.getElementById('totalScore').textContent = 'Error';
    document.getElementById('totalQuestions').textContent = 'Error';
    document.getElementById('accuracy').textContent = 'Error';
  }
}

loadProfile();