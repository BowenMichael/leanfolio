import {CopyBlock, dracula} from "react-code-blocks";

// region rendered functions

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

const BP_Mission = '\n  ' +
    '\t/*\n' +
    '\t\tBP_Mission.h\n' +
    '\t*/\n' +
    '\tUFUNCTION(BlueprintCallable)\n' +
    '\tvirtual void MissionComplete();\n' +
    '\t\n' +
    '\tUFUNCTION(BlueprintCallable)\n' +
    '\tvirtual void MissionStart();\n' +
    '\t\n' +
    '\t/*\n' +
    '\t\t BP_Mission.cpp\n' +
    '\t*/\n' +
    '\tvoid ABP_Mission::MissionComplete()\n' +
    '\t{\n' +
    '\t\t// Flag Mission as complete\n' +
    '\t\tmissionComplete = true;             \n\n'+
    '\t\t// Callback to Mission manager\n' +
    '\t\tmdOnMissionComplete.Broadcast();    \n\n'+
    '\t\t// Unique Mission Callback\n' +
    '\t\tOnMissionComplete();                \n\n'+
    '\t}\n' +
    '\t\n' +
    '\tvoid ABP_Mission::MissionStart()\n' +
    '\t{\n' +
    '\t\t// Flag Mission as not complete\n' +
    '\t\tmissionComplete = false;            \n\n'+
    '\t\t// Callback to Mission manager\n' + 
    '\t\tmdOnMissionStart.Broadcast();       \n\n'+
    '\t\t// Unique Mission Callback\n' +     
    '\t\tOnMissionStart();                   \n\n'+
    '\t}';

const BP_MissionManager = '\n  ' +
    '\t/*\n' +
    '\t\tBP_MissionManager.cpp\n' +
    '\t*/\n' +
    '\tvoid AMisisonManager::BindMissionToActive(\n' +
    '\t\tABP_Mission* newMission)\n' +
    '\t{\n' +
    '\t\t// Make sure newMission is active\n' +
    '\t\tif (newMission == nullptr) {\n' +
    '\t\t\tUE_LOG(LogTemp,\n' +
    '\t\t\t\tWarning,\n' +
    '\t\t\t\tTEXT("Failed to bind Mission: Mission active"));\n' +
    '\t\t\treturn;\n' +
    '\t\t}\n' +
    '\t\n' +
    '\t\t// Set Active mission\n' +
    '\t\tactiveMission = newMission;\n' +
    '\t\t\n' +
    '\t\t// Blueprint implementable callback\n' +
    '\t\tactiveMission->OnMissionBind((AMisisonManager*)this);\n' +
    '\t\n' +
    '\t\t// Bind Active Mission Delegates\n' +
    '\t\tactiveMission->mdOnMissionComplete.AddDynamic(\n' +
    '\t\t\tthis, &AMisisonManager::OnMissionComplete);\n' +
    '\t\tactiveMission->mdOnMissionStart.AddDynamic(\n' +
    '\t\t\tthis, &AMisisonManager::OnMissionStart);\n' +
    '\t\n' +
    '\t}\n' +
    '\t\n' +
    '\tvoid AMisisonManager::UnbindActiveMission()\n' +
    '\t{\n' +
    '\t\tif (activeMission == nullptr) return; // No Mission to unbind\n' +
    '\t\n' +
    '\t\t// Unbind Mission Delegates\n' +
    '\t\tactiveMission->mdOnMissionComplete.RemoveDynamic(\n' +
    '\t\t\tthis, &AMisisonManager::OnMissionComplete);\n' +
    '\t\tactiveMission->mdOnMissionStart.RemoveDynamic(\n' +
    '\t\t\tthis, &AMisisonManager::OnMissionStart);\n' +
    '\t\n' +
    '\t\t// Blueprint implementable callback\n' +
    '\t\tactiveMission->OnMissionUnbind((AMisisonManager*)this);\n' +
    '\t\n' +
    '\t\t// Set Active Mission to null\n' +
    '\t\tactiveMission = nullptr;\n' +
    '\t}'

