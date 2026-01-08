
# SecureScout Testing Checklist

Use this checklist to verify the application before the final demo.

## ✅ Functional Tests
- [ ] **Valid URL Scan**: Input `https://example.com`. Verify scan completes and dashboard loads.
- [ ] **Source Code Scan**: Paste `<script>alert(1)</script>` into input. Verify scan analyzes it as code.
- [ ] **Input Validation**: Input `ftp://bad-url`. Verify "Invalid URL" error.
- [ ] **Rate Limiting**: Perform 6 scans rapidly. Verify the 6th is blocked with an error message.
- [ ] **Cancellation**: Start a scan and hit "Cancel". Verify UI resets.

## 🎨 UI/UX Tests
- [ ] **Responsive Mobile**: Check Landing Page on mobile width (375px). Text should not overflow.
- [ ] **Dark Mode**: Toggle theme. Ensure charts in Dashboard are readable in Dark Mode.
- [ ] **RTL (Arabic)**: Switch language to Arabic. Verify page direction flips and text aligns right.

## 🧠 AI Integration Tests
- [ ] **Reasoning**: Check that the report contains specific details about the site, not generic placeholders.
- [ ] **Streaming**: Click "Explain with AI". Verify text streams in token-by-token (typewriter effect).

## 🔒 Security Checks
- [ ] **Localhost Block**: Input `http://localhost:3000`. Should be blocked immediately.
- [ ] **API Key**: Ensure `.env` file is in `.gitignore` and not committed.

## 🚀 Performance
- [ ] **Load Time**: App should load in < 1.5 seconds.
- [ ] **Bundle Size**: Verify `ReportDashboard` is lazy-loaded (check Network tab in DevTools).
