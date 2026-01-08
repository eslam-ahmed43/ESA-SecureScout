
import { GoogleGenAI } from "@google/genai";
import { SecurityReport, Language, WebsiteData } from "../types";
import { generateAnalysisPrompt, SYSTEM_INSTRUCTION } from "./promptService";
import { isValidUrl, isValidCodeSnippet, sanitizeInput } from "../utils/securityUtils";

// Initialize the client
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

// --- Rate Limiting Logic (Simulating Backend Middleware) ---
const MAX_SCANS_PER_HOUR = 5;
const RATE_LIMIT_KEY = 'secure_scout_rate_limit';

const checkRateLimit = () => {
  const now = Date.now();
  const historyRaw = localStorage.getItem(RATE_LIMIT_KEY);
  let history: number[] = historyRaw ? JSON.parse(historyRaw) : [];
  
  // Filter out timestamps older than 1 hour
  history = history.filter(timestamp => now - timestamp < 3600000);
  
  if (history.length >= MAX_SCANS_PER_HOUR) {
    throw new Error(`Rate limit exceeded. Maximum ${MAX_SCANS_PER_HOUR} scans per hour allowed.`);
  }
  
  history.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
};

// --- Helper to extract JSON from Markdown response ---
const extractJson = (text: string): any => {
  try {
    // Attempt to find JSON blob between markdown code blocks
    const match = text.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      return JSON.parse(match[1]);
    }
    // Fallback: try parsing the whole text if it's raw JSON
    return JSON.parse(text);
  } catch (e) {
    console.error("JSON Parsing failed:", e);
    throw new Error("Failed to parse security report. Content was not valid JSON.");
  }
};

export const analyzeSecurity = async (input: string, lang: Language): Promise<SecurityReport> => {
  // 1. Enforce Rate Limiting
  checkRateLimit();

  const isUrl = input.trim().startsWith('http');
  
  // 2. Security Validation
  if (isUrl) {
    if (!isValidUrl(input)) {
      throw new Error("Invalid URL. Please use a valid public HTTP/HTTPS URL. Localhost and private IPs are blocked for security.");
    }
  } else {
    if (!isValidCodeSnippet(input)) {
      throw new Error("Invalid input. Code snippet is too large or empty.");
    }
  }

  // 3. Prepare Website Data
  const websiteData: WebsiteData = {};
  const sanitizedInput = sanitizeInput(input);
  
  if (isUrl) {
    websiteData.url = input; // Use original URL for fetch, sanitized not needed for URL object itself usually, but be careful in prompt
  } else {
    websiteData.html = sanitizedInput;
  }

  // 4. Generate the Prompt
  const prompt = generateAnalysisPrompt(websiteData, lang);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // We use Google Search for grounding (simulating fetch & analysis) if it is a URL
        tools: isUrl ? [{ googleSearch: {} }] : [],
        thinkingConfig: { thinkingBudget: 2048 },
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI Engine");
    
    const data = extractJson(text);
    
    return {
      scanId: crypto.randomUUID(),
      targetUrl: isUrl ? input : 'Source Code Snippet',
      scanTimestamp: new Date().toISOString(),
      riskScore: data.riskScore || 0,
      summary: data.summary || "Analysis complete.",
      vulnerabilities: data.vulnerabilities || [],
      improvements: data.improvements || [],
      techStackDetected: data.techStackDetected || []
    } as SecurityReport;

  } catch (error: any) {
    console.error("SecureScout Engine Failed:", error);
    
    if (error.message.includes("Rate limit")) {
      throw error;
    }
    
    throw new Error(lang === 'ar' 
      ? "فشل في إنشاء التقرير الأمني. يرجى المحاولة مرة أخرى." 
      : "Failed to generate security report. " + (error.message || "Please check the URL or try again later.")
    );
  }
};

/**
 * Streams an educational explanation for a specific vulnerability.
 * This demonstrates Gemini's streaming capabilities.
 */
export const streamVulnerabilityExplanation = async function* (vulnerabilityTitle: string, lang: Language) {
  const prompt = `
    Explain the web security vulnerability "${vulnerabilityTitle}" to a junior developer.
    Language: ${lang === 'ar' ? 'Arabic' : 'English'}
    
    Structure your response with Markdown:
    ## What is it?
    (Simple explanation)
    
    ## How it works
    (Technical detail)
    
    ## Prevention
    (Best practices)
    
    Keep it concise but educational.
  `;

  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash', // Fast model for interactive streaming
      contents: prompt,
    });

    for await (const chunk of responseStream) {
      yield chunk.text;
    }
  } catch (e) {
    console.error("Streaming failed", e);
    yield lang === 'ar' ? "فشل في تحميل الشرح." : "Failed to load explanation.";
  }
};
