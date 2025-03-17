import Image from "next/image";
import { MdAccessTime } from "react-icons/md";

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
  time: string;
  isAvailable?: boolean;
  className?: string;
}

export const DoctorCard = ({
  name,
  specialty,
  imageUrl,
  time,
  isAvailable = true,
  className
}: DoctorCardProps) => {
  return (
    <div className={`bg-white rounded-[20px] p-4 shadow-sm w-[280px] border-2 border-solid border-[##D5D3D4] ${className}`}>
      <div className="space-y-4">

        <div className="w-full h-[200px] relative rounded-[15px] overflow-hidden">
          <Image 
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-jakarta font-semibold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{specialty}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MdAccessTime />
            <span>{time}</span>
          </div>
        </div>

        <button 
          className={`w-full py-2 px-4 rounded-[10px] font-medium text-sm
            ${isAvailable 
              ? 'bg-button text-white hover:bg-opacity-90' 
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
        >
          {isAvailable ? 'Kontak' : 'Belum Tersedia'}
        </button>
      </div>
    </div>
  );
}; 