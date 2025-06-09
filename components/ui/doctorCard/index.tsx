"use client"

import Image from "next/image";
import { MdPhone, MdEmail, MdAccessTime } from "react-icons/md";
import { FaChevronRight, FaUserMd } from "react-icons/fa";
import { DEFAULT_IMAGES } from "../../../lib/constants";
import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import AdminActions from "../adminActions";

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
    imageUrl?: string | null;
    gmapsUrl: string;
  };
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [isWithinHours, setIsWithinHours] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const checkOperatingHours = () => {
      if (!doctor.startTime || !doctor.endTime) {
        setIsWithinHours(true); // Default to available if no time specified
        return;
      }
      
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const start = new Date(doctor.startTime);
      const end = new Date(doctor.endTime);
      
      const startHour = start.getHours();
      const startMinute = start.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();
      
      const currentTime = currentHour * 60 + currentMinute;
      const startTimeMinutes = startHour * 60 + startMinute;
      const endTimeMinutes = endHour * 60 + endMinute;
      
      setIsWithinHours(currentTime >= startTimeMinutes && currentTime <= endTimeMinutes);
    };

    checkOperatingHours();
    // Update setiap menit
    const interval = setInterval(checkOperatingHours, 60000);
    
    return () => clearInterval(interval);
  }, [doctor.startTime, doctor.endTime]);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`group bg-[#f0eee4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#4F1718]/20 transform hover:-translate-y-1 h-[480px] flex flex-col`}>
      {/* Image Container with Overlay */}
      <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
        <Image 
          src={doctor.imageUrl || DEFAULT_IMAGES.PSIKOLOG}
          alt={doctor.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="absolute top-3 left-3">
            <AdminActions
              onEdit={() => onEdit?.({ id: doctor.id, name: doctor.name, specialty: doctor.specialty, phone: doctor.phone, email: doctor.email, imageUrl: doctor.imageUrl, startTime: doctor.startTime, endTime: doctor.endTime, gmapsUrl: doctor.gmapsUrl, isAvailable: doctor.isAvailable })}
              onDelete={() => onDelete?.(doctor.id)}
              itemType="dokter"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        )}

            
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Title - Fixed height for 2 lines */}
        <div className="h-12"> {/* Fixed height to accommodate 2 lines */}
          <h3 
            className="font-jakarta font-bold text-lg text-gray-900 leading-tight group-hover:text-[#4F1718] transition-colors duration-200 line-clamp-2 text-left" 
            title={doctor.name}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {doctor.name}
          </h3>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-3 flex-1">
          {doctor.specialty && (
            <div className="flex gap-3 items-start">
              <div className="bg-blue-50 rounded-lg p-2 flex-shrink-0">
                <FaUserMd className="text-blue-500 text-sm" />
              </div>
              <div className="flex-1 h-10"> {/* Fixed height for 2 lines */}
                <p 
                  className="text-sm text-gray-600 leading-relaxed line-clamp-2" 
                  title={doctor.specialty}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {doctor.specialty}
                </p>
              </div>
            </div>
          )}
          
          {doctor.phone && (
            <div className="flex gap-3 items-center">
              <div className="bg-green-50 rounded-lg p-2 flex-shrink-0">
                <MdPhone className="text-green-500 text-sm" />
              </div>
              <p className="text-sm text-gray-600 font-medium">{doctor.phone}</p>
            </div>
          )}
          
          <div className="flex gap-3 items-center">
            <div className="bg-red-50 rounded-lg p-2 flex-shrink-0">
              <MdEmail className="text-red-500 text-sm" />
            </div>
            <p className="text-sm text-gray-600 flex-1" title={doctor.email || '-'}>
              {doctor.email && doctor.email !== '-' ? truncateText(doctor.email, 25) : '-'}
            </p>
          </div>

          {doctor.startTime && doctor.endTime && (
            <div className="flex gap-3 items-center">
              <div className="bg-purple-50 rounded-lg p-2 flex-shrink-0">
                <MdAccessTime className="text-purple-500 text-sm" />
              </div>
              <p className="text-sm text-gray-600">
                {formatTime(doctor.startTime)} - {formatTime(doctor.endTime)}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          <a 
            href={doctor.gmapsUrl || '#'}
            target={doctor.gmapsUrl ? "_blank" : "_self"}
            rel={doctor.gmapsUrl ? "noopener noreferrer" : ""}
            className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
              doctor.gmapsUrl 
                ? 'bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white'
                : doctor.isAvailable && isWithinHours
                  ? 'bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={!doctor.gmapsUrl && (!doctor.isAvailable || !isWithinHours) ? (e) => e.preventDefault() : undefined}
          >
            <span>
              {doctor.gmapsUrl 
                ? 'Lihat di Google Maps'
                : !doctor.isAvailable 
                  ? 'Belum Tersedia' 
                  : !isWithinHours 
                    ? 'Di Luar Jam Operasi' 
                    : 'Kontak Dokter'
              }
            </span>
            {(doctor.gmapsUrl || (doctor.isAvailable && isWithinHours)) && (
              <FaChevronRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}; 