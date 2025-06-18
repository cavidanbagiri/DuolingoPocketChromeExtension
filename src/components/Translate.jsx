
// // export default Translate;
// import React from "react";
// import logo from "../assets/logo.svg";
// import { FaArrowRight } from "react-icons/fa";

// const languages = [
//     { code: "en", name: "English" },
//     { code: "ru", name: "Russian" },
//     { code: "fr", name: "French" },
// ];

// function Translate({ selectedWord = "" }) {
//     return (
//         <div className="flex flex-col p-2 min-w-96">
//             {/* The header section */}
//             <div className="flex flex-row items-center justify-between px-2 rounded-t-lg bg-gray-100">
//                 <div className="flex flex-row items-center">
//                     <img src={logo} alt="" className="w-12 h-12" />
//                     <span className="ml-4 font-bold text-blue-400">Duolingo Pocket</span>
//                 </div>

//                 {/* If not login, show login button */}
//                 <button className="py-2 px-4 font-bold text-white bg-blue-400 rounded-lg">
//                     Login
//                 </button>

//                 {/* If login, show save button */}
//                 <button className="py-2 px-4 font-bold text-white bg-blue-400 rounded-lg">
//                     Save Duo
//                 </button>
//             </div>

//             {/* Detect language section */}
//             <div className="flex flex-row items-center justify-start my-1">
//                 <select className="p-4 w-84 rounded-lg border border-gray-200 outline-none">
//                     {languages.map((lang) => (
//                         <option key={lang.code} value={lang.code}>
//                             {lang.name}
//                         </option>
//                     ))}
//                 </select>

//                 <FaArrowRight className="mx-5 text-2xl text-blue-500" />

//                 <select className="p-4 w-84 rounded-lg border border-gray-200 outline-none">
//                     <option value="">English</option>
//                 </select>
//             </div>

//             <div className="flex flex-row items-center justify-start mt-4">
//                 <textarea
//                     className="p-4 w-full rounded-lg border border-gray-200 outline-none"
//                     name=""
//                     id=""
//                     rows="10"
//                     defaultValue={selectedWord || ""}
//                 ></textarea>
//             </div>

//             {/* Translation */}
//             <div className="flex flex-row items-center justify-start mt-1">
//                 <textarea
//                     className="p-4 w-full rounded-lg border border-gray-200 outline-none bg-gray-50"
//                     name=""
//                     id=""
//                     rows="10"
//                     placeholder="Translation will appear here..."
//                 ></textarea>
//             </div>
//         </div>
//     );
// }

// export default Translate;


import React from "react";
import logo from "../assets/logo.svg";
import { FaArrowRight } from "react-icons/fa";

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Russian" },
  { code: "fr", name: "French" },
];

function Translate({ selectedWord = "" }) {
  return (
    <div className="flex flex-col p-2 min-w-96">
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-2 rounded-t-lg bg-gray-100">
        <div className="flex flex-row items-center">
          <img src={logo} alt="" className="w-12 h-12" />
          <span className="ml-4 font-bold text-blue-400">Duolingo Pocket</span>
        </div>

        <button className="py-2 px-4 font-bold text-white bg-blue-400 rounded-lg">
          Login
        </button>
        <button className="py-2 px-4 font-bold text-white bg-blue-400 rounded-lg">
          Save Duo
        </button>
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
          rows="10"
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
          rows="10"
          placeholder="Translation will appear here..."
          value={"This will be translation"}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}

export default Translate;
