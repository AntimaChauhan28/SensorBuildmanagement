import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles, 
  Tv, 
  Volume2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { PPT_SLIDES } from '../data/pptDeckData';
import { PptSlide } from '../types';

export const PptDeckView: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [showHinglishTip, setShowHinglishTip] = useState<boolean>(true);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedSingle, setCopiedSingle] = useState<boolean>(false);

  const activeSlide: PptSlide = PPT_SLIDES[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex(prev => Math.min(PPT_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyAll = () => {
    let text = `URJASETU: COMPETITION PITCH DECK CONTENT (10 SLIDES)\n`;
    text += `========================================================\n\n`;

    PPT_SLIDES.forEach(s => {
      text += `SLIDE ${s.id}: ${s.title.toUpperCase()}\n`;
      text += `Category: ${s.category}\n`;
      text += `Takeaway: ${s.keyTakeaway}\n\n`;
      text += `BULLET POINTS:\n`;
      s.bullets.forEach(b => {
        text += `• ${b}\n`;
      });
      if (s.metrics) {
        text += `\nKEY METRICS:\n`;
        s.metrics.forEach(m => {
          text += `[${m.label}: ${m.value} - ${m.detail}]\n`;
        });
      }
      text += `\nSPEAKER NOTES:\n${s.speakerNotes}\n`;
      text += `\nHINGLISH PITCH TIP:\n${s.hinglishTip}\n`;
      text += `\n--------------------------------------------------------\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleCopyCurrentSlide = () => {
    let text = `SLIDE ${activeSlide.id}: ${activeSlide.title}\n`;
    text += `Core Message: ${activeSlide.keyTakeaway}\n\n`;
    activeSlide.bullets.forEach(b => {
      text += `• ${b}\n`;
    });
    if (activeSlide.metrics) {
      text += `\nMetrics: ` + activeSlide.metrics.map(m => `${m.label}: ${m.value}`).join(' | ') + `\n`;
    }
    text += `\nSpeaker Notes: ${activeSlide.speakerNotes}\n`;

    navigator.clipboard.writeText(text);
    setCopiedSingle(true);
    setTimeout(() => setCopiedSingle(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner & Slide Exporter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Presentation className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Competition Pitch Deck (10 Slide Master Content)
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Slide-by-slide executive presentation prepared for evaluation juries, hackathons, and corporate buyers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCurrentSlide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
          >
            {copiedSingle ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span>{copiedSingle ? 'Copied Slide' : 'Copy Slide'}</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
          >
            {copiedAll ? <Check className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
            <span>{copiedAll ? 'All 10 Slides Copied!' : 'Copy Entire PPT Deck'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Slide Canvas */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-white to-slate-50/60 border-b border-slate-200 min-h-[420px] flex flex-col justify-between">
          <div>
            {/* Slide Category & Number Tag */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span className="font-mono text-emerald-800 uppercase tracking-wider text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {activeSlide.category}
              </span>
              <span className="font-mono bg-white px-2.5 py-1 rounded text-slate-700 border border-slate-200 font-bold shadow-2xs">
                Slide {activeSlide.id} of {PPT_SLIDES.length}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              {activeSlide.title}
            </h1>

            {/* Key Takeaway Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mb-6 pb-4 border-b border-slate-200">
              {activeSlide.keyTakeaway}
            </p>

            {/* Bullet Points */}
            <div className="space-y-3 mb-6">
              {activeSlide.bullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Cards if present */}
          {activeSlide.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
              {activeSlide.metrics.map((m, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs">
                  <div className="text-[11px] text-slate-500 font-medium">{m.label}</div>
                  <div className="text-xl font-bold font-mono text-emerald-700 my-0.5">{m.value}</div>
                  <div className="text-[10px] text-slate-500">{m.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Presenter Strip Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-mono text-slate-700 px-2 font-bold">
              {currentSlideIndex + 1} / {PPT_SLIDES.length}
            </span>
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(PPT_SLIDES.length - 1, prev + 1))}
              disabled={currentSlideIndex === PPT_SLIDES.length - 1}
              className="p-2 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 font-semibold ${
                showSpeakerNotes 
                  ? 'bg-sky-50 text-sky-900 border-sky-300 shadow-2xs' 
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
              <span>Speaker Script</span>
            </button>

            <button
              onClick={() => setShowHinglishTip(!showHinglishTip)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 font-semibold ${
                showHinglishTip 
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs' 
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Hinglish Pitch Tip</span>
            </button>
          </div>
        </div>

        {/* Expandable Speaker Notes & Hinglish Pitch Tip */}
        {(showSpeakerNotes || showHinglishTip) && (
          <div className="p-5 bg-white border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            {showSpeakerNotes && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                  <MessageSquare className="h-3.5 w-3.5 text-sky-600" />
                  <span>Official English Speaker Notes (For Pitching)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-sky-50/60 p-3.5 rounded-xl border border-sky-200">
                  {activeSlide.speakerNotes}
                </p>
              </div>
            )}

            {showHinglishTip && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                  <span>Hinglish Pitch Tip (Desi Jury / FM Connect)</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                  {activeSlide.hinglishTip}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide Thumbnails Selector Carousel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="text-xs font-bold text-slate-700 mb-3 px-1">
          Jump to Slide (All 10 Slides)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PPT_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'bg-emerald-50 border-emerald-500 text-slate-900 font-bold shadow-2xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="text-[10px] font-mono text-emerald-700 mb-0.5 font-bold">Slide {slide.id}</div>
              <div className="text-xs font-medium truncate">{slide.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
