import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typewriter } from "@/components/ui/typewriter";
import { MysticalOrb } from "@/components/ui/mystical-orb";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  sessionId: string;
  initialMessage: string;
  onBack?: () => void;
}

export function ChatInterface({ sessionId, initialMessage, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: initialMessage,
      isUser: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Send initial message to get first AI response
    if (messages.length === 1 && messages[0].isUser) {
      handleSendMessage(initialMessage, false);
    }
  }, []);

  const handleSendMessage = async (message: string = inputValue, addUserMessage: boolean = true) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    if (addUserMessage) {
      setMessages(prev => [...prev, userMessage]);
    }
    
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", {
        sessionId,
        message: message.trim()
      });

      const data = await response.json();
      
      setIsLoading(false);
      setIsTyping(true);

      // Add AI message with typewriter effect
      const aiMessage: Message = {
        id: data.messageId,
        text: data.response,
        isUser: false,
        timestamp: new Date(data.timestamp)
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Communication Failed",
        description: error.message || "The heavens are silent. Try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Chat Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-lg border border-yellow-400/20 rounded-full px-6 py-3"
        >
          <MysticalOrb size="sm" isThinking={isLoading} />
          <span className="text-gray-900 font-medium tracking-wide">Fang Yuan</span>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse-gold" />
        </motion.div>
      </div>

      {/* Messages Container */}
      <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-2xl px-6 py-4 rounded-2xl backdrop-blur-md border",
                  message.isUser
                    ? "bg-gray-900/80 border-gray-700/30 rounded-br-md text-white"
                    : "bg-white/90 border-yellow-400/30 rounded-bl-md text-gray-900"
                )}
              >
                {message.isUser ? (
                  <p className="font-light">{message.text}</p>
                ) : (
                  <div className="flex items-start space-x-3">
                    <MysticalOrb size="sm" className="mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      {index === messages.length - 1 && isTyping ? (
                        <Typewriter
                          text={message.text}
                          speed={30}
                          onComplete={() => setIsTyping(false)}
                          className="font-light leading-relaxed"
                        />
                      ) : (
                        <p className="font-light leading-relaxed">
                          {message.text}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/90 backdrop-blur-md border border-yellow-400/30 rounded-2xl rounded-bl-md px-6 py-4">
              <div className="flex items-center space-x-3">
                <MysticalOrb size="sm" isThinking />
                <span className="text-gray-700 font-light animate-pulse">
                  Refining your essence...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-2xl blur-sm opacity-10" />
        <div className="relative bg-white/80 backdrop-blur-lg border border-yellow-400/20 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Continue your refinement..."
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 border-none focus:ring-0 text-lg"
              disabled={isLoading || isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading || isTyping}
              className="bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-600 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Back Button */}
      {onBack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Begin New Refinement
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
