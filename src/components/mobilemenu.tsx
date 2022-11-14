import { useLocation, useNavigate } from 'react-router-dom';
import React, {useState, useEffect, FC, MouseEventHandler} from 'react';
import githubLink from './assets/github.png'
import linkedIn from './assets/linkedin.png'
import projectsLink from './assets/briefcase.png'
import contactLink from './assets/contact.png'
import CSS from 'csstype';
import menuLogoSignature from './assets/menulogosignature.png'

interface SideMenuProps {
   
  }
const line1:CSS.Properties ={
    width: '80%',
    height: '0.7vh',
    backgroundColor: 'azure',
    marginBottom: '10%',
    borderRadius: '10px',
    transformOrigin: 'left',
}
const line2:CSS.Properties ={
    width: '50%',
    height: '0.7vh',
    marginLeft: '17%',
    backgroundColor: 'azure',
    marginBottom: '10%',
    borderRadius: '10px',
}
const line3:CSS.Properties ={
    width: '70%',
    height: '0.7vh',
    backgroundColor: 'azure',
    marginLeft: '25%',
    marginBottom: '10%',
    borderRadius: '10px',
    transformOrigin: 'left'
}
const linkText:CSS.Properties ={
    fontStyle: 'monospace',
    fontSize: '4vh',
    color:'antiquewhite',
    transformOrigin: 'center',
    transform: 'rotateY(90deg)',
    opacity: '0'
}
const lineInNav:CSS.Properties ={
    width:'80%',
    height:'0.7vh',
    backgroundColor: 'antiquewhite',
    borderRadius: '10px',
    transformOrigin: 'left',
    opacity: '0',
}
const linkImageNav:CSS.Properties ={
    width: '35%',
    height: '35%',
    transformOrigin: 'center',
    opacity: '0'
}
const menuLogo:CSS.Properties ={
    width: '45%',
    height: '50%',
    transformOrigin: 'center',
    transform: `translateX(-100%)`,
    opacity: '0'
}

