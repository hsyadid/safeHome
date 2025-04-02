"use client"
import ArtikelCard from "../../components/ui/artikelCard"
import Image from "next/image"
import plus from "../../public/plus.svg"
import InformasiModal from "../../components/ui/informasiModal"
import { useState } from "react"

export default function() {
  const [showModal, setShowModal] = useState(false);
  
  const articles = [{
    imgPath: "/okegas.jpg", 
    title: "Prabowo Oke gas oke gas nomor dua torang gas gue udah capek banget tolong berhasil", 
    isVideo: false, 
    link: "yes"
  },
  {
    imgPath: "/okegas.jpg", 
    title: "mantap", 
    isVideo: true, 
    link: "yes"
  },
  {
    imgPath: "/okegas.jpg", 
    title: "mamah aku lupa sahur", 
    isVideo: false, 
    link: "yes"
  }]

  return (
    <div className="dot_pattern">
      {showModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 " />}
      {showModal && (
        <InformasiModal
          onClose={() => setShowModal(false)}
          profileUrl="/okegas.jpg"
        />
      )}
      
      <div className="max-w-[1000px] mx-auto border-[#4F1718] border-x-[1px] overflow-visible">
        <div className="font-jakarta pt-11 pb-24 bg-[#efeee6] shadow-xl">
          <div className="border-b-[1px] border-[#4F1718] w-full relative">
            <div className="size-[7px] bg-[#4F1718] absolute -bottom-1 -left-1 rounded-full"></div>
            <div className="size-[7px] bg-[#4F1718] absolute -bottom-1 -right-1 rounded-full"></div>

            <div className="flex justify-between items-center px-10 py-10">
              <h1 className="text-6xl font-bold">Informasi</h1>
              <button 
                onClick={() => setShowModal(true)}
                className="gap-[10px] w-fit inline-flex items-center px-6 py-3 bg-[#4F1718] rounded-3xl"
              >
                <span className="relative w-6 h-6">
                  <Image 
                    src={plus}
                    alt="add"
                    fill
                    sizes="10"
                    className="object-cover"
                  />
                </span>
                <p className="text-white text-xl font-semibold">Tambah Informasi</p>
              </button>
            </div>
          </div>

          <div className="px-2 md:px-12 flex flex-col gap-6 pt-6">
            {articles.map((article, i) => 
              <ArtikelCard
                key={i}
                imgPath={article.imgPath}
                title={article.title}
                isVideo={article.isVideo}
                link={article.link}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}