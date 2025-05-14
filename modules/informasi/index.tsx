"use client"
import ArtikelCard from "../../components/ui/artikelCard"
import Image from "next/image"
import plus from "../../public/plus.svg"
import InformasiModal from "../../components/ui/informasiModal"
import { useState } from "react"
import { useAuth } from "../../lib/auth"
import { contentData, ContentItem } from "../../data/content"
import { useRouter } from "next/navigation"
import VideoModal from "../../components/ui/videoModal"

export default function() {
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(null);
  const { isAdmin } = useAuth();
  const router = useRouter();
  
  const articles = contentData;

  const handleContentClick = (content: ContentItem) => {
    if (content.type === "VIDEO") {
      setSelectedVideo(content);
      setShowVideoModal(true);
    } else {
      router.push(`/artikel/${content.id}`);
    }
  };

  return (
    <div className="grid_pattern h-svh">
      {showModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-[50]"/>}
      {showModal && (
        <InformasiModal
          onClose={() => setShowModal(false)}
          profileUrl="/okegas.jpg"
        />
      )}
      
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center">
          <VideoModal
            video={selectedVideo}
            onClose={() => {
              setShowVideoModal(false);
              setSelectedVideo(null);
            }}
          />
        </div>
      )}
      
      <div className="max-w-[1000px] h-full mx-auto border-[#4F1718] border-x-[1px] overflow-visible">
        <div className="font-jakarta pt-2 bg-[#efeee6] shadow-xl">
          <div className="border-b-[1px] border-[#4F1718] w-full bg-[#efeee6]">
            <div className="flex justify-between items-center px-10 py-10">
                <h1 className="text-4xl md:text-5xl font-bold">Informasi</h1>
              {/* {isAdmin && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-[#4F1718] text-white px-4 py-2 rounded-full"
                >
                  <Image src={plus} alt="plus" width={20} height={20} />
                  <span className="hidden md:inline">Tambah Informasi</span>
                </button>
              )} */}


             
                <button 
                  onClick={() => setShowModal(true)}
                  className="gap-[10px] w-fit inline-flex items-center px-3 md:px-6 py-3 bg-[#4F1718] rounded-3xl"
                >
                  <Image src={plus} alt="plus" width={20} height={20} />
                  <span className="text-white text-xl font-semibold hidden md:block">Tambah Informasi</span>
                </button>
              
            </div>
          </div>
          <div className="h-full">
            <div className="max-h-[calc(100svh-160px)] px-2 md:px-12 flex flex-col gap-6 pt-6 h-full overflow-y-scroll pb-6">
              {articles.map((article) => 
                <div key={article.id} onClick={() => handleContentClick(article)} className="cursor-pointer">
                  <ArtikelCard
                    imgPath={article.thumbnail}
                    title={article.title}
                    isVideo={article.type === "VIDEO"}
                    link="#"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
