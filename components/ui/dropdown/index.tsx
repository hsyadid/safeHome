"use client"
import Image from "next/image";
import { useState } from "react";
import chevronDown from "../../../public/chevron-down-white.svg"

const options = [
  { value: "option1", label: "Publik", icon: "/public.svg" },
  { value: "option2", label: "Option 2", icon: "/public.svg" },
  { value: "option3", label: "Option 3", icon: "/public.svg" },
];

export default function Dropdown() {
  const [selected, setSelected] = useState(options[0]); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block z-50">
    <button
        className="flex items-center gap-4 px-4 py-1 border rounded-2xl bg-[#8E8E8E] text-white font-bold"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Image src={selected.icon} alt={selected.label} width={20} height={20} />
          {selected.label}
        </div>
        <Image src={chevronDown} alt="dropdown" width={20} height={20} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-[#8E8E8E] overflow-hidden rounded-lg text-white">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#4E4E4E]"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              <Image src={option.icon} alt={option.label} width={20} height={20} />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}