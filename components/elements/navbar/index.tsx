'use client'
import Image from "next/image"
import logo from "../../../public/logo anara.png"
import userImg from "../../../public/user.png"
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { VscThreeBars } from "react-icons/vsc";
import close from "../../../public/close.svg"
import { useAuth } from "../../../lib/auth";
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileDampingOpen, setIsMobileDampingOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  // Generate initials from name
  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Generate background color based on first letter
  const getAvatarColor = (name: string) => {
    if (!name) return 'bg-gray-500';
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

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

  useEffect(() => {
    if (isModalOpen || isModalAnimating || isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isModalAnimating, isSidebarOpen]);

  const handleDampingSetaraClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (isModalOpen) {
      closeModal();
    } else {
      setIsModalAnimating(true);
      setTimeout(() => {
        setIsModalOpen(true);
      }, 10);
    }
  };

  const handleMobileDampingSetaraClick = () => {
    if (!isAuthenticated) {
      setIsSidebarOpen(false);
      router.push('/login');
      return;
    }
    
    setIsMobileDampingOpen(!isMobileDampingOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalAnimating(false);
    }, 300); // Match transition duration
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleRestrictedNavigation = (path: string) => {
    setIsModalOpen(false);
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  const handleLogoClick = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  const handleProfileClick = () => {
    setIsModalOpen(false);
    router.push('/profile');
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsMobileDampingOpen(false);
    closeModal();
  };

  return (
    <>
      <div className={`z-[10000] bg-[#4f1818] w-full h-[76px] flex justify-between items-center px-10  ${isScrolled ? 'fixed top-0' : 'relative shadow-lg shadow-black/10'} transition-all duration-300`}>
        <div onClick={handleLogoClick} className="cursor-pointer">
          <Image
            src={logo}
            alt="logo"
            width={60}
            height={60}
          />
        </div>

        <div className="flex items-center gap-10 text-[#f0eee4]">
          <ul className="hidden lg:flex gap-x-14">
            <li>
              <button 
                onClick={() => handleRestrictedNavigation('/peta-layanan')} 
                className="font-jakarta font-semibold text-xl hover:text-[#c2987c] cursor-pointer transition-all duration-300 ease-in-out relative group"
              >
                Peta Layanan
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleRestrictedNavigation('/forum')} 
                className="font-jakarta font-semibold text-xl hover:text-[#c2987c] cursor-pointer transition-all duration-300 ease-in-out relative group"
              >
                Forum
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <Link href="/informasi" onClick={() => setIsModalOpen(false)} className="font-jakarta font-semibold text-xl hover:text-[#c2987c] cursor-pointer transition-all duration-300 ease-in-out relative group">
                Informasi
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </li>
            <li 
              className="font-jakarta font-semibold text-xl hover:text-[#c2987c] cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out relative group"
              onClick={handleDampingSetaraClick}
            >
              Damping Setara 
              <FaChevronDown className={`text-gray-400 group-hover:text-[#c2987c] relative transition-all duration-300 ${
                isModalOpen ? 'rotate-180' : ''
              }`}/>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
          </ul>

          {isAuthenticated ? (
            <button 
              onClick={handleProfileClick}
              className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
            >
              {user?.profilePhoto ? (
                <Image
                  src={user.profilePhoto}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center gap-2 relative">
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(user?.username || 'User')} flex items-center justify-center text-white font-bold text-sm z-[10]`}>
                  {getInitials(user?.username || 'User')}
                </div>
                <div className={`absolute size-[50px] rounded-full bg-white opacity-20 z-[9]`}></div>
                </div>
              )}
            </button>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => router.push('/login')}
              onKeyDown={(e) => e.key === 'Enter' && router.push('/login')}
              className="w-[131px] h-[51px] rounded-[15px] cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-br from-[#7f1d1d] to-transparent bg-[rgba(127,29,29,0.2)] hover:bg-[rgba(127,29,29,0.7)] hover:shadow-[0_0_10px_rgba(127,29,29,0.5)] focus:outline-none focus:bg-[rgba(127,29,29,0.7)] focus:shadow-[0_0_10px_rgba(127,29,29,0.5)] flex items-center justify-center"
            >
              <div className="w-[127px] h-[47px] rounded-[13px] bg-[#1a1a1a] flex items-center justify-center gap-[15px] text-white font-semibold">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[27px] h-[27px] fill-white"
                >
                  <g data-name="Layer 2" id="Layer_2">
                    <path
                      d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"
                    ></path>
                  </g>
                </svg>
                <p className="text-lg">Login</p>
              </div>
            </div>
          )}

          <VscThreeBars size={24} className="lg:hidden" onClick={()=>setIsSidebarOpen(true)}/>
          
        </div>
      </div>

      {/* Mobile Sidebar - Full Width */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
      />
      
      {/* Full Width Sidebar with Slide Animation */}
      <div 
        className={`lg:hidden fixed top-0 right-0 w-full bg-[#f0eee4] h-dvh z-[10001] shadow-2xl transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-[76px] flex justify-between items-center px-8 bg-[#e8e6d8] border-b border-[#d0cdb8]">
          <Image
            src={logo}
            alt="logo"
            width={60}
            height={60}
          />
          <button onClick={closeSidebar}>
            <Image
              src={close}
              alt="close"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-8 py-8 space-y-8">
          <div>
            <button 
              onClick={() => {
                closeSidebar();
                handleRestrictedNavigation('/peta-layanan');
              }} 
              className="font-jakarta font-bold text-3xl hover:text-[#c2987c] cursor-pointer text-left transition-all duration-300 ease-in-out relative group w-fit block"
            >
              Peta Layanan
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>
          </div>

          <div>
            <button 
              onClick={() => {
                closeSidebar();
                handleRestrictedNavigation('/forum');
              }} 
              className="font-jakarta font-bold text-3xl hover:text-[#c2987c] cursor-pointer text-left transition-all duration-300 ease-in-out relative group w-fit block"
            >
              Forum
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>
          </div>

          <div>
            <Link 
              href="/informasi" 
              onClick={closeSidebar} 
              className="font-jakarta font-bold text-3xl hover:text-[#c2987c] cursor-pointer transition-all duration-300 ease-in-out relative group w-fit block"
            >
              Informasi
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </div>

          {/* Damping Setara with Dropdown */}
          <div>
            <button 
              className="font-jakarta font-bold text-3xl hover:text-[#c2987c] cursor-pointer flex items-center gap-3 transition-all duration-300 ease-in-out relative group w-fit"
              onClick={handleMobileDampingSetaraClick}
            >
              Damping Setara 
              <FaChevronDown className={`text-gray-400 group-hover:text-[#c2987c] transition-all duration-300 ${
                isMobileDampingOpen ? 'rotate-180' : ''
              }`}/>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#c2987c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </button>

            {/* Dropdown Options - Full Width */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileDampingOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
              <div className="space-y-4">
                <button 
                  onClick={() => {
                    router.push('/damping-setara/psikolog');
                    closeSidebar();
                  }}
                  className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-blue-100 to-[#8aaaf0]
                             border border-blue-300 text-blue-800 hover:from-[#5f7fc4] hover:to-[#263452]
                             hover:text-white transition-all duration-200 font-jakarta font-bold
                             flex items-center justify-start gap-4 text-left shadow-sm"
                >
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">Konseling Psikologis</div>
                    <div className="text-lg opacity-80">Bantuan kesehatan mental</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => {
                    router.push('/damping-setara/hukum');
                    closeSidebar();
                  }}
                  className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-[#a1f0d6] to-[#38bc99]
                             border border-green-300 text-green-800 hover:from-[#66b39a] hover:to-[#007d56]
                             hover:text-white transition-all duration-200 font-jakarta font-bold
                             flex items-center justify-start gap-4 text-left shadow-sm"
                >
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">Layanan Hukum</div>
                    <div className="text-lg opacity-80">Bantuan hukum & konsultasi</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          {isAuthenticated && (
            <div className="pt-6">
              <button 
                onClick={() => {
                  closeSidebar();
                  router.push('/profile');
                }}
                className="font-jakarta font-bold text-3xl text-[#386cdd] hover:text-[#263452] cursor-pointer transition-all duration-300"
              >
                Profil
              </button>
            </div>
          )}

          {/* Login Button for non-authenticated users */}
          {!isAuthenticated && (
            <div className="flex justify-center pt-8">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  closeSidebar();
                  router.push('/login');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    closeSidebar();
                    router.push('/login');
                  }
                }}
                className="w-[200px] h-[70px] rounded-[15px] cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-br from-[#7f1d1d] to-transparent bg-[rgba(127,29,29,0.2)] hover:bg-[rgba(127,29,29,0.7)] hover:shadow-[0_0_10px_rgba(127,29,29,0.5)] focus:outline-none focus:bg-[rgba(127,29,29,0.7)] focus:shadow-[0_0_10px_rgba(127,29,29,0.5)] flex items-center justify-center"
              >
                <div className="w-[196px] h-[66px] rounded-[13px] bg-[#1a1a1a] flex items-center justify-center gap-4 text-white font-bold">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-[32px] h-[32px] fill-white"
                  >
                    <g data-name="Layer 2" id="Layer_2">
                      <path
                        d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z"
                      ></path>
                    </g>
                  </svg>
                  <p className="text-2xl">Masuk</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop Damping Setara Modal */}
      {isAuthenticated && isModalAnimating && (
        <>
          {/* Backdrop overlay with blur */}
          <div 
            className={`hidden lg:block fixed inset-0 bg-black/40 backdrop-blur-sm z-[9000] transition-all duration-300 ease-in-out ${
              isModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeModal}
          />
          
          {/* Modal dropdown - positioned relative to navbar */}
          <div className="hidden lg:block fixed top-[70px] right-1 lg:right-[50px] z-[9001]">
            <div 
              className={`bg-[#e8e6d8] rounded-lg shadow-2xl border border-[#d0cdb8] p-5 w-[320px]
                transform transition-all duration-300 ease-in-out origin-top ${
                  isModalOpen 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : '-translate-y-8 opacity-0 scale-95'
                }`}
            >
              <h3 className="text-lg font-semibold font-jakarta text-[#4a453c] mb-4">Pilih Layanan</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    router.push('/damping-setara/psikolog');
                    closeModal();
                  }}
                  className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-blue-100 to-[#8aaaf0]
                             border border-blue-300 text-blue-800 hover:from-[#5f7fc4] hover:to-[#263452]
                             hover:text-white transition-all duration-200 font-jakarta font-bold
                             flex items-center justify-start gap-4 text-left shadow-sm"
                >
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Konseling Psikologis</span>
                </button>
                
                <button 
                  onClick={() => {
                    router.push('/damping-setara/hukum');
                    closeModal();
                  }}
                  className="w-full py-5 px-6 rounded-xl bg-gradient-to-r from-[#a1f0d6] to-[#38bc99]
                             border border-green-300 text-green-800 hover:from-[#66b39a] hover:to-[#007d56]
                             hover:text-white transition-all duration-200 font-jakarta font-bold
                             flex items-center justify-start gap-4 text-left shadow-sm"
                >
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span>Layanan Hukum</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
