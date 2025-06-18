

import { useState, useEffect } from 'react';
import Translate from './components/Translate';
import Auth from './components/Auth';

function App() {
    const [word, setWord] = useState("");

    const [show_auth, setShowAuth] = useState(false);

    useEffect(() => {
        console.log("Popup loaded");

        // Ask background for last selected word
        const port = chrome.runtime.connect();

        port.postMessage({ type: "REQUEST_WORD" });

        port.onMessage.addListener((response) => {
            if (response.type === "CURRENT_WORD") {
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

        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []);

    return (
        <div className='flex flex-col items-center p-2 w-96 border'>
            {
                show_auth ?
                <Auth show_auth={show_auth} setShowAuth={setShowAuth} />
                :
                <Translate show_auth={show_auth} setShowAuth={setShowAuth} selectedWord={word} />
            }
        </div>
    )
}

export default App;



