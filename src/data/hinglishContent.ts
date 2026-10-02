import { HinglishSection } from '../types';

export const HINGLISH_SECTIONS: HinglishSection[] = [
  {
    id: 'problem-statement',
    titleHindi: '१. समस्या क्या है? (The Indian Building Energy Crisis)',
    titleEnglish: 'Why Indian Buildings Bleed 30-40% Electricity',
    simpleExplanation: 'India me commercial buildings (IT parks, offices, malls, hospitals) desh ki lagbhag 33% bijli akele consume kar rahi hain. Sabse bada dard yeh hai ki isme se 35% se zyada bijli bilkul faaltu waste hoti hai. Chiller plants ko 22°C pe lock karke chhod diya jata hai, jabki bahar 44°C dhoop hoti hai. Conference rooms me koi baitha nahi hota, fir bhi AC aur lights full speed pe chalti rehti hain!',
    keyPoints: [
      'Chiller Oversizing & Static Setpoint: Bharat ke 85% offices me chillers 21°C–22°C pe chalte hain. Har 1°C thanda karne par 6% zyada bijli lagti hai.',
      'Khali rooms me cooling: Meeting rooms aur workstations 30-40% time khali rehte hain, par centralized AC bina ruke hawa fekta rehta hai.',
      'DISCOM ToD Peak Penalty: Shaam ko 6 se 10 baje DISCOM bijli ka rate 1.45x kar deta hai (₹13.80/unit), aur maximum demand kVA penalty alag se thok deta hai.',
      'Chhupa hua nuksaan (FDD): Chiller ke condenser me kachra (scale) jamta hai, dampers atak jaate hain, par facility manager ko pata hi nahi chalta.'
    ],
    juryQuestion: 'Jury Question: "Aapke paas already Honeywell/Siemens ka BMS hai, toh naya software kyu lagayein?"',
    winningAnswerHinglish: 'Answer: "Sir, traditional BMS sirf ek dumb switchboard ki tarah hai—wo schedule pe on/off karta hai, par dynamically optimize nahi karta. Hamara UrjaSetu existing BMS ke upar ek AI brain ki tarah baithta hai (BACnet/Modbus ke through), jo outdoor weather, real human footfall aur DISCOM tariff ko dekh kar chillers aur AHUs ko real-time auto-tune karta hai bina kisi purane hardware ko replace kiye!"'
  },
  {
    id: 'mechanism-explained',
    titleHindi: '२. UrjaSetu Ka Jadoo: Kaam Kaise Karta Hai?',
    titleEnglish: 'Mechanism of Action in Everyday Hinglish',
    simpleExplanation: 'UrjaSetu 3 aasan steps me kaam karta hai: Pehla—Wireless LoRaWAN sensors aur clamp-on meters building ke har kone ka data lete hain bina koi taar kaate. Doosra—Hamara Edge Gateway aur Digital Twin thermal physics model calculate karta hai ki building ko kitni cooling ki actual zaroorat hai. Teesra—Chillers aur AHUs ke setpoint ko dynamic 24°C se 26°C ke beech adapt karta hai aur shaam ki mehengi bijli me battery se power deta hai.',
    keyPoints: [
      'IMAC Adaptive Comfort: Indian Model for Adaptive Comfort (NBC 2016) ke hisab se hamari body 24.5°C–25°C par bilkul comfortable rehti hai. Chillers par lift kam hoti hai aur 18-22% compressor power turant bachti hai.',
      'True Occupancy Sensing: PIR sensor sirf tab chalte hain jab insaan hile. Hamara 60GHz mmWave radar baithe hue shant employee ko bhi detect karta hai. Agar zone khali hai, toh VFD se fan speed 35 Hz kar di jaati hai.',
      'Pre-Cooling Magic: Subah 5 se 8 baje jab bijli sasti hoti hai, tab building ke concrete slab ko halka thanda kar lete hain. Shaam ko 6 baje peak tariff aane par chillers ko low power pe chala kar thermal inertia se building cool rehti hai.',
      'Solar + BESS Time Arbitrage: Dopehar ki surplus solar power 150 kWh battery me store hoti hai, aur shaam 6 se 10 baje discharge karke grid se mehengi unit lene se bacha leti hai.'
    ],
    juryQuestion: 'Jury Question: "24°C se 26°C setpoint karne par employees complaint nahi karenge ki garmi lag rahi hai?"',
    winningAnswerHinglish: 'Answer: "Nahi sir! Traditional 22°C pe log sweaters aur shawls pehante the. Hum airflow (air velocity) aur humidity ko control karte hain. Agar hawa ka flow gentle 0.25 m/s ho aur relative humidity 55% ho, toh 25°C par insaan ko 22°C se behtar aur fresh mehsoos hota hai. Saath me humne QR-code comfort feedback diya hai, jisse employee vote kar sakta hai!"'
  },
  {
    id: 'practicality-and-retrofit',
    titleHindi: '३. Indian Ground Reality: Retrofit Itna Aasaan Kyu Hai?',
    titleEnglish: 'Why This is 100% Practical for Indian Building Stock',
    simpleExplanation: 'Indian building owners kabhi bhi aisi technology accept nahi karenge jisme 2 mahine office band karna pade ya deewar tod kar taarein daalni padein. UrjaSetu ko 100% non-invasive brownfield retrofit ke liye design kiya gaya hai. Split-core CT meters panel me clamp ho jate hain bina electricity cut kiye, aur LoRaWAN sensors battery-powered hain jo 5 saal bina wire ke chalte hain.',
    keyPoints: [
      'Zero Downtime Deployment: 1 ghante ke liye bhi facility ka power cut nahi karna padta. Saare meters clamp-on type hain.',
      'Wireless LoRaWAN (865-867 MHz): Yeh Indian ISM free frequency band hai. RCC deewaron aur 15 floors ke concrete shafts ke paar bhi signal smoothly travel karta hai.',
      'Local Edge Fail-Safe: Agar internet chala gaya ya optical fiber cut ho gaya, toh bhi plant band nahi hoga. Edge Gateway par local rule engine autonomously chillers ko safe limits me chalata rehta hai.',
      'Technicians ke liye Hindi WhatsApp alerts: Plant operator ko koi complex software nahi chalana padta. WhatsApp par simple Hindi message aata hai ki kaunsa valve ya pump check karna hai.'
    ],
    juryQuestion: 'Jury Question: "Agar building me standard BMS hi na ho (sirf local standalone split AC ya VRF ho), tab kya hoga?"',
    winningAnswerHinglish: 'Answer: "Sir, Tier-2 cities me 60% buildings me centralized BMS nahi hota, balki VRF/VRV ya ductable units hoti hain. UrjaSetu ke paas Modbus-to-BACnet gateway aur IR/RS-485 smart thermostats hain jo Daikin, Voltas, Blue Star, Carrier ke unit controllers se directly handshake karte hain. Yani BMS ho ya na ho, dono me kaam karta hai!"'
  },
  {
    id: 'financial-roi',
    titleHindi: '४. Paisa Vasool: 18 Mahine Me ROI Kaise Nikalta Hai?',
    titleEnglish: 'Rock-Solid Commercial Numbers in Indian Rupees',
    simpleExplanation: 'Building owner ka pehla aur aakhri sawaal hota hai: "Main ₹2.5 Crore kyu lagau, aur mera paisa kab wapas aayega?". Ek 25,000 m² IT park ka example lijiye: saal ka bijli bill ₹4.6 Crore aata hai. UrjaSetu 37.5% bijli bacha kar saal ke ₹1.72 Crore seedhe cash save karta hai. Total turnkey capex ₹2.48 Crore hai—matlab sirf 17.3 mahine (dedh saal) me poora investment wapas!',
    keyPoints: [
      'Turnkey Capex: Lagbhag ₹90 se ₹95 per sq.ft (isme sensors, edge gateways, meters, cloud setup aur commissioning sab included hai).',
      'Direct Annual Savings: ₹1.72 Crore har saal (37.5% whole-building energy drop).',
      'Payback Period: 17.3 Months (less than 1.5 years).',
      '5-Year Net Profit (NPV): ₹4.06 Crore shuddh bachat after recovering capital.',
      'Carbon Abatement: 1,537 Metric Tonne CO₂ har saal bachta hai, jisse MNC tenants ko Green Lease aur BRSR ESG reporting me top rating milti hai.'
    ],
    juryQuestion: 'Jury Question: "Electricity savings verify kaise hogi? Kaun guarantee lega?"',
    winningAnswerHinglish: 'Answer: "Sir, hum international IPMVP (International Performance Measurement and Verification Protocol) Option-C follow karte hain. Sub-meters continuous Class 0.2S accuracy se baseline vs current consumption log karte hain. Facility manager har mahine DISCOM bill ke sath dashboard report match karke certified savings verify kar sakta hai!"'
  }
];

