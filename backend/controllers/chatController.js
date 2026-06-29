// A lightweight rule-based responder for the portfolio AI assistant.
// You can swap this for OpenAI / Anthropic API calls later — just keep the same shape.

const KNOWLEDGE = {
  name: 'Muhammad Zaid',
  location: 'Pakistan',
  email: 'muhammadzaid1084@@gmail.com',
  titles: ['MERN Stack Developer', 'Full Stack Developer', 'AI Enthusiast'],
  education: [
    'Pre-Medical at Ali Ghar College (2023–2025)',
    'MERN Stack training at SMIT (2025–2026)',
    'BSCS at Federal Urdu University (2026–present)',
  ],
  skills: {
    frontend: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST APIs'],
    tools: ['GitHub', 'Postman', 'Vercel', 'Netlify', 'Docker'],
    ai: ['Agentic AI', 'n8n', 'AI APIs', 'Prompt Engineering'],
  },
  projects: [
    'AI Clinic Management SaaS — multi-role auth, AI diagnosis, appointments, prescriptions, analytics.',
    'MERN E-Commerce Store — JWT auth, admin dashboard, cart & checkout, fully responsive.',
    'Supabase Authentication System — login/register, OAuth, password reset.',
    'AI Portfolio Assistant — AI chat, portfolio navigation, smart responses.',
  ],
  availability: 'Open to Internship & Freelance Opportunities',
}

function respond(msg = '') {
  const m = msg.toLowerCase().trim()

  if (!m) return `Ask me anything about ${KNOWLEDGE.name}!`

  if (/(hi|hello|hey|salam|assalam)/.test(m))
    return `Hello! 👋 I'm Zaid's portfolio AI. Ask me about his skills, projects, or experience.`

  if (/(who|about|introduce|tell me about|zaid)/.test(m))
    return `${KNOWLEDGE.name} is a passionate ${KNOWLEDGE.titles[0]} based in ${KNOWLEDGE.location}. He's currently learning Agentic AI and pursuing BSCS at Federal Urdu University, after completing the MERN Stack bootcamp at SMIT.`

  if (/(skill|tech|stack|technolog|languages|frameworks)/.test(m))
    return `Zaid's strongest skills are React, Next.js, Node.js, Express, MongoDB, Tailwind CSS, REST APIs, and JWT auth. He's also actively learning Agentic AI, n8n, prompt engineering, and AI API integrations.`

  if (/(project|portfolio|work|built|build|showcase)/.test(m))
    return `Featured projects: ${KNOWLEDGE.projects.join(' • ')}`

  if (/(experience|background|journey|story)/.test(m))
    return `Zaid started in pre-medical at Ali Ghar College, then transitioned to software via SMIT's MERN bootcamp. He's now pursuing BSCS while building real-world full-stack projects and exploring AI agents.`

  if (/(education|study|school|college|university|degree)/.test(m))
    return `Education: ${KNOWLEDGE.education.join(' → ')}.`

  if (/(contact|hire|email|reach|message|phone|connect)/.test(m))
    return `You can reach Zaid at ${KNOWLEDGE.email} or via the contact form on this page. He's ${KNOWLEDGE.availability.toLowerCase()}.`

  if (/(location|where|country|live|based)/.test(m))
    return `Zaid is based in ${KNOWLEDGE.location}.`

  if (/(available|hire|freelance|intern|job|open to work)/.test(m))
    return `Yes — Zaid is ${KNOWLEDGE.availability.toLowerCase()}.`

  if (/(ai|artificial intelligence|agentic|chatbot|llm|gpt)/.test(m))
    return `Zaid is actively exploring Agentic AI — building autonomous agents with tools like n8n, prompt engineering, and AI APIs. He's especially interested in combining AI with full-stack apps.`

  if (/(thank|thanks)/.test(m))
    return `You're welcome! Feel free to ask anything else, or scroll down to the contact form to reach out directly.`

  return `Interesting question! I can tell you about Zaid's skills, projects, education, experience, or how to contact him. Try one of the suggestions below 👇`
}

export const chat = async (req, res, next) => {
  try {
    const { message } = req.body || {}
    if (!message || typeof message !== 'string') {
      res.status(400)
      throw new Error('A "message" field is required.')
    }
    if (message.length > 500) {
      res.status(400)
      throw new Error('Message too long (max 500 chars).')
    }

    // Simulate brief processing delay (feels more natural)
    await new Promise((r) => setTimeout(r, 250))

    const reply = respond(message)
    res.json({ reply })
  } catch (err) {
    next(err)
  }
}
