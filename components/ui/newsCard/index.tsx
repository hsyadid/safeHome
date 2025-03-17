import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";


interface NewsCardProps {
  title: string;
  image: string;
  className?: string;
}

export const NewsCard = ({
  title,
  image,
  className
}: NewsCardProps) => {
  return (
    <div className={`h-[380px] bg-white rounded-[20px] border-[1px] border-solid border-rose-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="w-full h-[200px] relative">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-3  h-full flex flex-col items-start gap-3 pt-10 ">
        <h3 className="font-jakarta font-semibold text-lg line-clamp-2">
          {title}
        </h3>
        
        <button className="text-primary font-jakarta text-sm hover:underline flex justify-center items-center gap-2">
          Baca Lebih Lanjut <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  )
} 