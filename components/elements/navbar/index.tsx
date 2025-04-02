'use client'
import Image from "next/image"
import logo from "@/../public/logo anara.png"
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DampingSetaraModal } from "@/../components/ui/modal/dampingSetaraModal";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDampingSetaraClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={`bg-[#f0eee4] w-full h-[76px] flex justify-between items-center px-10 z-[999] ${isScrolled ? 'fixed top-0' : 'relative shadow-lg shadow-black/10'} transition-all duration-300`}>
        <div>
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex space-x-14">
            <li>
              <Link href="/" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/peta-layanan" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Peta Layanan
              </Link>
            </li>
            <li>
              <Link href="/forum" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Forum
              </Link>
            </li>
            <li>
              <Link href="/informasi" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Informasi
              </Link>
            </li>
            <li 
              className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer flex items-center gap-2"
              onClick={handleDampingSetaraClick}
            >
              Damping Setara 
              <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                isModalOpen ? 'rotate-180' : ''
              }`}/>
            </li>
          </ul>

          <button className="font-jakarta rounded-[15px] bg-primary px-6 py-2 text-white font-semibold">
            Login
          </button>
        </div>
      </div>

      <DampingSetaraModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

