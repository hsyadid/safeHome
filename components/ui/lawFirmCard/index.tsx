'use client'

import Image from "next/image";

interface LawFirmCardProps {
  name: string;
  imageUrl: string;
  redirectUrl: string;
  className?: string;
}

export const LawFirmCard = ({
  name,
  imageUrl,
  redirectUrl,
  className
}: LawFirmCardProps) => {
  const handleClick = () => {
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-white rounded-[20px] p-4 shadow-sm w-full border-2 border-solid border-[##D5D3D4] ${className}`}>
      <div className="space-y-4">
        <div className="w-full h-[200px] relative bg-black rounded-[15px] overflow-hidden">
          <Image 
            src={imageUrl}
            alt={name}
            fill
            className="object-cover opacity-90"
          />
        </div>

        <div className="px-4 py-2 space-y-3">
          <h3 className="font-jakarta font-semibold text-lg text-center">
            {name}
          </h3>
          
          <button 
            onClick={handleClick}
            className="w-full py-2 px-4 rounded-[10px] bg-button text-white hover:bg-opacity-90 text-sm font-medium"
          >
            Website
          </button>
        </div>
      </div>
    </div>
  );
}; 