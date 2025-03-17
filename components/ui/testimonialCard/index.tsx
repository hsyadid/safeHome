import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  role: string;
  description: string;
  className?: string;
}

export const TestimonialCard = ({
  name,
  role,
  description,
  className
}: TestimonialCardProps) => {
  return (
    <div className={`bg-white border-[1px] border-solid border-rose-200 rounded-[24px] p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <Image 
            src="/avatar-placeholder.png" 
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h3 className="font-jakarta font-semibold text-lg">{name}</h3>
          <p className="font-jakarta text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <p className="font-jakarta text-gray-600">
        {description}
      </p>
    </div>
  )
} 