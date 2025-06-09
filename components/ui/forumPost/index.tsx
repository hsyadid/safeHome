import Image from "next/image"
import chevronDown from "../../../public/chevron-down.svg"
import userImg from "../../../public/user.png"
import { useState } from "react";
import { useAuth } from "../../../lib/auth"
import Avatar from "../avatar"

interface Reply {
    id: number;
    profileUrl: string;
    name: string;
    role: string;
    date: string;
    text: string;
    visibility: "public" | "private";
    isAnonymous: boolean;
    userId?: number;
    replies?: Reply[] | null;
}

export interface ForumPostProps {
    id: number;
    profileUrl: string;
    name: string;
    role: string;
    date: string;
    text: string;
    visibility: "public" | "private";
    isAnonymous: boolean;
    userId?: number;
    replies?: Reply[] | null;
    onDelete?: (id: number) => void;
    onReply?: (parentId: number, replyText: string, isAnonymous: boolean, visibility: "public" | "private") => void;
    parentVisibility?: "public" | "private"; // Untuk menentukan visibilitas dari parent post
    originalPosterId?: number; // ID pembuat post asli untuk private posts
}

const ForumPost = ({
    id,
    profileUrl,
    name,
    role,
    date,
    text,
    visibility,
    isAnonymous,
    userId,
    replies,
    onDelete,
    onReply,
    parentVisibility,
    originalPosterId
}: ForumPostProps) => {
    const { user, isAdmin } = useAuth();
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replyAnonymous, setReplyAnonymous] = useState(false);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    
    // Tentukan visibilitas yang akan digunakan (dari parent atau current post)
    const currentVisibility = parentVisibility || visibility;
    const currentOriginalPosterId = originalPosterId || userId;
    
    // Check if this is an admin post
    const isAdminPost = role === "admin";
    
    const canSeePost = () => {
        if (visibility === "public") return true;
        if (isAdmin) return true; 
        if (user?.userId === userId) return true; // Poster bisa lihat post sendiri
        if (user?.userId === originalPosterId) return true; // Original poster bisa lihat semua replies
        return false; 
    };

    // Cek apakah user bisa membalas post private
    const canReplyToPrivatePost = () => {
        if (currentVisibility === "public") return true;
        if (isAdmin) return true;
        if (user?.userId === currentOriginalPosterId) return true; // Original poster bisa reply
        return false; 
    };

    if (!canSeePost()) {
        return null;
    }

    const visibleReplies = replies?.filter(reply => {
        if (reply.visibility === "public") return true;
        if (isAdmin) return true; 
        if (user?.userId === reply.userId) return true; // User bisa lihat reply sendiri
        if (user?.userId === currentOriginalPosterId) return true; // Original poster bisa lihat semua replies
        return false; 
    }) || [];

    const visibilityStyles = {
        public: 'bg-[#d6d3d3] text-[#2d2b2e]',
        private: 'bg-[#ad8861] text-white'
    };

    const displayProfileUrl = isAnonymous ? userImg : profileUrl;
    const displayName = isAnonymous ? "Anonymous" : name;

    const handleReplySubmit = (parentId: number) => {
        if (!replyText.trim()) return;
        
        // Admin reply selalu public, non-admin mengikuti parent post
        const replyVisibility = isAdmin ? "public" : currentVisibility;
        const replyIsAnonymous = isAdmin ? false : replyAnonymous;
        
        onReply?.(parentId, replyText, replyIsAnonymous, replyVisibility);
        setReplyText("");
        setReplyAnonymous(false);
        setShowReplyForm(false);
        setReplyingTo(null);
    };

    const ReplyForm = ({ parentId }: { parentId: number }) => {
        const [localReplyText, setLocalReplyText] = useState("");
        const [localReplyAnonymous, setLocalReplyAnonymous] = useState(false);
        
        const handleLocalSubmit = () => {
            if (!localReplyText.trim()) return;
            
            // Admin reply selalu public, non-admin mengikuti parent post
            const replyVisibility = isAdmin ? "public" : currentVisibility;
            const replyIsAnonymous = isAdmin ? false : localReplyAnonymous;
            
            onReply?.(parentId, localReplyText, replyIsAnonymous, replyVisibility);
            setLocalReplyText("");
            setLocalReplyAnonymous(false);
            setShowReplyForm(false);
            setReplyingTo(null);
        };

        return (
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="space-y-4">
                <textarea
                    value={localReplyText}
                    onChange={(e) => setLocalReplyText(e.target.value)}
                    placeholder="Tulis balasan Anda..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#4F1718] focus:border-transparent focus:outline-none"
                    rows={3}
                    autoFocus
                />
            
                {!isAdmin && (
                    <div>
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={localReplyAnonymous}
                                    onChange={(e) => setLocalReplyAnonymous(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                                    localReplyAnonymous 
                                        ? 'bg-[#4F1718] border-[#4F1718]' 
                                        : 'border-gray-300 bg-white group-hover:border-[#4F1718]'
                                }`}>
                                    {localReplyAnonymous && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                Posting sebagai Anonymous
                            </span>
                        </label>
                    </div>
                )}
            
            {/* Info visibilitas mengikuti parent */}
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isAdmin 
                        ? "Balasan admin akan otomatis dipublikasikan secara public dan tidak anonymous"
                        : `Balasan akan mengikuti visibilitas diskusi utama: ${currentVisibility === "public" ? "Public" : "Private"}`
                    }
                </p>
                {currentVisibility === "private" && !isAdmin && (
                    <p className="text-xs text-blue-600 mt-1">
                        Hanya Anda dan admin yang dapat melihat balasan ini.
                    </p>
                )}
            </div>
            
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => {
                            setShowReplyForm(false);
                            setReplyingTo(null);
                            setLocalReplyText("");
                            setLocalReplyAnonymous(false);
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleLocalSubmit}
                        disabled={!localReplyText.trim()}
                        className="px-4 py-2 bg-[#4F1718] text-white rounded-lg hover:bg-[#3a1112] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Kirim Balasan
                    </button>
                </div>
            </div>
        </div>
        );
    };

    return (
        <div id={`forum-post-${id}`} className="font-jakarta">
            {/* Main Post Container with improved styling */}
            <div className={`
                bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                border border-gray-100 overflow-hidden
                ${isAdminPost ? 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/30 to-white' : 'hover:border-gray-200'}
            `}>
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`relative flex-shrink-0 border-2 rounded-full ${isAdminPost ? 'border-blue-500' : 'border-[#4F1718]'}`}>
                            <Avatar 
                                src={profileUrl}
                                name={name}
                                isAnonymous={isAnonymous}
                                size="md"
                            />
                            {isAdminPost && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-lg font-semibold ${isAdminPost ? 'text-blue-900' : 'text-gray-900'}`}>
                                    {displayName}
                                    {isAdminPost && (
                                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Admin
                                        </span>
                                    )}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${visibilityStyles[visibility]}`}>
                                    {visibility}
                                </span>
                                {user?.role === "admin" && (
                                    <span className="px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700 border border-gray-200">
                                        {isAnonymous ? "Anon" : "Named"}
                                    </span>
                                )}
                                {isAdmin && onDelete && (
                                    <button
                                        onClick={() => onDelete(id)}
                                        className="ml-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                        title="Hapus Post"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <p className={`text-sm ${isAdminPost ? 'text-blue-700' : 'text-gray-600'}`}>{role} • {date}</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50/50 rounded-xl p-4 mb-6">
                        <p className="text-gray-800 text-base leading-relaxed">{text}</p>
                    </div>
                    
                    {/* Reply Button for Main Post - hanya tampil jika user bisa membalas */}
                    {canReplyToPrivatePost() && (
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => {
                                    setShowReplyForm(!showReplyForm);
                                    setReplyingTo(showReplyForm ? null : id);
                                }}
                                className="flex items-center gap-2 text-[#4F1718] hover:text-[#3a1112] font-medium transition-all duration-200 hover:bg-[#4F1718]/5 px-3 py-2 rounded-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                Balas
                            </button>
                        </div>
                    )}

                    {/* Reply Form for Main Post */}
                    {showReplyForm && replyingTo === id && <ReplyForm parentId={id} />}
                    
                    {visibleReplies.length > 0 && (
                        <div className="border-t border-gray-200 pt-6">
                            <button 
                                className="inline-flex items-center gap-2 text-[#4F1718] font-semibold hover:text-[#3a1112] transition-all duration-200 hover:bg-[#4F1718]/5 px-3 py-2 rounded-lg" 
                                onClick={() => setIsReplyOpen(!isReplyOpen)}
                            >
                                <svg className={`w-5 h-5 transition-transform duration-300 ${isReplyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                {visibleReplies.length} balasan
                            </button>
                            
                            {/* Replies */}
                            {isReplyOpen && (
                                <div className="mt-6 space-y-4">
                                    {visibleReplies.map((reply) => {
                                        const isAdminReply = reply.role === "admin";
                                        return (
                                        <div key={reply.id} className={`
                                            bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4
                                            ${isAdminReply ? 'border-l-4 border-l-blue-400 bg-gradient-to-r from-blue-50/30 to-white' : 'border-l-4 border-l-[#4F1718]/20'}
                                        `}>
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className={`relative flex-shrink-0 ${isAdminReply ? 'border-2 border-blue-400 rounded-full' : ''}`}>
                                                    <Avatar 
                                                        src={reply.profileUrl}
                                                        name={reply.name}
                                                        isAnonymous={reply.isAnonymous}
                                                        size="sm"
                                                    />
                                                    {isAdminReply && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className={`text-sm font-semibold ${isAdminReply ? 'text-blue-900' : 'text-gray-900'}`}>
                                                            {reply.isAnonymous ? "Anonymous" : reply.name}
                                                            {isAdminReply && (
                                                                <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    Admin
                                                                </span>
                                                            )}
                                                        </h4>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${visibilityStyles[reply.visibility]}`}>
                                                            {reply.visibility}
                                                        </span>
                                                        {user?.role === "admin" && (
                                                            <span className="px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                                                                {reply.isAnonymous ? "Anon" : "Named"}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-xs ${isAdminReply ? 'text-blue-700' : 'text-gray-600'}`}>{reply.role} • {reply.date}</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50/50 rounded-lg p-3 mb-3">
                                                <p className="text-gray-700 text-sm">{reply.text}</p>
                                            </div>
                                        </div>
                                    );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForumPost;