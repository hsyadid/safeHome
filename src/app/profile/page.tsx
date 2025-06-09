'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/../lib/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/../components/elements/navbar';
import { EditProfileModal } from '@/../components/elements/profile/EditProfileModal';
import userImg from "@/../public/user.png";
import chevronDown from "@/../public/chevron-down.svg";

interface ForumPost {
  id: number;
  profileUrl: string;
  name: string;
  role: string;
  date: string;
  text: string;
  visibility: "public" | "private";
  isAnonymous: boolean;
  userId?: number;
  replies: Reply[];
}

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
  postId: number;
  replies: Reply[] | null;
}

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [openReplies, setOpenReplies] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // Render avatar component
  const renderAvatar = (profilePhoto: string | null | undefined, name: string, size: string = 'w-10 h-10') => {
    if (profilePhoto && profilePhoto !== '') {
      return (
        <Image
          src={profilePhoto}
          alt="Profile"
          fill
          className="object-cover"
        />
      );
    }

    return (
      <div className={`${getAvatarColor(name)} flex items-center justify-center text-white font-bold text-sm w-full h-full`}>
        {getInitials(name)}
      </div>
    );
  };

  // Fetch user's posts and replies
  const fetchUserActivity = async () => {
    if (!user?.userId) return;
    
    setIsLoading(true);
    try {
      // Fetch user's posts
      const postsResponse = await fetch(`http://localhost:3001/posts/user/${user.userId}`);
      if (postsResponse.ok) {
        const userPosts = await postsResponse.json();
        // Transform backend data to frontend format
        const transformedPosts = userPosts.map((post: any) => ({
          id: post.id,
          profileUrl: post.profileUrl,
          name: post.name,
          role: post.role,
          date: new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          text: post.text,
          visibility: post.publicity as "public" | "private",
          isAnonymous: post.name === 'Anonymous',
          userId: user.userId, // Add userId from current user since backend doesn't have it yet
          replies: post.replies?.map((reply: any) => ({
            id: reply.id,
            profileUrl: reply.profileUrl,
            name: reply.name,
            role: reply.role,
            date: new Date(reply.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
            text: reply.text,
            visibility: reply.publicity as "public" | "private",
            isAnonymous: reply.name === 'Anonymous',
            userId: reply.userId,
            postId: reply.postId,
            replies: null
          })) || []
        }));
        setPosts(transformedPosts);
      }

      // Fetch user's replies
      const repliesResponse = await fetch(`http://localhost:3001/replies/user/${user.userId}`);
      if (repliesResponse.ok) {
        const userReplies = await repliesResponse.json();
        // Transform backend data to frontend format
        const transformedReplies = userReplies.map((reply: any) => ({
          id: reply.id,
          profileUrl: reply.profileUrl,
          name: reply.name,
          role: reply.role,
          date: new Date(reply.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          text: reply.text,
          visibility: reply.publicity as "public" | "private",
          isAnonymous: reply.name === 'Anonymous',
          userId: user.userId,
          postId: reply.postId,
          replies: null
        }));
        setReplies(transformedReplies);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
      // Fallback to mock data for now
      setPosts([
        {
          id: 1,
          profileUrl: user?.profilePhoto || '/bantu.jpg',
          name: user?.username || 'User',
          role: user?.role || 'user',
          date: 'Jul 11, 2024',
          text: 'SUDAHH SAATNYAA nih akun di apa apain',
          visibility: 'private',
          isAnonymous: false,
          userId: user?.userId,
          replies: [
            {
              id: 2,
              profileUrl: '/bantu.jpg',
              name: 'Sarah',
              role: 'survivor',
              date: 'Jul 12, 2024',
              text: 'Wah keren banget!',
              visibility: 'public',
              isAnonymous: false,
              userId: 2,
              postId: 1,
              replies: null
            }
          ]
        },
        {
          id: 3,
          profileUrl: user?.profilePhoto || '/bantu.jpg',
          name: user?.username || 'User',
          role: user?.role || 'user',
          date: 'Mar 7, 2024',
          text: 'POKOKnya ini part yang paling gua suka titik',
          visibility: 'private',
          isAnonymous: false,
          userId: user?.userId,
          replies: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    fetchUserActivity();
  }, [isAuthenticated, router, user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      logout();
      // Add small delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoggingOut(false);
    }
  };

  const toggleReplies = (postId: number) => {
    const newOpenReplies = new Set(openReplies);
    if (openReplies.has(postId)) {
      newOpenReplies.delete(postId);
    } else {
      newOpenReplies.add(postId);
    }
    setOpenReplies(newOpenReplies);
  };

  const visibilityStyles = {
    public: 'bg-[#d6d3d3] text-[#2d2b2e]',
    private: 'bg-[#ad8861] text-white'
  };

  // Combine posts and replies for activity feed
  const getAllActivity = () => {
    const allActivity = [
      ...posts.map(post => ({ ...post, type: 'post' as const })),
      ...replies.map(reply => ({ ...reply, type: 'reply' as const }))
    ];
    
    // Sort by date (newest first)
    return allActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 text-center">Loading...</p>
              </div>
    </div>
    );
  }

  const allActivity = getAllActivity();


  return (
    <>
      {/* Logout Loading Overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Keluar dari akun...</p>
            <p className="text-sm text-gray-500 mt-2">Mohon tunggu sebentar</p>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section with Same Pattern as Peta Layanan */}
      <div className="relative bg-gradient-to-r from-[#4F1718] via-[#6B2425] to-[#8B3538] overflow-hidden">
        {/* Background Pattern - Same as Peta Layanan */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => router.back()}
              className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
            >
              <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors duration-300">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5 duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-lg text-left">{user.username}</span>
                <p className="text-sm text-white/60 text-left">{allActivity.length} aktivitas</p>
              </div>
            </button>
          </div>

          {/* Profile Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative overflow-hidden rounded-full h-20 w-20 border-4 border-[#4F1718] shadow-lg flex-shrink-0">
                {renderAvatar(user?.profilePhoto, user?.username || 'User')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-6 py-2 bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoggingOut ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Keluar...</span>
                        </>
                      ) : (
                        'Keluar'
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#4F1718]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Bergabung {new Date('2023-12-01').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#4F1718]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                    </svg>
                    <span>{posts.length} postingan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aktivitas Forum</h2>
          <p className="text-gray-600">Postingan dan balasan Anda di komunitas SafeHome</p>
        </div>

        {/* Activity Loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat aktivitas...</p>
          </div>
        )}

        {/* Activity Content */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {allActivity.map((activity) => (
            <div key={`${activity.type}-${activity.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Activity Type Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'post' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {activity.type === 'post' ? 'Postingan' : 'Balasan'}
                  </div>
                  {activity.type === 'reply' && (
                    <span className="text-xs text-gray-500">
                      menanggapi post ID: {(activity as Reply).postId}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="relative overflow-hidden rounded-full h-10 w-10 flex-shrink-0">
                    {renderAvatar(activity.isAnonymous ? null : (activity.profileUrl || user?.profilePhoto), activity.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {activity.isAnonymous ? 'Anonymous' : activity.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${visibilityStyles[activity.visibility]}`}>
                        {activity.visibility}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{activity.role} • {activity.date}</p>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4 leading-relaxed">{activity.text}</p>
                
                {activity.type === 'post' && (activity as ForumPost).replies.length > 0 && (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-2">Balasan pada postingan ini</div>
                    <button 
                      className="inline-flex items-center gap-2 text-[#4F1718] font-medium hover:text-[#3a1112] transition-colors cursor-pointer text-sm" 
                      onClick={() => toggleReplies(activity.id)}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${openReplies.has(activity.id) ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {(activity as ForumPost).replies.length} balasan
                    </button>
                    
                    {/* Replies */}
                    {openReplies.has(activity.id) && (
                      <div className="mt-4 space-y-3 border-l-2 border-[#4F1718] pl-4">
                        {(activity as ForumPost).replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="relative overflow-hidden rounded-full h-8 w-8 flex-shrink-0">
                                {renderAvatar(reply.isAnonymous ? null : reply.profileUrl, reply.name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    {reply.isAnonymous ? 'Anonymous' : reply.name}
                                  </h4>
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${visibilityStyles[reply.visibility]}`}>
                                    {reply.visibility}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-xs">{reply.role} • {reply.date}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Empty State for Activity */}
          {!isLoading && allActivity.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada aktivitas</h3>
              <p className="text-gray-600">Mulai berbagi pengalaman Anda dengan komunitas SafeHome</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
      </div>
    </>
  );
} 