import Image from "next/image"
import Flag from "../../../public/Flag.svg"
import chevronDown from "../../../public/chevron-down.svg"

export default function ForumPost({profileUrl, name, role, date, text}:{profileUrl:string, name:string, role:string, date:string, text:string}) {
  return(
    <div className="font-jakarta flex flex-col gap-4 py-8 border-b-[1px] border-b-[#8E8E8E]">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative overflow-hidden rounded-full flex h-10 w-10">
            <Image 
              src={profileUrl}
              alt="profile"
              fill
              sizes="10"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg">{name}</h3>
            <p className="text-[#8E8E8E]">{role} • {date}</p>
          </div>
        </div>
        <div>
          <Image 
            src={Flag}
            alt="report"
            width={24}
            height={24}
            className="object-cover"
          /> 
        </div>
      </div>
      <p>{text}</p>
      <p className="text-lg font-bold">Balas Postingan</p>
      <p className="inline-flex items-center text-[#4F1718] font-bold text-lg gap-2">
        <span className="h-6 w-6 relative">
          <Image 
            src={chevronDown}
            alt="dropdown"
            fill
            className="object-cover"
          />
        </span>
        4 balasan
      </p>
    </div>
  )
}