import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  lazy?: boolean;
  threshold?: number;
  blurhash?: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  onClick?: () => void;
}

const ImageContainer = styled.div<{
  $width?: string;
  $height?: string;
  $aspectRatio?: string;
}>`
  position: relative;
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || 'auto'};
  aspect-ratio: ${props => props.$aspectRatio || 'auto'};
  overflow: hidden;
  background-color: #f0f0f0;
`;

const StyledImg = styled.img<{
  $loaded: boolean;
  $objectFit: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.$objectFit};
  transition: opacity 0.3s ease;
  opacity: ${props => (props.$loaded ? 1 : 0)};
`;

const Placeholder = styled.div<{
  $blurhash?: string;
  $loaded: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  background-image: ${props => props.$blurhash ? `url(${props.$blurhash})` : 'none'};
  background-size: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => (props.$loaded ? 0 : 1)};
`;

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  objectFit = 'cover',
  lazy = true,
  threshold = 0.1,
  blurhash,
  srcSet,
  sizes,
  className,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(!lazy);

  useEffect(() => {
    if (!lazy) {
      return;
    }

    const imgElement = document.createElement('img');
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentElement = document.querySelector(`[data-img-src="${src}"]`);
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, lazy, threshold]);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <ImageContainer
      $width={width}
      $height={height}
      $aspectRatio={aspectRatio}
      className={className}
      onClick={onClick}
      data-img-src={src}
    >
      <Placeholder $blurhash={blurhash} $loaded={loaded} />
      {isIntersecting && (
        <StyledImg
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          $loaded={loaded}
          $objectFit={objectFit}
        />
      )}
    </ImageContainer>
  );
};

export default memo(Image); 