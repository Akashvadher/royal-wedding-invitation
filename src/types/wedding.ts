export interface WeddingEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  tag?: string;
}

export interface WardrobeItem {
  id: string;
  event: string;
  theme: string;
  attire: string;
  palette: string[];
  notes?: string;
}

export interface WeddingData {
  groom: {
    name: string;
    parents: string;
  };
  bride: {
    name: string;
    parents: string;
  };
  blessingTop: string;
  tagline: string;
  subTagline: string;
  weddingDate: {
    day: string;
    month: string;
    year: string;
    targetIso: string;
  };
  venue: {
    title: string;
    subtitle: string;
    address: string;
    cityState: string;
    googleMapsUrl: string;
  };
  events: WeddingEvent[];
  wardrobe: WardrobeItem[];
  closing: {
    note: string;
    familyNames: string;
    tagline: string;
  };
}

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groom: {
    name: 'RITESH',
    parents: 'S/O MR. RAJESH & MRS. SUNITA MALHOTRA',
  },
  bride: {
    name: 'REET',
    parents: 'D/O MR. RAJENDRA & MRS. KAVITA VERMA',
  },
  blessingTop: '॥ श्री गणेशाय नमः ॥',
  tagline: 'TWO HEARTS, TWO SOULS\nBOUND TOGETHER IN LOVE FOREVER',
  subTagline: 'WE REQUEST THE PLEASURE OF YOUR COMPANY AS WE CELEBRATE THE MARRIAGE OF OUR CHILDREN',
  weddingDate: {
    day: '24',
    month: 'DEC',
    year: '2026',
    targetIso: '2026-12-24T18:00:00',
  },
  venue: {
    title: "We're celebrating at",
    subtitle: 'UNDER THE JAIPUR SKY, SURROUNDED BY THOSE WE LOVE MOST, WE WOULD BE HONOURED TO CELEBRATE WITH YOU',
    address: 'RADISSON BLU HOTEL',
    cityState: 'PLOT NO. 5 & 6, AIRPORT PLAZA, TONK RD, DURGAPURA, JAIPUR, RAJASTHAN 302018',
    googleMapsUrl: 'https://maps.google.com/?q=Radisson+Blu+Hotel+Airport+Plaza+Tonk+Rd+Jaipur',
  },
  events: [
    {
      id: 'haldi',
      date: '23 DEC',
      time: '11:00 AM',
      title: 'HALDI',
      subtitle: 'A morning of sunshine & love',
    },
    {
      id: 'sangeet',
      date: '23 DEC',
      time: '7:00 PM',
      title: 'SANGEET & ENGAGEMENT',
      subtitle: 'Followed by dinner',
    },
    {
      id: 'mayra',
      date: '24 DEC',
      time: '9:00 AM',
      title: 'MAYRA',
      subtitle: 'Blessings from the family',
    },
    {
      id: 'baraat',
      date: '24 DEC',
      time: '4:00 PM',
      title: 'BARAAT',
      subtitle: 'The celebration begins',
    },
    {
      id: 'phera',
      date: '24 DEC',
      time: '6:00 PM',
      title: 'VARMALA & PHERA',
      subtitle: 'Two hearts, one journey',
    },
    {
      id: 'reception',
      date: '24 DEC',
      time: '9:00 PM',
      title: 'RECEPTION',
      subtitle: 'Dinner & dancing',
    },
  ],
  wardrobe: [
    {
      id: 'haldi-wardrobe',
      event: 'HALDI',
      theme: 'PASTEL SHADES',
      attire: 'INDIAN TRADITIONAL',
      palette: ['#FDE047', '#FBBF24', '#FED7AA', '#FEF08A'],
      notes: 'Bright yellow & sunshine pastel tones',
    },
    {
      id: 'sangeet-wardrobe',
      event: 'SANGEET',
      theme: 'GLITZ & GLAM',
      attire: 'INDO WESTERN',
      palette: ['#1E3A8A', '#065F46', '#D97706', '#4C1D95'],
      notes: 'Sparkles, jewels & midnight hues',
    },
    {
      id: 'wedding-wardrobe',
      event: 'WEDDING',
      theme: 'ROYAL TRADITIONAL',
      attire: 'REGAL ETHNIC',
      palette: ['#881337', '#991B1B', '#D97706', '#FDF2F8'],
      notes: 'Royal crimson, vermilion & antique gold',
    },
    {
      id: 'reception-wardrobe',
      event: 'RECEPTION',
      theme: 'ELEGANT SOIREE',
      attire: 'WESTERN FORMAL / CHIC',
      palette: ['#0F172A', '#334155', '#E2E8F0', '#EAB308'],
      notes: 'Tuxedos, gowns & opulent formal wear',
    },
  ],
  closing: {
    note: "We can't wait to celebrate with you.\nYour presence will make our day all the more special.",
    familyNames: 'The Malhotra & Verma Families',
    tagline: 'Two families, one beautiful beginning — see you there',
  },
};
