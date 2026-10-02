import React from 'react';
import { 
  Building2, 
  Activity, 
  Calculator,
  Leaf,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface HeaderProps {
  onOpenRoiModal: () => void;
  onOpenBriefModal: () => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenRoiModal, 
  onOpenBriefModal,
  isSimulating,
  onToggleSimulate
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                SensorBuild
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <Leaf className="h-3 w-3 text-emerald-600" />
                Challenge 02
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Smart Buildings Energy Efficiency & Occupant Experience
            </p>
          </div>
        </div>

        {/* Zone 2: Clean status indicators */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800">Edge IoT Online</span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>BEE ECBC+ Standard</span>
          </div>

          <span className="text-slate-300">|</span>

          <div className="flex items-center gap-1.5 text-slate-600">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>OpenADR 2.0b Ready</span>
          </div>
        </div>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBriefModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Info className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Challenge Objectives</span>
            <span className="sm:hidden">Brief</span>
          </button>

          <button
            onClick={onOpenRoiModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Payback Calculator</span>
            <span className="sm:hidden">ROI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
