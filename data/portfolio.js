const about = {
  // all the properties are optional - can be left empty or deleted
  // each element in the description array is a paragraph
  name: 'Michael Bowen',
  role: 'Game Programmer',
  company: 'Champlain College '23',
  description: [
    'Graduating in May 2023 I have focused on Game CI/CD, XR, Physics Programming.',
  ],
  resume: 'michael-bowen.com/resume',
  social: {
    linkedin: 'https://www.linkedin.com/in/bowen-michael/',
    github: 'https://github.com/BowenMichael',
  },
  greetingEmoji: '👋',
}

const projects = [
  // projects can be added and removed
  // if there are no projects, Projects section won't show up
  // each element in the description array is a paragraph
  {
    thumbnail: 'https://michael-bowen.com/DeadPedal-2.png',
    name: 'Dead Pedal',
    description: [
      'Dead pedal is a third person driving action game. Personal Contributions: Drove development of custom car physics that can interface with AI, Audio systems, and Blueprints. Setup automated tools to support continuous integration practices with Google Cloud and Jenkins. Supported the team by documenting best practices to interact with Unreal Engine and Git.',
    ],
    stack: ['Lead Programmer','Unreal 5', 'CI/CD', 'Google Cloud'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    thumbnail: 'images/placeholder-image.jpeg',
    name: 'Project 2',
    description: [
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    ],
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    thumbnail: 'images/placeholder-image.jpeg',
    name: 'Project 3',
    description: [
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    ],
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    thumbnail: 'images/placeholder-image.jpeg',
    name: 'Project 4',
    description: [
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    ],
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'C++',
  'C#',
  'TypeScript',
  'Unity',
  'Unreal 5',
  'Google Cloud',
  'Jenkins',
  'React',
  'Git',
  'GitHub Actions',
  'CI/CD',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'michael@thebowenfamily.com',
}

export { about, projects, skills, contact }
