import uniqid from 'uniqid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'

const ProjectCard = ({ project }) => (
  <div className='project'>
    <div>

        {project.name && <h1>{project.name}</h1>}

        {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt='thumbnail'
        />
      )}


      
    </div>

    <div>
      {project.stack && (
        <ul className='project__stack'>
          {project.stack.map((item) => (
            <li key={uniqid()} className='project__stack-item'>
              {item}
            </li>
          ))}
        </ul>
      )}
            
        {project.details && (<>
            <h2>Details</h2>
            {project.description && (
                <div className='project__description paragraph__list'>
                    {project.description.map((item) => (
                        <p key={uniqid()}>{item}</p>
                    ))}
                </div>
            )}
            <div className={'details'}>
                {project.focus && (<>
                    <h4>My Focii</h4>
                    <ul>
                        {project.focus.map((item) => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </>)}
                
                <div className='project__description paragraph__list'>
                    {project.details.map((item) => (
                        <p>{item}</p>
                    ))}
                </div>
                

                
            </div>
        </>)}
        {project.sourceCode && (
            <a
                href={project.sourceCode}
                target='_blank'
                rel='noreferrer'
                aria-label='source code'
                className='link link--icon'
            >
                <GitHubIcon />
            </a>
        )}
        {project.livePreview && (
            <a
                href={project.livePreview}
                target='_blank'
                rel='noreferrer'
                aria-label='live preview'
                className='link link--icon'
            >
                <LaunchIcon />
            </a>
        )} 
            
        
        
        
    </div>
  </div>
)

export default ProjectCard
