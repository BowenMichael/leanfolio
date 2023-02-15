const about = {
  // all the properties are optional - can be left empty or deleted
  // each element in the description array is a paragraph
  name: 'Michael Bowen',
  role: 'Game Programmer',
  company: 'Champlain College \'23',
  description: [
    'Graduating in May 2023 with a focus in game CI/CD, extended reality, physics programming.',
  ],
  img : 'https://michael-bowen.com/michaelSmaller.png',
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
      'Dead pedal is a third person driving action game.',
      'Personal Contributions: \nDrove development of custom car physics that can interface with AI, Audio systems, and Blueprints. Setup automated tools to support continuous integration practices with Google Cloud and Jenkins. Supported the team by documenting best practices to interact with Unreal Engine and Git.',
    ],
    stack: ['Unreal 5', 'Git', 'Jenkins', 'Google Cloud', 'Lead Programmer'],
    livePreview: 'https://larnio.itch.io/dead-pedal',
  },
  {
    thumbnail: 'https://michael-bowen.com/images/turbo-hybrid-cube.gif',
    name: 'Turbo-Hybrid Game Engine',
    description: [
      'The Turbo Hybrid Game Engine was created to understand what it takes to build a game engine from scratch and appreciate some core systems. Structure of Arrays component systems, Data driven game objects and 3D rendering were key design goals for this engine.',
    ],
    stack: ['C++', 'SDL2', 'bgfx' ],
    livePreview: 'https://docs.google.com/presentation/d/1pGFhkVGUu52NhdT-uWjjTgoqjUhPl1Ncy2UQMJzD5Ig/edit?usp=sharing',
  },
  {
    thumbnail: 'https://michael-bowen.com/spartakids-thumbnail.png',
    name: 'Spartakids',
    description: [
      'Spartakids was developer as a part of the 2022 Ubisoft Game Lab Competition. The theme for the year was \'Student XP\'. Our interpretation of the theme lead us to a co-op boss fighter about the magic of play.',
    ],
    stack: ['Unity', 'C#', 'Timeline', 'RTPC'],
    livePreview: 'https://larnio.itch.io/spartakids',
  },
  {
    thumbnail: 'https://michael-bowen.com/well-being-thumbnail.png',
    name: 'Olfactory VR Meditation',
    description: [
      'Worked with Champlain College and Ion Technologies to integrate the Ion scent device into an immersive VR meditation experience. Developed for a study on how immersive technologies can be used to enhance well being',
    ],
    stack: ['Pico Neo 2', 'Unity Interaction Toolkit', 'Android', 'Ion Scen'],
    livePreview: 'https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/view?usp=sharing',
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
