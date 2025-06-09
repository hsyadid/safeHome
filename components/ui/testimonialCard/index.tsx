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
  // Generate initials from name
  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Generate background color based on first letter
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={`bg-[#f0eee4] border-2 border-solid border-[#4F1718] rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${getAvatarColor(name)} flex items-center justify-center text-white font-bold text-sm`}>
          {getInitials(name)}
        </div>
        
        <div>
          <h3 className="font-jakarta font-semibold text-lg">{name}</h3>
          <p className="font-jakarta text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <p className="font-jakarta text-gray-600 flex-1">
        {description}
      </p>
    </div>
  )
} 