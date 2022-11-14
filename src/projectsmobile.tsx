import React, {useState, useEffect, useRef, FC, MouseEventHandler} from 'react';
import { MobileMenu } from './components/mobilemenu';
import AppStyles from './components/mobileAppStyle';
import CSS from 'csstype';
import './projects.css'
import Draggable, { DraggableData,  DraggableEvent } from "react-draggable"
import projectsItems from './components/objectlist'

interface SideMenuProps {
    tempStyle: CSS.Properties,
}

const projectsRowContainer:CSS.Properties ={
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    transition: '',
    bottom: '0',
    opacity: '0'
}
const boxInFront:CSS.Properties = {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    width: '51%',
    height: '55%',
    backgroundColor: 'lavender',
    borderRadius: '8px',
    transition: '0',
    marginBottom: '3%',
    boxShadow: '3px 5px 10px 3px rgba(71, 71, 71, 0.5)',
    position: 'absolute',

}

const boxToLeft:CSS.Properties = {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    width: '40%',
    height:'40%',
    position: 'absolute',
    backgroundColor: 'rgba(230, 230, 250,0.7)',
    marginLeft: '-100%',
    transition: '0.3s',
    borderRadius: '8px',
}

const boxToRight:CSS.Properties = {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    width: '40%',
    height:'40%',
    position: 'absolute',
    backgroundColor: 'rgba(230, 230, 250,0.7)',
    marginRight: '-100%',
    transition: '0.3s',
    borderRadius: '8px',
}
const boxInFrontSmallBox:CSS.Properties ={
    display:'flex',
    flexDirection: 'column',
    position: 'fixed',
    width: '40%',
    height:'28%',
    backgroundColor:'aliceblue',
    borderRadius: '12px',
    bottom: '19%',
    transition: '1.3s',
    zIndex: '10',
    alignItems: 'center',
    transformOrigin: 'center',
    boxShadow: '3px 5px 10px 3px rgba(71, 71, 71, 0.5)',
    justifyContent: 'space-evenly',
}

const headerInBox:CSS.Properties ={
    color:'black',
    fontStyle: 'normal',
    fontSize: '2.4vh',
    fontWeight: '300',
    transformOrigin: 'center',
    transform: 'rotateY(90deg)',
    textAlign: 'center'
}
const textInBox:CSS.Properties ={
    color: 'dimgray',
    fontStyle: 'normal',
    fontSize: '1.7vh',
    fontWeight: '300',
    transformOrigin: 'center',
    transform: 'scale(0%)',
    textAlign: 'center'
}
const button:CSS.Properties ={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height:'4vh',
    paddingLeft:'5%',
    paddingRight:'5%',
    border: '1px',
    borderStyle:'groove',
    borderRadius: '4px',
    borderColor: 'black',
    marginLeft: '6%',
    transformOrigin: 'center',
    transform: 'scale(0%)',
    boxShadow: '1px 3px 6px 1px rgba(71, 71, 71, 0.5)',
    textAlign: 'center',
}
const buttonHover:CSS.Properties ={
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformOrigin: 'bottom right',
    transform: 'scale(0)',
    borderRadius: '3px',
    zIndex: '-10',
    backgroundColor: 'rgb(69, 69, 126)'
}


