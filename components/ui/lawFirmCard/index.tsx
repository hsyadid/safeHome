import Image from "next/image";

interface LawFirmCardProps {
  name: string;
  imageUrl: string;
  className?: string;
}

export const LawFirmCard = ({
  name,
  imageUrl,
  className
}: LawFirmCardProps) => {
  return (
    <div className={`bg-white rounded-[15px] overflow-hidden shadow-sm border-2 border-solid border-[##D5D3D4] ${className}`}>

      <div className="w-full h-[180px] relative bg-black">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          className="object-cover opacity-90"
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-jakarta font-medium text-center">
          {name}
        </h3>
        
        <button className="w-full py-2 px-4 rounded-[8px] bg-button text-white hover:bg-opacity-90 text-sm font-medium">
          Kontak
        </button>
      </div>
    </div>
  );
}; 