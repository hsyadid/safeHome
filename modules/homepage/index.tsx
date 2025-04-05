"use client"
import {SectionTitle, SectionTitleHero} from "@/../components/ui/sectionTitleButton"
import {TestimonialCard} from "@/../components/ui/testimonialCard"
import {NewsCard} from "@/../components/ui/newsCard"
import Image from "next/image";
import { useEffect, useState } from "react";
import example from "@/../public/gambar_contoh.jpg"
import hand2hand from "@/../public/hand2hand.png"
import logo from "@/../public/logo anara.png"
import EU_funding_logo from "@/../public/EU_funding_logo.png"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/../components/ui/accordion"
  

export const Homepage = () => {
    const [showBlur, setShowBlur] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            setShowBlur(documentHeight - scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="content-container">
                <div className="w-full h-fit overflow-x-hidden flex flex-col gap-16">

                    <div className=" w-full h-[500px] md:h-[700px] lg:h-[900px] px-4 md:px-16 py-10 md:py-16 flex flex-col justify-between items-center relative grid_pattern">
                        <SectionTitleHero className="z-10"
                        description="Kamu tidak sendirian. Di sini, kamu bisa menemukan bantuan, dukungan, dan informasi terkait kekerasan berbasis gender (KBG). Akses layanan dengan cepat, tanpa ribet!"
                        descClassName="font-light text-sm"
                        />
                        
                        <div className="w-full absolute top-60 md:top-28 xl:-top-20 ">
                           <Image
                               src={hand2hand}
                               alt="gambar_hero"
                               className="w-full object-cover h-auto z-0 drop-shadow-xl"
                               width={0}
                               height={0}
                               quality={100}
                           />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-16">
                        <div className="gap-4 flex flex-col md:flex-row items-center justify-between w-full h-fit px-4 md:px-16 py-12  ">
                            <Image
                                src={example}
                                alt="gambar_hero"
                                width={550}
                                height={400}
                                className="rounded-[25px] md:w-1/2"
                            />
                            <SectionTitle
                            title="Peta Layanan Terdekat"
                            description="Temukan bantuan hukum, medis, dan polisi di Lombok lewat peta interaktif ini."
                            titleClassName="font-bold text-4xl"
                            descClassName="font-light text-xl"
                            />
                        </div>

                        <div className="flex gap-4 flex-col-reverse md:flex-row items-center justify-between w-full h-fit px-4 md:px-16 py-12  ">
                            <SectionTitle
                            title="Damping Setara: Teman Seperjalanan"
                            description="Masa sulit tak harus dilalui sendiri. Damping Setara hadir dengan konseling dan bantuan hukum."
                            titleClassName="font-bold text-4xl"
                            descClassName="font-light text-xl"
                            />
                            
                            <Image
                                    src={example}
                                    alt="gambar_hero"
                                    width={550}
                                    height={400}
                                    className="rounded-[25px] md:w-1/2"
                                />
                        </div>

                        <div className="justify-center py-12 flex-col flex px-4 gap-8 w-full">
                            <div className="text-center space-y-3 font-jakarta md:px-10">
                                <h2 className="font-bold text-4xl">Apa Kata Mereka?</h2>
                                <p className="text-lg font-thin">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem autem quae ipsum neque quidem fuga mollitia sint atque, ad quam doloribus labore hic tempora ea, voluptas cumque quisquam repellat magni.</p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
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

                        <div className=" w-full px-4 md:px-16 py-16 flex-col flex gap-8 justify-center items-center relative overflow-hidden">

                            <div className="relative z-10 py-8 bg-gradient-to-r from-[#4f1818] to-[#263452] overflow-hidden rounded-[24px] flex justify-center items-center">
                                <div className="flex flex-col justify-around lg:flex-row w-full gap-8 px-4">
                                    <div className="text-left lg:w-[55%] font-jakarta px-10 space-y-4">
                                        <h2 className="font-bold text-4xl lg:text-5xl text-[#fcfbfb]">Tentang Anara Indonesia</h2>
                                        <p className="text-lg lg:text-2xl font-thin text-[#fcfbfb]">
                                            Safe Home merupakan inisiatif dari <span className="font-bold">Anara Indonesia</span> dengan dukungan program Youth Empowerment Fund yang disponsori oleh European Union. Kami hadir dengan misi memastikan akses perlindungan dan pemulihan yang mudah, aman, dan terpercaya untukmu.
                                        </p>
                                    </div>
                                    <div className="flex flex-col  gap-3 justify-center items-center">
                                        <div className="flex gap-5 w-fit justify-center bg-[#fcfbfb] backdrop-blur-sm border-rose-300 border-[1px] rounded-[24px] p-6">
                                            <Image
                                                src={logo}
                                                alt="gambar_hero"
                                                width={180}
                                                height={180}
                                                className="rounded-[25px]"
                                            />
                                            <Image
                                                src={EU_funding_logo}
                                                alt="gambar_hero"
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                        <p className="font-jakarta font-bold md:text-xl text-[#fcfbfb] text-nowrap">💜 Karena setiap orang berhak merasa aman.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" w-full px-4 py-16 flex-col flex gap-8 justify-center items-center">
                            
                            <h1 className="font-medium text-4xl">Frequently Asked Questions</h1>
                            <div className="w-full max-w-[800px]">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-y py-3">
                                        <AccordionTrigger className="text-2xl font-normal">Apa itu Safe Home?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            Safe Home adalah platform berbasis web yang menyediakan bantuan bagi penyintas kekerasan berbasis gender (KBG). Di sini, kamu bisa menemukan hotline, layanan psikologis, bantuan hukum, peta layanan terdekat, dan forum dukungan.
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-2" className="border-y py-3">
                                        <AccordionTrigger className="text-2xl font-normal">Apakah layanan di Safe Home gratis?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            Ya! Semua layanan informasi dan forum komunitas di Safe Home bisa diakses secara gratis. Untuk layanan hukum dan psikologis, ada beberapa yang gratis dan ada juga yang berbayar tergantung dari penyedianya.
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-3" className="border-y py-3">
                                        <AccordionTrigger className="text-2xl font-normal">Bagaimana cara mendapatkan bantuan psikologis atau hukum?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            Kamu bisa langsung cek menu Damping Setara, di sana ada daftar psikolog dan layanan hukum yang bisa kamu hubungi.
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-4" className="border-y py-3">
                                        <AccordionTrigger className="text-2xl font-normal">Apakah identitas saya aman jika menggunakan Safe Home?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            100% aman! Kami tidak akan membagikan data pribadimu ke siapa pun tanpa izin. Kalau kamu ingin lebih anonim, kamu bisa pakai nama samaran di forum atau saat konsultasi.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showBlur && <div className="blur-overlay" />}
        </>
    );
}