const ProjectsMobile: FC<SideMenuProps>  = (props): JSX.Element =>{

    
    const nodeRef = React.useRef(null)
    
    

    //style hooks
    const [rowContainer, setRowContainer] = useState<CSS.Properties>(JSON.parse(JSON.stringify(projectsRowContainer)))
    const [frontBox, setFrontBox] = useState<CSS.Properties>(JSON.parse(JSON.stringify(boxInFront)))
    const [firstToLeft, setFirstToLeft] = useState<CSS.Properties>(JSON.parse(JSON.stringify(boxToLeft)))
    const [secondToLeft, setSecondToLeft] = useState<CSS.Properties>({...firstToLeft, marginLeft: '-190%'})
    const [firstToRight, setFirstToRight] = useState<CSS.Properties>(JSON.parse(JSON.stringify(boxToRight)))
    const [secondToRight, setSecondToRight] = useState<CSS.Properties>({...firstToRight, marginRight: '-190%'})
    const [smallBox, setSmallBox] = useState<CSS.Properties>(JSON.parse(JSON.stringify(boxInFrontSmallBox)))
    const [header, setHeader] = useState<CSS.Properties>(JSON.parse(JSON.stringify(headerInBox)))
    const [textIn, setTextIn] = useState<CSS.Properties>(JSON.parse(JSON.stringify(textInBox)))
    const [buttonIn, setButtonIn] = useState<CSS.Properties>(JSON.parse(JSON.stringify(button)))
    const [buttonInHover, setButtonInHover] = useState<CSS.Properties>(JSON.parse(JSON.stringify(buttonHover)))
    
    //items showing array hooks
    const [rightClick,setRightClick] = useState<number>(1)
    const [currentPosition, setCurrentPosition] = useState<any>({front:0, left1:projectsItems.length-1, left2:projectsItems.length-2, right1:1, right2:2})
    const [nextPosition, setNextPosition] = useState<number>(0)
    const [over, setOver] = useState<boolean>(false)
    
    
    
    //transition hooks
    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(AppStyles))
    )
    const [navigatingTo, setNavigatingTo] = useState<string>('')

    //drag hooks
    const [dragLeft, setDragLeft] = useState<number>(0)
    const [coords, setCoords] = useState<number>(0)
    const [direction, setDirection] =useState<any>({left: false,right:false,start: 0})
    const [trackPosition, setTrackPosition] = useState<any>({
            current: -100,
            currentRight: -100,
            marginLeft1: -200,
            marginLeft2: -290,
            marginRight1: 0,
            marginRight2: -90,
            leftClick: 'd3',
            rightClick: 'd5',
            one:true,
            two:false,
            three:false,
            four:false,
            five:false,
        })
     
     
    //Small Box Effects
    
    useEffect(() =>{
        let x:number = 90
        let y:number = 0
        let z:number = 0
        let r:number = 0
        const timer = setTimeout(() => {
            for(let i = 0; i<91;i++){
                setTimeout(() =>{
                    setHeader({...header, transform: `rotateY(${x}deg)`, opacity: `${y}`})
                    x--
                    y= y+0.01
                },i*12)}
                for(let o = 0; o<101;o++){
                    setTimeout(() =>{
                        setTextIn({...textIn, transform: `scale(${z}%)`, opacity: `${r}`})
                        setButtonIn({...buttonIn,transform: `scale(${z}%)`, opacity: `${r}`})
                        z++
                        r = r+0.01
                    },o*14)
                }

          }, 400);
         
          return () => clearTimeout(timer);
        
    },[trackPosition])


      //might be a bug with width
useEffect(()=>{
    const elBigBox = document.getElementById('d2')

    if(elBigBox !== null){
        const positionx = elBigBox.getBoundingClientRect()
        setCoords(positionx.width/100)   
    }
    let x:number = 0
    for(let i:number = 0; i<101;i++){
        setTimeout(() => {      
            setRowContainer({...rowContainer, opacity: `${x}`})
            x = x+0.01    
        }, i * 5)
    }  
},[])

    
     
// DRAG START
const handleDragStart = (e: DraggableEvent, y: DraggableData) => {
    
    setRowContainer({...rowContainer, transition:``})
    setDirection({...direction, start: y.x})
                   
};
                
// DRAG STOP
const handleDragEvent = (e: DraggableEvent, y: DraggableData) =>{
    setRowContainer({...rowContainer, transition:`0.3s`})
    //right
    if(direction.start > y.x +20){
        setDirection({...direction,right:true , start: 0})
        handleClickLeftChange(0)
    }
    //left
    if(direction.start < y.x-20){
        setDirection({...direction,left:true , start: 0})
        handleClickLeftChange(1)
    }
}



useEffect(() =>{

    if(rightClick == projectsItems.length -2 && !over){
        setRightClick(0)
        setOver(true)
    }
    if(rightClick == projectsItems.length && over){
        setRightClick(0)
    }
    if(rightClick == -3 && !over){
        setRightClick(projectsItems.length-3)
    }
    if(rightClick == -1 && over){
        setRightClick(projectsItems.length-1)
    }
   


   
    if(nextPosition == 0 && !over){
        setNextPosition(projectsItems.length-1)
    }
    if(nextPosition == 1 && !over){
        setNextPosition(projectsItems.length-1)
        setRightClick(nextPosition+4)
        setOver(true)
    }
    if(nextPosition == -1 && over){
        setNextPosition(projectsItems.length-1)
    }
    if(nextPosition == projectsItems.length +2 && !over){
        setNextPosition(2)
    }
    if(nextPosition == projectsItems.length && over){
        setNextPosition(projectsItems.length -1)
    }
    
},[nextPosition, rightClick])


