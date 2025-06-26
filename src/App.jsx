
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


    useEffect(() => {
        console.log("Popup initialized");

        // Connection health check
        const connectionCheck = setInterval(() => {
            chrome.runtime.sendMessage(
                { type: 'PING' },
                (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Extension connection lost");
                        window.location.reload();
                    }
                }
            );
        }, 10000); // Check every 10 seconds

        // Message listener (simplified)
        const listener = (message) => {
            if (message.type === "WORD_SELECTED") {
                setWord(message.payload);
            }
        };

        chrome.runtime.onMessage.addListener(listener);

        // Initial word request
        chrome.runtime.sendMessage(
            { type: "REQUEST_WORD" },
            (response) => {
                if (response?.type === "CURRENT_WORD") {
                    setWord(response.payload);
                }
            }
        );

        return () => {
            clearInterval(connectionCheck);
            try {
                chrome.runtime.onMessage.removeListener(listener);
            } catch (e) {
                console.log("Cleanup error:", e);
            }
        };
    }, []);


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



