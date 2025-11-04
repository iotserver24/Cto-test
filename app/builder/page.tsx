"use client";

import { useState, useEffect, useRef } from "react";
import { WebContainer } from "@webcontainer/api";
import {
  getWebContainer,
  mountFiles,
  installDependencies,
  startDevServer,
} from "@/lib/webcontainer-service";

interface Message {
  role: "user" | "assistant";
  content: string;
  files?: Record<string, string>;
}

export default function BuilderPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [buildLog, setBuildLog] = useState<string[]>([]);
  const [currentFiles, setCurrentFiles] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize WebContainer
    const initContainer = async () => {
      try {
        const container = await getWebContainer();
        setWebContainer(container);
        addBuildLog("✓ WebContainer initialized");
      } catch (error) {
        addBuildLog(`✗ Failed to initialize WebContainer: ${error}`);
      }
    };
    initContainer();
  }, []);

  const addBuildLog = (message: string) => {
    setBuildLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const parseAIResponse = (response: string): { files?: Record<string, string>; message: string } => {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          files: parsed.files,
          message: parsed.message || response,
        };
      }
    } catch (e) {
      // If parsing fails, return the raw response
    }
    return { message: response };
  };

  const buildAndRunProject = async (files: Record<string, string>) => {
    if (!webContainer) {
      addBuildLog("✗ WebContainer not initialized");
      return;
    }

    try {
      addBuildLog("📦 Mounting files...");
      await mountFiles(webContainer, files);
      setCurrentFiles(files);
      addBuildLog("✓ Files mounted successfully");

      addBuildLog("📥 Installing dependencies...");
      await installDependencies(webContainer, (data) => {
        addBuildLog(data.trim());
      });
      addBuildLog("✓ Dependencies installed");

      addBuildLog("🚀 Starting dev server...");
      const url = await startDevServer(webContainer, (data) => {
        const line = data.trim();
        if (line) addBuildLog(line);
      });

      // Get the actual preview URL from WebContainer
      webContainer.on("server-ready", (port, url) => {
        setPreviewUrl(url);
        addBuildLog(`✓ Server ready at ${url}`);
      });
    } catch (error) {
      addBuildLog(`✗ Build failed: ${error}`);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      if (data.success) {
        const parsed = parseAIResponse(data.response);
        
        const assistantMessage: Message = {
          role: "assistant",
          content: parsed.message,
          files: parsed.files,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (parsed.files) {
          addBuildLog("🤖 AI generated files, starting build...");
          await buildAndRunProject(parsed.files);
        }
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Chat */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-xl font-bold text-white">AI Website Builder</h1>
          <p className="text-sm text-blue-100">Describe your website and watch it come to life</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-lg font-semibold mb-2">Start Building!</p>
              <p className="text-sm">
                Describe the website you want to create, and I'll build it for you.
              </p>
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg text-xs space-y-2">
                <p className="font-semibold">Example prompts:</p>
                <p>• "Create a landing page for a coffee shop"</p>
                <p>• "Build a portfolio website with a hero section"</p>
                <p>• "Make a todo app with a clean design"</p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.files && (
                  <div className="mt-2 text-xs opacity-75">
                    Generated {Object.keys(message.files).length} files
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe your website..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview and Logs */}
      <div className="flex-1 flex flex-col">
        {/* Preview */}
        <div className="flex-1 bg-white border-b border-gray-200">
          <div className="h-full flex flex-col">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Preview</span>
              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Open in new tab →
                </a>
              )}
            </div>
            <div className="flex-1 relative">
              {previewUrl ? (
                <iframe
                  ref={iframeRef}
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title="Preview"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👁️</div>
                    <p>Preview will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Build Logs */}
        <div className="h-48 bg-gray-900 text-gray-100 overflow-y-auto">
          <div className="p-3">
            <div className="text-xs font-mono space-y-1">
              {buildLog.length === 0 ? (
                <div className="text-gray-500">Waiting for build...</div>
              ) : (
                buildLog.map((log, index) => (
                  <div key={index} className="text-green-400">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
