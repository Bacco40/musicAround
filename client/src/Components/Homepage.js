import React from "react";
import homePic from './homepage.jpg';
import events from './Events.png';
import artists from './Artists.png';
import Carousel from "./Carousel";
import HomeNav from "./homeNav";
import { useState ,useEffect} from "react";
import axios from 'axios';


function HomePage({position, token}){
    const [eventsAround, setEventsAround] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [prevSection, setPrevSection] = useState(null);
    const [prevSection1, setPrevSection1] = useState(null);
    const [sectionNum, setSectionNum] = useState(1);
    const [sectionNum1, setSectionNum1] = useState(1);


    function changeSection(e){
        if(e.target.className === 'arrow leftArrow'){
            if(e.target.id === 'eventCarousel'){
                setPrevSection(sectionNum)
                if(sectionNum === 1){
                    setSectionNum(5)
                }
                else{
                    setSectionNum(sectionNum-1)
                }
            }
            if(e.target.id === 'artistCarousel'){
                setPrevSection1(sectionNum1)
                if(sectionNum1 === 1){
                    setSectionNum1(5)
                }
                else{
                    setSectionNum1(sectionNum1-1)
                }
            }
        }
        else{
            if(e.target.id === 'eventCarousel'){
                setPrevSection(sectionNum)
                if(sectionNum === 5){
                    setSectionNum(1)
                }
                else{
                    setSectionNum(sectionNum+1)
                }
            }
            else{
                setPrevSection1(sectionNum1)
                if(sectionNum1 === 5){
                    setSectionNum1(1)
                }
                else{
                    setSectionNum1(sectionNum1+1)
                } 
            }
        }
    }

    function moveToSection(e){
        if(loading === false){
            setPrevSection(sectionNum);
            setSectionNum(+e.target.attributes.value.value);
        }
    } 

    function moveToSection1(e){
        if(loading1 === false){
            setPrevSection1(sectionNum1);
            setSectionNum1(+e.target.attributes.value.value);
        }
    }

    async function recoveArtists(data){
        let idList = [];
        let artistList = [];
        for(let i=0;i<data.tracks.length; i++){
            idList.indexOf(data.tracks[i].artists[0].id) === -1 ? idList.push(data.tracks[i].artists[0].id) : console.log("This item already exists");
        }
        for(let a=0; a<20; a++){
            await axios.get(`https://api.spotify.com/v1/artists/${idList[a]}`, {
                headers: {
                'Authorization': `Bearer ${token}` 
                }}
            )
            .then(res => {
                if(res.data){
                    artistList.push({
                        type: "artist",
                        name: res.data.name,
                        id: res.data.id,
                        genres: res.data.genres,
                        images: res.data.images
                    })
                }
            }
            ) 
        }
        setTopArtists(artistList);
        setLoading1(false);
    }

    useEffect(()=>{
        if(prevSection !== null){
            if(prevSection > sectionNum){
                document.getElementById(`sectionEvents${sectionNum}`).classList.add("activeLeft"); 
            }
            else{
                document.getElementById(`sectionEvents${sectionNum}`).classList.add("activeRight"); 
            }
            const selected = document.querySelectorAll('.selectedSectionEvents');
            
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
        if(prevSection1 !== null){
            if(prevSection1 > sectionNum1){
                document.getElementById(`sectionArtist${sectionNum1}`).classList.add("activeLeft"); 
            }
            else{
                document.getElementById(`sectionArtist${sectionNum1}`).classList.add("activeRight"); 
            }
            const selected = document.querySelectorAll('.selectedSectionArtists');
            
            for(let i = 0; i < selected.length; i++){
                if(+selected[i].attributes.value.value === sectionNum1){
                    selected[i].style.cssText = 'background-color: #ffff';
                }
                else{
                    selected[i].style.cssText = 'background-color: black';  
                }
            }
        }
    },[sectionNum1])

    useEffect(()=>{
        if(eventsAround !== null && sectionNum === 1){
            const selected = document.querySelectorAll('.selectedSectionEvents');
            selected[0].style.cssText = 'background-color: #ffff';
        }
        if(topArtists !== null && sectionNum === 1){
            const selected = document.querySelectorAll('.selectedSectionArtists');
            selected[0].style.cssText = 'background-color: #ffff';
        }
    },[eventsAround, topArtists])

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

    useEffect(()=>{
        if(token !== null && topArtists === null){
            axios.get(`https://api.spotify.com/v1/recommendations?limit=30&market=IT&seed_artists=1h6Cn3P4NGzXbaXidqURXs&seed_genres=edm&min_popularity=20`, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }}
            )
            .then(res => {
                if(res.data){
                    recoveArtists(res.data)
                }
            })
        }
    },[token,topArtists])

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
                    <Carousel
                        elementArray = {eventsAround}
                        sectionNum = {sectionNum}
                        changeSection = {changeSection}
                        linkTo = {"event"}
                        loading = {loading}
                    />
                </div>
                <HomeNav
                    moveToSection = {moveToSection}
                    linkedTo = {"event"}
                />
            </section>
            <section className="artistSection">
                <div className="eventSectionTitle">
                    <img src={artists} alt='Popular artists'/>
                    <hr className="hrHome"/>
                </div>
                <div className="eventContainer">
                    <Carousel
                      elementArray = {topArtists}
                      sectionNum = {sectionNum1}
                      changeSection = {changeSection}
                      linkTo = {"artist"}
                      loading = {loading1}
                    />
                </div>
                <HomeNav
                    moveToSection = {moveToSection1}
                    linkedTo = {"artist"}
                />
            </section>
        </div>
    )
}
export default HomePage