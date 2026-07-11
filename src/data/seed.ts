export interface AtlasEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Trend' | 'Aesthetic' | 'Design Concept' | 'Taste' | 'Photography' | 'Visual Culture';
  description: string;
  overview: string;
  visualTraits: string[];
  colorPalette: string[]; // hex codes
  typographyStyle: string;
  photographyStyle: string;
  uiStyle: string;
  industries: string[];
  platforms: string[];
  region: string;
  era: string;
  mood: string[];
  signalStrength: number; // 0-100
  popularityScore: number;
  useCases: string[];
  promptExamples: {
    title: string;
    prompt: string;
  }[];
  assetLinks: {
    title: string;
    url: string;
  }[];
  relatedEntries: string[]; // slugs
  seoTitle: string;
  metaDescription: string;
  ogImage: string;
  createdAt: string;
  updatedAt: string;
}

export const sampleAtlasEntries: AtlasEntry[] = [
  {
    id: '1',
    slug: 'neo-y2k-interface',
    title: 'Neo-Y2K Interface',
    subtitle: 'Translucent chrome, bubble UI, gradient orbs, and nostalgic digital optimism rebuilt for AI-era products.',
    category: 'Aesthetic',
    description: 'Neo-Y2K Interface is a visual direction built around translucent chrome, bubble UI, gradient orbs, and nostalgic digital optimism. It works well for AI products and consumer apps that want to feel futuristic yet playful.',
    overview: 'A resurgence of late 90s and early 2000s web aesthetics, updated with modern rendering techniques like glassmorphism and smooth 3D.',
    visualTraits: ['Translucent chrome', 'Bubble UI', 'Gradient orbs', 'Wireframe accents', 'High-contrast neon'],
    colorPalette: ['#D8D8D8', '#4D8DFF', '#FF4FD8', '#000000'],
    typographyStyle: 'Extended Sans Serif with pixel accents',
    photographyStyle: 'Fisheye lens, harsh flash, digital artifacts',
    uiStyle: 'Glassmorphism, floating panels, rounded corners',
    industries: ['Consumer AI', 'Music Tech', 'Fashion E-commerce'],
    platforms: ['Web', 'iOS', 'TikTok'],
    region: 'Global',
    era: '2024',
    mood: ['Optimistic', 'Playful', 'Futuristic'],
    signalStrength: 92,
    popularityScore: 88,
    useCases: ['App Onboarding', 'Landing Page Hero', 'Social Media Carousel'],
    promptExamples: [
      {
        title: 'Neo-Y2K Dashboard',
        prompt: 'UI design of a Neo-Y2K music app dashboard, translucent chrome panels, gradient blue and pink orbs, floating bubble UI, dark background, futuristic digital optimism, high quality.',
      }
    ],
    assetLinks: [
      { title: 'Neo-Y2K UI Kit', url: '/assets/neo-y2k-ui-kit' }
    ],
    relatedEntries: ['retro-2000s-flash', 'chrome-future-poster'],
    seoTitle: 'Neo-Y2K Interface - Visual Culture Atlas',
    metaDescription: 'Explore the Neo-Y2K Interface aesthetic, featuring translucent chrome, bubble UI, and gradient orbs.',
    ogImage: '/og/neo-y2k.jpg',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    slug: 'urban-night-photography',
    title: 'Urban Night Photography',
    subtitle: 'Sodium-vapor amber, neon reflections, 35mm movement, wet asphalt, and raw street texture.',
    category: 'Photography',
    description: 'Urban Night Photography is a visual direction built around night streets, handheld movement, flash texture, neon color, and real city atmosphere. It works for streetwear, music labels, F&B campaigns, creator brands, and cultural startups that want to feel alive, local, and cinematic.',
    overview: 'Embracing the imperfect, raw energy of the city at night. This style rejects polished studio lighting in favor of environmental realism.',
    visualTraits: ['Night street light', 'Motion blur', 'Direct flash', 'Neon reflection', 'Film grain', 'Wet asphalt texture', 'Shop sign glow', 'Human presence', 'Unpolished realism'],
    colorPalette: ['#FFB84D', '#111111', '#B8FF4D', '#4D8DFF'],
    typographyStyle: 'Raw Grotesk, slightly distressed',
    photographyStyle: '35mm movement, direct flash, high grain',
    uiStyle: 'Dark mode, high contrast borders, brutalist layout',
    industries: ['Streetwear', 'Music', 'F&B', 'Events', 'Creator brands', 'Local lifestyle brands'],
    platforms: ['Instagram', 'TikTok', 'OOH'],
    region: 'Asia',
    era: '2024',
    mood: ['Raw', 'Energetic', 'Cinematic', 'Local'],
    signalStrength: 85,
    popularityScore: 90,
    useCases: ['Campaign Lookbook', 'Album Cover', 'Event Poster'],
    promptExamples: [
      {
        title: 'Cinematic Street Walk',
        prompt: 'Urban night campaign photograph, Jakarta side street, neon signage, sodium amber street light, subject walking with motion blur, direct flash detail, wet asphalt reflection, 35mm lens, Kodak Portra 800 grain, cinematic editorial composition.'
      }
    ],
    assetLinks: [
      { title: 'Night Street Lightroom Presets', url: '/assets/night-street-presets' }
    ],
    relatedEntries: ['cyber-street-identity', 'street-flash-lookbook'],
    seoTitle: 'Urban Night Photography - Design Concept',
    metaDescription: 'Discover the Urban Night Photography style, featuring sodium-vapor amber, motion blur, and raw street texture.',
    ogImage: '/og/urban-night.jpg',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '3',
    slug: 'premium-dark-dashboard',
    title: 'Premium Dark Dashboard',
    subtitle: 'Hairline grids, deep black surfaces, mono labels, restrained accents, and strong data hierarchy for serious digital products.',
    category: 'Design Concept',
    description: 'Premium Dark Dashboard is a product UI direction for AI tools, analytics platforms, dev tools, fintech, infrastructure, and B2B SaaS. It creates trust through restraint, density, and clarity.',
    overview: 'A sophisticated approach to data-heavy interfaces that prioritizes legibility and a sense of luxury within technical products.',
    visualTraits: ['Deep black background', 'Hairline grid', 'Mono metadata', 'Single accent color', 'High contrast cards', 'Spacious layout', 'Sharp hierarchy', 'Subtle glow', 'Data-first composition'],
    colorPalette: ['#070707', '#171717', '#4D8DFF', '#F5F5F0', '#77776F'],
    typographyStyle: 'Refined UI Sans + Mono labels',
    photographyStyle: 'Abstract 3D technical renders, dark glass',
    uiStyle: 'Deep dark mode, 1px borders, subtle hover glows',
    industries: ['AI infrastructure', 'Analytics', 'Fintech', 'Developer tools', 'Cybersecurity', 'Enterprise SaaS'],
    platforms: ['Web', 'Desktop App'],
    region: 'Global',
    era: 'Current',
    mood: ['Serious', 'Premium', 'Trustworthy', 'Technical'],
    signalStrength: 95,
    popularityScore: 98,
    useCases: ['SaaS Dashboard', 'Data Visualization', 'Developer Portal'],
    promptExamples: [
      {
        title: 'SaaS Analytics Interface',
        prompt: 'Premium dark analytics dashboard, deep black surface, hairline grid, electric blue accent, signal green status indicator, mono metadata labels, refined editorial headline, high contrast cards, clean data visualization, luxury SaaS interface.'
      }
    ],
    assetLinks: [
      { title: 'Premium Dark UI Kit', url: '/assets/premium-dark-ui-kit' }
    ],
    relatedEntries: ['cool-blue-minimal-saas', 'founder-mode-raw'],
    seoTitle: 'Premium Dark Dashboard - Visual Style',
    metaDescription: 'Learn about the Premium Dark Dashboard aesthetic for high-end B2B SaaS and AI products.',
    ogImage: '/og/premium-dark.jpg',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  }
];

export const tasteProfiles = [
  {
    id: '1',
    slug: 'premium-dark',
    name: 'Premium Dark',
    personality: 'Technical, Luxurious, Restrained',
    axisMinimalMaximal: 20, // 0 is minimal, 100 is maximal
    axisClassicExperimental: 30,
    axisCleanRaw: 10,
    axisCorporateCultural: 40,
    industries: ['Fintech', 'AI', 'Developer Tools'],
    palette: ['#070707', '#171717', '#4D8DFF', '#F5F5F0'],
    typography: 'Geist / Inter + JetBrains Mono',
    photography: 'Abstract dark glass 3D renders',
    uiStyle: 'Hairline grids, subtle glows',
    prompt: 'Premium dark analytics dashboard, deep black surface, hairline grid...',
    relatedEntries: ['premium-dark-dashboard']
  }
];

export const featuredSignals = sampleAtlasEntries.slice(0, 3);
