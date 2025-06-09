"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

type ArticleProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function Article({ params }: ArticleProps) {
  const [article, setArticle] = useState<ContentItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articleId, setArticleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { id } = await params;
        const parsedId = parseInt(id);
        setArticleId(parsedId);

        // Fetch specific article
        const articleResponse = await fetch(`https://safehomeanara.id/api/content/${parsedId}`);
        if (articleResponse.ok) {
          const articleData = await articleResponse.json();
          if (articleData.type === 'ARTICLE') {
            setArticle(articleData);
          }
        }

        // Fetch related articles
        const allContentResponse = await fetch('https://safehomeanara.id/api/content');
        if (allContentResponse.ok) {
          const allContent = await allContentResponse.json();
          const related = allContent
            .filter((item: ContentItem) => item.id !== parsedId && item.type === 'ARTICLE')
            .slice(0, 4);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b0c] via-[#4F1718] to-[#2d1114] relative">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  // Jika artikel tidak ditemukan
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0b0c] via-[#4F1718] to-[#2d1114] relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Artikel yang Anda cari tidak dapat ditemukan atau telah dihapus.
            </p>
          </div>
          
          <Link href="/informasi" className="group">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/20">
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Kembali ke Informasi</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // Format tanggal
  const formattedDate = new Date(article.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Same Design as Peta Layanan */}
      <div className="relative bg-gradient-to-r from-[#4F1718] via-[#6B2425] to-[#8B3538] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ad8861' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col space-y-8">
            {/* Back Button */}
            <div>
              <Link href="/informasi" className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors duration-300">
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="font-medium">Kembali ke Informasi</span>
              </Link>
            </div>

            {/* Title Section */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jakarta text-white mb-4 drop-shadow-lg">
                {article.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {article.summary || "Artikel edukatif yang memberikan wawasan mendalam tentang topik penting untuk kesehatan mental dan keselamatan Anda."}
              </p>
            </div>

            {/* Article Meta Info Card */}
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center justify-center gap-6 text-gray-700">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#4F1718]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-3xl">{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with White Background */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-16">
          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={article.thumbnail || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center"}
                alt={article.title} 
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
              <div className="prose prose-lg prose-gray max-w-none">
                <div className="text-gray-800 text-lg leading-relaxed space-y-6">
                  {article.content && article.content.split("\n").map((paragraph, i) => (
                    paragraph.trim() && (
                      <p key={i} className="text-justify">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artikel Terkait - Full Screen Width */}
        {relatedArticles.length > 0 && (
          <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
            <div className="text-center mb-12">
              <h2 className="text-black text-2xl md:text-4xl font-bold mb-4">
                Artikel Lainya
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Jelajahi artikel lainnya yang mungkin menarik bagi Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {relatedArticles.map((relatedArticle) => (
                <Link href={`/artikel/${relatedArticle.id}`} key={relatedArticle.id} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image 
                        src={relatedArticle.thumbnail || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=center"}
                        alt={relatedArticle.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-black font-bold text-xl mb-3 line-clamp-2 group-hover:text-[#4F1718] transition-colors duration-300 leading-tight">
                        {relatedArticle.title}
                      </h3>
                      {relatedArticle.summary && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {relatedArticle.summary}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-[#4F1718] font-semibold text-sm group-hover:text-[#6B1E20] transition-colors duration-300">
                          Baca Selengkapnya →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
