
# Security Policy for SecureScout

SecureScout is designed with a "Privacy First" architecture. As a security tool, we adhere to strict development and operational security standards.

## 🔒 Data Privacy & Handling
1.  **Client-Side Execution**: SecureScout runs primarily in the user's browser. The analysis request is sent directly from the client to the Google Gemini API.
2.  **No Data Retention**: We do not store scanned URLs, source code, or vulnerability reports on our servers. All state is ephemeral and exists only within the user's browser session.
3.  **Ephemeral Storage**: Rate limiting data is stored in the browser's `localStorage` and is never transmitted to us.

## 🛡️ Input Protection
*   **SSRF Protection**: The application includes strict regex filters to block scanning of private IP ranges (localhost, 127.0.0.1, 192.168.x.x, etc.) to prevent Server-Side Request Forgery attacks.
*   **Protocol Whitelisting**: Only `http:` and `https:` protocols are permitted. `file:`, `javascript:`, and `data:` URIs are blocked.
*   **Sanitization**: All user inputs are sanitized to prevent XSS (Cross-Site Scripting) within the application dashboard itself.

## 🌐 Content Security Policy (CSP)
We implement a strict CSP to mitigate XSS and injection attacks.
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self' https://generativelanguage.googleapis.com;">
```

## 🐛 Reporting Vulnerabilities
If you discover a security vulnerability in SecureScout, please do not disclose it publicly.
Email us at: security@securescout.demo

## ⚠️ Disclaimer
SecureScout is an automated analysis tool powered by AI. It generates probabilistic results and may produce false positives or false negatives. It is not a replacement for a professional human penetration test. **Always obtain permission before scanning websites you do not own.**
