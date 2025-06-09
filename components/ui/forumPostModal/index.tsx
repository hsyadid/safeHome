"use client"
import Image from "next/image"
import close from "../../../public/close.svg"
import userImg from "../../../public/user.png"
import { useEffect, useState } from "react"
import Dropdown from "../dropdown"
import { useAuth } from "../../../lib/auth"

interface ForumPostModalProps {
  profileUrl: string;
  onClose: () => void;
  onPostSubmit?: (data: PostData) => void;
}

interface PostData {
  text: string;
  visibility: string;
  isAnonymous: boolean;
  role: string;
  userId?: number;
  profileUrl: string;
  name?: string;
}

const optionsVisibility = [
  { 
    value: "public", 
    label: "Publik", 
    icon: "/eye.svg",
    description: "Semua pengguna dapat melihat dan membalas."
  },
  { 
    value: "private", 
    label: "Private", 
    icon: "/eye-slash.svg",
    description: "Hanya admin yang dapat melihat dan membalas."
  },
];

const optionsRole = [
  { 
    value: "anonymous", 
    label: "Anonymous", 
    icon: "/user-icon.svg",
    description: "Posting dengan nama 'Anonymous'."
  },
  { 
    value: "buddy", 
    label: "Buddy", 
    icon: "/users.svg",
    description: "Posting sebagai pendamping penyintas."
  },
  { 
    value: "survivor", 
    label: "Penyintas", 
    icon: "/heart.svg",
    description: "Posting sebagai penyintas kekerasan."
  },
];


export default function ForumPostModal({onClose, onPostSubmit}: ForumPostModalProps) {
  const { user, isAdmin } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState(optionsVisibility[0].value);
  const [selectedRole, setSelectedRole] = useState(optionsRole[0].value);

  // Determine if posting as anonymous
  const isAnonymous = selectedRole === "anonymous";
  
  // Determine profile image to show
  const displayProfileUrl = isAnonymous ? userImg : (user?.profilePhoto || userImg);
  const displayName = isAnonymous ? "Anonymous" : (user?.username || "User");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      alert("Silakan tulis pesan terlebih dahulu");
      return;
    }

    // Prepare post data
    const postData = {
      text: postContent,
      visibility: isAdmin ? "public" : selectedVisibility,
      isAnonymous: isAdmin ? false : isAnonymous,
      role: isAdmin ? "admin" : (selectedRole === "anonymous" ? "user" : selectedRole),
      userId: user?.userId,
      profileUrl: isAdmin ? (user?.profilePhoto || userImg) : displayProfileUrl,
      name: isAdmin ? user?.username : displayName
    };
    
    // Submit the post data
    onPostSubmit?.(postData);
  };

  return(
    <>
      {/* Mobile View - Card Style with Options Icons */}
      <div className="md:hidden">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] transition-opacity duration-300" onClick={onClose} />
        <div className={`bg-white rounded-md fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[500px] overflow-hidden shadow-xl ${
          isAdmin ? 'max-h-[70vh]' : 'max-h-[85vh]'
        }`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Buat Postingan Baru</h2>
              <button 
                type="button"
                onClick={onClose}
                className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
              >
                <Image 
                  src={close}
                  alt="close"
                  width={18}
                  height={18}
                  className="object-cover"
                />
              </button>
            </div>
            
            <div className="flex flex-col divide-y divide-gray-100 overflow-y-auto custom-scrollbar">
              {/* Content Area */}
              <div className="p-4">
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="relative overflow-hidden rounded-full h-10 w-10 ring-2 ring-gray-100">
                      <Image 
                        src={displayProfileUrl}
                        alt="profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <textarea 
                    name="input"
                    id="input"
                    placeholder="Apa yang ingin kamu sampaikan?"
                    className="flex-1 p-2 text-base placeholder:text-gray-400 w-full resize-none min-h-[100px] focus:outline-none"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </div>

              {/* Options Area */}
              <div className="p-4 space-y-3">
                {/* Visibility Options - Hidden for Admin */}
                {!isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Siapa yang dapat melihat?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {optionsVisibility.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedVisibility(option.value)}
                          className={`flex items-center gap-2 p-2 rounded-md border transition-all duration-200 ${
                            selectedVisibility === option.value 
                              ? 'border-[#4F1718] bg-[#4F1718]/5 text-[#4F1718]' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            selectedVisibility === option.value ? 'bg-[#4F1718]/10' : 'bg-white border border-gray-200'
                          }`}>
                            <Image
                              src={option.icon}
                              alt={option.label}
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{option.label}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Role Options - Hidden for Admin */}
                {!isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Posting sebagai:</label>
                    <div className="grid grid-cols-1 gap-2">
                      {optionsRole.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedRole(option.value)}
                          className={`flex items-center gap-2 p-2 rounded-md border transition-all duration-200 ${
                            selectedRole === option.value 
                              ? 'border-[#4F1718] bg-[#4F1718]/5 text-[#4F1718]' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            selectedRole === option.value ? 'bg-[#4F1718]/10' : 'bg-white border border-gray-200'
                          }`}>
                            <Image
                              src={option.icon}
                              alt={option.label}
                              width={20}
                              height={20}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{option.label}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Info */}
                {isAdmin && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Mode Admin</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      Postingan akan dipublikasikan secara publik sebagai admin.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full mt-2 px-6 py-2.5 font-bold text-base text-white bg-[#4F1718] rounded-md hover:bg-[#3a1112] transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={!postContent.trim()}
                >
                  <span>Unggah Postingan</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] transition-opacity duration-300" onClick={onClose} />
        <div className={`bg-white rounded-xl fixed z-[10002] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] shadow-2xl flex flex-col ${
          isAdmin ? 'max-h-[60vh]' : 'min-h-[70vh] max-h-[85vh]'
        }`}>
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-800">Buat Postingan Baru</h2>
              <button 
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Image 
                  src={close}
                  alt="close"
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </button>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
              {/* Content Area */}
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="relative overflow-hidden rounded-full h-12 w-12 ring-2 ring-gray-100">
                      <Image 
                        src={displayProfileUrl}
                        alt="profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <textarea 
                    name="input"
                    id="input"
                    placeholder="Apa yang ingin kamu sampaikan?"
                    className={`flex-1 p-3 text-base placeholder:text-gray-400 w-full resize-none focus:outline-none bg-white ${
                      isAdmin ? 'min-h-[120px] max-h-[200px]' : 'min-h-[80px] max-h-[120px]'
                    }`}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </div>

              {/* Options Area */}
              <div className="px-4 py-2 space-y-3 bg-white">
                {/* Visibility Options - Hidden for Admin */}
                {!isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Siapa yang dapat melihat?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {optionsVisibility.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedVisibility(option.value)}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${
                            selectedVisibility === option.value 
                              ? 'border-[#4F1718] bg-[#4F1718]/5 text-[#4F1718]' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedVisibility === option.value ? 'bg-[#4F1718]/10' : 'bg-white border border-gray-200'
                          }`}>
                            <Image
                              src={option.icon}
                              alt={option.label}
                              width={18}
                              height={18}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{option.label}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Role Options - Hidden for Admin */}
                {!isAdmin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Posting sebagai:</label>
                    <div className="grid grid-cols-1 gap-2">
                      {optionsRole.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedRole(option.value)}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 ${
                            selectedRole === option.value 
                              ? 'border-[#4F1718]  text-[#4F1718]' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedRole === option.value ? 'bg-[#4F1718]/10' : 'bg-white border border-gray-200'
                          }`}>
                            <Image
                              src={option.icon}
                              alt={option.label}
                              width={18}
                              height={18}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">{option.label}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Info */}
                {isAdmin && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Mode Admin</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      Postingan akan dipublikasikan secara publik sebagai admin.
                    </p>
                  </div>
                )}
              </div>

              
            </div>

              <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                  <button 
                    type="submit"
                    className="w-full px-6 py-3 font-bold text-base text-white bg-[#4F1718] rounded-lg hover:bg-[#3a1112] transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={!postContent.trim()}
                  >
                    <span>Unggah Postingan</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
              </div>
                
          </form>
        </div>
      </div>
    </>
  )
}
