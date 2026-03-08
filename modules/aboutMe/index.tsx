'use client'
import Image from "next/image"
import { FaInstagram } from "react-icons/fa"
import logo from "../../public/logo anara.png"

interface TeamMember {
  name: string;
  title: string;
  photo?: string;
}

const anaraTeam: TeamMember[] = [
  {
    name: "Lintang Shafa Mazaya",
    title: "Founder & Director of Partnership",
    photo: "https://trihita-consulting.com/wp-content/uploads/2025/12/Lintang.webp",
  },
  {
    name: "Thesa Eka Ramalia",
    title: "Co-Founder & Director of Financial and General Affair",
    photo: "https://i.imgur.com/p8Q9IR1.png",
  },
  {
    name: "Muhammad Reihan Fadilah",
    title: "Co-Founder & Director of Human Resource",
    photo: "https://i.imgur.com/pVlrmUB.png",
  },
  {
    name: "Monica Maharani",
    title: "Co-Founder & Director of Research and Content Writer",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQFQ1PxUFoPHJA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1702781969540?e=2147483647&v=beta&t=l2_wzPaUGNqUpnGVW6V9le87HajMR5w77Rr5XeLcx5U",
  },
  {
    name: "Fauzan Putra Sanjaya",
    title: "Website Developer & Engineer",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQEvdvgjvWzZcQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725713363833?e=2147483647&v=beta&t=pjLzCQMeHrvQYw3tTJ3MIH9U2iK_1SnZrjSJcEf4p_Q",
  },
];

