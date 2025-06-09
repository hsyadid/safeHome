import { useEffect } from "react";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";

interface SectionTitleProps {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descClassName?: string;
    onClick?: () => void;
    href?: string;
}

interface SectionTitleHeroProps {
    description?: string;
    className?: string;
    descClassName?: string;
}

const handleEmergencyCall = () => {
    const emergencyNumber = "628111129129"; // NOMOR DARURAT
    const message = "Saya membutuhkan bantuan! Ini adalah panggilan darurat.";
    const whatsappUrl = `https://wa.me/${emergencyNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};
  
export function SectionTitle({ 
    title, 
    description, 
    className,
    titleClassName,
    descClassName,
    onClick,
    href
}: SectionTitleProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="flex flex-col gap-5 md:items-start items-center justify-center">
            <div className={`space-y-2 ${className}`}>
                <h2 className={`font-jakarta text-center md:text-left ${isMobile ? 'text-3xl' : 'text-2xl'} ${titleClassName}`}>
                    {title}
                </h2>
                {description && (
                    <p className={`font-jakarta text-gray-600 text-center md:text-left ${isMobile ? 'text-xl' : 'text-base'} ${descClassName}`}>
                        {description}
                    </p>
                )}
            </div>
            <div>
                {href ? (
                    <a 
                        href={href}
                        className="flex items-center justify-center px-8 py-3 gap-3 text-lg font-bold rounded-[15px] bg-button text-white hover:bg-button/90 transition-colors duration-200"
                    >
                        Pelajari Lebih Lanjut <FaAngleRight />
                    </a>
                ) : (
                    <button 
                        onClick={onClick}
                        className="flex items-center justify-center px-8 py-3 gap-3 text-lg font-bold rounded-[15px] bg-button text-white hover:bg-button/90 transition-colors duration-200"
                    >
                        Pelajari Lebih Lanjut <FaAngleRight />
                    </button>
                )}
            </div>
        </div>
    )
}

export function SectionTitleHero({ 
    description, 
    className,
    descClassName
}: SectionTitleHeroProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`flex flex-col justify-center items-center gap-5 ${className}`}>
            <div className={`gap-3 text-center flex flex-col justify-center items-center`}>
                <h2 className={`font-jakarta h-fit font-bold ${isMobile ? 'text-6xl' : 'text-3xl md:text-6xl lg:text-7xl'} tracking-wide`}>
                    SafeHome: Pulang <br /> ke <span className="bg-gradient-to-r from-[#4f1818] via-[#662D91] to-[#005e81] text-transparent bg-clip-text"> Ruang Amanmu </span>
                </h2>
                {description && (
                    <p className={`font-jakarta text-gray-600 ${isMobile ? 'text-lg' : 'text-lg'} ${descClassName} max-w-[650px]`}>
                        {description}
                    </p>
                )}
            </div>
            <div>
                <div className={`flex justify-center items-center gap-12 h-full ${isMobile ? 'mt-5' : ''}`}>
                    <button 
                        onClick={handleEmergencyCall}
                        className="relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 transition-all duration-250 hover:brightness-110 select-none touch-manipulation group"
                    >
                        <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/40 will-change-transform translate-y-[2px] transition-transform duration-700 ease-out group-hover:translate-y-1 group-active:translate-y-[1px] group-active:transition-transform group-active:duration-75"></span>
                        <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d]"></span>
                        <span className={`block relative px-8 rounded-xl ${isMobile ? 'text-3xl py-4 ' : 'text-xl py-4 '} font-bold text-white bg-[#b91c1c] will-change-transform -translate-y-1 transition-transform duration-700 ease-out group-hover:-translate-y-[6px] group-hover:transition-transform group-hover:duration-300 group-hover:ease-out group-active:-translate-y-[2px] group-active:transition-transform group-active:duration-75`}>
                            🚨 Bantuan Darurat
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

SectionTitle.displayName = 'SectionTitle';
SectionTitleHero.displayName = 'SectionTitleHero';

const components = {
    SectionTitle,
    SectionTitleHero
};

export default components;