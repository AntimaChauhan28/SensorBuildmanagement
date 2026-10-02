import { PptSlide } from '../types';

export const PPT_SLIDES: PptSlide[] = [
  {
    id: 1,
    category: 'Title & Vision',
    title: 'UrjaSetu: AI-Driven Energy Orchestration for Indian Buildings',
    keyTakeaway: 'Bridging the gap between code-compliant buildings and genuinely smart, climate-responsive facilities.',
    bullets: [
      'Problem Scope: Buildings consume 33% of India’s electricity, projected to surge with rapid commercial expansion.',
      'Core Innovation: Physics-Informed Digital Twin + LoRaWAN IoT + DISCOM Peak Tariff Arbitrage.',
      'Engineered for India: Built for 5 Indian climate zones, legacy brownfield building stock, and BEE ECBC standards.',
      'Proven Impact: 37.5% whole-building energy reduction | 17.3 months payback | 1,500+ MT CO₂ saved per facility.'
    ],
    metrics: [
      { label: 'India Building Load', value: '33%', detail: 'Of national electricity demand' },
      { label: 'Target Savings', value: '34-42%', detail: 'Annual kWh reduction' },
      { label: 'Payback Period', value: '17.3 Mo', detail: 'Rapid commercial ROI' }
    ],
    speakerNotes: 'Good morning respected jury members. Today, 33% of India\'s electricity is sucked into commercial and residential buildings—mostly wasted on overcooled chillers, empty rooms, and rigid schedules. We present UrjaSetu, an edge-to-cloud digital twin platform tailored specifically for Indian building typologies and climate zones.',
    hinglishTip: 'Pitch shuru karte hi 33% electricity wastage ka impact batayein aur bole ki bina kisi building ko todhe ya rewire kiye 18 mahine me paisa vasool solution hai.'
  },
  {
    id: 2,
    category: 'The Crisis',
    title: 'The Indian Real Estate Paradox: High Bills, Low Intelligence',
    keyTakeaway: '85% of commercial facilities operate with static setpoint paralysis and zero real-time operational feedback.',
    bullets: [
      'Oversized & Overcooled: Chillers running at locked 22°C when outside is 44°C, wasting 6% extra energy per °C.',
      'Unoccupied Consumption: Meeting rooms and floors kept fully conditioned and illuminated during 40% empty hours.',
      'Invisible Equipment Degradation: Condenser scaling and stuck dampers cause 15-25% unmetered energy penalties.',
      'Brutal DISCOM Penalties: Time-of-Day (ToD) peak tariffs charge up to 1.5x during evening hours with steep demand penalties.'
    ],
    metrics: [
      { label: 'HVAC Share', value: '55-62%', detail: 'Of total building electric bill' },
      { label: 'Wasted Energy', value: '30-40%', detail: 'Due to lack of smart controls' },
      { label: 'DISCOM ToD Peak', value: '1.45x', detail: 'Tariff multiplier 18:00-22:00' }
    ],
    speakerNotes: 'Walk into any Indian IT park or corporate office: employees wear jackets in June because chillers are locked at 22°C! Meanwhile, outdoor temperatures are 44°C. Chillers work at brutal lifts, cooling empty conference rooms, and when 6 PM hits, DISCOM ToD peak charges kick in, bleeding facility budgets.',
    hinglishTip: 'Sabse bada dard: June ke mahine me office me sweater pehenna padta hai aur facility manager ka bijli bill aasmaan chhoota hai!'
  },
  {
    id: 3,
    category: 'Solution Architecture',
    title: 'UrjaSetu 4-Tier Non-Invasive Technology Stack',
    keyTakeaway: '100% plug-and-play brownfield retrofit without tearing walls or changing existing chillers.',
    bullets: [
      'Tier 1: Non-Invasive Sensors: Wireless LoRaWAN (865-867 MHz) IAQ nodes + mmWave true occupancy + split-core CT power meters.',
      'Tier 2: UrjaEdge Industrial Gateway: Embedded Linux gateway with local SQLite cache and offline rule-arbitration safety.',
      'Tier 3: Sovereign Cloud Digital Twin: Physics-Informed 3R2C thermal model + Extended Kalman Filter + MPC optimizer.',
      'Tier 4: Enterprise & Utility Integration: Native BACnet/Modbus bridge to existing BMS + OpenADR 2.0b DISCOM interface.'
    ],
    metrics: [
      { label: 'Deployment Time', value: '6 Weeks', detail: 'Zero downtime turnkey setup' },
      { label: 'Wireless Range', value: '1.2 km', detail: 'Deep indoor penetration' },
      { label: 'Edge Fail-Safe', value: '100%', detail: 'Local autonomous operation' }
    ],
    speakerNotes: 'How do we deploy this without disrupting 2,000 employees working in the facility? Through a completely non-invasive 4-tier architecture. Split-core CTs clamp onto panels without cutting power; wireless LoRaWAN sensors stick onto walls; and our edge gateway speaks directly to legacy BMS systems over BACnet or Modbus.',
    hinglishTip: 'Point out: Na koi taar khinchna hai, na office band karna hai. Sirf clamp-on meters aur peel-and-stick wireless sensors lagte hain.'
  },
  {
    id: 4,
    category: 'Mechanism of Action',
    title: 'Physics-Informed Digital Twin & Adaptive Comfort',
    keyTakeaway: 'Lumped 3R2C thermal model coupled with the Indian Model for Adaptive Comfort (IMAC).',
    bullets: [
      '3R2C Thermal Network: Models building concrete thermal mass, solar heat gain, and internal occupant load.',
      'IMAC Dynamic Setpoint: Shifts indoor setpoints between 24°C and 26°C based on outdoor running mean temperature.',
      'Thermodynamic Efficiency: Every 1°C increase in chilled water setpoint cuts chiller compressor lift and saves 6.2% energy.',
      'Pre-Cooling Arbitrage: Pre-cools building thermal mass during early morning cheap electricity to coast through peak tariff hours.'
    ],
    metrics: [
      { label: 'Lift Reduction', value: '18-22%', detail: 'Compressor power savings' },
      { label: 'Comfort Standard', value: 'NBC 2016', detail: 'Compliant with Indian IMAC' },
      { label: 'Thermal Inertia', value: '3.5 Hrs', detail: 'Passive coasting window' }
    ],
    speakerNotes: 'Unlike naive AI models that hallucinate, we use a Physics-Informed 3R2C grey-box model. It calculates the building’s thermal inertia. Using the Indian Model for Adaptive Comfort from NBC 2016, we smoothly adjust setpoints between 24°C and 26°C, keeping tenants perfectly comfortable while saving massive chiller compressor work.',
    hinglishTip: 'Explain IMAC simply: Hamari body natural bahar ke mausam ke hisab se adapt hoti hai. 22°C ki zaroorat nahi hai, 24.5°C pe perfect comfort milta hai aur 15% bijli turant bachti hai.'
  },
  {
    id: 5,
    category: 'Climate Fit',
    title: 'Mastering India’s 5 Climate Zones with Tailored Control',
    keyTakeaway: 'Specific thermodynamic strategies tailored for Composite, Warm-Humid, Hot-Dry, Temperate, and Cold zones.',
    bullets: [
      'Composite (Delhi-NCR): High sensible heat in summer; humidity reheat in monsoon; DOAS dual-stage PM2.5 filtration in winter.',
      'Warm-Humid (Mumbai/Chennai): Dew-point decoupled latent load control with heat-pipe heat recovery to prevent overcooling.',
      'Hot-Dry (Ahmedabad/Jaipur): Two-stage indirect evaporative cooling + deep night-sky radiative thermal mass purging.',
      'Temperate (Bengaluru/Pune): 1,600+ hours of airside economizer free cooling when ambient air is between 18°C and 24°C.',
      'Cold (Shimla/Srinagar): Heat recovery ventilators (HRV) with >78% thermal efficiency to conserve space heating.'
    ],
    metrics: [
      { label: 'Coverage', value: '5 Zones', detail: '100% of Indian geography' },
      { label: 'Free Cooling', value: '1,600 Hrs', detail: 'Annual in temperate zones' },
      { label: 'BEE Benchmarks', value: 'ECBC to ECBC+', detail: 'Verified star compliance' }
    ],
    speakerNotes: 'India is not one climate. A building in Mumbai has massive humidity; Delhi has extreme dry heat then monsoon then winter smog; Bengaluru has ideal weather for free cooling. UrjaSetu switches control physics according to the exact ECBC climate zone.',
    hinglishTip: 'Ek hi dava sab bimari ke liye nahi chalti. Mumbai me humidity todna hai, Delhi me garmi aur pollution, aur Bangalore me bahar ki thandi hawa se free cooling karni hai.'
  },
  {
    id: 6,
    category: 'FDD & Diagnostics',
    title: 'Automated Fault Detection & Diagnostics (FDD)',
    keyTakeaway: 'Early diagnosis of chiller fouling, stuck dampers, and low delta-T syndrome saves 8-14% energy.',
    bullets: [
      'Condenser Scaling Alert: Detects approach temperature drift > 1.8°C before tube scale causes severe compressor surge.',
      'Fresh Air Damper Diagnostics: Flags stuck outdoor air dampers admitting 44°C outdoor heat during peak afternoon loads.',
      'Low Delta-T Mitigation: Automatically corrects chilled water return delta-T from 2.9°C to design 5.5°C via Trim & Respond.',
      'Plain Language Action Tickets: Sends localized WhatsApp/SMS alerts to plant technicians in Hindi and English with exact steps.'
    ],
    metrics: [
      { label: 'Invisible Loss', value: '15-25%', detail: 'Prevented equipment penalty' },
      { label: 'Response Time', value: '< 5 Mins', detail: 'Automated fault classification' },
      { label: 'Equipment Life', value: '+3.5 Yrs', detail: 'Extended chiller longevity' }
    ],
    speakerNotes: 'In most plants, condenser tubes get fouled, dampers get stuck, and nobody notices until the monthly bill arrives or the chiller trips. UrjaSetu continuously diagnoses thermodynamic deviations, generating actionable Hindi and English maintenance tickets for technicians.',
    hinglishTip: 'Plant technicians ke liye WhatsApp pe seedha message: "Chiller 2 ke condenser me kachra jam raha hai, approach 4.8°C hai, cleaning cycle chalao". Zero guesswork!'
  },
  {
    id: 7,
    category: 'Solar & Peak Shaving',
    title: 'Solar Self-Consumption & DISCOM ToD Peak Shaving',
    keyTakeaway: 'Synchronizing rooftop solar PV, 150 kWh BESS, and flexible HVAC loads against utility tariffs.',
    bullets: [
      'Self-Consumption Optimization: Diverts surplus mid-day rooftop solar generation into on-site BESS rather than cheap export.',
      'Evening ToD Arbitrage: Discharges stored solar power during the expensive 18:00–22:00 window (₹13.80/kWh grid power).',
      'Contract Demand Capping: Prevents costly kVA maximum demand surcharge penalties from DISCOMs.',
      'OpenADR 2.0b Ready: Monetizes building flexibility by participating in utility automated demand response programs.'
    ],
    metrics: [
      { label: 'Solar Use', value: '94%', detail: 'On-site self-consumption' },
      { label: 'Peak kW Shaved', value: '31%', detail: 'During evening 18:00-22:00' },
      { label: 'ToD Savings', value: '₹22 L/yr', detail: 'From tariff differential alone' }
    ],
    speakerNotes: 'Most commercial buildings have rooftop solar, but export surplus energy to the DISCOM at low net-metering feed-in tariffs. UrjaSetu stores daytime solar in a compact BESS and discharges it during the evening 18:00 to 22:00 peak when electricity costs ₹13.80 per unit.',
    hinglishTip: 'Dopehar ki sasti dhoop ki bijli battery me store karo, aur shaam ko 6 se 10 baje jab DISCOM sabse mehenga rate leti hai, tab use karke bill aadha kar do.'
  },
  {
    id: 8,
    category: 'Quantified Financials',
    title: 'Financial Feasibility & 17.3-Month Payback Analysis',
    keyTakeaway: 'Engineered for rapid capital recovery on a 25,000 m² Indian benchmark commercial facility.',
    bullets: [
      'Annual Energy Baseline: 5,000,000 kWh/year (EPI = 200 kWh/m²/yr) | Annual electricity bill = ₹4.60 Crore.',
      'Optimized Performance: 3,125,000 kWh/year (EPI = 125 kWh/m²/yr) | Annual savings = ₹1.72 Crore (37.5%).',
      'Total Retrofit Capex: ₹2.48 Crore (₹92/sq.ft turnkey including sensors, gateways, metering, and installation).',
      'Financial Returns: Simple Payback = 17.3 Months | 5-Year NPV = ₹4.06 Crore (@10% WACC) | IRR = 62.4%.'
    ],
    metrics: [
      { label: 'Annual Savings', value: '₹1.72 Cr', detail: 'Direct utility cost reduction' },
      { label: 'Payback Period', value: '17.3 Mo', detail: 'Simple capital recovery' },
      { label: '5-Yr NPV', value: '₹4.06 Cr', detail: 'Net present value generation' }
    ],
    speakerNotes: 'Here is the unassailable business case. For a typical 25,000 m² IT park, the annual electric bill is ₹4.6 Crore. UrjaSetu saves ₹1.72 Crore every single year. At a turnkey capex of ₹2.48 Crore, the facility owner recovers 100% of their investment in under 18 months, with an IRR of 62.4%.',
    hinglishTip: 'Building owner ka number 1 question hota hai: "Mera paisa kab wapas aayega?". Answer: 18 mahine ke andar poora paisa wapas, aur agle 10 saal tak har saal 1.7 Crore ki seedhi bachat.'
  },
  {
    id: 9,
    category: 'Tenant Engagement',
    title: 'Tenant Gamification & Transparent Comfort Micro-Portals',
    keyTakeaway: 'Empowering occupants with real-time IAQ feedback and localized comfort voting.',
    bullets: [
      'QR-Code Zone Portals: Occupants scan a desk/room QR code to view live temperature, humidity, and CO₂/PM2.5 levels.',
      'Direct Comfort Voting: "Too Hot / Just Right / Too Cold" votes feed into the edge MPC algorithm to prevent discomfort.',
      'Departmental Green Badges: Gamified monthly energy conservation leaderboards between floors and corporate tenants.',
      'ESG & Green Lease Reporting: Automated monthly BRSR and GRI-compliant carbon accounting reports for multinational tenants.'
    ],
    metrics: [
      { label: 'Tenant Satisfaction', value: '+42%', detail: 'Fewer hot/cold complaints' },
      { label: 'IAQ Compliance', value: '100%', detail: 'ASHRAE 62.1 & ISHRAE' },
      { label: 'ESG Reporting', value: 'Automated', detail: 'BRSR & Scope-2 ready' }
    ],
    speakerNotes: 'Energy efficiency fails if occupants are uncomfortable. We provide a lightweight QR-code portal for tenants to see real-time indoor air quality and submit 1-click comfort feedback. This closes the human loop and cuts facility complaint calls by over 40%.',
    hinglishTip: 'Desk pe laga chhota QR code scan karo, air quality dekho aur batao ki thand lag rahi hai ya garmi. AI algorithm us zone ka setpoint minute bhar me theek kar dega.'
  },
  {
    id: 10,
    category: 'Deployment Roadmap',
    title: 'Phased 6-Week Turnkey Retrofit & Pan-India Scale',
    keyTakeaway: 'Standardized operational blueprint designed for Tier-1, Tier-2, and smart city scale.',
    bullets: [
      'Weeks 1-2: Non-invasive audit + split-core CT power sub-metering + ultrasonic clamp-on BTU flow meters.',
      'Weeks 3-4: Wireless LoRaWAN sensor placement + edge gateway deployment + passive baseline twin calibration.',
      'Weeks 5-6: Closed-loop supervisory optimization activation + operator training + tenant dashboard rollout.',
      'Scalability: 100% containerized edge software deployable across commercial offices, IT SEZs, hospitals, and campuses.'
    ],
    metrics: [
      { label: 'Turnaround Time', value: '6 Weeks', detail: 'Total site commissioning' },
      { label: 'Power Shutdowns', value: 'Zero', detail: 'Split-core clamp technology' },
      { label: 'National Target', value: '100M sq.ft', detail: 'Potential savings 1.2 TWh/yr' }
    ],
    speakerNotes: 'In conclusion, UrjaSetu is not a theoretical whitepaper—it is a turnkey, commercially viable, physics-grounded engineering solution ready to scale across India\'s 300 million square meters of commercial space. Thank you, and we welcome your questions.',
    hinglishTip: 'Ending line: UrjaSetu India ki green building revolution ka practical engine hai—sasta, tez, aur 100% bharosemand.'
  }
];
