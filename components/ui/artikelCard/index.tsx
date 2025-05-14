import Image from "next/image"

interface ArtikelCardProps {
  imgPath: string;
  title: string;
  isVideo: boolean;
  link: string;
}

export function ArtikelCard({ imgPath, title, isVideo, link }: ArtikelCardProps) {
  return (
    <div className="flex rounded-[2rem] border-[1px] border-[#8E8E8E] overflow-hidden">
      <div className="rounded-l-[calc(2rem-1px)] relative w-[10rem] md:w-[25rem] aspect-[4/3] overflow-hidden">
        <Image 
          src={imgPath} 
          alt={title} 
          fill
          sizes=""
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col px-4 md:px-11 justify-around bg-[#d9d7c9]">
        <h2 className="text-black md:text-2xl text-sm font-bold overflow-ellipsis md:min-w-60 line-clamp-3">
          {title}
        </h2>
        <div className="flex justify-end">
          <p className="text-[#8E8E8E] text-xs md:text-2xl flex items-center gap-1">
            {isVideo ? "Tonton Video" : "Baca Lebih Lanjut"} 
            <span className="inline-block relative w-8 h-8">
              <Image 
                src="/chevron-right.svg" 
                alt="chevron right" 
                fill
                sizes=""
                className="object-cover"
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

ArtikelCard.displayName = 'ArtikelCard';
export default ArtikelCard;
