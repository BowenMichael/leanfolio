import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import React from 'react'
import {MapPortfolioDataArray, MapProjectStack} from "../scripts/util";

const ExternalLink = ({project}) => (
    <>
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
    </>
) 

const ProjectCard = ({ project }) => (
    <main>
      <div className='project project__Post'>
        <div>
            {project.name && <h1>{project.name}</h1>}
            {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt='thumbnail'
              width='100%'
            />
          )}
        </div>
    
        <div>
          {project.stack && (
            <MapProjectStack stack={project.stack} />
          )}
            <ExternalLink project={project}/>


            {project.details && (<>
                <h2>Details</h2>
                {project.description && (
                    <div className='project__description paragraph__list'>
                        <MapPortfolioDataArray dataArray={project.description}/>
                    </div>
                )}
                <div className={'details'}>
                    <div className='project__description paragraph__list'>
                        <MapPortfolioDataArray dataArray={project.details}/>
                    </div>
                </div>
            </>)}
            <ExternalLink project={project}/>
                
            
            
            
        </div>
      </div>
    </main>
)

export default ProjectCard
