"use client"
import ArtikelCard from "../../components/ui/artikelCard"
import Image from "next/image"
import plus from "../../public/plus.svg"
import InformasiModal from "../../components/ui/informasiModal"
import { useState, useEffect } from "react"
import { useAuth } from "../../lib/auth"
import { ENDPOINTS } from "../../config/api"
// import { contentData, ContentItem } from "../../data/content"

interface ContentItem {
  id: number;
  title: string;
  type: 'ARTICLE' | 'VIDEO';
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
  summary?: string;
  videoUrl?: string;
  duration?: number;
}
import { useRouter } from "next/navigation"
import VideoModal from "../../components/ui/videoModal"
import AdminForm from "../../components/ui/adminForm"
import AdminActions from "../../components/ui/adminActions"
import { DEFAULT_IMAGES } from "../../lib/constants"

export default function() {
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ContentItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();
  const router = useRouter();
  
  // Fetch content from backend
  const fetchContents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(ENDPOINTS.CONTENT.GET_ALL);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setContents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchContents();
  }, []);

  const handleContentClick = (content: ContentItem) => {
    if (content.type === "VIDEO") {
      setSelectedVideo(content);
      setShowVideoModal(true);
    } else {
      router.push(`/artikel/${content.id}`);
    }
  };

  const getViewCount = (id: number) => {
    // Generate consistent view count based on article id
    return ((id * 17 + 43) % 100) + 50;
  };

  // Admin handlers
  const handleAddContent = () => {
    setEditingContent(null);
    setShowAdminForm(true);
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setShowAdminForm(true);
  };

  const handleDeleteContent = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konten ini?')) {
      try {
        const response = await fetch(ENDPOINTS.CONTENT.DELETE(id), {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Konten berhasil dihapus!');
          fetchContents(); // Refresh data
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting content:', error);
        alert('Terjadi kesalahan saat menghapus data');
      }
    }
  };

  const handleSubmitContent = async (data: any) => {
    try {
      const contentData = {
        title: data.title,
        type: data.type,
        thumbnail: data.thumbnail,
        videoUrl: data.videoUrl || null,
        duration: data.duration ? parseInt(data.duration) : null,
        content: data.content || null,
        summary: data.summary || null,
      };

      let response;
      if (editingContent) {
        // Update content
        response = await fetch(ENDPOINTS.CONTENT.UPDATE(editingContent.id), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contentData),
        });
      } else {
        // Add new content  
        response = await fetch(ENDPOINTS.CONTENT.CREATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contentData),
        });
      }

      if (response.ok) {
        alert(editingContent ? 'Konten berhasil diperbarui!' : 'Konten berhasil ditambahkan!');
        setShowAdminForm(false);
        setEditingContent(null);
        fetchContents(); // Refresh data
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error submitting content:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b0c] via-[#4F1718] to-[#2d1114] relative">
              {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-rose-400/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-red-400/30 to-orange-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Modal Overlays */}
      {showModal && <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"></div>}
      {showModal && (
        <InformasiModal
          onClose={() => setShowModal(false)}
          profileUrl="/okegas.jpg"
        />
      )}
      
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center">
          <VideoModal
            video={selectedVideo}
            onClose={() => {
              setShowVideoModal(false);
              setSelectedVideo(null);
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 min-h-screen">
        {/* Modern Header */}
        {isAdmin && (
        <div className="sticky top-0 z-40 glassmorphism_header">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Informasi</h1>
                  <p className="text-white/70 text-sm">Artikel & Video Edukatif</p>
                </div>
              </div>
              
           
                <button 
                  onClick={handleAddContent}
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden md:inline">Tambah Informasi</span>
                </button>
            </div>
          </div>
        </div>
        )}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
  

          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
              <svg className="w-12 h-12 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Pusat Informasi
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Temukan artikel dan video edukatif yang telah dikurasi, khusus untuk mendukung perjalanan kesehatan mentalmu
            </p>
          </div>

         

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {isLoading ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-8">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white/70">Memuat konten...</p>
              </div>
            ) : isMounted && contents && contents.length > 0 ? (
              contents.map((article: ContentItem, index: number) => {
                // Alternate between different card layouts
                const isLarge = index % 4 === 0; // Every 4th item is large
                const isFeatured = index % 7 === 0; // Every 7th item is featured
                const isVideo = article.type === "VIDEO";
                
                if (isFeatured && index > 0) {
                  // Featured card spans full width
                  return (
                    <div 
                      key={article.id}
                      onClick={() => handleContentClick(article)} 
                      className="group cursor-pointer md:col-span-2 lg:col-span-3"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden transform hover:-translate-y-2">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/2 aspect-[16/9] md:aspect-[4/3] overflow-hidden">
                            <Image 
                              src={article.thumbnail || DEFAULT_IMAGES.INFORMASI} 
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              width={100}
                              height={100}
                            />
                            {isVideo && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                                  <svg className="w-10 h-10 text-[#4F1718] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="bg-[#4F1718] text-white px-3 py-1 rounded-full text-sm font-medium">
                                {isVideo ? "🎥 Video" : "📰 Featured"}
                              </span>
                            </div>
                            
                            {/* Admin Actions */}
                            {isAdmin && (
                              <div className="absolute top-4 right-4">
                                <AdminActions
                                  onEdit={() => handleEditContent(article)}
                                  onDelete={() => handleDeleteContent(article.id)}
                                  itemType="konten"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                              </div>
                            )}
                          </div>
                          <div className="md:w-1/2 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 line-clamp-3 group-hover:text-[#4F1718] transition-colors duration-300">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 mb-6 line-clamp-3">
                              Artikel unggulan yang memberikan wawasan mendalam tentang topik penting ini.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">5 min read</span>
                              </div>
                              <div className="flex items-center gap-2 text-[#4F1718] font-semibold">
                                <span>Baca Selengkapnya</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isLarge && !isFeatured) {
                  // Large card spans 2 columns
                  return (
                    <div 
                      key={article.id}
                      onClick={() => handleContentClick(article)} 
                      className="group cursor-pointer md:col-span-2"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden transform hover:-translate-y-2">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image 
                            src={article.thumbnail || DEFAULT_IMAGES.INFORMASI} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            width={100}
                            height={100}
                          />
                          {isVideo && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                                <svg className="w-8 h-8 text-[#4F1718] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-sm text-[#4F1718] px-3 py-1 rounded-full text-sm font-medium">
                              {isVideo ? "Video" : "Artikel"}
                            </span>
                          </div>
                          
                          {/* Admin Actions */}
                          {isAdmin && (
                            <div className="absolute top-4 left-4">
                              <AdminActions
                                onEdit={() => handleEditContent(article)}
                                onDelete={() => handleDeleteContent(article.id)}
                                itemType="konten"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#4F1718] transition-colors duration-300">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-500">
                              {isVideo ? (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-sm">Tonton Video</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                  <span className="text-sm">Baca Artikel</span>
                                </>
                              )}
                            </div>
                            <svg className="w-5 h-5 text-[#4F1718] transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Regular card
                return (
                  <div 
                    key={article.id} 
                    onClick={() => handleContentClick(article)} 
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image 
                          src={article.thumbnail || DEFAULT_IMAGES.INFORMASI} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          width={100}
                          height={100}
                        />
                        {isVideo && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <svg className="w-6 h-6 text-[#4F1718] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm text-[#4F1718] px-2 py-1 rounded-lg text-xs font-medium">
                            {isVideo ? "🎥" : "📄"}
                          </span>
                        </div>
                        
                        {/* Admin Actions */}
                        {isAdmin && (
                          <div className="absolute top-3 left-3">
                            <AdminActions
                              onEdit={() => handleEditContent(article)}
                              onDelete={() => handleDeleteContent(article.id)}
                              itemType="konten"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-3 group-hover:text-[#4F1718] transition-colors duration-300 flex-1">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-end mt-auto">
                          <h2 className="text-sm text-[#4F1718] font-semibold">Baca Selengkapnya</h2>
                          <svg className="w-4 h-4 text-[#4F1718] transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                  <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
              </div>
                <h3 className="text-2xl font-bold text-white mb-2">Belum Ada Informasi</h3>
                <p className="text-white/70 text-lg max-w-md mx-auto">
                  {isAdmin 
                    ? "Mulai berbagi informasi dengan menambahkan artikel atau video edukatif"
                    : "Informasi akan ditampilkan di sini ketika tersedia"
                  }
                </p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Admin Form Modal */}
      {showAdminForm && (
        <AdminForm
          onClose={() => {
            setShowAdminForm(false);
            setEditingContent(null);
          }}
          onSubmit={handleSubmitContent}
          type="content"
          initialData={editingContent}
          isEdit={!!editingContent}
        />
      )}
    </div>
  )
}
