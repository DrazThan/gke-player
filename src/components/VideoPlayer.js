import React, { useState, useEffect } from 'react';
import { getVideoMetadata } from '../services/googleApi';
import config from '../config';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await getVideoMetadata(config.spreadsheetId, config.apiKey);
        setVideos(metadata);
        if (metadata.length > 0) {
          setCurrentVideo(metadata[0]);
        }
      } catch (err) {
        setError('Failed to load video metadata');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
    setError('Failed to load video. Please try again later.');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="text-center p-4">
        No videos available
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <video 
          className="w-full aspect-video"
          controls
          key={currentVideo.videoId}
          src={`${config.cdnBasePath}/${currentVideo.videoId}`}
          onError={handleVideoError}
          poster={`${config.cdnBasePath}/${currentVideo.videoId.replace(/\.[^/.]+$/, '')}_thumb.jpg`}
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
                className={`text-left p-2 rounded ${
                  currentVideo.videoId === video.videoId
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
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