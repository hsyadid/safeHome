"use client"
import Image from "next/image"
import ForumPost, { ForumPostProps } from "../../components/ui/forumPost"
import plus from "../../public/plus.svg"
import ForumPostModal from "../../components/ui/forumPostModal"
import { useState, useEffect } from "react"
import { useAuth } from "../../lib/auth"
import { useToast } from "../../components/ui/toast"

interface Post {
  id: number;
  profileUrl: string;
  name: string;
  role: string;
  date: string;
  text: string;
  visibility: "public" | "private";
  isAnonymous: boolean;
  userId?: number;
  replies?: Reply[];
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
  replies?: Reply[] | null;
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { showToast, ToastContainer } = useToast();

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://safehomeanara.id/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      
      // Transform backend data and sort by newest first
      const transformedPosts: Post[] = data
        .map((item: any) => ({
          id: item.id,
          profileUrl: item.profileUrl || "/user.png",
          name: item.name,
          role: item.role,
          date: formatDate(item.date || item.createdAt),
          text: item.text,
          visibility: item.visibility || "public",
          isAnonymous: item.isAnonymous || false,
          userId: item.userId,
          replies: item.replies ? transformReplies(item.replies) : []
        }))
        .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      showToast('Gagal memuat postingan', 'error');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to transform replies tanpa nested structure
  const transformReplies = (replies: any[]): Reply[] => {
    // Semua replies langsung ke post, tanpa nested
    return replies.map(reply => ({
      id: reply.id,
      profileUrl: reply.profileUrl || "/user.png",
      name: reply.name,
      role: reply.role,
      date: formatDate(reply.date || reply.createdAt),
      text: reply.text,
      visibility: reply.visibility || "public",
      isAnonymous: reply.isAnonymous || false,
      userId: reply.userId,
      replies: null // Tidak ada nested replies
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  const loadMorePosts = () => {
    setDisplayedPosts(prev => Math.min(prev + 5, posts.length));
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      try {
        const response = await fetch(`https://safehomeanara.id/api/posts/${postId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchPosts(); // Refresh posts
        } else {
          throw new Error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Terjadi kesalahan saat menghapus postingan');
      }
    }
  };

  const handleReply = async (parentId: number, replyText: string, isAnonymous: boolean, visibility: "public" | "private") => {
    if (!isAuthenticated || !user) {
      showToast('Anda harus login untuk membalas', 'error');
      return;
    }

    try {
      // Semua replies langsung ke post - parentId adalah post ID
      const replyData = {
        postId: parentId, // parentId sekarang adalah post ID
        text: replyText,
        visibility,
        isAnonymous,
        // Hanya kirim userId jika bukan anonymous
        userId: isAnonymous ? null : user.userId,
        name: isAnonymous ? "Anonymous" : user.username,
        role: user.role || "user",
        profileUrl: isAnonymous ? "/user.png" : (user.profilePhoto || "/user.png")
      };

      console.log('Sending reply data:', replyData); // Debug log

      const response = await fetch('https://safehomeanara.id/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts to include new reply
        showToast('Balasan berhasil dikirim!', 'success');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to create reply');
      }
    } catch (error) {
      console.error('Error creating reply:', error);
      showToast('Terjadi kesalahan saat mengirim balasan', 'error');
    }
  };

  const handleCreatePost = async (postData: any) => {
    if (!isAuthenticated || !user) {
      showToast('Anda harus login untuk membuat postingan', 'error');
      return;
    }

    console.log('Creating post:', postData);

    try {
      const newPostData = {
        text: postData.text,
        visibility: postData.visibility,
        isAnonymous: postData.isAnonymous,
        // Hanya kirim userId jika bukan anonymous
        userId: postData.isAnonymous ? null : user.userId,
        name: postData.isAnonymous ? "Anonymous" : user.username,
        role: user.role || "user",
        profileUrl: postData.isAnonymous ? "/user.png" : (user.profilePhoto || "/user.png")
      };

      const response = await fetch('https://safehomeanara.id/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPosts(); // Refresh posts
        showToast('Postingan berhasil dibuat!', 'success');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      showToast('Terjadi kesalahan saat membuat postingan', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f0eee4] to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-jakarta text-gray-700 text-center">
            Memuat diskusi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-[#f0eee4] to-purple-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#1a0b0c] via-[#4F1718] to-[#823633] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c2987c' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-block mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jakarta text-white mb-4 drop-shadow-lg">
                Forum
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                Komunitas SafeHome
              </p>
            </div>
            
            <div className="bg-[#f0eee4]/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <div className="flex items-center justify-center gap-6">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <div className="text-white">
                  <h3 className="text-2xl font-bold">Bergabung dalam Diskusi</h3>
                  <p className="text-white/80">Berbagi cerita, dapatkan dukungan, dan beri dukungan kepada orang lain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Create Post Button */}
        {isAuthenticated && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-3"
            >
              <Image
                src={plus}
                alt="create post"
                width={24}
                height={24}
                className="filter brightness-0 invert"
              />
              Buat Postingan
            </button>
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Belum ada diskusi
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              {isAuthenticated 
                ? "Jadilah yang pertama membuat postingan di komunitas ini!"
                : "Login untuk melihat dan berpartisipasi dalam diskusi komunitas."
              }
            </p>
            {isAuthenticated && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                💬 Mulai Diskusi
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {posts.slice(0, displayedPosts).map((post) => (
                <ForumPost
                  key={post.id}
                  id={post.id}
                  profileUrl={post.profileUrl}
                  name={post.name}
                  role={post.role}
                  date={post.date}
                  text={post.text}
                  visibility={post.visibility}
                  isAnonymous={post.isAnonymous}
                  userId={post.userId}
                  replies={post.replies}
                  onDelete={handleDeletePost}
                  onReply={handleReply}
                />
              ))}
            </div>

            {/* Load More Button */}
            {displayedPosts < posts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMorePosts}
                  className="bg-[#f0eee4] hover:bg-[#e8e6df] text-[#4F1718] px-8 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 border border-[#4F1718]/20"
                >
                  Muat Lebih Banyak ({posts.length - displayedPosts} postingan tersisa)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <ForumPostModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}