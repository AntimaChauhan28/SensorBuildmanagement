import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { ChallengeBriefModal } from './components/ChallengeBriefModal';

export default function App() {
  const [isRoiModalOpen, setIsRoiModalOpen] = useState<boolean>(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      {/* Top Header focusing purely on Dashboard & Branding */}
      <Header
        onOpenRoiModal={() => setIsRoiModalOpen(true)}
        onOpenBriefModal={() => setIsBriefModalOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulate={() => setIsSimulating(!isSimulating)}
      />

      {/* Main Pure Dashboard Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <DashboardView />
      </main>

      {/* Payback & Financial ROI Modal */}
      <RoiCalculatorModal
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
      />

      {/* Challenge Objectives & 4 Pillars Modal */}
      <ChallengeBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />

      {/* Clean, Light Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500 mt-12 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SensorBuild</span>
            <span>·</span>
            <span>Building Energy Management Dashboard (Challenge 02)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span>Aligned with BEE ECBC 2017 & NBC 2016</span>
            <span>·</span>
            <span>OpenADR 2.0b Ready</span>
            <span>·</span>
            <span>IPMVP Option-C Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
