import Image from "next/image"
import close from "../../../public/close.svg"
import Form from "next/form"
import Dropdown from "../dropdown"
import { useEffect } from "react"

interface ForumPostModalProps {
  onIncrement: () => void;
  profileUrl: string;
}

export default function ForumPostModal({onIncrement, profileUrl}:ForumPostModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onIncrement} />
      <div className="bg-white px-4 pt-4 pb-8 rounded-2xl w-fit fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[600px]">
        <Image 
          src={close}
          alt="report"
          width={24}
          height={24}
          className="object-cover cursor-pointer"
          onClick={onIncrement}
        /> 
        <Form action="/">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 py-6 border-b-[1px] border-b-[#8E8E8E]">
              <div className="shrink-0 relative overflow-hidden rounded-full h-14 w-14">
                <Image 
                  src={profileUrl}
                  alt="profile"
                  fill
                  // sizes="10"
                  className="object-cover"
                />
              </div>
              <textarea 
                name="input"
                id="input"
                placeholder="Apa yang ingin kamu sampaikan?"
                className="p-2 text-xl placeholder:text-[#3F3F3F] placeholder:text-xl w-full resize-none h-auto text-[#3F3F3F] outline-none"
              />
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex gap-6">
                <Dropdown/>
                <Dropdown/>
              </div>
              <button className="px-6 py-3 font-bold text-lg text-white bg-[#4F1718] rounded-3xl">
                Unggah
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}