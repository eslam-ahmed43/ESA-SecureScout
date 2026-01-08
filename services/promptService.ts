import { WebsiteData, Language } from '../types';

export const SYSTEM_INSTRUCTION = `
You are 'SecureScout Core', an expert cybersecurity analyst specialized in web application security. 
Your goal is to analyze the provided website data (URL or Source Code) for security vulnerabilities and provide detailed, actionable recommendations.

CORE RESPONSIBILITIES:
1. Analyze the target for technical vulnerabilities (XSS, SQLi, CSRF, etc.).
2. Evaluate security headers and configuration.
3. Assess code quality and best practices.
4. Provide severity scoring based on CVSS principles.
5. Generate clear, copy-pasteable code fixes.

OUTPUT FORMAT REQUIREMENTS:
- You must return a SINGLE valid JSON object.
- No markdown formatting outside the JSON structure (except for code snippets inside strings).
- Strictly follow the JSON schema provided in the user prompt.
- Language: English (unless specifically requested otherwise).
`;

/**
 * Generates a structured security analysis prompt based on the provided website data.
 * @param data The website data containing URL, HTML, etc.
 * @param lang The target language for the report.
 * @returns A formatted string prompt.
 */
export const generateAnalysisPrompt = (data: WebsiteData, lang: Language): string => {
  // Input Validation
  if (!data.url && !data.html) {
    throw new Error("Invalid Input: Prompt generation requires at least a URL or HTML content.");
  }

  const isUrlAnalysis = !!data.url;
  
  // Format complex objects for the prompt
  const formattedHeaders = data.headers ? JSON.stringify(data.headers, null, 2) : "Not Provided (Analyze via Tool/Default)";
  const formattedScripts = data.scripts ? data.scripts.join('\n') : "Not Provided";
  const formattedForms = data.forms ? data.forms.join('\n') : "Not Provided";
  
  const contentOrUrl = isUrlAnalysis ? data.url : "Source Code provided below";
  const htmlContext = data.html ? `\nHTML CONTENT SAMPLE:\n${data.html.substring(0, 5000)}${data.html.length > 5000 ? '...[truncated]' : ''}` : "";

  return `
    Perform a comprehensive security audit on the following target.

    TARGET DATA:
    URL: ${data.url || 'N/A (Source Code Analysis)'}
    Headers: ${formattedHeaders}
    Scripts: ${formattedScripts}
    Forms: ${formattedForms}
    ${htmlContext}

    ANALYSIS REQUIRED:
    Perform a deep security audit checking for:
    1. Cross-Site Scripting (XSS) vulnerabilities (Reflected, Stored, DOM-based)
    2. SQL Injection risks (if backend logic is visible or inferred)
    3. Cross-Site Request Forgery (CSRF) protection (anti-csrf tokens, SameSite cookies)
    4. Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
    5. Authentication and authorization flaws
    6. Insecure data transmission (HTTP vs HTTPS, weak ciphers)
    7. Outdated libraries or frameworks with known CVEs
    8. Information disclosure (stack traces, verbose errors)
    9. Clickjacking vulnerabilities
    10. Weak cryptography or secrets in code

    Also analyze:
    - Performance bottlenecks (large assets, render blocking)
    - SEO issues (meta tags, structure)
    - Accessibility problems (ARIA, contrast)

    OUTPUT FORMAT:
    Return a valid JSON object with this exact structure:
    {
      "riskScore": number (0-100, where 100 is perfectly secure),
      "summary": "Executive summary of the security posture",
      "techStackDetected": ["List", "of", "technologies"],
      "vulnerabilities": [
        {
          "id": "unique-id-1",
          "type": "Vulnerability Type",
          "severity": "Critical|High|Medium|Low|Info",
          "title": "Short descriptive title",
          "description": "Simple explanation of the flaw",
          "location": "Specific URL path, line number, or component",
          "impact": "Business and technical impact explanation",
          "remediation": "Step-by-step fix guide",
          "codeSnippet": "Code example showing the FIX (not the exploit)",
          "cwe": "CWE-ID (e.g., CWE-79)"
        }
      ],
      "improvements": [
        {
          "category": "Performance|SEO|Accessibility|Best Practice",
          "title": "Improvement Title",
          "description": "Description of the improvement"
        }
      ]
    }

    LANGUAGE INSTRUCTION:
    Output all natural language text in ${lang === 'ar' ? 'Arabic' : 'English'}.
    
    Think step-by-step. If analyzing a URL, use your browsing tools to verify headers and page structure. If analyzing code, strictly analyze the syntax and logic provided.
  `;
};
