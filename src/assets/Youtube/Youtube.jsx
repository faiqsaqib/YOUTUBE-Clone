import {useState, useEffect} from 'react'
import axios from 'axios';
import './yt.css'
import logoImg from './images/youtube-logo.png'
import ducky from './images/ducky.jpg'
import mooro from './images/mooro.jpg'
import hamza from './images/hamza.jpg'
import Ganji from './images/ganji swag.jpg'
import junejo from './images/junejo.jpeg'



function Youtube() {  

    const API_KEY = `AIzaSyBZMRbh9xC0E0TKreO5UJ2RLZ1ouJOi34s`;
    const API_URL = `https://www.googleapis.com/youtube/v3/search`;


    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos('')
    }, []);

    const fetchVideos = (pageToken) => {
        setLoading(true);
        axios
            .get(API_URL, {
                params: {
                    key: API_KEY,
                    q: 'Your search query', // Replace with your search query
                    type: 'video',
                    part: 'snippet',
                    maxResults: 100, // Adjust as needed
                    pageToken: pageToken,
                },
            })
            .then((response) => {
                setVideos([...videos, ...response.data.items]);
                console.log(response)
                setNextPageToken(response.data.nextPageToken);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data from YouTube API:', error);
                setLoading(false);
            });
    };
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            if (nextPageToken) {
                fetchVideos(nextPageToken);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [nextPageToken]);



  return (
    <>

    {/* ---------navbar--------- */}

    <div className="navbar">
      <div className="logo">
        <img src={logoImg} alt="YouTube Logo" />
        <h1>YouTube</h1>
      </div>
      
      <div className="search-bar">
         <input type="text" placeholder="Search" />
         <i id="searchIcon" className="fa-solid fa-magnifying-glass"></i>
      </div>

      <div className="logo nav-links" style={{display:'flex', gap:'20px'}}>
        <i className="bi bi-bell-fill"></i>
        <img src={ducky} alt="YouTube Logo" style={{borderRadius:"50px"}}/>
      </div>


    </div>

    {/* ---------sidebar--------- */}


    <div className="sidebar">
        
        <ul className="sidebar-nav">
            <li><i className="bi bi-house-door sidebar-icons"></i><a href="/">Home</a></li>
            <li><i className="bi bi-lightning sidebar-icons"></i><a href="/trending">Trending</a></li>
            <li><i className="bi bi-book sidebar-icons"></i><a href="/subscriptions">Subscriptions</a></li>
            <li><i className="bi bi-collection-play sidebar-icons"></i><a href="/library">Library</a></li>
            <li><i className="bi bi-clock-history sidebar-icons"></i><a href="/history">History</a></li>
        </ul>
        <h2 className='sub'>Subscriptions</h2>
        <ul className="sidebar-nav2">
            <li className='list'><img src={ducky} alt="" style={{borderRadius:"50px", width:'25px', height:'25px'}}/><a href="/">Irfan Junejo</a></li>
            <li className='list'><img src={mooro} alt="" style={{borderRadius:"50px", width:'25px', height:'25px'}}/><a href="/trending">Mooro</a></li>
            <li className='list'><img src={Ganji} alt="" style={{borderRadius:"50px", width:'25px', height:'25px'}}/><a href="/subscriptions">Ganji Swag</a></li>
            <li className='list'><img src={ducky} alt="" style={{borderRadius:"50px", width:'25px', height:'25px'}}/><a href="/library">Ducky Bhai</a></li>
            <li className='list'><img src={hamza} alt="" style={{borderRadius:"50px", width:'25px', height:'25px'}}/><a href="/history">Hamza Ibrahim</a></li>
        </ul>
    </div>

    <section className="main">
    <div className="main-buttons">
    <button type="button" className="btn btn-sm" style={{backgroundColor:'white', color:'black'}}>All</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Mixes</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Music</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Podcasts</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Pakistan</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Cricket</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Travel visas</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Stocks</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Computer science</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Thoughts</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Universities</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Live</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Gyms</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>Indian music</button>
    <button type="button" className="btn btn-sm" style={{backgroundColor:'#2e2a2a', color:'white'}}>k-pop</button>

    </div>


    {videos?.map((video) => {
  <div className="card-container" key={video.id.videoId}>

    <div className="card">
        <div className='thumbnail-img'>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}/>
        </div>
        <div className="card-info">
            <h2 className="video-title">{video.snippet.title}</h2>
            <p className="channel-name">Channel Name</p>
            <p className="views">1M views • 1 day ago</p>
        </div>
    </div>
    

    
  </div>
    })}

    </section>

    

      
    </>
  )
}

export default Youtube
