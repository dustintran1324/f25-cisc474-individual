import { COLORS } from '../../constants/theme';

interface AvatarProps {
  size?: 'small' | 'large';
  imageSrc?: string;
  alt?: string;
}

const sizeClasses = {
  small: {
    container: 'w-10 h-10 border-2',
    image: 'w-7 h-7',
  },
  large: {
    container: 'w-24 h-24 border-4',
    image: 'w-16 h-16',
  },
};

export function Avatar({ size = 'small', imageSrc = '/assets/knight.svg', alt = 'Knight Avatar' }: AvatarProps) {
  const { container, image } = sizeClasses[size];

  return (
    <div
      className={`${container} rounded-full flex items-center justify-center border-black overflow-hidden`}
      style={{ backgroundColor: COLORS.primary }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={image}
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    </div>
  );
}
