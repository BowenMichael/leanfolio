import Head from 'next/head'
import { about } from '../data/portfolio'
import {ThemeContext, ThemeProvider} from '../contexts/theme'
import { useState, useEffect, useContext } from 'react'
import '../styles/index.css'
import '../styles/App.css'
import '../styles/About.css'
import '../styles/Contact.css'
import '../styles/Footer.css'
import '../styles/Navbar.css'
import '../styles/ProjectCard.css'
import '../styles/Projects.css'
import '../styles/ScrollToTop.css'
import '../styles/Skills.css'
import 'animate.css'

// google analytics
import { useRouter } from 'next/router'
import {ga_measurement_id, pageview} from '../lib/google-analytics'
import smartlookClient from "smartlook-client";
// /google analytics

export const smartlookId = 'b889c9be6a643ce3cc23e6f90e97c13830183ab5'
function MyApp({ Component, pageProps }) {
    // google analytics
    // will log page views on route change if new routes are added
    const router = useRouter()
    const[loaded, setLoaded] = useState(false)
    useEffect(() => {
          if(!loaded){
              smartlookClient.init(smartlookId, {region: 'us'});
              
              setLoaded(true)
          }
            if (!ga_measurement_id) return
            const handleRouteChange = (url) => pageview(url)
            router.events.on('routeChangeComplete', handleRouteChange)
            return () => router.events.off('routeChangeComplete', handleRouteChange)
    }, [router.events])
      

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <title>{about.name || 'Portfolio'}</title>
            </Head>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
  )
}

export default MyApp
