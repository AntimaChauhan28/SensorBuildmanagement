import React from 'react';
import { X, TrendingDown, Users, Activity, Zap, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface ChallengeBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChallengeBriefModal: React.FC<ChallengeBriefModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                CHALLENGE 02
              </span>
              <span className="text-xs font-semibold text-slate-500">
                National Green Buildings Mandate
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Smart Buildings: Energy Efficiency & Occupant Experience
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Making every square metre smarter, greener, and more comfortable.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* The Challenge Core Statement */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong className="text-emerald-950 font-bold block mb-1">The Opportunity & Challenge:</strong>
          Combine low-cost sensing, intelligent controls, digital-twin analytics and grid-responsive energy management to reduce energy waste, improve occupant wellbeing and give owners actionable visibility across India's diverse building stock.
        </div>

        {/* 3 Core Ground Realities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xl font-extrabold text-emerald-700 font-mono">33%</div>
            <div className="text-xs text-slate-700 font-bold mt-0.5">Electricity Consumption</div>
            <div className="text-[11px] text-slate-500 mt-1">comes from commercial and residential buildings across India.</div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xl font-extrabold text-teal-700 font-mono">Real-Time Data</div>
            <div className="text-xs text-slate-700 font-bold mt-0.5">Building Performance</div>
            <div className="text-[11px] text-slate-500 mt-1">is often unavailable in legacy unmanaged Indian building stock.</div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
            <div className="text-xl font-extrabold text-amber-700 font-mono">Peak Hours</div>
            <div className="text-xs text-slate-700 font-bold mt-0.5">Flexible Building Loads</div>
            <div className="text-[11px] text-slate-500 mt-1">can shift off-peak via BESS and pre-cooling to reduce DISCOM stress.</div>
          </div>
        </div>

        {/* What Should Your Solution Achieve? (4 Green Cards from Image 1) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-3">
            What Should Your Solution Achieve? (4 Core Pillars)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Cut energy waste */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-emerald-600 text-white">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-950">Cut Energy Waste</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Measurably reduce energy consumption in commercial or residential buildings without sacrificing comfort, productivity or safety.
              </p>
            </div>

            {/* 2. Improve occupant experience */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-emerald-600 text-white">
                  <Users className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-950">Improve Occupant Experience</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enhance thermal comfort, indoor-air quality, lighting quality and overall wellbeing for building occupants.
              </p>
            </div>

            {/* 3. Enable data-driven management */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-emerald-600 text-white">
                  <Activity className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-950">Enable Data-Driven Management</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Give building managers and owners clear, actionable visibility into energy use, equipment performance and occupancy patterns.
              </p>
            </div>

            {/* 4. Integrate with the grid */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-emerald-600 text-white">
                  <Zap className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-emerald-950">Integrate with the Grid</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shift flexible loads away from peak hours and enable demand-response participation where DISCOM programmes allow.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
