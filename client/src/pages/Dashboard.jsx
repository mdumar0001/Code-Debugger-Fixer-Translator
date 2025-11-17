// ====================================================================================================ye line uncomment karo

import React, { useEffect, useContext, useState } from "react";
import Editor from "../components/Editor";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AIControls from "../components/AIControls";
// import useAuth from "../hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";
const Dashboard = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AuthContext);
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  // RESULT STATES FROM BACKEND
  const [errors, setErrors] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [fixedCode, setFixedCode] = useState("");

  // TAB STATE
  const [activeTab, setActiveTab] = useState("errors"); // default tab

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [pastHistories, setPastHistories] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const languages = ["JavaScript", "Python", "C++", "Java"];

  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (token) loadPastReviews();
  }, [token]);

  async function loadPastReviews() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/history/past-histories`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      // console.log(data);
      if (data.success) {
        setPastHistories(data.list || []);
        // console.log("PAST REVIEWS:", data.list, pastHistories);
      }
    } catch (err) {
      console.error("loadPastReviews", err);
    }
  }

  const handleDebug = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/api/ai/debug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },

        body: JSON.stringify({ code, language: selectedLanguage }),
      });

      const result = await response.json();

      if (result?.debuggedCode) {
        setErrors(result.debuggedCode.identifiedErrors || []);
        setExplanation(result.debuggedCode.explanation || "");
        setFixedCode(result.debuggedCode.suggestedFix || "");
        console.log("DEBUG RESULT:", result);
      } else {
        toast.error(result.message);
      }
      setActiveTab("errors"); // show identify errors by default
      await loadPastReviews();
      setLoading(false);
    } catch (error) {
      console.log("DEBUG ERROR:", error);
      setLoading(false);
    }
  };

  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/history/delete-histories/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (data.success) {
        await loadPastReviews();
        // clear if selected
        if (selectedHistory?.id === id) {
          setSelectedHistory(null);
          setCode("");
          setExplanation("");
          setErrors([]);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  }
  function newSlide() {
    setSelectedHistory(null);
    setCode("");
    setExplanation("");
    setErrors([]);
    setSidebarOpen(false);
  }

  function handleSelect(item) {
    setSelectedHistory(item);
    setCode(item.code);
    setExplanation(item.debuggedCode?.explanation || "");
    setErrors(item.debuggedCode?.identifiedErrors || []);
    setFixedCode(item.debuggedCode?.suggestedFix || "");
    setActiveTab("errors");
    setSidebarOpen(false); // close sidebar optionally
  }
  // Decide what to show based on tab selection
  const renderOutput = () => {
    if (activeTab === "errors") {
      return errors.length ? errors.join("\n") : "No errors found.";
    }
    if (activeTab === "explanation") {
      return explanation || "No explanation available.";
    }
    if (activeTab === "fixed") {
      return fixedCode || "No fixed code available.";
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-4 pt-28">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pastReviews={pastHistories}
        onSelect={handleSelect}
        // onEdit={handleEdit}
        onDelete={handleDelete}
        onNewSlide={newSlide}
      />
      {/* FIXED MINI HEADER */}
      <header
        className="fixed top-13 left-4 mr-1 bg-gray-500 text-white 
px-3 py-2 rounded-md shadow-md font-small flex items-center gap-3"
      >
        <button onClick={() => setSidebarOpen(true)} className="text-sm">
          Open History
        </button>
      </header>

      <div className="flex w-full h-[80vh] gap-4">
        {/* LEFT SIDE */}
        <div className="w-1/2 border border-grey-600 rounded-lg flex flex-col">
          <div className="border-b border-gray-300">
            <AIControls
              onDebug={handleDebug}
              languages={languages}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              disabled={loading}
            />
          </div>

          <div className="flex-1 w-full overflow-auto p-2">
            <Editor value={code} onChange={setCode} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex flex-col border rounded-lg">
          {/* TABS */}
          <div className="flex justify-evenly gap-3 p-3 border-b border-gray-300 bg-gray-50">
            <button
              onClick={() => setActiveTab("errors")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "errors"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 text-white/80"
              }`}
            >
              Identify Errors
            </button>
            <button
              onClick={() => setActiveTab("fixed")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "fixed"
                  ? "bg-purple-700 text-white"
                  : "bg-purple-600 text-white/80"
              }`}
            >
              Fixed Code
            </button>
            <button
              onClick={() => setActiveTab("explanation")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "explanation"
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white/80"
              }`}
            >
              Explanation
            </button>
          </div>

          {/* OUTPUT BOX */}
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
                  {renderOutput()}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

//
