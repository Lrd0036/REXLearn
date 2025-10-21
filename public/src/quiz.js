import { fetchProducts, submitQuizAttempt } from './api.js';

let currentProduct = null;
let attempts = 0;
const maxAttempts = 3;
let products = [];

function createHint(rexNumber, attempt) {
  const length = rexNumber.length;
  if (attempt === 0) return '_'.repeat(length);
  if (attempt === 1) return rexNumber.slice(0, 2) + '_'.repeat(length - 2);
  if (attempt === 2) {
    if (length <= 4) return rexNumber;
    return rexNumber.slice(0, 2) + '_'.repeat(length - 4) + rexNumber.slice(-2);
  }
  return rexNumber;
}

async function loadNewQuestion() {
  if (products.length === 0) {
    products = await fetchProducts();
  }
  currentProduct = products[Math.floor(Math.random() * products.length)];
  attempts = 0;
  
  document.getElementById('questionDisplay').textContent = 
    `What is the REX number for ${currentProduct.product} ${currentProduct.sheen} ${currentProduct.base}?`;
  document.getElementById('hintDisplay').textContent = createHint(currentProduct.rex_number, attempts);
  document.getElementById('answerInput').value = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('attemptsDisplay').textContent = `Attempts: ${attempts}/${maxAttempts}`;
}

document.getElementById('submitBtn').addEventListener('click', async () => {
  const userAnswer = document.getElementById('answerInput').value.trim().toUpperCase();
  const correct = userAnswer === currentProduct.rex_number.toUpperCase();
  attempts++;

  if (correct) {
    document.getElementById('feedback').textContent = '✅ Correct!';
    document.getElementById('feedback').style.color = 'green';
    
    const userId = localStorage.getItem('userId');
    await submitQuizAttempt(userId, currentProduct.rex_number, true, attempts);
    
    setTimeout(loadNewQuestion, 2000);
  } else {
    if (attempts < maxAttempts) {
      document.getElementById('feedback').textContent = '❌ Try again!';
      document.getElementById('feedback').style.color = 'red';
      document.getElementById('hintDisplay').textContent = createHint(currentProduct.rex_number, attempts);
      document.getElementById('attemptsDisplay').textContent = `Attempts: ${attempts}/${maxAttempts}`;
    } else {
      document.getElementById('feedback').textContent = `❌ Out of attempts! Answer: ${currentProduct.rex_number}`;
      document.getElementById('feedback').style.color = 'red';
      
      const userId = localStorage.getItem('userId');
      await submitQuizAttempt(userId, currentProduct.rex_number, false, attempts);
      
      setTimeout(loadNewQuestion, 3000);
    }
  }
});

loadNewQuestion();
