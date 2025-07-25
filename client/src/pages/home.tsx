import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { MysticalOrb } from "@/components/ui/mystical-orb";
import { ChatInterface } from "@/components/ui/chat-interface";

const WHISPER_TEXTS = [
  "Patience is for the weak.",
  "Everything is a resource.",
  "Refine. Replace. Rise."
];

type State = "input" | "loading" | "chat";

export default function Home() {
  const [state, setState] = useState<State>("input");
  const [inputValue, setInputValue] = useState("");
  const [sessionId] = useState(() => Date.now().toString());
  const [initialMessage, setInitialMessage] = useState("");

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setInitialMessage(inputValue.trim());
      setState("loading");
      
      // Simulate mystical processing time
      setTimeout(() => {
        setState("chat");
      }, 3000);
    }
  };

  const handleBackToInput = () => {
    setState("input");
    setInputValue("");
    setInitialMessage("");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-yellow-50/30 to-white">
      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 8
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-12 pb-8 text-center"
        >
          <div className="mb-4">
            <MysticalOrb size="md" className="mx-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
            Refine{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              Heaven
            </span>
          </h1>
          <p className="text-gray-600 text-lg font-light tracking-wider">
            Forge Your Path. No Mercy. Just Progress.
          </p>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <AnimatePresence mode="wait">
            {state === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl mx-auto"
              >
                {/* Central Input Field */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-2xl blur-sm opacity-50" />
                  <div className="relative bg-white/80 backdrop-blur-lg border border-yellow-400/20 rounded-2xl p-8 shadow-2xl">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleSubmit}
                      placeholder="What do you seek to refine?"
                      className="w-full bg-transparent text-gray-900 text-xl md:text-2xl font-light placeholder-gray-500 border-none focus:ring-0 focus:placeholder-transparent transition-all duration-300"
                      autoComplete="off"
                      autoFocus
                    />
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-70" />
                  </div>
                </div>

                {/* Whispered Suggestions */}
                <div className="text-center space-y-4">
                  {WHISPER_TEXTS.map((text, index) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 + index * 2, duration: 0.8 }}
                      className="text-gray-500 font-light italic whisper-text"
                    >
                      "{text}"
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 8, duration: 0.8 }}
                  className="text-center mt-12"
                >
                  <div className="text-gray-400 text-sm font-light">
                    Press Enter to begin your refinement
                  </div>
                </motion.div>
              </motion.div>
            )}

            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="mb-6">
                  <MysticalOrb size="lg" isThinking className="mx-auto" />
                </div>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-yellow-400 font-light text-lg"
                >
                  Refining your essence...
                </motion.p>
              </motion.div>
            )}

            {state === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <ChatInterface
                  sessionId={sessionId}
                  initialMessage={initialMessage}
                  onBack={handleBackToInput}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center text-gray-400 text-sm py-6 font-light"
        >
          <p>© 2024 Refine Heaven • Powered by Ancient Wisdom</p>
        </motion.footer>
      </div>
    </div>
  );
}
