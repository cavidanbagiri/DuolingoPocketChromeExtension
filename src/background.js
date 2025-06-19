chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ LinguaPocket extension installed!");
});

let lastSelectedWord = "";

// Listen for messages from content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "WORD_SELECTED") {
        console.log("🦜 Word received in background:", message.payload);
        lastSelectedWord = message.payload;
        // Send back to confirm
        sendResponse({ status: "received" });
    }
});

// Expose it via runtime.connect or onMessage
chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {
        if (msg.type === "REQUEST_WORD") {
            port.postMessage({ type: "CURRENT_WORD", payload: lastSelectedWord });
        }
    });
});



// let lastSelectedWord = "";

// // Listen for messages from content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "WORD_SELECTED") {
//         console.log("🦜 Word received in background:", message.payload);
//         lastSelectedWord = message.payload;
//         sendResponse({ status: "received" });

//         // Optional: Broadcast to all connected popups or pages
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             chrome.scripting.executeScript({
//                 target: { tabId: tabs[0].id },
//                 func: forwardToPopup
//             });
//         });
//     }
// });

// function forwardToPopup() {
//     // This function runs in the context of the current tab
//     chrome.runtime.connect().postMessage({ type: "CURRENT_WORD", payload: lastSelectedWord });
// }