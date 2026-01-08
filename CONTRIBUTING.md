
# Contributing to SecureScout

We welcome contributions to SecureScout! Whether it's fixing bugs, improving the documentation, or suggesting new features, your help is appreciated.

## Getting Started

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally.
    ```bash
    git clone https://github.com/your-username/securescout.git
    ```
3.  **Create a Branch** for your feature or fix.
    ```bash
    git checkout -b feature/amazing-feature
    ```

## Development Guidelines

*   **TypeScript**: We use strict TypeScript. Please ensure no `any` types are used unless absolutely necessary.
*   **Tailwind**: Use utility classes for styling. Avoid custom CSS files.
*   **Security**: If touching `geminiService.ts`, ensure you use `securityUtils` to validate inputs.
*   **AI Models**: Use `gemini-3-pro-preview` for complex reasoning tasks and `gemini-2.5-flash` for fast, simple tasks.

## Pull Request Process

1.  Ensure your code builds without errors (`npm run build`).
2.  Update the `README.md` if you changed functionality.
3.  Submit a Pull Request with a clear description of your changes.

Thank you for helping make the web more secure!
