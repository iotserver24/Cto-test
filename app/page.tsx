"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              AI Website Builder
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Build complete websites with the power of AI
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-600">
                  Leverages advanced AI to understand your requirements and generate code
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Instant Preview</h3>
                <p className="text-gray-600">
                  See your website come to life in real-time with live preview
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Full Customization</h3>
                <p className="text-gray-600">
                  Iterate and refine with conversational AI until it's perfect
                </p>
              </div>
            </div>

            <Link
              href="/builder"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Building →
            </Link>
          </div>

          <div className="bg-white/50 backdrop-blur rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">How it works</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">1️⃣</div>
                <p className="font-semibold">Describe</p>
                <p className="text-gray-600 text-xs">Tell the AI what you want</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">2️⃣</div>
                <p className="font-semibold">Generate</p>
                <p className="text-gray-600 text-xs">AI creates the code</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">3️⃣</div>
                <p className="font-semibold">Preview</p>
                <p className="text-gray-600 text-xs">See it running live</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl mb-2">4️⃣</div>
                <p className="font-semibold">Refine</p>
                <p className="text-gray-600 text-xs">Iterate until perfect</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-gray-500 text-sm">
            No login required • Powered by AI • Free to use
          </div>

          <div className="mt-4">
            <Link
              href="/chat-demo"
              className="text-sm text-blue-600 hover:underline"
            >
              View WhatsApp-style chat demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
