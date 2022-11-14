import React, {useState, useEffect, FC} from 'react';
import { SideMenu } from './components/sidemenu';
import AppStyles from './components/appstyle';
import CSS from 'csstype';


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

const Profile: FC<SideMenuProps>  = (props): JSX.Element =>{

    
    
    //profile hooks
    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(pageContainer))
    )
    
    const [navigatingTo, setNavigatingTo] = useState<string>('')

   
      
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
    
    useEffect(() =>{
        let x:number = 0
        for(let i:number = 0; i<101;i++){
            setTimeout(() => {    
                let updatedValue:CSS.Properties = {opacity: `${x}` }   
                setAppStyle(AppStyle => ({...AppStyle, ...updatedValue}))
                x = x+0.01    
            }, i * 5)
        }  
    },[])


   
    
        return(

        <div style={{...AppStyles, ...props.tempStyle}}>
            <SideMenu testi={"link"} toinen={disappearElement} kolmas={setNavigatingTo} />
            <div style={AppStyle}>
                <div className='TopProfileContainer'>
                <h1 className='profileHeader'>Full-Stack developer</h1>
                    <p className='profileText'>I am a fast learner and extremely good as a teamplayer. 
                    I have a good understanding of both front-end and back-end developing and 
                    i'm aiming to be a Full-Stack developer in a few years.
                    You can find a list of my current skills here, you can also email me if you want my resume.</p>
                </div>
                    <div className='skillsBox'>
                        <h1 className='skillsBoxHeader'>Key skills</h1>
                        <div className='skillsBoxRow'>
                        <div className='skillsBoxColumn'>
                        <p className='keySkillsText'>C / C++ / C#</p>
                        <p  className='keySkillsText'>Python</p>
                        <p  className='keySkillsText'>React</p>
                        <p  className='keySkillsText'>Assembly</p>
                        <p  className='keySkillsText'>WordPress</p>
                        </div>
                        <div className='skillsBoxColumn'>
                        <p className='keySkillsText'>React-Native</p>
                        <p  className='keySkillsText'>TypeScript</p>
                        <p className='keySkillsText'>JavaScript</p>
                        <p  className='keySkillsText'>Web-Servers</p>
                        <p  className='keySkillsText'>SEO</p>
                        </div>
                        <div className='skillsBoxColumn'>
                        <p className='keySkillsText'>HTML / CSS</p>
                        <p className='keySkillsText'>PHP</p>
                        <p className='keySkillsText'>NodeJs</p>
                        <p  className='keySkillsText'>Linux</p>
                        <p  className='keySkillsText'>Analytics</p>
                        </div>
                        <div className='skillsBoxColumn'>
                        <p className='keySkillsText'>SMTP</p>
                        <p  className='keySkillsText'>Nginx</p>
                        <p  className='keySkillsText'>Apache2</p>
                        <p  className='keySkillsText'>MySql</p>
                        <p  className='keySkillsText'>AWS</p>
                        </div>
                        </div>
                        <div className='skillsBoxTransparent'>

                        </div>
                    </div>
            </div>
        </div>

    )
}

export default Profile