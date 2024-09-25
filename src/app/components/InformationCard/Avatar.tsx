import Image from 'next/image';

interface AvatarProps {
  id: number;
  name: string;
  image: string | null;
  className?: string;
}

const Avatar = ({ name, image, className }: AvatarProps) => {
  return (
    <div className={`relative ${className} object-cover`}>
      <Image
        className='rounded-full'
        src={image || '/images/profile.svg'}
        alt={name}
        fill
      />
    </div>
  );
};

export default Avatar;
