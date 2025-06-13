'use client'

import Image from "next/image";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaChevronRight, FaBalanceScale } from "react-icons/fa";
import { DEFAULT_IMAGES } from "../../../lib/constants";
import { useAuth } from "../../../lib/auth";
import AdminActions from "../adminActions";

interface LawFirm {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  imageUrl?: string | null;
  gmapsUrl: string;
}

interface LawFirmCardProps {
  lawFirm: LawFirm;
  onEdit?: (lawFirm: LawFirm) => void;
  onDelete?: (id: number) => Promise<void>;
}

const LawFirmCard: React.FC<LawFirmCardProps> = ({ lawFirm, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`group bg-[#f0eee4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#4F1718]/20 transform hover:-translate-y-1 h-[505px] md:h-[490px] flex flex-col`}>
      {/* Image Container with Overlay */}
      <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
        <Image 
          src={lawFirm.imageUrl || DEFAULT_IMAGES.HUKUM}
          alt={lawFirm.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="absolute top-3 left-3">
            <AdminActions
              onEdit={() => onEdit?.(lawFirm)}
              onDelete={() => onDelete?.(lawFirm.id)}
              itemType="lembaga hukum"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        )}

        {/* Service Type Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-blue-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/20">
            <div className="flex items-center gap-1">
              <FaBalanceScale className="text-white text-xs" />
              <span className="text-xs font-semibold text-white">
                Hukum
              </span>
            </div>
          </div>
        </div>    
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Title - Fixed height for 2 lines with text-left */}
        <div className="h-12"> {/* Fixed height to accommodate 2 lines */}
          <h3 
            className="font-jakarta font-bold text-lg text-gray-900 leading-tight group-hover:text-[#4F1718] transition-colors duration-200 line-clamp-2 text-left" 
            title={lawFirm.name}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {lawFirm.name}
          </h3>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-3 flex-1">
          {lawFirm.phone && (
            <div className="flex gap-3 items-center">
              <div className="bg-green-50 rounded-lg p-2 flex-shrink-0">
                <MdPhone className="text-green-500 text-sm" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{lawFirm.phone}</p>
            </div>
          )}
          
          <div className="flex gap-3 items-center">
            <div className="bg-red-50 rounded-lg p-2 flex-shrink-0">
              <MdEmail className="text-red-500 text-sm" />
            </div>
            <p className="text-sm text-gray-600 flex-1" title={lawFirm.email || '-'}>
              {lawFirm.email && lawFirm.email !== '-' ? truncateText(lawFirm.email, 25) : '-'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <a 
            href={lawFirm.gmapsUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <span>
              Lihat di Google Maps
            </span>
            <FaChevronRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LawFirmCard; 