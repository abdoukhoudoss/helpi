
interface OptimizedImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const OptimizedImage = ({ src, alt, onClick }: OptimizedImageProps) => {
  return (
    <img
      className="mission-image"
      src={src}
      alt={alt}
      onClick={onClick}
      loading="lazy"
      style={{ cursor: 'pointer' }}
    />
  );
};

export default OptimizedImage;