const JSONData= '' +
    '{\n' +
    '\t"GameObjects" :\n' +
    '\t\t[\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"TRAN" : [0, 0,5 ],\n' +
    '\t\t\t\t"CUBE" : {\n' +
    '\t\t\t\t\t"Color": [1, 1, 1, 1]\n' +
    '\t\t\t\t},\n' +
    '\t\t\t\t"PLRC" : {\n' +
    '\t\t\t\t\t"Speed" : [0.1]\n' +
    '\t\t\t\t}\n' +
    '\t\t\t},\n' +
    '\t\t\t{\n' +
    '\t\t\t\t"TRAN" : [4, 0, 0],\n' +
    '\t\t\t\t"CUBE" : {\n' +
    '\t\t\t\t\t"Color": [1, 0, 1, 1]\n' +
    '\t\t\t\t}\n' +
    '\t\t\t}\n' +
    '\t\t]\n' +
    '}'

// endregion

const about = {
  name: 'Michael Bowen',
  role: 'Robotics Programmer',
  description: [
    'I design and build robotic systems that move through space and interact with people — safely, precisely, and efficiently.',

    'I began my career in video game development, where I studied system design, interaction, and physics-based motion. Today, I apply those skills to real-world automation as a Junior Software Engineer at Rigorous Technology.',

    'My work includes programming FANUC CRX and M-Series robots, developing digital twin simulations in Roboguide, and designing IO-driven state machines for factory automation. I also implement safety protocols and vision systems using tools like OpenCV and Ethernet/IP.',

    'Games taught me how to think in systems. Robotics lets me build them for the physical world.'
  ],
  img : '/images/profile/rigorousmichael.avif',
  resume: '/Resumes/250720_Michael_Bowen_Resume.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/bowen-michael/',
    github: 'https://github.com/BowenMichael',
  },
  greetingEmoji: '👋',
};

const WorkData = [
  {
    href : 'bob',
    thumbnail: '/images/bob.webp',
    name: 'The RIG Palletizer',
    description: [
      'At Rigorous Technology, I work on BOB, an automated palletizing system. I program FANUC robots, create digital twin simulations in Roboguide, and design IO-based state machines for precise motion control. My work blends robotics, safety systems, and real-time feedback to enable efficient automation on the factory floor.'
    ],
    stack: [
      'FANUC Robotics',
      'Roboguide',
      'OpenCV',

      'Ethernet/IP',
      'C++',
      'TypeScript'
    ],
    details: [
      '### [Vision Talk](https://www.linkedin.com/posts/rigoroustech_what-a-night-rigorous-technology-was-thrilled-activity-7308485718127882240-jMRr?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC4wvrgB82pARQ6iQb94ZHXBn3dNc3iwqQ0)',
      '<img src="/images/hardware-meetup.jpg" width="504"></img>',
      "I recieved the opportunity to talk at the Burlington Hardware Meetup. Rigourous was the host and I talked about our vision system. How we pick out a box from the end of the line and adjust the robot motion in real time.",
      '### Demo',
      '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7245518315421339649 " height="775" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>',
      '### Rigorous robots in action',
      '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7298402302116134913?compact=1" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>'
    ],
    livePreview: 'https://www.rigorous.co/',
  }
];

