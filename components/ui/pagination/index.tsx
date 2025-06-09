"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({ 
  totalPages = 10, 
  currentPage: externalCurrentPage,
  onPageChange 
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use external currentPage if provided, otherwise use internal state
  const page = externalCurrentPage ?? internalPage;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const prevPage = () => {
    const newPage = Math.max(page - 1, 1);
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
    
    // Scroll to top on mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const nextPage = () => {
    const newPage = Math.min(page + 1, totalPages);
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
    
    // Scroll to top on mobile
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 font-jakarta">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-lg font-bold bg-[#f0eee4] disabled:opacity-50 hover:bg-[#e8e6df] transition-colors duration-200"
      >
        <Image 
          src="/chevron-left-black.svg" 
          alt="previous page" 
          width={24}
          height={24}
          sizes=""
          className="object-cover pointer-events-none"
        />
      </button>
      
      <div className="w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-lg font-bold bg-[#4F1718] text-white">
        {page}
      </div>
      
      <div className="text-sm text-gray-500 mx-3">
        / {totalPages}
      </div>
      
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-lg font-bold bg-[#f0eee4] disabled:opacity-50 hover:bg-[#e8e6df] transition-colors duration-200"
      >
        <Image 
          src="/chevron-right-black.svg" 
          alt="next page" 
          width={24}
          height={24}
          sizes=""
          className="object-cover pointer-events-none"
        />
      </button>
    </div>
  );
}
