import uniqid from 'uniqid'
import ProjectCard from './ProjectCard'
import Spacer from './Spacer'
import { WorkData } from '../data/portfolio'

const Work = () => {
  if (!WorkData.length) return null

  return (
    <section id='work' className='section work'>
      <Spacer height={2} />
      <h2 className='section__title'>Work</h2>

      <div className='projects__grid'>
        {WorkData.map((work) => (
          <ProjectCard key={uniqid()} project={work} />
        ))}
      </div>
    </section>
  )
}

export default Work
