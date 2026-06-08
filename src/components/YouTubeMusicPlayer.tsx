import React, { useEffect, useState } from 'react';

const YOUTUBE_VIDEO_ID = '7OoQyEmgDl0';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&playsinline=1&controls=0&modestbranding=1&rel=0&enablejsapi=1`;

interface YouTubeMusicPlayerProps {
  className?: string;
}

export function YouTubeMusicPlayer({ className = '' }: YouTubeMusicPlayerProps) {
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    const retryAutoplay = () => setPlayerKey((current) => current + 1);

    window.addEventListener('pointerdown', retryAutoplay, { once: true });
    window.addEventListener('keydown', retryAutoplay, { once: true });

    return () => {
      window.removeEventListener('pointerdown', retryAutoplay);
      window.removeEventListener('keydown', retryAutoplay);
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute h-px w-px overflow-hidden opacity-0 ${className}`} aria-hidden="true">
      <iframe
        key={playerKey}
        className="h-px w-px"
        src={YOUTUBE_EMBED_URL}
        title="Musik latar Nusa Culinary dari YouTube"
        allow="autoplay; encrypted-media"
        tabIndex={-1}
      />
    </div>
  );
}
