"use client"
import {SectionTitle, SectionTitleHero} from "../../components/ui/sectionTitleButton"
import {TestimonialCard} from "../../components/ui/testimonialCard"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import example from "../../public/bantu.jpg"
import hand2hand from "../../public/hand2hand.png"
import logo from "../../public/logo anara.png"
import EU_funding_logo from "../../public/EU_funding_logo.png"
import { useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../components/ui/accordion"
  import { FaAngleRight } from "react-icons/fa6";
import imagePetalayanan from "../../public/homepage_petalayanan.jpg"
import imageDampingSetara from "../../public/homepage_damping.jpg"
  

export const Homepage = () => {
    const [showBlur, setShowBlur] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [showDampingButtons, setShowDampingButtons] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            setShowBlur(documentHeight - scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current && !isMobile) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                heroRef.current.style.setProperty('--mx', `${x}%`);
                heroRef.current.style.setProperty('--my', `${y}%`);
            }
        };

        const heroElement = heroRef.current;
        if (heroElement && !isMobile) {
            heroElement.addEventListener('mousemove', handleMouseMove);
            return () => heroElement.removeEventListener('mousemove', handleMouseMove);
        }
    }, [isMobile]);

    const handleDampingSetaraClick = () => {
        setShowDampingButtons(!showDampingButtons);
    };

    return (
        <>
            <div className="content-container overflow-hidden">
                <div className="w-full h-fit flex flex-col gap-16">

                    <div 
                        ref={heroRef}
                        className={`w-full  px-4 md:px-16 py-10 md:py-16 flex flex-col justify-between items-center relative grid_pattern bg-gradient-to-r from-[#4F1718] via-[#6B2425] to-[#8B3538]   ${isMobile ? 'h-screen' : 'h-[500px] md:h-[700px] lg:h-[900px]'}`}
                    >
              
                        
                        <SectionTitleHero className="z-10"
                        description={isMobile 
                            ? "Temukan bantuan dan dukungan KBG dengan mudah dan aman!" 
                            : "Kamu tidak sendirian. Di sini, kamu bisa menemukan bantuan, dukungan, dan informasi terkait kekerasan berbasis gender (KBG). Akses layanan dengan cepat, tanpa ribet!"
                        }
                        descClassName="font-light"
                        />
                        
                        <div className={`w-[100%] absolute max-h-[1000px] ${isMobile ? 'h-[900px] w-[800px] top-72' : 'w-full h-fit top-60 md:top-28 xl:-top-20'}`}>
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
                                src={imagePetalayanan}
                                alt="gambar_hero"
                                width={550}
                                height={400}
                                className="rounded-[25px] md:w-1/2 border-4 border-[#4F1718] shadow-xl"
                            />
                            <SectionTitle
                            title="Peta Layanan Terdekat"
                            description={isMobile 
                                ? "Temukan bantuan hukum, medis, dan polisi terdekat di Lombok." 
                                : "Temukan bantuan hukum, medis, dan polisi di Lombok lewat peta interaktif ini."
                            }
                            titleClassName="font-bold text-4xl"
                            descClassName="font-light text-xl"
                            href="/peta-layanan"
                            />
                        </div>

                        <div className="flex gap-4 flex-col-reverse md:flex-row items-center justify-between w-full h-fit px-4 md:px-16 py-12  ">
                            <div className="md:w-1/2 flex flex-col space-y-6">
                                <div className="space-y-4">
                                    <h2 className="font-bold text-4xl">Damping Setara: Teman Seperjalanan</h2>
                                    <p className="font-light text-xl">
                                        {isMobile 
                                            ? "Damping Setara hadir dengan konseling dan bantuan hukum untukmu." 
                                            : "Masa sulit tak harus dilalui sendiri. Damping Setara hadir dengan konseling dan bantuan hukum."
                                        }
                                    </p>
                                </div>
                                
                                {/* Toggle Buttons */}
                                {!showDampingButtons ? (
                                    <button
                                        onClick={handleDampingSetaraClick}
                                        className="flex items-center justify-center w-fit px-8 py-3 gap-3 text-lg font-bold rounded-[15px] bg-button text-white hover:bg-button/90 transition-colors duration-200"
                                    >
                                        Pelajari Lebih Lanjut <FaAngleRight />
                                    </button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button 
                                            onClick={() => router.push('/damping-setara/psikolog')}
                                            className="flex-1 py-5 px-6 rounded-xl bg-gradient-to-r from-blue-100 to-[#8aaaf0]
                                                     border border-blue-300 text-blue-800 hover:from-[#5f7fc4] hover:to-[#263452]
                                                     hover:text-white transition-all duration-200 font-jakarta font-bold
                                                     flex items-center justify-start gap-4 text-left shadow-sm"
                                        >
                                            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xl">Konseling Psikologis</div>
                                                <div className="text-lg opacity-80">Bantuan kesehatan mental</div>
                                            </div>
                                        </button>
                                        
                                        <button 
                                            onClick={() => router.push('/damping-setara/hukum')}
                                            className="flex-1 py-5 px-6 rounded-xl bg-gradient-to-r from-[#a1f0d6] to-[#38bc99]
                                                     border border-green-300 text-green-800 hover:from-[#66b39a] hover:to-[#007d56]
                                                     hover:text-white transition-all duration-200 font-jakarta font-bold
                                                     flex items-center justify-start gap-4 text-left shadow-sm"
                                        >
                                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xl">Layanan Hukum</div>
                                                <div className="text-lg opacity-80">Bantuan hukum & konsultasi</div>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <Image
                                    src={imageDampingSetara}
                                    alt="gambar_hero"
                                    width={550}
                                    height={400}
                                    className="rounded-[25px] md:w-1/2 border-4 border-[#4F1718] shadow-xl"
                                />
                        </div>

                        <div className="justify-center py-12 flex-col flex px-4 gap-8 w-full">
                            <div className="text-center space-y-3 font-jakarta md:px-10">
                                <h2 className="font-bold text-4xl">Apa Kata Mereka?</h2>
                                <p className="text-lg font-thin">
                                    {isMobile 
                                        ? "Testimoni dari mereka yang sudah merasakan manfaat SafeHome." 
                                        : "Dengarkan pengalaman nyata dari para pengguna SafeHome yang telah terbantu melalui layanan kami. Mereka menemukan dukungan, bantuan hukum, dan pemulihan yang mereka butuhkan."
                                    }
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                                <TestimonialCard
                                    name="Sari Dewi"
                                    role="Survivor"
                                    description="Saya sangat berterima kasih dengan layanan SafeHome. Waktu butuh bantuan hukum mendadak, lewat peta layanan langsung ketemu pengacara terdekat. Prosesnya cepat dan gak ribet, benar-benar membantu banget saat kondisi genting."
                                    className="w-[340px]"
                                />
                                <TestimonialCard
                                    name="Maya Putri"
                                    role="Pengguna Layanan"
                                    description="Fitur forum di SafeHome jadi tempat curhat yang aman buat saya. Bisa berbagi cerita tanpa takut dihakimi, dan dapat support dari teman-teman sesama survivor. Rasanya gak sendirian lagi dalam menghadapi masalah."
                                    className="w-[340px]"
                                />
                                <TestimonialCard
                                    name="Rina Anggraini"
                                    role="Survivor"
                                    description="Damping Setara benar-benar mengubah hidup saya. Konseling psikologis yang saya dapat membantu proses healing, dan tim mereka sangat pengertian. Sekarang saya sudah bisa move on dan mulai hidup normal lagi."
                                    className="w-[340px]"
                                />
                            </div>
                        </div>

                        <div className=" w-full px-4 md:px-16 py-16 flex-col flex gap-8 justify-center items-center relative overflow-hidden">

                            <div className="relative z-10 py-8 bg-gradient-to-r lg:h-[500px] from-[#1a0b0c] via-[#4F1718] to-[#c2987c] overflow-hidden rounded-[24px] flex justify-center items-center">
                                <div className="flex flex-col justify-around lg:flex-row w-full gap-8 px-4">
                                    <div className=" lg:w-[55%] font-jakarta px-10 space-y-10 text-center lg:text-left">
                                        <h2 className="font-bold text-4xl lg:text-[50px] text-[#fcfbfb]">Tentang Anara Indonesia</h2>
                                        <p className="text-lg lg:text-[26px] font-thin text-[#fcfbfb]">
                                            {isMobile 
                                                ? "Safe Home adalah inisiatif dari Anara Indonesia dengan dukungan European Union untuk memastikan akses perlindungan yang mudah dan aman untukmu."
                                                : "Safe Home merupakan inisiatif dari Anara Indonesia dengan dukungan program Youth Empowerment Fund yang disponsori oleh European Union. Kami hadir dengan misi memastikan akses perlindungan dan pemulihan yang mudah, aman, dan terpercaya untukmu."
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-col  gap-3 justify-center items-center">
                                        <div className="flex gap-5 w-fit justify-center bg-[#fcfbfb] backdrop-blur-sm border-rose-300 border-[1px] rounded-[24px] p-6">
                                            <Image
                                                src={logo}
                                                alt="gambar_hero"
                                                width={180}
                                                height={180}
                                                className="rounded-[25px] aspect-square flex-shrink-0 object-contain w-32 md:w-44"
                                            />
                                            <Image
                                                src={EU_funding_logo}
                                                alt="gambar_hero"
                                                width={200}
                                                height={200}
                                                className="w-32 object-contain flex-shrink-0 md:w-48"
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
                                        <AccordionTrigger className="text-xl md:text-2xl font-normal text-left">Apa itu Safe Home?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            {isMobile 
                                                ? "Safe Home adalah platform bantuan untuk penyintas KBG dengan hotline, konseling, bantuan hukum, dan forum dukungan."
                                                : "Safe Home adalah platform berbasis web yang menyediakan bantuan bagi penyintas kekerasan berbasis gender (KBG). Di sini, kamu bisa menemukan hotline, layanan psikologis, bantuan hukum, peta layanan terdekat, dan forum dukungan."
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-2" className="border-y py-3">
                                        <AccordionTrigger className="text-xl md:text-2xl font-normal text-left">Apakah layanan di Safe Home gratis?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            {isMobile 
                                                ? "Ya! Layanan informasi dan forum gratis. Layanan hukum dan psikologis ada yang gratis dan berbayar."
                                                : "Ya! Semua layanan informasi dan forum komunitas di Safe Home bisa diakses secara gratis. Untuk layanan hukum dan psikologis, ada beberapa yang gratis dan ada juga yang berbayar tergantung dari penyedianya."
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-3" className="border-y py-3">
                                        <AccordionTrigger className="text-xl md:text-2xl font-normal text-left">Bagaimana cara mendapatkan bantuan psikologis atau hukum?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            {isMobile 
                                                ? "Cek menu Damping Setara untuk daftar psikolog dan layanan hukum."
                                                : "Kamu bisa langsung cek menu Damping Setara, di sana ada daftar psikolog dan layanan hukum yang bisa kamu hubungi."
                                            }
                                        </AccordionContent>
                                    </AccordionItem>
                                    
                                    <AccordionItem value="item-4" className="border-y py-3">
                                        <AccordionTrigger className="text-xl md:text-2xl font-normal text-left">Apakah identitas saya aman jika menggunakan Safe Home?</AccordionTrigger>
                                        <AccordionContent className="text-lg font-light">
                                            {isMobile 
                                                ? "100% aman! Data pribadimu tidak akan dibagikan. Kamu juga bisa pakai nama samaran."
                                                : "100% aman! Kami tidak akan membagikan data pribadimu ke siapa pun tanpa izin. Kalau kamu ingin lebih anonim, kamu bisa pakai nama samaran di forum atau saat konsultasi."
                                            }
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