const dampingSetaraTeam: TeamMember[] = [
  {
    name: "Annisa Shaliha",
    title: "Founder",
    photo: "https://media.licdn.com/dms/image/v2/D5603AQFMOj8SuV9LoQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1697280714090?e=2147483647&v=beta&t=v7xXpRz3tqJEQB0mdo3klRGACSLezypagXz7G_P1CrA",
  },
  {
    name: "Revina Syifa Tiara",
    title: "Co-Founder & Creative Media Director",
    photo: "https://i.imgur.com/gLYPdwO.png",
  },
];

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    'from-rose-500 to-red-700',
    'from-blue-500 to-indigo-700',
    'from-emerald-500 to-green-700',
    'from-amber-500 to-yellow-700',
    'from-purple-500 to-violet-700',
    'from-pink-500 to-fuchsia-700',
    'from-teal-500 to-cyan-700',
    'from-orange-500 to-red-600',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#e0ddd0] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={160}
          height={160}
          className="rounded-full object-cover w-36 h-36 border-4 border-[#c2987c] shadow-md"
        />
      ) : (
        <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${getAvatarColor(member.name)} flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30 shadow-md`}>
          {getInitials(member.name)}
        </div>
      )}
      <h3 className="mt-4 font-bold text-lg text-[#2c2520] font-jakarta">{member.name}</h3>
      <p className="text-sm text-[#6b6359] mt-1 font-jakarta">{member.title}</p>
    </div>
  );
}

export default function AboutMe() {
  return (
    <div className="content-container overflow-hidden">
      <div className="w-full min-h-screen flex flex-col">

        {/* Hero Section */}
        <div className="w-full px-4 md:px-16 py-16 md:py-24 bg-gradient-to-br from-[#4F1718] via-[#6B2425] to-[#8B3538] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 grid_pattern" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h1 className="font-bold text-4xl md:text-5xl font-jakarta">Tentang Kami</h1>
            <p className="text-lg md:text-xl font-light text-white/90">
              Berkenalan dengan tim di balik SafeHome — bersama melukis asa untuk tegak menjadi nara.
            </p>
          </div>
        </div>

        {/* Anara Section */}
        <div className="w-full px-4 md:px-16 py-16 bg-[#f7f5ef]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              <Image src={logo} alt="Logo Anara" width={80} height={80} className="object-contain" />
              <div>
                <h2 className="font-bold text-3xl md:text-4xl text-[#4F1718] font-jakarta">Anara Indonesia</h2>
                <p className="text-[#6b6359] mt-2 font-jakarta italic text-lg">
                  Bersama Melukis Asa untuk Tegak Menjadi Nara (Together, We Rise)
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 md:p-8 border border-[#e0ddd0] mb-10">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-[#4F1718]/10 text-[#4F1718] px-4 py-1.5 rounded-full text-sm font-semibold font-jakarta">🛡️ Youth-led gender & social inclusion empowerment</span>
                <span className="bg-[#c2987c]/20 text-[#8B5E3C] px-4 py-1.5 rounded-full text-sm font-semibold font-jakarta">♻️ Research • Advocacy • Action!</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <FaInstagram className="text-[#E1306C]" size={20} />
                <a
                  href="https://www.instagram.com/anara__id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4F1718] hover:text-[#c2987c] font-semibold transition-colors font-jakarta"
                >
                  @anara__id
                </a>
              </div>
            </div>

            <h3 className="font-bold text-2xl text-[#4F1718] mb-8 font-jakarta">Tim Anara</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {anaraTeam.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Kolaborasi Header */}
        <div className="w-full py-10 bg-gradient-to-r from-[#4F1718] to-[#c2987c] text-center">
          <h2 className="font-bold text-3xl md:text-4xl text-white font-jakarta">Berkolaborasi Dengan</h2>
        </div>

        {/* Damping Setara Section */}
        <div className="w-full px-4 md:px-16 py-16 bg-[#f0eee4]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
              <Image
                src="https://dampingsetara.carrd.co/assets/images/image01.png?v=885565e5"
                alt="Logo DampingSetara"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
              <div>
                <h2 className="font-bold text-3xl md:text-4xl text-[#4F1718] font-jakarta">DAMPINGSETARA</h2>
                <p className="text-[#6b6359] mt-2 font-jakarta text-lg max-w-2xl">
                  Komunitas yang fokus mengedukasi masyarakat mengenai kesetaraan gender dalam hubungan serta cara membangun hubungan dan relasi yang sehat — sebagai cara mencegah kekerasan dalam hubungan seperti KDRT/RP.
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 md:p-8 border border-[#e0ddd0] mb-10">
              <div className="flex items-center gap-3">
                <FaInstagram className="text-[#E1306C]" size={20} />
                <a
                  href="https://www.instagram.com/dampingsetara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4F1718] hover:text-[#c2987c] font-semibold transition-colors font-jakarta"
                >
                  @dampingsetara
                </a>
              </div>
            </div>

            <h3 className="font-bold text-2xl text-[#4F1718] mb-8 font-jakarta">Tim Damping Setara</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-lg mx-auto">
              {dampingSetaraTeam.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Tastura Mengajar Section */}
        <div className="w-full px-4 md:px-16 py-16 bg-[#f7f5ef]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                TM
              </div>
              <div>
                <h2 className="font-bold text-3xl md:text-4xl text-[#4F1718] font-jakarta">Tastura Mengajar</h2>
                <p className="text-[#6b6359] mt-1 font-jakarta text-lg">
                  Yayasan Tastura Mengajar Indonesia
                </p>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 md:p-8 border border-[#e0ddd0]">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-xl text-[#4F1718] font-jakarta">TES Program</h3>
                  <p className="text-[#6b6359] font-jakarta">(Teaching, Empowering, and Social Sharing)</p>
                </div>
                <p className="text-[#6b6359] font-jakarta flex items-center gap-2">
                  📍 Bergerak di Pelosok Lombok Tengah
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <FaInstagram className="text-[#E1306C]" size={20} />
                  <a
                    href="https://www.instagram.com/tasturamengajar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4F1718] hover:text-[#c2987c] font-semibold transition-colors font-jakarta"
                  >
                    @tasturamengajar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
