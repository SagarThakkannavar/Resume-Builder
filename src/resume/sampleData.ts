import type { ResumeData } from './types';

export const sampleResume: ResumeData = {
  personal: {
    name: 'Jordan Chen',
    email: 'jordan.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Software engineer with 5+ years building scalable web applications. Focus on clean architecture, performance, and developer experience.',
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'B.S.',
      field: 'Computer Science',
      start: '2015',
      end: '2019',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      start: '2021',
      end: 'Present',
      description: 'Lead development of customer-facing platform. Improved API latency by 40%.',
    },
    {
      id: 'exp-2',
      company: 'Startup Inc',
      role: 'Software Engineer',
      start: '2019',
      end: '2021',
      description: 'Built core services and internal tools. Mentored 2 junior engineers.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Open Source CLI',
      description: 'Developer tool with 10k+ monthly downloads. TypeScript, Node.js.',
      techStack: ['TypeScript', 'Node.js', 'Git'],
      liveUrl: '',
      githubUrl: 'https://github.com/example/cli',
    },
  ],
  skills: {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'System Design'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker', 'AWS'],
  },
  links: {
    github: 'https://github.com/jordanchen',
    linkedin: 'https://linkedin.com/in/jordanchen',
  },
};

export const SUGGESTED_SKILLS: ResumeData['skills'] = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
};
