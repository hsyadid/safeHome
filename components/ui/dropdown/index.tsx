"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import chevronDown from "../../../public/chevron-down-white.svg";
import infoIcon from "../../../public/info-circle.svg";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  isOpenGlobal: string | null;
  setIsOpenGlobal: (id: string | null) => void;
  id: string;
  onSelect?: (value: string) => void;
  width?: string;
  showInfo?: boolean;
}

export default function Dropdown({ options, isOpenGlobal, setIsOpenGlobal, id, onSelect, width = "w-32", showInfo = false }: DropdownProps) {
  const [selected, setSelected] = useState<DropdownOption | null>(options && options.length > 0 ? options[0] : null);
  const [isOpen, setIsOpen] = useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfoTooltip(false);
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

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfoTooltip(!showInfoTooltip);
  };

  return (
    <div className="relative inline-block z-50" ref={dropdownRef}>
      <div className="flex items-center gap-1">
        <button
          className={`flex items-center justify-between w-[190px] gap-2 px-4 py-1 border rounded-2xl bg-[#8E8E8E] text-white font-bold ${width}`}
          type="button"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2 min-w-0">
            {selected && selected.icon && (
              <Image 
                src={selected.icon} 
                alt={selected.label} 
                width={16} 
                height={16} 
                className="flex-shrink-0"
              />
            )}
            <span className="truncate">{selected ? selected.label : 'Select'}</span>
          </div>
          <Image 
            src={chevronDown} 
            alt="dropdown" 
            width={16} 
            height={16} 
            className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {showInfo && (
          <div className="relative" ref={infoRef}>
            <button
              type="button"
              onClick={handleInfoClick}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <Image 
                src={infoIcon} 
                alt="info" 
                width={16} 
                height={16} 
                className="w-4 h-4 text-gray-500 flex-shrink-0"
              />
            </button>

            {showInfoTooltip && (
              <div className="absolute right-0 mt-2 w-64 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-[100]">
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Penjelasan:</h3>
                <div className="space-y-2">
                  {options.map((option) => (
                    <div key={option.value} className="flex items-start gap-2">
                      {option.icon && (
                        <Image 
                          src={option.icon} 
                          alt={option.label} 
                          width={16} 
                          height={16} 
                          className="flex-shrink-0 mt-0.5"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className={`absolute left-0 mt-2 bg-[#8E8E8E] overflow-hidden rounded-lg text-white shadow-lg ${width}`}>
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
                  width={16} 
                  height={16} 
                  className="flex-shrink-0"
                />
              )}
              <span className="truncate">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
