"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import chevronDown from "../../../public/chevron-down-white.svg";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  isOpenGlobal: string | null;
  setIsOpenGlobal: (id: string | null) => void;
  id: string;
  onSelect?: (value: string) => void;
}

export default function Dropdown({ options, isOpenGlobal, setIsOpenGlobal, id, onSelect }: DropdownProps) {
  // Pindahkan semua hooks ke bagian atas komponen, sebelum kondisi apapun
  const [selected, setSelected] = useState<DropdownOption | null>(options && options.length > 0 ? options[0] : null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close this dropdown when another one opens
  useEffect(() => {
    if (isOpenGlobal !== id && isOpen) {
      setIsOpen(false);
    }
  }, [isOpenGlobal, id, isOpen]);

  // Check if options exist and have at least one item
  if (!options || !options.length) {
    return null;
  }

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      setIsOpenGlobal(id);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option.value);
    }
  };

  return (
    <div className="relative inline-block z-50" ref={dropdownRef}>
      <button
        className="flex items-center gap-4 px-4 py-1 border rounded-2xl bg-[#8E8E8E] text-white font-bold"
        type="button"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-2">
          {selected && selected.icon && (
            <Image 
              src={selected.icon} 
              alt={selected.label} 
              width={20} 
              height={20} 
            />
          )}
          {selected ? selected.label : 'Select'}
        </div>
        <Image 
          src={chevronDown} 
          alt="dropdown" 
          width={20} 
          height={20} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-[#8E8E8E] overflow-hidden rounded-lg text-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#4E4E4E]"
              onClick={() => handleSelect(option)}
            >
              {option.icon && (
                <Image 
                  src={option.icon} 
                  alt={option.label} 
                  width={20} 
                  height={20} 
                />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
