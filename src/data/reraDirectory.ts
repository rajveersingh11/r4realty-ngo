export interface ReraAuthority {
  state: string;
  name: string;
  officialPortal: string;
  searchProjectUrl: string;
  complaintUrl: string;
  helpline: string;
  officeLocation: string;
  notes: string;
}

export const RERA_STATE_DIRECTORY: ReraAuthority[] = [
  {
    state: 'Maharashtra',
    name: 'MahaRERA',
    officialPortal: 'https://maharera.maharashtra.gov.in',
    searchProjectUrl: 'https://maharerait.mahaonline.gov.in/searchlist/search?q=',
    complaintUrl: 'https://maharerait.mahaonline.gov.in',
    helpline: '022-26590036 / 022-68111600',
    officeLocation: 'Bandra-Kurla Complex (BKC), Mumbai',
    notes: 'One of India\'s most active portals. Check quarterly progress reports (QPR) and deregistered/lapsed project lists.'
  },
  {
    state: 'Delhi',
    name: 'Delhi RERA',
    officialPortal: 'https://rera.delhi.gov.in',
    searchProjectUrl: 'https://rera.delhi.gov.in/project-registration',
    complaintUrl: 'https://rera.delhi.gov.in/complaint-form',
    helpline: '011-23214532',
    officeLocation: 'Barakhamba Road, New Delhi',
    notes: 'Mandatory for all residential developments on plots larger than 500 sq.m or more than 8 flats.'
  },
  {
    state: 'Karnataka',
    name: 'K-RERA',
    officialPortal: 'https://rera.karnataka.gov.in',
    searchProjectUrl: 'https://rera.karnataka.gov.in/projectSummaryList',
    complaintUrl: 'https://rera.karnataka.gov.in/complaintRegistration',
    helpline: '080-22249798 / 080-22249799',
    officeLocation: 'Kengal Hanumanthaiah Road, Bengaluru',
    notes: 'Check for Khata category (A Khata vs B Khata) alongside RERA registration.'
  },
  {
    state: 'Uttar Pradesh',
    name: 'UP RERA',
    officialPortal: 'https://www.up-rera.in',
    searchProjectUrl: 'https://www.up-rera.in/projects',
    complaintUrl: 'https://www.up-rera.in/complaint',
    helpline: '0522-2781452 / 0120-2326104',
    officeLocation: 'Lucknow & Greater Noida regional bench',
    notes: 'Separate regional benches for NCR (Noida/Ghaziabad) and Lucknow. Provides graded project health ratings.'
  },
  {
    state: 'Haryana',
    name: 'HARERA (Gurugram & Panchkula)',
    officialPortal: 'https://haryanarera.gov.in',
    searchProjectUrl: 'https://haryanarera.gov.in/view_project/project_list',
    complaintUrl: 'https://haryanarera.gov.in/complaint/online_complaint',
    helpline: '0124-2856200 / 0172-2584240',
    officeLocation: 'Gurugram Bench & Panchkula Bench',
    notes: 'Divided into two independent benches: HARERA Gurugram (for Gurugram district) and HARERA Panchkula (rest of Haryana).'
  },
  {
    state: 'Tamil Nadu',
    name: 'TNRERA',
    officialPortal: 'https://www.rera.tn.gov.in',
    searchProjectUrl: 'https://www.rera.tn.gov.in/registered-projects.php',
    complaintUrl: 'https://www.rera.tn.gov.in/online_complaint.php',
    helpline: '044-28887910',
    officeLocation: 'Egmore, Chennai',
    notes: 'Also covers Union Territory of Andaman and Nicobar Islands.'
  },
  {
    state: 'Telangana',
    name: 'TS RERA',
    officialPortal: 'https://rera.telangana.gov.in',
    searchProjectUrl: 'https://rera.telangana.gov.in/searchprojects.do',
    complaintUrl: 'https://rera.telangana.gov.in/complaint.do',
    helpline: '040-23315667',
    officeLocation: 'AC Guards, Masab Tank, Hyderabad',
    notes: 'Strict enforcement on pre-launch tokens and unapproved plot layouts in HMDA/GHMC zones.'
  },
  {
    state: 'Gujarat',
    name: 'GujRERA',
    officialPortal: 'https://gujrera.gujarat.gov.in',
    searchProjectUrl: 'https://gujrera.gujarat.gov.in/projectSearch',
    complaintUrl: 'https://gujrera.gujarat.gov.in/fileComplaint',
    helpline: '079-23258659',
    officeLocation: 'Sector 10A, Gandhinagar',
    notes: 'Pioneer in digital project monitoring certificates (QR codes mandated on site boards).'
  },
  {
    state: 'Rajasthan',
    name: 'RajRERA',
    officialPortal: 'https://rera.rajasthan.gov.in',
    searchProjectUrl: 'https://rera.rajasthan.gov.in/ProjectSummary',
    complaintUrl: 'https://rera.rajasthan.gov.in/Complaint',
    helpline: '0141-2851900',
    officeLocation: 'Tilak Marg, C-Scheme, Jaipur',
    notes: 'Check JDA/RHB approvals before checking RERA filing status.'
  },
  {
    state: 'West Bengal',
    name: 'WB WBHIRA / WBRERA',
    officialPortal: 'https://rera.wb.gov.in',
    searchProjectUrl: 'https://rera.wb.gov.in/projects',
    complaintUrl: 'https://rera.wb.gov.in/complaints',
    helpline: '033-22822002',
    officeLocation: 'Salt Lake City, Kolkata',
    notes: 'Following Supreme Court directive, West Bengal has completely transitioned from WBHIRA to central RERA.'
  }
];
