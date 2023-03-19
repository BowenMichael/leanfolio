import {ThemeContext} from "../../contexts/theme";
import {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import Projects from "../../components/Projects";
import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import {ProjectsData} from "../../data/portfolio";
import ProjectCard from "../../components/ProjectCard";
import uniqid from "uniqid";
import ProjectPost from "../../components/ProjectPost";


export async function getServerSideProps(context ){
    return {
        props : {
            query: context.query
        },
    }
}

const Project = (props) =>
{
    const [project, setProject] = useState(ProjectsData.find(project => {
        return project.href === props.query.id
    }))


    const [{ themeName }] = useContext(ThemeContext)
    useEffect(() => {
        const oldThemeName = themeName === 'dark' ? 'light' : 'dark'
        document.body.classList.remove(oldThemeName)
        document.body.classList.add(themeName)
    }, [themeName])

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    
    return (<>
        <div id='top' className='app'>
            <Navbar/>
            <main>
                {project ? <ProjectPost project={project} /> : <></>}
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    </>)
}

export default Project;