
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Translate from './components/Translate';
import Auth from './components/Auth';

import AuthService from './service/auth-service';
import TranslateService from './service/translate-service';

function App() {

    const dispatch = useDispatch();

    const is_auth = useSelector((state) => state.authSlice.is_auth);
    const authChecked = useSelector((state) => state.authSlice.authChecked);

    const [limit, setLimit] = useState(100);

    const [show_auth, setShowAuth] = useState(false);

    const [word, setWord] = useState("");

    const [finalWord, setFinalWord] = useState("");

    useEffect(() => { // This is new version
        console.log("Popup loaded");

        // Try connecting to background script
        const port = chrome.runtime.connect();
        if (!port) {
            console.warn("⚠️ No background connection available");
            return;
        }

        // Request current word from background
        port.postMessage({ type: "REQUEST_WORD" });

        port.onMessage.addListener((response) => {
            if (response.type === "CURRENT_WORD") {
                setWord(response.payload);
            }
        });

        // Optional: Handle disconnect
        return () => {
            port.disconnect();
        };
    }, []);

    useEffect(() => { // This is new version
        const messageListener = (message) => {
            if (message.type === "WORD_SELECTED") {
                console.log("💬 New word from page:", message.payload);
                setWord(message.payload);
            }
        };

        // Add listener for messages
        chrome.runtime.onMessage.addListener(messageListener);

        // Cleanup listener on unmount
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, []);



    // useEffect(() => {
    //     console.log("Popup loaded");

    //     // Ask background for last selected word
    //     const port = chrome.runtime.connect();

    //     port.postMessage({ type: "REQUEST_WORD" });

    //     port.onMessage.addListener((response) => {
    //         if (response.type === "CURRENT_WORD") {
    //             setWord(response.payload);
    //         }
    //     });

    //     // Also listen for direct messages (optional)
    //     const messageListener = (message) => {
    //         if (message.type === "WORD_SELECTED") {
    //             setWord(message.payload);
    //         }
    //     };

    //     chrome.runtime.onMessage.addListener(messageListener);

    //     return () => {
    //         chrome.runtime.onMessage.removeListener(messageListener);
    //     };
    // }, []);

    useEffect(() => {
        if (!authChecked) return;
        setFinalWord(word);
    }, [authChecked, word]);


    useEffect(() => {
        if (!is_auth) { dispatch(AuthService.refresh()); }
    }, [is_auth]);

    useEffect(() => { dispatch(TranslateService.getLanguages()); }, []);

    useEffect(() => {
        if (!authChecked) return;
        setLimit(is_auth ? 1000 : 100);
    }, [authChecked, is_auth]);

    return (


        <div className='flex flex-col items-center p-2 w-[30rem] '>
            {
                show_auth && !is_auth ?
                    <Auth show_auth={show_auth} setShowAuth={setShowAuth} />
                    :
                    authChecked ?
                        <Translate
                            authChecked={authChecked}
                            setShowAuth={setShowAuth}
                            selectedWord={finalWord}
                            setSelectedWord={setFinalWord}
                            limit={limit}
                            setLimit={setLimit}
                        />
                        :
                        <div><span>Loading...</span></div>
            }
        </div>
    )

}

export default App;



