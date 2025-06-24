
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect, useRef } from "react";

import { FaArrowRight } from "react-icons/fa";

import { clearTranslation } from "../store/translate-store";

import AuthService from "../service/auth-service";
import TranslateService from "../service/translate-service";


import logo from "../assets/logo.svg";

// function useDebounce(callback, delay, dependencies) {
//   const ref = useRef(null);

//   useEffect(() => {
//     ref.current = callback;
//   }, [callback, ...dependencies]);

//   useEffect(() => {
//     const handler = () => {
//       ref.current?.();
//     };

//     const timer = setTimeout(handler, delay);
//     return () => clearTimeout(timer);
//   }, dependencies);
// }


function Translate({ selectedWord = "", setShowAuth, show_auth, setSelectedWord }) {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.authSlice.is_auth);
  const translate_pending = useSelector((state) => state.translateSlice.translate_pending);
  const translate_result = useSelector((state) => state.translateSlice.translate_result);
  const supported_languages = useSelector((state) => state.translateSlice.supported_languages);

  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState(() => {
    return localStorage.getItem("toLang") || "en";
  });


  useEffect(() => {
    if (!selectedWord.trim()) return;

    const timer = setTimeout(() => {
      dispatch(TranslateService.translate({ q: selectedWord, source: fromLang, target: toLang }));
    }, 300); // Wait for 300ms before sending the request

    return () => clearTimeout(timer);
  }, [selectedWord, fromLang, toLang]);


  return (
    <div style={{ fontFamily: 'IBM Plex Sans' }}
      className="flex flex-col p-2 w-[30rem]">

      {/* Header */}
      <div className="flex flex-row items-center justify-between px-2 rounded-t-lg bg-gray-100">

        <div className="flex flex-row items-center">
          <img src={logo} alt="" className="w-12 h-12" />
        </div>

        {
          !is_auth ?
            <button onClick={() => setShowAuth(true)}
              className="py-1 px-3 text-sm text-white bg-blue-800 rounded-sm cursor-pointer hover:bg-blue-500 duration-150">
              Login
            </button>
            :
            <button onClick={() => dispatch(AuthService.userLogout())}
              className="py-1 px-3 text-sm text-white bg-blue-800 rounded-sm cursor-pointer hover:bg-blue-500 duration-150">
              Logout
            </button>
        }


      </div>

      {/* Language selection */}
      <div className="flex flex-row items-center justify-start mt-2">

        <select
          value={fromLang}
          onChange={(e) => { setFromLang(e.target.value) }}
          className="p-4 w-84 rounded-lg border border-gray-200 outline-none"
        >
          {
            translate_result.detected_lang_name ?
              <option value={translate_result.detected_lang}>Auto-Detect ({translate_result.detected_lang_name})</option>
              :
              <option value="auto">Auto-Detect</option>
          }
          {
            supported_languages.length > 0 &&
            supported_languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))
          }
        </select>

        <FaArrowRight className="mx-5 text-2xl text-blue-500" />

        <select
          value={toLang}
          onChange={(e) => {
            const newLang = e.target.value;
            localStorage.setItem("toLang", newLang);
            setToLang(newLang);
          }}
          className="p-4 w-84 rounded-lg border border-gray-200 outline-none"
        >
          <option value="en">English</option>
          {
            supported_languages.length > 0 &&
            supported_languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))
          }
        </select>

      </div>

      {/* Selected word */}
      <div className="flex flex-row items-center justify-start mt-2">
       
        <textarea
          className="p-4 w-full rounded-lg border border-gray-200 outline-none text-[15px]"
          name=""
          id=""
          rows="6"
          placeholder="Select or type a word..."
          value={selectedWord}
          onChange={(e) => {
            const newWord = e.target.value;
            // dispatch(setSelectedWord(newWord));
            setSelectedWord(newWord);

            if (newWord.trim()) {
            } else {
              dispatch(clearTranslation());
            }
          }}
        // readOnly={!is_manual_input_allowed}  // Optional: allow editing only when not auto-selected
        />
      </div>

      {/* Translation */}
      <div className="flex flex-row items-center justify-start mt-1">
        <textarea
          className="p-4 w-full rounded-lg border border-gray-200 outline-none bg-gray-50 text-[15px]"
          name=""
          id=""
          rows="6"
          placeholder="Translation will appear here..."
          // value={translate_result.translation || "Translating..."}
          value={
            translate_pending ?
              "Translating..."
              :
              translate_result.translation
          }
          readOnly
        ></textarea>
      </div>

      {
        is_auth &&
        <div className="flex flex-row w-full mt-2 items-center justify-center">
          <button className="py-2 text-sm w-full text-white bg-blue-800 rounded-sm cursor-pointer hover:bg-blue-500 duration-150">
            Save Duo
          </button>
        </div>
      }

    </div>
  );
}

export default Translate;

