export interface QuickStat {
  icon: string
  label: string
  value: string
}

export interface ProcessStep {
  title: string
  description: string
  isFinal?: boolean
}

export interface RequirementGroup {
  title: string
  icon: string
  items: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface OfficeInfo {
  name: string
  location: string
  phone: string
  mobile?: string
  email?: string
  facebook?: string
  hours: string
}

export interface RelatedService {
  title: string
  link: string
}

export interface ServiceDetail {
  id: string
  title: string
  fullTitle: string
  category: string
  categoryLink: string
  badgeText: string
  badgeIcon: string
  description: string
  quickStats: QuickStat[]
  processSteps: ProcessStep[]
  requirements: RequirementGroup[]
  faqs: FAQ[]
  office: OfficeInfo
  relatedServices: RelatedService[]
  onlineLink?: string
  sourceUrl?: string
  sourceName?: string
  hidden?: boolean
}

export const serviceDetailsContent: ServiceDetail[] = [
  /**
   * Certificates & Vital Records
   *
   * NOTE: birth-certificate, marriage-certificate, and death-certificate
   * service details now live canonically in app/config/services.json under
   * each Service's optional `detail` block (see #184). The City Civil Registry
   * Office detail migrated to the canonical Office `detail` block in
   * app/config/offices.json (#201). Human Resource Management remains here until
   * its own Office migration slice.
   */
  {
    id: 'human-resource-management',
    title: 'Human Resource Management',
    fullTitle: 'Human Resource Management Office',
    category: 'Certificates',
    categoryLink: '/services/certificates',
    badgeText: 'HR',
    badgeIcon: 'bi-people',
    description:
      'Service records, employment certificates, and HR services for LGU employees',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '1-3 Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free (employees)' },
      { icon: 'bi-person-check', label: 'For', value: 'LGU Employees' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description:
          'File request for the service record or certificate you need.',
      },
      {
        title: 'Verification',
        description: 'HRMO verifies employment records.',
      },
      {
        title: 'Processing',
        description: 'Staff prepares the requested document.',
      },
      {
        title: 'Claim Document',
        description: 'Return to claim service record or certificate.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Service Record',
        icon: 'bi-file-text',
        items: [
          'Request form',
          'Valid ID',
          'Previous service record (if available)',
        ],
      },
    ],
    faqs: [
      {
        question: 'Who can request service records?',
        answer: 'Current and former LGU employees for their own records.',
      },
    ],
    office: {
      name: 'HRMO',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Employment Certification', link: '/services/certificates' },
    ],
  },

  /**
   * Business, Trade & Investment
   */

  /**
   * Taxation & Payments
   */
  {
    id: 'city-assessor',
    title: 'City Assessor\'s Office',
    fullTitle: 'City Assessor\'s Office',
    category: 'Taxation',
    categoryLink: '/services/tax-payments',
    badgeText: 'Taxation',
    badgeIcon: 'bi-house-door',
    description: 'Property assessment, tax declarations, and land records',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '1-5 Days' },
      { icon: 'bi-file-text', label: 'Records', value: 'Property Info' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Online / Walk-in' },
    ],
    processSteps: [
      {
        title: 'Identify Transaction',
        description:
          'Determine if you need transfer, update, or new declaration.',
      },
      {
        title: 'Submit Documents',
        description:
          'Submit deed of sale, title, or other supporting documents.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay transfer tax and processing fees.',
      },
      {
        title: 'Wait for Processing',
        description: 'Allow 1-5 days for assessment and approval.',
      },
      {
        title: 'Claim Declaration',
        description: 'Return to claim new tax declaration.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Transfer',
        icon: 'bi-arrow-left-right',
        items: [
          'Deed of Absolute Sale',
          'Transfer Certificate of Title',
          'Tax Clearance',
          'Previous Tax Declaration',
          'Valid IDs',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long is a tax declaration valid?',
        answer:
          'Until the property is transferred or there are changes requiring reassessment.',
      },
    ],
    office: {
      name: 'City Assessor\'s Office',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Property Declaration',
        link: '/service-details/property-declaration',
      },
      // TODO: Uncomment when city-treasurer page is ready
      // { title: 'City Treasurer', link: '/service-details/city-treasurer' },
    ],
  },
  {
    id: 'city-treasurer',
    hidden: true,
    title: 'City Treasurer\'s Office',
    fullTitle: 'City Treasurer\'s Office',
    category: 'Taxation',
    categoryLink: '/services/tax-payments',
    badgeText: 'Taxation',
    badgeIcon: 'bi-cash-coin',
    description: 'Tax payments, revenue collection, and tax clearances',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '15-30 Minutes' },
      { icon: 'bi-cash', label: 'Payment Methods', value: 'Cash/Check' },
      { icon: 'bi-calendar', label: 'Deadline', value: 'Jan 31 (RPT)' },
      { icon: 'bi-percent', label: 'Discount', value: '10% if paid early' },
    ],
    processSteps: [
      {
        title: 'Get Tax Bill',
        description: 'Request your tax bill or assessment from the office.',
      },
      {
        title: 'Verify Amount',
        description: 'Check the details and amount due.',
      },
      { title: 'Make Payment', description: 'Pay at the cashier window.' },
      {
        title: 'Claim Receipt',
        description: 'Keep official receipt for your records.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Real Property Tax',
        icon: 'bi-house',
        items: [
          'Tax Declaration Number',
          'Previous Official Receipt',
          'Valid ID',
        ],
      },
      {
        title: 'For Business Tax',
        icon: 'bi-shop',
        items: ['Business Permit', 'Assessment from BPLO', 'Valid ID'],
      },
    ],
    faqs: [
      {
        question: 'Is there a discount for early payment?',
        answer: 'Yes, 10% discount for RPT paid in full before January 31.',
      },
      {
        question: 'Can I pay quarterly?',
        answer: 'Yes, RPT can be paid quarterly without discount.',
      },
    ],
    office: {
      name: 'City Treasurer\'s Office',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'Property Declaration',
        link: '/service-details/property-declaration',
      },
      {
        title: 'City Assessor',
        link: '/service-details/city-assessor',
      },
    ],
    onlineLink: 'https://cityoflaspinas.ph/',
  },

  /**
   * Social Services
   */
  {
    id: 'cswdo',
    title: 'CSWDO',
    fullTitle: 'City Social Welfare & Development Office',
    category: 'Social Services',
    categoryLink: '/services/social-services',
    badgeText: 'Office',
    badgeIcon: 'bi-building',
    description: 'Social welfare programs and community development',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Hotline', value: '0916 284 0885' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Ground Floor' },
      { icon: 'bi-cash', label: 'Services', value: 'Free' },
    ],
    processSteps: [
      {
        title: 'Visit Office',
        description: 'Go to CSWDO at City Hall ground floor.',
      },
      {
        title: 'State Your Concern',
        description: 'Inform staff of the assistance or service you need.',
      },
      {
        title: 'Assessment',
        description: 'CSWDO staff will assess your situation.',
      },
      {
        title: 'Receive Assistance',
        description: 'Get appropriate assistance based on assessment.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Requirements',
        icon: 'bi-file-text',
        items: [
          'Valid ID',
          'Barangay certification',
          'Supporting documents based on program',
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the office hours?',
        answer: 'Monday to Thursday, 8:00 AM to 7:00 PM.',
      },
    ],
    office: {
      name: 'CSWDO',
      location: 'City Hall, Ground Floor',
      phone: '0916 284 0885',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'CSWDO Services', link: '/service-details/cswdo-services' },
    ],
  },

  /**
   * Agriculture
   */
  {
    id: 'city-agriculture',
    title: 'City Agriculture Office',
    fullTitle: 'City Agriculture Office (MAGRO)',
    category: 'Agriculture',
    categoryLink: '/services/agriculture',
    badgeText: 'Agriculture',
    badgeIcon: 'bi-tree',
    description: 'Agricultural programs, farmer registration, and assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-cash', label: 'Programs', value: 'Free/Subsidized' },
    ],
    processSteps: [
      {
        title: 'Visit MAGRO',
        description: 'Go to City Agriculture Office at City Hall.',
      },
      {
        title: 'Farmer Registration',
        description: 'Register under RSBSA if not yet registered.',
      },
      {
        title: 'Identify Program',
        description: 'Inquire about available programs and assistance.',
      },
      {
        title: 'Submit Requirements',
        description: 'Submit documents for the program you are applying for.',
      },
      {
        title: 'Receive Assistance',
        description: 'Get subsidized inputs, training, or other assistance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For RSBSA Registration',
        icon: 'bi-card-list',
        items: [
          'Valid ID',
          'Barangay certification of farmer status',
          'Proof of land ownership or tenant agreement',
          '1x1 ID picture',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is RSBSA?',
        answer:
          'Registry System for Basic Sectors in Agriculture - a prerequisite for accessing government agricultural programs.',
      },
      {
        question: 'What assistance is available?',
        answer:
          'Fertilizer subsidy, seeds distribution, livestock dispersal, crop insurance, and technical training.',
      },
    ],
    office: {
      name: 'City Agriculture Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Fertilizer Assistance', link: '/services/agriculture' },
      { title: 'Crop Insurance', link: '/services/agriculture' },
    ],
  },

  /**
   * Infrastructure
   */
  {
    id: 'city-engineering',
    title: 'City Engineering Office',
    fullTitle: 'City Engineering Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-building-gear',
    description: 'Building permits, construction, and infrastructure projects',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '5-10 Days' },
      { icon: 'bi-cash', label: 'Fee', value: 'Varies' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Secure Zoning Clearance',
        description: 'Get zoning clearance from Planning Office.',
      },
      {
        title: 'Prepare Plans',
        description:
          'Prepare building plans signed by licensed engineer/architect.',
      },
      {
        title: 'Submit Application',
        description: 'File building permit application with requirements.',
      },
      {
        title: 'Site Inspection',
        description: 'City engineer conducts site inspection.',
      },
      {
        title: 'Pay Fees',
        description: 'Pay permit fees at Treasurer\'s Office.',
      },
      {
        title: 'Claim Permit',
        description: 'Return to Engineering to claim building permit.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Building Permit',
        icon: 'bi-building',
        items: [
          'Zoning clearance',
          'Building plans (5 sets) signed by licensed professional',
          'Land title or deed of sale',
          'Barangay clearance',
          'Fire safety evaluation clearance',
          'Structural analysis (for 2+ storeys)',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long is a building permit valid?',
        answer: 'Usually 1 year, extendable upon request.',
      },
      {
        question: 'Do I need a permit for renovations?',
        answer: 'Yes, any structural modification requires a building permit.',
      },
    ],
    office: {
      name: 'City Engineering Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      {
        title: 'City Planning',
        link: '/service-details/city-planning',
      },
      { title: 'Fire Safety Certificate', link: '/services/infrastructure' },
    ],
  },
  {
    id: 'city-planning',
    title: 'City Planning & Development',
    fullTitle: 'City Planning & Development Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Infrastructure',
    badgeIcon: 'bi-clipboard-data',
    description: 'Zoning, land use, and development planning',
    quickStats: [
      { icon: 'bi-clock', label: 'Processing', value: '3-5 Days' },
      { icon: 'bi-cash', label: 'Fee', value: '₱100-500' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description: 'File zoning clearance request with location details.',
      },
      {
        title: 'Document Review',
        description: 'Planning office reviews land use compatibility.',
      },
      {
        title: 'Site Verification',
        description: 'Staff may conduct site visit if needed.',
      },
      { title: 'Pay Fees', description: 'Pay at Treasurer\'s Office.' },
      {
        title: 'Claim Clearance',
        description: 'Return to claim zoning clearance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Zoning Clearance',
        icon: 'bi-map',
        items: [
          'Tax declaration of property',
          'Lot plan or sketch of location',
          'Valid ID of applicant',
          'Purpose of application',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is zoning clearance?',
        answer:
          'A document certifying that your proposed use of the property is compatible with the zonal classification.',
      },
    ],
    office: {
      name: 'City Planning & Development Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Engineering',
        link: '/service-details/city-engineering',
      },
    ],
  },
  {
    id: 'city-general-services',
    title: 'City General Services',
    fullTitle: 'City General Services Office',
    category: 'Infrastructure',
    categoryLink: '/services/infrastructure',
    badgeText: 'Services',
    badgeIcon: 'bi-tools',
    description: 'Equipment rental, vehicle use, and general services',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-cash', label: 'Rental', value: 'Varies' },
    ],
    processSteps: [
      {
        title: 'Submit Request',
        description: 'File equipment or vehicle use request.',
      },
      { title: 'Approval', description: 'Wait for approval from GSO.' },
      { title: 'Pay Fees', description: 'Pay rental fees if applicable.' },
      {
        title: 'Use Equipment',
        description: 'Use equipment/vehicle as scheduled.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'Equipment Request',
        icon: 'bi-file-text',
        items: [
          'Request letter',
          'Purpose of use',
          'Valid ID',
          'Payment (if applicable)',
        ],
      },
    ],
    faqs: [
      {
        question: 'What equipment is available?',
        answer:
          'Heavy equipment, service vehicles, and other municipal assets for public use.',
      },
    ],
    office: {
      name: 'General Services Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'Infrastructure', link: '/services/infrastructure' },
    ],
  },

  /**
   * Budget
   */
  {
    id: 'city-budget',
    title: 'City Budget Office',
    fullTitle: 'City Budget Office',
    category: 'Budget',
    categoryLink: '/budget',
    badgeText: 'Budget',
    badgeIcon: 'bi-wallet2',
    description: 'Budget preparation, appropriation, and financial management',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-file-text', label: 'Reports', value: 'Public Access' },
    ],
    processSteps: [
      {
        title: 'Public Inquiry',
        description: 'For budget-related inquiries, visit the Budget Office.',
      },
      {
        title: 'Submit Request',
        description: 'Submit written request for specific budget information.',
      },
      {
        title: 'Processing',
        description: 'Office processes request and prepares information.',
      },
      {
        title: 'Receive Information',
        description: 'Receive requested budget documents.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Information Request',
        icon: 'bi-info-circle',
        items: ['Written request letter', 'Valid ID', 'Purpose of request'],
      },
    ],
    faqs: [
      {
        question: 'Is budget information available to the public?',
        answer:
          'Yes, municipal budget documents are public records accessible under the Freedom of Information.',
      },
    ],
    office: {
      name: 'City Budget Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      {
        title: 'City Accounting',
        link: '/service-details/city-accounting',
      },
      { title: 'Budget Transparency', link: '/budget' },
    ],
  },
  {
    id: 'city-accounting',
    title: 'City Accounting Office',
    fullTitle: 'City Accounting Office',
    category: 'Budget',
    categoryLink: '/budget',
    badgeText: 'Budget',
    badgeIcon: 'bi-calculator',
    description: 'Financial transactions, payroll, and accounting records',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-file-text', label: 'Records', value: 'Financial' },
    ],
    processSteps: [
      {
        title: 'Identify Transaction',
        description: 'Determine what accounting service you need.',
      },
      {
        title: 'Submit Documents',
        description: 'Submit required documents for processing.',
      },
      {
        title: 'Verification',
        description: 'Accounting staff verifies and processes documents.',
      },
      {
        title: 'Completion',
        description: 'Receive processed documents or certificates.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Requirements',
        icon: 'bi-file-text',
        items: ['Official request letter', 'Supporting documents', 'Valid ID'],
      },
    ],
    faqs: [
      {
        question: 'What services are offered?',
        answer:
          'Financial statement verification, supplier payment processing, payroll services for LGU employees.',
      },
    ],
    office: {
      name: 'City Accounting Office',
      location: 'City Hall',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [
      { title: 'City Budget', link: '/service-details/city-budget' },
      // TODO: Uncomment when city-treasurer page is ready
      // { title: 'City Treasurer', link: '/service-details/city-treasurer' },
    ],
  },

  /**
   * Services
   */
  {
    id: 'general-services',
    title: 'General Services',
    fullTitle: 'General City Services',
    category: 'Services',
    categoryLink: '/services',
    badgeText: 'Services',
    badgeIcon: 'bi-grid',
    description: 'General public services and information',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(078) 326-5001' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall' },
      { icon: 'bi-info-circle', label: 'Info Desk', value: 'Ground Floor' },
    ],
    processSteps: [
      {
        title: 'Visit Information Desk',
        description: 'Go to the ground floor information desk.',
      },
      {
        title: 'State Your Concern',
        description: 'Tell the staff what service you need.',
      },
      {
        title: 'Get Directions',
        description: 'Staff will direct you to the appropriate office.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General Visit',
        icon: 'bi-person',
        items: ['Valid ID for most transactions'],
      },
    ],
    faqs: [
      {
        question: 'Where can I get information about services?',
        answer:
          'Visit the Information Desk at the ground floor of City Hall.',
      },
    ],
    office: {
      name: 'Information Desk',
      location: 'City Hall, Ground Floor',
      phone: '(078) 326-5001',
      hours: 'Mon-Thu: 8AM - 7PM',
    },
    relatedServices: [{ title: 'All Services', link: '/services' }],
  },

  /**
   * Health
   */
  {
    id: 'city-health',
    title: 'City Health Office',
    fullTitle: 'City Health Office',
    category: 'Health',
    categoryLink: '/services/health',
    badgeText: 'Health',
    badgeIcon: 'bi-heart-pulse',
    description: 'Public health services, vaccination, and medical assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Office Hours', value: 'Mon-Fri 8AM-5PM' },
      { icon: 'bi-telephone', label: 'Contact', value: '(02) 8367-3406' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'City Hall Compound' },
      { icon: 'bi-heart', label: 'Services', value: 'Public Health' },
    ],
    processSteps: [
      {
        title: 'Visit CHO',
        description: 'Go to the City Health Office.',
      },
      {
        title: 'Triage/Assessment',
        description: 'Medical staff will assess your needs.',
      },
      {
        title: 'Receive Service',
        description: 'Receive vaccination, consultation, or assistance.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'General',
        icon: 'bi-file-text',
        items: ['Valid ID', 'Medical records (if applicable)'],
      },
    ],
    faqs: [
      {
        question: 'Is consultation free?',
        answer: 'Yes, basic consultation at the health office is free.',
      },
    ],
    office: {
      name: 'City Health Office',
      location: 'City Hall Compound',
      phone: '(02) 8367-3406',
      mobile: '0998 977 8597',
      facebook: 'https://www.facebook.com/LPCityhealth',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      { title: 'Vaccination', link: '/service-details/vaccination' },
    ],
  },
  {
    id: 'vaccination',
    title: 'Vaccination Programs',
    fullTitle: 'Immunization & Vaccination Services',
    category: 'Health',
    categoryLink: '/services/health',
    badgeText: 'Health',
    badgeIcon: 'bi-shield-plus',
    description: 'Free immunization for children, adults, and senior citizens',
    quickStats: [
      { icon: 'bi-clock', label: 'Schedule', value: 'Mon-Fri' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Health Centers' },
      { icon: 'bi-calendar-check', label: 'Appointment', value: 'Walk-in' },
    ],
    processSteps: [
      {
        title: 'Registration',
        description: 'Register at the health center.',
      },
      {
        title: 'Screening',
        description: 'Health screening and vital signs check.',
      },
      {
        title: 'Vaccination',
        description: 'Administration of vaccine.',
        isFinal: true,
      },
    ],
    requirements: [
      {
        title: 'For Children',
        icon: 'bi-person',
        items: ['Baby book / Immunization card'],
      },
    ],
    faqs: [
      {
        question: 'Are vaccines safe?',
        answer: 'Yes, all vaccines provided are DOH-approved and safe.',
      },
    ],
    office: {
      name: 'City Health Office',
      location: 'City Hall Compound',
      phone: '(02) 8367-3406',
      mobile: '0998 977 8597',
      facebook: 'https://www.facebook.com/LPCityhealth',
      hours: 'Mon-Fri: 8AM - 5PM',
    },
    relatedServices: [
      { title: 'City Health Office', link: '/service-details/city-health' },
    ],
  },

  /**
   * Public Safety
   */
  {
    id: 'cdrrmo',
    title: 'CDRRMO',
    fullTitle: 'City Disaster Risk Reduction and Management Office',
    category: 'Public Safety',
    categoryLink: '/services/public-safety',
    badgeText: 'Safety',
    badgeIcon: 'bi-shield-exclamation',
    description: 'Emergency response, disaster management, and rescue services',
    quickStats: [
      { icon: 'bi-clock', label: 'Operations', value: '24/7' },
      { icon: 'bi-telephone', label: 'Emergency', value: '(02) 8290-6500' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Command Center' },
      { icon: 'bi-shield', label: 'Service', value: 'Rescue' },
    ],
    processSteps: [
      {
        title: 'Call Emergency Hotline',
        description: 'Dial (02) 8290-6500 for emergencies.',
      },
      {
        title: 'Dispatch',
        description: 'Responders are dispatched to the location.',
      },
      {
        title: 'Response / Rescue',
        description: 'Emergency assistance is provided.',
        isFinal: true,
      },
    ],
    requirements: [],
    faqs: [
      {
        question: 'What is the emergency hotline?',
        answer: '(02) 8290-6500 or 911.',
      },
    ],
    office: {
      name: 'CDRRMO',
      location: 'Command Center',
      phone: '(02) 8290-6500',
      hours: '24/7 Operations',
    },
    relatedServices: [
      {
        title: 'Emergency Response',
        link: '/service-details/emergency-response',
      },
    ],
  },
  {
    id: 'emergency-response',
    title: 'Emergency Response',
    fullTitle: 'Emergency Rescue & Response',
    category: 'Public Safety',
    categoryLink: '/services/public-safety',
    badgeText: 'Safety',
    badgeIcon: 'bi-ambulance',
    description: '24/7 ambulance and rescue assistance',
    quickStats: [
      { icon: 'bi-clock', label: 'Response', value: 'Immediate' },
      { icon: 'bi-telephone', label: 'Hotline', value: '(02) 8290-6500' },
      { icon: 'bi-geo-alt', label: 'Coverage', value: 'Citywide' },
      { icon: 'bi-cash', label: 'Fee', value: 'Free' },
    ],
    processSteps: [
      {
        title: 'Call Hotline',
        description: 'Call (02) 8290-6500 immediately.',
      },
      {
        title: 'Provide Info',
        description: 'State nature of emergency and exact location.',
      },
      {
        title: 'Wait for Help',
        description: 'Stay on the line if instructed. Responders are on the way.',
        isFinal: true,
      },
    ],
    requirements: [],
    faqs: [
      {
        question: 'Is ambulance service free?',
        answer: 'Yes, for emergency cases within the city.',
      },
    ],
    office: {
      name: 'CDRRMO',
      location: 'Command Center',
      phone: '(02) 8290-6500',
      hours: '24/7 Operations',
    },
    relatedServices: [
      { title: 'CDRRMO', link: '/service-details/cdrrmo' },
    ],
  },
]

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  const service = serviceDetailsContent.find(service => service.id === slug)

  if (!service || service.hidden)
    return undefined

  return service
}
