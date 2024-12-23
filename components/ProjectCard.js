import uniqid from 'uniqid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import {skills} from "../data/portfolio";

const ProjectCard = ({ project }) => {
    const href = project.href ? '/projects/' + project.href : '/';
    
    return (
        <a href={href}>
            <div className='project'>
                <div>
                    {project.thumbnail && (
                        <img
                            className='project__thumbnail'
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
                            <GitHubIcon/>
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
                            <LaunchIcon/>
                        </a>
                    )}
                    {project.href && (<>
                        <br/>
                        <br/>
                        <ol className='skills__list'>
                            <a href={href}>
                                <li key={uniqid()} className=' btn btn--plain'>
                                    Learn More
                                </li>
                            </a>
                        </ol>
                    </>)}
    
                </div>
            </div>
        </a>
    )
    
}

export default ProjectCard
