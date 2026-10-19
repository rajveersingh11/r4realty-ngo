export interface MicroMarket {
  name: string;
  avgPriceSqFt: number;
  rentalYield: number; // percentage
  priceRange: string;
  demandStatus: 'High' | 'Moderate' | 'Emerging';
  topAdvantage: string;
}

export interface CityMarketData {
  id: string;
  name: string;
  state: string;
  tier: 'Tier 1' | 'Tier 2';
  avgPriceSqFt: number;
  fiveYearCagr: number;
  avgRentalYield: number;
  commercialYield: number;
  priceToRentRatio: number;
  circleRateVariance: string; // e.g. "Market 25-40% above circle rate"
  inventoryMonths: number;
  marketSentiment: 'Buyer’s Market' | 'Balanced' | 'Seller’s Market';
  keyInsights: string;
  microMarkets: MicroMarket[];
  historicalTrend: { year: number; avgPrice: number; rentalIndex: number }[];
}

export const CITIES_DATA: CityMarketData[] = [
  {
    id: 'mumbai-mmr',
    name: 'Mumbai MMR',
    state: 'Maharashtra',
    tier: 'Tier 1',
    avgPriceSqFt: 22400,
    fiveYearCagr: 6.8,
    avgRentalYield: 2.9,
    commercialYield: 7.4,
    priceToRentRatio: 34.5,
    circleRateVariance: 'Market 30–65% above Ready Reckoner',
    inventoryMonths: 18,
    marketSentiment: 'Seller’s Market',
    keyInsights: 'Highest capital values in India. Coastal road and metro expansion driving peripheral growth in Thane & Navi Mumbai. Rental yields remain low (~2.8–3.1%) due to steep valuations.',
    microMarkets: [
      { name: 'South Mumbai', avgPriceSqFt: 62000, rentalYield: 2.2, priceRange: '₹4.5 Cr - ₹35 Cr', demandStatus: 'Moderate', topAdvantage: 'Heritage prestige & luxury enclaves' },
      { name: 'Western Suburbs (Andheri/Bandra)', avgPriceSqFt: 28500, rentalYield: 3.1, priceRange: '₹1.8 Cr - ₹7.5 Cr', demandStatus: 'High', topAdvantage: 'Commercial hubs & airport proximity' },
      { name: 'Navi Mumbai', avgPriceSqFt: 11500, rentalYield: 3.6, priceRange: '₹60 L - ₹2.2 Cr', demandStatus: 'High', topAdvantage: 'Upcoming airport & Trans-Harbour link' },
      { name: 'Thane West', avgPriceSqFt: 14200, rentalYield: 3.4, priceRange: '₹75 L - ₹2.8 Cr', demandStatus: 'High', topAdvantage: 'Self-sufficient township infrastructure' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 17800, rentalIndex: 100 },
      { year: 2022, avgPrice: 18900, rentalIndex: 106 },
      { year: 2023, avgPrice: 20200, rentalIndex: 115 },
      { year: 2024, avgPrice: 21300, rentalIndex: 124 },
      { year: 2025, avgPrice: 22400, rentalIndex: 133 },
      { year: 2026, avgPrice: 23800, rentalIndex: 142 }
    ]
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi-NCR (Gurugram & Noida)',
    state: 'Delhi / Haryana / UP',
    tier: 'Tier 1',
    avgPriceSqFt: 11800,
    fiveYearCagr: 10.4,
    avgRentalYield: 3.5,
    commercialYield: 8.1,
    priceToRentRatio: 28.5,
    circleRateVariance: 'Market 40–120% above circle rate in prime sectors',
    inventoryMonths: 14,
    marketSentiment: 'Seller’s Market',
    keyInsights: 'Massive surge in luxury and Dwarka Expressway sectors in Gurugram. Noida Expressway & Jewar airport influence driving strong commercial and high-rise demand.',
    microMarkets: [
      { name: 'Golf Course Extension (Gurugram)', avgPriceSqFt: 17500, rentalYield: 3.8, priceRange: '₹2.5 Cr - ₹9 Cr', demandStatus: 'High', topAdvantage: 'Cyber City commute & luxury townships' },
      { name: 'Dwarka Expressway', avgPriceSqFt: 12200, rentalYield: 3.4, priceRange: '₹1.1 Cr - ₹3.5 Cr', demandStatus: 'High', topAdvantage: 'High-speed connectivity to Delhi IGI airport' },
      { name: 'Noida Expressway (Sec 137-150)', avgPriceSqFt: 8900, rentalYield: 4.1, priceRange: '₹65 L - ₹2.2 Cr', demandStatus: 'High', topAdvantage: 'Low density green planning & metro' },
      { name: 'Greater Noida West', avgPriceSqFt: 5800, rentalYield: 4.5, priceRange: '₹40 L - ₹1.1 Cr', demandStatus: 'High', topAdvantage: 'Affordable mid-income housing' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 7200, rentalIndex: 100 },
      { year: 2022, avgPrice: 8100, rentalIndex: 109 },
      { year: 2023, avgPrice: 9400, rentalIndex: 121 },
      { year: 2024, avgPrice: 10700, rentalIndex: 135 },
      { year: 2025, avgPrice: 11800, rentalIndex: 148 },
      { year: 2026, avgPrice: 12900, rentalIndex: 160 }
    ]
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tier: 'Tier 1',
    avgPriceSqFt: 10200,
    fiveYearCagr: 9.8,
    avgRentalYield: 4.4,
    commercialYield: 8.5,
    priceToRentRatio: 22.7,
    circleRateVariance: 'Guidance value recently revised; market 20–45% higher',
    inventoryMonths: 12,
    marketSentiment: 'Seller’s Market',
    keyInsights: 'Highest residential rental yield among Indian top metros (4.2–5.1% in tech corridors like Whitefield/Sarjapur/Bellandur). Water supply diligence is critical before buying.',
    microMarkets: [
      { name: 'Whitefield', avgPriceSqFt: 9600, rentalYield: 4.8, priceRange: '₹85 L - ₹3.2 Cr', demandStatus: 'High', topAdvantage: 'Purple Line metro & major tech parks' },
      { name: 'Sarjapur Road / Bellandur', avgPriceSqFt: 11200, rentalYield: 5.1, priceRange: '₹1.1 Cr - ₹4.5 Cr', demandStatus: 'High', topAdvantage: 'Proximity to ORR tech corridor' },
      { name: 'North Bengaluru (Hebbal/Airport)', avgPriceSqFt: 10500, rentalYield: 4.0, priceRange: '₹95 L - ₹3.8 Cr', demandStatus: 'High', topAdvantage: 'KIADB tech park & airport arterial line' },
      { name: 'Electronic City', avgPriceSqFt: 6400, rentalYield: 4.7, priceRange: '₹48 L - ₹1.3 Cr', demandStatus: 'Moderate', topAdvantage: 'Affordable tech worker rental demand' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 6500, rentalIndex: 100 },
      { year: 2022, avgPrice: 7300, rentalIndex: 114 },
      { year: 2023, avgPrice: 8400, rentalIndex: 132 },
      { year: 2024, avgPrice: 9400, rentalIndex: 147 },
      { year: 2025, avgPrice: 10200, rentalIndex: 162 },
      { year: 2026, avgPrice: 11100, rentalIndex: 175 }
    ]
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    tier: 'Tier 1',
    avgPriceSqFt: 8400,
    fiveYearCagr: 8.2,
    avgRentalYield: 4.1,
    commercialYield: 7.9,
    priceToRentRatio: 24.4,
    circleRateVariance: 'Ready Reckoner rate reasonably aligned in established sectors',
    inventoryMonths: 15,
    marketSentiment: 'Balanced',
    keyInsights: 'Sustained IT and auto-hub employment keeps end-user demand robust. West (Hinjewadi, Baner, Wakad) and East (Kharadi, Wagholi) remain the twin growth locomotives.',
    microMarkets: [
      { name: 'Baner - Balewadi', avgPriceSqFt: 10800, rentalYield: 3.9, priceRange: '₹90 L - ₹3.2 Cr', demandStatus: 'High', topAdvantage: 'High street retail & Mumbai expressway access' },
      { name: 'Hinjewadi - Wakad', avgPriceSqFt: 7800, rentalYield: 4.5, priceRange: '₹55 L - ₹1.6 Cr', demandStatus: 'High', topAdvantage: 'Hinjewadi Rajiv Gandhi IT park' },
      { name: 'Kharadi', avgPriceSqFt: 9200, rentalYield: 4.2, priceRange: '₹75 L - ₹2.5 Cr', demandStatus: 'High', topAdvantage: 'EON Free Zone & World Trade Center' },
      { name: 'Undri / Pisoli', avgPriceSqFt: 5400, rentalYield: 4.3, priceRange: '₹38 L - ₹95 L', demandStatus: 'Moderate', topAdvantage: 'Pocket-friendly starter apartments' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 5800, rentalIndex: 100 },
      { year: 2022, avgPrice: 6300, rentalIndex: 108 },
      { year: 2023, avgPrice: 7100, rentalIndex: 119 },
      { year: 2024, avgPrice: 7800, rentalIndex: 129 },
      { year: 2025, avgPrice: 8400, rentalIndex: 140 },
      { year: 2026, avgPrice: 9100, rentalIndex: 151 }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tier: 'Tier 1',
    avgPriceSqFt: 7900,
    fiveYearCagr: 11.2,
    avgRentalYield: 3.8,
    commercialYield: 8.2,
    priceToRentRatio: 26.3,
    circleRateVariance: 'Market 50–150% above market value basic registrations',
    inventoryMonths: 19,
    marketSentiment: 'Balanced',
    keyInsights: 'West Hyderabad (Gachibowli, Kokapet, Financial District) witnessed phenomenal capital growth. Liberal FSI regulations have led to dense high-rise projects.',
    microMarkets: [
      { name: 'Kokapet / Financial District', avgPriceSqFt: 10500, rentalYield: 3.7, priceRange: '₹1.3 Cr - ₹6 Cr', demandStatus: 'High', topAdvantage: 'Neopolis hub & global MNC offices' },
      { name: 'Gachibowli / Tellapur', avgPriceSqFt: 8200, rentalYield: 3.9, priceRange: '₹80 L - ₹2.8 Cr', demandStatus: 'High', topAdvantage: 'Outer Ring Road & international schools' },
      { name: 'Miyapur / Bachupally', avgPriceSqFt: 5800, rentalYield: 4.3, priceRange: '₹50 L - ₹1.2 Cr', demandStatus: 'Moderate', topAdvantage: 'Affordable mid-segment metro corridor' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 5100, rentalIndex: 100 },
      { year: 2022, avgPrice: 5900, rentalIndex: 110 },
      { year: 2023, avgPrice: 6700, rentalIndex: 124 },
      { year: 2024, avgPrice: 7300, rentalIndex: 136 },
      { year: 2025, avgPrice: 7900, rentalIndex: 147 },
      { year: 2026, avgPrice: 8600, rentalIndex: 158 }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    tier: 'Tier 1',
    avgPriceSqFt: 7200,
    fiveYearCagr: 6.4,
    avgRentalYield: 3.6,
    commercialYield: 7.6,
    priceToRentRatio: 27.8,
    circleRateVariance: 'Guideline values revised in 2024 to curb registration under-reporting',
    inventoryMonths: 17,
    marketSentiment: 'Buyer’s Market',
    keyInsights: 'Historically end-user dominated with disciplined price growth. OMR (Old Mahabalipuram Road) and GST road are central residential corridors.',
    microMarkets: [
      { name: 'OMR - Perungudi / Sholinganallur', avgPriceSqFt: 7400, rentalYield: 4.0, priceRange: '₹60 L - ₹1.8 Cr', demandStatus: 'High', topAdvantage: 'IT expressway & upcoming metro phase 2' },
      { name: 'Anna Nagar', avgPriceSqFt: 15500, rentalYield: 2.8, priceRange: '₹1.8 Cr - ₹7 Cr', demandStatus: 'Moderate', topAdvantage: 'Established affluent residential enclave' },
      { name: 'Porur - Mount Poonamallee', avgPriceSqFt: 6900, rentalYield: 3.8, priceRange: '₹50 L - ₹1.4 Cr', demandStatus: 'High', topAdvantage: 'Healthcare, manufacturing & DLF tech park' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 5400, rentalIndex: 100 },
      { year: 2022, avgPrice: 5800, rentalIndex: 106 },
      { year: 2023, avgPrice: 6300, rentalIndex: 113 },
      { year: 2024, avgPrice: 6800, rentalIndex: 120 },
      { year: 2025, avgPrice: 7200, rentalIndex: 127 },
      { year: 2026, avgPrice: 7700, rentalIndex: 134 }
    ]
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    tier: 'Tier 2',
    avgPriceSqFt: 5100,
    fiveYearCagr: 7.9,
    avgRentalYield: 3.4,
    commercialYield: 7.3,
    priceToRentRatio: 29.4,
    circleRateVariance: 'Jantar rates revised; market 35–80% higher in SG Highway',
    inventoryMonths: 16,
    marketSentiment: 'Balanced',
    keyInsights: 'GIFT City and SG Highway drive strong high-end residential activity. Affordable ticket sizes make it attractive for first-time buyers.',
    microMarkets: [
      { name: 'SG Highway / Gota', avgPriceSqFt: 5800, rentalYield: 3.6, priceRange: '₹45 L - ₹1.6 Cr', demandStatus: 'High', topAdvantage: 'Primary arterial commercial corridor' },
      { name: 'GIFT City Zone (Gandhinagar)', avgPriceSqFt: 7500, rentalYield: 4.2, priceRange: '₹65 L - ₹2.5 Cr', demandStatus: 'High', topAdvantage: 'International financial services centre' },
      { name: 'Bopal - South Bopal', avgPriceSqFt: 4600, rentalYield: 3.5, priceRange: '₹35 L - ₹90 L', demandStatus: 'High', topAdvantage: 'High livability & schools' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 3600, rentalIndex: 100 },
      { year: 2022, avgPrice: 4000, rentalIndex: 107 },
      { year: 2023, avgPrice: 4400, rentalIndex: 115 },
      { year: 2024, avgPrice: 4800, rentalIndex: 124 },
      { year: 2025, avgPrice: 5100, rentalIndex: 132 },
      { year: 2026, avgPrice: 5500, rentalIndex: 141 }
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    tier: 'Tier 1',
    avgPriceSqFt: 5300,
    fiveYearCagr: 5.8,
    avgRentalYield: 3.3,
    commercialYield: 6.9,
    priceToRentRatio: 30.3,
    circleRateVariance: 'Government stamp duty rebate previously stimulated demand',
    inventoryMonths: 22,
    marketSentiment: 'Buyer’s Market',
    keyInsights: 'New Town Rajarhat and EM Bypass remain the focal zones. Lower capital entry points than other Tier 1 metros.',
    microMarkets: [
      { name: 'New Town / Rajarhat', avgPriceSqFt: 5400, rentalYield: 3.7, priceRange: '₹40 L - ₹1.3 Cr', demandStatus: 'High', topAdvantage: 'Planned smart city infrastructure' },
      { name: 'EM Bypass', avgPriceSqFt: 8800, rentalYield: 3.0, priceRange: '₹90 L - ₹3.5 Cr', demandStatus: 'Moderate', topAdvantage: 'Connectivity to South Kolkata & hospitals' }
    ],
    historicalTrend: [
      { year: 2021, avgPrice: 4200, rentalIndex: 100 },
      { year: 2022, avgPrice: 4500, rentalIndex: 105 },
      { year: 2023, avgPrice: 4800, rentalIndex: 111 },
      { year: 2024, avgPrice: 5050, rentalIndex: 117 },
      { year: 2025, avgPrice: 5300, rentalIndex: 123 },
      { year: 2026, avgPrice: 5600, rentalIndex: 129 }
    ]
  }
];

// Bank Interest Rates Benchmark
export interface BankRate {
  bank: string;
  type: string;
  minRate: number;
  maxRate: number;
  processingFee: string;
  specialWomenDiscount: boolean;
}

export const BANK_HOME_LOAN_RATES: BankRate[] = [
  { bank: 'State Bank of India (SBI)', type: 'Public Sector', minRate: 8.50, maxRate: 9.65, processingFee: '0.17% to 0.35% (max ₹10,000 + GST)', specialWomenDiscount: true },
  { bank: 'HDFC Bank', type: 'Private Sector', minRate: 8.70, maxRate: 9.80, processingFee: '0.50% (min ₹3,000, max ₹10,000)', specialWomenDiscount: true },
  { bank: 'ICICI Bank', type: 'Private Sector', minRate: 8.75, maxRate: 9.85, processingFee: '0.50% to 1.00%', specialWomenDiscount: false },
  { bank: 'Bank of Baroda', type: 'Public Sector', minRate: 8.40, maxRate: 9.50, processingFee: 'Zero to ₹8,500 capped', specialWomenDiscount: true },
  { bank: 'Punjab National Bank (PNB)', type: 'Public Sector', minRate: 8.45, maxRate: 9.60, processingFee: '0.35% (max ₹15,000)', specialWomenDiscount: true },
  { bank: 'Kotak Mahindra Bank', type: 'Private Sector', minRate: 8.70, maxRate: 9.75, processingFee: '0.50% + GST', specialWomenDiscount: false }
];

// State Stamp Duty Matrix
export interface StateStampDuty {
  state: string;
  maleRate: number;
  femaleRate: number;
  jointRate: number;
  registrationFee: string;
  notes: string;
}

export const STATE_STAMP_DUTIES: StateStampDuty[] = [
  { 
    state: 'Maharashtra', 
    maleRate: 6.0, 
    femaleRate: 5.0, 
    jointRate: 6.0, 
    registrationFee: '1% (Capped at ₹30,000 for residential)', 
    notes: 'Metro cess of 1% included in urban municipal regions like Mumbai/Pune. 1% female concession strictly requires sole/all-female ownership (joint with male pays standard 6%). The 15-year resale restriction was officially abolished in May 2023.' 
  },
  { 
    state: 'Delhi', 
    maleRate: 7.0, 
    femaleRate: 5.0, 
    jointRate: 6.0, 
    registrationFee: '1% of property value + ₹100 pasting fee', 
    notes: 'Slab-based: 6% Male / 4% Female / 5% Joint for properties ≤ ₹25 Lakh; 7% Male / 5% Female / 6% Joint for properties > ₹25 Lakh in MCD urban zones.' 
  },
  { 
    state: 'Karnataka', 
    maleRate: 5.0, 
    femaleRate: 5.0, 
    jointRate: 5.0, 
    registrationFee: '2% of market value (Total 7.6% outflow)', 
    notes: 'Composite urban outflow: 5% stamp duty + 10% cess (0.5%) + 2% BBMP urban surcharge (0.1%) + 2% registration fee (hiked from 1%) = 7.6% total. Verify guidance values on Kaveri Online Services.' 
  },
  { 
    state: 'Uttar Pradesh', 
    maleRate: 7.0, 
    femaleRate: 6.0, 
    jointRate: 7.0, 
    registrationFee: '1% of total transaction value', 
    notes: 'Women get a 1% stamp duty rebate on residential properties up to ₹1 Crore value (maximum benefit capped at ₹1 Lakh). Properties above ₹1 Crore pay standard 7%.' 
  },
  { 
    state: 'Tamil Nadu', 
    maleRate: 7.0, 
    femaleRate: 7.0, 
    jointRate: 7.0, 
    registrationFee: '2% of market value (reduced from 4% in 2023)', 
    notes: 'Uniform 7% stamp duty + 2% registration fee = 9% total. Applies across Chennai and urban municipal limits.' 
  },
  { 
    state: 'Telangana', 
    maleRate: 6.0, 
    femaleRate: 6.0, 
    jointRate: 6.0, 
    registrationFee: '0.5% + transfer duty 1.5% (Total 7.5%)', 
    notes: 'Applicable in GHMC and surrounding urban agglomerations (Stamp Duty 4% + Transfer Duty 1.5% + Registration 2% = Total 7.5%).' 
  },
  { 
    state: 'Gujarat', 
    maleRate: 4.9, 
    femaleRate: 4.9, 
    jointRate: 4.9, 
    registrationFee: '1% for men; 0% (exempt) for women', 
    notes: 'Basic stamp duty 3.5% + 1.4% surcharge = 4.9%. Women are completely exempt from the 1% registration fee in Gujarat.' 
  },
  { 
    state: 'Haryana', 
    maleRate: 7.0, 
    femaleRate: 5.0, 
    jointRate: 6.0, 
    registrationFee: 'Fixed slabs based on property value (up to ₹50,000)', 
    notes: 'In urban municipal areas (Gurugram/Faridabad): 7% for male, 5% for female sole ownership, 6% for joint ownership.' 
  }
];

// Property Deal Analyzer Engine
export interface DealAnalysisInput {
  cityId: string;
  locality: string;
  carpetAreaSqFt: number;
  quotedPriceTotal: number; // in Rupees
  propertyStatus: 'under_construction' | 'ready_oc' | 'resale' | 'plot';
  reraRegistered: boolean;
  promisedRentalReturnPercent?: number; // e.g. 12% assured return
  advanceDemandPercent?: number; // % advance builder demands before agreement
  hasLegalOpinion: boolean;
}

export interface DealAnalysisResult {
  pricePerSqFt: number;
  cityAvgPriceSqFt: number;
  priceVariancePercent: number;
  valuationVerdict: 'Significantly Undervalued' | 'Fair Market Corridor' | 'Somewhat Overpriced' | 'Extremely Overpriced';
  riskScore: number; // 0 (safest) to 100 (extreme danger)
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical Alert';
  redFlags: string[];
  yellowWarnings: string[];
  positiveHighlights: string[];
  estimatedTrueCost: {
    basePrice: number;
    stampDutyAndReg: number;
    gstAmount: number;
    interiorAndBuffer: number;
    totalTrueOutlay: number;
  };
  recommendedActionChecklist: string[];
}

export function analyzePropertyDeal(input: DealAnalysisInput): DealAnalysisResult {
  const city = CITIES_DATA.find(c => c.id === input.cityId) || CITIES_DATA[0];
  const pricePerSqFt = Math.round(input.quotedPriceTotal / (input.carpetAreaSqFt || 1));
  const priceVariancePercent = Math.round(((pricePerSqFt - city.avgPriceSqFt) / city.avgPriceSqFt) * 100);

  let valuationVerdict: DealAnalysisResult['valuationVerdict'] = 'Fair Market Corridor';
  if (priceVariancePercent < -25) valuationVerdict = 'Significantly Undervalued';
  else if (priceVariancePercent <= 15 && priceVariancePercent >= -15) valuationVerdict = 'Fair Market Corridor';
  else if (priceVariancePercent > 15 && priceVariancePercent <= 35) valuationVerdict = 'Somewhat Overpriced';
  else valuationVerdict = 'Extremely Overpriced';

  let riskScore = 15; // baseline due diligence score
  const redFlags: string[] = [];
  const yellowWarnings: string[] = [];
  const positiveHighlights: string[] = [];

  // RERA check [RERA 2016 Section 3]
  if (!input.reraRegistered && input.propertyStatus === 'under_construction') {
    riskScore += 45;
    redFlags.push('[RERA 2016 §3 VIOLATION] ILLEGAL SALE RISK: Project is Under-Construction without RERA registration! Section 3 of RERA Act prohibits marketing, advertising, or taking money without valid RERA ID.');
  } else if (input.reraRegistered) {
    positiveHighlights.push('[RERA 2016 §4(2)(l)(D)] RERA Registered: Project is bound by statutory 70% separate escrow account rules and state authority oversight.');
  }

  // Assured Return Scheme check [BUDS Act 2019 Section 3]
  if (input.promisedRentalReturnPercent && input.promisedRentalReturnPercent > 6.5) {
    riskScore += 35;
    redFlags.push(`[BUDS Act 2019 §3 ALERT] PONZI / DEFAULT RISK: Guaranteed return of ${input.promisedRentalReturnPercent}% is an illegal unregulated deposit scheme. The Banning of Unregulated Deposit Schemes (BUDS) Act, 2019 criminalizes such promises.`);
  }

  // Advance demand check [RERA 2016 Section 13]
  if (input.advanceDemandPercent && input.advanceDemandPercent > 10) {
    riskScore += 25;
    redFlags.push(`[RERA 2016 §13 VIOLATION] ADVANCE PAYMENT CAP BREACH: Builder demanding ${input.advanceDemandPercent}% before registered Agreement for Sale. RERA Section 13 strictly caps advances at 10% maximum.`);
  }

  // Under-construction risk
  if (input.propertyStatus === 'under_construction') {
    riskScore += 10;
    yellowWarnings.push('[RERA 2016 §18] Construction Stage Risk: Ensure possession date with delay compensation clause (SBI MCLR + 2%) is explicitly stated in the agreement.');
  } else if (input.propertyStatus === 'ready_oc') {
    positiveHighlights.push('Ready with OC: Occupancy Certificate obtained. Zero GST is payable on completed homes with valid OC.');
  }

  // Legal opinion check
  if (!input.hasLegalOpinion) {
    riskScore += 15;
    yellowWarnings.push('[Supreme Court Precedent] No Independent Title Search: Relying on the builder’s panel advocate is risky. As ruled in Suraj Lamp (2011/2012 SC), always retain an independent advocate for a 30-year title search.');
  } else {
    positiveHighlights.push('Independent Title Search in progress or verified.');
  }

  // Unrealistically cheap check [Income Tax Section 56(2)(x) & 50C]
  if (priceVariancePercent < -35) {
    riskScore += 20;
    redFlags.push(`[Income Tax Act §56(2)(x)] Suspicious Under-pricing: Price is ${Math.abs(priceVariancePercent)}% BELOW city average (exceeds the 10% statutory safe harbor band). Could indicate litigation, non-approved layout, or agricultural land without CLU.`);
  }

  // Cap risk score
  riskScore = Math.min(100, Math.max(5, riskScore));

  let riskLevel: DealAnalysisResult['riskLevel'] = 'Low';
  if (riskScore >= 70) riskLevel = 'Critical Alert';
  else if (riskScore >= 45) riskLevel = 'High';
  else if (riskScore >= 25) riskLevel = 'Moderate';

  // Cost calculation
  const stampDutyRate = 0.06; // approx 6% combined
  const stampDutyAndReg = Math.round(input.quotedPriceTotal * stampDutyRate);
  const gstRate = input.propertyStatus === 'under_construction' ? 0.05 : 0; // 5% for standard non-affordable UC
  const gstAmount = Math.round(input.quotedPriceTotal * gstRate);
  const interiorAndBuffer = Math.round(input.quotedPriceTotal * 0.07); // 7% for registration buffer & basic move-in
  const totalTrueOutlay = input.quotedPriceTotal + stampDutyAndReg + gstAmount + interiorAndBuffer;

  const recommendedActionChecklist: string[] = [
    '[RERA §4 & §11] Search the RERA registration number directly on your state official portal and download the approved building plan & quarterly progress reports (QPR).',
    '[Section 14(3)] Ensure the agreement includes the statutory 5-year structural defect rectification guarantee at zero cost to you.',
    '[Section 18] Verify that the possession handover date is legally tied to delay interest compensation (SBI MCLR + 2%).',
    'Verify that the builder bank account specified in the agreement is the designated RERA 70% Escrow Account.',
    'Do NOT pay more than ₹50,000 as initial token, and demand an immediate signed stamped receipt.',
    'Ensure all payment milestones are linked to verified slab-wise construction stages, NEVER arbitrary calendar dates.',
    'Check if the land has any active mortgage with financial institutions and demand an NOC before loan disbursement.'
  ];

  return {
    pricePerSqFt,
    cityAvgPriceSqFt: city.avgPriceSqFt,
    priceVariancePercent,
    valuationVerdict,
    riskScore,
    riskLevel,
    redFlags,
    yellowWarnings,
    positiveHighlights,
    estimatedTrueCost: {
      basePrice: input.quotedPriceTotal,
      stampDutyAndReg,
      gstAmount,
      interiorAndBuffer,
      totalTrueOutlay
    },
    recommendedActionChecklist
  };
}
