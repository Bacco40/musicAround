import React from "react";
import homePic from './homepage.jpg';
import events from './Events.png';
import artists from './Artists.png';
import SingleElement from "./singleElement";
import { useState ,useEffect} from "react";
import axios from 'axios';


function HomePage({position}){
    const [eventsAround, setEventsAround] = useState(null);

    useEffect(()=>{
        if(position !== null && eventsAround === null){
            axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=pX4NchxvosGN9fS4OOJNRqOI4WwBg1W8&latlong=${position}&locale=*&segmentName=music&genreId=KnvZfZ7vAvF` )
            .then(res => {
                if(res.data){
                    console.log(res.data._embedded.events)
                    setEventsAround(res.data._embedded.events)
                }
            }) 
        }
    },[position])

    return(
        <div className="home">
            <div className="concertPicContainer">
                <img className="homePic" src={homePic} alt='people at a concert'/>
                <div className="picSubtitle"><span>Discover The Best Electronics Events And Artists On <br/> Music-Around</span></div>
            </div>
            <section className="eventSection">
                <div className="eventSectionTitle">
                    <img src={events} alt='Events around You'/>
                    <hr className="hrHome"/>
                </div>
                <div className="eventContainer">
                    {eventsAround &&
                    <>
                        <div className="section1" id="section1">
                            <a href="#section5" className="arrow leftArrow">‹</a>
                            {eventsAround.map((singleElement,index)=>(
                                <React.Fragment key={index}>
                                    {index <= 3 &&
                                        <SingleElement singleElement={singleElement}/>
                                    }
                                </React.Fragment>
                            ))}
                            <a href="#section2" className="arrow rigthArrow">›</a>
                        </div>
                        <div className="section2" id="section2">
                            <a href="#section1" className="arrow leftArrow">‹</a>
                            {eventsAround && eventsAround.map((singleElement,index)=>(
                                <React.Fragment key={index}>
                                    {index <= 7 && index > 3 &&
                                        <SingleElement singleElement={singleElement}/>
                                    }
                                </React.Fragment>
                            ))}
                            <a href="#section3" className="arrow rigthArrow">›</a>
                        </div>
                        <div className="section3" id="section3">
                            <a href="#section2" className="arrow leftArrow">‹</a>
                            {eventsAround && eventsAround.map((singleElement,index)=>(
                                <React.Fragment key={index}>
                                    {index <= 11 && index > 7 &&
                                        <SingleElement singleElement={singleElement}/>
                                    }
                                </React.Fragment>
                            ))}
                            <a href="#section4" className="arrow rigthArrow">›</a>
                        </div>
                        <div className="section4" id="section4">
                            <a href="#section3" className="arrow leftArrow">‹</a>
                            {eventsAround && eventsAround.map((singleElement,index)=>(
                                <React.Fragment key={index}>
                                    {index <= 15 && index > 11 &&
                                        <SingleElement singleElement={singleElement}/>
                                    }
                                </React.Fragment>
                            ))}
                            <a href="#section5" className="arrow rigthArrow">›</a>
                        </div>
                        <div className="section5" id="section5">
                            <a href="#section4" className="arrow leftArrow">‹</a>
                            {eventsAround && eventsAround.map((singleElement,index)=>(
                                <React.Fragment key={index}>
                                    {index <= 19 && index > 15 &&
                                        <SingleElement singleElement={singleElement}/>
                                    }
                                </React.Fragment>
                            ))}
                            <a href="#section1" className="arrow rigthArrow">›</a>
                        </div>
                    </>
                    }
                </div>
            </section>
            <section className="eventSection">
                <div className="eventSectionTitle">
                    <img src={artists} alt='Popular artists'/>
                    <hr className="hrHome"/>
                </div>
            </section>
        </div>
    )
}
export default HomePage