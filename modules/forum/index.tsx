"use client"
import Image from "next/image"
import ForumPost from "../../components/ui/forumPost"
import plus from "../../public/plus.svg"
import ForumPostModal from "../../components/ui/forumPostModal"
import { useState } from "react"

export default function Forum(){
  const [modal, showModal] = useState(false)
  return(
    <div>
      {modal && <div className="fixed opacity-50 w-full h-dvh z-50 bg-black"></div>}
      {modal && <ForumPostModal
        onIncrement={()=>showModal(false)}
        profileUrl="/okegas.jpg"
      />}
      <div className="font-jakarta pt-11 pb-24 px-2 md:px-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">Forum</h1>
          <button className="gap-[10px] w-fit inline-flex items-center px-6 py-3 bg-[#4F1718] rounded-3xl">
            <span className="relative w-6 h-6">
              <Image 
                src={plus}
                alt="wow"
                fill
                sizes="10"
                className="object-cover"
              />
            </span>
            <p onClick={()=>showModal(true)} className="text-white text-xl font-semibold">Buat Postingan Baru</p>
          </button>
        </div>
        <div>
          <ForumPost
            profileUrl="/okegas.jpg"
            name="wisa"
            role="buddy"
            date="idk"
            text="ya allah gue capek banget masa ini tugas ga kelar kelar padahal udah mau lebaran ya allah kenapa aku masuk itb plis gue pengen pindah aja jir harusnya gue kmrn keterima di unpad aja"
          />
          <ForumPost
            profileUrl="/okegas.jpg"
            name="wisa"
            role="buddy"
            date="idk"
            text="ya allah gue capek banget masa ini tugas ga kelar kelar padahal udah mau lebaran ya allah kenapa aku masuk itb plis gue pengen pindah aja jir harusnya gue kmrn keterima di unpad aja"
          />
          <ForumPost
            profileUrl="/okegas.jpg"
            name="wisa"
            role="buddy"
            date="idk"
            text="ya allah gue capek banget masa ini tugas ga kelar kelar padahal udah mau lebaran ya allah kenapa aku masuk itb plis gue pengen pindah aja jir harusnya gue kmrn keterima di unpad aja"
          />
          <ForumPost
            profileUrl="/okegas.jpg"
            name="wisa"
            role="buddy"
            date="idk"
            text="ya allah gue capek banget masa ini tugas ga kelar kelar padahal udah mau lebaran ya allah kenapa aku masuk itb plis gue pengen pindah aja jir harusnya gue kmrn keterima di unpad aja"
          />
        </div>
      </div>
    </div>
  )
}