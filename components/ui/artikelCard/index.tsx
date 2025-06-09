import Image from "next/image"
import { FaVideo, FaFileAlt, FaClock, FaArrowRight } from "react-icons/fa"

interface ArtikelCardProps {
  title: string;
  type: "video" | "article";
  duration?: number;
  thumbnail: string;
}

export const ArtikelCard = ({ title, type, duration, thumbnail }: ArtikelCardProps) => {
  return (
    <div className="flex rounded-2xl overflow-hidden bg-[#f0eee4] shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="w-1/3 relative min-h-[120px]">
        <Image 
          src={thumbnail} 
          alt={title} 
          fill 
          className="object-cover" 
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {type === "video" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#f0eee4]/90 rounded-full flex items-center justify-center shadow-lg">
              <FaVideo className="text-[#4F1718] text-xl ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {type === "video" ? (
              <FaVideo className="text-[#4F1718] text-sm" />
            ) : (
              <FaFileAlt className="text-[#4F1718] text-sm" />
            )}
            <span className="text-sm text-gray-600 font-medium">
              {type === "video" ? "Video" : "Artikel"}
            </span>
            {duration && (
              <>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <FaClock className="text-gray-400 text-xs" />
                  <span className="text-sm text-gray-500">{duration} min</span>
                </div>
              </>
            )}
          </div>
          
          <h3 className="font-jakarta font-bold text-lg text-gray-900 leading-tight mb-3">
            {title}
          </h3>
        </div>
        
        <button className="flex items-center gap-2 text-[#4F1718] font-semibold text-sm hover:gap-3 transition-all duration-200 group">
          <span>Baca {type === "video" ? "Tonton" : "Selengkapnya"}</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}

ArtikelCard.displayName = 'ArtikelCard';
export default ArtikelCard;
