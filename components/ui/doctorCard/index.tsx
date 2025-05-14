"use client"

import Image from "next/image";
import { MdAccessTime } from "react-icons/md";
import { useEffect, useState } from "react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
  startTime: Date;
  endTime: Date;
  isAvailable?: boolean;
  className?: string;
}

export const DoctorCard = ({
  name,
  specialty,
  imageUrl,
  startTime,
  endTime,
  isAvailable = true,
  className
}: DoctorCardProps) => {
  const [isWithinHours, setIsWithinHours] = useState(false);

  useEffect(() => {
    const checkOperatingHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const start = new Date(startTime);
      const end = new Date(endTime);
      
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
  }, [startTime, endTime]);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className={`bg-white rounded-[20px] p-4 shadow-sm w-full border-2 border-solid border-[##D5D3D4] ${className}`}>
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
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>
        </div>

        <button 
          className={`w-full py-2 px-4 rounded-[10px] font-medium text-sm
            ${isAvailable && isWithinHours
              ? 'bg-button text-white hover:bg-opacity-90' 
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
          disabled={!isAvailable || !isWithinHours}
        >
          {!isAvailable 
            ? 'Belum Tersedia' 
            : !isWithinHours 
              ? 'Di Luar Jam Operasi' 
              : 'Kontak'}
        </button>
      </div>
    </div>
  );
}; 