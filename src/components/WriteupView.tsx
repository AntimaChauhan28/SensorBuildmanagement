import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  BookOpen, 
  ChevronRight,
  TrendingDown,
  Shield,
  Zap
} from 'lucide-react';
import { SOLUTION_WRITEUP, SolutionSection } from '../data/solutionWriteup';

export const WriteupView: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(SOLUTION_WRITEUP[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSection = SOLUTION_WRITEUP.find(s => s.id === activeSectionId) || SOLUTION_WRITEUP[0];

  const handleCopyMarkdown = () => {
    let fullMarkdown = `# UrjaSetu: AI-Driven Energy Orchestration & Digital Twin for Indian Building Stock\n`;
    fullMarkdown += `*A Turnkey Retrofit Platform for Commercial Facilities across 5 Indian Climate Zones*\n\n`;

    SOLUTION_WRITEUP.forEach(sec => {
      fullMarkdown += `## ${sec.title}\n### ${sec.subtitle}\n\n`;
      sec.content.forEach(p => {
        fullMarkdown += `${p}\n\n`;
      });

      if (sec.formulas) {
        fullMarkdown += `#### Mathematical Formulations:\n`;
        sec.formulas.forEach(f => {
          fullMarkdown += `**${f.name}**:\n\`\`\`latex\n${f.latex}\n\`\`\`\n*${f.explanation}*\n\n`;
        });
      }

      if (sec.tables) {
        fullMarkdown += `#### Performance & Data Metrics:\n`;
        fullMarkdown += `| ${sec.tables.headers.join(' | ')} |\n`;
        fullMarkdown += `| ${sec.tables.headers.map(() => '---').join(' | ')} |\n`;
        sec.tables.rows.forEach(r => {
          fullMarkdown += `| ${r.join(' | ')} |\n`;
        });
        fullMarkdown += `\n`;
      }

      fullMarkdown += `**Key Highlights:**\n`;
      sec.keyTakeaways.forEach(k => {
        fullMarkdown += `- ${k}\n`;
      });
      fullMarkdown += `\n---\n\n`;
    });

    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Dossier Header & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Official Submission Write-Up & Technical Dossier
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Comprehensive whitepaper covering physics modeling, ECBC climate fit, DISCOM integration, and audited financial feasibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Dossier!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Layout: Sidebar TOC + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table of Contents (Left 4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs sticky top-20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2 font-mono">
            Dossier Chapters (7 Sections)
          </h3>
          <div className="space-y-1">
            {SOLUTION_WRITEUP.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeSectionId === sec.id
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-2">{sec.title}</span>
                <ChevronRight className={`h-3.5 w-3.5 shrink-0 ${activeSectionId === sec.id ? 'text-emerald-700 font-bold' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 px-2 text-[11px] text-slate-500">
            <span>Complies with BEE ECBC 2017 & ASHRAE 90.1 standard reporting formats.</span>
          </div>
        </div>

        {/* Active Section Content (Right 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header of Active Section */}
          <div className="pb-4 border-b border-slate-200">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
              {activeSection.badge}
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-2 mb-1">
              {activeSection.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              {activeSection.subtitle}
            </p>
          </div>

          {/* Prose Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {activeSection.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Mathematical Formulations if present */}
          {activeSection.formulas && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Mathematical Modeling & Physical Laws
              </h3>
              {activeSection.formulas.map((f, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-900">{f.name}</div>
                  <div className="py-2.5 px-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-mono text-emerald-800 font-semibold overflow-x-auto shadow-2xs">
                    {f.latex}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">{f.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tables if present */}
          {activeSection.tables && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Verified Benchmark Data & Savings
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-mono font-bold">
                    <tr>
                      {activeSection.tables.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                    {activeSection.tables.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
            <h4 className="text-xs font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-emerald-600" />
              Key Takeaways for Evaluation Jury
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {activeSection.keyTakeaways.map((k, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
