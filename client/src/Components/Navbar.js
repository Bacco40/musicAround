import React from "react";
import {Link,useNavigate} from 'react-router-dom';
import Logo from './Logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faMagnifyingGlass,faUser} from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faUser);


function Navbar(){
    return(
        <nav>
          <div className='logoContainer'>
            <Link to={'/'} >
              <img className='logo' src={Logo} alt='musicAround'/>
            </Link>
            <div className='navSearch'>
              <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-magnifying-glass" />
              <div>
                  <input className='search' id='searchEvent' type='text' placeholder='Search for Artist, Events, Venue or City'/>
              </div>
            </div>
          </div>
          <div className="logIn">
            <div>LogIn</div> 
            <div className="profileIcon"><FontAwesomeIcon icon="fa-solid fa-user" className="icon"/></div>
          </div>
        </nav>
    )
}
export default Navbar