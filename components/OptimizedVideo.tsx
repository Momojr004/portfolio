import React, { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    poster?: string;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
    src,
    className = '',
    autoPlay = false,
    poster
}) => {
    const [isInView, setIsInView] = useState(false);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Observer pour détecter quand la vidéo entre dans le viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    // Auto-play seulement au survol si la vidéo est visible
                    if (autoPlay && isHovered) {
                        videoRef.current?.play();
                    }
                } else {
                    setIsInView(false);
                    // Pause la vidéo si elle sort du viewport
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [autoPlay, isHovered]);

    // Gestion du survol
    useEffect(() => {
        if (isInView && isHovered && autoPlay && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        } else if (!isHovered && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isHovered, isInView, autoPlay]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Placeholder avant chargement */}
            {!isInView && (
                <div className="w-full h-full bg-zinc-800 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-[#F5B731]/20 border-t-[#F5B731] rounded-full animate-spin"></div>
                </div>
            )}

            {/* Vidéo chargée seulement si visible */}
            {isInView && (
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={poster}
                    className={className}
                    onLoadedData={() => {
                        // Auto-play seulement au survol
                        if (isHovered && autoPlay) {
                            videoRef.current?.play();
                            setIsPlaying(true);
                        }
                    }}
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Indicateur de lecture */}
            {isInView && !isPlaying && isHovered && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-[2rem] md:rounded-[3rem]">
                    <div className="w-12 h-12 bg-[#F5B731] rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5v14l11-7L8 5z" fill="black" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptimizedVideo;