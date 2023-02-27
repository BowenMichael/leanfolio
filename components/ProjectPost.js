import uniqid from 'uniqid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LaunchIcon from '@material-ui/icons/Launch'
import ReactMarkdown from 'react-markdown'
import React from 'react'
import rehypeRaw from 'rehype-raw'
import {CopyBlock, dracula} from "react-code-blocks";
import react from "react";
import {MapPortfolioDataArray, MapProjectStack} from "../scripts/util";
import * as PropTypes from "prop-types";
const util = require('util')




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
        <MapProjectStack stack={project.stack} />
      )}
            
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
