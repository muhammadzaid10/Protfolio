// ============================================================
//  Muhammad Zaid — Portfolio Data
//  Edit this single file to update content across the site.
// ============================================================

export const personal = {
  name: 'Muhammad Zaid',
  shortName: 'Zaid',
  titles: [
    'MERN Stack Developer',
    'Full Stack Developer',
    'React Developer',
    'AI Enthusiast',
    'Agentic AI Learner',
  ],
  tagline:
    'Building modern full-stack experiences at the intersection of web and AI.',
  bio: `Muhammad Zaid is a passionate MERN Stack Developer currently learning Agentic AI systems and modern full stack technologies. He completed MERN Stack training from SMIT and is currently pursuing BSCS from Federal Urdu University. He started his educational journey in the medical field from Ali Ghar College before transitioning into Computer Science and Software Development.`,
  location: 'Pakistan',
  availability: 'Open to Internship & Freelance Opportunities',
  email: 'muhammadzaid1084@gmail.com',
  socials: {
    github: 'https://github.com/muhammadzaid10',
    linkedin: 'https://www.linkedin.com/in/muhammad-zaid-346249354',
    gmail: 'mailto:muhammadzaid1084@gmail.com',
  },
  resumeUrl: '/Muhammad-Zaid-CV.pdf',
}

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export const aboutHighlights = [
  {
    title: 'Tech Passion',
    desc: 'Obsessed with shipping clean, performant, modern web experiences.',
    icon: 'Sparkles',
  },
  {
    title: 'Problem Solver',
    desc: 'I treat every bug as a puzzle — break it down, fix it, learn from it.',
    icon: 'Puzzle',
  },
  {
    title: 'AI + Web',
    desc: 'Bridging classic full-stack engineering with agentic AI workflows.',
    icon: 'BrainCircuit',
  },
  {
    title: 'Always Learning',
    desc: 'From medical sciences to software — curiosity is my engine.',
    icon: 'GraduationCap',
  },
]

export const counters = [
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Technologies Learned', value: 25, suffix: '+' },
  { label: 'AI Experiments', value: 30, suffix: '+' },
  { label: 'Coding Hours', value: 2500, suffix: '+' },
  { label: 'GitHub Contributions', value: 400, suffix: '+' },
]

export const education = [
  {
    institution: 'Ali Ghar College',
    degree: 'Intermediate — Pre-Medical',
    period: '2023 — 2025',
    description:
      'Started the academic journey in the medical sciences, building a strong foundation in biology, chemistry, and analytical thinking.',
    icon: 'Stethoscope',
    color: 'pink',
  },
  {
    institution: 'SMIT (Saylani Mass IT Training)',
    degree: 'MERN Stack Development Course',
    period: '2025 — 2026',
    description:
      'Intensive hands-on training covering MongoDB, Express, React, Node.js, authentication, REST APIs, and deployment workflows.',
    icon: 'Code2',
    color: 'cyan',
  },
  {
    institution: 'Federal Urdu University of Arts, Science & Technology',
    degree: 'BS Computer Science (BSCS)',
    period: '2026 — Present',
    description:
      'Currently pursuing a Bachelor\'s in Computer Science — diving deep into algorithms, systems, AI, and software engineering.',
    icon: 'GraduationCap',
    color: 'magenta',
    current: true,
  },
]

export const skills = {
  Frontend: [
    { name: 'React.js', level: 92 },
    { name: 'Redux Toolkit', level: 80 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'HTML5', level: 98 },
    { name: 'CSS3', level: 95 },
  ],
  Backend: [
    { name: 'Node.js', level: 88 },
    { name: 'Express.js', level: 90 },
    { name: 'MongoDB', level: 85 },
    { name: 'JWT Auth', level: 85 },
    { name: 'REST APIs', level: 90 },
  ],
  Tools: [
    { name: 'GitHub', level: 90 },
    { name: 'Postman', level: 88 },
    { name: 'Vercel', level: 85 },
    { name: 'Netlify', level: 85 },
    { name: 'Docker', level: 65 },
  ],
  'AI & Automation': [
    { name: 'Agentic AI', level: 75 },
    { name: 'n8n', level: 70 },
    { name: 'AI APIs', level: 82 },
    { name: 'Prompt Engineering', level: 85 },
  ],
}

export const projects = [
  {
    title: 'AI Clinic Management SaaS',
    description:
      'A full-fledged multi-role healthcare SaaS combining classic clinic workflows with an AI diagnosis assistant and analytics.',
    features: [
      'Multi-role authentication',
      'AI diagnosis system',
      'Appointments & scheduling',
      'Prescriptions',
      'Analytics dashboard',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'AI APIs'],
    live: 'https://ai-clinic-saas.vercel.app',
    github: 'https://github.com/muhammadzaid10/Ai-Clinic-Saas',
    accent: 'cyan',
    featured: true,
  },
  {
    title: 'MERN E-Commerce Store',
    description:
      'Production-ready e-commerce platform with admin dashboard, payment-ready cart, and a fully responsive storefront.',
    features: [
      'JWT Authentication',
      'Admin Dashboard',
      'Cart & Checkout',
      'Product Management',
      'Responsive UI',
    ],
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB'],
    live: 'https://mern-e-commerce-one-mu.vercel.app/',
    github: 'https://github.com/muhammadzaid10/MERN-E-Commerce',
    accent: 'magenta',
  },
  {
    title: 'Supabase Authentication System',
    description:
      'Modern auth experience with OAuth providers, secure session handling, and password reset flows out of the box.',
    features: [
      'Login / Register',
      'OAuth providers',
      'Password reset',
      'Secure session handling',
    ],
    tech: ['React', 'Supabase', 'Tailwind CSS', 'JWT'],
    live: 'https://supabase-authentication-system.vercel.app/login',
    github: 'https://github.com/muhammadzaid10/Supabase-Authentication-System',
    accent: 'pink',
  },
{
  title: 'PitchCraft',
  description:
    'An AI-powered web application that helps users generate professional business pitches and startup ideas. It features secure authentication, cloud database integration, and a modern responsive interface.',
  features: [
    'AI-powered pitch generation',
    'Supabase authentication',
    'Cloud database',
    'Responsive UI',
  ],
  tech: [
    'React',
    'Supabase',
    'Grok API',
    'Tailwind CSS',
    'JavaScript',
    'Vercel',
  ],
  live: 'https://pitch-craft-chi.vercel.app/',
  github: 'https://github.com/muhammadzaid10/Pitch-Craft',
  accent: 'violet',
},
]

// Quick-reply suggestions for the AI Assistant section
export const assistantSuggestions = [
  'Who is Muhammad Zaid?',
  'What are your strongest skills?',
  'Show me your top projects',
  'What is your experience?',
  'How can I contact you?',
]
