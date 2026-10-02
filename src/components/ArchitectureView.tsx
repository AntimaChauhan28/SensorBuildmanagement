import React, { useState } from 'react';
import { 
  Cpu, 
  Radio, 
  Cloud, 
  Building, 
  ArrowDown, 
  ShieldCheck, 
  CheckCircle, 
  Layers, 
  Wifi, 
  Zap, 
  Lock, 
  Database, 
  Send,
  Terminal,
  Activity
} from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  category: 'sensors' | 'edge' | 'cloud' | 'integration';
  protocol: string;
  frequency: string;
  specs: string;
  security: string;
  payloadSample: string;
  description: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: 'node-lorawan-iaq',
    name: 'Wireless LoRaWAN IAQ Multi-Sensor',
    category: 'sensors',
    protocol: 'LoRaWAN 1.0.3 (IN865 Band)',
    frequency: 'Every 5 Minutes',
    specs: 'Temp (±0.2°C), RH (±2%), NDIR CO₂ (±30 ppm), Laser PM2.5 (±5 µg/m³), TVOC (ppb)',
    security: 'AES-128 Bit End-to-End Payload Encryption, OTAA Activation',
    payloadSample: `{\n  "devEUI": "70B3D57ED004A12B",\n  "temp_c": 24.6,\n  "rh_pct": 52.4,\n  "co2_ppm": 642,\n  "pm25_ugm3": 18,\n  "battery_v": 3.62\n}`,
    description: 'Peel-and-stick wireless room sensor powered by dual AA lithium batteries (5-year lifespan). Deployed at 1 sensor per 120 m² density.'
  },
  {
    id: 'node-mmwave-occupancy',
    name: '60 GHz mmWave True Occupancy Radar',
    category: 'sensors',
    protocol: 'Modbus RTU / RS-485 (9600 Baud)',
    frequency: 'Continuous (1-second update)',
    specs: '60GHz FMCW radar beam, 120° FOV, micro-respiration sensing (detects motionless seated workers)',
    security: 'Physical bus isolation, CRC-16 error checksum',
    payloadSample: `{\n  "zone_id": "FL3_NORTH_WING",\n  "occupant_count": 14,\n  "micro_motion_detected": true,\n  "dwell_time_mins": 42\n}`,
    description: 'Overcomes standard PIR blind spots. Accurately counts occupants in conference rooms and open-plan desk bays to drive VFD airflow trim.'
  },
  {
    id: 'node-split-core-meter',
    name: 'Class 0.2S Split-Core Energy Meters',
    category: 'sensors',
    protocol: 'Modbus RTU / RS-485 Daisy Chain',
    frequency: '10-Second Polling',
    specs: '3-Phase True RMS V, I, kW, kVA, kVAR, Power Factor (0.01 resolution), THD up to 31st harmonic',
    security: 'Class 0.2S certified accuracy under IEC 62053-22, tamper-proof audit register',
    payloadSample: `{\n  "meter_id": "CHILLER_PLANT_MCC1",\n  "active_power_kw": 348.6,\n  "power_factor": 0.982,\n  "v_line_avg": 415.2,\n  "current_a": 492.1\n}`,
    description: 'Clamp-on split-core current transformers installed directly on LT distribution boards without cutting main busbar power.'
  },
  {
    id: 'node-ultrasonic-btu',
    name: 'Clamp-On Ultrasonic BTU Meter',
    category: 'sensors',
    protocol: 'M-Bus / Modbus RS-485',
    frequency: '30-Second Polling',
    specs: 'Transit-time ultrasonic transducers, matched 4-wire PT1000 RTDs for Supply/Return Delta-T (±0.05°C)',
    security: 'Hardware sealed, zero moving parts, non-wetted sensor mount',
    payloadSample: `{\n  "chw_flow_gpm": 842.0,\n  "chw_supply_temp_c": 7.22,\n  "chw_return_temp_c": 12.84,\n  "delta_t_c": 5.62,\n  "thermal_tonnage_tr": 394.2\n}`,
    description: 'Mounted externally on chilled water headers to calculate instantaneous thermal tonnage (TR) delivered to AHUs and primary cooling coils.'
  },
  {
    id: 'node-edge-gateway',
    name: 'UrjaEdge Industrial IoT Gateway',
    category: 'edge',
    protocol: 'BACnet IP, Modbus RTU/TCP, MQTT v5 over TLS 1.3',
    frequency: 'Local loop 1-sec, Cloud sync 60-sec',
    specs: 'Quad-Core ARM Cortex-A53, 2GB RAM, 32GB eMMC, Dual Gigabit Ethernet, Dual RS-485, DIN-Rail mounted',
    security: 'Hardware TPM 2.0 cryptoprocessor, encrypted SQLite local ring buffer (30 days offline endurance)',
    payloadSample: `{\n  "gateway_uuid": "EDGE-DL-NCR-04",\n  "bms_status": "ONLINE_BACNET_IP",\n  "local_fail_safe": "ARMED",\n  "cached_packets": 0,\n  "edge_ekf_residual": 0.042\n}`,
    description: 'On-premises brain. Normalizes heterogeneous building protocols, runs local Extended Kalman Filter (EKF) and safety interlock fallbacks if cloud link drops.'
  },
  {
    id: 'node-cloud-twin',
    name: 'Physics-Informed Digital Twin (Sovereign Cloud)',
    category: 'cloud',
    protocol: 'RESTful API / gRPC over mTLS',
    frequency: 'Solves MPC convex optimization every 10 mins',
    specs: '3R2C Grey-Box RC thermal state-space engine, IMD 72-hour hourly weather forecast integration',
    security: 'MeitY-empaneled tier-4 Indian data center, SOC-2 Type II, ISO 27001, RBAC',
    payloadSample: `{\n  "building_id": "IT_PARK_GURUGRAM_SEZ",\n  "model_type": "3R2C_GREY_BOX_MPC",\n  "chwst_target_setpoint_c": 8.5,\n  "ahu_vfd_speed_hz": 38.5,\n  "projected_cost_savings_inr_hr": 2840\n}`,
    description: 'Simulates building thermal mass inertia, solar angles, and occupancy schedules to predict cooling requirements 4 hours in advance.'
  },
  {
    id: 'node-legacy-bms',
    name: 'Legacy BMS Interoperability Bridge',
    category: 'integration',
    protocol: 'BACnet/IP, BACnet MS/TP, OPC-DA/UA',
    frequency: 'Continuous bi-directional polling',
    specs: 'Compatible with Johnson Controls Metasys, Honeywell WEBs, Siemens Desigo, Schneider EcoStruxure',
    security: 'Read-only parameter audit logging with hardcoded mechanical high/low limit clamps',
    payloadSample: `{\n  "bms_vendor": "HONEYWELL_WEBS_N4",\n  "point_id": "CHILLER1_ENABLE_SP",\n  "command_type": "SETPOINT_WRITE",\n  "original_value": 7.0,\n  "new_optimal_value": 8.4\n}`,
    description: 'Eliminates rip-and-replace. Writes optimized setpoints directly to legacy DDC controllers while respecting all manufacturer safety limits.'
  },
  {
    id: 'node-discom-openadr',
    name: 'DISCOM Automated Demand Response (OpenADR 2.0b)',
    category: 'integration',
    protocol: 'OpenADR 2.0b Profile, IEEE 2030.5',
    frequency: 'Event-driven & Day-ahead ToD sync',
    specs: 'Connects to BSES Rajdhani/Yamuna, Tata Power, MSEDCL, BESCOM smart meter AMI headends',
    security: 'ECDSA digital signatures, X.509 utility client certificates',
    payloadSample: `{\n  "discom": "BSES_DELHI",\n  "event_type": "PEAK_CURTAILMENT_EVENT",\n  "target_kw_shed": 120,\n  "start_time": "18:00:00",\n  "incentive_inr_kwh": 4.50\n}`,
    description: 'Monetizes building flexibility. Automatically sheds non-critical HVAC loads and engages BESS discharge during high grid stress.'
  }
];

