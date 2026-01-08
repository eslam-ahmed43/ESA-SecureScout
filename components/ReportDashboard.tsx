
import React, { useState } from 'react';
import { SecurityReport, Language, Severity } from '../types';
import { UI_TEXT } from '../constants';
import { 
  AlertTriangle, CheckCircle, Terminal, Download, 
  ChevronDown, ChevronUp, Server, ExternalLink, 
  ShieldAlert, Activity, Copy, Check, Info, Layout, Zap, Eye,
  BookOpen, Sparkles
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface ReportDashboardProps {
  report: SecurityReport;
  lang: Language;
  onExplainVulnerability: (title: string) => void;
}

// Helper to copy text to clipboard
const CopyButton: React.FC<{ text: string; lang: Language }> = ({ text, lang }) => {
  const [copied, setCopied] = useState(false);
  const t = UI_TEXT[lang];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
      title={t.copyCode}
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );
};

const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const colors = {
    [Severity.CRITICAL]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    [Severity.HIGH]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    [Severity.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    [Severity.LOW]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    [Severity.INFO]: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[severity as Severity] || colors[Severity.INFO]}`}>
      {severity}
    </span>
  );
};

const VulnerabilityItem: React.FC<{ vul: any, lang: Language, onExplain: (t: string) => void }> = ({ vul, lang, onExplain }) => {
  const [expanded, setExpanded] = useState(false);
  const t = UI_TEXT[lang];

  return (
    <div className="mb-4 bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-200 dark:border-secondary-700 overflow-hidden transition-all hover:shadow-md hover:border-primary-500/30">
      <div 
        className="p-5 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`flex-shrink-0 p-2 rounded-lg ${
            vul.severity === Severity.CRITICAL ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 
            vul.severity === Severity.HIGH ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 
            vul.severity === Severity.MEDIUM ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600' :
            'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
          }`}>
            <ShieldAlert size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">{vul.title}</h3>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <SeverityBadge severity={vul.severity} />
              {vul.cwe && (
                <span className="hidden sm:flex items-center gap-1 text-xs bg-gray-100 dark:bg-secondary-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">
                  <ExternalLink size={10}/> {vul.cwe}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          {expanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-6 pt-2 bg-gray-50/50 dark:bg-secondary-800/50 border-t border-gray-100 dark:border-secondary-700 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.impact}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{vul.impact}</p>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{vul.description}</p>
               </div>
               {/* New Explain Button */}
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   onExplain(vul.title);
                 }}
                 className="mt-2 inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
               >
                 <Sparkles size={16} />
                 {t.explainBtn}
               </button>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                 <Terminal size={14} className="text-primary-500" />
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.fixRecommendation}</h4>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-700 shadow-inner relative group">
                <CopyButton text={vul.codeSnippet || vul.remediation} lang={lang} />
                <p className="text-gray-300 mb-3 text-xs leading-relaxed opacity-90">{vul.remediation}</p>
                {vul.codeSnippet && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <pre className="text-green-400 whitespace-pre-wrap break-all text-xs">
                      <code>{vul.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReportDashboard: React.FC<ReportDashboardProps> = ({ report, lang, onExplainVulnerability }) => {
  const [activeTab, setActiveTab] = useState<'security' | 'performance' | 'accessibility'>('security');
  const t = UI_TEXT[lang];

  // Chart Data
  const severityCount = report.vulnerabilities.reduce((acc, v) => {
    acc[v.severity] = (acc[v.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Critical', value: severityCount[Severity.CRITICAL] || 0, color: '#ef4444' },
    { name: 'High', value: severityCount[Severity.HIGH] || 0, color: '#f97316' },
    { name: 'Medium', value: severityCount[Severity.MEDIUM] || 0, color: '#eab308' },
    { name: 'Low', value: severityCount[Severity.LOW] || 0, color: '#3b82f6' },
  ].filter(d => d.value > 0);

  const downloadReport = () => {
    window.print();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
     if (score >= 90) return 'Excellent';
     if (score >= 70) return 'Good';
     if (score >= 50) return 'Fair';
     return 'Poor';
  };

  const improvements = report.improvements || [];
  const performanceItems = improvements.filter(i => i.category === 'Performance' || i.category === 'SEO');
  const accessItems = improvements.filter(i => i.category === 'Accessibility' || i.category === 'Best Practice');

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        
        {/* Score Gauge */}
        <div className="md:col-span-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-6 flex flex-col items-center justify-center relative overflow-hidden print:border-gray-300">
           <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider absolute top-6 left-6">{t.riskScore}</h3>
           
           <div className="relative mt-4">
             {/* Simple SVG Semi-circle gauge simulation */}
             <svg className="w-48 h-24 overflow-hidden" viewBox="0 0 200 100">
               <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="20" className="dark:stroke-secondary-700"/>
               <path 
                 d="M 20 100 A 80 80 0 0 1 180 100" 
                 fill="none" 
                 stroke={report.riskScore >= 80 ? '#22c55e' : report.riskScore >= 50 ? '#eab308' : '#ef4444'} 
                 strokeWidth="20"
                 strokeDasharray="251.2"
                 strokeDashoffset={251.2 - (251.2 * report.riskScore) / 100}
                 className="transition-all duration-1000 ease-out"
               />
             </svg>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                <div className={`text-5xl font-extrabold ${getScoreColor(report.riskScore)}`}>{report.riskScore}</div>
             </div>
           </div>
           <div className={`mt-4 px-3 py-1 rounded-full text-sm font-bold bg-gray-100 dark:bg-secondary-700 ${getScoreColor(report.riskScore)}`}>
              {getScoreLabel(report.riskScore)}
           </div>
        </div>

        {/* Tech Stack & Summary */}
        <div className="md:col-span-5 flex flex-col gap-6">
           {/* Tech Stack */}
           <div className="flex-1 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-bold">
                 <Server size={18} className="text-primary-500" />
                 {t.techStack}
              </div>
              <div className="flex flex-wrap gap-2">
                {report.techStackDetected.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-50 dark:bg-secondary-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-secondary-700 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
           </div>
           
           {/* Quick Stats */}
           <div className="flex-1 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700 p-6 flex justify-around items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{severityCount[Severity.CRITICAL] || 0}</div>
                <div className="text-xs text-gray-500 uppercase font-medium">Critical</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-secondary-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{severityCount[Severity.HIGH] || 0}</div>
                <div className="text-xs text-gray-500 uppercase font-medium">High</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-secondary-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{report.vulnerabilities.length}</div>
                <div className="text-xs text-gray-500 uppercase font-medium">Total</div>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-3 flex flex-col gap-4">
           <div className="flex-1 bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-2xl shadow-lg p-6 text-white flex flex-col justify-center items-center text-center">
              <ShieldAlert size={32} className="mb-2 text-primary-400" />
              <div className="text-sm text-gray-400 mb-1">Total Issues Found</div>
              <div className="text-3xl font-bold">{report.vulnerabilities.length + report.improvements.length}</div>
           </div>
           <button 
             onClick={downloadReport}
             className="w-full py-4 bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 rounded-xl hover:bg-gray-50 dark:hover:bg-secondary-700 text-gray-700 dark:text-gray-200 font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
           >
             <Download size={18} />
             {t.exportPdf}
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-secondary-700 mb-6 overflow-x-auto">
         <button 
           onClick={() => setActiveTab('security')}
           className={`pb-4 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === 'security' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           <ShieldAlert size={16} />
           {t.tabSecurity}
           <span className="ml-2 bg-gray-100 dark:bg-secondary-700 px-2 py-0.5 rounded-full text-xs text-gray-600 dark:text-gray-300">{report.vulnerabilities.length}</span>
         </button>
         <button 
           onClick={() => setActiveTab('performance')}
           className={`pb-4 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === 'performance' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           <Zap size={16} />
           {t.tabPerformance}
           <span className="ml-2 bg-gray-100 dark:bg-secondary-700 px-2 py-0.5 rounded-full text-xs text-gray-600 dark:text-gray-300">{performanceItems.length}</span>
         </button>
         <button 
           onClick={() => setActiveTab('accessibility')}
           className={`pb-4 px-6 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${activeTab === 'accessibility' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
         >
           <Eye size={16} />
           {t.tabAccessibility}
           <span className="ml-2 bg-gray-100 dark:bg-secondary-700 px-2 py-0.5 rounded-full text-xs text-gray-600 dark:text-gray-300">{accessItems.length}</span>
         </button>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          
          {activeTab === 'security' && (
            <div className="animate-fade-in">
              {report.vulnerabilities.length > 0 ? (
                report.vulnerabilities.map((vul) => (
                  <VulnerabilityItem key={vul.id} vul={vul} lang={lang} onExplain={onExplainVulnerability} />
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-secondary-800 rounded-xl border border-dashed border-gray-300 dark:border-secondary-700">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Vulnerabilities Detected</h3>
                  <p className="text-gray-500">Great job! The AI didn't find any obvious security flaws.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="animate-fade-in grid gap-4">
              {performanceItems.length > 0 ? performanceItems.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-secondary-800 p-5 rounded-xl border border-gray-200 dark:border-secondary-700 flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="text-yellow-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                    <div className="mt-2 inline-block px-2 py-1 bg-gray-100 dark:bg-secondary-700 text-xs font-medium rounded text-gray-600 dark:text-gray-300 uppercase">
                      {item.category}
                    </div>
                  </div>
                </div>
              )) : (
                 <div className="text-center py-12 text-gray-500">No performance suggestions available.</div>
              )}
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="animate-fade-in grid gap-4">
              {accessItems.length > 0 ? accessItems.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-secondary-800 p-5 rounded-xl border border-gray-200 dark:border-secondary-700 flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Eye className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                    <div className="mt-2 inline-block px-2 py-1 bg-gray-100 dark:bg-secondary-700 text-xs font-medium rounded text-gray-600 dark:text-gray-300 uppercase">
                      {item.category}
                    </div>
                  </div>
                </div>
              )) : (
                 <div className="text-center py-12 text-gray-500">No accessibility suggestions available.</div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Executive Summary</h3>
             <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
               {report.summary}
             </p>
           </div>
           
           <div className="bg-white dark:bg-secondary-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-secondary-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribution</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                 {chartData.map((d, i) => (
                   <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                     <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                     {d.name}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
