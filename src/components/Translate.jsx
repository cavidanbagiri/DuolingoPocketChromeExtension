
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { FaArrowRight } from "react-icons/fa";

import AuthService from "../service/auth-service";
import TranslateService from "../service/translate-service";


import logo from "../assets/logo.svg";

import YANDEX_LANGUAGES from "../constants/languages";

function Translate({ selectedWord = "", setShowAuth, show_auth }) {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.authSlice.is_auth);
  const translate_pending = useSelector((state) => state.translateSlice.translate_pending);
  const translate_result = useSelector((state) => state.translateSlice.translate_result);

  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("en");

  useEffect(() => {
    if (selectedWord) {
      dispatch(TranslateService.translate({ q: selectedWord, source: fromLang, target: toLang, alternatives: 3 }));
    }
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
      <div className="flex flex-row items-center justify-start my-1">

        <select
          value={fromLang} 
          onChange={(e) => {setFromLang(e.target.value)}}
          className="p-4 w-84 rounded-lg border border-gray-200 outline-none"
        >
          {
            translate_result.detected_lang_name ?
              <option value={translate_result.detected_lang}>Auto-Detect ({translate_result.detected_lang_name})</option>
              :
              <option value="auto">Auto-Detect</option>
          }
          {YANDEX_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        {/* <select
  value={fromLang}
  onChange={(e) => setFromLang(e.target.value)}
  className="p-4 w-84 rounded-lg border border-gray-200 outline-none"
>
  <option value="auto">Auto-Detect</option>
  {YANDEX_LANGUAGES.map((lang) => (
    <option key={lang.code} value={lang.code}>
      {lang.name}
    </option>
  ))}
</select>

{/* Show detected language only if needed */}
{/* {translate_result.detected_lang_name && fromLang === 'auto' && (
  <div className="text-xs text-gray-500 ml-4 mt-1">
    Detected: {translate_result.detected_lang_name}
  </div>
)} */} 

        <FaArrowRight className="mx-5 text-2xl text-blue-500" />
        <select
          value={toLang} 
          onChange={(e) => setToLang(e.target.value)}
          className="p-4 w-84 rounded-lg border border-gray-200 outline-none"
        >
          <option value="en">English</option>
          {YANDEX_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

      </div>

      {/* Selected word */}
      <div className="flex flex-row items-center justify-start mt-4">
        <textarea
          className="p-4 w-full rounded-lg border border-gray-200 outline-none text-[16px]"
          name=""
          id=""
          rows="8"
          value={selectedWord || "No word selected"}
          readOnly
        ></textarea>
      </div>

      {/* Translation */}
      <div className="flex flex-row items-center justify-start mt-1">
        <textarea
          className="p-4 w-full rounded-lg border border-gray-200 outline-none bg-gray-50 text-[16px]"
          name=""
          id=""
          rows="8"
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

