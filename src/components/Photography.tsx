import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Photography.css'

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
    caption: 'Hoi An Ancient Town, Vietnam'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
    caption: 'Senso-ji Temple, Tokyo, Japan'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    caption: 'Ha Long Bay, Vietnam'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    caption: 'Mount Fuji, Japan'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    caption: 'Shibuya Crossing, Tokyo'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1557667507-6b013b0e7c3f',
    caption: 'Hanoi Train Street, Vietnam'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc',
    caption: 'Bamboo Forest, Kyoto'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    caption: 'Fushimi Inari Shrine, Kyoto'
  }
];

const Photography: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // Preload all images before showing any
  useEffect(() => {
    let mounted = true;
    const imagePromises = photos.map(photo => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = photo.url;
        img.onload = () => {
          if (mounted) {
            setLoadedImages(prev => [...prev, photo.url]);
            resolve(img);
          }
        };
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        if (mounted) {
          setImagesLoaded(true);
        }
      })
      .catch(error => console.error('Error loading images:', error));

    return () => {
      mounted = false;
    };
  }, []);

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  if (!imagesLoaded) {
    return (
      <div className="photography-container">
        <h1>Photography</h1>
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">
            Loading images... ({loadedImages.length}/{photos.length})
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="photography-container">
      <h1>Photography</h1>
      
      <div className="carousel">
        <button 
          className="carousel-button prev" 
          onClick={prevSlide}
          aria-label="Previous photo"
        >
          &larr;
        </button>

        <div className="carousel-content">
          <img 
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className={`carousel-image ${direction ? `slide-${direction}` : ''}`}
          />
          <p className="carousel-caption">
            {photos[currentIndex].caption}
          </p>
        </div>

        <button 
          className="carousel-button next"
          onClick={nextSlide}
          aria-label="Next photo"
        >
          &rarr;
        </button>

        <div className="carousel-indicators">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="back-link">
        <Link to="/">&larr; back</Link>
      </div>
    </div>
  )
}

export default Photography