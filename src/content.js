// This script runs on every page
console.log('🧩 Content script loaded');

document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    console.log('Selected word:', selection);
    // Later: send to your FastAPI backend
  }
});