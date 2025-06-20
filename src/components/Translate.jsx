
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import AuthService from "../service/auth-service";

import logo from "../assets/logo.svg";
import { FaArrowRight } from "react-icons/fa";

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Russian" },
  { code: "fr", name: "French" },
];

function Translate({ selectedWord = "", setShowAuth, show_auth }) {

  const dispatch = useDispatch();

  const is_auth = useSelector((state) => state.authSlice.is_auth);



  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("en");
  const [translation, setTranslation] = useState("");

  const translate = async () => {
    if (!selectedWord) return;

    try {
      // const response = await fetch(`https://api.libretranslate.com/translate`,  {
      //   method: "POST",
      //   body: JSON.stringify({
      //     q: selectedWord,
      //     source: fromLang === "auto" ? "auto" : "en",
      //     target: toLang,
      //   }),
      //   headers: { "Content-Type": "application/json" }
      // });

      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: "hello",
          source: "auto",
          target: "ru",
          format: "text",
          alternatives: 3,
          api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      console.log('coming data is {}', data);
      setTranslation(data.translations[0].text);
    } catch (err) {
      console.error("Translation failed:", err);
      setTranslation("❌ Translation failed.");
    }
  };

  useEffect(() => {
    if (selectedWord) {
      translate();
    }
  }, [selectedWord]);



  return (
    <div className="flex flex-col p-2 w-[30rem]">
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-2 rounded-t-lg bg-gray-100">

        <div className="flex flex-row items-center">
          <img src={logo} alt="" className="w-12 h-12" />
          {/* <span className="ml-4 font-medium text-blue-500 text-xl">Duolingo Pocket</span> */}
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
        <select className="p-4 w-84 rounded-lg border border-gray-200 outline-none">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <FaArrowRight className="mx-5 text-2xl text-blue-500" />

        <select className="p-4 w-84 rounded-lg border border-gray-200 outline-none">
          <option value="">English</option>
        </select>
      </div>

      {/* Selected word */}
      <div className="flex flex-row items-center justify-start mt-4">
        <textarea
          className="p-4 w-full rounded-lg border border-gray-200 outline-none"
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
          className="p-4 w-full rounded-lg border border-gray-200 outline-none bg-gray-50"
          name=""
          id=""
          rows="8"
          placeholder="Translation will appear here..."
          value={translation || "Translating..."}
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
