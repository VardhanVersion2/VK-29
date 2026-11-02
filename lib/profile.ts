export const profile = {
  name: 'Vardhan Kushwaha',
  role: 'Computer Science Engineering Student',
  headline: 'Engineering ideas into reality.',
  intro:
    'Computer Science Engineering student at Dr. A.P.J. Abdul Kalam Technical University, building full-stack and AI-powered products and solving problems through engineering.',
  phone: '+91-6393355350',
  email: 'vardhankushwaha555@gmail.com',
  location: 'Kanpur, India',
  links: {
    youtube: 'https://youtube.com/@Vardhan_Kushwaha',
    leetcode: 'https://leetcode.com/u/VardhanKushwaha',
    codeforces: 'https://codeforces.com/profile/VardhanK',
    linkedin: 'https://linkedin.com/in/vardhan-kushwaha-8ab04b304',
    github: 'https://github.com/VardhanVersion2',
    geeksforgeeks: '',
    email: 'mailto:vardhankushwaha555@gmail.com',
    resume: 'https://drive.google.com/file/d/1akFFpNV-Vf02yLEfY2gutc8R2V-V9GhE/view?usp=sharing',
  },
} as const

export const technologies = ['Java', 'Python', 'JavaScript', 'React', 'Spring Boot', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Git', 'GitHub']

export const skillGroups = [
  { category: 'Languages', items: ['Java', 'Python', 'C', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  { category: 'Frameworks & libraries', items: ['ReactJS', 'Spring Boot', 'NumPy', 'Pandas', 'ExpressJS', 'Node.js', 'Bootstrap', 'Tailwind CSS'] },
  { category: 'Databases & tools', items: ['MongoDB', 'Firebase', 'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'Postman', 'Vercel', 'Netlify', 'Railway'] },
]

export const education = [
  { program: 'B.Tech. (CSE)', result: '7.41 SGPA', institution: 'Dr. A.P.J. Abdul Kalam Technical University', dates: '2025 – 2029', location: 'Lucknow, India' },
  { program: 'Higher Secondary', result: '73.3%', institution: 'Sughar Singh Academy', dates: '2024', location: 'Kanpur, India' },
  { program: 'Secondary', result: '', institution: 'Sughar Singh Academy', dates: '2022', location: 'Kanpur, India' },
]

export const experience = [
  { role: 'Software Engineer Intern', organization: 'ITJOBXS', dates: 'September 2025 – April 2026', location: 'Remote, India', details: ['Built a responsive web section with HTML, CSS, JavaScript and Bootstrap.', 'Implemented user verification and authentication workflows and helped remove fake bots and spam posts.', 'Integrated Google reCAPTCHA to strengthen bot protection.'], stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'] },
  { role: 'Open Source Intern', organization: 'GirlScript Summer of Code', dates: 'March 2026 – July 2026', location: 'Remote, India', details: ['Resolved issues and implemented features in open-source web projects.', 'Worked with Git/GitHub pull requests, merges and conflict resolution in distributed teams.'], stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Spring Boot', 'MySQL'] },
  { role: 'Campus Ambassador', organization: 'GirlScript Summer of Code', dates: '2026', location: 'India', details: ['Selected as a campus ambassador for GirlScript Summer of Code.'], stack: [] },
]

export const achievements = [
  'Developed KarmaTute, an AI-driven competency engine for Smart India Hackathon 2026 using Mistral AI / Google GenAI with a Java and Spring Boot backend.',
  'Solved 300+ DSA problems across LeetCode, Codeforces and GeeksforGeeks.',
  'LeetCode: 170+ problems solved; currently targeting a 1400+ contest rating.',
  'Codeforces: 900 rating; currently targeting a 1200+ contest rating.',
  'Selected as an Open Source Contributor and Campus Ambassador at GirlScript Summer of Code 2026.',
  'Built and deployed 5 full-stack projects with 260+ GitHub contributions in 2025.',
]

export const projects = [
  {
    index: '01',
    name: 'We-Live: Happening and Aid',
    type: 'Real-time emergency intelligence platform',
    description: 'Geo-fenced SOS routing, live proximity alerts and community chat, plus AI emergency triage and supply recommendations. REST APIs track shelter capacity and resource hubs across low-bandwidth networks.',
    stack: ['ReactJS', 'Node.js', 'PostgreSQL', 'Google Gemini API', 'Leaflet API', 'Socket.io'],
  },
  {
    index: '02',
    name: 'Authora Library Management System',
    type: 'Library management backend',
    description: 'Layered REST backend for library workflows, catalog search, secure CRUD operations, inventory tracking and member allocation.',
    stack: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'PostgreSQL', 'REST API'],
  },
  {
    index: '03',
    name: 'SankhyaSetu',
    type: 'AI-powered learning platform',
    description: 'A competency-focused platform designed to connect learning journeys with measurable growth.',
    stack: ['AI / ML', 'React', 'Backend systems'],
  },
  {
    index: '04',
    name: 'Putzen',
    type: 'CleanTech full-stack platform',
    description: 'A full-stack product exploring how software can support cleaner, more connected communities.',
    stack: ['React', 'Spring Boot', 'PostgreSQL'],
  },
  {
    index: '05',
    name: 'KarmaTute',
    type: "SIH '26 / Hackathon Project",
    description: 'AI-driven competency engine for Smart India Hackathon 2026, combining personalized skill development with a Java and Spring Boot backend.',
    stack: ['Mistral AI', 'Google GenAI', 'Java', 'Spring Boot', 'React', 'Competency Engine'],
    href: 'https://github.com/VardhanVersion2/KarmaTute---AI-Personalized-Competency-based-Platform-for-Skill-development',
  },
] as const
