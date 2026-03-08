import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="w-full bg-[#4F1718] text-white py-12">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo & Description */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/logo anara.png"
              alt="Anara Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <h3 className="font-bold text-lg">SafeHome</h3>
            <p className="text-sm text-gray-300 text-center md:text-left">
              Platform aman untuk berbagi cerita, mendapat dukungan, dan terhubung dengan komunitas yang peduli.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#AD8861] transition-colors duration-200">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-[#AD8861] transition-colors duration-200">
                  Damping Setara
                </Link>
              </li>
              <li>
                <Link href="/informasi" className="hover:text-[#AD8861] transition-colors duration-200">
                  Informasi
                </Link>
              </li>
              <li>
                <Link href="/about-me" className="hover:text-[#AD8861] transition-colors duration-200">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#AD8861] transition-colors duration-200">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolaborasi & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">Kolaborasi</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Berkolaborasi dengan{' '}
              <a href="https://www.instagram.com/dampingsetara" target="_blank" rel="noopener noreferrer" className="text-[#AD8861] hover:text-white font-semibold transition-colors">
                DampingSetara
              </a>{' '}
              dan{' '}
              <a href="https://www.instagram.com/tasturamengajar/" target="_blank" rel="noopener noreferrer" className="text-[#AD8861] hover:text-white font-semibold transition-colors">
                Tastura Mengajar
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <FaInstagram className="text-[#AD8861] flex-shrink-0" size={16} />
              <a 
                href="https://www.instagram.com/anara__id/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#AD8861] transition-colors duration-200 text-gray-300 text-sm"
              >
                @anara__id
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-sm text-gray-300 text-center md:text-left">
              <p>&copy; 2025 Anara.ID - SafeHome. Semua hak dilindungi.</p>
              <p className="mt-1">Dibuat dengan ❤️ untuk keamanan dan dukungan komunitas.</p>
            </div>

            {/* Partner Logos - Horizontal layout */}
            <div className="flex items-center gap-8 flex-wrap justify-center">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Funded by:</span>
                <Image
                  src="/EU_funding_logo.png"
                  alt="European Union"
                  width={60}
                  height={60}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity w-10 h-10 md:w-15 md:h-15"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Didukung oleh:</span>
                <Image
                  src="/Logo-Amartha.png"
                  alt="Amartha"
                  width={60}
                  height={60}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity w-10 h-10 md:w-15 md:h-15"
                />
                <Image
                  src="/Artboard.jpg"
                  alt="DPIS UI"
                  width={60}
                  height={60}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity w-10 h-10 md:w-15 md:h-15"
                />
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};
