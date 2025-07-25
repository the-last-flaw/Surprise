import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MessageReactionsProps {
  messageText: string;
  isVisible: boolean;
}

export function MessageReactions({ messageText, isVisible }: MessageReactionsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied",
        description: "Message copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy message to clipboard.",
        variant: "destructive"
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center space-x-1 mt-2"
    >
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {copied ? (
          <CheckCheck className="w-3 h-3" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </Button>
    </motion.div>
  );
}