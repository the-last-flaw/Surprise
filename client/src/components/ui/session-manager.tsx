import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, Download, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface SessionManagerProps {
  sessionId: string;
  onNewSession: () => void;
  onClearHistory: () => void;
}

export function SessionManager({ sessionId, onNewSession, onClearHistory }: SessionManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleExportChat = async () => {
    try {
      const response = await fetch(`/api/chat/${sessionId}`);
      const data = await response.json();
      
      if (data.history && data.history.length > 0) {
        const chatContent = data.history
          .map((msg: any) => `${msg.isUser === "true" ? "You" : "Fang Yuan"}: ${msg.message}`)
          .join('\n\n');
        
        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `fang-yuan-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Chat Exported",
          description: "Your conversation has been saved to your downloads.",
        });
      } else {
        toast({
          title: "No History",
          description: "There's no conversation history to export.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export the conversation history.",
        variant: "destructive"
      });
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch(`/api/chat/${sessionId}`, { method: 'DELETE' });
      onClearHistory();
      toast({
        title: "History Cleared",
        description: "All conversation history has been removed.",
      });
    } catch (error) {
      toast({
        title: "Clear Failed",
        description: "Could not clear the conversation history.",
        variant: "destructive"
      });
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-6 left-6 z-50 w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300"
        >
          <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Button>
      </DropdownMenuTrigger>
      
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            asChild
            align="start"
            className="w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-yellow-400/20 dark:border-yellow-400/30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <DropdownMenuItem
                onClick={onNewSession}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <History className="w-4 h-4" />
                <span>New Session</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem
                onClick={handleExportChat}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Download className="w-4 h-4" />
                <span>Export Chat</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem
                onClick={handleClearHistory}
                className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}