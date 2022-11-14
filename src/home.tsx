import React, {useState, useEffect, FC} from 'react';
import { SideMenu } from './components/sidemenu';
import CSS from 'csstype';
import AppStyles from './components/appstyle';

import { useNavigate } from 'react-router-dom';

interface SideMenuProps {
    tempStyle: CSS.Properties,
  }

const pageContainer:CSS.Properties ={
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    opacity: '0'
}

const Home: FC<SideMenuProps>= (props): JSX.Element =>{

    //checking state for effects
    
    let navigate = useNavigate()

    //home hooks/states
    const [test, setTest] = useState<string | null>(null)
    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(pageContainer))
    )
    const [navigatingTo, setNavigatingTo] = useState<string>('')



    type name = string[];
    const fname: name = 'eemu Puntila,'.split('');
    

    //text loop
    const textLopp = (x:name) =>{
        let y:string = ""
         for(let i = 0; i<x.length;i++){
            setTimeout(() => {
                y = y + x[i]
                if(y !== undefined){
                    setTest(y)
                    //return y
                }
                
            },i * 200)
         }
        
    }
    //text loop
    useEffect(() => {
        setTimeout(() => {
        textLopp(fname)
        const interval = setInterval(() => {
            textLopp(fname)
          }, 8000);
          return () => clearInterval(interval);
        }, 450)
      },[]);
      
      //page leave animation
      const disappearElement = () =>{
        let x:number = 1
        for(let i:number = 0; i<101;i++){
            setTimeout(() => {    
                let updatedValue:CSS.Properties = {opacity: `${x}` }   
                setAppStyle(AppStyle => ({...AppStyle, ...updatedValue}))
                x = x-0.01    
            }, i * 5)
        }  
      }
      //page enter effect
      useEffect(() =>{
        let x:number = 0
        for(let i:number = 0; i<101;i++){
            setTimeout(() => {    
                let updatedValue:CSS.Properties = {opacity: `${x}` }   
                setAppStyle(AppStyle => ({...AppStyle, ...updatedValue}))
                x = x+0.01
            }, i * 10)
        }  
        },[])

      //navigate to profile
      const navigateToProfile = () =>{
        setNavigatingTo('profile')
        disappearElement()
        setTimeout(()=>{
            navigate("/profile")
        },350)
      }

      //navigate to contact
      const navigateToContact = () =>{
        setNavigatingTo('contact')
        disappearElement()
        setTimeout(()=>{
            navigate("/contact")
        },350)
      }
      //navigate to projects
      const navigateToProjects = () =>{
        setNavigatingTo('projects')
        disappearElement()
        setTimeout(()=>{
            navigate("/projects")
        },350)
      }
     
    
    return (
        
        <div style={{...AppStyles, ...props.tempStyle}}>
            <SideMenu testi={"link"} toinen={disappearElement} kolmas={setNavigatingTo}/>
            
                        <div style={AppStyle}>
                            <div className='TopContainer'>
                                <h1 className='headerStyle'>Hi,<br></br>I'm</h1>
                                    <h1 className='smallLetter'>&nbsp;T</h1>
                                        <h1 className='headerStyle'>{test}<br></br>Full-Stack developer.</h1>
                                            
                                                <p className='frontText'>React-Native / Typescript / React / Node / C / C# / C++ / Assembly / Python</p>
                                                    <div className='topButtonContainer'>
                                                    <div className='topButton' onClick={navigateToContact}>
                                                        <p>Contact Me</p>
                                                    </div>
                                                    <div className='topButton' onClick={navigateToProfile}>
                                                        <p>About me</p>
                                                    </div>
                                                    <div className='topButton' onClick={navigateToProjects}>
                                                        <p>Projects</p>
                                                    </div>
                                                    </div>
                                            </div>
                                        
                                        <p className='megaLetter'>T</p>
                                        
          </div>
         
        </div>
        
    )
          
}



export default Home