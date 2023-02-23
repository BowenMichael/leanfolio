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

const ProjectsData = [
  // projects can be added and removed
  // if there are no projects, Projects section won't show up
  // each element in the description array is a paragraph
  {
    href : 'dead-pedal',
    thumbnail: 'https://michael-bowen.com/DeadPedal-2.png',
    name: 'Dead Pedal',
    description: [
      'Dead pedal is a third person driving action game.',
      'Built in Unreal Engine 5 Dead Pedal is the culmination of 4 year of cross-disciplinary skills and study. On a team of 12 and under development for the 2022 academic year Dead Pedal brings together all aspects of game development.',
      'Planned Steam Release 2023.'
    ],
    focus:[
        'As Lead Programmer it is important that I have an understanding of all core programming systems and can communicate them to the rest of the team',
        'I built pipelines that made showing off the build as simple as entering a url into a webpage',
        'Created a car model from scratch to give a high degree of control to the design team',
    ],
    stack: ['Unreal 5', 'Git', 'Jenkins', 'Google Cloud', 'Lead Programmer'],
    details: [
      'Drove development of custom car physics that can interface with AI, Audio systems, and Blueprints. Setup automated tools to support continuous integration practices with Google Cloud and Jenkins. Supported the team by documenting best practices to interact with Unreal Engine and Git.',

    ],
    livePreview: 'https://larnio.itch.io/dead-pedal',
  },
  {
    href : 'turbo-hybrid',
    thumbnail: 'https://michael-bowen.com/images/turbo-hybrid-cube.gif',
    name: 'Turbo-Hybrid Game Engine',
    description: [
      'The Turbo Hybrid Game Engine was created to understand what it takes to build a game engine from scratch and appreciate some core systems. Structure of Arrays component systems, Data driven game objects and 3D rendering were key design goals for this engine.',
    ],
    stack: ['C++', 'SDL2', 'bgfx' ],
    details: [''],
    sourceCode: 'https://github.com/BowenMichael/Turbo-Hybrid-Game-Engine',
    livePreview: 'https://docs.google.com/presentation/d/1pGFhkVGUu52NhdT-uWjjTgoqjUhPl1Ncy2UQMJzD5Ig/edit?usp=sharing',
  },
  {
    href : 'spartakids',
    thumbnail: 'https://michael-bowen.com/spartakids-thumbnail.png',
    name: 'Spartakids',
    description: [
      'Spartakids was developer as a part of the 2022 Ubisoft Game Lab Competition. The theme for the year was \'Student XP\'. Our interpretation of the theme lead us to a co-op boss fighter about the magic of play.',
    ],
    stack: ['Unity', 'C#', 'Timeline', 'RTPC'],
    details: [''],
    livePreview: 'https://larnio.itch.io/spartakids',
  },
  {
    href : 'olfactory-VR',
    thumbnail: 'https://michael-bowen.com/well-being-thumbnail.png',
    name: 'Olfactory VR Meditation',
    description: [
      'Worked with Champlain College and Ion Technologies to integrate the Ion scent device into an immersive VR meditation experience. Developed for a study on how immersive technologies can be used to enhance well being',
    ],
    stack: ['Pico Neo 2', 'Unity Interaction Toolkit', 'Android', 'Ion Scen'],
    details: [''],
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
  email: 'https://www.linkedin.com/in/bowen-michael/',
}

export { about, ProjectsData, skills, contact }
