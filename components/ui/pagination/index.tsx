"use client"
import { useState } from "react";
import Image from "next/image";

export default function Pagination({ totalPages = 10 }) {
  const [page, setPage] = useState(1);

  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 font-jakarta">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-lg font-bold bg-[#D5D3D4] disabled:opacity-50"
      >
        <Image 
          src="/chevron-left-black.svg" 
          alt="decorative star" 
          width={24}
          height={24}
          sizes=""
          className="object-cover pointer-events-none"
        />
      </button>
      
      <div className="w-12 h-12 flex items-center justify-center  rounded-lg shadow-md text-lg font-bold bg-[#4F1718] text-white">
        {page}
      </div>
      
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-lg font-bold bg-[#D5D3D4] disabled:opacity-50"
      >
        <Image 
          src="/chevron-right-black.svg" 
          alt="decorative star" 
          width={24}
          height={24}
          sizes=""
          className="object-cover pointer-events-none"
        />
      </button>
    </div>
  );
}
