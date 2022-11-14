import React, {useState, useEffect, FC} from 'react';
import { MobileMenu } from './components/mobilemenu';
import AppStylesMobile from './components/mobileAppStyle';
import CSS from 'csstype';


interface SideMenuProps {
    tempStyle: CSS.Properties,
  }

const pageContainer:CSS.Properties ={
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    opacity: '0',
    backgroundColor: 'black',
}

const ProfileMobile: FC<SideMenuProps>  = (props): JSX.Element =>{

    
    
    //profile hooks
    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(pageContainer))
    )

   
    //page enter
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

        <div style={{...AppStylesMobile, ...props.tempStyle}}>
            <MobileMenu />
            <div style={AppStyle}>
                <div className='TopProfileContainerMobile unselectable'>
                <h1 className='headerStyleMobile'>Full-Stack developer</h1>
                    <p className='topProfileTextMobile'>I am a fast learner and extremely good as a teamplayer. 
                    I have a good understanding of both front-end and back-end developing and 
                    i'm aiming to be a Full-Stack developer in a few years.
                    You can find a list of my current skills here, you can also email me if you want my resume.</p>
                </div>
                    <div className='skillsBoxMobile unselectable'>
                        <h1 className='skillsBoxHeaderMobile'>Key skills</h1>
                        <div className='skillsBoxRowMobile'>
                        <div className='skillsBoxColumnMobile'>
                        <p className='keySkillsTextMobile'>C / C++ / C#</p>
                        <p  className='keySkillsTextMobile'>Python</p>
                        <p  className='keySkillsTextMobile'>React</p>
                        <p  className='keySkillsTextMobile'>Assembly</p>
                        <p  className='keySkillsTextMobile'>WordPress</p>
                        <p className='keySkillsTextMobile'>SMTP</p>
                        <p  className='keySkillsTextMobile'>MySql</p>
                        <p  className='keySkillsTextMobile'>Linux</p>
                        <p  className='keySkillsTextMobile'>Analytics</p>
                        <p  className='keySkillsTextMobile'>Apache2</p>
                        </div>
                        <div className='skillsBoxColumnMobile'>
                        <p className='keySkillsTextMobile'>React-Native</p>
                        <p  className='keySkillsTextMobile'>TypeScript</p>
                        <p className='keySkillsTextMobile'>JavaScript</p>
                        <p  className='keySkillsTextMobile'>Web-Servers</p>
                        <p  className='keySkillsTextMobile'>SEO</p>
                        <p  className='keySkillsTextMobile'>Nginx</p>
                        <p className='keySkillsTextMobile'>HTML / CSS</p>
                        <p className='keySkillsTextMobile'>PHP</p>
                        <p className='keySkillsTextMobile'>NodeJs</p>
                        <p  className='keySkillsTextMobile'>AWS</p>
                        </div>
                        
                        </div>
                    </div>
            </div>
        </div>

    )
}

export default ProfileMobile