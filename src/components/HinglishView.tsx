import React, { useState } from 'react';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Play,
  Pause,
  Clock
} from 'lucide-react';
import { HINGLISH_SECTIONS, TWO_MINUTE_PITCH_SCRIPT } from '../data/hinglishContent';

export const HinglishView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'script' | 'faq'>('explanation');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Web Speech API text-to-speech for Hinglish pitch
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const fullText = TWO_MINUTE_PITCH_SCRIPT.dialogue.map(d => d.hindi).join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopyPitch = () => {
    let text = `${TWO_MINUTE_PITCH_SCRIPT.title.toUpperCase()}\n`;
    text += `Duration: ${TWO_MINUTE_PITCH_SCRIPT.duration}\n\n`;

    TWO_MINUTE_PITCH_SCRIPT.dialogue.forEach(d => {
      text += `--- ${d.speaker} ---\n`;
      text += `[Hindi / Hinglish]:\n${d.hindi}\n\n`;
      text += `[English Translation]:\n${d.english}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Languages className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Hinglish Explanation & Practical Pitch Blueprint
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Aam bhasha me samjho: Indian buildings me bijli kyu waste hoti hai, UrjaSetu kaise theek karta hai, aur jury ke samne kya bolna hai.
          </p>
        </div>

        {/* View Switcher: Chapters vs 2-Min Pitch Script */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs ${
              activeTab === 'explanation'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            Core Concepts
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs ${
              activeTab === 'script'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            2-Min Pitch Script
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs ${
              activeTab === 'faq'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            Jury Q&A (Hinglish)
          </button>
        </div>
      </div>

      {/* TAB 1: Core Concepts in Hinglish */}
      {activeTab === 'explanation' && (
        <div className="space-y-6">
          {HINGLISH_SECTIONS.map((sec) => (
            <div key={sec.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{sec.titleHindi}</h3>
                  <div className="text-xs text-amber-700 font-mono font-semibold">{sec.titleEnglish}</div>
                </div>
              </div>

              {/* Simple Conversational Explanation */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-2xs">
                <span className="font-bold text-amber-900">Saral Shabdon Mein: </span>
                {sec.simpleExplanation}
              </div>

              {/* Key Technical Points in Hinglish */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700">Asli Ground Facts (Ground Reality):</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sec.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tough Jury Question & Winning Answer */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                  <HelpCircle className="h-4 w-4 text-emerald-700" />
                  <span>{sec.juryQuestion}</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed italic">
                  {sec.winningAnswerHinglish}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Ready-to-Deliver 2-Minute Elevator Pitch Script */}
      {activeTab === 'script' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900">{TWO_MINUTE_PITCH_SCRIPT.title}</h3>
              </div>
              <p className="text-xs text-slate-500">
                Target Timing: 120 Seconds | Designed to impress Hackathon Juries & Investors
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isPlayingAudio ? 'Stop Speech' : 'Listen Pitch Audio'}</span>
              </button>

              <button
                onClick={handleCopyPitch}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
              >
                {copiedPitch ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPitch ? 'Copied Script!' : 'Copy Script'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {TWO_MINUTE_PITCH_SCRIPT.dialogue.map((part, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-amber-800 px-2 py-0.5 rounded bg-amber-100 border border-amber-300">
                    {part.speaker}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">Step {idx + 1} of 4</span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-700 font-bold block text-[11px] mb-1 uppercase font-mono">Hinglish Pitch Voice:</span>
                    "{part.hindi}"
                  </div>

                  <div className="text-xs text-slate-600 italic px-2">
                    <span className="text-slate-500 font-sans not-italic font-medium">English Meaning: </span>
                    "{part.english}"
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
            <strong>Pro-Tip for Stage Presentation:</strong> Shuruwat me seedha technical buzzwords mat boliye. Pehle unhe June ki dhoop me office me sweater pehenne wala relatable example dijiye. Jury turant muskurayegi aur poora dhyaan aapke solution par aayega!
          </div>
        </div>
      )}

      {/* TAB 3: Tough Jury Questions in Hinglish */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Top 4 Cross-Questions by Hackathon & Grant Juries
            </h3>
            <p className="text-xs text-slate-500">
              In sawaalon ko pehle se prepare karke jayein taaki stage par answer dete waqt aapka confidence 100% solid rahe.
            </p>
          </div>

          {HINGLISH_SECTIONS.map((sec, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-amber-900 font-bold px-2 py-0.5 rounded bg-amber-100 border border-amber-300 shrink-0">
                  Q{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {sec.juryQuestion.replace('Jury Question: ', '')}
                </h4>
              </div>

              <div className="pl-8 pt-2 border-t border-slate-100">
                <div className="text-xs text-emerald-800 font-mono mb-1 font-bold">
                  Winning Hinglish Response:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {sec.winningAnswerHinglish.replace('Answer: ', '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
