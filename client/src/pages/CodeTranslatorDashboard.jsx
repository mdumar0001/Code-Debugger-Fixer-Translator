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
  const BASE_URL =
    "https://code-debugger-fixer-translator-2-backend.onrender.com";
  //const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [sourceLang, setSourceLang] = useState("Python");
  const [targetLang, setTargetLang] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  const [pastTranslations, setPastTranslations] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  async function loadHistory() {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/translator/history`, {
        headers: { token },
      });

      if (data.success) setPastTranslations(data.list || []);
    } catch (err) {
      console.error("LOAD HISTORY ERROR:", err);
    }
  }

  const convertCode = async () => {
    if (!sourceCode.trim()) return setConvertedCode("Please enter code.");

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/ai/get-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ code: sourceCode, sourceLang, targetLang }),
      });

      const res = await response.json();
      if (res?.convertedCode) {
        setConvertedCode(res.convertedCode);
        await loadHistory();
      } else toast.error(res.message);
    } catch (error) {
      toast.error("Translation failed.");
      setConvertedCode("Conversion failed.");
    }

    setLoading(false);
  };

  function handleSelect(item) {
    setSelectedHistory(item);
    setSourceCode(item.code);
    setConvertedCode(item.convertedCode);
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    setSidebarOpen(false);
  }

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

  function newSlide() {
    setSelectedHistory(null);
    setSourceCode("");
    setConvertedCode("");
    setSidebarOpen(false);
  }

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto pt-28 px-4 space-y-4">
      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pastReviews={pastTranslations}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onNewSlide={newSlide}
      />

      {/* HEADER — Desktop fixed | Mobile full width + normal */}
      <header
        className="
          bg-gray-500 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-3
          w-full mb-3
          lg:w-auto 
          lg:fixed lg:top-13 lg:left-4 lg:mr-1
        "
      >
        <button onClick={() => setSidebarOpen(true)} className="text-sm">
          Open History
        </button>
      </header>

      {/* MAIN LAYOUT: mobile = vertical, desktop = horizontal */}
      <div className="flex flex-col lg:flex-row w-full h-[80vh] gap-4">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 border rounded-lg flex flex-col">
          <div className="border-b border-gray-300 p-3 flex flex-wrap gap-4 bg-gray-100">
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

          <div className="flex-1 w-full overflow-auto p-2">
            <Editor
              value={sourceCode}
              onChange={setSourceCode}
              language={sourceLang}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col border rounded-lg">
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
