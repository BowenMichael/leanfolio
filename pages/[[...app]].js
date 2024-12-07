import Navbar from '../components/Navbar'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Work from '../components/Work'
import Contact from '../components/Contact'
import ScrollToTop from '../components/ScrollToTop'
import Footer from '../components/Footer'
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../contexts/theme";

function App() {
    const [isMounted, setIsMounted] = useState(false)
    const [loaded, setloaded] = useState(false)
    const [{ themeName }] = useContext(ThemeContext)
    
    useEffect(() => {
        const oldThemeName = themeName === 'dark' ? 'light' : 'dark'
        document.body.classList.remove(oldThemeName)
        document.body.classList.add(themeName)
        if(!loaded){
            setloaded(true);
        }
    }, [themeName])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted || !loaded) {
        return null
    }

  return (
    <div id='top' className='app'>
      <Navbar />

      <main>
        <About />
        <div className={`${window.location.href === '#projects' || '#skills' || '#contact' ? '' : 'animate__animated animate__fadeInUp animate__delay- 2s'}`}>
            <Work/>
            <Projects />
            <Skills />
            <Contact />
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
