import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MysticalOrbProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  isThinking?: boolean;
}

export function MysticalOrb({ size = "md", className, isThinking = false }: MysticalOrbProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-full mystical-orb",
        sizeClasses[size],
        className
      )}
      animate={isThinking ? {
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
        opacity: [0.8, 1, 0.8]
      } : {
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: isThinking ? 2 : 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Core orb */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-80" />
      
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-30 animate-pulse-gold" />
      
      {/* Energy rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {isThinking && (
        <motion.div
          className="absolute inset-0 rounded-full border border-yellow-300 opacity-30"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
