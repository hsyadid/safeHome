import Image from "next/image"
import Flag from "../../../public/Flag.svg"
import chevronDown from "../../../public/chevron-down.svg"
import { useState } from "react";

export interface ForumPostProps {
    id: number;
    profileUrl: string;
    name: string;
    role: string;
    date: string;
    text: string;
    publicity: "public" | "private";
    replies: ForumPostProps[] | null;
}

const ForumPost = ({
    id,
    profileUrl,
    name,
    role,
    date,
    text,
    publicity,
    replies
}: ForumPostProps) => {
    const publicityStyles = {
        public: 'bg-[#d6d3d3] text-[#2d2b2e]',
        private: 'bg-[#ad8861] text-white'
    }

    const [isReplyOpen, setIsReplyOpen] = useState(false);
    return (
        <div id={`forum-post-${id}`} className="font-jakarta flex flex-col gap-4 py-8 border-b-[1px] border-b-[#8E8E8E] px-2 md:px-12">
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
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg">{name}</h3>
                            <span className={`px-3 py-0.5 rounded-full text-sm font-medium ${publicityStyles[publicity]}`}>
                                {publicity}
                            </span>
                        </div>
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
            <p className="inline-flex items-center select-none text-[#4F1718] font-bold text-lg gap-2" onClick={()=>isReplyOpen ? setIsReplyOpen(false) : setIsReplyOpen(true)}>
                <span className="h-6 w-6 relative">
                    <Image 
                        src={chevronDown}
                        alt="dropdown"
                        fill
                        className={`object-cover ${isReplyOpen && "rotate-180"} transition-transform`}
                    />
                </span>
                {replies && replies.length || 0} balasan
            </p>
            <div className="border-l-[1px] border-[#4F1718]">
            {isReplyOpen && replies && replies.map((item) => (
                    <ForumPost
                        key={item.id}
                        id={item.id}
                        profileUrl={item.profileUrl}
                        name={item.name}
                        role={item.role}
                        date={item.date}
                        text={item.text}
                        publicity={item.publicity}
                        replies={item.replies}
                    />
                ))}
            </div>
        </div>
    )
}

export default ForumPost;