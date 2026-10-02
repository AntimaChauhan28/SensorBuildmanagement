import { ClimateZone, ClimateZoneData, BuildingTypology, BuildingTypologyData, FaultItem } from '../types';

export const CLIMATE_ZONES: Record<ClimateZone, ClimateZoneData> = {
  composite: {
    id: 'composite',
    name: 'Composite Zone',
    hindiName: 'मिश्रित जलवायु (दिल्ली-एनसीआर, लखनऊ)',
    representativeCities: ['New Delhi', 'Gurugram', 'Noida', 'Lucknow', 'Jaipur'],
    summerMaxTemp: 44.5,
    monsoonHumidity: 78,
    winterMinTemp: 5.2,
    primaryChallenge: 'Extreme seasonal swings: blazing summer heatwaves (44°C+), suffocating monsoon humidity, winter chill & severe winter PM2.5 air pollution.',
    hvacStrategy: 'Dynamic dual-mode enthalpy economizer in transitional months; high sensible cooling in summer; dedicated outdoor air system (DOAS) with dual-stage filtration in winter.',
    ecbcBaselineEPI: 195, // kWh/m²/yr
  },
  'warm-humid': {
    id: 'warm-humid',
    name: 'Warm & Humid Zone',
    hindiName: 'गर्म और आर्द्र (मुंबई, चेन्नई, कोलकाता)',
    representativeCities: ['Mumbai', 'Chennai', 'Kolkata', 'Kochi', 'Visakhapatnam'],
    summerMaxTemp: 37.0,
    monsoonHumidity: 88,
    winterMinTemp: 21.0,
    primaryChallenge: 'Relentless latent cooling load; high relative humidity (>80%) year-round with low diurnal temperature variation.',
    hvacStrategy: 'Deep sub-cooling & heat pipe reheat dehumidification; chilled water supply reset constrained by dew point; demand-controlled ventilation to prevent moisture ingress.',
    ecbcBaselineEPI: 215, // kWh/m²/yr
  },
  'hot-dry': {
    id: 'hot-dry',
    name: 'Hot & Dry Zone',
    hindiName: 'गर्म और शुष्क (अहमदाबाद, जोधपुर, नागपुर)',
    representativeCities: ['Ahmedabad', 'Jodhpur', 'Nagpur', 'Bikaner', 'Rajkot'],
    summerMaxTemp: 46.8,
    monsoonHumidity: 32,
    winterMinTemp: 11.5,
    primaryChallenge: 'Intense direct solar insolation, high dry-bulb peak, large diurnal shift (day/night delta > 15°C).',
    hvacStrategy: 'Two-stage indirect-direct evaporative pre-cooling (IDEC); thermal precooling during night hours; automated dynamic solar louvers on south/west fenestrations.',
    ecbcBaselineEPI: 185, // kWh/m²/yr
  },
  temperate: {
    id: 'temperate',
    name: 'Temperate Zone',
    hindiName: 'समशीतोष्ण जलवायु (बेंगलुरु, पुणे)',
    representativeCities: ['Bengaluru', 'Pune', 'Mysuru', 'Coimbatore'],
    summerMaxTemp: 34.0,
    monsoonHumidity: 65,
    winterMinTemp: 14.5,
    primaryChallenge: 'Rapid tech-park expansion with high internal heat loads (servers, monitors, occupants) despite mild outdoor ambient weather.',
    hvacStrategy: 'Extensive free-cooling airside economizer cycles (usable ~1,600 hours/yr); low chilled water delta-T mitigation; variable speed pumping.',
    ecbcBaselineEPI: 160, // kWh/m²/yr
  },
  cold: {
    id: 'cold',
    name: 'Cold Zone',
    hindiName: 'शीत जलवायु (शिमला, श्रीनगर, लेह)',
    representativeCities: ['Shimla', 'Srinagar', 'Leh', 'Manali', 'Gangtok'],
    summerMaxTemp: 26.0,
    monsoonHumidity: 60,
    winterMinTemp: -4.0,
    primaryChallenge: 'Space heating demand, air infiltration losses, thermal bridging, and low ambient air density.',
    hvacStrategy: 'Heat recovery ventilators (HRV) with >78% sensible recovery; variable refrigerant heat pumps; air-tight envelope sealing & solar gain capture.',
    ecbcBaselineEPI: 150, // kWh/m²/yr
  }
};

