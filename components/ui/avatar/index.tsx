import Image from 'next/image';
import userImg from '../../../public/user.png';

interface AvatarProps {
  src?: string;
  name?: string;
  isAnonymous?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl'
};

export default function Avatar({ 
  src, 
  name, 
  isAnonymous = false, 
  size = 'md',
  className = ''
}: AvatarProps) {
  const sizeClass = sizeClasses[size];
  
  // Jika anonymous, selalu gunakan default image
  if (isAnonymous) {
    return (
      <div className={`relative overflow-hidden rounded-full ${sizeClass} ${className}`}>
        <Image 
          src={userImg}
          alt="Anonymous"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Jika ada src (foto profil), gunakan foto
  if (src && src !== '/user.png' && !src.includes('user.png')) {
    return (
      <div className={`relative overflow-hidden rounded-full ${sizeClass} ${className}`}>
        <Image 
          src={src}
          alt={name || 'Profile'}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Jika tidak ada foto profil dan tidak anonymous, gunakan initial nama
  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const names = fullName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  };

  const initials = getInitials(name || 'User');
  
  // Generate warna berdasarkan nama
  const getBackgroundColor = (str: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-gray-500', 'bg-orange-500', 'bg-teal-500'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const bgColor = getBackgroundColor(name || 'User');

  return (
    <div className={`${sizeClass} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold ${className}`}>
      {initials}
    </div>
  );
} 