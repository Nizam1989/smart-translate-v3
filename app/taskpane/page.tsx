"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function Taskpane() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [action, setAction] = useState("translate");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleGetSelected = async () => {
    try {
      // @ts-ignore
      const Office = window.Office;
      if (Office) {
        Office.context.document.getSelectedDataAsync(
          Office.CoercionType.Text,
          (result: any) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              setText(result.value);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error getting selected text:", error);
    }
  };

  const handleInsert = async () => {
    try {
      // @ts-ignore
      const Office = window.Office;
      if (Office && result) {
        Office.context.document.setSelectedDataAsync(
          result,
          { coercionType: Office.CoercionType.Text },
          (asyncResult: any) => {
            if (asyncResult.status === Office.AsyncResultStatus.Failed) {
              console.error("Error:", asyncResult.error.message);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error inserting text:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Smart Translate</h2>
        
        <div className="space-y-4">
          <Select value={action} onValueChange={setAction}>
            <SelectTrigger>
              <SelectValue placeholder="Select Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="translate">Translate to English</SelectItem>
              <SelectItem value="grammar">Fix Grammar</SelectItem>
              <SelectItem value="rewrite">Rewrite & Improve</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <Textarea
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleGetSelected} 
              variant="outline" 
              className="w-full"
            >
              Get Selected Text
            </Button>
          </div>

          <Button 
            onClick={handleAction} 
            className="w-full"
            disabled={!text || isLoading}
          >
            {isLoading ? "Processing..." : "Process Text"}
          </Button>

          {result && (
            <div className="space-y-2">
              <Textarea
                value={result}
                readOnly
                className="min-h-[100px]"
              />
              <Button 
                onClick={handleInsert}
                variant="secondary"
                className="w-full"
              >
                Insert Result
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
  