import React from "react";
import homePic from './homepage.jpg';
import events from './Events.png';
import artists from './Artists.png';
import SingleElement from "./singleElement";
import { useState ,useEffect} from "react";
import axios from 'axios';


function HomePage({position}){
    const emptyList =['', '', '', ''];
    const [eventsAround, setEventsAround] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prevSection, setPrevSection] = useState(null)
    const [sectionNum, setSectionNum] = useState(1)

    function changeSection(e){
        setPrevSection(sectionNum)
        if(e.target.className === 'arrow leftArrow'){
            if(sectionNum === 1){
                setSectionNum(5)
            }
            else{
                setSectionNum(sectionNum-1)
            }
        }
        else{
            if(sectionNum === 5){
                setSectionNum(1)
            }
            else{
                setSectionNum(sectionNum+1)
            }
        }
    }

    function moveToSection(e){
        setPrevSection(sectionNum);
        setSectionNum(+e.target.attributes.value.value);
    } 

    useEffect(()=>{
        if(prevSection !== null){
            if(prevSection > sectionNum){
                document.getElementById(`${sectionNum}`).classList.add("activeLeft"); 
            }
            else{
                document.getElementById(`${sectionNum}`).classList.add("activeRight"); 
            }
            const selected = document.querySelectorAll('.selectedSection');
            
            for(let i = 0; i < selected.length; i++){
                if(+selected[i].attributes.value.value === sectionNum){
                    selected[i].style.cssText = 'background-color: #ffff';
                }
                else{
                    selected[i].style.cssText = 'background-color: black';  
                }
            }
        }
    },[sectionNum])

    useEffect(()=>{
        if(eventsAround !== null){
            const selected = document.querySelectorAll('.selectedSection');
            selected[0].style.cssText = 'background-color: #ffff';
        }
    },[eventsAround])

    useEffect(()=>{
        if(position !== null && eventsAround === null){
            axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_TICKETMASTER_KEY}&latlong=${position}&locale=*&segmentName=music&genreId=KnvZfZ7vAvF` )
            .then(res => {
                if(res.data){
                    setEventsAround(res.data._embedded.events);
                    setLoading(false);
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
                    {eventsAround && loading === false &&
                    <>
                        <div className="arrow leftArrow" value={sectionNum} onClick={(e)=>changeSection(e)}>‹</div>
                        {sectionNum === 1 &&
                            <div className="section" id={sectionNum}>
                                {eventsAround.map((singleElement,index)=>(
                                    <React.Fragment key={index}>
                                        {index <= 3 &&
                                            <SingleElement singleElement={singleElement}/>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {sectionNum === 2 &&
                            <div className="section" id={sectionNum}>
                                {eventsAround && eventsAround.map((singleElement,index)=>(
                                    <React.Fragment key={index}>
                                        {index <= 7 && index > 3 &&
                                            <SingleElement singleElement={singleElement}/>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {sectionNum === 3 &&
                            <div className="section" id={sectionNum}>
                                {eventsAround && eventsAround.map((singleElement,index)=>(
                                    <React.Fragment key={index}>
                                        {index <= 11 && index > 7 &&
                                            <SingleElement singleElement={singleElement}/>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {sectionNum === 4 &&
                            <div className="section" id={sectionNum}>
                                {eventsAround && eventsAround.map((singleElement,index)=>(
                                    <React.Fragment key={index}>
                                        {index <= 15 && index > 11 &&
                                            <SingleElement singleElement={singleElement}/>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        {sectionNum === 5 &&
                            <div className="section" id={sectionNum}>
                                {eventsAround && eventsAround.map((singleElement,index)=>(
                                    <React.Fragment key={index}>
                                        {index <= 19 && index > 15 &&
                                            <SingleElement singleElement={singleElement}/>
                                        }
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        <div className="arrow rigthArrow" value={sectionNum} onClick={(e)=>changeSection(e)}>›</div>
                    </>
                    }
                    {loading === true &&
                        <div className="section">
                            {emptyList.map((singleElement,index)=>(
                                <div className="singleElementContainer" key={index}>
                                    <div className="emptyPic"></div>
                                    <div className="emptyDesc">
                                        <div className="fakeText1"></div>
                                        <div className="fakeText2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="selectedPage">
                    <div className="selectedContainer" value='1' onClick={(e) => moveToSection(e) }>
                        <div className="selectedSection" value='1'></div>
                    </div>
                    <div className="selectedContainer" value='2' onClick={(e) => moveToSection(e) }>
                        <div className="selectedSection" value='2'></div>
                    </div>
                    <div className="selectedContainer" value='3' onClick={(e) => moveToSection(e) }>
                        <div className="selectedSection" value='3'></div>
                    </div>
                    <div className="selectedContainer" value='4' onClick={(e) => moveToSection(e) }>
                        <div className="selectedSection" value='4'></div>
                    </div>
                    <div className="selectedContainer" value='5' onClick={(e) => moveToSection(e) }>
                        <div className="selectedSection" value='5'></div>
                    </div>
                </div>
            </section>
            <section className="artistSection">
                <div className="eventSectionTitle">
                    <img src={artists} alt='Popular artists'/>
                    <hr className="hrHome"/>
                </div>
            </section>
        </div>
    )
}
export default HomePage