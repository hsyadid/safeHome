"use client"
import Image from "next/image"
import ForumPost, { ForumPostProps } from "../../components/ui/forumPost"
import plus from "../../public/plus.svg"
import ForumPostModal from "../../components/ui/forumPostModal"
import { useState } from "react"

const forumPosts = [
  {
    id: 1,
    profileUrl: "/bantu.jpg",
    name: "Wisa",
    role: "buddy",
    date: "2 jam yang lalu",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quidem aut tempore?",
    publicity: "private",
    replies: [{
      id: 14,
      profileUrl: "/bantu.jpg",
      name: "Hubban",
      role: "buddy",
      date: "2 jam yang lalu",
      text: "Lorem ipsum dolor sit amet.",
      publicity: "private",
      replies: null
    },
    {
      id: 5,
      profileUrl: "/bantu.jpg",
      name: "Ridwan Kamil",
      role: "buddy",
      date: "2 jam yang lalu",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga.",
      publicity: "private",
      replies: [{
        id: 6,
        profileUrl: "/bantu.jpg",
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
    profileUrl: "/bantu.jpg",
    name: "Sarah",
    role: "survivor",
    date: "5 jam yang lalu",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolores libero odio, aperiam omnis laborum.",
    publicity: "public",
    replies: null
  },
  {
    id: 3,
    profileUrl: "/bantu.jpg",
    name: "Rina",
    role: "buddy",
    date: "1 hari yang lalu",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In nobis iste, voluptate, ullam quae explicabo delectus sequi incidunt perspiciatis quasi, ut odio illum maiores soluta exercitationem hic corrupti illo vel.",
    publicity: "private",
    replies: null
  }
];

export default function Forum(){
  const [modal, showModal] = useState(false)
  return(
    <div className="grid_pattern">
      {modal && <div className="fixed opacity-50 w-screen h-screen z-50 bg-black"></div>}
      {modal && <ForumPostModal
        onIncrement={()=>showModal(false)}
        profileUrl="/bantu.jpg"
      />}
      
    <div className="max-w-[1000px] mx-auto border-[#4F1718] border-x-[1px] overflow-visible">
      <div className="font-jakarta pt-2 bg-[#efeee6] shadow-xl">
        <div className="border-b-[1px] border-[#4F1718] w-full relative">
          
            <div className="flex justify-between items-center px-10 py-10">
                <h1 className="text-4xl md:text-5xl font-bold">Forum</h1>
                <button onClick={()=>showModal(true)}  className="gap-[10px] w-fit inline-flex items-center px-3 md:px-6 py-3 bg-[#4F1718] rounded-3xl">
                    <span className="relative w-6 h-6">
                        <Image 
                            src={plus}
                            alt="wow"
                            fill
                            sizes="10"
                            className="object-cover"
                        />
                    </span>
                    <p className="text-white text-xl font-semibold hidden md:block">Buat Postingan Baru</p>
                </button>
            </div>
        </div>

        <div className="max-h-[calc(100svh-160px)] overflow-y-scroll">
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