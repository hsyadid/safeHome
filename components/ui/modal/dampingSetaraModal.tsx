'use client'
import { useRouter } from "next/navigation";
import {  useEffect } from "react";

interface DampingSetaraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DampingSetaraModal = ({ isOpen, onClose }: DampingSetaraModalProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, [isOpen]);

  return (
      <div className={`absolute top-12 md:top-16 -z-10  right-1 lg:right-[120px] flex justify-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}>
        <div 
          className={`bg-[#f0eee4] rounded-[20px] p-6 w-[250px] space-y-4 shadow-lg 
            transform transition-all duration-300 origin-top
            ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
          `}
        >
          <h3 className="text-xl font-semibold font-jakarta">Pilih Layanan</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => {
                router.push('/damping-setara/psikolog');
                onClose();
              }}
              className="w-full py-3 px-4 rounded-[10px] bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-jakarta"
            >
              Konseling Psikologis
            </button>
            
            <button 
              onClick={() => {
                router.push('/damping-setara/hukum');
                onClose();
              }}
              className="w-full py-3 px-4 rounded-[10px] bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-jakarta"
            >
              Layanan Hukum
            </button>
          </div>
        </div>
      </div>
  );
}; 