import uniqid from 'uniqid'
import ProjectCard from './ProjectCard'
import Spacer from './Spacer'
import { ProjectsData } from '../data/portfolio'

const Projects = () => {
  if (!ProjectsData.length) return null

  return (
    <section id='projects' className='section projects'>
      

      <Spacer height={2} />
      <h2 className='section__title'>Projects</h2>

      <div className='projects__grid'>
        {ProjectsData.map((project) => (
          <ProjectCard key={uniqid()} project={project} />
        ))}
      </div>
      <div className='about__pseudo-padding' />
      <Spacer height={2} />

      <h2 className='section__title'>Portfolio Video(2023)</h2>
        <iframe style={{ marginTop : '3rem'}} width="560" height="315" src="https://www.youtube.com/embed/_evFuQ-EVoc"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen/>
    </section>
  )
}

export default Projects