const ProjectsData = [
  // projects can be added and removed
  // if there are no projects, Projects section won't show up
  // each element in the description array is a paragraph
  {
    href: 'dead-pedal',
    thumbnail: '/projects/dead-pedal/DeadPedal-2.png',
    name: 'Dead Pedal',
    description: [
      "As Lead Programmer, I maintained an Unreal CI/CD pipeline, iterated on our car physics, and established the feature timeline for the programming team."
    ],
    stack: ['Lead Programmer', 'UE5', 'Git', 'Jenkins', 'Google Cloud'],
    details: [
      '<div><a href="#Google">Google Cloud</a><br/> <a href="#Missions">Mission System</a><br/> <a href="#Learn">Learn More</a><div/>',
      '### The Game',
      'In Dead Pedal, you play as John D. Pedal in a post-apocalyptic world, fending off ruthless marauders and mutant beasts. Upgrade your car with new weapons and customizations by taking out various factions. When you’re ready, take on THE WORM and bring peace back to the Mojave.',
      'Planned Steam release: May 2023.',
      '<iframe width="100%" height="315" src="https://www.youtube.com/embed/hmdd7PEL4Rg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '### Timeline',
      "Development began in September 2022. I worked with a cross-disciplinary team to create Dead Pedal for the Champlain College Game Studio. We chose Unreal Engine 5 to take advantage of Chaos Physics, World Partition, and its rendering pipeline.",
      '<div id="Google"/>',
      '## Technical Details',
      '### Google Cloud',
      'We identified build iteration speed as a risk. To mitigate this, we created a CI/CD build server that made builds more accessible and consistent. This ensured the team had confidence in the current state of the game every week.',
      '#### Overview',
      'The pipeline consisted of:',
      '- Git repository',
      '- Jenkins server',
      '- Google Cloud build agents',
      '- Google Cloud buckets',
      '- Team notifications via Discord',
      '<img class="project__image" src="/projects/dead-pedal/build-pipeline-git.PNG" width="100%" />',
      '#### Jenkins Server',
      'The Jenkins server managed builds, authentication, and artifacts. Anyone on the team could trigger a build, removing bottlenecks.',
      '<img class="project__image" src="/projects/dead-pedal/Jenkins.PNG" width="100%" />',
      '#### Build Agents & Buckets',
      'Builds were processed by Google Cloud VMs and uploaded to Cloud Buckets for quick access. The team received notifications once a build was ready.',
      '<img class="project__image" src="/projects/dead-pedal/Jenkins-notification.PNG" width="100%" />',
      '### Conclusion',
      'This build system improved confidence and iteration speed and opened the door for future automation like playtesting and analytics.',
      '<div id="Missions"/>',
      '### Mission System',
      'We designed a scalable, modular mission system using C++ and Blueprint. It allowed designers to create open-world missions without heavy technical support.',
      '#### Tutorials',
      'I created video walkthroughs to document the setup of mission blueprints and triggers:',
      '<div className={\"projects__grid\"\}\>' + 
        '<a href="https://drive.google.com/file/d/1kIpO7VjVfOaTn34qGA2ZcYQWsIKimLJz/view?usp=sharing">Part 1: Mission Manager Overview</a\>' +
        '<a href="https://drive.google.com/file/d/1TV6QAZoXz2dYhz-RzTvbBmMEODNU4yZz/view?usp=sharing">Part 2: Trigger System Overview</a\>' +
        '<a href="https://drive.google.com/file/d/1gxpQQFnSTaQlMyN9ASqstNcU3IwE7oYW/view?usp=share_link">Part 3: Setting Up Mission Targets</a\>' +
        '<a href="https://drive.google.com/file/d/1e_cskuIvzglVsWn1T-Ttm-ggGp4tnQUI/view?usp=share_link">Part 4: AI Patrol Setup</a\>' +
      '</div\>',
      '#### Blueprint Mission',
      'Each mission was a Blueprint class inheriting from a common C++ base. Behavior could be overridden for different mission types.',
      (<CopyBlock text={BP_Mission} language={"cpp"} wrapLines={true} theme={dracula}/>),
      '#### Mission Manager',
      'Managed active missions, UI updates, and completion logic.',
      (<CopyBlock text={BP_MissionManager} language={"cpp"} wrapLines={true} theme={dracula}/>),
      '<div id="Learn"/>',
      '## Access',
      'If you’re interested in using or learning more about these tools, reach out:',
      '<a href="https://www.linkedin.com/in/bowen-michael/">LinkedIn</a>',
      '<a href="mailto:michael@thebowenfamily.com">michael@thebowenfamily.com</a>',
      '<a href="tel:5856358255">585-635-8255</a>'
    ],
    livePreview: 'https://store.steampowered.com/app/2250160/Dead_Pedal/',
  },
  {
    href: 'turbo-hybrid',
    thumbnail: '/projects/turbo-hybrid/turbo-hybrid-cube.gif',
    name: 'Turbo-Hybrid Game Engine',
    description: [
      'The Turbo Hybrid Game Engine is a custom 3D game framework built using a structure-of-arrays ECS system, SDL2, JSON serialization, and bgfx rendering. It was developed over 15 weeks as part of a Champlain College course on game engine architecture.'
    ],
    stack: ['C++', 'SDL2', 'bgfx'],
    details: [
      '### Overview',
      'This game engine project focused on building a custom engine from scratch, including core systems like game object management, component handling, and rendering pipelines. We supported cross-platform builds using Emscripten and implemented 3D rendering with bgfx.',
      'I collaborated with Steven Annunziato to implement a 3D rendering system. We prioritized shader flexibility and chose bgfx for its abstraction of backend graphics APIs and strong documentation.',
      '### Technical Highlights',
      '* Created windowing and input systems using SDL2',
      '* Designed a structure-of-arrays ECS model for game objects and components',
      '* Used JSON for data-driven configuration of game objects',
      '* Integrated bgfx for efficient GPU rendering and shader pipeline support',
      '* Supported build targets for both Windows and Web (via Emscripten)',
      '### Rendering System',
      'Implemented a cube rendering component with MVP matrix support. Each object can define its own shader, and the engine is built to be extensible for future rendering features.',
      '<img width="100%" src="/projects/turbo-hybrid/Cube-rendering.png" />',
      '<img width="100%" src="/projects/turbo-hybrid/turbo-hybrid-alternating-rotate.gif" />',
      '### Sample GameObject JSON',
      'Components: TRAN (Transform), CUBE (Cube Renderer), PLRC (Player Controller)',
      (<CopyBlock text={JSONData} language="json" wrapLines={true} theme={dracula}/>),
      '### Main Render Function',
      (<CopyBlock text={mainRenderFunction} language="cpp" wrapLines={true} theme={dracula}/>),
      '### Cube Renderer Loop',
      (<CopyBlock text={cubeRenderFunction} language="cpp" wrapLines={true} theme={dracula}/>),
      '### Conclusion',
      'Building this engine gave me a deeper appreciation for the systems that power 3D games. The project helped reinforce fundamentals of rendering, data design, and low-level graphics integration.'
    ],
    sourceCode: 'https://github.com/BowenMichael/Turbo-Hybrid-Game-Engine',
    livePreview: 'https://docs.google.com/presentation/d/1pGFhkVGUu52NhdT-uWjjTgoqjUhPl1Ncy2UQMJzD5Ig/edit?usp=sharing'
  },
  
  {
    href: 'hand-tracking-vr',
    thumbnail: '/projects/hand-tracking/thumbnail.png',
    name: 'Oculus Hand Tracking Demo',
    description: [
      'Developed a VR spellcasting demo in Unity using Oculus Quest 2 hand tracking. I adapted existing spell systems to work with gesture-based input, implementing new mechanics like gesture-driven shooting and alternative locomotion. Worked on a team of four, owning the hand tracking and input design.'
    ],
    stack: ['VR', 'Unity', 'Oculus Quest 2', 'Oculus Hand Tracking', 'Unity VR', 'Hand Pose Inputs', 'Gesture-based Design'],
    details: [
      '### Demo Video',
      '<iframe src="https://drive.google.com/file/d/14NW3659T9bssBLZm8n4agDkqIjrP9HCC/preview" width="100%" height="360" allow="autoplay"></iframe>'
    ],
    livePreview: 'https://drive.google.com/file/d/14NW3659T9bssBLZm8n4agDkqIjrP9HCC/view?usp=sharing'
  },
  {
    href: 'olfactory-VR',
    thumbnail: '/projects/well-being/well-being-thumbnail.png',
    name: 'Olfactory VR Meditation',
    description: [
      'Collaborated with Ion Technologies to develop a VR meditation experience enhanced with scent delivery. Integrated the Ion scent device with the Unity Interaction Toolkit on the Pico Neo 2. Created a smooth and immersive experience as part of a study on wellbeing and immersive tech.'
    ],
    stack: ['Pico Neo 2', 'Unity Interaction Toolkit', 'Android', 'Ion Scent Device'],
    details: [
      '### Live Demo',
      '<iframe src="https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/preview" width="100%" height="480" allow="autoplay"></iframe>'
    ],
    livePreview: 'https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/view?usp=sharing'
  },
  {
    href: 'boat-combat',
    thumbnail: '/projects/boat-combat/thumbnail.png',
    name: 'Boat Combat',
    description: [
      'Built a networked mobile game where players control boats in 1v1 arena combat. Players can use accelerometer or touch controls to capture points and defeat opponents. Focused on mobile development and real-time multiplayer networking in Unity.'
    ],
    stack: ['Mobile', 'Unity', 'Networking', 'Multiplayer', 'Accelerometer', 'Touch Input', 'Arena Gameplay'],
    details: [
      '### Demo Video',
      '<iframe src="https://drive.google.com/file/d/16AJ3fHggciywTfD9s9z9kTts-QXjJOT4/preview" width="100%" height="360" allow="autoplay"></iframe>'
    ],
    livePreview: 'https://drive.google.com/file/d/16AJ3fHggciywTfD9s9z9kTts-QXjJOT4/view?usp=sharing'
  },
  {
    href: 'Spartakids',
    thumbnail: '/projects/spartakids/spartakids-thumbnail.png',
    name: 'Spartakids',
    description: [
      'Developed for the 2022 Ubisoft Game Lab Competition, Spartakids is a co-op boss fight game themed around childhood imagination. Players face off against a massive imaginary creature using creative weapons like a compass bow and marker sword. Focused on gameplay programming, networking, and UI integration.'
    ],
    stack: ['Unity', 'Networking', 'UI', 'Multiplayer', 'Gameplay'],
    details: [
      '<div class="project__image-container"><img class="project__image about__image" src="/projects/spartakids/spartakids-logo-2.png" alt="Spartakids logo" width="100%" /></div>',
      'Spartakids is a co-op third-person boss fighting game developed for the 2022 Ubisoft Game Lab Competition. Players face off against a monster during recess using creative weapons and cooperative mechanics. Trade perks, climb playground structures, and take down Spike the boss.',
      '### [Gameplay Video](https://www.youtube.com/watch?v=xEEImDZ5lIs)',
      '### [Itch.io](https://larnio.itch.io/spartakids)'
    ],
    livePreview: 'https://larnio.itch.io/spartakids'
  }

]

