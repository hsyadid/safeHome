import ArtikelCard from "../../components/ui/artikelCard"

export default function() {
  const articles = [{imgPath: "/okegas.jpg", title: "Prabowo Oke gas oke gas nomor dua torang gas gue udah capek banget tolong berhasil", isVideo: false, link: "yes"},
                    {imgPath: "/okegas.jpg", title: "mantap", isVideo: true, link: "yes"},
                    {imgPath: "/okegas.jpg", title: "mamah aku lupa sahur", isVideo: false, link: "yes"}
  ]
  return (
    <div className="w-full px-[4rem] bg-[#FAFAFA]">
      <h1 className="font-bold mb-11 text-black text-3xl md:text-5xl">Informasi</h1>
      <div className="flex flex-col gap-6">
        {articles.map((article,i) => 
        <ArtikelCard
          key={i}
          imgPath={article.imgPath}
          title={article.title}
          isVideo={article.isVideo}
          link={article.link}
        />)}
      </div>
    </div>
  )
}