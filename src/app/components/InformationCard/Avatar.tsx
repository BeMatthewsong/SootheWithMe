import Image from 'next/image';

interface AvatarProps {
  id: number;
  name: string;
  image: string;
  className?: string;
}

const Avatar = ({ id, name, image, className }: AvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        className='rounded-full'
        src={image}
        alt={name}
        fill
        objectFit='cover'
      />
    </div>
  );
};

export default Avatar;
