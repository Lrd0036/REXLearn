// --- Start of public/src/profile.js ---

// Log 1: Check if the script starts parsing at all
console.log('--- profile.js STARTED ---'); 

import { getUserStats } from './api.js';

async function loadProfile() {
  // Log 2: Check if this function is called
  console.log('loadProfile function called.'); 

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  
  // Log 3: Check the values retrieved from localStorage
  console.log('User ID from localStorage:', userId); 
  console.log('Username from localStorage:', username); 

  // Check if IDs exist before making the API call
  if (!userId) {
    console.error('User ID not found in localStorage. Cannot load profile.');
    // You might want to show an error message on the page here
    document.getElementById('usernameDisplay').textContent = 'Error: Not logged in';
    document.getElementById('totalScore').textContent = '-';
    document.getElementById('totalQuestions').textContent = '-';
    document.getElementById('accuracy').textContent = '-';
    return; // Stop execution if no userId
  }

  // Display username (even if other stats fail)
  document.getElementById('usernameDisplay').textContent = username || 'User'; 

  try {
    // Log 4: Confirm API call is about to happen
    console.log('Calling getUserStats with userId:', userId); 
    
    // Make the API call
    const result = await getUserStats(userId);
    
    // Log 5: MOST IMPORTANT - See what the API returned
    console.log('Received result from getUserStats:', result); 

    // Check if the expected structure exists in the result
    if (result && result.stats) {
      console.log('Stats object found:', result.stats); // Log the stats object
      // Update the HTML elements - Use nullish coalescing (??) for safety
      document.getElementById('totalScore').textContent = result.stats.totalScore ?? '0'; 
      document.getElementById('totalQuestions').textContent = result.stats.totalQuestions ?? '0';
      document.getElementById('accuracy').textContent = `${result.stats.accuracy ?? '0'}%`;
      console.log('Successfully updated HTML elements.'); // Confirm update
    } else {
      // Log an error if the data structure is wrong
      console.error('Unexpected data structure received from API:', result);
      document.getElementById('totalScore').textContent = 'Error';
      document.getElementById('totalQuestions').textContent = 'Error';
      document.getElementById('accuracy').textContent = 'Error';
    }

  } catch (error) {
    // Log 6: Catch any errors during the API call or processing
    console.error('Error in loadProfile (calling API or processing result):', error); 
    // Display error state in UI
    document.getElementById('totalScore').textContent = 'Error';
    document.getElementById('totalQuestions').textContent = 'Error';
    document.getElementById('accuracy').textContent = 'Error';
  }
}

// Ensure the loadProfile function is called when the script runs
loadProfile();

// Log 7: Check if the script reaches the end
console.log('--- profile.js FINISHED ---');

// --- End of public/src/profile.js ---