import Image from "next/image";
import { contentData } from "../../data/content";
import Link from "next/link";

type ArticleProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Article({ params }: ArticleProps) {
  // Await params before accessing its properties
  const { id } = await params;
  
  // Cari artikel berdasarkan ID
  const articleId = parseInt(id);
  const article = contentData.find(item => item.id === articleId && item.type === "ARTICLE");

  // Jika artikel tidak ditemukan
  if (!article) {
    return (
      <div className="flex w-full flex-col bg-[#FAFAFA] px-4 py-4 md:px-16 md:py-16 gap-8 md:gap-16">
        <h1 className="text-black text-2xl md:text-4xl font-semibold">
          Artikel tidak ditemukan
        </h1>
        <a href="/informasi" className="w-fit"> 
          <p className="text-[#AF8861] text-2xl flex items-center gap-1 font-semibold">
            <span className="inline-block relative w-8 h-8">
              <Image 
                src="/chevron-left.svg" 
                alt="kembali" 
                fill
                sizes=""
                className="object-cover"
              />
            </span>
            Kembali ke Informasi
          </p>
        </a>
      </div>
    );
  }

  // Format tanggal
  const formattedDate = article.createdAt.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Cari artikel terkait (artikel lain dengan tipe ARTICLE)
  const relatedArticles = contentData
    .filter(item => item.id !== articleId && item.type === "ARTICLE")
    .slice(0, 4); // Ambil maksimal 4 artikel terkait

  return (
    <div className="flex w-full flex-col bg-[#FAFAFA] px-4 py-4 md:px-16 md:py-16 gap-8 md:gap-16">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="flex flex-col gap-4">
          <a href="/informasi" className="w-fit"> 
            <p className="text-[#AF8861] text-2xl flex items-center gap-1 font-semibold pointer-events-none">
              <span className="inline-block relative w-8 h-8 pointer-events-none">
                <Image 
                  src="/chevron-left.svg" 
                  alt="kembali" 
                  fill
                  sizes=""
                  className="object-cover pointer-events-none"
                />
              </span>
              Kembali
            </p>
          </a>
          <h1 className="text-black text-2xl md:text-4xl font-semibold">
            {article.title}
          </h1>
          <p className="text-[#8E8E8E]">
            {formattedDate} • SafeHome
          </p>
        </div>
        <div className="rounded-[36px] relative w-full md:w-[34rem] aspect-[4/3] overflow-hidden">
          <Image 
            src={article.thumbnail}
            alt={article.title} 
            fill
            sizes=""
            className="object-cover"
          />
        </div>
      </div>
      <div className="text-black flex flex-col gap-2 md:text-xl">
        {article.content && article.content.split("\n").map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      
      {/* Artikel Terkait */}
      {relatedArticles.length > 0 && (
        <div className="mt-8 md:mt-16">
          <h2 className="text-black text-xl md:text-3xl font-semibold mb-6">
            Artikel Terkait
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link href={`/artikel/${relatedArticle.id}`} key={relatedArticle.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative w-full aspect-[4/3]">
                    <Image 
                      src={relatedArticle.thumbnail}
                      alt={relatedArticle.title} 
                      fill
                      sizes=""
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-black font-semibold text-lg mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    {relatedArticle.summary && (
                      <p className="text-[#8E8E8E] text-sm line-clamp-3 mb-2">
                        {relatedArticle.summary}
                      </p>
                    )}
                    <p className="text-[#AF8861] text-sm mt-auto">
                      Baca selengkapnya
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
