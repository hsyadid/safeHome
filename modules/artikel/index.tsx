import Image from "next/image";

type ArticleContent = {
  title: string;
  date: Date;
  author: string;
  image: string;
  paragraphs: string;
};

export default function({content} : {content:ArticleContent}) {
  return (
    <div className="flex w-full flex-col bg-[#FAFAFA] px-4 py-4 md:px-16 md:py-16 gap-8 md:gap-16">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="flex flex-col gap-4">
          <a href="/article" className="w-fit"> {/* JANGAN LUPA DIISI PATH YANG SESUAI */}
            <p className="text-[#AF8861] text-2xl flex items-center gap-1 font-semibold pointer-events-none">
              <span className="inline-block relative w-8 h-8 pointer-events-none">
                <Image 
                  src="/chevron-left.svg" 
                  alt="decorative star" 
                  fill
                  sizes=""
                  className="object-cover pointer-events-none"
                />
              </span>
              Kembali
            </p>
          </a>
          <h1 className="text-black text-2xl md:text-4xl font-semibold">
            {content.title}
          </h1>
          <p className="text-[#8E8E8E]">
            {content.date.toDateString()} •  {content.author}
          </p>
        </div>
          <div className="rounded-[36px] relative w-full md:w-[34rem] aspect-[4/3] overflow-hidden">
            <Image 
              src={content.image}
              alt="decorative star" 
              fill
              sizes=""
              className=" object-cover"
            />
          </div>
      </div>
      <div className="text-black flex flex-col gap-2 md:text-xl">
        {content.paragraphs.split("\n").map((item,i) => 
          (<p key={i}>{item}</p>)
        )}
      </div>
    </div>
  );
}