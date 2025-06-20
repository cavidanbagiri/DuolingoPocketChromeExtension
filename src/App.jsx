
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Translate from './components/Translate';
import Auth from './components/Auth';

import AuthService from './service/auth-service';

function App() {

    const dispatch = useDispatch();

    const is_auth = useSelector((state) => state.authSlice.is_auth);

    const [word, setWord] = useState("");

    const [show_auth, setShowAuth] = useState(false);

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
        if (!is_auth) {
            dispatch(AuthService.refresh());
        }
    }, [is_auth]);


    return (
        <div className='flex flex-col items-center p-2 w-[30rem] '>
            {
                show_auth && !is_auth ?
                    <Auth show_auth={show_auth} setShowAuth={setShowAuth} />
                    :
                    <Translate show_auth={show_auth} setShowAuth={setShowAuth} selectedWord={'modern'} />
            }
        </div>
    )

}

export default App;



