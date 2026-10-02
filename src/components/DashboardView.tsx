import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sun, 
  Thermometer, 
  Users, 
  Zap, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Wind, 
  BatteryCharging, 
  Sliders, 
  ShieldAlert,
  ArrowRight,
  Info,
  Building2,
  Check,
  Power,
  Clock,
  Sparkles,
  Gauge,
  Lightbulb,
  Fan,
  Car,
  Layers,
  Activity,
  CheckSquare,
  Droplets,
  Eye
} from 'lucide-react';
import { ClimateZone, BuildingTypology, FaultItem } from '../types';
import { CLIMATE_ZONES, BUILDING_TYPOLOGIES, INITIAL_FAULTS, calculate24HourSimulation } from '../data/buildingPresets';

interface RoomZone {
  id: string;
  name: string;
  occupancyPeople: number;
  tempC: number;
  targetTempC: number;
  powerKw: number;
  lightsOn: boolean;
  hvacActive: boolean;
  status: 'nominal' | 'waste' | 'cooling';
}

export const DashboardView: React.FC = () => {
  // Config state
  const [selectedZone, setSelectedZone] = useState<ClimateZone>('composite');
  const [selectedTypology, setSelectedTypology] = useState<BuildingTypology>('it-park');
  const [buildingArea, setBuildingArea] = useState<number>(25000); // m²
  
  // Simulation playback state
  const [currentHour, setCurrentHour] = useState<number>(14); // 2 PM
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  // Optimization toggles
  const [adaptiveComfort, setAdaptiveComfort] = useState<boolean>(true);
  const [todPeakShaving, setTodPeakShaving] = useState<boolean>(true);
  
  // Building Manager Controls
  const [managerMode, setManagerMode] = useState<'ai_autonomous' | 'eco_saver' | 'peak_shave' | 'manual'>('ai_autonomous');
  const [globalSetpoint, setGlobalSetpoint] = useState<number>(24.5);
  const [freshAirTrimPct, setFreshAirTrimPct] = useState<number>(25);

  // Control Actions state
  const [controlLightsOff, setControlLightsOff] = useState<boolean>(true);
  const [controlHvacAdjust, setControlHvacAdjust] = useState<boolean>(true);
  const [controlEvDelayed, setControlEvDelayed] = useState<boolean>(true);

  // Peak load management active states
  const [peakEssentialState, setPeakEssentialState] = useState<'RUN'>('RUN');
  const [peakFlexibleState, setPeakFlexibleState] = useState<'SHIFT' | 'RUN'>('SHIFT');
  const [peakDeferrableState, setPeakDeferrableState] = useState<'DELAY' | 'RUN'>('DELAY');

  // Rooms / Zones matching wireframe
  const [rooms, setRooms] = useState<RoomZone[]>([
    {
      id: 'R1',
      name: 'R1 · Conference Hall A',
      occupancyPeople: 18,
      tempC: 24.0,
      targetTempC: 24.0,
      powerKw: 4.2,
      lightsOn: true,
      hvacActive: true,
      status: 'nominal'
    },
    {
      id: 'R2',
      name: 'R2 · Workstation Bay B',
      occupancyPeople: 0,
      tempC: 25.0,
      targetTempC: 25.5,
      powerKw: 1.8,
      lightsOn: false,
      hvacActive: false,
      status: 'waste'
    },
    {
      id: 'R3',
      name: 'R3 · Executive Suites C',
      occupancyPeople: 12,
      tempC: 27.0,
      targetTempC: 25.0,
      powerKw: 6.1,
      lightsOn: true,
      hvacActive: true,
      status: 'cooling'
    },
    {
      id: 'R4',
      name: 'R4 · Central Cafeteria',
      occupancyPeople: 32,
      tempC: 24.5,
      targetTempC: 24.5,
      powerKw: 7.8,
      lightsOn: true,
      hvacActive: true,
      status: 'nominal'
    },
    {
      id: 'R5',
      name: 'R5 · Server Room & Data Hub',
      occupancyPeople: 0,
      tempC: 20.8,
      targetTempC: 21.0,
      powerKw: 12.4,
      lightsOn: false,
      hvacActive: true,
      status: 'nominal'
    }
  ]);

  // Active waste alerts
  const [alerts, setAlerts] = useState<Array<{ id: string; title: string; zone: string; wasteKw: number; actionText: string; isDismissed: boolean }>>([
    {
      id: 'alt-1',
      title: 'Empty Zone Cooling & Lighting Detected',
      zone: 'Zone R2 (Bay B)',
      wasteKw: 1.8,
      actionText: 'Action Taken: Auto-setback applied & task lighting dimmed.',
      isDismissed: false
    },
    {
      id: 'alt-2',
      title: 'Chiller-2 Condenser Tube Scale / High Approach Temp (4.2°C)',
      zone: 'Central Chiller Plant',
      wasteKw: 14.5,
      actionText: 'Action Taken: Automated tube brush purge scheduled; CWET reset.',
      isDismissed: false
    },
    {
      id: 'alt-3',
      title: 'Fresh Air Damper Stuck at 85% During 42°C Ambient Heat',
      zone: 'AHU-4 West Wing',
      wasteKw: 8.2,
      actionText: 'Action Taken: Edge gateway commanded actuator stroke calibration.',
      isDismissed: false
    }
  ]);

  // Simulation playback loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour(prev => (prev + 1) % 24);
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Compute 24-hour simulation
  const simulation24h = useMemo(() => {
    return calculate24HourSimulation(
      selectedZone,
      selectedTypology,
      buildingArea,
      true,
      INITIAL_FAULTS,
      adaptiveComfort,
      todPeakShaving
    );
  }, [selectedZone, selectedTypology, buildingArea, adaptiveComfort, todPeakShaving]);

  const activeHourState = simulation24h[currentHour];
  const activeZone = CLIMATE_ZONES[selectedZone];
  const activeTypology = BUILDING_TYPOLOGIES[selectedTypology];

  // Dynamic values accounting for wireframe control toggles
  const controlBonusReduction = (controlLightsOff ? 22 : 0) + (controlHvacAdjust ? 35 : 0) + (controlEvDelayed ? 18 : 0);
  const displayOptimizedKw = Math.max(20, activeHourState.optimizedKw - controlBonusReduction);
  const currentSavingsKw = activeHourState.baselineKw - displayOptimizedKw;
  const currentSavingsPercent = Math.min(48, Math.max(15, Math.round((currentSavingsKw / activeHourState.baselineKw) * 100)));
  const dailyCostSavedINR = Math.round(currentSavingsKw * activeHourState.todTariffINR * 24 * 0.65);

  // EUI / EPI calculation
  const baselineEpi = activeZone.ecbcBaselineEPI;
  const optimizedEpi = Math.round(baselineEpi * (1 - currentSavingsPercent / 100));

  // SVG Chart setup
  const chartHeight = 160;
  const chartWidth = 720;
  const maxKw = Math.max(...simulation24h.map(h => h.baselineKw)) * 1.15;

  const getPoints = (key: 'baselineKw' | 'optimizedKw' | 'solarGenerationKw') => {
    return simulation24h.map((h, i) => {
      const x = (i / 23) * chartWidth;
      const val = key === 'optimizedKw' ? Math.max(20, h.optimizedKw - controlBonusReduction) : h[key];
      const y = chartHeight - (val / maxKw) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const toggleRoomLights = (roomId: string) => {
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, lightsOn: !r.lightsOn, powerKw: Number((r.powerKw + (r.lightsOn ? -0.8 : 0.8)).toFixed(1)) } : r));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isDismissed: true } : a));
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Challenge 02 Highlight Banner (Inspired by Image 2) */}
      <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                Challenge 02
              </span>
              <span className="text-xs font-semibold text-emerald-900">
                Energy Efficiency & Occupant Experience
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Making Every Square Metre Smarter, Greener, and More Comfortable.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Combining low-cost sensing, intelligent controls, digital-twin analytics, and DISCOM grid-responsive energy management across India’s building stock.
            </p>
          </div>

          {/* 3 Key Context Callouts (Matching Image 2) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
            <div className="bg-white/90 border border-emerald-200 p-2.5 sm:p-3 rounded-xl text-center shadow-2xs">
              <div className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono">33%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                of India's electricity is consumed by buildings
              </div>
            </div>

            <div className="bg-white/90 border border-emerald-200 p-2.5 sm:p-3 rounded-xl text-center shadow-2xs">
              <div className="text-base sm:text-lg font-extrabold text-teal-700 font-mono">Real-Time</div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                data gap eliminated via wireless edge IoT
              </div>
            </div>

            <div className="bg-white/90 border border-emerald-200 p-2.5 sm:p-3 rounded-xl text-center shadow-2xs">
              <div className="text-base sm:text-lg font-extrabold text-amber-700 font-mono">Peak ToD</div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight mt-0.5">
                flexible loads shifted to off-peak hours
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building Selector & Climate Zone Settings */}
      <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Indian Climate Zone (BEE ECBC)
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as ClimateZone)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            >
              <option value="composite">Composite (Delhi-NCR, Lucknow, Jaipur)</option>
              <option value="warm-humid">Warm & Humid (Mumbai, Chennai, Kolkata)</option>
              <option value="hot-dry">Hot & Dry (Ahmedabad, Jodhpur, Nagpur)</option>
              <option value="temperate">Temperate (Bengaluru, Pune, Mysuru)</option>
              <option value="cold">Cold (Shimla, Srinagar, Leh)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Building Typology
            </label>
            <select
              value={selectedTypology}
              onChange={(e) => setSelectedTypology(e.target.value as BuildingTypology)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            >
              <option value="it-park">Commercial IT Park / Tech SEZ (25,000 m²)</option>
              <option value="corporate-office">Corporate Office HQ (Day Use 12,000 m²)</option>
              <option value="hospital">Multispecialty Hospital (24x7 Critical 18,000 m²)</option>
              <option value="retail-mall">Retail Mall & Multiplex (32,000 m²)</option>
              <option value="academic-campus">Academic University Block (15,000 m²)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Facility Floor Area</span>
              <span className="text-emerald-700 font-mono">
                {buildingArea.toLocaleString()} m² ({(buildingArea * 10.764).toLocaleString()} sq.ft)
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={60000}
              step={2500}
              value={buildingArea}
              onChange={(e) => setBuildingArea(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* EXACT WIREFRAME IMPLEMENTATION (FROM USER SKETCH)                         */}
      {/* ========================================================================= */}

      {/* HEADER: BUILDING ENERGY MANAGEMENT */}
      <div className="bg-white border-2 border-slate-300/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="text-emerald-400 font-bold">SENSORBUILD</span>
                <span className="text-slate-500">|</span>
                <span>BUILDING ENERGY MANAGEMENT</span>
              </h2>
              <div className="text-[11px] text-slate-300 flex items-center gap-2">
                <span>Facility: {activeTypology.name}</span>
                <span>·</span>
                <span>Zone: {activeZone.name}</span>
                <span>·</span>
                <span>Time: {String(currentHour).padStart(2, '0')}:00 hrs</span>
              </div>
            </div>
          </div>

          {/* Quick Simulation Clock Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause 24h' : 'Run 24h Simulation'}</span>
            </button>
            <button
              onClick={() => { setIsPlaying(false); setCurrentHour(14); }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Reset"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 1. TOP METRICS ROW: | Power | Energy | EUI | Peak kW | Energy Saved | */}
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white border-b border-slate-200">
          {/* Power */}
          <div className="p-4 sm:p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
              Power
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {displayOptimizedKw}{' '}
              <span className="text-xs font-semibold text-slate-500">kW</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              Base: <span className="line-through text-rose-500">{activeHourState.baselineKw} kW</span>
            </div>
          </div>

          {/* Energy */}
          <div className="p-4 sm:p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
              Energy (Daily)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {Math.round(displayOptimizedKw * 14.5).toLocaleString()}{' '}
              <span className="text-xs font-semibold text-slate-500">kWh</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold font-mono mt-1">
              Saved {Math.round(currentSavingsKw * 14.5).toLocaleString()} kWh
            </div>
          </div>

          {/* EUI */}
          <div className="p-4 sm:p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
              EUI (Energy Intensity)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 tabular-nums">
              {optimizedEpi}{' '}
              <span className="text-xs font-semibold text-slate-500">kWh/m²/yr</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              ECBC Standard: {baselineEpi}
            </div>
          </div>

          {/* Peak kW */}
          <div className="p-4 sm:p-5 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-1">
              Peak kW
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
              {Math.round(displayOptimizedKw * 1.08)}{' '}
              <span className="text-xs font-semibold text-slate-500">kW</span>
            </div>
            <div className="text-[11px] text-amber-700 font-medium font-mono mt-1">
              Shorn by {Math.round(activeHourState.baselineKw * 0.32)} kW
            </div>
          </div>

          {/* Energy Saved */}
          <div className="p-4 sm:p-5 text-center col-span-2 md:col-span-1 bg-emerald-50/60">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono mb-1">
              Energy Saved
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 tabular-nums">
              {currentSavingsPercent}%
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 font-mono mt-1">
              ₹{dailyCostSavedINR.toLocaleString()} / day
            </div>
          </div>
        </div>

        {/* 2. BASELINE vs OPTIMIZED ENERGY TREND (Chart Section) */}
        <div className="p-5 bg-slate-50/70 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                BASELINE vs OPTIMIZED ENERGY TREND
              </h3>
              <p className="text-[11px] text-slate-500">
                24-hour continuous grid load profile with DISCOM Time-of-Day (ToD) peak window (18:00–22:00)
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-rose-600 font-medium">
                <span className="w-3 h-0.5 bg-rose-500 inline-block"></span>
                Baseline (Un-optimized)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-3 h-0.5 bg-emerald-600 inline-block"></span>
                Optimized (SensorBuild)
              </span>
              <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
                Solar PV
              </span>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="w-full bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-40 overflow-visible"
            >
              {/* DISCOM Peak Highlight Box (18:00 - 22:00) */}
              <rect
                x={(18 / 23) * chartWidth}
                y={0}
                width={(4 / 23) * chartWidth}
                height={chartHeight}
                fill="rgba(245, 158, 11, 0.12)"
              />
              <text
                x={(18.2 / 23) * chartWidth}
                y={18}
                fill="#b45309"
                fontSize="10"
                fontWeight="bold"
                fontFamily="JetBrains Mono"
              >
                DISCOM PEAK (1.45x Tariff)
              </text>

              {/* Grid Lines */}
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.50} x2={chartWidth} y2={chartHeight * 0.50} stroke="#f1f5f9" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Baseline Curve (Red) */}
              <polyline
                fill="none"
                stroke="#e11d48"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={getPoints('baselineKw')}
              />

              {/* Solar Curve (Amber) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 3"
                points={getPoints('solarGenerationKw')}
              />

              {/* Optimized Curve (Emerald) */}
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={getPoints('optimizedKw')}
              />

              {/* Current Hour Indicator Needle */}
              <line
                x1={(currentHour / 23) * chartWidth}
                y1={0}
                x2={(currentHour / 23) * chartWidth}
                y2={chartHeight}
                stroke="#0284c7"
                strokeWidth="2"
              />
              <circle
                cx={(currentHour / 23) * chartWidth}
                cy={chartHeight - (displayOptimizedKw / maxKw) * chartHeight}
                r="5"
                fill="#0284c7"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>

            {/* Time Scrubber */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-500">00:00 Night</span>
              <input
                type="range"
                min={0}
                max={23}
                step={1}
                value={currentHour}
                onChange={(e) => setCurrentHour(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                Current: {String(currentHour).padStart(2, '0')}:00 hrs
              </span>
            </div>
          </div>
        </div>

        {/* 3. TWO-COLUMN SPLIT: | ROOM / ZONE STATUS | COMFORT & AIR QUALITY | */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Column A: ROOM / ZONE STATUS (7 cols) */}
          <div className="lg:col-span-7 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                ROOM / ZONE STATUS
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                mmWave Radar + BACnet Real-Time
              </span>
            </div>

            <div className="space-y-2.5">
              {rooms.map((room) => (
                <div 
                  key={room.id}
                  className={`p-3 rounded-xl border transition-all ${
                    room.status === 'waste'
                      ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {room.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {room.name.split('·')[1]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <strong>{room.occupancyPeople}p</strong>
                      </span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Thermometer className="h-3.5 w-3.5 text-rose-500" />
                        <strong>{room.tempC}°C</strong>
                      </span>
                      <span className="text-emerald-700 font-bold">
                        {room.powerKw} kW
                      </span>
                      <button
                        onClick={() => toggleRoomLights(room.id)}
                        className={`text-[10px] font-sans px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                          room.lightsOn
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                        title="Toggle lighting"
                      >
                        {room.lightsOn ? 'Lights ON' : 'Lights OFF'}
                      </button>
                    </div>
                  </div>

                  {room.occupancyPeople === 0 && (
                    <div className="mt-1.5 text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="h-3 w-3 text-amber-600" />
                      <span>Empty zone detected. HVAC throttled to standby setback.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column B: COMFORT & AIR QUALITY (5 cols) */}
          <div className="lg:col-span-5 p-5 bg-slate-50/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                COMFORT & AIR QUALITY
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                ASHRAE / ISHRAE ✓
              </span>
            </div>

            <div className="space-y-3">
              {/* Temp: Check */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <Thermometer className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Indoor Temperature</div>
                    <div className="text-[11px] text-slate-500 font-mono">IMAC Neutral: 24.5°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-sm font-extrabold text-slate-900">24.5°C</span>
                  <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                </div>
              </div>

              {/* Humidity: Check */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Relative Humidity</div>
                    <div className="text-[11px] text-slate-500 font-mono">Target: 40% - 60% RH</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-sm font-extrabold text-slate-900">52% RH</span>
                  <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                </div>
              </div>

              {/* CO2: Check */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
                    <Wind className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">CO₂ Concentration</div>
                    <div className="text-[11px] text-slate-500 font-mono">DCV Limit &lt; 800 ppm</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-sm font-extrabold text-slate-900">{activeHourState.optimizedIndoorCO2} ppm</span>
                  <span className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                </div>
              </div>

              {/* PM2.5 & Airflow */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">PM2.5: <strong className="text-emerald-700">18 µg/m³ ✓</strong></span>
                <span className="text-slate-600">Air Velocity: <strong className="text-emerald-700">0.22 m/s ✓</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. ENERGY WASTE / ALERTS */}
        <div className="p-5 border-t border-slate-200 bg-rose-50/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                ENERGY WASTE / ALERTS
              </h3>
            </div>
            <span className="text-[11px] font-mono text-rose-600 font-bold">
              {alerts.filter(a => !a.isDismissed).length} Active Anomaly Alerts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {alerts.filter(a => !a.isDismissed).map((alert) => (
              <div 
                key={alert.id}
                className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900">{alert.title}</span>
                  <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                    +{alert.wasteKw} kW
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Location: {alert.zone}
                </div>
                <div className="text-[11px] text-emerald-800 font-medium bg-emerald-50 p-1.5 rounded border border-emerald-200">
                  {alert.actionText}
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="w-full text-center text-[10px] font-bold text-slate-600 hover:text-slate-900 py-1 rounded border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Dismiss / Verified Resolved
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TWO-COLUMN SPLIT: | CONTROL ACTIONS | PEAK LOAD MANAGEMENT | */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 border-t border-slate-200 bg-white">
          {/* Column A: CONTROL ACTIONS (6 cols) */}
          <div className="lg:col-span-6 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-3">
              CONTROL ACTIONS
            </h3>

            <div className="space-y-3">
              {/* Lights -> OFF */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Lights → OFF</div>
                    <div className="text-[11px] text-slate-500">Auto-dim unoccupied desks & corridors</div>
                  </div>
                </div>
                <button
                  onClick={() => setControlLightsOff(!controlLightsOff)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer font-mono ${
                    controlLightsOff 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {controlLightsOff ? 'ACTIVE (Saves 22 kW)' : 'DISABLED'}
                </button>
              </div>

              {/* HVAC -> Adjust */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-100 text-teal-800">
                    <Fan className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">HVAC → Adjust</div>
                    <div className="text-[11px] text-slate-500">IMAC Adaptive 24°C → 25.5°C float</div>
                  </div>
                </div>
                <button
                  onClick={() => setControlHvacAdjust(!controlHvacAdjust)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer font-mono ${
                    controlHvacAdjust 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {controlHvacAdjust ? 'ACTIVE (Saves 35 kW)' : 'DISABLED'}
                </button>
              </div>

              {/* EV -> Delayed */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">EV → Delayed</div>
                    <div className="text-[11px] text-slate-500">Shift smart chargers to post-22:00 off-peak</div>
                  </div>
                </div>
                <button
                  onClick={() => setControlEvDelayed(!controlEvDelayed)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer font-mono ${
                    controlEvDelayed 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {controlEvDelayed ? 'ACTIVE (Saves 18 kW)' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>

          {/* Column B: PEAK LOAD MANAGEMENT (6 cols) */}
          <div className="lg:col-span-6 p-5 bg-slate-50/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
                PEAK LOAD MANAGEMENT
              </h3>
              <span className="text-[11px] font-mono text-amber-700 font-bold">
                DISCOM OpenADR 2.0b
              </span>
            </div>

            <div className="space-y-3">
              {/* Essential -> RUN */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Essential → RUN</div>
                    <div className="text-[11px] text-slate-500">Data centers, ICUs, fire systems (100% priority)</div>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-blue-100 text-blue-800 border border-blue-300">
                  RUN (ALWAYS)
                </span>
              </div>

              {/* Flexible -> SHIFT */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Flexible → SHIFT</div>
                    <div className="text-[11px] text-slate-500">Chillers pre-cool concrete slab during off-peak</div>
                  </div>
                </div>
                <button
                  onClick={() => setPeakFlexibleState(prev => prev === 'SHIFT' ? 'RUN' : 'SHIFT')}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                    peakFlexibleState === 'SHIFT'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {peakFlexibleState}
                </button>
              </div>

              {/* Deferrable -> DELAY */}
              <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-800">
                    <BatteryCharging className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Deferrable → DELAY</div>
                    <div className="text-[11px] text-slate-500">Water pumps & battery charging deferred to 22:00</div>
                  </div>
                </div>
                <button
                  onClick={() => setPeakDeferrableState(prev => prev === 'DELAY' ? 'RUN' : 'DELAY')}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                    peakDeferrableState === 'DELAY'
                      ? 'bg-violet-100 text-violet-900 border-violet-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {peakDeferrableState}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. BUILDING MANAGER CONTROLS (Bottom Section) */}
        <div className="p-5 border-t border-slate-200 bg-slate-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                <Sliders className="h-4 w-4" />
                BUILDING MANAGER CONTROLS
              </h3>
              <p className="text-[11px] text-slate-300">
                Facility supervisor command center: switch optimization profiles and override setpoints.
              </p>
            </div>

            {/* Operating Mode Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-800 rounded-lg border border-slate-700">
              <button
                onClick={() => setManagerMode('ai_autonomous')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  managerMode === 'ai_autonomous'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Autonomous AI
              </button>
              <button
                onClick={() => setManagerMode('eco_saver')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  managerMode === 'eco_saver'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Eco-Saver (ECBC+)
              </button>
              <button
                onClick={() => setManagerMode('peak_shave')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  managerMode === 'peak_shave'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ToD Peak Shave
              </button>
              <button
                onClick={() => setManagerMode('manual')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  managerMode === 'manual'
                    ? 'bg-white text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Manual Override
              </button>
            </div>
          </div>

          {/* Interactive Setpoint & Fresh Air Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Central Chilled Water / Zone Temp Setpoint:</span>
                <span className="text-emerald-400 font-bold">{globalSetpoint.toFixed(1)}°C (IMAC Comfort)</span>
              </div>
              <input
                type="range"
                min={22.0}
                max={26.5}
                step={0.5}
                value={globalSetpoint}
                onChange={(e) => setGlobalSetpoint(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>22°C (Overcooled / Wasteful)</span>
                <span>24.5°C (NBC 2016 IMAC Optimal)</span>
                <span>26.5°C (Max Eco)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Fresh Air Damper Trim (Demand Controlled Ventilation):</span>
                <span className="text-teal-400 font-bold">{freshAirTrimPct}% Fresh Air</span>
              </div>
              <input
                type="range"
                min={15}
                max={50}
                step={5}
                value={freshAirTrimPct}
                onChange={(e) => setFreshAirTrimPct(Number(e.target.value))}
                className="w-full accent-teal-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>15% (Minimum ASHRAE 62.1)</span>
                <span>25% (Nominal DCV)</span>
                <span>50% (High Flush)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Cards (Inspired by Image 1) */}
      <section className="mt-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            What Should Your Solution Achieve?
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Engineered to deliver on all 4 core pillars of the Smart Buildings Challenge
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Cut energy waste */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950 mb-1.5">
              Cut Energy Waste
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Measurably reduce energy consumption in commercial buildings without sacrificing comfort, productivity or safety.
            </p>
          </div>

          {/* 2. Improve occupant experience */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950 mb-1.5">
              Improve Occupant Experience
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enhance thermal comfort, indoor-air quality, lighting quality and overall wellbeing for building occupants.
            </p>
          </div>

          {/* 3. Enable data-driven management */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950 mb-1.5">
              Enable Data-Driven Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Give building managers and owners clear, actionable visibility into energy use, equipment performance and occupancy patterns.
            </p>
          </div>

          {/* 4. Integrate with the grid */}
          <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-emerald-950 mb-1.5">
              Integrate with the Grid
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shift flexible loads away from peak hours and enable demand-response participation where DISCOM programmes allow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
