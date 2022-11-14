import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './home'
import  Profile  from './profile';
import Contact from './contact';
import Projects from './projects';
import useWindowDimensions from './components/windowdemsions';
import HomeMobile from './homemobile';
import ProfileMobile from './profilemobile';
import ProjectsMobile from './projectsmobile';
import ContactMobile from './contactmobile';
import ErrorPage from './404page';
import './mobile.css'


function App() {

  const { width } = useWindowDimensions();
  //main routes
  if(width > 1000){
  return (
    <Routes>
      <Route path='/' element={<Home tempStyle={{backgroundColor:'black'}}/>} />
      <Route path='/profile' element={<Profile tempStyle={{backgroundColor:'black'}} />} />
      <Route path='/projects' element={<Projects tempStyle={{backgroundColor:'black'}} />} />
      <Route path='/contact' element={<Contact tempStyle={{backgroundColor:'black'}} />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
  }else{
    return(
      <Routes>
        <Route path='/' element={<HomeMobile tempStyle={{backgroundColor:'black'}}/>} />
        <Route path='/profile' element={<ProfileMobile tempStyle={{backgroundColor:'black'}}/>} />
        <Route path='/projects' element={<ProjectsMobile tempStyle={{backgroundColor:'black'}}/>} />
        <Route path='/contact' element={<ContactMobile tempStyle={{backgroundColor:'black'}}/>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    )
  }
}

export default App;
