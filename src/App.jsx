
// // import { useState, useEffect } from 'react';

// // import Translate from './components/Translate.jsx';


// // function App() {

// //   const [word, setWord] = useState("");

// //     useEffect(() => {
// //         // Listen for selected word from content.js
// //         chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //           console.log('message is ', message);
// //             if (message.type === "WORD_SELECTED") {
// //                 setWord(message.payload);
// //             }
// //         });
// //         console.log('temp selected work is ', word);
// //     }, []);

// //   return <Translate selectedWord={word} />;
// // }

// // export default App;


// import { useState, useEffect } from 'react';

// import Translate from './components/Translate.jsx';


// function App() {

//   const [word, setWord] = useState("");

//   useEffect(() => {
//         console.log("Setting up message listener...");

//         // Only add listener if in extension context
//         if (chrome?.runtime) {
//             const messageListener = (message, sender, sendResponse) => {
//                 console.log('Received message:', message); // 🔥 We'll see this now
//                 if (message.type === "WORD_SELECTED") {
//                     setWord(message.payload);
//                 }
//             };

//             chrome.runtime.onMessage.addListener(messageListener);

//             // Cleanup on unmount (optional)
//             return () => {
//                 chrome.runtime.onMessage.removeListener(messageListener);
//             };
//         } else {
//             console.warn("Not running in Chrome extension context");
//         }
//     }, []); // ← Runs once on mount

//   return <Translate selectedWord={word} />;
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import Translate from './components/Translate';

// function App() {
//     const [word, setWord] = useState("");

//     useEffect(() => {
//         console.log("Setting up listener...");

//         if (chrome?.runtime) {
//             const messageListener = (message, sender, sendResponse) => {
//                 console.log('📥 Received message:', message);
//                 if (message.type === "WORD_SELECTED") {
//                     setWord(message.payload);
//                 }
//             };

//             chrome.runtime.onMessage.addListener(messageListener);

//             return () => {
//                 if (chrome?.runtime) {
//                     chrome.runtime.onMessage.removeListener(messageListener);
//                 }
//             };
//         } else {
//             console.warn("❌ Not in Chrome extension context");
//         }
//     }, []);

//     console.log("Current word:", word);

//     return (
//         <div>
//             <Translate selectedWord={word} />
//         </div>
//     );
// }

// export default App;


import { useState, useEffect } from 'react';
import Translate from './components/Translate';

function App() {
    const [word, setWord] = useState("");

    useEffect(() => {
        console.log("Popup loaded");

        // Ask background for last selected word
        const port = chrome.runtime.connect();

        port.postMessage({ type: "REQUEST_WORD" });

        port.onMessage.addListener((response) => {
            if (response.type === "CURRENT_WORD") {
                console.log("📬 Got word from background:", response.payload);
                setWord(response.payload);
            }
        });

        // Also listen for direct messages (optional)
        const messageListener = (message) => {
            if (message.type === "WORD_SELECTED") {
                setWord(message.payload);
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        console.log('the selecting word is aaaaaaaa ', word);
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []);

    return <Translate selectedWord={word} />
}

export default App;



