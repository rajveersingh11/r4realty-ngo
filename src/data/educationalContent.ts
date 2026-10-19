export interface Guide {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  category: 'Homebuying' | 'Loans & Finance' | 'Legal & RERA' | 'Land & Plots';
  steps: { title: string; detail: string }[];
}

export const COMPREHENSIVE_GUIDES: Guide[] = [
  {
    id: 'buying-first-home',
    title: 'Buying Your First Home: The 7-Step Non-Profit Blueprint',
    readTime: '6 min read',
    summary: 'A neutral, commission-free roadmap to navigate budget, developer diligence, and registration without costly surprises.',
    category: 'Homebuying',
    steps: [
      {
        title: '1. Establish True Budget & Reserve Funds',
        detail: 'Do not look at properties until your budget is locked. Budget for 15-20% down payment PLUS an additional 8-10% for stamp duty, registration, legal fees, society shares, and interior buffer. Total EMIs must strictly remain within 35-40% of net family monthly income.'
      },
      {
        title: '2. Audit Credit Score & Pre-Sanction Loan',
        detail: 'Ensure your CIBIL/Experian score is 750+ at least 3 months prior. Settle disputed credit card charges. Get an in-principle sanction letter from a reputable bank before negotiating with builders.'
      },
      {
        title: '3. Filter by Commute & Developer Track Record, Not Discounts',
        detail: 'Ignore pre-launch discounts, gold coins, or modular kitchen gimmicks. Filter projects solely by: Developer delivery track record, approved layout plans, physical distance to transit, and verified state RERA registration.'
      },
      {
        title: '4. Title Search by an Independent Lawyer',
        detail: 'Never rely on the builder’s bank panel lawyer. Pay a nominal independent lawyer fee to verify the 30-year title chain, encumbrance certificate (EC), land conversion order (CLU), and non-agricultural (NA) sanction. As ruled by Supreme Court in Suraj Lamp (2011), only a registered deed confers valid title.'
      },
      {
        title: '5. Negotiate on All-Inclusive Carpet Area Price (RERA §2(k))',
        detail: 'RERA mandates sales strictly on net usable Carpet Area (inside walls), not nebulous "super built-up" or "loading" percentages. Demand a written cost sheet itemising base price, car parking, GST, and maintenance deposits.'
      },
      {
        title: '6. Never Pay >10% Before Registered Agreement for Sale (RERA §13)',
        detail: 'Under Section 13 of RERA, no promoter can accept more than 10% of property cost without executing and registering an Agreement for Sale. Never hand over large token sums without a legally enforceable receipt.'
      },
      {
        title: '7. Rigorous Snagging Inspection Before Final Possession (RERA §14(3))',
        detail: 'Never accept keys or sign a possession letter without an exhaustive daylight inspection (check seepage, hollow tiles, electrical load, window alignment, plumbing slope). Builder is legally bound to fix structural defects for 5 years at zero charge under Section 14(3).'
      }
    ]
  },
  {
    id: 'home-loans-unpacked',
    title: 'Home Loans Demystified: Floating, Fixed, MCLR & Repo-Linked',
    readTime: '5 min read',
    summary: 'Understand how banks evaluate your eligibility, why EBLR loans fluctuate, and how to avoid prepayment penalties.',
    category: 'Loans & Finance',
    steps: [
      {
        title: '1. EBLR vs MCLR: How Your Rate is Set (RBI Circular Oct 2019)',
        detail: 'Under RBI Master Direction (DoR.DIR.BC.No.14/13.03.00/2019-20), all retail floating-rate home loans issued by scheduled commercial banks must link to an External Benchmark (primarily RBI Repo Rate). When RBI adjusts rates, banks must reset your loan within 3 months.'
      },
      {
        title: '2. FOIR & Loan-to-Value (LTV) Limits',
        detail: 'Banks evaluate Fixed Obligation to Income Ratio (FOIR). For loans up to ₹30 Lakhs, RBI permits up to 90% LTV; ₹30L to ₹75L permits up to 80% LTV; above ₹75L is capped at 75% LTV. You must arrange the remaining 25% plus registration from your own funds.'
      },
      {
        title: '3. Prepayment: Zero Penalty on Floating Loans (RBI Mandate)',
        detail: 'Under RBI Circular DBOD.Dir.BC.107/13.03.00/2011-12, banks, HFCs, and NBFCs CANNOT charge prepayment or foreclosure penalties on floating-rate home loans sanctioned to individual borrowers. Prepaying even one extra EMI per year can reduce a 20-year loan to ~14 years.'
      },
      {
        title: '4. Insurance Cross-Selling Traps',
        detail: 'Banks cannot mandate that you buy their single-premium home loan insurance bundled into the loan. A standalone pure term insurance policy taken separately is almost always 40-60% cheaper for identical financial coverage.'
      }
    ]
  },
  {
    id: 'rera-mastery',
    title: 'RERA Act Mastery: Your Legal Armor as a Homebuyer',
    readTime: '5 min read',
    summary: 'Real Estate (Regulation and Development) Act 2016 explained in plain terms—your statutory rights, escrow rules, and delay compensation.',
    category: 'Legal & RERA',
    steps: [
      {
        title: '1. Mandatory Prior Registration (Section 3)',
        detail: 'Any residential project where land area exceeds 500 sq. meters or number of apartments exceeds 8 must be registered with RERA prior to any marketing, brochure distribution, or sales event.'
      },
      {
        title: '2. 70% Escrow Account Protection (Section 4(2)(l)(D))',
        detail: '70% of all monies received from allottees must be deposited into a separate scheduled bank escrow account, usable strictly for land cost and construction of that specific project, verified by a CA, engineer, and architect.'
      },
      {
        title: '3. Delay Compensation Rights (Section 18)',
        detail: 'Under Section 18, if a promoter fails to give possession on the date specified in the registered agreement, the buyer has the legal right to either: (A) withdraw from the project and receive a 100% refund with interest (SBI MCLR + 2%), or (B) stay in the project and receive monthly interest till physical possession is granted.'
      },
      {
        title: '4. 5-Year Structural Defect Warranty (Section 14(3))',
        detail: 'Section 14(3) mandates that any structural defect or defect in workmanship brought to the promoter notice within 5 years of possession must be rectified free of charge within 30 days.'
      }
    ]
  },
  {
    id: 'resale-property-diligence',
    title: 'Resale Property Due Diligence: 6 Critical Landmines',
    readTime: '6 min read',
    summary: 'Buying from an existing homeowner? Learn how to inspect original title deeds, society NOCs, property tax receipts, and bank release deeds.',
    category: 'Legal & RERA',
    steps: [
      {
        title: '1. Inspect Original Title Deed (Mother Deed)',
        detail: 'Never proceed on photocopies. Physically inspect the original registered sale deed. As established by the Supreme Court in Suraj Lamp & Industries v. State of Haryana (2011/2012), Power of Attorney (GPA) transfers do NOT confer legal ownership.'
      },
      {
        title: '2. Encumbrance Certificate (EC) for 30 Years',
        detail: 'Obtain a certified Form 15 Encumbrance Certificate from the Sub-Registrar Office for at least 30 years to verify there are no existing mortgages, court attachments, or liens.'
      },
      {
        title: '3. Society NOC & Dues Clearance',
        detail: 'Request a formal No Objection Certificate (NOC) and No Dues Certificate from the managing committee of the cooperative housing society (CHS) or apartment association.'
      },
      {
        title: '4. Physical OC/CC Verification',
        detail: 'Ensure the building has an Occupancy Certificate (OC). Purchasing a flat in an OC-less building risks municipal water disconnection, double property tax penalties, or demolition orders.'
      }
    ]
  }
];

export interface ChecklistItem {
  id: string;
  title: string;
  mandatory: boolean;
  tip: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export const INTERACTIVE_CHECKLISTS: ChecklistCategory[] = [
  {
    id: 'pre-booking',
    name: 'Pre-Booking & Token Checklist',
    description: 'Complete these checks BEFORE handing over any cheque or signing an expression of interest (EOI).',
    items: [
      { id: 'pb-1', title: 'RERA Registration number verified directly on state portal (not just on broker brochure) [RERA §3]', mandatory: true, tip: 'Ensure promoter name and project address match the title deed exactly.' },
      { id: 'pb-2', title: 'Sanctioned building layout plan viewed with local municipal approval number [RERA §11]', mandatory: true, tip: 'Ensure your specific tower and floor are in the sanctioned plan, not under proposed amendment.' },
      { id: 'pb-3', title: 'Total all-inclusive cost confirmed in writing (parking, GST, club membership, 2-yr maintenance)', mandatory: true, tip: 'Beware hidden charges for floor rise, preferred location (PLC), and electrification.' },
      { id: 'pb-4', title: 'Token amount kept strictly under ₹25,000–₹50,000 with refundability clause in writing', mandatory: true, tip: 'Never pay cash. Pay only via account payee cheque or NEFT to registered company account.' },
      { id: 'pb-5', title: 'Possession date and grace period confirmed in writing in accordance with RERA filing [RERA §18]', mandatory: true, tip: 'Check if the possession date in the marketing brochure matches the date filed on the RERA portal.' },
      { id: 'pb-6', title: 'Bank loan pre-approval letter in hand from your chosen lender', mandatory: false, tip: 'Confirms that you will not lose your token if your loan application faces unexpected hurdles.' }
    ]
  },
  {
    id: 'document-legal',
    name: 'Builder Document Verification Checklist',
    description: 'Demand copies of these 8 documents for review by your independent advocate before registration.',
    items: [
      { id: 'dl-1', title: 'Title Search Report & 30-Year Non-Encumbrance Certificate (EC Form 15)', mandatory: true, tip: 'Proves the land is free of legal disputes, family claims, and prior mortgages.' },
      { id: 'dl-2', title: 'NA (Non-Agricultural) Conversion Order & Land Use Permission (CLU)', mandatory: true, tip: 'Agricultural land must have official government clearance for residential development.' },
      { id: 'dl-3', title: 'Draft Agreement for Sale adhering to RERA Model Format [RERA §13]', mandatory: true, tip: 'Reject clauses that impose 18% penalty on buyer delay but offer only ₹5/sq.ft on builder delay.' },
      { id: 'dl-4', title: 'Bank NOC (No Objection Certificate) if the project land is mortgaged to a construction lender', mandatory: true, tip: 'Essential! If builder took a project loan, the bank must release their lien on your flat.' },
      { id: 'dl-5', title: 'Commencement Certificate (CC) up to your specific floor level', mandatory: true, tip: 'Builders can only construct floors sanctioned in the current CC.' },
      { id: 'dl-6', title: 'Fire Safety NOC & Environmental Clearance (for high-rises > 20,000 sq.m)', mandatory: true, tip: 'Mandatory statutory clearances from state disaster and environment appraisal committee.' },
      { id: 'dl-7', title: 'RERA Separate Bank Account (Escrow) Details for payment transfers [RERA §4(2)(l)(D)]', mandatory: true, tip: 'Payments must go to the designated RERA account, never a personal promoter account.' }
    ]
  },
  {
    id: 'possession-snagging',
    name: 'Physical Possession & Snagging Inspection Checklist',
    description: 'Conduct this thorough inspection during daylight hours before signing the final possession handover document.',
    items: [
      { id: 'ps-1', title: 'Occupancy Certificate (OC) or Completion Certificate (CC) verified in person', mandatory: true, tip: 'Never take "fit-out possession" or "key handover" without an official OC from the authority.' },
      { id: 'ps-2', title: 'Water slope in bathrooms, balconies, and utility areas tested with running water', mandatory: true, tip: 'Ensure water flows directly to drains without pooling anywhere on tile surfaces.' },
      { id: 'ps-3', title: 'Hollow tile check: Tap all floor tiles with a coin or inspection stick to find air voids', mandatory: false, tip: 'Hollow sounding tiles will crack under furniture weight and must be re-laid by builder under §14(3).' },
      { id: 'ps-4', title: 'Seepage & Dampness Inspection on exterior-facing walls and ceiling corners', mandatory: true, tip: 'Use a digital moisture meter or visual check for damp patches, peeling paint, or efflorescence.' },
      { id: 'ps-5', title: 'Electrical Phase & Socket Check: Test every power outlet with a plug-in tester', mandatory: true, tip: 'Ensure proper earthing to prevent electrical shocks and inverter back-feeding.' },
      { id: 'ps-6', title: 'All door latches, windows, sliding tracks, and balcony safety railings securely bolted', mandatory: true, tip: 'Check that window shutters seal properly against rain ingress during monsoons.' },
      { id: 'ps-7', title: 'Written Snag List signed and acknowledged by builder site engineer with 30-day timeline [RERA §14(3)]', mandatory: true, tip: 'Do not pay final maintenance advance until acknowledged snag list is handed back.' }
    ]
  }
];

export interface FaqItem {
  q: string;
  a: string;
  category: 'General' | 'Financial & Loans' | 'Legal & RERA' | 'Fraud & Safety';
}

export const FREQUENT_QUESTIONS: FaqItem[] = [
  {
    category: 'General',
    q: 'Do I really need a broker to purchase an apartment?',
    a: 'No. You can buy directly from developers or existing homeowners. If you do engage a broker, demand their state RERA broker registration number (Section 9 of RERA), clarify in writing whether they are paid by the builder or by you, and never sign exclusive mandates.'
  },
  {
    category: 'General',
    q: 'What is the true difference between Carpet Area, Built-Up Area, and Super Area?',
    a: 'Under Section 2(k) of RERA, Carpet Area is the actual net usable floor space within internal walls where you can lay a carpet. Built-up area includes the carpet area plus the thickness of exterior walls and balconies. Super Area adds a proportion of common spaces (lobbies, stairs, lift shafts). By law under RERA, all properties must be quoted and sold exclusively on Carpet Area.'
  },
  {
    category: 'Financial & Loans',
    q: 'What is the safe harbor limit if property is purchased below Circle Rate (Section 56(2)(x))?',
    a: 'Under the Indian Income-tax Act (Section 50C for sellers and Section 56(2)(x) for buyers), there is a statutory 10% safe-harbor tolerance band. If the difference between the actual agreement price and the Stamp Duty Value (circle rate) does not exceed 10%, no penalty or imputed income is taxed. If the variance exceeds 10%, the entire differential is taxed as income from other sources.'
  },
  {
    category: 'Financial & Loans',
    q: 'Can a bank charge foreclosure or prepayment fees if I pay off my home loan early?',
    a: 'No. Under RBI Circular DBOD.Dir.BC.107/13.03.00/2011-12, banks, housing finance companies (HFCs), and NBFCs are strictly prohibited from charging any prepayment penalty or foreclosure fee on floating-rate home loans sanctioned to individual borrowers.'
  },
  {
    category: 'Legal & RERA',
    q: 'Can a builder change the layout or number of floors after I have booked?',
    a: 'No. Under Section 14(2) of RERA, a promoter cannot make minor alterations to an individual unit without consent. For major structural changes to the building plan or common facilities, the promoter must obtain the prior written consent of at least two-thirds (66.7%) of all allottees in that project.'
  },
  {
    category: 'Legal & RERA',
    q: 'What is the legal difference between an Agreement for Sale and a Sale Deed?',
    a: 'An Agreement for Sale (AFS) is an executory contract outlining milestone payments and possession timelines. A Sale Deed (or Conveyance Deed) is the final registered legal instrument that officially transfers absolute ownership and title from seller to buyer. Under Section 54 of the Transfer of Property Act, 1882, only a registered Sale Deed followed by municipal mutation creates legal ownership.'
  },
  {
    category: 'Fraud & Safety',
    q: 'Are "12% Assured Return" schemes offered by builders safe investments?',
    a: 'Almost always high risk or fraudulent. In an assured return scheme, developers promise high monthly returns until possession. Section 3 of the Banning of Unregulated Deposit Schemes (BUDS) Act, 2019 criminalizes unregulated deposit schemes. When cash flows dry up, payments stop, leaving investors with unapproved commercial units and trapped capital.'
  },
  {
    category: 'Fraud & Safety',
    q: 'Can I purchase property on a General Power of Attorney (GPA) or Sale Agreement with possession?',
    a: 'No. In the landmark judgment Suraj Lamp & Industries Pvt. Ltd. v. State of Haryana (2011/2012 SC), the Supreme Court of India ruled that GPA sales, SA/GPA/Will transfers do not convey title and do not amount to transfer of ownership. Always demand a registered Sale Deed.'
  }
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  vernacularSynonym?: string;
  practicalTip: string;
}

export const REAL_ESTATE_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Carpet Area (RERA §2(k))',
    definition: 'The net usable floor area of an apartment, excluding external walls, service shafts, exclusive balcony/verandah, and exclusive terrace, but including internal partition walls.',
    vernacularSynonym: 'RERA Carpet',
    practicalTip: 'Always calculate your purchase rate per sq. ft of Carpet Area. Never negotiate on Super Built-up.'
  },
  {
    term: 'Occupancy Certificate (OC)',
    definition: 'A statutory certificate issued by the municipal planning authority declaring that the building was constructed according to approved plans and is legally fit for human habitation.',
    vernacularSynonym: 'Bhoga Pramana Patra / Completion Certificate',
    practicalTip: 'Moving into a building without an OC is illegal and risks utility disconnection and municipal penalties.'
  },
  {
    term: 'Encumbrance Certificate (EC)',
    definition: 'A record issued by the Sub-Registrar confirming whether a property has registered financial or legal liabilities, charges, mortgages, or court attachments over a specified period.',
    vernacularSynonym: 'Form 15 / Nil Encumbrance (Form 16)',
    practicalTip: 'Always obtain an EC for the past 30 years from the sub-registrar office before buying any resale flat or plot.'
  },
  {
    term: 'Mutation of Property',
    definition: 'The process of updating title ownership records in local municipal or land revenue registers after a registered sale deed has been executed. Necessary for property tax billing.',
    vernacularSynonym: 'Dakhil Kharij / Namantaran / Khata Transfer',
    practicalTip: 'Registration of the Sale Deed does not automatically update municipal tax records. Apply for mutation immediately after registration.'
  },
  {
    term: 'Floor Space Index (FSI) / FAR',
    definition: 'The ratio between the total permissible built-up area of a building and the total area of the plot on which it stands.',
    vernacularSynonym: 'Floor Area Ratio',
    practicalTip: 'Extra floors constructed beyond sanctioned FSI are unauthorized and can never receive an Occupancy Certificate.'
  },
  {
    term: '7/12 Extract (Saat Bara Utara)',
    definition: 'An essential land revenue document in Maharashtra and Gujarat displaying survey number, ownership history, area, cultivation details, and outstanding bank loans.',
    vernacularSynonym: 'RoR (Record of Rights) / RTC (Pahani) in Karnataka / Jamabandi in North India',
    practicalTip: 'Critical for plot purchases. Check the other rights column to ensure no co-operative bank loans or tenancy claims exist.'
  },
  {
    term: 'Escrow Account (RERA §4(2)(l)(D))',
    definition: 'A ring-fenced bank account where 70% of buyer collections must be deposited by law to ensure funds cannot be diverted to other projects by the promoter.',
    vernacularSynonym: 'RERA Designated Account',
    practicalTip: 'Check your cheque or bank transfer receipt to confirm payments went directly into the RERA designated project escrow account.'
  }
];

export const STATUTORY_BUYER_RIGHTS = [
  {
    title: 'Right to Carpet Area Transparency [RERA §2(k) & §4]',
    description: 'Promoters are legally forbidden to sell by Super Built-up area. Every agreement must clearly specify Carpet Area.'
  },
  {
    title: 'Right to Information & Sanctioned Plans [RERA §11]',
    description: 'Allottees have the right to access sanctioned plans, layouts, and stage-wise construction schedule certified by architects.'
  },
  {
    title: 'Cap on Advance Payments [RERA §13]',
    description: 'A builder cannot demand more than 10% of property cost without executing and registering an Agreement for Sale.'
  },
  {
    title: 'Right to Timely Possession or 100% Refund with Interest [RERA §18]',
    description: 'On delay beyond agreed possession date, buyers can withdraw with full principal + prescribed interest (SBI MCLR + 2%) or claim monthly interest.'
  },
  {
    title: '5-Year Structural Defect Guarantee [RERA §14(3)]',
    description: 'The promoter is legally bound to repair structural or workmanship defects reported within 5 years of possession at zero cost.'
  },
  {
    title: 'Immunity from Unilateral Plan Changes [RERA §14(2)]',
    description: 'No promoter can change layout or add new floors without written consent of 2/3rd of the project’s allottees.'
  }
];

