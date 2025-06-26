
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import { Provider } from 'react-redux'
import { store } from './store'


import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)


// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// document.addEventListener('DOMContentLoaded', () => {
//   const rootElement = document.getElementById('root');
//   if (!rootElement) return;

//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <TestApp />
//   );
// });

// function TestApp() {
//   return (
//     <div style={{ fontFamily: 'IBM Plex Sans' }} className="p-4">
//       <h1 className="text-xl font-bold text-blue-700 mb-4">LinguaPocket 🐬</h1>
//       <p className="mb-4">If you see this, your extension popup is working!</p>
//       <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
//         Test Button
//       </button>
//     </div>
//   );
// }