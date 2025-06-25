

document.addEventListener("mouseup", () => {
  const selection = window.getSelection().toString().trim();

  if (selection && selection.length > 0) {
    console.log("✅ Selected text:", selection);

    // Try connecting to see if popup is active
    const port = chrome.runtime.connect();

    if (!port || chrome.runtime.lastError) {
      console.warn("⚠️ LinguaPocket popup not open or loading...");
      port.disconnect(); // Avoid memory leak
      return;
    }

    // Send selected word to background script
    chrome.runtime.sendMessage(
      { type: "WORD_SELECTED", payload: selection },
      (response) => {
        if (chrome.runtime.lastError) {
          console.warn("⚠️ No listener found in popup");
        } else {
          console.log("📬 Response from popup:", response);
        }
      }
    );

    port.disconnect(); // Clean up port
  }
});

// document.addEventListener("mouseup", () => {
//   const selection = window.getSelection().toString().trim();

//   if (selection && selection.length > 0) {
//     console.log("✅ Selected text:", selection);

//     // Optional: Check if popup is open before sending message
//     chrome.runtime.connect(); // Just connect, we only need to know if popup is listening

//     // Send word to background
//     chrome.runtime.sendMessage(
//       { type: "WORD_SELECTED", payload: selection },
//       (response) => {
//         if (chrome.runtime.lastError) {
//           console.warn("⚠️ Popup not running or no listener found");
//         } else {
//           console.log("📬 Response from popup:", response);
//         }
//       }
//     );
//   }
// });


// document.addEventListener("mouseup", () => { // This is for testing, new version will be in content.js
//     const selection = window.getSelection().toString().trim();

//     if (selection && selection.length > 0) {
//         console.log("✅ Selected text:", selection);

//         // Optional: Check if any popup is listening before sending
//         chrome.runtime.connect({}, () => {
//             if (chrome.runtime.lastError) {
//                 console.warn("⚠️ LinguaPocket popup is not open");
//                 return;
//             }

//             chrome.runtime.sendMessage(
//                 { type: "WORD_SELECTED", payload: selection },
//                 (response) => {
//                     if (chrome.runtime.lastError) {
//                         console.warn("⚠️ Popup is not active or closed");
//                     } else {
//                         console.log("📬 Response from popup:", response);
//                     }
//                 }
//             );
//         });
//     }
// });


// document.addEventListener("mouseup", () => {
//     const selection = window.getSelection().toString().trim();
    
//     if (selection && selection.length > 0) {
//         console.log("✅ Selected text:", selection);

//         chrome.runtime.sendMessage(
//             { type: "WORD_SELECTED", payload: selection },
//             (response) => {
//                 if (chrome.runtime.lastError) {
//                     console.warn("⚠️ Popup not running or no listener found");
//                 } else {
//                     console.log("📬 Response from popup:", response);
//                 }
//             }
//         );
//     }
// });