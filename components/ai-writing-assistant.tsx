"use client"

import * as React from "react"
import { FileText, Mail, Sparkles, Table, Presentation, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AIWritingAssistant() {
  const [selectedAction, setSelectedAction] = React.useState("translate")
  const [selectedTone, setSelectedTone] = React.useState("Professional")
  const [inputText, setInputText] = React.useState("")
  const [outputText, setOutputText] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [activeApp, setActiveApp] = React.useState("word")
  const [isOfficeInitialized, setIsOfficeInitialized] = React.useState(false)
  const [tokenUsage, setTokenUsage] = React.useState({ used: 0, total: 100000 })
  const [sessionTokens, setSessionTokens] = React.useState(0)

  // Expanded tone options grouped by category
  const toneOptions = {
    Professional: ["Formal", "Professional", "Academic", "Technical", "Legal", "Medical", "Scientific"],
    Business: ["Persuasive", "Confident", "Friendly Professional", "Executive Summary", "Sales Pitch", "Marketing"],
    Creative: ["Casual", "Conversational", "Enthusiastic", "Humorous", "Inspirational", "Storytelling"],
    Specialized: ["Simplified", "Instructional", "Diplomatic", "Empathetic", "Journalistic"],
  }

  // Initialize Office.js
  React.useEffect(() => {
    // In a real implementation, this would be:
    // Office.onReady((info) => {
    //   setIsOfficeInitialized(true);
    //   if (info.host === Office.HostType.Word) setActiveApp("word");
    //   if (info.host === Office.HostType.Excel) setActiveApp("excel");
    //   if (info.host === Office.HostType.PowerPoint) setActiveApp("powerpoint");
    //   if (info.host === Office.HostType.Outlook) setActiveApp("outlook");
    // });

    // For demo purposes:
    const timer = setTimeout(() => {
      setIsOfficeInitialized(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleActionChange = (value: string) => {
    setSelectedAction(value)
    setOutputText("")
  }

  const handleToneChange = (value: string) => {
    setSelectedTone(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const calculateTokens = (text: string) => {
    // Simple estimation: ~4 characters per token
    return Math.ceil(text.length / 4)
  }

  const getSelectedText = async () => {
    // In a real implementation, this would use Office.js API to get selected text
    // For example, in Word:
    // await Word.run(async (context) => {
    //   const range = context.document.getSelection();
    //   range.load("text");
    //   await context.sync();
    //   setInputText(range.text);
    // });

    // For demo purposes, we'll simulate getting text from the document
    setIsProcessing(true)
    setTimeout(() => {
      const sampleTexts = {
        word: "This is sample text from a Word document that needs translation.",
        excel: "Product sales increased by 15% in Q2 compared to Q1.",
        powerpoint: "Our company vision is to revolutionize the industry with innovative solutions.",
        outlook: "I'm writing to follow up on our previous discussion about the project timeline.",
        access: "Customer ID: 1052, Name: John Smith, Status: Active",
        publisher: "Our quarterly newsletter highlights the achievements of our team members.",
        onenote: "Meeting notes: Discuss project timeline, resource allocation, and next steps.",
      }
      setInputText(sampleTexts[activeApp as keyof typeof sampleTexts] || sampleTexts.word)
      setIsProcessing(false)
    }, 1000)
  }

  const insertTranslatedText = async () => {
    // In a real implementation, this would use Office.js API to insert text
    // For example, in Word:
    // await Word.run(async (context) => {
    //   const range = context.document.getSelection();
    //   range.insertText(outputText, "Replace");
    //   await context.sync();
    // });

    // For demo purposes, we'll simulate inserting text
    setIsProcessing(true)
    setTimeout(() => {
      setOutputText((prevOutput) => prevOutput + "\n\n✅ Successfully inserted into your document!")
      setIsProcessing(false)
    }, 1000)
  }

  const translateText = async () => {
    if (inputText.trim() === "") {
      setOutputText("Please enter or select text to translate.")
      return
    }

    setIsProcessing(true)

    // Calculate token usage
    const inputTokens = calculateTokens(inputText)

    // In a real implementation, this would call an AI translation service
    // For demo purposes, we'll simulate translation
    setTimeout(() => {
      let result = ""

      if (selectedAction === "grammar-fix") {
        result = `Grammar fixed version: "${inputText}"`
      } else if (selectedAction === "tone-changer") {
        result = `Rewritten in ${selectedTone} tone: "${inputText}"`
      } else if (selectedAction === "translate") {
        const languages = {
          word: "English (Professional)",
          excel: "English (Technical)",
          powerpoint: "English (Presentation)",
          outlook: "English (Business)",
          access: "English (Technical)",
          publisher: "English (Marketing)",
          onenote: "English (Concise)",
        }
        result = `Translated to ${languages[activeApp as keyof typeof languages] || "English"}: "${inputText}"`
      }

      // Estimate output tokens and update usage
      const outputTokens = calculateTokens(result)
      const totalTokensUsed = inputTokens + outputTokens

      setTokenUsage((prev) => ({
        ...prev,
        used: prev.used + totalTokensUsed,
      }))

      setSessionTokens((prev) => prev + totalTokensUsed)
      setOutputText(result)
      setIsProcessing(false)
    }, 1500)
  }

  const getButtonLabel = () => {
    switch (selectedAction) {
      case "grammar-fix":
        return "Check Grammar"
      case "tone-changer":
        return "Rewrite with Tone"
      case "translate":
        return "Translate & Make Professional"
      default:
        return "Process Text"
    }
  }

  const getAppIcon = () => {
    switch (activeApp) {
      case "word":
        return <FileText className="h-4 w-4" />
      case "excel":
        return <Table className="h-4 w-4" />
      case "powerpoint":
        return <Presentation className="h-4 w-4" />
      case "outlook":
        return <Mail className="h-4 w-4" />
      case "access":
        return <BarChart3 className="h-4 w-4" />
      case "publisher":
        return <FileText className="h-4 w-4" />
      case "onenote":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTokenUsagePercentage = () => {
    return (tokenUsage.used / tokenUsage.total) * 100
  }

  if (!isOfficeInitialized) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-white p-4">
        <div className="animate-pulse text-center">
          <Sparkles className="mx-auto h-8 w-8 text-blue-500" />
          <p className="mt-4 text-sm text-gray-600">Initializing Office Add-in...</p>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex h-full w-full flex-col bg-white">
        <Card className="flex h-full flex-col border-0 shadow-none">
          <CardHeader className="pb-2 pt-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <CardTitle className="text-xl font-semibold">Smart Translate Assistance</CardTitle>
              <CardDescription>Works across all Microsoft Office apps</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-3 px-4">
            <Tabs defaultValue={activeApp} onValueChange={setActiveApp} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="word">Word</TabsTrigger>
                <TabsTrigger value="excel">Excel</TabsTrigger>
                <TabsTrigger value="powerpoint">PPT</TabsTrigger>
                <TabsTrigger value="outlook">Outlook</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  {getAppIcon()}
                </div>
                <p className="text-sm font-medium">
                  Working with {activeApp.charAt(0).toUpperCase() + activeApp.slice(1)}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="action-select" className="text-sm font-medium text-gray-700">
                  Select Action
                </label>
                <Select value={selectedAction} onValueChange={handleActionChange}>
                  <SelectTrigger id="action-select" className="w-full">
                    <SelectValue placeholder="Choose an action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grammar-fix">Grammar Fix</SelectItem>
                    <SelectItem value="tone-changer">Tone Changer</SelectItem>
                    <SelectItem value="translate">Translate to English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedAction === "tone-changer" && (
                <div className="space-y-2">
                  <label htmlFor="tone-select" className="text-sm font-medium text-gray-700">
                    Choose Tone
                  </label>
                  <Select value={selectedTone} onValueChange={handleToneChange}>
                    <SelectTrigger id="tone-select" className="w-full">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(toneOptions).map(([category, tones]) => (
                        <SelectGroup key={category}>
                          <SelectLabel>{category}</SelectLabel>
                          {tones.map((tone) => (
                            <SelectItem key={tone} value={tone}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-text" className="text-sm font-medium text-gray-700">
                    Your Text
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getSelectedText}
                    disabled={isProcessing}
                    className="h-7 text-xs"
                  >
                    Get Selected Text
                  </Button>
                </div>
                <Textarea
                  id="input-text"
                  placeholder={`Enter text or select text in ${activeApp}...`}
                  className="min-h-[90px] resize-none"
                  value={inputText}
                  onChange={handleInputChange}
                />
              </div>

              <Button
                className="w-full"
                disabled={!selectedAction || inputText.trim() === "" || isProcessing}
                onClick={translateText}
              >
                {isProcessing ? "Processing..." : getButtonLabel()}
              </Button>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="output-text" className="text-sm font-medium text-gray-700">
                    AI Suggestions
                  </label>
                  {outputText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={insertTranslatedText}
                      disabled={isProcessing || !outputText}
                      className="h-7 text-xs"
                    >
                      Insert into Document
                    </Button>
                  )}
                </div>
                <Textarea
                  id="output-text"
                  className="min-h-[90px] resize-none bg-gray-50"
                  placeholder="AI suggestions will appear here..."
                  value={outputText}
                  readOnly
                />
              </div>

              <div className="space-y-1 rounded-md border border-gray-100 bg-gray-50 p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700">Token Usage</span>
                  <Badge variant="outline" className="text-xs font-normal">
                    {sessionTokens} tokens this session
                  </Badge>
                </div>
                <Progress value={getTokenUsagePercentage()} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {tokenUsage.used.toLocaleString()} / {tokenUsage.total.toLocaleString()} tokens used
                  </span>
                  <span className="text-xs text-gray-500">{Math.round(getTokenUsagePercentage())}%</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t px-4 py-2 text-center">
            <p className="text-xs text-gray-500 mx-auto">Compatible with Word, Excel, PowerPoint & Outlook</p>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}
