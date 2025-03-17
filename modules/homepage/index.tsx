import {SectionTitle} from "@/../components/ui/sectionTitleButton"
import {TestimonialCard} from "@/../components/ui/testimonialCard"
import {NewsCard} from "@/../components/ui/newsCard"
import Image from "next/image";
import example from "@/../public/gambar_contoh.jpg"

export const Homepage = () => {
    return (
        <div className="w-full h-fit">

            <div className=" w-full px-16 py-12 flex justify-between items-center ">
                <SectionTitle
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                titleClassName="font-bold text-5xl"
                descClassName="font-light text-sm"
                />

                <div className="relative  w-[600px] h-[400px]">
                    <Image
                        src={example}
                        alt="gambar_hero"
                        width={380}
                        height={400}
                        className="rounded-[25px] h-[280px] absolute bottom-0 -rotate-6 z-30"
                    />

                    <Image
                        src={example}
                        alt="gambar_hero"
                        width={380}
                        height={400}
                        className="rounded-[25px] h-[280px] absolute top-0 right-0 z-20"
                    />
                </div>
         

            </div>

            <div>
                <div className=" flex items-center justify-between w-full h-fit px-16 py-12  ">
                    <Image
                            src={example}
                            alt="gambar_hero"
                            width={550}
                            height={400}
                            className="rounded-[25px] h-[400px]"
                        />


                    <SectionTitle
                    title="Call untuk Peta Layanan Terdekat"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    titleClassName="font-bold text-4xl"
                    descClassName="font-light text-lg"
                    />
                </div>

                <div className=" flex items-center justify-between w-full h-fit px-16 py-12  ">
                    <SectionTitle
                    title="Call untuk Peta Layanan Terdekat"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    titleClassName="font-bold text-4xl"
                    descClassName="font-light text-lg"
                    />
                    
                    <Image
                            src={example}
                            alt="gambar_hero"
                            width={550}
                            height={400}
                            className="rounded-[25px] h-[400px]"
                        />
                </div>

                <div className="px-52 py-12 flex-col flex  gap-8 w-full">
                    <div className="text-center space-y-3 font-jakarta px-10">
                        <h2 className="font-bold text-4xl">Apa Kata Mereka?</h2>
                        <p className="text-lg font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem autem quae ipsum neque quidem fuga mollitia sint atque, ad quam doloribus labore hic tempora ea, voluptas cumque quisquam repellat magni.</p>
                    </div>

                    <div className=" flex gap-5">
                        <TestimonialCard
                            name="Nama Testi"
                            role="Apalah"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            className="w-[340px]"
                        />
                        <TestimonialCard
                            name="Nama Testi"
                            role="Apalah"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            className="w-[340px]"
                        />
                        <TestimonialCard
                            name="Nama Testi"
                            role="Apalah"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            className="w-[340px]"
                        />
                    </div>
                </div>

                <div className=" w-full px-52 py-12 flex-col flex gap-8">
                        <div className="text-center space-y-3 font-jakarta px-10">
                            <h2 className="font-bold text-4xl">Call untuk Informasi</h2>
                            <p className="text-lg font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem autem quae ipsum neque quidem fuga mollitia sint atque, ad quam doloribus labore hic tempora ea, voluptas cumque quisquam repellat magni.</p>
                        </div>

                        <div className="flex gap-3 justify-center">
                        <NewsCard
                            title="Massa Aksi Mahasiswa Indonesia Gelap Mulai Bubar dari Patung Kuda"
                            image="/gambar_contoh.jpg"
                            className="w-[280px]"
                        />
                        <NewsCard
                            title="Massa Aksi Mahasiswa Indonesia Gelap Mulai Bubar dari Patung Kuda"
                            image="/gambar_contoh.jpg"
                            className="w-[280px]"
                        />
                        <NewsCard
                            title="Massa Aksi Mahasiswa Indonesia Gelap Mulai Bubar dari Patung Kuda"
                            image="/gambar_contoh.jpg"
                            className="w-[280px]"
                        />
                        </div>
                    </div>


            </div>
        
        </div>
    );
  }