export const MobileMenu: FC<SideMenuProps> = (props): JSX.Element =>{

    let navigate = useNavigate()
    let location = useLocation()
    //burger lines
    const [burger1, setBurger1] = useState<CSS.Properties>(JSON.parse(JSON.stringify(line1)))
    const [burger2, setBurger2] = useState<CSS.Properties>(JSON.parse(JSON.stringify(line2)))
    const [burger3, setBurger3] = useState<CSS.Properties>(JSON.parse(JSON.stringify(line3)))

    //menu styles
    const [link1, setLink1] = useState<CSS.Properties>(JSON.parse(JSON.stringify(linkText)))
    const [link2, setLink2] = useState<CSS.Properties>(JSON.parse(JSON.stringify(linkText)))
    const [link3, setLink3] = useState<CSS.Properties>(JSON.parse(JSON.stringify(linkText)))
    const [link4, setLink4] = useState<CSS.Properties>(JSON.parse(JSON.stringify(linkText)))
    const [line, setLine] = useState<CSS.Properties>(JSON.parse(JSON.stringify(lineInNav)))
    const [linkImage, setLinkImage] = useState<CSS.Properties>(JSON.parse(JSON.stringify(linkImageNav)))
    const [menuLogoS, setMenuLogoS] = useState<CSS.Properties>(JSON.parse(JSON.stringify(menuLogo)))


    const [showSignature, setShowSignature] = useState<boolean>(false)
    const [menuActive, setMenuActive] = useState<boolean>(false)


    //check location

    useEffect(() =>{
        if(location.pathname !== '/'){
            setShowSignature(true)
            setTimeout(() =>{showSignatureEffect()},200)
        }
        if(location.pathname == '/'){
            setShowSignature(false)
            setMenuLogoS({...menuLogoS, transform: `translateX(-100%)`, opacity: `0`})
        }
    },[])

    //signature effect
    const showSignatureEffect = () =>{
            let x:number = -100
            let y:number = 0
            for(let i = 0;i<101;i++){
                setTimeout(()=>{
                    setMenuLogoS({...menuLogoS, transform: `translateX(${x}%)`, opacity: `${y}`})
                    x++
                    if(i >= 80){
                        y = y + 0.1
                    }
                },i*8)
            }
    }

    //links and redirects
    const homeLink = () =>{
        navigate("/")
    }
    const profileLink = () =>{
        navigate("/profile")
    }
    const contactLinks = () =>{
        navigate("/contact")
    }
    const portfolioLink = () =>{
        navigate("/projects")
    }

    const linkToSocial =  (e:number) =>{
        if(e ==1){
            window.location.replace('https://fi.linkedin.com/in/teemu-puntila-42a60422b?trk=people-guest_people_search-card')
        }else{
            window.location.replace('https://github.com/puntilateemu')
        }
    }

    //burger menu
    const handleBurgerMenu = () =>{
        let x:number = 0
        let y:number = 1
        let z:number = 0
        let p:number = 38.17999999999996
        let o:number = 41.39999999999996
        if(!menuActive){
        setMenuActive(true)
        for(let i = 0; i<46; i++){
            setTimeout(() =>{
                setBurger1({...burger1, transform: `rotate(${z}deg)`, marginBottom: '14%', width: '73%', height: '0.9vh', })
                setBurger2({...burger2, opacity: `${y}`})
                setBurger3({...burger3, transform: `rotate(-${x}deg) translate(-8%)`, marginLeft: '6%', marginBottom: '6%', height: '0.9vh',width: '73%',})
                y = y-0.1
                z = z+0.83
                x = x + 0.9
                if(i == 30){
                    menuEffects()
                }
            },i*3)
        }
    }else{
        setMenuActive(false)
        for(let i = 0; i<46; i++){
            setTimeout(() =>{
                setBurger1({...line1, transform: `rotate(${p}deg)`})
                setBurger2(line2)
                setBurger3({...line3,transform: `rotate(-${o}deg)`})
                p= p-0.83
                o = o-0.9
                if(i == 45){
                    setBurger1(line1)
                    setBurger3(line3)
                    setLink1({...link1, transform: `rotateY(90deg)`, opacity: `0` })
                    setLink2({...link2, transform: `rotateY(90deg)`, opacity: `0` })
                    setLink3({...link3, transform: `rotateY(90deg)`, opacity: `0` })
                    setLink4({...link4, transform: `rotateY(90deg)`, opacity: `0` })
                    setLine({...line, transform: `scale(0%)`, opacity: `0` })
                    setLinkImage(linkImageNav)
                }
            },i*3)
        }
    }
    }

    


    //menu effects
    const menuEffects = () =>{
        let x:number = 90
        let y:number = 0
        for(let i = 0;i<91;i++){
            setTimeout(()=>{
                setLink1({...link1, transform: `rotateY(${x}deg)`, opacity: `${y}` })
                x--
                y = y+0.01
            },i*6)
        }
        setTimeout(()=>{
            let x:number = 90
            let y:number = 0
            for(let i = 0;i<91;i++){
                setTimeout(()=>{
                    setLink2({...link2, transform: `rotateY(${x}deg)`, opacity: `${y}` })
                    x--
                    y = y+0.01
                },i*6)
            }
        },300)
        setTimeout(()=>{
            let x:number = 90
            let y:number = 0
            for(let i = 0;i<91;i++){
                setTimeout(()=>{
                    setLink3({...link3, transform: `rotateY(${x}deg)`, opacity: `${y}` })
                    x--
                    y = y+0.01
                },i*6)
            }
        },600)
        setTimeout(()=>{
            let x:number = 90
            let y:number = 0
            for(let i = 0;i<91;i++){
                setTimeout(()=>{
                    setLink4({...link4, transform: `rotateY(${x}deg)`, opacity: `${y}` })
                    x--
                    y = y+0.01
                },i*6)
            }
        },900)
        setTimeout(()=>{
            let x:number = 0
            let y:number = 0
            for(let i = 0;i<101;i++){
                setTimeout(()=>{
                    setLine({...line, transform: `scale(${x}%)`, opacity: `${y}` })
                    x++
                    y = y+0.01
                },i*6)
            }
        },1100)
        setTimeout(()=>{
            let x:number = 0
            let y:number = 0
            for(let i = 0;i<101;i++){
                setTimeout(()=>{
                    setLinkImage({...linkImage, transform: `scale(${x}%)`, opacity: `${y}` })
                    x++
                    y = y+0.01
                },i*6)
            }
        },1100)
    }

    //back to normal
    useEffect(() =>{
        if(menuActive){
            setBurger1(line1)
            setBurger3(line3)
            setLink1({...link1, transform: `rotateY(90deg)`, opacity: `0` })
            setLink2({...link2, transform: `rotateY(90deg)`, opacity: `0` })
            setLink3({...link3, transform: `rotateY(90deg)`, opacity: `0` })
            setLink4({...link4, transform: `rotateY(90deg)`, opacity: `0` })
            setLine({...line, transform: `scale(0%)`, opacity: `0` })
            setLinkImage(linkImageNav)
        }
    },[menuActive])
   

    return(
    <div className='mobileMenuContainer'>
       {menuActive ? (
        <div className='mobileMenuContainerActive'>
            <p style={link1} onTouchStart={homeLink}>Home</p>
            <p style={link2} onTouchStart={profileLink}>About Me</p>
            <p style={link3} onTouchStart={portfolioLink}>Projects</p>
            <p style={link4} onTouchStart={contactLinks}>Contact</p>
            <div style={line} />
            <div className='mobileNavImageContainer'>
                <img style={linkImage} src={linkedIn} alt='linkedIn Link' onTouchStart={() => linkToSocial(1)} />
                
                <img style={{...linkImage,marginLeft: '30%'}} className='linkImageMobileNav'   src={githubLink} alt='github Link' onTouchStart={() => linkToSocial(2)} />
            
            </div>
        </div>
        
        ):(<></>)}
            {!showSignature ? (<>
            <div style={{marginLeft: '5%', backgroundColor: '#fd02fd'}} className='imageLinkContainer' onTouchStart={contactLinks}>
                <img className='imageInMobileBar' src={contactLink} alt='contact Link' />
                <p className='textInMobileBar'>Contact</p>
            </div>

            <div className='imageLinkContainer' onTouchStart={portfolioLink}>
                <img className='imageInMobileBar' src={projectsLink} alt='projects Link' />
                <p className='textInMobileBar'>Portfolio</p>
            </div>
            </>
            ) : (
            <div style={menuLogoS} onTouchStart={homeLink}>
            <img style={{width: '100%', height: '100%'}} src={menuLogoSignature} alt='Teemu Puntila signature' />
            </div>
            )}
        <div className='burgerContainer' onTouchStart={handleBurgerMenu}>
            <div style={burger1} />
            <div style={burger2} />
            <div style={burger3} />
        </div>
        
    </div>
    )
}