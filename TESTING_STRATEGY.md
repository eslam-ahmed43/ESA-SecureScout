
# Testing Strategy & QA Checklist

## 1. Functional Testing
- [ ] **Valid URL Scan**: Test with `https://example.com`. Verify report generation.
- [ ] **Invalid URL**: Test with `not_a_url` or `ftp://...`. Verify error message.
- [ ] **Empty Input**: Verify the "Scan" button is disabled.
- [ ] **Source Code Input**: Paste a snippet of HTML/JS code. Verify analysis works without network fetch.
- [ ] **Rate Limiting**: Attempt >5 scans in 1 minute. Verify "Rate limit exceeded" error overlay.
- [ ] **Cancel Scan**: Start scan and click "Cancel". Verify state resets immediately.

## 2. UI/UX & Responsive Design
- [ ] **Mobile View**: Open on iPhone/Android dimensions. Check Landing Page text scaling.
- [ ] **Dashboard Cards**: Ensure vulnerability cards stack correctly on mobile.
- [ ] **Dark Mode**: Toggle theme. Verify text contrast and chart colors update.
- [ ] **RTL Support**: Switch to Arabic. Verify layout flips (Mirror mode) and text alignment is Right-to-Left.

## 3. Performance
- [ ] **Lazy Loading**: Open Network tab. Verify `ReportDashboard` chunk is NOT loaded on initial page load.
- [ ] **Animation Smoothness**: Check the "Terminal" scroll and "Gauge" animation for jank.
- [ ] **Streaming**: Click "Explain with AI". Text should appear token-by-token, not in one big lump.

## 4. Security (Self-Audit)
- [ ] **XSS Check**: Input `<script>alert(1)</script>` as the URL. App should escape it and show error, not execute.
- [ ] **Localhost Block**: Try scanning `http://localhost:3000`. Should be blocked by validation utility.
- [ ] **API Key**: Ensure `API_KEY` is not hardcoded in the source code (check GitHub repo).

## 5. Browser Compatibility
- [ ] Google Chrome (Latest)
- [ ] Mozilla Firefox
- [ ] Safari (macOS/iOS)
- [ ] Microsoft Edge

## 6. Accessibility (a11y)
- [ ] **Keyboard Nav**: Can you Tab through the inputs and buttons?
- [ ] **Screen Reader**: Do the "Loading" states announce themselves?
- [ ] **Contrast**: Are the red/green badges readable against the background?