export const RED_FLAG_SCAM_TYPES = [
  {
    title: 'Unregistered Pre-Launch / Soft-Launch [RERA §3 Violation]',
    dangerLevel: 'CRITICAL',
    description: 'Promoters taking money for an upcoming tower without having received RERA registration. Strictly illegal under Section 3.',
    remedy: 'Never pay token amounts for any project without a verifiable RERA registration number on the state portal.'
  },
  {
    title: '12-18% Assured Return Trap [BUDS Act §3 Violation]',
    dangerLevel: 'HIGH',
    description: 'Promising monthly rental post-dated cheques before construction finishes. Banned under BUDS Act 2019; high default rate.',
    remedy: 'Reject assured-return marketing. Real estate yields are market-driven and cannot be legally guaranteed by private developers.'
  },
  {
    title: 'Power of Attorney (GPA) Plot Sales [Suraj Lamp Judgment]',
    dangerLevel: 'CRITICAL',
    description: 'Selling agricultural or unauthorized plots via Notarized GPA, Agreement to Sell, and Will. Illegal transfer under Supreme Court ruling.',
    remedy: 'Insist on a registered Sale Deed and verified Non-Agricultural (NA) order with Town & Country Planning sanction.'
  },
  {
    title: 'Double Allotment Fraud [IPC §420 & RERA §61]',
    dangerLevel: 'HIGH',
    description: 'Selling the same flat to multiple buyers by signing multiple unregistered allotments or informal MOUs.',
    remedy: 'Execute a registered Agreement for Sale immediately at the Sub-Registrar office. Registered deeds prevent duplicate sales.'
  }
];
