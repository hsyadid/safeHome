"use client"
import Image from "next/image"
import ForumPost, { ForumPostProps } from "../../components/ui/forumPost"
import plus from "../../public/plus.svg"
import ForumPostModal from "../../components/ui/forumPostModal"
import { useState } from "react"

const forumPosts = [
  {
    id: 1,
    profileUrl: "/okegas.jpg",
    name: "Wisa",
    role: "buddy",
    date: "2 jam yang lalu",
    text: "ya allah gue capek banget masa ini tugas ga kelar kelar padahal udah mau lebaran ya allah kenapa aku masuk itb plis gue pengen pindah aja jir harusnya gue kmrn keterima di unpad aja",
    publicity: "private",
    replies: [{
      id: 1,
      profileUrl: "/okegas.jpg",
      name: "Hubban",
      role: "buddy",
      date: "2 jam yang lalu",
      text: "woi lu mikir lah ini gajelas banget",
      publicity: "private",
      replies: null
    },
    {
      id: 1,
      profileUrl: "/okegas.jpg",
      name: "Ridwan Kamil",
      role: "buddy",
      date: "2 jam yang lalu",
      text: "hayang dahar aing",
      publicity: "private",
      replies: [{
        id: 1,
        profileUrl: "/okegas.jpg",
        name: "Hubban",
        role: "buddy",
        date: "2 jam yang lalu",
        text: "arti?",
        publicity: "private",
        replies: null
      },]
    }
  ], 
    
  },
  {
    id: 2,
    profileUrl: "/okegas.jpg",
    name: "Sarah",
    role: "survivor",
    date: "5 jam yang lalu",
    text: "Hari ini aku akhirnya berani cerita ke psikolog tentang masalahku. Ternyata memang benar kata teman-teman, berbagi cerita itu membantu meringankan beban.",
    publicity: "public",
    replies: null
  },
  {
    id: 3,
    profileUrl: "/okegas.jpg",
    name: "Rina",
    role: "buddy",
    date: "1 hari yang lalu",
    text: "Sharing pengalaman nih, kemarin aku nemuin komunitas support yang bagus banget. Mereka punya program pendampingan yang comprehensive.",
    publicity: "private",
    replies: null
  }
];

export default function Forum(){
  const [modal, showModal] = useState(false)
  return(
    <div className="dot_pattern">
      {modal && <div className="fixed opacity-50 w-screen h-screen z-50 bg-black"></div>}
      {modal && <ForumPostModal
        onIncrement={()=>showModal(false)}
        profileUrl="/okegas.jpg"
      />}
      
    <div className="max-w-[1000px] mx-auto border-[#4F1718] border-x-[1px] overflow-visible">
      <div className="font-jakarta pt-11 pb-24 bg-[#efeee6] shadow-xl">
        <div className="border-b-[1px] border-[#4F1718] w-full relative">
          
            <div className="size-[7px] bg-[#4F1718] absolute -bottom-1 -left-1 rounded-full"></div>
            <div className="size-[7px] bg-[#4F1718] absolute -bottom-1 -right-1 rounded-full"></div>
        

            <div className="flex justify-between items-center px-10 py-10">
                <h1 className="text-6xl font-bold">Forum</h1>
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
        </div>

        <div>
          {forumPosts && forumPosts.map((post) => (
            <ForumPost
              key={post.id}
              id = {post.id}
              profileUrl={post.profileUrl}
              name={post.name}
              role={post.role}
              date={post.date}
              text={post.text}
              publicity={post.publicity as "public" | "private"}
              replies={post.replies as ForumPostProps[] | null}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}