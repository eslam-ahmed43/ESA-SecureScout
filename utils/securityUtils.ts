
/**
 * Security Utility Functions for SecureScout
 * Handles input validation, sanitization, and SSRF prevention.
 */

// Block private/local IP ranges to prevent SSRF
const PRIVATE_IP_REGEX = /^(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|0\.|169\.254\.)/;

// Allowed protocols
const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Validates if a URL is safe to scan.
 * Checks for: Valid format, Allowed protocols, and Blocked private IPs.
 */
export const isValidUrl = (input: string): boolean => {
  try {
    const url = new URL(input);

    // 1. Protocol Whitelist
    if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
      return false;
    }

    // 2. SSRF Prevention (Private IP blocking)
    if (PRIVATE_IP_REGEX.test(url.hostname)) {
      return false;
    }

    return true;
  } catch (e) {
    // Not a valid URL format
    return false;
  }
};

/**
 * Sanitizes user input to prevent XSS when rendering raw text.
 * Note: React handles most XSS by default, but this is useful for raw data handling.
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Validates if the input code snippet is safe to process (length limits).
 */
export const isValidCodeSnippet = (input: string): boolean => {
  if (!input || input.trim().length === 0) return false;
  // Limit to 50KB to prevent DoS via massive payloads
  if (input.length > 50000) return false;
  return true;
};
