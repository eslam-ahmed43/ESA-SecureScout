
export enum Severity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  INFO = 'Info'
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  impact: string;
  remediation: string;
  codeSnippet?: string;
  cwe?: string; // Common Weakness Enumeration ID
}

export interface Improvement {
  category: 'Performance' | 'SEO' | 'Accessibility' | 'Best Practice';
  title: string;
  description: string;
}

export interface SecurityReport {
  scanId?: string;
  targetUrl: string;
  scanTimestamp: string;
  riskScore: number; // 0-100 (100 is secure, 0 is vulnerable)
  summary: string;
  vulnerabilities: Vulnerability[];
  improvements: Improvement[];
  techStackDetected: string[];
}

export interface WebsiteData {
  url?: string;
  html?: string;
  headers?: Record<string, string>;
  scripts?: string[];
  forms?: string[];
}

export type Language = 'en' | 'ar';

export interface ScanState {
  isScanning: boolean;
  progress: number;
  currentStep: number;
  report: SecurityReport | null;
  error: string | null;
}

export interface ScanStepData {
  label: string;
  subLabel: string;
}

export interface VulnerabilityExplanation {
  concept: string;
  technicalDetail: string;
  prevention: string;
}
