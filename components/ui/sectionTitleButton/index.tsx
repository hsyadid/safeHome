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
  
export const SectionTitle = ({ 
    title, 
    description, 
    className,
    titleClassName,
    descClassName
}: SectionTitleProps) => {
    return (
        <div className="flex flex-col gap-5">
            <div className={`space-y-2 w-[680px] ${className}`}>
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

export const SectionTitleHero = ({ 
    description, 
    className,
    descClassName
}: SectionTitleHeroProps) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-5 ${className}`}>
            <div className={`space-y-3 text-center flex flex-col justify-center items-center `}>
                <h2 className={`font-jakarta w-[730px] h-fit font-bold text-7xl tracking-wide`}>
                    SafeHome: Pulang ke <span className="bg-gradient-to-r from-[#4f1818] via-[#662D91] to-[#005e81] inline-block text-transparent bg-clip-text h-[82px] "> Ruang Amanmu </span>
                </h2>
                {description && (
                    <p className={`font-jakarta text-gray-600 ${descClassName}  w-[650px]`}>
                        {description}
                    </p>
                )}
            </div>
            <div>
                    <div className="flex justify-center items-center gap-12 h-full ">
                        <div className="bg-gradient-to-b from-[#d40000] via-[#b10000] to-[#ba8475] p-[4px] rounded-[16px]">
                            <button className="group p-[4px] rounded-[12px] bg-gradient-to-b from-[#b10000] to-[#d40000/80] shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
                            <div className="bg-gradient-to-b from-[#d40000/60] to-[#b10000/80] rounded-[8px] px-2 py-2">
                                <div className="flex gap-2 items-center">
                                <span className="font-semibold text-white">Darurat Hubungi Sekarang!</span>
                                </div>
                            </div>
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}