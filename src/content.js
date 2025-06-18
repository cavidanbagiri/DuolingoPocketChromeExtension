
// // content.js – runs on every page
// document.addEventListener("mouseup", () => {
//     const selection = window.getSelection().toString().trim();

//     if (selection.length > 0) {
//         console.log("Selected text:", selection);

//         // Send message to background script or popup
//         chrome.runtime.sendMessage({
//             type: "WORD_SELECTED",
//             payload: selection
//         });
//     }
// });


// content.js - fixed version
// document.addEventListener("mouseup", () => {
//     const selection = window.getSelection().toString().trim();

//     if (selection.length > 0) {
//         console.log("Selected text:", selection);

//         // Send message to popup
//         chrome.runtime.sendMessage({
//             type: "WORD_SELECTED",
//             payload: selection
//         }, (response) => {
//             // Optional callback
//             console.log("Message sent to popup");
//         });
//     }
// });

// document.addEventListener("mouseup", () => {
//     const selection = window.getSelection().toString().trim();

//     if (selection.length > 0) {
//         console.log("✅ Selected text:", selection);

//         try {
//             chrome.runtime.sendMessage(
//                 { type: "WORD_SELECTED", payload: selection },
//                 (response) => {
//                     if (chrome.runtime.lastError) {
//                         console.warn("⚠️ Chrome runtime error:", chrome.runtime.lastError.message);
//                     } else {
//                         console.log("📬 Message sent to popup", response);
//                     }
//                 }
//             );
//         } catch (e) {
//             console.error("🚨 Failed to send message", e);
//         }
//     }
// });

document.addEventListener("mouseup", () => {
    const selection = window.getSelection().toString().trim();

    if (selection.length > 0) {
        console.log("✅ Selected text:", selection);

        try {
            chrome.runtime.sendMessage(
                { type: "WORD_SELECTED", payload: selection },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn("⚠️ Message not received by popup");
                    } else {
                        console.log("📬 Response from popup:", response);
                    }
                }
            );
        } catch (e) {
            console.error("🚨 Failed to send message", e);
        }
    }
});



