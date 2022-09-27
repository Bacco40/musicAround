import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './Components/Homepage';
import EventDetail from './Components/EventDetail';
import ArtistDetail from './Components/ArtistDetail';
import Profile from './Components/Profile';
import {useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';

function App() {
  const [position, setPosition] = useState(null);

  function successCallback (position) {
    setPosition(`${position.coords.latitude},${position.coords.longitude}`); 
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successCallback);
  },[])

  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main>
      <Routes>
          <Route path='/' element={
            <HomePage 
              position={position}
            />
          }/>
          <Route path='/event/:id' element={
            <EventDetail/>
          }/>
          <Route path='/artist/:id' element={
            <ArtistDetail/>
          }/>
          <Route path='/profile/:id' element={
            <Profile/>
          }/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