// BOTH CLICKS 
const handleClickLeftChange = (e:number) =>{
    
    if(direction.left || e ==1){
        
    let x:number = dragLeft
    setSmallBox({...smallBox, transform: 'scale(0)', transition: '0' })
    setNextPosition(nextPosition-1)
    setRightClick(rightClick-1)
    setHeader({...header, transform: `rotateY(90deg)`})
    setTextIn({...textIn, transform: `scale(0%)`})
    setButtonIn({...buttonIn,transform: `scale(0%)`})
    
    for(let i = 0;i<99;i++){
        setTimeout(() =>{
            setDragLeft(x)
             x= x + coords
            if(i == 98){
                setSmallBox({...smallBox, transform: 'scale(1)', transition: '2s' })
            }
        },i*3)
    } 
            if(frontBox.width == '51%'){
                setFrontBox({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setFirstToRight({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight2}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToLeft({...boxToLeft,  marginLeft:`${trackPosition.marginLeft1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft2}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setFirstToLeft({...boxToLeft, width: '51%', height: '55%', marginBottom: '3%', marginLeft: `${trackPosition.current}%`, backgroundColor: 'lavender'})
                setTrackPosition({...trackPosition,current: trackPosition.current-100, marginLeft1: trackPosition.marginLeft1 -100, leftClick: 'd4', rightClick: 'd2',
                marginLeft2:trackPosition.marginLeft2-100, marginRight1: trackPosition.marginRight1+100, marginRight2: trackPosition.marginRight2+100,
                one:false, two: true, currentRight: trackPosition.currentRight +100 })
                setCurrentPosition({...currentPosition, right2: over ? nextPosition :nextPosition -2})
                
            }
            if(firstToLeft.width == '51%'){
                setFrontBox({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight2}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
                setFirstToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft2}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToLeft({...boxToLeft,  width: '51%', height: '55%', marginBottom: '3%', marginLeft:`${trackPosition.current}%`, backgroundColor: 'lavender'})
                setSecondToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft1}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setFirstToLeft({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setTrackPosition({...trackPosition,current: trackPosition.current-100, marginLeft1: trackPosition.marginLeft1 -100,leftClick: 'd6',rightClick: 'd3',
                marginLeft2:trackPosition.marginLeft2-100, marginRight1: trackPosition.marginRight1+100, marginRight2: trackPosition.marginRight2+100,
                two: false, three: true, currentRight: trackPosition.currentRight +100 })
                setCurrentPosition({...currentPosition, right1: over ? nextPosition :nextPosition -2})
                
            }
            if(secondToLeft.width == '51%'){
                setFrontBox({...boxToLeft, marginLeft: `${trackPosition.marginLeft2}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
                setFirstToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToLeft({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToRight({...boxToLeft,  width: '51%', height: '55%', marginBottom: '3%', marginLeft:`${trackPosition.current}%`, backgroundColor: 'lavender'})
                setFirstToLeft({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight2}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setTrackPosition({...trackPosition,current: trackPosition.current-100, marginLeft1: trackPosition.marginLeft1 -100, leftClick: 'd5', rightClick: 'd4',
                marginLeft2:trackPosition.marginLeft2-100, marginRight1: trackPosition.marginRight1+100, marginRight2: trackPosition.marginRight2+100,
                three: false, four: true, currentRight: trackPosition.currentRight +100 })
                setCurrentPosition({...currentPosition, front: over ? nextPosition :nextPosition -2})
                
            }
            if(secondToRight.width == '51%'){
                setFrontBox({...boxToLeft, marginLeft: `${trackPosition.marginLeft1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
                setFirstToRight({...boxToLeft,  width: '51%', height: '55%', marginBottom: '3%', marginLeft:`${trackPosition.current}%`, backgroundColor: 'lavender'})
                setSecondToLeft({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight2}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToRight({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setFirstToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft2}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setTrackPosition({...trackPosition,current: trackPosition.current-100, marginLeft1: trackPosition.marginLeft1 -100, leftClick: 'd2', rightClick: 'd6',
                marginLeft2:trackPosition.marginLeft2-100, marginRight1: trackPosition.marginRight1+100, marginRight2: trackPosition.marginRight2+100,
                four: false, five:true, currentRight: trackPosition.currentRight +100 })
                setCurrentPosition({...currentPosition, left1: over ? nextPosition :nextPosition -2})
                
            }
            if(firstToRight.width == '51%'){
                setFrontBox({...boxToLeft,  width: '51%', height: '55%', marginBottom: '3%', marginLeft:`${trackPosition.current}%`, backgroundColor: 'lavender'}) 
                setFirstToRight({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft2}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setSecondToRight({...boxToRight, width: '40%', height: '40%', marginBottom: '0', marginRight: `${trackPosition.marginRight2}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setFirstToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft1}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
                setTrackPosition({...trackPosition,current: trackPosition.current-100, marginLeft1: trackPosition.marginLeft1 -100, leftClick: 'd3', rightClick: 'd5',
                marginLeft2:trackPosition.marginLeft2-100, marginRight1: trackPosition.marginRight1+100, marginRight2: trackPosition.marginRight2+100,
                five:false, one: true, currentRight: trackPosition.currentRight +100 })
                setCurrentPosition({...currentPosition, left2: over ? nextPosition :nextPosition -2})
                
            }
            
            setDirection({...direction,left:false})
}
    if(direction.right|| e ==0){
        let x:number = dragLeft
        setSmallBox({...smallBox, transform: 'scale(0)', transition: '0' })
        setNextPosition(nextPosition+1)
        setRightClick(rightClick+1)
        for(let i = 0;i<99;i++){
            setTimeout(() =>{
                setDragLeft(x)
                x= x - coords
                if(i == 98){
                    setSmallBox({...smallBox, transform: 'scale(1)', transition: '2s' })
                }
            },i*3)
        }
         
        if(frontBox.width == '51%'){
            setFrontBox({...boxToLeft, width: '40%', height: '40%', marginBottom: '0', marginLeft: `${trackPosition.marginLeft1+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setFirstToRight({...boxToRight, width: '51%', height: '55%', marginBottom: '3%', marginRight: `${trackPosition.currentRight}%`, backgroundColor: 'lavender'})
            setSecondToLeft({...boxToRight,  marginRight:`${trackPosition.marginRight2-200}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToRight({...boxToRight, marginRight: `${trackPosition.marginRight1-200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setFirstToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft2+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setTrackPosition({...trackPosition,currentRight: trackPosition.currentRight-100, marginLeft1: trackPosition.marginLeft1 +100, leftClick: 'd2', rightClick: 'd6',
            marginLeft2:trackPosition.marginLeft2+100, marginRight1: trackPosition.marginRight1-100, marginRight2: trackPosition.marginRight2-100,
            one:false, five: true,current: trackPosition.current+100 })
            setCurrentPosition({...currentPosition, left2: over ? rightClick :rightClick +2})
            
        }
        if(firstToRight.width == '51%'){
            setFrontBox({...boxToLeft, marginLeft: `${trackPosition.marginLeft2+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
            setFirstToRight({...boxToLeft, width: '40%', height: '40%', marginBottom: '0', marginLeft: `${trackPosition.marginLeft1+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToLeft({...boxToRight,  marginRight:`${trackPosition.marginRight1-200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToRight({...boxToRight, width: '51%', height: '55%', marginBottom: '3%', marginRight: `${trackPosition.currentRight}%`, backgroundColor: 'lavender'})
            setFirstToLeft({...boxToRight,  marginRight:`${trackPosition.marginRight2-200}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setTrackPosition({...trackPosition,currentRight: trackPosition.currentRight-100, marginLeft1: trackPosition.marginLeft1 +100,leftClick: 'd5',rightClick: 'd4',
            marginLeft2:trackPosition.marginLeft2+100, marginRight1: trackPosition.marginRight1-100, marginRight2: trackPosition.marginRight2-100,
            five: false, four: true,current: trackPosition.current+100 })
            setCurrentPosition({...currentPosition, left1: over ? rightClick :rightClick +2})
            
        }
        if(secondToRight.width == '51%'){
            setFrontBox({...boxToRight,  marginRight:`${trackPosition.marginRight2-200}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
            setFirstToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft2+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToLeft({...boxToRight, width: '51%', height: '55%', marginBottom: '3%', marginRight: `${trackPosition.currentRight}%`, backgroundColor: 'lavender'})
            setSecondToRight({...boxToLeft, width: '40%', height: '40%', marginBottom: '0', marginLeft: `${trackPosition.marginLeft1+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setFirstToLeft({...boxToRight,  marginRight:`${trackPosition.marginRight1-200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setTrackPosition({...trackPosition,currentRight: trackPosition.currentRight-100, marginLeft1: trackPosition.marginLeft1 +100, leftClick: 'd6', rightClick: 'd3',
            marginLeft2:trackPosition.marginLeft2+100, marginRight1: trackPosition.marginRight1-100, marginRight2: trackPosition.marginRight2-100,
            three: true, four: false,current: trackPosition.current+100 })
            setCurrentPosition({...currentPosition, front: over ? rightClick :rightClick +2})
            
        }
        if(secondToLeft.width == '51%'){
            setFrontBox({...boxToRight, marginRight: `${trackPosition.marginRight1-200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'}) 
            setFirstToRight({...boxToRight,  marginRight:`${trackPosition.marginRight2-200}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToLeft({...boxToLeft, width: '40%', height: '40%', marginBottom: '0', marginLeft: `${trackPosition.marginLeft1+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToRight({...boxToLeft, marginLeft: `${trackPosition.marginLeft2+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setFirstToLeft({...boxToRight, width: '51%', height: '55%', marginBottom: '3%', marginRight: `${trackPosition.currentRight}%`, backgroundColor: 'lavender'})
            setTrackPosition({...trackPosition,currentRight: trackPosition.currentRight-100, marginLeft1: trackPosition.marginLeft1 +100, leftClick: 'd4', rightClick: 'd2',
            marginLeft2:trackPosition.marginLeft2+100, marginRight1: trackPosition.marginRight1-100, marginRight2: trackPosition.marginRight2-100,
            three: false, two:true,current: trackPosition.current+100 })
            setCurrentPosition({...currentPosition, right1: over ? rightClick :rightClick +2})
            
        }
        if(firstToLeft.width == '51%'){
            setFrontBox({...boxToRight, width: '51%', height: '55%', marginBottom: '3%', marginRight: `${trackPosition.currentRight}%`, backgroundColor: 'lavender'}) 
            setFirstToRight({...boxToRight, marginRight: `${trackPosition.marginRight1-200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft2+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setSecondToRight({...boxToRight, marginRight: `${trackPosition.marginRight2-200}%`, transition: '', backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setFirstToLeft({...boxToLeft, marginLeft: `${trackPosition.marginLeft1+200}%`, backgroundColor: 'rgba(230, 230, 250,0.7)'})
            setTrackPosition({...trackPosition,currentRight: trackPosition.currentRight-100, marginLeft1: trackPosition.marginLeft1 +100, leftClick: 'd3', rightClick: 'd5',
            marginLeft2:trackPosition.marginLeft2+100, marginRight1: trackPosition.marginRight1-100, marginRight2: trackPosition.marginRight2-100,
            two:false, one: true,current: trackPosition.current+100 })
            setCurrentPosition({...currentPosition, right2: over ? rightClick :rightClick +2})
            
        }
        setTextIn({...textIn, transform: `scale(0%)`})
        setHeader({...header, transform: `rotateY(90deg)`})
        setButtonIn({...buttonIn,transform: `scale(0%)` })
        setDirection({...direction,right:false})
    }
}

    return(
        <div  style={{...AppStyles,...props.tempStyle}} >
            <MobileMenu  />
            <div  >
                <Draggable nodeRef={nodeRef} position={{x: dragLeft, y: 0}} axis="x" onStop={handleDragEvent} onStart={handleDragStart}>
                    <div id='d1' ref={nodeRef}  style={rowContainer}  >
                    
                        <div id='d2' style={frontBox} >
                        
                        <img src={projectsItems[currentPosition.front].image} className='containerImageMobile' />
                        {trackPosition.one ? (<div style={smallBox}>
                            <h1 style={header}>{projectsItems[currentPosition.front].header}</h1>
                                <p style={textIn}>{projectsItems[currentPosition.front].intro}</p>
                                    <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.front].button1 ? (
                                        <a style={buttonIn} href={projectsItems[currentPosition.front].link ? projectsItems[currentPosition.front].link : undefined}>
                                            <div>
                                                <p className='textInBoxMobile'>{projectsItems[currentPosition.front].button1}</p>
                                            
                                            </div>
                                        </a>
                                        ) : (
                                        <></>)}
                                            
                                        {projectsItems[currentPosition.front].button2 ? (<div style={buttonIn} >
                                            
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.front].button2}</p>
                                        </div>) : (<></>)}</div>
                                        <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.front].button3 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.front].button3}</p>
                                        </div>) : (<></>)}

                                       {projectsItems[currentPosition.front].button4 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.front].button4}</p>
                                        </div>) : (<></>)}
                                    </div>
                        </div>) : (<></>)}
                        </div>
                        
                            
                        <div  id='d3' style={firstToLeft}>
                        <img src={projectsItems[currentPosition.left1].image} className='containerImageMobile' />
                            {trackPosition.two ? (<div style={smallBox}>
                                <h1 style={header}>{projectsItems[currentPosition.left1].header}</h1>
                                <p style={textIn}>{projectsItems[currentPosition.left1].intro}</p>
                                <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.left1].button1 ? (
                                        <a style={buttonIn} href={projectsItems[currentPosition.left1].link ? projectsItems[currentPosition.left1].link : undefined}>
                                            <div>
                                                <p className='textInBoxMobile'>{projectsItems[currentPosition.left1].button1}</p>
                                            
                                            </div>
                                        </a>) : (<></>)}</div>
                                        <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.left1].button2 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left1].button2}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.left1].button3 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left1].button3}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.left1].button4 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left1].button4}</p>
                                        </div>) : (<></>)}
                                    </div>   
                        </div>) : (<></>)}
                        </div>
                        

                        <div id='d4' style={secondToLeft}>
                        <img src={projectsItems[currentPosition.left2].image} className='containerImageMobile' />
                            {trackPosition.three  ? (<div style={smallBox}>
                                <h1 style={header}>{projectsItems[currentPosition.left2].header}</h1>
                                <p style={textIn}>{projectsItems[currentPosition.left2].intro}</p>
                                <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.left2].button1 ? (
                                        <a style={buttonIn} href={projectsItems[currentPosition.left2].link ? projectsItems[currentPosition.left2].link : undefined}>
                                            <div>
                                                <p className='textInBoxMobile'>{projectsItems[currentPosition.left2].button1}</p>
                                            
                                            </div>
                                        </a>) : (<></>)}

                                        {projectsItems[currentPosition.left2].button2 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left2].button2}</p>
                                        </div>) : (<></>)}</div>
                                        <div className='buttonRowInBoxmobile'>
                                       {projectsItems[currentPosition.left2].button3 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left2].button3}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.left2].button4 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.left2].button4}</p>
                                        </div>) : (<></>)}
                                    </div>   
                        </div>) : (<></>)}
                        </div>
                        

                        <div id='d5' style={firstToRight}>
                        <img src={projectsItems[currentPosition.right1].image} className='containerImageMobile' />
                        {trackPosition.five ? (<div style={smallBox}>
                            <h1 style={header}>{projectsItems[currentPosition.right1].header}</h1>
                            <p style={textIn}>{projectsItems[currentPosition.right1].intro}</p>
                            <div className='buttonRowInBoxmobile'>
                                {projectsItems[currentPosition.right1].button1 ? (
                                <a style={buttonIn} href={projectsItems[currentPosition.right1].link ? projectsItems[currentPosition.right1].link : undefined}>
                                            <div>
                                                <p className='textInBoxMobile'>{projectsItems[currentPosition.right1].button1}</p>
                                            
                                            </div>
                                        </a>) : (<></>)}</div>
                                        <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.right1].button2 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right1].button2}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.right1].button3 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right1].button3}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.right1].button4 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right1].button4}</p>
                                        </div>) : (<></>)}
                                    </div>   
                        </div>) : (<></>)}
                        </div>
                        

                        <div id='d6' style={secondToRight}>
                        <img src={projectsItems[currentPosition.right2].image} className='containerImageMobile' />
                        {trackPosition.four ? (<div style={smallBox}> 
                            <h1 style={header}>{projectsItems[currentPosition.right2].header}</h1>
                            <p style={textIn}>{projectsItems[currentPosition.right2].intro}</p>
                            <div className='buttonRowInBoxmobile'>
                                {projectsItems[currentPosition.right2].button1 ? (
                                <a style={buttonIn} href={projectsItems[currentPosition.right2].link ? projectsItems[currentPosition.right2].link : undefined}>
                                            <div>
                                                <p className='textInBoxMobile'>{projectsItems[currentPosition.right2].button1}</p>
                                            
                                            </div>
                                        </a>) : (<></>)}</div>
                                        <div className='buttonRowInBoxmobile'>
                                        {projectsItems[currentPosition.right2].button2 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right2].button2}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.right2].button3 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right2].button3}</p>
                                        </div>) : (<></>)}

                                        {projectsItems[currentPosition.right2].button4 ? (<div style={buttonIn}>
                                            <p className='textInBoxMobile'>{projectsItems[currentPosition.right2].button4}</p>
                                        </div>) : (<></>)}
                                    </div>  
                        </div>) : (<></>)}
                        </div>
                       

                    </div>
                    </Draggable>
                </div>
        </div>
    )
}


export default ProjectsMobile