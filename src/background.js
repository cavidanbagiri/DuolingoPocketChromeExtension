chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ LinguaPocket extension installed!");
});




let lastSelectedWord = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "WORD_SELECTED") {
        console.log("🦜 Word received:", message.payload);
        lastSelectedWord = message.payload;
        sendResponse({ status: "received" });
        return true; // Keep channel open for async
    }
    
    if (message.type === "REQUEST_WORD") {
        console.log("🔌 Word requested");
        sendResponse({
            type: "CURRENT_WORD",
            payload: lastSelectedWord
        });
        return true;
    }
    
    sendResponse({ status: "ignored" });
});


// let lastSelectedWord = "";

// // Listen for selected word from content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { // This is new version
//     if (message.type === "WORD_SELECTED") {
//         console.log("🦜 Word received in background:", message.payload);
//         lastSelectedWord = message.payload;

//         // Confirm receipt
//         sendResponse({ status: "received", payload: lastSelectedWord });
//         return true; // Keep port open for async response
//     }

//     // Optional: handle other message types
//     sendResponse({ status: "ignored", message: "Unknown message type" });
// });

// // For popup to request latest word
// chrome.runtime.onConnect.addListener((port) => {
//     port.onMessage.addListener((msg) => {
//         if (msg.type === "REQUEST_WORD") {
//             console.log("🔌 Popup requested current word:", lastSelectedWord);
//             port.postMessage({
//                 type: "CURRENT_WORD",
//                 payload: lastSelectedWord
//             });
//         }
//     });
// });


