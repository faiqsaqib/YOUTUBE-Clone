import  { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = `AIzaSyBZMRbh9xC0E0TKreO5UJ2RLZ1ouJOi34s`;
const API_URL = `https://www.googleapis.com/youtube/v3/search`;

function Application() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos('');
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
                    maxResults: 100000, // Adjust as needed
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
        <div className="App">
            <h1>YouTube Video List</h1>
            <ul>
                {videos?.map((video) => (
                    <li key={video.id.videoId}>
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        <h3>{video.snippet.title}</h3>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default Application;




