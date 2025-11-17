import React, { useState, useEffect, useContext } from "react";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LANGUAGES = ["Python", "JavaScript", "Java", "C++", "C#"];

const CodeTranslatorDashboard = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const BASE_URL = "https://code-debugger-fixer-translator-2-backend.onrender.com";
  // const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Input Code
  const [sourceCode, setSourceCode] = useState("");

  // Output Code
  const [convertedCode, setConvertedCode] = useState("");

  // Selected Languages
  const [sourceLang, setSourceLang] = useState("Python");
  const [targetLang, setTargetLang] = useState("JavaScript");

  // Loader
  const [loading, setLoading] = useState(false);

  // History States
  const [pastTranslations, setPastTranslations] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // Load History on Login
  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  // Fetch Translation History
  async function loadHistory() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/translator/history`, {
        headers: { token },
      });

      if (data.success) {
        setPastTranslations(data.list || []);
      }
    } catch (err) {
      console.error("LOAD HISTORY ERROR:", err);
    }
  }

  // Handle Translation
  //   const convertCode = async () => {
  //     if (!sourceCode.trim()) {
  //       toast.error("Please enter some code to translate.");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const res = await axios.post(
  //         `${BASE_URL}/api/translator/convert`,
  //         {
  //           sourceCode,
  //           sourceLang,
  //           targetLang,
  //         },
  //         {
  //           headers: { token },
  //         }
  //       );

  //   if (res.data.success) {
  //     setConvertedCode(res.data.convertedCode);

  //     // Refresh History
  //     await loadHistory();
  //   } else {
  //     toast.error(res.data.message);
  //   }
  //     } catch (error) {
  //       toast.error("Translation failed.");
  //     }
  //     setLoading(false);
  //   };
  const convertCode = async () => {
    if (!sourceCode.trim()) {
      setConvertedCode("Please enter code.");
      return;
    }

    setLoading(true);
    try {
      //   const res = await axios.post(`${BASE_URL}/ai/get-response`, {
      // code: sourceCode,
      // sourceLang,
      // targetLang,
      //     header
      //   });

      const response = await fetch(`${BASE_URL}/ai/get-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },

        body: JSON.stringify({ code: sourceCode, sourceLang, targetLang }),
      });
      const ress = await response.json();
      console.log(ress);
      if (ress?.convertedCode) {
        setConvertedCode(ress.convertedCode);
        console.log("hi");
        // Refresh History
        await loadHistory();
      } else {
        toast.error(ress.message);
      }
      //   --------------------------
      //   setErrors(result.debuggedCode.identifiedErrors || []);
      //   setExplanation(result.debuggedCode.explanation || "");
      //   setFixedCode(result.debuggedCode.suggestedFix || "");
      //   console.log("DEBUG RESULT:", result);
      // } else {
      //   toast.error(result.message);
      // }
      // setActiveTab("errors"); // show identify errors by default
      // await loadPastReviews();
      // setLoading(false);    //   console.log(res.data);
      //   setConvertedCode(res.data.convertedCode);
    } catch (error) {
      toast.error("Translation failed.");
      setConvertedCode("Conversion failed.");
    }
    setLoading(false);
  };
  // Selecting a past history item
  function handleSelect(item) {
    setSelectedHistory(item);
    setSourceCode(item.code);
    setConvertedCode(item.convertedCode);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);

    setSidebarOpen(false);
  }

  // Delete translation
  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/translator/history/${id}`,
        { headers: { token } }
      );

      if (data.success) {
        await loadHistory();

        if (selectedHistory?.id === id) {
          setSelectedHistory(null);
          setSourceCode("");
          setConvertedCode("");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Start new blank translation
  function newSlide() {
    setSelectedHistory(null);
    setSourceCode("");
    setConvertedCode("");
    setSidebarOpen(false);
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="max-w-7xl mx-auto pt-28 px-4 py-0 space-y-4">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pastReviews={pastTranslations}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onNewSlide={newSlide}
      />

      {/* Mini Header */}
      <header
        className="fixed top-13 left-4 mr-1 bg-gray-500 text-white px-3 py-2 
        rounded-md shadow-md font-small flex items-center gap-3"
      >
        <button onClick={() => setSidebarOpen(true)} className="text-sm">
          Open History
        </button>
      </header>

      <div className="flex w-full h-[80vh] gap-4">
        {/* LEFT SIDE */}
        <div className="w-1/2 border border-grey-600 rounded-lg flex flex-col">
          {/* Language Selectors */}
          <div className="border-b border-gray-300 p-3 flex gap-4 bg-gray-100">
            <div className="flex flex-col">
              <label className="text-xs font-semibold">Source Language</label>
              <select
                value={sourceLang}
                className="border p-2 rounded"
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold">Target Language</label>
              <select
                value={targetLang}
                className="border p-2 rounded"
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <button
              onClick={convertCode}
              className="bg-blue-700 text-white px-4 py-2 h-fit mt-5 rounded-md"
            >
              {loading ? "Converting..." : "Convert"}
            </button>
          </div>

          {/* Code Input Editor */}
          <div className="flex-1 w-full overflow-auto p-2">
            <Editor value={sourceCode} onChange={setSourceCode} />
          </div>
        </div>

        {/* RIGHT SIDE OUTPUT */}
        <div className="w-1/2 flex flex-col border rounded-lg">
          <div className="p-3 border-b border-gray-300 bg-gray-50">
            <h2 className="font-semibold text-lg">Output ({targetLang})</h2>
          </div>

          <div className="flex-1 p-2 overflow-auto">
            <div
              className={`w-full h-full border text-slate-300 p-3 font-mono bg-black rounded-md ${
                loading ? "flex justify-center items-center" : ""
              }`}
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                <pre className="whitespace-pre-wrap text-white text-sm">
                  {convertedCode || "// Converted code will appear here"}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTranslatorDashboard;
