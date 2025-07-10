import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://via.placeholder.com/400x400/374151/ffffff?text=Red1One',
  onLoad,
  onError,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Update src when prop changes
  useEffect(() => {
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // Optimize image URL
  const getOptimizedSrc = useCallback((url: string) => {
    if (url.includes('via.placeholder.com') || url.includes('placeholder')) {
      return url;
    }

    // For external images, add optimization parameters
    if (url.startsWith('http')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=400&h=400&q=${quality}&f=webp`;
    }

    return url;
  }, [quality]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      onError?.();
    }
  }, [hasError, fallbackSrc, onError]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Actual Image */}
      {isVisible && (
        <img
          src={getOptimizedSrc(imageSrc)}
          alt={alt}
          className={`transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div>فشل تحميل الصورة</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;