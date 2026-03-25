import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkM5IDI2IDkgMjYgOSAyNlMxMyAxNyAyMCAxN1MyNyAyNiAyMCAyNloiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const [error, setError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (priority) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setError(true);
        setIsLoaded(true);
    };

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Placeholder pendant le chargement */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
                    style={{ width, height }}
                >
                    <img
                        src={placeholder}
                        alt=""
                        className="w-8 h-8 opacity-50"
                    />
                </div>
            )}

            {/* Image principale */}
            {isInView && (
                <img
                    ref={imgRef}
                    src={error ? placeholder : src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`
            transition-opacity duration-500 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
                    style={{
                        ...(width && height && {
                            aspectRatio: `${width}/${height}`
                        })
                    }}
                />
            )}
        </div>
    );
};

export default OptimizedImage;