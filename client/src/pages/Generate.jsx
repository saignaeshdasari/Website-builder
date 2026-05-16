import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

import axios from "axios";
import { serverUrl } from "../App";
const PHASES = [
  "Analyzing your idea...",
  "Designing layout & structures",
  "Writing HTML & CSS...",
  "Adding animations & interactions",
  "Final quality checks...",
];

const Generate = () => {
  const navigate = useNavigate("");
  const [prompt, setPrompt] = useState("");
  const [Loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setphaseIndex] = useState(0);
  const [error,setError] = useState("")
  const handleGenrateWebsite = async () => {
    setLoading(true);
    try {
      console.log(prompt);

      const result = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt },
        { withCredentials: true },
      );
      console.log(result.data);
      setProgress(100);
      setLoading(false);
      navigate(`/editor/${result.data.websiteId}`);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || "something went wrong")
      console.log(error);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    if (!Loading) {
      setphaseIndex(0);
      setProgress(0);
      return;
    }

    let value = 0;
    let phase = 0;

    const interval = setInterval(() => {
      const increment =
        value < 20
          ? Math.random() * 20
          : value < 60
            ? Math.random() * 1.2
            : Math.random() * 0.6;
      value += increment;
      if (value >= 93) value = 93;

      phase = Math.min(
        Math.floor((value / 100) * PHASES.length),
        PHASES.length - 1,
      );
      setProgress(Math.floor(value));
      setphaseIndex(phase);
    }, 1200);

    return () => clearInterval(interval);
  }, [Loading]);
  return (
    <div className="min-h-screen bg-[#202940] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border border-white/15">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-bold">Buildweb.AI</h1>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build Websites with
            <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Real AI power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            This process may take several minutes. Buildweb.AI focuces on
            quality, not shortcuts.
          </p>
        </motion.div>
        <div className="m-14">
          <h1 className="text-xl font-semibold mb-2">Describe your website</h1>
          <div className="relative">
            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Describe your thoughts in detail !"
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
            ></textarea>
          </div>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}  
        </div>
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleGenrateWebsite}
            disabled={!prompt.trim() && !Loading}
            className={`px-14 py-4 rounded-2xl font-semibold text-lg ${prompt.trim() && !Loading ? "bg-white text-black" : "bg-white/20 text-zinc-400 cursor-not-allowed"}`}
          >
            Generate Website
          </motion.div>
        </div>

        {Loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-zinc-300">{PHASES[phaseIndex]}</p>
              <span className="text-sm font-semibold text-white">
                {progress}%
              </span>
            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.8 }}
              />
            </div>

            <div className="flex justify-between mt-4 text-xs text-zinc-500">
              {PHASES.map((phase, index) => (
                <span
                  key={index}
                  className={`transition ${
                    index <= phaseIndex ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generate;
