import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateFangYuanResponse } from "./services/gemini";
import { insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message } = req.body;

      if (!sessionId || !message) {
        return res.status(400).json({ error: "Session ID and message are required" });
      }

      // Save user message
      await storage.saveChatMessage({
        sessionId,
        message,
        isUser: "true",
      });

      // Get conversation history for context
      const history = await storage.getChatHistory(sessionId);
      const conversationContext = history
        .slice(-6) // Last 6 messages for context
        .map(msg => `${msg.isUser === "true" ? "User" : "Fang Yuan"}: ${msg.message}`);

      // Generate AI response
      const aiResponse = await generateFangYuanResponse(message, conversationContext);

      // Save AI response
      const savedResponse = await storage.saveChatMessage({
        sessionId,
        message: aiResponse,
        isUser: "false",
      });

      res.json({ 
        response: aiResponse,
        messageId: savedResponse.id,
        timestamp: savedResponse.timestamp,
      });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        error: error.message || "The path to refinement is blocked. Try again." 
      });
    }
  });

  // Get chat history
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const history = await storage.getChatHistory(sessionId);
      res.json({ history });
    } catch (error) {
      console.error("Get history error:", error);
      res.status(500).json({ error: "Failed to retrieve conversation history" });
    }
  });

  // Clear chat history
  app.delete("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearChatHistory(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Clear history error:", error);
      res.status(500).json({ error: "Failed to clear conversation history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
