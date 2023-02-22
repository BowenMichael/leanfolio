import uniqid from 'uniqid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'

const ProjectCard = ({ project }) => (
  <div className='project'>
    <div>
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt='thumbnail'
        />
      )}

      {project.name && <h3>{project.name}</h3>}

      {project.description && (
        <div className='project__description paragraph__list'>
          {project.description.map((item) => (
            <p key={uniqid()}>{item}</p>
          ))}
        </div>
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
        
    </div>
  </div>
)

export default ProjectCard
