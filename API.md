
# Internal API Documentation

SecureScout operates as a client-side application that interfaces directly with the Google Gemini API. This document outlines the internal service methods used.

## Service: `geminiService.ts`

### `analyzeSecurity(input: string, lang: Language): Promise<SecurityReport>`

The core function that orchestrates the security scan.

*   **Input**:
    *   `input`: URL string (e.g., "https://example.com") or raw source code.
    *   `lang`: Target language ('en' | 'ar').
*   **Process**:
    1.  Validates input using `isValidUrl` or `isValidCodeSnippet`.
    2.  Checks client-side rate limits (Max 5/hour).
    3.  Constructs a sophisticated prompt using `promptService.ts`.
    4.  Calls `gemini-3-pro-preview` with `googleSearch` tool enabled (if URL).
    5.  Parses the JSON response.
*   **Returns**: A `SecurityReport` object containing vulnerabilities, scores, and improvements.

### `streamVulnerabilityExplanation(title: string, lang: Language): AsyncGenerator`

Streams a specialized explanation for the chat/educational modal.

*   **Model**: Uses `gemini-2.5-flash` for low-latency streaming.
*   **Output**: Yields markdown text chunks in real-time.

## Service: `promptService.ts`

### `generateAnalysisPrompt(data: WebsiteData, lang: Language): string`

Constructs the prompt sent to the LLM.

*   **Strategy**: Uses "Chain of Thought" prompting, asking the model to act as a "Cybersecurity Analyst".
*   **Structure**:
    *   System Instruction: Defines the JSON schema and persona.
    *   User Prompt: Contains the target URL/Code and specific analysis instructions (XSS, SQLi, etc.).

## Data Models

See `types.ts` for full TypeScript interfaces:
*   `SecurityReport`
*   `Vulnerability`
*   `ScanState`
