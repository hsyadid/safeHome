import Image from "next/image";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useAuth } from "@/../lib/auth";
import AdminActions from "@/../components/ui/adminActions";

interface ServiceLocationCardProps {
  id?: number;
  name: string;
  imageUrl: string;
  address: string;
  phone: string;
  email: string;
  gmapsUrl: string;
  distance?: string;
  className?: string;
  onEdit?: (location: any) => void;
  onDelete?: (id: number) => void;
}

export const ServiceLocationCard = ({
  id,
  name,
  imageUrl,
  address,
  phone,
  email,
  gmapsUrl,
  distance,
  className,
  onEdit,
  onDelete
}: ServiceLocationCardProps) => {
  const { isAdmin } = useAuth();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`group bg-[#f0eee4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#4F1718]/20 transform hover:-translate-y-1 h-[540px] flex flex-col ${className}`}>
      {/* Image Container with Overlay */}
      <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="absolute top-3 left-3">
            <AdminActions
              onEdit={() => onEdit?.({ id, name, imageUrl, address, phone, email, gmapsUrl })}
              onDelete={() => onDelete?.(id!)}
              itemType="layanan"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        )}

        {/* Distance Badge */}
        {distance && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/20">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-800">
                  {distance} km
                </span>
              </div>
            </div>
          </div>
        )}    
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Title - Fixed height for 2 lines */}
        <div className="h-12"> {/* Fixed height to accommodate 2 lines */}
          <h3 
            className="font-jakarta font-bold text-lg text-gray-900 leading-tight group-hover:text-[#4F1718] transition-colors duration-200 line-clamp-2" 
            title={name}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {name}
          </h3>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-3 flex-1">
          <div className="flex gap-3 items-start">
            <div className="bg-red-50 rounded-lg p-2 flex-shrink-0">
              <MdLocationOn className="text-red-500 text-sm" />
            </div>
            <div className="flex-1 h-10"> {/* Fixed height for 2 lines */}
              <p 
                className="text-sm text-gray-600 leading-relaxed line-clamp-2" 
                title={address}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {address}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="bg-blue-50 rounded-lg p-2 flex-shrink-0">
              <MdPhone className="text-blue-500 text-sm" />
            </div>
            <p className="text-sm text-gray-600 font-medium">{phone}</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="bg-green-50 rounded-lg p-2 flex-shrink-0">
              <MdEmail className="text-green-500 text-sm" />
            </div>
            <p className="text-sm text-gray-600 flex-1" title={email}>
              {truncateText(email, 25)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <a 
            href={gmapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <span>Lihat di Google Maps</span>
            <FaChevronRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}; 