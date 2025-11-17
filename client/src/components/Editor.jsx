// import React, { useState } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import { useAuth } from '../hooks/useAuth';
// import { translateCode, debugCode } from '../services/api';

// const Editor = () => {
//     const { user } = useAuth();
//     const [code, setCode] = useState('');
//     const [output, setOutput] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleDebug = async () => {
//         setLoading(true);
//         const response = await debugCode(code);
//         setOutput(response.data);
//         setLoading(false);
//     };

//     const handleTranslate = async (language) => {
//         setLoading(true);
//         const response = await translateCode(code, language);
//         setOutput(response.data);
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col h-full">
//             <div className="flex-1">
//                 <CodeMirror
//                     value={code}
//                     options={{
//                         lineNumbers: true,
//                         mode: 'javascript',
//                         theme: 'material',
//                     }}
//                     onBeforeChange={(editor, data, value) => {
//                         setCode(value);
//                     }}
//                 />
//             </div>
//             <div className="flex justify-between mt-4">
//                 <button onClick={handleDebug} className="bg-blue-500 text-white px-4 py-2 rounded">
//                     {loading ? 'Debugging...' : 'Debug Code'}
//                 </button>
//                 <select onChange={(e) => handleTranslate(e.target.value)} className="border rounded">
//                     <option value="">Select Language</option>
//                     <option value="python">Python</option>
//                     <option value="java">Java</option>
//                     <option value="csharp">C#</option>
//                 </select>
//             </div>
//             <div className="mt-4 p-4 border rounded">
//                 <h2 className="font-bold">Output:</h2>
//                 <pre>{output}</pre>
//             </div>
//         </div>
//     );
// };

// export default Editor;
// import React, { useState } from "react";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
// import useAuth from "../hooks/useAuth";
// import { translateCode, debugCode } from "../services/api";

// const Editor = () => {
//   const { user } = useAuth();
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleDebug = async () => {
//     setLoading(true);
//     const response = await debugCode(code);
//     setOutput(response.data);
//     setLoading(false);
//   };

//   const handleTranslate = async (language) => {
//     setLoading(true);
//     const response = await translateCode(code, language);
//     setOutput(response.data);
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex-1">
//         <CodeMirror
//           value={code}
//           height="400px"
//           extensions={[javascript()]}
//           onChange={(value) => setCode(value)}
//         />
//       </div>
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={handleDebug}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Debugging..." : "Debug Code"}
//         </button>
//         <select
//           onChange={(e) => handleTranslate(e.target.value)}
//           className="border rounded"
//         >
//           <option value="">Select Language</option>
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="csharp">C#</option>
//         </select>
//       </div>
//       <div className="mt-4 p-4 border rounded">
//         <h2 className="font-bold">Output:</h2>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default Editor;
/* 
      <div className="flex justify-between">
        <button
          onClick={handleDebug}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Debugging..." : "Debug Code"}
        </button>

        <select
          onChange={(e) => handleTranslate(e.target.value)}
          className="border rounded"
        >
          <option value="">Select Language</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
        </select>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">Output:</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div> */
// const handleDebug = async () => {
//   setLoading(true);
//   const response = await debugCode(value);
//   setOutput(JSON.stringify(response.data, null, 2));
//   setLoading(false);
// };

// const handleTranslate = async (language) => {
//   if (!language) return;
//   setLoading(true);
//   const response = await translateCode(value, language);
//   setOutput(JSON.stringify(response.data, null, 2));
//   setLoading(false);
// };
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const Editor = ({ value, onChange }) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    // <div className="flex flex-col h-full space-y-4">
    <div className="flex  gap-4 pb-4">
      <CodeMirror
        value={value}
        height="450px"
        width="610px"
        extensions={[javascript()]}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
