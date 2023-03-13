import {CopyBlock, dracula} from "react-code-blocks";

const mainRenderFunction = '' +
      '    /*\n' +
      '        Set up view projection matrix\n' +
      '    */\n' +
      '\n' +
      '    // Look at the first gameObject\n' +
      '    const glm::vec3 at = gameObjects[0]->\n' +
      '                         \t\t   GetTransform()->\n' +
      '                         \t\t   GetLocation().\n' +
      '                         \t\t   Vec3();\n\n' +
      '    // location of the eye/camera\n' +
      '    const glm::vec3 eye = { 0.0f, 0.0f, -5.0f };\n\n' +
      '    // reference for up vector\n' +
      '    const glm::vec3 up = { 0.0f, 1.0f, 0.0f };\n\n' +
      '    // view matrix is created\n' +
      '    glm::mat4x4 view = glm::lookAt(eye, at, up);\n' +
      '\n' +
      '    // create projection matrix using a perspective projection\n' +
      '    glm::mat4x4 proj = glm::perspective\n' +
      '                           (80.0f, //FOV\n' +
      '                            float(WIDTH) / float(HEIGHT), //Aspect Ratio\n' +
      '                            0.1f, //Near Clipping plane\n' +
      '                            100.0f); //Far Clipping plane\n' +
      '\n' +
      '    // set view and projection matrix\n' +
      '    bgfx::setViewTransform(0, &view, &proj);\n' +
      '\n' +
      '    /*\n' +
      '        Render Cube components\n' +
      '    */\n' +
      '\n' +
      '    TurboHybrid::ComponentSystem::GetComponentSystem()->\n' +
      '                            renderCubes(engine->frame);\n' +
      '\n' +
      '    /*\n' +
      '        Render next frame\n' +
      '    */\n' +
      '' +
      '    bgfx::frame();\n\n';

const cubeRenderFunction = 'void TurboHybrid::CubeRenderer::render(const float& deltatime)\n' +
      '{\n' +
      '\tassert(m_vbh.idx != 0 || m_ibh.idx != 0 || m_program.idx != 0);\n' +
      '\t//set up render state for object\n' +
      '\tuint64_t state = 0\n' +
      '\t\t| (BGFX_STATE_WRITE_R)\n' +
      '\t\t| (BGFX_STATE_WRITE_G)\n' +
      '\t\t| (BGFX_STATE_WRITE_B)\n' +
      '\t\t| (BGFX_STATE_WRITE_A)\n' +
      '\t\t| BGFX_STATE_WRITE_Z\n' +
      '\t\t| BGFX_STATE_DEPTH_TEST_LESS\n' +
      '\t\t| BGFX_STATE_CULL_CW\n' +
      '\t\t| BGFX_STATE_MSAA\n' +
      '\t\t| UINT64_C(0)\n' +
      '\t\t;\n' +
      '\n' +
      '\t// init with no translation\n' +
      '\tglm::mat4x4 model = glm::mat4(1.0f);\n\n' +
      '\t// Set Position to the transform component position\n' +
      '\tVector3 pos3 = gameObject->GetTransform()->GetLocation();\n' +
      '\tglm::vec3 pos = glm::vec3(pos3.x, pos3.y, pos3.z);\n' +
      '\tmodel = glm::translate(model, pos);\n\n' +
      '\t// Set rotation\n' +
      '\tfloat rotationDirection = 100.0f;\n' +
      '\tif (gameObject->GetPlayerController() != nullptr) {\n' +
      '\t\trotationDirection *= -1; // If player controlled invert rotation\n' +
      '\t}\n' +
      '\tmodel = glm::rotate(\n' +
      '\t\tmodel, //Matrix\n' +
      '\t\tdeltatime / rotationDirection, //Rotation amount\n' +
      '\t\tglm::vec3(1.0f, 1.0f, 0.0f)); //axis of rotation\n' +
      '\tbgfx::setTransform(&model);\n' +
      '\n' +
      '\t// Set Color uniform to pass information to the shader\n' +
      '\tfloat color[4] = { m_color.r, m_color.g, m_color.b, m_color.a };\n' +
      '\tbgfx::setUniform(m_uniform, color);\n' +
      '\n' +
      '\t// Set Vertex and Index Buffers\n' +
      '\tbgfx::setVertexBuffer(0, m_vbh); \n' +
      '\tbgfx::setIndexBuffer(m_ibh);\n' +
      '\n' +
      '\t// Set render states.\n' +
      '\tbgfx::setState(state); //Each object has unique state\n' +
      '\n' +
      '\t//Submit program for rendering\n' +
      '\tbgfx::submit(0, m_program);\n' +
      '}';


