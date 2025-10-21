// AT THE VERY TOP - Can the browser run this file AT ALL?
console.log('--- profile.js STARTED ---'); 

// Let's try to get ONE element and log it.
try {
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    console.log('Found usernameDisplay element:', usernameDisplay);
    usernameDisplay.textContent = 'Testing...'; // Try changing HTML directly
  } else {
    console.error('Could not find usernameDisplay element!'); 
  }
} catch (error) {
  console.error('Error accessing usernameDisplay:', error);
}

// Just log the username directly from localStorage if possible
try {
  const username = localStorage.getItem('username');
  console.log('Username from localStorage:', username);
  if (username && document.getElementById('usernameDisplay')) {
      document.getElementById('usernameDisplay').textContent = username; // Try setting it
  }
} catch (error) {
    console.error('Error accessing localStorage:', error);
}

console.log('--- profile.js FINISHED ---');