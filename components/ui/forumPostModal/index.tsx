"use client"
import Image from "next/image"
import close from "../../../public/close.svg"
import { useEffect, useState } from "react"
import Dropdown from "../dropdown"

interface ForumPostModalProps {
  onIncrement: () => void;
  profileUrl: string;
}

const optionsVisibility = [
  { value: "public", label: "Publik", icon: "/public.svg" },
  { value: "private", label: "Private", icon: "/public.svg" },
];

const optionsRole = [
  { value: "anonymous", label: "Anonymus", icon: "/public.svg" },
  { value: "buddy", label: "Buddy", icon: "/public.svg" },
  { value: "survivor", label: "Penyintas", icon: "/public.svg" },
];


export default function ForumPostModal({onIncrement, profileUrl}: ForumPostModalProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [postContent, setPostContent] = useState("");
  const [, setSelectedVisibility] = useState(optionsVisibility[0].value);
  const [, setSelectedRole] = useState(optionsRole[0].value);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      alert("Silakan tulis pesan terlebih dahulu");
      return;
    }
        
    onIncrement();
  };

  return(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onIncrement} />
      <div className="bg-white px-4 pt-4 pb-8 rounded-2xl w-fit fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[600px]">
        <Image 
          src={close}
          alt="close"
          width={24}
          height={24}
          className="object-cover cursor-pointer ml-auto"
          onClick={onIncrement}
        /> 
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 py-6 border-b-[1px] border-b-[#8E8E8E] px-4 md:px-0">
              <div className="shrink-0 relative overflow-hidden rounded-full h-14 w-14">
                <Image 
                  src={profileUrl}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              </div>
              <textarea 
                name="input"
                id="input"
                placeholder="Apa yang ingin kamu sampaikan?"
                className="p-2 text-xl placeholder:text-[#3F3F3F] placeholder:text-xl w-full resize-none h-auto text-[#3F3F3F] outline-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-between items-center gap-2 md:gap-8">
              <div className="flex gap-1 md:gap-6">
                <Dropdown 
                  options={optionsVisibility} 
                  isOpenGlobal={openDropdownId} 
                  setIsOpenGlobal={setOpenDropdownId} 
                  id="visibility"
                  onSelect={(value) => setSelectedVisibility(value)}
                />
                <Dropdown 
                  options={optionsRole} 
                  isOpenGlobal={openDropdownId} 
                  setIsOpenGlobal={setOpenDropdownId} 
                  id="role"
                  onSelect={(value) => setSelectedRole(value)}
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 font-bold text-lg text-white bg-[#4F1718] rounded-3xl hover:bg-[#3a1112] transition-colors"
              >
                Unggah
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
