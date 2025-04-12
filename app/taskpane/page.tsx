'use client';

import { useState } from 'react';

declare const Word: {
  run: (callback: (context: {
    document: {
      getSelection: () => {
        load: (param: string) => void;
        text: string;
      };
    };
    sync: () => Promise<void>;
  }) => Promise<void>) => Promise<void>;
};

export default function Taskpane() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  const getSelectedText = async () => {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.load('text');
        await context.sync();
        setText(selection.text.trim());
      });
    } catch (error) {
      console.error('Error getting selected text:', error);
    }
  };

  const handleTranslate = async () => {
    if (!text) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      setTranslation(data.result);
      setTokenCount(prev => prev + 1);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('Error occurred during translation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smart Translate Assistance</h1>
      <p className="mb-4">Works across all Microsoft Office apps</p>
      
      <div className="flex gap-2 mb-4">
        <button className="px-2 py-1 bg-gray-200 rounded">Word</button>
        <button className="px-2 py-1 bg-gray-200 rounded">Excel</button>
        <button className="px-2 py-1 bg-gray-200 rounded">PPT</button>
        <button className="px-2 py-1 bg-gray-200 rounded">Outlook</button>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Working with Word</h2>
        <div className="flex gap-2 mb-2">
          <select className="border p-1 rounded" defaultValue="en">
            <option value="en">Translate to English</option>
          </select>
          <button 
            onClick={getSelectedText}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get Selected Text
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or select text in word..."
          className="w-full p-2 border rounded mb-2 h-24"
        />

        <button
          onClick={handleTranslate}
          disabled={isLoading || !text}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {isLoading ? 'Translating...' : 'Translate & Make Professional'}
        </button>
      </div>

      {translation && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">AI Suggestions</h3>
          <div className="p-3 bg-gray-50 rounded border">
            {translation}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <h3 className="font-semibold mb-1">Token Usage</h3>
        <p>{tokenCount} tokens this session</p>
        <p>0 / 100,000 tokens used0%</p>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Compatible with Word, Excel, PowerPoint & Outlook
      </p>
    </div>
  );
}
  