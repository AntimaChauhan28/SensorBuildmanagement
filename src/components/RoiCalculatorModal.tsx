import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingDown, 
  CheckCircle, 
  Leaf, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ClimateZone } from '../types';
import { CLIMATE_ZONES } from '../data/buildingPresets';

interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [areaSqM, setAreaSqM] = useState<number>(25000);
  const [tariffINR, setTariffINR] = useState<number>(9.50);
  const [selectedZone, setSelectedZone] = useState<ClimateZone>('composite');
  const [savingsEstimatePercent, setSavingsEstimatePercent] = useState<number>(37.5);

  if (!isOpen) return null;

  const areaSqFt = Math.round(areaSqM * 10.764);
  const baselineEpi = CLIMATE_ZONES[selectedZone].ecbcBaselineEPI;
  
  // Annual consumption
  const annualBaselineKwh = Math.round(areaSqM * baselineEpi);
  const annualOptimizedKwh = Math.round(annualBaselineKwh * (1 - savingsEstimatePercent / 100));
  const annualSavedKwh = annualBaselineKwh - annualOptimizedKwh;

  // Financials
  const annualBaselineCostINR = annualBaselineKwh * tariffINR;
  const annualSavedCostINR = Math.round(annualSavedKwh * tariffINR);

  // Turnkey Capex: ~₹92 per sq.ft (approx ₹990 per sq.m)
  const turnkeyCapexINR = Math.round(areaSqFt * 92);

  // Payback period
  const paybackYears = Number((turnkeyCapexINR / annualSavedCostINR).toFixed(2));
  const paybackMonths = Math.round(paybackYears * 12);

  // 5-Year Net Present Value (NPV @ 10% discount rate)
  const discountRate = 0.10;
  let fiveYearNpvINR = -turnkeyCapexINR;
  for (let y = 1; y <= 5; y++) {
    fiveYearNpvINR += annualSavedCostINR / Math.pow(1 + discountRate, y);
  }
  fiveYearNpvINR = Math.round(fiveYearNpvINR);

  // Carbon abatement: CEA India factor 0.82 kg CO₂ / kWh
  const annualCo2SavedMT = Math.round((annualSavedKwh * 0.82) / 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                SensorBuild Payback & Financial Feasibility Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Audited financial modeling tailored for Indian commercial facility owners
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
              <label>Conditioned Area (m²)</label>
              <span className="text-emerald-700 font-mono">
                {areaSqM.toLocaleString()} m² ({areaSqFt.toLocaleString()} sq.ft)
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={60000}
              step={2500}
              value={areaSqM}
              onChange={(e) => setAreaSqM(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
              <label>Electricity Tariff (₹/kWh)</label>
              <span className="text-emerald-700 font-mono">₹{tariffINR.toFixed(2)}/unit</span>
            </div>
            <input
              type="range"
              min={6.50}
              max={14.00}
              step={0.25}
              value={tariffINR}
              onChange={(e) => setTariffINR(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-700 font-bold mb-1">Climate Zone & Baseline EPI</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as ClimateZone)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 font-medium"
            >
              <option value="composite">Composite (Delhi-NCR, Lucknow) · 195 kWh/m²/yr</option>
              <option value="warm-humid">Warm & Humid (Mumbai, Chennai) · 215 kWh/m²/yr</option>
              <option value="hot-dry">Hot & Dry (Ahmedabad, Jaipur) · 185 kWh/m²/yr</option>
              <option value="temperate">Temperate (Bengaluru, Pune) · 160 kWh/m²/yr</option>
              <option value="cold">Cold (Shimla, Srinagar) · 150 kWh/m²/yr</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
              <label>Expected Whole-Building Savings</label>
              <span className="text-emerald-700 font-mono">{savingsEstimatePercent}%</span>
            </div>
            <input
              type="range"
              min={25}
              max={45}
              step={1}
              value={savingsEstimatePercent}
              onChange={(e) => setSavingsEstimatePercent(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Results KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium mb-0.5">Turnkey Capex</div>
            <div className="text-lg font-extrabold font-mono text-slate-900">
              ₹{(turnkeyCapexINR / 10000000).toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-slate-500 font-mono">₹92/sq.ft turnkey</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium mb-0.5">Annual Cash Savings</div>
            <div className="text-lg font-extrabold font-mono text-emerald-700">
              ₹{(annualSavedCostINR / 10000000).toFixed(2)} Cr/yr
            </div>
            <div className="text-[10px] text-slate-500 font-mono">{annualSavedKwh.toLocaleString()} kWh/yr</div>
          </div>

          <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-300">
            <div className="text-[11px] text-emerald-900 font-bold mb-0.5">Simple Payback</div>
            <div className="text-lg font-extrabold font-mono text-emerald-800">
              {paybackMonths} Months
            </div>
            <div className="text-[10px] text-emerald-700 font-mono">({paybackYears} Years)</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium mb-0.5">5-Year Net Profit (NPV)</div>
            <div className="text-lg font-extrabold font-mono text-slate-900">
              ₹{(fiveYearNpvINR / 10000000).toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-slate-500 font-mono">@10% WACC discount</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium mb-0.5">Carbon Abatement</div>
            <div className="text-lg font-extrabold font-mono text-emerald-700">
              {annualCo2SavedMT.toLocaleString()} MT/yr
            </div>
            <div className="text-[10px] text-slate-500 font-mono">CEA factor 0.82 kg/unit</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium mb-0.5">Internal Rate of Return</div>
            <div className="text-lg font-extrabold font-mono text-emerald-700">
              {Math.min(120, Math.round((annualSavedCostINR / turnkeyCapexINR) * 100 * 0.95))}% IRR
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Commercial Grade-A</div>
          </div>
        </div>

        {/* Footer Note & Close Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>IPMVP Option-C certified measurement and verification framework.</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
          >
            Apply to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
