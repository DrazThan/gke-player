import React from 'react';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold">Cloud Video Player</h1>
        </div>
      </header>
      <main className="py-8">
        <VideoPlayer />
      </main>
    </div>
  );
}

export default App;