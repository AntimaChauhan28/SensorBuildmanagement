export type ClimateZone = 'composite' | 'warm-humid' | 'hot-dry' | 'temperate' | 'cold';

export type BuildingTypology = 'it-park' | 'corporate-office' | 'hospital' | 'retail-mall' | 'academic-campus';

export interface ClimateZoneData {
  id: ClimateZone;
  name: string;
  hindiName: string;
  representativeCities: string[];
  summerMaxTemp: number; // °C
  monsoonHumidity: number; // % RH
  winterMinTemp: number; // °C
  primaryChallenge: string;
  hvacStrategy: string;
  ecbcBaselineEPI: number; // kWh/m²/year
}

export interface BuildingTypologyData {
  id: BuildingTypology;
  name: string;
  defaultAreaSqM: number;
  occupancySchedule: string;
  peakOccupancyPeople: number;
  hvacLoadPercent: number;
  lightingLoadPercent: number;
  plugLoadPercent: number;
  typicalTariffINR: number; // ₹ per kWh
  operatingHours: number; // hours/day
}

export interface SimulationHourState {
  hour: number; // 0 - 23
  outdoorTemp: number; // °C
  outdoorRH: number; // %
  solarRadiation: number; // W/m²
  occupancyPercent: number; // %
  todTariffINR: number; // ₹ / kWh (Time of Day rate)
  isPeakToD: boolean;
  
  // Baseline building (un-optimized)
  baselineKw: number;
  baselineIndoorTemp: number;
  baselineIndoorCO2: number; // ppm
  baselineHvacKw: number;
  baselineLightingKw: number;
  
  // UrjaSetu Optimized building
  optimizedKw: number;
  optimizedIndoorTemp: number;
  optimizedIndoorCO2: number;
  optimizedHvacKw: number;
  optimizedLightingKw: number;
  solarGenerationKw: number;
  batteryDischargeKw: number;
  chillerCop: number;
  adaptiveSetpoint: number;
}

export interface FaultItem {
  id: string;
  title: string;
  subsystem: 'Chiller' | 'AHU' | 'Cooling Tower' | 'Sensor' | 'Pumps';
  severity: 'high' | 'medium' | 'low';
  wasteKw: number;
  energyPenaltyPercent: number;
  symptom: string;
  automatedRecommendation: string;
  isActive: boolean;
}

export interface PptSlide {
  id: number;
  title: string;
  category: string;
  keyTakeaway: string;
  bullets: string[];
  metrics?: { label: string; value: string; detail: string }[];
  speakerNotes: string;
  hinglishTip: string;
}

export interface HinglishSection {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  simpleExplanation: string;
  keyPoints: string[];
  juryQuestion: string;
  winningAnswerHinglish: string;
}
