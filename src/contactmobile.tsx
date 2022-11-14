import React, {useState, useEffect, useRef, FC} from 'react';
import { MobileMenu } from './components/mobilemenu';
import AppStyles from './components/mobileAppStyle';
import CSS from 'csstype';
import axios from 'axios';
import phoneIcon from './components/assets/phone.png'
import mailIcon from './components/assets/mail.png'
import locationIcon from './components/assets/location.png'
import linkedinIcon from './components/assets/linkedin.png'
import githubIcon from './components/assets/github.png'


interface SideMenuProps {
    tempStyle: CSS.Properties,
  }

const ContactContainer:CSS.Properties ={
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
    alignItems: 'center',
    opacity: '0',
    backgroundColor:'black',
    overflowX: 'hidden'
}
const contactBox:CSS.Properties ={
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2%',
    marginBottom: '5%',
    width:'95%',
    height: '75%',
    backgroundColor: 'lavender',
    borderRadius: '30px',
    alignItems: 'center',
}
const successMessageContainer:CSS.Properties ={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: '60%',
    height: '15%',
    bottom: '2%', 
    backgroundColor: 'rgba(0,0,0,0)',
}
const successMessageText:CSS.Properties ={
    fontSize: '6vh',
    color:'green',
    transformOrigin: 'center',
    transform: 'rotateY(90deg)',
    opacity: '0'
}