export const TWO_MINUTE_PITCH_SCRIPT = {
  title: 'Winning 2-Minute Elevator Pitch (In Hinglish)',
  subtitle: 'Jury Presentation Script for Hackathon / Competition Finals',
  duration: '120 Seconds',
  dialogue: [
    {
      speaker: 'Hook (0:00 - 0:25)',
      hindi: 'Namaskar respected jury members! Aaj hum sab yahan AC wale kamre me baithe hain, par kya aap jante hain ki June ki 45-degree garmi me bhi Bharat ke 85% corporate offices me log sweaters aur jackets pehan kar kaam karte hain? Kyunki hamare chillers 21 degree pe lock hain!',
      english: 'Good morning jury. Did you know in 45°C summer heat, people wear jackets inside Indian corporate offices because chillers are frozen at 21°C?'
    },
    {
      speaker: 'Problem (0:25 - 0:50)',
      hindi: 'Bharat me buildings 33% bijli khati hain aur 35% se zyada bijli bilkul faaltu waste hoti hai—oversized chillers, empty rooms me AC, aur shaam 6 baje DISCOM ki mehengi ToD peak penalty. Building owner ka lakhon rupaye ka bill faaltu badh raha hai aur grid par blackouts ka khatra badhta hai.',
      english: 'Buildings devour 33% of India\'s power, wasting 35%+ on empty rooms, frozen setpoints, and punishing evening ToD tariff peaks.'
    },
    {
      speaker: 'Solution (0:50 - 1:25)',
      hindi: 'Iska solution hai "UrjaSetu"! Yeh koi theoretical idea nahi hai, balki ek turnkey Edge IoT + Digital Twin platform hai. Hum building me bina ek bhi taar kaate, clamp-on meters aur wireless LoRaWAN sensors lagate hain. Hamara Physics-informed AI model Indian Model for Adaptive Comfort (IMAC) ke through setpoint ko dynamic 24°C se 26°C karta hai, aur rooftop solar battery ko shaam ki peak me discharge karta hai.',
      english: 'We introduce UrjaSetu: a non-invasive edge IoT + digital twin platform using IMAC adaptive comfort and solar-BESS peak shaving.'
    },
    {
      speaker: 'Traction & ROI (1:25 - 2:00)',
      hindi: 'Result kya hai? Ek standard 25,000 square meter IT park me 37.5% bijli ki verified bachat—saal ka ₹1.72 Crore cash save hota hai! Aur ₹2.48 Crore ka capex sirf 17 mahine me 100% recover ho jata hai. Saath hi saal ka 1,500 tonne carbon emissions kam hota hai. UrjaSetu sirf bill kam nahi karta, Bharat ke har building ko ek smart, climate-resilient power asset banata hai. Dhanyawad!',
      english: 'The result: 37.5% energy reduction, saving ₹1.72 Crore/yr on a 25,000 m² facility with full payback in 17 months and 1,500 MT CO₂ cut. Thank you!'
    }
  ]
};