export const BUILDING_TYPOLOGIES: Record<BuildingTypology, BuildingTypologyData> = {
  'it-park': {
    id: 'it-park',
    name: 'Commercial IT Park / Tech SEZ',
    defaultAreaSqM: 25000,
    occupancySchedule: '08:30 - 20:30 (Staggered shifts, weekend ~15%)',
    peakOccupancyPeople: 2200,
    hvacLoadPercent: 54,
    lightingLoadPercent: 18,
    plugLoadPercent: 28,
    typicalTariffINR: 9.20,
    operatingHours: 14,
  },
  'corporate-office': {
    id: 'corporate-office',
    name: 'Day-Use Corporate Headquarters',
    defaultAreaSqM: 12000,
    occupancySchedule: '09:00 - 18:30 (Mon-Fri)',
    peakOccupancyPeople: 1100,
    hvacLoadPercent: 52,
    lightingLoadPercent: 22,
    plugLoadPercent: 26,
    typicalTariffINR: 9.80,
    operatingHours: 10,
  },
  hospital: {
    id: 'hospital',
    name: 'Multispecialty Hospital (24x7)',
    defaultAreaSqM: 18000,
    occupancySchedule: '24x7 Continuous (Critical OTs, ICUs, Wards)',
    peakOccupancyPeople: 1600,
    hvacLoadPercent: 62,
    lightingLoadPercent: 19,
    plugLoadPercent: 19,
    typicalTariffINR: 8.90,
    operatingHours: 24,
  },
  'retail-mall': {
    id: 'retail-mall',
    name: 'Retail Mall & Multiplex Center',
    defaultAreaSqM: 32000,
    occupancySchedule: '11:00 - 23:00 (Heavy evening & weekend footfall)',
    peakOccupancyPeople: 3800,
    hvacLoadPercent: 58,
    lightingLoadPercent: 26,
    plugLoadPercent: 16,
    typicalTariffINR: 11.20,
    operatingHours: 13,
  },
  'academic-campus': {
    id: 'academic-campus',
    name: 'Institutional / University Campus',
    defaultAreaSqM: 15000,
    occupancySchedule: '08:00 - 17:30 (Lecture halls, labs, library)',
    peakOccupancyPeople: 1800,
    hvacLoadPercent: 46,
    lightingLoadPercent: 28,
    plugLoadPercent: 26,
    typicalTariffINR: 7.80,
    operatingHours: 10,
  }
};

export const INITIAL_FAULTS: FaultItem[] = [
  {
    id: 'fault-1',
    title: 'Chiller-2 Condenser Tube Scale / Approach Temp High',
    subsystem: 'Chiller',
    severity: 'high',
    wasteKw: 42.5,
    energyPenaltyPercent: 8.4,
    symptom: 'Condenser approach temperature is 4.8°C (nominal < 1.5°C). Compressor lift has increased by 14%, driving specific power from 0.62 kW/TR up to 0.73 kW/TR.',
    automatedRecommendation: 'Trigger automated tube cleaning cycle; adjust cooling tower fan staging to lower condenser water entering temp (CWET) by 1.8°C immediately.',
    isActive: true,
  },
  {
    id: 'fault-2',
    title: 'AHU-4 Fresh Air Damper Stuck at 85% Open (Afternoon Peak)',
    subsystem: 'AHU',
    severity: 'high',
    wasteKw: 31.0,
    energyPenaltyPercent: 6.2,
    symptom: 'Outside air damper actuator commanded to 20% minimum ventilation, but physical feedback sensor registers 85% open during peak 42°C ambient heat.',
    automatedRecommendation: 'Override VAV box minimum flow; signal local maintenance alert via Modbus actuator reset pulse; modulate secondary chilled water valve to prevent zone overcooling.',
    isActive: true,
  },
  {
    id: 'fault-3',
    title: 'North Wing Zone-3 Simultaneous Heating & Cooling',
    subsystem: 'AHU',
    severity: 'medium',
    wasteKw: 18.2,
    energyPenaltyPercent: 3.8,
    symptom: 'Perimeter reheater active while central VAV damper is delivering 13°C primary chilled air due to deadband calibration overlap.',
    automatedRecommendation: 'Enforce 2.0°C deadband spacing in Edge Controller; lock perimeter electric reheat coil until zone temp falls below 20.5°C.',
    isActive: true,
  },
  {
    id: 'fault-4',
    title: 'Secondary Chilled Water Pumping Low Delta-T Syndrome',
    subsystem: 'Pumps',
    severity: 'medium',
    wasteKw: 15.6,
    energyPenaltyPercent: 3.1,
    symptom: 'System chilled water return delta-T dropped to 2.9°C (design is 5.5°C), forcing 3 secondary pumps to run at 88% speed unnecessarily.',
    automatedRecommendation: 'Reset variable differential pressure setpoint from 1.6 bar to 1.1 bar based on most demanding remote AHU valve position (Trim & Respond algorithm).',
    isActive: false, // Can be toggled on/off
  }
];

