import blogfeelLogo from './assets/blogfeelLogo.svg'
import portfolioLogo from './assets/portfolio.png'
import newProject from './assets/new_project.png'


const projectsItems: {id: number, image: string, header:string, intro:string,button1:string, button2:string, button3:string, button4:string, link:string}[] =[
    {id:1, image: blogfeelLogo, header:'Blogging App', intro: 'Blog-app made with React-Native, available now at google play store!',
    button1: 'React-Native', button2: 'Android/ios', button3: 'CSS', button4: 'JS', link: '' },
    {id:2, image: portfolioLogo, header:'Portfolio Site', intro: 'Portfolio-site made with React and TypeScript.',
     button1: 'TypeScript',  button2: 'React', button3: 'CSS', button4: 'JS', link: ''},
    {id:3, image: newProject, header:'Your Project Here?', intro: 'Your project here? Contact me!', button1: 'Contact me',
     button2: '', button3: '', button4: '', link: 'https://puntilachain.com/contact'},
    {id:4, image: blogfeelLogo, header:'Blogging App', intro: 'Blog-app made with React-Native, available now at google play store!',
     button1: 'React-Native', button2: 'Android/ios', button3: 'CSS', button4: 'JS', link: ''},
    {id:5, image: portfolioLogo, header:'Portfolio Site', intro: 'Portfolio-site made with React and TypeScript.',
     button1: 'TypeScript',  button2: 'React', button3: 'CSS', button4: 'JS', link: ''},
    {id:6, image: newProject, header:'Your Project Here?', intro: 'Your project here? Contact me!',
     button1: 'Contact me', button2: '', button3: '', button4: '', link: 'https://puntilachain.com/contact'},
    
    


]

export default projectsItems