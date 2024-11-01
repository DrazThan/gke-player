import React, { useState, useEffect } from 'react';
import { getVideoMetadata } from '../services/googleApi';
import config from '../config';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getVideoMetadata(config.spreadsheetId);
      setVideos(metadata);
      if (metadata.length > 0) {
        setCurrentVideo(metadata[0]);
      }
    };

    fetchMetadata();
  }, []);

  if (!currentVideo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <video 
          className="w-full aspect-video"
          controls
          src={`${config.cdnBasePath}/${currentVideo.videoId}`}
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
          <p className="text-gray-600">{currentVideo.description}</p>
        </div>

        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold mb-2">More Videos</h3>
          <div className="grid gap-4">
            {videos.map((video) => (
              <button
                key={video.videoId}
                className="text-left hover:bg-gray-100 p-2 rounded"
                onClick={() => setCurrentVideo(video)}
              >
                {video.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;