// Helper to simulate 24-hour building profile based on zone & typology
export function calculate24HourSimulation(
  zoneId: ClimateZone,
  typologyId: BuildingTypology,
  areaSqM: number,
  isOptimizedActive: boolean,
  activeFaults: FaultItem[],
  adaptiveComfortEnabled: boolean,
  todShavingEnabled: boolean
) {
  const zone = CLIMATE_ZONES[zoneId];
  const typology = BUILDING_TYPOLOGIES[typologyId];
  const scale = areaSqM / 20000; // normalized to 20k m² reference

  const hours = Array.from({ length: 24 }, (_, h) => {
    // Diurnal outdoor temperature curve
    const minT = zone.winterMinTemp + (zone.summerMaxTemp - zone.winterMinTemp) * 0.45;
    const maxT = zone.summerMaxTemp;
    const tempPhase = Math.sin(((h - 9) / 24) * 2 * Math.PI);
    const outdoorTemp = Number(((maxT + minT) / 2 + ((maxT - minT) / 2) * tempPhase).toFixed(1));

    // Solar radiation curve (peak at 13:00)
    let solarRadiation = 0;
    if (h >= 6 && h <= 18) {
      solarRadiation = Math.round(Math.sin(((h - 6) / 12) * Math.PI) * (zoneId === 'hot-dry' ? 950 : 820));
    }

    // Relative humidity (inverse of temp)
    const outdoorRH = Math.round(Math.max(25, Math.min(95, zone.monsoonHumidity - (outdoorTemp - 25) * 1.5)));

    // Occupancy profile based on typology
    let occPercent = 5;
    if (typologyId === 'it-park') {
      if (h >= 9 && h <= 18) occPercent = 85 + Math.sin(h) * 10;
      else if (h >= 8 && h < 9) occPercent = 45;
      else if (h > 18 && h <= 21) occPercent = 50;
      else occPercent = 12;
    } else if (typologyId === 'corporate-office') {
      if (h >= 9 && h <= 18) occPercent = 90;
      else if (h >= 8 && h < 9) occPercent = 30;
      else occPercent = 5;
    } else if (typologyId === 'hospital') {
      occPercent = 70 + Math.sin(h * 0.5) * 20;
    } else if (typologyId === 'retail-mall') {
      if (h >= 11 && h <= 22) occPercent = 60 + (h >= 17 ? 35 : 15);
      else occPercent = 8;
    } else {
      if (h >= 8 && h <= 17) occPercent = 80;
      else occPercent = 10;
    }
    occPercent = Math.min(100, Math.max(5, Math.round(occPercent)));

    // Indian DISCOM Time-of-Day (ToD) Tariff Structure
    // Morning Off-Peak: 22:00 - 06:00 (₹6.20)
    // Normal: 06:00 - 18:00 (₹9.50)
    // Evening Super-Peak: 18:00 - 22:00 (₹13.80 + demand penalty)
    let todTariff = typology.typicalTariffINR;
    let isPeak = false;
    if (h >= 18 && h <= 22) {
      todTariff = Number((typology.typicalTariffINR * 1.45).toFixed(2)); // +45% ToD surcharge
      isPeak = true;
    } else if (h >= 22 || h < 6) {
      todTariff = Number((typology.typicalTariffINR * 0.75).toFixed(2)); // -25% off-peak rebate
    }

    // BASELINE CALCULATION (Conventional legacy non-optimized building)
    // Oversized constant volume / conventional BMS running fixed 22.5°C setpoint
    const baseHvacLoadTR = scale * (220 + (outdoorTemp - 22) * 16 + (occPercent / 100) * 110);
    // Baseline chiller specific consumption: ~0.82 kW/TR + pumps/fans 0.28 kW/TR = 1.10 kW/TR
    const baseHvacKw = Math.round(baseHvacLoadTR * 1.08);
    // Baseline lighting (fixed schedule, fluorescent/legacy LED without daylight dimming)
    const baseLightingKw = Math.round(scale * 160 * (occPercent > 10 ? 0.95 : 0.4));
    // Baseline plug load
    const basePlugKw = Math.round(scale * 140 * (0.25 + (occPercent / 100) * 0.75));
    
    // Add active faults penalty to baseline
    const faultPenaltyKw = activeFaults
      .filter(f => f.isActive)
      .reduce((sum, f) => sum + f.wasteKw * scale, 0);

    const baselineTotalKw = Math.round(baseHvacKw + baseLightingKw + basePlugKw + faultPenaltyKw);
    const baselineIndoorTemp = 22.8;
    const baselineIndoorCO2 = Math.round(450 + (occPercent / 100) * 850);

    // OPTIMIZED SENSORBUILD SYSTEM
    // Indian Model for Adaptive Comfort (IMAC): Setpoint = 0.54 * To + 12.83, clamped between 24.0°C and 26.0°C
    const imacComfortSetpoint = adaptiveComfortEnabled
      ? Number(Math.min(26.0, Math.max(24.0, 0.54 * outdoorTemp + 12.83)).toFixed(1))
      : 24.0;

    // Delta-T relief: 1°C increase in chilled water setpoint / room setpoint saves ~6.2% chiller compressor work
    const setpointDelta = imacComfortSetpoint - 22.5;
    const setpointSavingsFraction = Math.max(0, setpointDelta * 0.062);

    // Occupancy-driven setback: if zone occupancy drops, trim AHU airflow via VFDs
    const occSavingsFraction = (1 - occPercent / 100) * 0.22;

    // Dynamic Chiller sequencing + optimal Condenser Water Reset: COP improves from 3.8 to 5.4 (0.65 kW/TR)
    const chillerEffSavings = 0.18;

    // Net HVAC optimization fraction
    const totalHvacSavingsFraction = Math.min(0.48, setpointSavingsFraction + occSavingsFraction + chillerEffSavings);
    let optHvacKw = Math.round(baseHvacKw * (1 - totalHvacSavingsFraction));

    // Smart Daylight Harvesting + PIR Task Lighting
    const daylightFactor = solarRadiation > 400 ? 0.55 : (solarRadiation > 100 ? 0.3 : 0);
    const optLightingKw = Math.round(scale * 90 * (occPercent / 100) * (1 - daylightFactor * 0.5));

    // Plug load sleep optimization
    const optPlugKw = Math.round(basePlugKw * 0.88);

    // Solar PV Generation (assuming 350 kWp rooftop solar for 20k m² building)
    const solarCapKwp = 350 * scale;
    const solarGenerationKw = Math.round((solarRadiation / 1000) * solarCapKwp * 0.82);

    // BESS (Battery Energy Storage System) - 150 kWh capacity
    // Charge during morning solar surplus / cheap off-peak (01:00-05:00 or 12:00-14:00)
    // Discharge during evening peak ToD tariff hours (18:00 - 21:00)
    let batteryDischargeKw = 0;
    if (todShavingEnabled && isPeak) {
      batteryDischargeKw = Math.round(Math.min(95 * scale, (optHvacKw + optLightingKw) * 0.28));
    }

    // Optimized Net Grid Draw
    const optimizedTotalKw = Math.max(25, Math.round(optHvacKw + optLightingKw + optPlugKw - solarGenerationKw - batteryDischargeKw));

    return {
      hour: h,
      outdoorTemp,
      outdoorRH,
      solarRadiation,
      occupancyPercent: occPercent,
      todTariffINR: todTariff,
      isPeakToD: isPeak,
      baselineKw: baselineTotalKw,
      baselineIndoorTemp,
      baselineIndoorCO2,
      baselineHvacKw: baseHvacKw,
      baselineLightingKw: baseLightingKw,
      optimizedKw: optimizedTotalKw,
      optimizedIndoorTemp: imacComfortSetpoint,
      optimizedIndoorCO2: Math.min(850, Math.round(420 + (occPercent / 100) * 400)), // DCV keeps below 800 ppm
      optimizedHvacKw: optHvacKw,
      optimizedLightingKw: optLightingKw,
      solarGenerationKw,
      batteryDischargeKw,
      chillerCop: Number((3.8 + (1 - optHvacKw / baseHvacKw) * 2.2).toFixed(2)),
      adaptiveSetpoint: imacComfortSetpoint,
    };
  });

  return hours;
}
