import Navbar from '/components/Navbar'
import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import {ThemeContext} from "../../contexts/theme";
import {useContext, useEffect, useState} from "react";
import Projects from "../../components/Projects";

const ProjectsIndex = () =>
{
    const [isMounted, setIsMounted] = useState(false)
    const [{ themeName }] = useContext(ThemeContext)
    
    useEffect(() => {
        const oldThemeName = themeName === 'dark' ? 'light' : 'dark'
        document.body.classList.remove(oldThemeName)
        document.body.classList.add(themeName)
    }, [themeName])

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
                <Projects/>
            </main>
            <ScrollToTop />
            <Footer />
        </div>
    </>)
}

export default ProjectsIndex;