const about = {
  // all the properties are optional - can be left empty or deleted
  // each element in the description array is a paragraph
  name: 'Michael Bowen',
  role: 'Game Programmer',
  description: [
    'Graduating in May 2023 with a focus in game CI/CD, physics, and VR programming.',
  ],
  img : 'https://michael-bowen.com/michaelSmaller.png',
  resume: '/Resumes/Michael_Bowen_Resume_03-13-23.pdf',
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
      'Built in Unreal Engine 5 Dead Pedal is the culmination of 4 year of cross-disciplinary skills and study. On a team of 12 and under development for the 2022 academic year.',
      'Planned Steam Release 2023.'
    ],
    stack: ['Unreal 5', 'Git', 'Jenkins', 'Google Cloud', 'Lead Programmer'],
    details: [        
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/hmdd7PEL4Rg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '### My Focus' +
      '\n* As Lead Programmer it is important that I have an understanding of all core programming systems and can ' +
      'communicate them to the rest of the team' +
      '\n* I built pipelines that made showing off the build as simple as entering a url into a webpage ' +
      '\n* Created a car model from scratch to give a high degree of control to the design team',
      '### Overview' +
      '\nDrove development of custom car physics that can interface with AI, Audio systems, and Blueprints. Setup ' +
      'automated tools to support continuous integration practices with Google Cloud and Jenkins. Supported the team ' +
      'by documenting best practices to interact with Unreal Engine and Git.',
      '### Google Cloud' +
      '\nUtilizing Jenkins and Google Cloud I created an automated build server. This saved hours of programming ' +
      'time and allowed us to show off the build in less than 60 seconds. By integrating an RSS change log with discord, ' +
      'Jenkins build webhooks, and google bucket integration allowed dowload links to be displayed direcly in discord. ' +
      'This also make it very clear which commits were in which build because the change-log is displayed right next to the build.' +
      '\n\n ',
      '<div className="project__image-container"><img className="project__image" src="/projects/dead-pedal/jenkins-build-success.PNG" alt="Markdown Monster icon" width="50%"  /></div>',
      '<div className="project__image-container"><img className="project__image" src="/projects/dead-pedal/change-log.PNG" alt="Markdown Monster icon" width="100%"  /></div>',
        '',
        
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
    details: ['' +
    '### Personal Contributions:\n' +
    '\n' +
    '* Implemented emscripten and windows build systems using SDL and C++.\n' +
    '* Utilized JSON file format for reading game object and component data.\n' +
    '* Worked on integrating bgfx 3D rendering library into the engine and built out a cube renderer component\n',
    '### Overview\n' +
    'In a world of game engines and package managers, it is easy to become detached from the core processes that make up modern software. For game developers, this comes in the form of software like Unity, Unreal Engine, Gamemaker, and Godot. Especially in 3D software, the process of rendering is taken for granted. Even the idea of creating an application window can be a concept that is hard to grasp. This was true for me before starting to build this engine. I have been using PCs since Windows XP yet I had no intuition about how to create a window.', 
      'The Tubro Hybrid Game engine was created to teach myself how to build an application from scratch.\n' +
      'The goals for this engine:\n' +
      '\n' +
      '* Build a game engine application from scratch\n' +
      '* Compile to multiple platforms\n' +
      '* Data loaded from JSON\n' +
      '* Render 3D graphics',
      '### 3D Graphics\n',
      'The main chunk of this project was the 3D Graphics rendering. The project was completed as a part of the Champlain College Game Programming curriculum. But when it came to how we implemented Serialization and what we did for our final project approaches differed. I worked with [StevenAnnunziato](https://github.com/StevenAnnunziato) to develop our 3D graphics solution. We decided to implement bgfx as an intermediate graphics library. This allowed us to focus on the concepts of 3D rendering rather than getting stuck on lower ideas. This also allowed me to focus on integrating it into the engine while Steve was able to integrate the shaders.\n' +
      '\n',
      '#### Creating a render function\n',
      '![BOX](https://michael-bowen.com/images/Cube-rendering.png)',
      'The first thing I want to look at is the render function. Inside my main loop, I am creating two matrices that I am going to pass into bgfx to define my 3D space. These matrices are the view matrix and projection matrix. The View matrix defines my camera while the projection matrix determines the type of camera. the two most common types are perspective and orthographic. Here I am using perspective. This means I am defining a perspective camera.',
      '#### [glm::Namespace](https://github.com/g-truc/glm)',
      'GLM is a math library that we needed to use on windows because the built-in math library inside of bx was not suitable for use on windows. GLM is an open source header-only math library. GLM is based on the OpenGL specification which makes it perfect for our use.',
      (<CopyBlock text={mainRenderFunction} language={"cpp"} wrapLines={true} theme={dracula}/> ),
      '### Rendering Cube render components',
      'The Turbo hybrid engine uses a component bases structure of arrays. This means that all the components are stored on the stack right next to each other. By looping through an array of CubeRenderer components I compute specific actions. Each CubeRenderer component references the same vertex and index buffers that define the cube. They also are using the same shader program.',
      (<CopyBlock text={cubeRenderFunction} language={"cpp"} wrapLines={true} theme={dracula}/> ),
      '![Cubes](https://michael-bowen.com/images/turbo-hybrid-alternating-rotate.gif)',
      'This is what renders each cube component separately. Adding things like mesh information and setting different shaders would just be a matter of changing out the buffers and the program. Adding additional components for things like collision would be the first step to making a more versatile game engine.\n' +
      '\n',
      '### Conclusion\n',
      'I learned a lot from developing this engine. It was really satifying to see all the steps of the process from window creation to rendering full 3D images. Bgfx was a great option for developing my own 3D components while maintining control of the graphics pipline while interfacing with your graphics backend of choice. It also supports various backends and platforms which makes it a great option for games. This project is only scratching the surface but I am really glad to of had the experience.',
      'If your interested in the codebase it is on my GitHub and if you have any questions feel to shoot me a message on linkedin',

      '' +
    ''],
    sourceCode: 'https://github.com/BowenMichael/Turbo-Hybrid-Game-Engine',
    livePreview: 'https://docs.google.com/presentation/d/1pGFhkVGUu52NhdT-uWjjTgoqjUhPl1Ncy2UQMJzD5Ig/edit?usp=sharing',
  },
  {
    href : 'hand-tracking-vr',
    thumbnail: '/images/hand-tracking/thumbnail.png',
    name: 'Oculus Hand Tracking Demo',
    description: [
      'Oculus Hand tracking demo. This game was created on a team of 4. I was responsible for delivering hand tracking integration into the game. Took spell systems and adapted them for Oculus VR hand controls. This included Input poses, adapted throwing to a shoot, and alternate locomotion.',
    ],
    stack: ['VR', 'Unity', 'Oculus Quest 2', 'Oculus Hand Tracking', 'Unity VR', 'Hand Pose inputs', 'Hand tracking design'],
    details: ['### Demo Video',
    '<iframe src="https://drive.google.com/file/d/14NW3659T9bssBLZm8n4agDkqIjrP9HCC/preview" width="100%" height="360" allow="autoplay"></iframe>',
    ''],
    livePreview: 'https://drive.google.com/file/d/14NW3659T9bssBLZm8n4agDkqIjrP9HCC/view?usp=sharing',
  },

  {
    href : 'olfactory-VR',
    thumbnail: 'https://michael-bowen.com/well-being-thumbnail.png',
    name: 'Olfactory VR Meditation',
    description: [
      'Worked with Ion Technologies to integrate the Ion scent device into an immersive VR meditation experience. Developed for a study on how immersive technologies can be used to enhance well being',
      
    ],
    stack: ['Pico Neo 2', 'Unity Interaction Toolkit', 'Android', 'Ion Scen'],
    details: ['### Live Demo',
      '<iframe src="https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/preview" width="100%" height="480" allow="autoplay"></iframe>',],
    livePreview: 'https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/view?usp=sharing',
  },
  {
    href : 'boat-combat',
    thumbnail: '/images/boat-combat/thumbnail.png',
    name: 'Boat Combat',
    description: [
      'A mobile networked boat combat game about taking over points in the arena.\n ' +
      'Using accelerometer or touch controls the player takes on an opponent in a 1v1 experience. ' +
      'This game was an opportunity to develop skills in mobile and networked development.',
    ],
    stack: ['Mobile', 'Unity', 'Networking', '1v1', 'Accelerometer', 'Objectives', 'Gameplay'],
    details: ['### Demo Video',
      '<iframe src="https://drive.google.com/file/d/16AJ3fHggciywTfD9s9z9kTts-QXjJOT4/preview" width="100%" height="360" allow="autoplay"></iframe>',
      ''],
    livePreview: 'https://drive.google.com/file/d/16AJ3fHggciywTfD9s9z9kTts-QXjJOT4/view?usp=sharing',
  },
  {
    href : 'spartakids',
    thumbnail: 'https://michael-bowen.com/spartakids-thumbnail.png',
    name: 'Spartakids',
    description: [
      'Spartakids was developer as a part of the 2022 Ubisoft Game Lab Competition. The theme for the year was \'Student XP\'. Our interpretation of the theme lead us to a co-op boss fighter about the magic of play.',
    ],
    stack: ['Unity', 'Networking', 'UI', 'Networked Events', 'Gameplay'],
    details: ['<div className="project__image-container"><img className="project__image about__image" src="https://michael-bowen.com/spartakids-logo-2.png" alt="Markdown Monster icon" width="100%"  /></div>',
    'Spartakids is a co-op third-person boss fighting game developed for the 2022 Ubisoft Game Lab Competition. The game takes on the student experience as seen through the lens of play and imagination. You and your friend take on your imaginary monster during recess. Fight with your marker sword or compass bow to take down Spike. Make sure when the floor turns to lava to take to higher ground on top of the jungle gym. You and your friend trade weapons on top of the dome so make sure that you trading your perks so they are most effective.\n' +
    '\n',
    '### [Gameplay Video](https://www.youtube.com/watch?v=xEEImDZ5lIs)\n',
    '### [Itch.io](https://larnio.itch.io/spartakids)\n',
    /*'### Details\n',
    '* 10 Weeks from January 27-April 7th 2022 ~10h per week\n' +
    '* Team Size: 8\n' +
    '* My Role: Network/UI/Gameplay programmer\n' +
    '* Game Engine: Unity3D Network Architecture: Photon Pun v1\n',
    '### Our game\n',
    'As stated above SpartaKids is a co-op boss fighting game where you and a partner play out your fantasy of fighting a imaginary creature. This game required many interconnected components and systems to convey the context and have a compelling experience. They include:\n' +
    '\n' +
    '* Networked Boss AI\n' +
    '* player weapons systems and general CCC\n' +
    '* Perks/UI systems\n' +
    '* Networked systems and animations\n' +
    '* cinematics/particles to convey context\n',
    '### Personal Contriubtion\n',
    'I started the project as a gameplay programmer focusing on CCC. It was quickly identified that Networking was going to be vital for the co-op experience so I shifted my focus during the project to network gameplay elements. Aswell as timelines, perks, and UI.\n' +
    '\n' +
    'What I worked on:\n' +
    '\n' +
    '* Networking\n' +
    '* CCC\n' +
    '* Implementing art and animations\n' +
    '* Perks and Perk sharing menu functionality\n' +
    '* Perk UI\n' +
    'The networked areas included:\n' +
    '\n' +
    '* Player and boss animations\n' +
    '* Player and boss attacks\n' +
    '* Sharing perks and the perk menus\n' +
    '* Perk particle effects\n',
    '### The Competition\n',
    'The Ubisoft Game Lab competition is run by Ubisoft Montreal and invites Schools from the US and Canada to compete for scholarship prizes through a 10-week game jam. This year 22 schools competed to create games surrounding the theme "student experience". The game had to:\n' +
    '\n' +
    '* Relate to the Student Experience in some way.\n' +
    '* Be a networked game for 1-8 players\n' +
    '* Contain some element of AI\n' +
    '* Contain some elements of customization to alter the experience for each player.\n',
    '### Review\n',
    'This project contained a lot of scope for a 10-week prototype. The networking, animations and general game feel were all areas that could have taken 10 weeks on there own. In this article I go into the struggles of learning networking while under specific time constraints, trying to work the student experience into an existing game idea, and reflecting on the competition. Working on a project like this without knowing networking presented some architectural pitfalls that were made obvious when data had to be sent over a network. Simple attacks and moving things across an inventory needed to be clear and serializable to communicate and display world events across a network.'*/],
    livePreview: 'https://larnio.itch.io/spartakids',
  },
  

]

const skills = [
    // skills can be added or removed
    // if there are no skills, Skills section won't show up
    'C++',
    'C#',
    'Unity',
    'Unreal Engine',
    'Git',
    'CI/CD',
    'Google Cloud',
    'Jenkins',
    'GitHub Actions',
    'Car AI',
    'VR',
    'OpenXR',
    'Oculus Hand-Tracking',
    'SDL2',
    'bgfx',
    'Next.js',
    'TypeScript',
    'React',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'https://www.linkedin.com/in/bowen-michael/',
}

export { about, ProjectsData, skills, contact }