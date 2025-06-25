
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect, useRef } from "react";

import { FaArrowRight } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";


import { clearTranslation } from "../store/translate-store";

import AuthService from "../service/auth-service";
import TranslateService from "../service/translate-service";

import MessageBox from "../layouts/MessageBox";


import logo from "../assets/logo.svg";


function Translate({ authChecked, selectedWord = "", setShowAuth, setSelectedWord, limit = 100, setLimit }) {

  const dispatch = useDispatch();


  const is_auth = useSelector((state) => state.authSlice.is_auth);
  const translate_pending = useSelector((state) => state.translateSlice.translate_pending);
  const translate_result = useSelector((state) => state.translateSlice.translate_result);
  const supported_languages = useSelector((state) => state.translateSlice.supported_languages);

  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState(() => {
    return localStorage.getItem("toLang") || "en";
  });

  

  const [show_message_box, setShowMessageBox] = useState(false);
  const [show_message_color, setShowMessageColor] = useState('bg-green-500');
  const [show_message, setShowMessage] = useState('');

  const [show_from_tooltip, setShowFromTooltip] = useState(false);
  const [show_to_tooltip, setShowToTooltip] = useState(false);


  const handleFromCopy = () => {
    navigator.clipboard.writeText(selectedWord);
    setShowMessageBox(true);
    setShowMessage('Copied to clipboard');
    setShowMessageColor('bg-green-500');
  }

  const handleToCopy = () => {
    navigator.clipboard.writeText(translate_result.translation);
    setShowMessageBox(true);
    setShowMessage('Copied to clipboard');
    setShowMessageColor('bg-green-500');
  }


  useEffect(() => {
    if (show_message_box) {
      setTimeout(() => {
        setShowMessageBox(false);
      }, 1000);
    }
  });

  useEffect(() => {

    if (!authChecked) return;

    if (!selectedWord.trim()) return;

    if (selectedWord.length > limit) {
      setSelectedWord(selectedWord.slice(0, limit));
      setShowMessageBox(true);
      setShowMessage(`Word must be less than ${limit} characters`);
      setShowMessageColor('bg-red-500');
      return;
    }

    const timer = setTimeout(() => {
      dispatch(TranslateService.translate({ q: selectedWord, source: fromLang, target: toLang }));
    }, 300);

    return () => clearTimeout(timer);
  }, [authChecked, selectedWord, fromLang, toLang, limit]);


  return (
    <div style={{ fontFamily: 'IBM Plex Sans' }}
      className="flex flex-col p-2 w-[30rem]">

      {
        show_message_box &&
        <MessageBox message={show_message} color={show_message_color} />
      }

      {/* Header */}
      <div className="flex flex-row items-center justify-between px-2 rounded-t-lg bg-gray-200">

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
      <div className="relative flex flex-row items-center justify-start mt-2">
        {
          selectedWord.trim().length > 0 &&
          <MdOutlineClear className="absolute top-3 right-3 text-xl cursor-pointer text-gray-500" onClick={() => {
            setSelectedWord('');
            dispatch(clearTranslation());
          }} /> 
        }
        <div className="flex flex-col items-center justify-center w-full p-2 rounded-lg border border-gray-200">
          <textarea
            className="p-1 w-full outline-none text-[15px]"
            name=""
            id=""
            rows="6"
            placeholder="Select or type a word..."
            value={selectedWord}
            onChange={(e) => {
              const newWord = e.target.value;
              if (selectedWord.trim().length <= limit) {
                setSelectedWord(newWord);
              }
              else {
                setShowMessageBox(true);
                setShowMessage("Word must be less than " + limit + " characters");
                setShowMessageColor('bg-red-500');
              }
              if (newWord.trim()) {
              } else {
                dispatch(clearTranslation());
              }
            }}

          />
          <div className="flex flex-row justify-between w-full mt-1">

            <div className="relative flex flex-row items-center justify-center ">
              <FaRegCopy
                className="text-xl cursor-pointer text-gray-500"
                onClick={handleFromCopy}
                onMouseEnter={() => setShowFromTooltip(true)}
                onMouseLeave={() => setShowFromTooltip(false)}
              />

              {show_from_tooltip && (
                <span className="absolute top-0 left-6 whitespace-nowrap bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                  Copy to clipboard
                </span>
              )}
            </div>

            <span className='flex items-center text-xs text-right cursor-pointer mt-1'>{selectedWord.length}/ {limit} <FaRegKeyboard className="ml-1 text-xl text-gray-500" /></span>
          </div>
        </div>

      </div>

      {/* Translation */}
      <div className="flex flex-row items-center justify-start mt-1">
        <div className="flex flex-col items-center justify-center w-full p-2 rounded-lg border border-gray-200">
          <textarea
            className="p-1 w-full  outline-nonetext-[15px]"
            name=""
            id=""
            rows="6"
            placeholder="Translation..."
            value={
              translate_pending ?
                "Translating..."
                :
                translate_result.translation
            }
            readOnly
          ></textarea>
          <div className="flex flex-row justify-between w-full mt-1">

            <div className="relative flex flex-row items-center justify-center">
              <FaRegCopy
                className="text-xl cursor-pointer text-gray-500"
                onClick={handleToCopy}
                onMouseEnter={() => setShowToTooltip(true)}
                onMouseLeave={() => setShowToTooltip(false)}
              />

              {show_to_tooltip && (
                <span className="absolute -top-8 left-6 whitespace-nowrap bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                  Copy to clipboard
                </span>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* {
        is_auth &&
        <div className="flex flex-row w-full mt-2 items-center justify-center">
          <button className="py-2 text-sm w-full text-white bg-blue-800 rounded-sm cursor-pointer hover:bg-blue-500 duration-150">
            Save Duo
          </button>
        </div>
      } */}

    </div>
  );
}

export default Translate;

