import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";


interface NewsCardProps {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
}

export const NewsCard = ({
  imageUrl,
  title,
  description,
  className
}: NewsCardProps) => {
  return (
    <div className={`h-[380px] bg-[#f0eee4] rounded-[20px] border-[1px] border-solid border-rose-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="h-[190px] w-full relative">
        <Image 
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col h-[190px] justify-between">
        <div>
          <h3 className="font-jakarta font-semibold text-lg mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="font-jakarta text-gray-600 text-sm line-clamp-3">
            {description}
          </p>
        </div>
        
        <button className="flex items-center gap-2 text-[#4F1718] font-medium text-sm hover:gap-3 transition-all duration-200 mt-4">
          Baca Selengkapnya
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  )
} 