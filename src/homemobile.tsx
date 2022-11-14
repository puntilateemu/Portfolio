import React, {useState, useEffect, FC} from 'react';
import CSS from 'csstype';
import AppStyles from './components/mobileAppStyle';
import { MobileMenu } from './components/mobilemenu';
import { useNavigate } from 'react-router-dom';
import Wave from 'react-wavify'

interface SideMenuProps {
    tempStyle: CSS.Properties,
  }

const pageContainer:CSS.Properties ={
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    opacity: '0',
    overflow:'hidden'
}

const waveContainer:CSS.Properties ={

    bottom:'0%',
    width: '100%',
    height:'55%',
    
}

const HomeMobile: FC<SideMenuProps>= (props): JSX.Element =>{

    //checking state for effects
    
    let navigate = useNavigate()

    //home hooks/states
    const [test, setTest] = useState<string | null>(null)
    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(pageContainer))
    )
    



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

      

    
    
     
    
    return (
        <div style={{...AppStyles, ...props.tempStyle}}>
            <div style={AppStyle}>
                <MobileMenu />
                    <div className='TopContainerMobile'>
                        <h1 className='headerStyleMobile unselectable'>Hi,<br></br>I'm</h1>
                            <h1 className='smallLetterMobile unselectable'>&nbsp;T</h1>
                                <h1 className='headerStyleMobile unselectable'>{test}<br></br>Full-Stack developer.</h1>
                                    <p className='frontTextMobile unselectable'>React-Native / Typescript / React / Node / C / C# / C++ / Assembly / Python</p>                                     
                                </div>
                            <Wave fill='lavender' style={waveContainer} paused={false} options={{ amplitude: 55,speed: 0.15,points: 1}}/>                         
                        </div>    
                    </div>
    )
          
}



export default HomeMobile