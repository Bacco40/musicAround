import './App.css';
import Navbar from './Components/Navbar';
import HomePage from './Components/Homepage';
import {useEffect, useState} from 'react';

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
        <HomePage 
          position={position}
        />
      </main>
    </div>
  );
}

export default App;
