// import React, { useState } from "react";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";

// const Editor = ({ value, onChange }) => {
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   return (
//     // <div className="flex flex-col h-full space-y-4">
//     <div className="flex  gap-4 pb-4">
//       <CodeMirror
//         value={value}
//         height="450px"
//         width="610px"
//         extensions={[javascript()]}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default Editor;
import React from "react";
import CodeMirror from "@uiw/react-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

// Modern Java grammar (works)
import { java } from "@codemirror/lang-java";

// Stream-based fallback for C++ & other C-like languages
import { StreamLanguage } from "@codemirror/language";
import { cpp as cppLegacy } from "@codemirror/legacy-modes/mode/clike";

import { rust } from "@codemirror/lang-rust";

import { oneDark } from "@codemirror/theme-one-dark";

const Editor = ({ value, onChange, language }) => {
  const getLangExt = () => {
    switch (language) {
      case "JavaScript":
        return javascript();

      case "Python":
        return python();

      case "Java":
        return java();

      case "C++":
        return StreamLanguage.define(cppLegacy); // <-- FIXED

      case "C#":
        return StreamLanguage.define(cppLegacy); // C#/Java fallback

      case "Rust":
        return rust();

      default:
        return javascript();
    }
  };

  return (
    <div className="w-full h-full">
      <CodeMirror
        value={value}
        height="450px"
        width="100%"
        theme={oneDark}
        extensions={[getLangExt()]}
        onChange={(code) => onChange(code)}
      />
    </div>
  );
};

export default Editor;