const ContactMobile: FC<SideMenuProps>  = (props): JSX.Element =>{

    //icon color #B79B9B

    const nameWarning:string = 'First name required'
    const mailWarning:string = 'Valid mail address required'

    const [AppStyle, setAppStyle] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(ContactContainer))
    )
    const [contactBoxFull, setContactBoxFull] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(contactBox))
    )
    const [successEffect, setSuccessEffect] = useState<CSS.Properties>(
        JSON.parse(JSON.stringify(successMessageText))
    )
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const [checkedNo, setCheckedNo] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [clicked, setClicked] = useState<number>(0)
    const [check, setCheck] = useState<boolean>(false)
    const [nameWarningSet, setNameWarning] = useState<boolean>(false)
    const [mailWarningSet, setMailWarning] = useState<boolean>(false)
    const [successActive, setSuccessActive] = useState<boolean>(false)


    //page appear animation
    useEffect(() =>{
        let x:number = 0
        let y: number = 90
        for(let i:number = 0; i<101;i++){
            setTimeout(() => {    
                let updatedValue:CSS.Properties = {opacity: `${x}` }   
                setAppStyle(AppStyle => ({...AppStyle, ...updatedValue}))
                setContactBoxFull({...contactBoxFull, transformOrigin: 'center', transform:`scaleX(${y}%)`})
                x = x+0.01
                y = y+0.1
            }, i * 10)
        }  
    },[])

      //handle texts
      const handleFirstName = (e:React.FormEvent<HTMLInputElement>) =>{
        setFirstName(e.currentTarget.value)
      }

      const handleLastName = (e:React.FormEvent<HTMLInputElement>) =>{
        setLastName(e.currentTarget.value)
      }

      const handleMail = (e:React.FormEvent<HTMLInputElement>) =>{
        setMail(e.currentTarget.value)
      }

      const handlePhone = (e:React.FormEvent<HTMLInputElement>) =>{
        setPhone(e.currentTarget.value)
      }

      const handleMessage = (e:React.FormEvent<HTMLTextAreaElement>) =>{
        setMessage(e.currentTarget.value)
      }

      //handle checkbox
      const handleCheckBox = () =>{
        if(!checked){
            setChecked(true)
            setCheckedNo(false)
        }else{
            setChecked(false)
        }
       
      }

      const handleCheckBoxNo = () =>{
        if(!checkedNo){
            setCheckedNo(true)
            setChecked(false)
        }else{
            setCheckedNo(false)
        }
      }

      //submit message send
      const codeRequest = async () => {
        try{
        if(mail.includes('@') && mail.includes('.') && firstName.length >=3 && clicked <2){
            setCheck(true)
            setMailWarning(false)
            setNameWarning(false)
            setClicked(clicked+1)
            
        axios.post('https://puntilachain.com/loginsystem/users/recovery', {
          email: mail, fname: firstName, lname: lastName, phone: phone, resume: checked ? 'yes' : 'no', message: message
        }).then((response) => {
          console.log(response.data)
            setSuccessActive(true)
            handleSuccessMessage()
        }).catch(err => console.log(err))
        }
        if(!mail.includes('@') && !mail.includes('.')){
            setMailWarning(true)
            console.log("mail")
        }
        if(mail.includes('@') && mail.includes('.')){
            setMailWarning(false)
            console.log("mail")
        }
        if(firstName.length <=2){
            setNameWarning(true)
            console.log("name")
        }
        if(firstName.length >2){
            setNameWarning(false)
            console.log("name")
        }
        if(clicked >=2){
            console.log("toomany")
        }
        } catch(e){
            console.log(e)
        } finally{
            doubleClick()
        }
    }
    
    //prevent multiple api calls
    const doubleClick = () =>{
        setTimeout(() =>{
            setCheck(false)
        },1000)
    }

    //handle success message
    const handleSuccessMessage = () =>{
        let x:number = 90
        let y:number = 0
        for(let i = 0;i<91;i++){
            setTimeout(()=>{
                setSuccessEffect({...successEffect,transform: `rotateY(${x}deg)`, opacity: `${y}` })
                x--
                y= y+0.02
                if(i == 90){
                    for(let o = 0; o<91;o++){
                        setTimeout(() =>{
                            setSuccessEffect({...successEffect,transform: `rotateY(${x}deg)`, opacity: `${y}` })
                            x++
                            y= y-0.02
                            if(o == 90){
                                setFirstName('')
                                setLastName('')
                                setMail('')
                                setPhone('')
                                setChecked(false)
                                setCheckedNo(false)
                                setMessage('')
                                setSuccessActive(false)
                            }
                        },o*15)
                    }
                }
            },i*15)
        }
    }

      
    return(
        <div style={{...AppStyles,...props.tempStyle}}>
            <MobileMenu />
            <div style={AppStyle}>
                <div className='contactPageHeaderContainerMobile'>
                    <h1 className='contactHeaderStyleMobile unselectable'>Contact Me</h1>
                    <p className='frontTextMobile unselectable'>If you have any questions, feel free to contact me!</p>
                </div>
                <div style={contactBoxFull}>
                    <div className='contactBoxSmallMobile'>
                        <div className='contactBoxSmallHeaderContainerMobile'>
                            <h1 className='contactBoxSmallHeaderMobile unselectable'>Contact information</h1>
                            <p className='contactBoxSmallTextMobile unselectable'>Fill up the form and i will get back to you, or contact me directly.</p>
                        </div>
                        <div className='contactBoxSmallCenterContainerMobile'>
                            <div className='contactBoxSmallCenterContainerRow'>
                                <img className='contactBoxIcon' src={phoneIcon} alt='phone icon' />
                                <p className='contactBoxInfoTextMobile'>+358 4002 16113</p>
                            </div>
                            <div style={{marginTop:"7%"}} className='contactBoxSmallCenterContainerRow'>
                                <img  className='contactBoxIcon' src={mailIcon} alt='mail icon'/>
                                <p className='contactBoxInfoTextMobile'>puntilateemu@gmail.com</p>
                            </div>
                            <div style={{marginTop:"7%"}} className='contactBoxSmallCenterContainerRow'>
                                <img  className='contactBoxIcon' src={locationIcon} alt='location icon' />
                                <p className='contactBoxInfoTextMobile'>Espoo, Finland</p>
                            </div>
                        </div>
                        <div className='iconsBoxBottomContainerMobile'>
                            <a className='iconsBoxStyleMobile' href={'https://fi.linkedin.com/in/teemu-puntila-42a60422b?trk=people-guest_people_search-card'} target={'_blank'}>
                                <img className='iconsMobileInContact'  src={linkedinIcon} alt='linkedin icon' />
                            </a>
                            <a style={{marginLeft:"9%"}}  className='iconsBoxStyleMobile' href={'https://github.com/puntilateemu'} target={'_blank'}>
                                <img className='iconsMobileInContact'  src={githubIcon} alt='github icon' />
                            </a>
                        </div>
                        <div className='contactBoxSmallBalloonMobile'></div>
                        <div className='contactBoxSmallBalloonsecondMobile'></div>
                    </div>
                        <div className='contactBoxBigContainerMobile'>
                            {successActive ? (<div style={successMessageContainer}>
                                <p style={successEffect}>Success!</p>
                                 </div>):(<></>)}
                                <div className='contactBoxFullColumnContainerMobile'>
                                    <p className='contactBoxFullTextMobile'>First Name</p>
                                    <input className='contactBoxFullInputMobile' type='text' placeholder='John' value={firstName} onChange={handleFirstName} />
                                    {nameWarningSet ? (<p style={{ color: 'red', fontSize: '2.3vh'}}>{nameWarningSet ? nameWarning : ''}</p>):(<></>)}
                                </div>
                                
                                <div className='contactBoxFullColumnContainerMobile'>
                                    <p className='contactBoxFullTextMobile'>Last Name</p>
                                    <input className='contactBoxFullInputMobile' placeholder='Doe' type='text' value={lastName} onChange={handleLastName} />
                                </div>
                            
                           
                            
                                <div className='contactBoxFullColumnContainerMobile'>
                                    <p className='contactBoxFullTextMobile'>Mail</p>
                                    <input className='contactBoxFullInputMobile' placeholder='John.Doe@mail.com' type='text' value={mail} onChange={handleMail} />
                                    {mailWarningSet ? (<p style={{ color: 'red', fontSize: '2.3vh'}}>{mailWarningSet ? mailWarning : ''}</p>):(<></>)}
                                </div>
                               
                                
                                <div className='contactBoxFullColumnContainerMobile'>
                                    <p className='contactBoxFullTextMobile'>Phone</p>
                                    <input className='contactBoxFullInputMobile' type='text' placeholder='+358 400 216113' value={phone} onChange={handlePhone} />
                                </div>
                            
                           
                            <div className='contactBoxFullRowContainermobile'>
                                <div className='contactBoxQuestionColumn'>
                                    <p className='contactBoxFullTextMobile'>Do you want me to respond with my resume?</p>
                                        <div className='contactBoxFullRowContainermobile'>
                                            <input className='contactBoxCheckbox' type='checkbox' checked={checked} onChange={handleCheckBox} />
                                            <p style={{marginLeft: '1%'}} className='contactBoxFullTextMobile'>Yes</p>
                                            <input style={{marginLeft: '10%'}} className='contactBoxCheckbox' type='checkbox' checked={checkedNo} onChange={handleCheckBoxNo} />
                                            <p style={{marginLeft: '1%'}} className='contactBoxFullTextMobile'>No</p>
                                        </div>
                                </div>
                            </div>
                            <div className='contactBoxFullRowContainermobile'>
                                <div className='contactBoxFullMessageContainer'>
                                <p className='contactBoxFullTextMobile'>Message</p>
                                <textarea style={{resize:'none'}} placeholder='Write your message...' className='contactBoxFullInputMobile' value={message} onChange={handleMessage} rows={5} />
                                </div>
                            </div>
                            <div className='contactBoxFullRowContainermobile'>
                                <div style={{pointerEvents: check ?'none' : 'all'}} className='contactBoxButtonMobile' onTouchEnd={codeRequest}>
                                    <p>Send</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
   
}


export default ContactMobile