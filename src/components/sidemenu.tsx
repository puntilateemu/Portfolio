import { useLocation, useNavigate } from 'react-router-dom';
import React, {useState, useEffect, FC, MouseEventHandler} from 'react';
import homeLink from './assets/home-darkmode.png'
import homeActiveLink from './assets/home-active.png'
import profileLink from './assets/profile-darkmode.png'
import profileActiveLink from './assets/profile-active.png'
import projectsLink from './assets/briefcase.png'
import projectsActiveLink from './assets/briefcase (1).png'
import contactLink from './assets/contact.png'
import contactActiveLink from './assets/contact-active.png'
import githubLink from './assets/github.png'
import linkedIn from './assets/linkedin.png'

interface SideMenuProps {
    testi: string,
    toinen: Function,
    kolmas:Function
  }
//MouseEventHandler<HTMLDivElement>
export const SideMenu: FC<SideMenuProps> = (props): JSX.Element =>{
    
    //navigations
    let navigate = useNavigate()
    let location = useLocation()

    //COLORS
    //active link image color #61C4EB
    //non active color #FFFFFF
    
    //sidemenu hooks
    const [homeImage, setHomeImage] = useState<boolean>(true)
    const [profileImage, setProfileImage] = useState<boolean>(false)
    const [projectsImage, setProjectsImage] = useState<boolean>(false)
    const [contactImage, setContactImage] = useState<boolean>(false)
   
    
    //check which page is active
    useEffect(() => {
        if(location.pathname!=="/"){
            setHomeImage(false)
        }
        if(location.pathname=="/"){
            setHomeImage(true)
        }
        if(location.pathname=="/profile"){
            setProfileImage(true)
        }
        if(location.pathname!=="/profile"){
            setProfileImage(false)
        }
        if(location.pathname=="/projects"){
            setProjectsImage(true)
        }
        if(location.pathname!=="/projects"){
            setProjectsImage(false)
        }
        if(location.pathname=="/contact"){
            setContactImage(true)
        }
        if(location.pathname!=="/contact"){
            setContactImage(false)
        }
        
      },[]);

     

      //link clicks
      //HOME
      const handleHomeClick = async () =>{

        if(location.pathname!=="/" ){
        //props.kolmas('home')
        props.toinen()
        setTimeout(() =>{
        try{ 
           
        }catch(e){
            console.log(e)
        }finally{
            navigate("/", { state: { id: 0 } })
        }},450)}

      }

      
      //PROFILE
      const handleProfileClick = async () =>{

        if(location.pathname!=="/profile"){
        //props.kolmas('profile')
        props.toinen()
        setTimeout(() =>{
        try{
            
        }catch(e){
            console.log(e)
        }finally{
            navigate("/profile", { state: { id: 1 } })
        }},450)}
      }

      //PROJECTS
      const handleProjectsClick = () =>{

        if(location.pathname!=="/projects"){
            //props.kolmas('projects')
            props.toinen()
            setTimeout(() =>{
                navigate("/projects", { state: { id: 1 } })
        }, 450)
      }
      }

      //CONTACT 
      const handleContactClick = () =>{
        
        if(location.pathname!=="/contact"){
            props.kolmas('contact')
            props.toinen()
            setTimeout(() =>{
                navigate("/contact", { state: { id: 1 } })
        }, 450)
      }
      }
      
    return(
        
        <div className='sideMenu'>
                <div className='sideMenuTop' onClick={() => handleHomeClick()}>
                    <h1 className='smallLetter'>T</h1>
                        </div>
                            <div className='sideMenuCenter'>
                                <div className='sideMenuCenterLinkContainer' onClick={() => handleHomeClick()}>
                                    <img src={!homeImage ? homeLink : homeActiveLink} className='sideMenuLink' alt='link home' />
                                        </div>
                                        <div className='sideMenuCenterLinkContainer' onClick={() => handleProfileClick()}>
                                            <img src={!profileImage ? profileLink : profileActiveLink} className='sideMenuLink' alt='link about' />
                                        </div>
                                        <div className='sideMenuCenterLinkContainer' onClick={() => handleProjectsClick()}>
                                            <img src={!projectsImage ? projectsLink : projectsActiveLink} className='sideMenuLink' alt='link projects' />
                                        </div>
                                        <div className='sideMenuCenterLinkContainer' onClick={() => handleContactClick()}>
                                            <img src={!contactImage ? contactLink : contactActiveLink} className='sideMenuLink' alt='link mail' />
                                        </div>
                                    </div>
                                        <div className='sideMenuBottom'>
                                            <a href={'https://github.com/puntilateemu'} target={'_blank'} >
                                            <img src={githubLink} className='smallLinkSideMenu' alt='github icon' />
                                            </a>

                                            <a href={'https://fi.linkedin.com/in/teemu-puntila-42a60422b?trk=people-guest_people_search-card'} target={'_blank'} >
                                            <img src={linkedIn} className='smallLinkSideMenu' alt='linkedIn icon' />
                                            </a> 
                            </div>
                    </div>
                
    )
}