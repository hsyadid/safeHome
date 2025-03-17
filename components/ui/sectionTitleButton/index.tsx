import { FaAngleRight } from "react-icons/fa6";

interface SectionTitleProps {
    title: string;
    description?: string;
    className?: string;
    titleClassName?: string;
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
            <div className={`space-y-1 w-[680px] ${className}`}>
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