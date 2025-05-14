'use client'
import Image from "next/image"
import logo from "@/../public/logo anara.png"
import userImg from "@/../public/user.png"
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DampingSetaraModal } from "@/../components/ui/modal/dampingSetaraModal";
import { VscThreeBars } from "react-icons/vsc";
import close from "../../../public/close.svg"
import { useAuth } from "@/../lib/auth";
import { Fragment } from 'react'

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
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
          <ul className="hidden lg:flex gap-x-14">
            <li>
              <Link href="/" onClick={closeModal} className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/peta-layanan" onClick={closeModal} className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Peta Layanan
              </Link>
            </li>
            <li>
              <Link href="/forum" onClick={closeModal} className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Forum
              </Link>
            </li>
            <li>
              <Link href="/informasi" onClick={closeModal} className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Informasi
              </Link>
            </li>
            <li 
              className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer flex items-center gap-2"
              onClick={handleDampingSetaraClick}
            >
              Damping Setara 
              <FaChevronDown className={`text-gray-400 relative transition-transform duration-300 ${
                isModalOpen ? 'rotate-180' : ''
              }`}/>
              <DampingSetaraModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </li>
          </ul>

          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center focus:outline-none"
              >
                <Image
                  src={userImg}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Hai, {user?.username}
                  </div>
                  <div className="px-1 py-1">
                    <button
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white"
                      onClick={handleLogout}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" onClick={closeModal} className="font-jakarta rounded-[15px] bg-primary px-6 py-2 text-white font-semibold">
              Login
            </Link>
          )}

          <VscThreeBars size={24} className="lg:hidden" onClick={()=>setIsSidebarOpen(true)}/>
          
        </div>
      </div>
      {isSidebarOpen && 
      
      <div className="fixed top-0 right-0 w-60 bg-[#f0eee4] h-dvh z-[9999] shadow-md">
        <div className="h-[76px] flex justify-end px-10">
          <Image
            src={close}
            alt="logo"
            width={30}
            height={30}
            onClick={() => {
              setIsSidebarOpen(false);
              closeModal();
            }}
          />
        </div>
        <ul className="flex flex-col gap-4 px-4 mt-8">
            <li>
              <Link onClick={() => {
                setIsSidebarOpen(false);
                closeModal();
              }} href="/" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Beranda
              </Link>
            </li>
            <li>
              <Link onClick={() => {
                setIsSidebarOpen(false);
                closeModal();
              }} href="/peta-layanan" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Peta Layanan
              </Link>
            </li>
            <li>
              <Link onClick={() => {
                setIsSidebarOpen(false);
                closeModal();
              }} href="/forum" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Forum
              </Link>
            </li>
            <li>
              <Link onClick={() => {
                setIsSidebarOpen(false);
                closeModal();
              }} href="/informasi" className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer">
                Informasi
              </Link>
            </li>
            <li 
              className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer flex items-center gap-2 relative"
              onClick={handleDampingSetaraClick}
            >
              Damping Setara 
              <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                isModalOpen ? 'rotate-180' : ''
              }`}/>
              <DampingSetaraModal 
                isOpen={isModalOpen}
                onClose={() => {
                  setIsSidebarOpen(false);
                  setIsModalOpen(false);
                }}
              />
            </li>
            {isAuthenticated ? (
              <li>
                <button 
                  onClick={handleLogout}
                  className="font-jakarta font-semibold text-xl text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Keluar
                </button>
              </li>
            ) : (
              <li>
                <Link 
                  href="/login" 
                  onClick={() => {
                    setIsSidebarOpen(false);
                    closeModal();
                  }}
                  className="font-jakarta font-semibold text-xl hover:text-primary cursor-pointer"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
      </div>}
    </>
  )
}
