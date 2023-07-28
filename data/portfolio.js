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

// endregion

const about = {
  // all the properties are optional - can be left empty or deleted
  // each element in the description array is a paragraph
  name: 'Michael Bowen',
  role: 'Game Programmer',
  description: [
    'Graduating in May 2023 with a focus in game devops, physics, and backend.',
  ],
  img : '/images/profile/michaelSmaller.png',
  resume: '/Resumes/Michael-Bowen_Resume_05-06-23.pdf',
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
    thumbnail: '/projects/dead-pedal/DeadPedal-2.png',
    name: 'Dead Pedal',
    description: [
        'As Lead Programmer, I maintained an Unreal CI/CD pipeline, creating and iterating our car physics, as well as establishing the programming team\'s feature timeline.'
      ],
    stack: ['Lead Programmer', 'UE5', 'Git', 'Jenkins', 'Google Cloud'],
    details: ['<div><a href="#Google">Google Cloud</a><br/> <a href="#Missions">Mission System</a><br/> <a href="#Learn">Learn More</a><div/>',
        '### The Game',
      'In Dead Pedal you play as John D. Pedal in a post apocalyptic world fending of ruthless marauders and mutant beasts. ' +
      'Upgrade you car with new weapons and customizations by taking out various factions. When your ready take on THE WORM and bring peace back to the mojave.',
      'Planned Steam release May 2023.',
        '<iframe width="100%" height="315" src="https://www.youtube.com/embed/hmdd7PEL4Rg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      '### Timeline',
      'Starting development in September 2022 I worked on a cross-disciplinary team of developers to create Dead Pedal for the Champlain College Game studio.',
      'We made the decision to learn Unreal Engine 5 to utilize Chaos Physics, World Partition and leverage Unreal\'s rendering.',
      '<div id="Google"/>',
      '## Technical Details',
      '### Google Cloud',
      'At the beginning of the project we identified our ability to iterate as a key area of risk. ' +
      'To create a driving system that would be intuitive and function as players would expect we need to ' +
      'ensure we could test efficiently. We created the build server to drastically reduce the time and effort in creating a build.' +
      'This not only saved time when putting builds together but it saved time when testing because the builds were easily ' +
      'accessible. Every week we knew the state of the build which built confidence in how people interacted with the build.',
      '#### Overview',
      'The build server has 5 core elements that allow for this pipeline.',
      '\n- The repo(we used git)' +
      '\n- The Jenkins server' +
      '\n- Google cloud build agents' +
      '\n- Google cloud buckets' +
      '\n- Team notification',
      '<img class="project__image" src="/projects/dead-pedal/build-pipeline-git.PNG" alt="Markdown Monster icon" width="100%"  />',
      '#### Repo',
      'The build needs to be stored somewhere in our case it was stored in Git. However it could be upgraded to support SVN or Perforce'+
      'The build also gets cached onto the build server instance so a large repo size is not a problem.',
      '#### Jenkins Server',
      'The Jenkins server exists as the brains of this operation. It manages all the commands, artifacts and manages the ' +
      'build instances. This supports user authentication so you can give your team access to this to avoid any build ' +
      'bottlenecks. anyone with access to the jenkins server can generate a build at any time',
      '<img class="project__image" src="/projects/dead-pedal/Jenkins.PNG" alt="Markdown Monster icon" width="100%"  />',
      '#### Cloud build agents',
      'The cloud build agents are machines with larger allocations of compute to support building the game. ' +
      'This is where your game will be build before the build is saved. These machines are custom images ' +
      'so they can support any necessary third party libraries required for compute.', 
      '#### Google Cloud Buckets',
      'The builds then get saved to google cloud buckets. This gives anyone with access ' +
      'to the link the ability to download the game. this will reduce time to retreating your game and testing it.', 
      '#### Finally Team integration',
      'This is all good but if it is not publicly available to your team it will only exist in the background. ' +
      'Notifying your team via discord or slack is important to automatically communicate the build status to your team',
      '<img class="project__image" src="/projects/dead-pedal/Jenkins-notification.PNG" alt="Markdown Monster icon" width="100%"  />',
        '### Conclusion',
        'This approach not only will give you more confidence in your build integrity ' +
        'but it will allow your team to test the CURRENT version of the build much faster.' +
        'This is also the starting point for more complex things like automated testing and tracking of users interaction with your game',
      '<div id="Missions"/><br/><br/><br/>',
        '### Mission System',
        'The Goal with the mission system was to create something that could be scaled out by the design team. ' +
        'Given the open world nature of our game we wanted a mission system that would not confine the player. ' +
        'I settled on created a C++ back end that would create a blueprint front end that could be extensible with ' +
        'unique behaviors.',
        '#### Tutorials',
        'In an effort to document these systems I took a visual approach as opposed to a word document. I created a ' +
        'series of videos that show how to set up mission blueprints and mission triggers through out the level. This ' +
        'allowed me to show off some of the smaller details about the system without creating a verbose document.',
        (<div className={'projects__grid'}>
          <a href="https://drive.google.com/file/d/1kIpO7VjVfOaTn34qGA2ZcYQWsIKimLJz/view?usp=sharing" > Mission System Part 1: Mission Manager Blueprint Overview</a>
          <a href="https://drive.google.com/file/d/1TV6QAZoXz2dYhz-RzTvbBmMEODNU4yZz/view?usp=sharing" > Mission System Part 2: Mission trigger system overview</a>
          <a href="https://drive.google.com/file/d/1gxpQQFnSTaQlMyN9ASqstNcU3IwE7oYW/view?usp=share_link" > Mission System Part 3: Setting up Mission targets</a>
          <a href="https://drive.google.com/file/d/1e_cskuIvzglVsWn1T-Ttm-ggGp4tnQUI/view?usp=share_link" > Mission System Part 4: Setting up AI patrols</a>
        </div>),
        '#### BP Mission',
        'The Mission is the core of what all unique missions were built off. This allowed contained behavior that was ' +
        'specific to a mission type. If the goal was to drive to a location or take out key base targets that could all ' +
        'be defined in the mission.',
      (<CopyBlock text={BP_Mission} language={"cpp"} wrapLines={true} theme={dracula}/> ),
        '#### BP Mission Manager',
        'The Mission Manager is responsible for keeping track of the active mission. This means keep the UI up to date ' +
        'and keeping track of completed missions. This allowed for common mission actions to be take care of in one place.',
      (<CopyBlock text={BP_MissionManager} language={"cpp"} wrapLines={true} theme={dracula}/> ),
        
      '<div id="Learn"/>',
        '## Access',
        'If you are interesting in accessing this reach out to me on linkedin, via email or phone number and we can ' +
        'set up a meeting to go over how you might integrate this into your pipeline.',
        '<a href="https://www.linkedin.com/in/bowen-michael/">Linkedin</a>',
        '<a href="mailto::michael@thebowenfamily.com">michael@thebowenfamily.com</a>',
        '<a href="call::5856358255">5856358255</a>'
        
        
    ],
    livePreview: 'https://store.steampowered.com/app/2250160/Dead_Pedal/',
  },
  {
    href : 'turbo-hybrid',
    thumbnail: '/projects/turbo-hybrid/turbo-hybrid-cube.gif',
    name: 'Turbo-Hybrid Game Engine',
    description: [
      'The Turbo Hybrid Game Engine is a 3D game framework that includes a game object component system built using a structure of arrays, JSON data serialization, and bgfx 3D rendering.',
    ],
    stack: ['C++', 'SDL2', 'bgfx' ],
    details: ['### Overview',
    'This project was completed over 15 weeks as apart of a class on game engine development during the Fall of 2022. Creating an SDL window, game objects, components, and basic player movement were core to the course design. JSON parsing and 3D rendering were optional components. As a part of the final project I teamed up with Steven Annunziato to help with Implementing a 3D renderer.',
    'We made the design decision to ensure our solution allowed for custom shaders on a per object basis. We settled on bgfx for its wide use in games including Minecraft. It also abstracted the backend service decreasing the time and boilerplate for setting up OpenGL. With solid documentation we dove head first implementing a MVP matrix for each game object that had a cube component renderer.',
    '## Technical Details',
    'Below is a blog post going into all the details about our rendering implementation.',
    '### Personal Contributions:\n' +
    '\n' +
    '* Implemented emscripten and windows build systems using SDL and C++.\n' +
    '* Utilized JSON file format for reading game object and component data.\n' +
    '* Worked on integrating bgfx 3D rendering library into the engine and built out a cube renderer component\n',
    '### Overview\n' +
    'In a world of game engines and package managers, it is easy to become detached from the core processes that make up modern software. For game developers, this comes in the form of software like Unity, Unreal Engine, Gamemaker, and Godot. Especially in 3D software, the process of rendering is taken for granted. Even the idea of creating an application window can be a concept that is hard to grasp. This was true for me before starting to build this engine. I have been using PCs since Windows XP yet I had no intuition about how to create a window.',
      'The Turbo Hybrid Game engine was created to teach myself how to build an application from scratch.\n' +
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
      (<img width={'100%'} src='/projects/turbo-hybrid/Cube-rendering.png'/>),
      'The first thing I want to look at is the render function. Inside my main loop, I am creating two matrices that I am going to pass into bgfx to define my 3D space. These matrices are the view matrix and projection matrix. The View matrix defines my camera while the projection matrix determines the type of camera. the two most common types are perspective and orthographic. Here I am using perspective. This means I am defining a perspective camera.',
      '#### [glm::Namespace](https://github.com/g-truc/glm)',
      'GLM is a math library that we needed to use on windows because the built-in math library inside of bx was not suitable for use on windows. GLM is an open source header-only math library. GLM is based on the OpenGL specification which makes it perfect for our use.',
      (<CopyBlock text={mainRenderFunction} language={"cpp"} wrapLines={true} theme={dracula}/> ),
      '### Rendering Cube render components',
      'The Turbo hybrid engine uses a component bases structure of arrays. This means that all the components are stored on the stack right next to each other. By looping through an array of CubeRenderer components I compute specific actions. Each CubeRenderer component references the same vertex and index buffers that define the cube. They also are using the same shader program.',
      (<CopyBlock text={cubeRenderFunction} language={"cpp"} wrapLines={true} theme={dracula}/> ),
      (<img width={'100%'} src='/projects/turbo-hybrid/turbo-hybrid-alternating-rotate.gif'/>),
      'This is what renders each cube component separately. Adding things like mesh information and setting different shaders would just be a matter of changing out the buffers and the program. Adding additional components for things like collision would be the first step to making a more versatile game engine.\n' +
      '\n',
      '### Conclusion\n',
      'I learned a lot from developing this engine. It was really satisfying to see all the steps of the process from window creation to rendering full 3D images. Bgfx was a great option for developing my own 3D components while maintaining control of the graphics pipeline while interfacing with your graphics backend of choice. It also supports various backends and platforms which makes it a great option for games. This project is only scratching the surface but I am really glad to of had the experience.',
      'If your interested in the codebase it is on my GitHub and if you have any questions feel to shoot me a message on linkedin',

      '' +
    ''],
    sourceCode: 'https://github.com/BowenMichael/Turbo-Hybrid-Game-Engine',
    livePreview: 'https://docs.google.com/presentation/d/1pGFhkVGUu52NhdT-uWjjTgoqjUhPl1Ncy2UQMJzD5Ig/edit?usp=sharing',
  },
  {
    href : 'hand-tracking-vr',
    thumbnail: '/projects/hand-tracking/thumbnail.png',
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
    thumbnail: '/projects/well-being/well-being-thumbnail.png',
    name: 'Olfactory VR Meditation',
    description: [
      'Worked with Ion Technologies to integrate the Ion scent device into an immersive VR meditation experience. Developed for a study on how immersive technologies can be used to enhance well being',
      
    ],
    stack: ['Pico Neo 2', 'Unity Interaction Toolkit', 'Android', 'Ion Scent'],
    details: ['### Live Demo',
      '<iframe src="https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/preview" width="100%" height="480" allow="autoplay"></iframe>',],
    livePreview: 'https://drive.google.com/file/d/1mn-pmESa-8kyll-9QarV-EdaCwwexoFB/view?usp=sharing',
  },
  {
    href : 'boat-combat',
    thumbnail: '/projects/boat-combat/thumbnail.png',
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
    href : 'Spartakids',
    thumbnail: '/projects/spartakids/spartakids-thumbnail.png',
    name: 'Spartakids',
    description: [
      'Spartakids was developer as a part of the 2022 Ubisoft Game Lab Competition. The theme for the year was \'Student XP\'. Our interpretation of the theme lead us to a co-op boss fighter about the magic of play.',
    ],
    stack: ['Unity', 'Networking', 'UI', 'Networked Events', 'Gameplay'],
    details: ['<div class="project__image-container"><img class="project__image about__image" src="/projects/spartakids/spartakids-logo-2.png" alt="Markdown Monster icon" width="100%"  /></div>',
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
    '* cinematic/particles to convey context\n',
    '### Personal Contribution\n',
    'I started the project as a gameplay programmer focusing on CCC. It was quickly identified that Networking was going to be vital for the co-op experience so I shifted my focus during the project to network gameplay elements. As well as timelines, perks, and UI.\n' +
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
  {name : 'C++', href : '/projects/turbo-hybrid'},
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
  {name : 'Oculus Hand-Tracking', href : `/projects/hand-tracking-vr`},
  {name : 'SDL2', href : '/projects/turbo-hybrid'},
  {name : 'bgfx', href : '/projects/turbo-hybrid'},
  {name : 'Next.js', href : '/#skills'},
  {name : 'TypeScript', href : '/#skills'},
  {name : 'React', href : '/#skills'},
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'https://www.linkedin.com/in/bowen-michael/',
}

export { about, ProjectsData, skills, contact }
