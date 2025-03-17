import Image from "next/image";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

interface ServiceLocationCardProps {
  name: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  className?: string;
}

export const ServiceLocationCard = ({
  name,
  imageUrl,
  address,
  phone,
  email,
  className
}: ServiceLocationCardProps) => {
  return (
    <div className={`bg-white rounded-[15px] overflow-hidden shadow-sm border-gray-100 border-2 border-solid border-[##D5D3D4] ${className}`}>

      <div className="w-full h-[180px] relative">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-jakarta font-semibold">
          {name}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex gap-2">
            <MdLocationOn className="text-gray-400 flex-shrink-0 mt-1" />
            <p>{address}</p>
          </div>
          
          <div className="flex gap-2 items-center">
            <MdPhone className="text-gray-400" />
            <p>{phone}</p>
          </div>
          
          <div className="flex gap-2 items-center">
            <MdEmail className="text-gray-400" />
            <p>{email}</p>
          </div>
        </div>

        <button className="flex items-center gap-1 text-sm text-primary hover:underline">
          Lihat di Google Maps <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}; 