const skills = [
  {name : 'FANUC Robotics', href : '/bob'},
  {name : 'Roboguide', href : '/bob'},
  {name : 'Digital Twin Simulation', href : '/bob'},
  {name : 'State Machines (IO)', href : '/bob'},
  {name : 'TCP & End Effector Control', href : '/bob'},
  {name : 'DCS Safety', href : '/bob'},
  {name : 'Ethernet/IP', href : '/bob'},
  {name : 'Teach Pendant Programming', href : '/bob'},
  {name : 'OpenCV', href : '/bob'},
  {name : 'Edge Detection', href : '/bob'},
  {name : 'Sony CW-iTOF', href : '/bob'},
  {name : 'C++', href : '/bob'},
  {name : 'C#', href : '/projects/boat-combat'},
  {name : 'Unity', href : '/projects/boat-combat'},
  {name : 'Unreal Engine', href : '/projects/dead-pedal'},
  {name : 'Git', href : '/#skills'},
  {name : 'CI/CD', href : '/projects/dead-pedal'},
  {name : 'Google Cloud', href : '/projects/dead-pedal'},
  {name : 'Jenkins', href : '/projects/dead-pedal'},
  {name : 'GitHub Actions', href : '/#skills'},
  {name : 'Car AI', href : '/projects/dead-pedal'},
  {name : 'VR', href : '/projects/hand-tracking-vr'},
  {name : 'OpenXR', href : '/projects/hand-tracking-vr'},
  {name : 'Oculus Hand-Tracking', href : '/projects/hand-tracking-vr'},
  {name : 'SDL2', href : '/projects/turbo-hybrid'},
  {name : 'bgfx', href : '/projects/turbo-hybrid'},
  {name : 'Next.js', href : '/#skills'},
  {name : 'TypeScript', href : '/#skills'},
  {name : 'React', href : '/#skills'}
];

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'https://www.linkedin.com/in/bowen-michael/',
}

export { about, ProjectsData, skills, contact, WorkData }
