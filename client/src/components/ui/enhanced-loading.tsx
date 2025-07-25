import { motion } from "framer-motion";
import { MysticalOrb } from "@/components/ui/mystical-orb";

const LOADING_TEXTS = [
  "Refining your essence...",
  "Consulting ancient wisdom...",
  "Calculating optimal paths...",
  "Analyzing strategic options...",
  "Weaving mystical insights..."
];

interface EnhancedLoadingProps {
  className?: string;
}

export function EnhancedLoading({ className = "" }: EnhancedLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`text-center ${className}`}
    >
      <div className="mb-6 relative">
        <MysticalOrb size="lg" isThinking className="mx-auto" />
        
        {/* Floating particles around the orb */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [0, Math.cos(i * 72 * Math.PI / 180) * 60],
              y: [0, Math.sin(i * 72 * Math.PI / 180) * 60],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div
        key={Math.floor(Date.now() / 3000) % LOADING_TEXTS.length}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-yellow-400 dark:text-yellow-300 font-light text-lg"
      >
        {LOADING_TEXTS[Math.floor(Date.now() / 3000) % LOADING_TEXTS.length]}
      </motion.div>
      
      {/* Progress dots */}
      <div className="flex justify-center space-x-1 mt-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-yellow-400/50 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}