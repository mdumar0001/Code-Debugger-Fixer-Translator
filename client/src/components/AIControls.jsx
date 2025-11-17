import React from "react";

const AIControls = ({
  onDebug,
  languages,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  return (
    // <div className="flex  p-4 bg-gray-100 rounded-lg shadow-md">
    // <div className="flex w-full p-4 bg-gray-100 rounded-none shadow-sm">
    <div className="flex justify-evenly w-full gap-3 p-2.5 ">
      {/* <h2 className="text-lg font-semibold mb-2">AI Controls</h2> */}
      <div className="flex justify-evenly ">
        <label
          htmlFor="language-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Language:
        </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onDebug()}
          // className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          className="px-4 py-0 bg-blue-600 text-white rounded-md"
        >
          Debug Code
        </button>
        {/* <button
          onClick={onTranslate}
          className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Translate Code
        </button> */}
      </div>
    </div>
  );
};

export default AIControls;
