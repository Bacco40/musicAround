import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './Components/Homepage';
import EventDetail from './Components/EventDetail';
import ArtistDetail from './Components/ArtistDetail';
import Profile from './Components/Profile';
import axios from "axios";
import qs from 'qs';
import {useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';
import LocationDetail from './Components/LocationDetail';

function App() {
  const [position, setPosition] = useState(null);
  const [token, setToken] = useState(null);

  function successCallback (position) {
    setPosition(`${position.coords.latitude},${position.coords.longitude}`); 
  }

  async function getToken(){
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
        auth: {
        username: process.env.REACT_APP_CLIENT_ID_SPOTIFY,
        password: process.env.REACT_APP_SPOTIFY_SECRET_KEY,
      },
    };
    const data = {
        grant_type: 'client_credentials',
    };
    const res = await axios.post('https://accounts.spotify.com/api/token' , qs.stringify(data), headers)
    setToken(res.data.access_token);
  } 

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(successCallback);
  },[])

  useEffect(()=>{
    getToken()
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
              getToken={getToken}
              token={token}
            />
          }/>
          <Route path='/event/:id' element={
            <EventDetail
              token={token}
              getToken={getToken}
            />
          }/>
          <Route path='/artist/:id' element={
            <ArtistDetail
              token={token}
              getToken={getToken}
            />
          }/>
          <Route path='/profile/:id' element={
            <Profile/>
          }/>
          <Route path='/location/:id' element={
            <LocationDetail/>
          }/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
