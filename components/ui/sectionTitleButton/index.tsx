import { FaAngleRight } from "react-icons/fa6";

interface SectionTitleProps {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descClassName?: string;
}

interface SectionTitleHeroProps {
    description?: string;
    className?: string;
    descClassName?: string;
}
  
export function SectionTitle({ 
    title, 
    description, 
    className,
    titleClassName,
    descClassName
}: SectionTitleProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className={`space-y-2 ${className}`}>
                <h2 className={`font-jakarta ${titleClassName}`}>
                    {title}
                </h2>
                {description && (
                    <p className={`font-jakarta text-gray-600 ${descClassName}`}>
                        {description}
                    </p>
                )}
            </div>
            <div>
                <button className="flex items-center justify-center px-8 py-3 gap-3 text-lg font-bold rounded-[15px] bg-button text-white">
                    Pelajari Lebih Lanjut <FaAngleRight />
                </button>
            </div>
        </div>
    )
}

export function SectionTitleHero({ 
    description, 
    className,
    descClassName
}: SectionTitleHeroProps) {
    return (
        <div className={`flex flex-col justify-center items-center gap-5 ${className}`}>
            <div className={`gap-3 text-center flex flex-col justify-center items-center `}>
                <h2 className={`font-jakarta  h-fit font-bold text-3xl md:text-6xl lg:text-7xl tracking-wide`}>
                    SafeHome: Pulang <br /> ke <span className="bg-gradient-to-r from-[#4f1818] via-[#662D91] to-[#005e81] text-transparent bg-clip-text"> Ruang Amanmu </span>
                </h2>
                {description && (
                    <p className={`font-jakarta text-gray-600 ${descClassName}  max-w-[650px]`}>
                        {description}
                    </p>
                )}
            </div>
            <div>
                <div className="flex justify-center items-center gap-12 h-full">
                    <button className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#d40000] via-[#b10000] to-[#ba8475] rounded-[16px]"></div>
                        <div className="relative bg-gradient-to-b from-[#b10000] to-[#d40000/80] rounded-[12px] p-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] group-active:scale-[0.995]">
                            <div className="bg-gradient-to-b from-[#d40000/60] to-[#b10000/80] rounded-[8px] px-2 py-2">
                                <div className="flex gap-2 items-center">
                                    <span className="font-semibold text-white">Darurat Hubungi Sekarang!</span>
                                </div>
                            </div>
                        </div>
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