export const ArchitectureView: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-edge-gateway');
  const activeNode = ARCH_NODES.find(n => n.id === selectedNodeId) || ARCH_NODES[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Architecture Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                UrjaSetu 4-Tier End-to-End System Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              Interactive data pipeline: from non-invasive clamp-on field sensing to sovereign cloud twin and DISCOM OpenADR grid integration.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              100% Non-Invasive Retrofit
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 font-semibold">
              <Lock className="h-4 w-4 text-sky-600" />
              AES-128 & TLS 1.3
            </span>
          </div>
        </div>
      </div>

      {/* Visual 4-Tier Architecture Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Architecture Tiers (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* TIER 4: Enterprise & Utility Integration */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700 font-mono">
                Tier 4: Enterprise & DISCOM Grid Interfaces
              </span>
              <span className="text-[11px] text-slate-500 font-mono">OpenADR 2.0b · BACnet/IP · REST</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCH_NODES.filter(n => n.category === 'integration').map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNodeId === node.id 
                      ? 'bg-violet-50/80 border-violet-500 shadow-xs' 
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{node.name}</span>
                    <Building className="h-4 w-4 text-violet-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{node.protocol}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="bg-slate-200 text-slate-600 p-1 rounded-full">
              <ArrowDown className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* TIER 3: Sovereign Cloud Digital Twin */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 font-mono">
                Tier 3: Sovereign Cloud Digital Twin & Machine Learning
              </span>
              <span className="text-[11px] text-slate-500 font-mono">MeitY Cloud · 3R2C Physics Engine</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ARCH_NODES.filter(n => n.category === 'cloud').map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNodeId === node.id 
                      ? 'bg-sky-50/80 border-sky-500 shadow-xs' 
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{node.name}</span>
                    <Cloud className="h-4 w-4 text-sky-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{node.protocol} · {node.frequency}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="bg-slate-200 text-slate-600 p-1 rounded-full">
              <ArrowDown className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* TIER 2: Edge Computing Gateway */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Tier 2: Edge Intelligence & Protocol Gateway
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Local EKF · Offline Fail-Safe</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ARCH_NODES.filter(n => n.category === 'edge').map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNodeId === node.id 
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-xs' 
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{node.name}</span>
                    <Cpu className="h-4 w-4 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{node.protocol} · {node.specs}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="bg-slate-200 text-slate-600 p-1 rounded-full">
              <ArrowDown className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* TIER 1: Sensors & Actuators */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono">
                Tier 1: Non-Invasive Field Sensors & Metering
              </span>
              <span className="text-[11px] text-slate-500 font-mono">LoRaWAN 865 MHz · Modbus RS-485</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCH_NODES.filter(n => n.category === 'sensors').map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedNodeId === node.id 
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs' 
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{node.name}</span>
                    <Radio className="h-4 w-4 text-amber-600 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{node.protocol}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Node Inspector (Right 4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                  Node Inspector
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1.5">{activeNode.name}</h3>
              </div>
              <Terminal className="h-4 w-4 text-slate-400" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {activeNode.description}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 text-[11px]">Industrial Protocol</span>
                <div className="text-slate-900 font-mono font-semibold">{activeNode.protocol}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px]">Telemetry Frequency</span>
                <div className="text-slate-800 font-mono">{activeNode.frequency}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px]">Hardware Specifications</span>
                <div className="text-slate-700">{activeNode.specs}</div>
              </div>

              <div>
                <span className="text-slate-500 text-[11px]">Security & Encryption</span>
                <div className="text-emerald-700 font-mono text-[11px] font-semibold">{activeNode.security}</div>
              </div>
            </div>

            {/* Live Telemetry JSON Payload Sample */}
            <div className="mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-500">Live JSON Payload</span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  CRC-16 OK
                </span>
              </div>
              <pre className="bg-slate-900 p-3 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto shadow-inner">
                {activeNode.payloadSample}
              </pre>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>Tested against Honeywell, Siemens, Schneider & Johnson Controls BMS.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
