// Data konten yang sesuai dengan model Content di Prisma
export type ContentItem = {
  id: number;
  title: string;
  type: 'ARTICLE' | 'VIDEO';
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Fields untuk Video
  videoUrl?: string;
  duration?: number;
  
  // Fields untuk Article
  content?: string;
  summary?: string;
};

// Dummy data untuk konten
export const contentData: ContentItem[] = [
  {
    id: 1,
    title: "Mengenal Kekerasan Berbasis Gender: Definisi, Bentuk, dan Dampaknya",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-04-10"),
    content: "Kekerasan berbasis gender (KBG) adalah tindakan berbahaya yang dilakukan terhadap seseorang berdasarkan gender mereka. KBG dapat terjadi dalam berbagai bentuk, termasuk kekerasan fisik, seksual, psikologis, dan ekonomi.\n\nBentuk-bentuk KBG meliputi:\n\n1. Kekerasan fisik: Tindakan yang menyebabkan rasa sakit, cedera, atau penderitaan fisik.\n\n2. Kekerasan seksual: Tindakan seksual yang tidak diinginkan, termasuk pelecehan, pemerkosaan, dan eksploitasi seksual.\n\n3. Kekerasan psikologis: Tindakan yang menyebabkan trauma psikologis, seperti intimidasi, penghinaan, dan isolasi sosial.\n\n4. Kekerasan ekonomi: Tindakan yang membatasi akses seseorang terhadap sumber daya ekonomi, seperti melarang bekerja atau mengontrol keuangan.\n\nDampak KBG dapat sangat merusak dan berkepanjangan, meliputi:\n\n- Dampak fisik: Cedera, cacat permanen, atau bahkan kematian.\n\n- Dampak psikologis: Depresi, kecemasan, PTSD, dan risiko bunuh diri yang lebih tinggi.\n\n- Dampak sosial: Isolasi, stigma, dan kesulitan dalam hubungan interpersonal.\n\n- Dampak ekonomi: Kehilangan pendapatan, ketergantungan ekonomi, dan kemiskinan.\n\nPenting untuk memahami bahwa KBG adalah pelanggaran hak asasi manusia dan tidak dapat dibenarkan dalam situasi apapun. Setiap orang berhak hidup bebas dari kekerasan dan diskriminasi.",
    summary: "Artikel ini menjelaskan definisi, bentuk, dan dampak dari kekerasan berbasis gender (KBG)."
  },
  {
    id: 2,
    title: "Cara Melaporkan Kasus Kekerasan Berbasis Gender ke Pihak Berwajib",
    type: "VIDEO",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2024-04-12"),
    videoUrl: "https://www.youtube.com/watch?v=example1",
    duration: 720, // 12 menit dalam detik
    summary: "Video panduan tentang cara melaporkan kasus kekerasan berbasis gender ke pihak berwajib."
  },
  {
    id: 3,
    title: "Hak-Hak Hukum Korban Kekerasan Berbasis Gender di Indonesia",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
    content: "Korban kekerasan berbasis gender (KBG) di Indonesia memiliki sejumlah hak hukum yang dilindungi oleh undang-undang. Artikel ini akan membahas hak-hak tersebut dan bagaimana korban dapat mengaksesnya.\n\nBeberapa undang-undang utama yang melindungi korban KBG di Indonesia adalah:\n\n1. UU No. 23 Tahun 2004 tentang Penghapusan Kekerasan Dalam Rumah Tangga (PKDRT)\n2. UU No. 21 Tahun 2007 tentang Pemberantasan Tindak Pidana Perdagangan Orang\n3. UU No. 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual (TPKS)\n\nBerdasarkan undang-undang tersebut, korban KBG memiliki hak-hak berikut:\n\n1. Hak atas perlindungan dari pihak keluarga, kepolisian, kejaksaan, pengadilan, advokat, lembaga sosial, atau pihak lainnya.\n\n2. Hak atas pelayanan kesehatan sesuai dengan kebutuhan medis.\n\n3. Hak atas penanganan secara khusus berkaitan dengan kerahasiaan korban.\n\n4. Hak atas pendampingan oleh pekerja sosial dan bantuan hukum pada setiap tingkat proses pemeriksaan.\n\n5. Hak atas pelayanan bimbingan rohani.\n\n6. Hak untuk mendapatkan informasi mengenai perkembangan kasus dan putusan pengadilan.\n\n7. Hak untuk mendapatkan kompensasi, restitusi, dan rehabilitasi.\n\nUntuk mengakses hak-hak ini, korban dapat melaporkan kasus ke:\n\n- Kepolisian (Unit Pelayanan Perempuan dan Anak)\n- Pusat Pelayanan Terpadu Pemberdayaan Perempuan dan Anak (P2TP2A)\n- Lembaga Bantuan Hukum (LBH)\n- Komnas Perempuan\n- Dinas Sosial atau Dinas Pemberdayaan Perempuan dan Perlindungan Anak\n\nPenting untuk diingat bahwa korban KBG berhak mendapatkan perlindungan dan keadilan, dan tidak boleh disalahkan atas kekerasan yang dialaminya.",
    summary: "Artikel ini menjelaskan hak-hak hukum yang dimiliki oleh korban kekerasan berbasis gender di Indonesia."
  },
  {
    id: 4,
    title: "Mengenali Tanda-Tanda Kekerasan dalam Rumah Tangga",
    type: "VIDEO",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-18"),
    updatedAt: new Date("2024-04-18"),
    videoUrl: "https://www.youtube.com/watch?v=example2",
    duration: 540, // 9 menit dalam detik
    summary: "Video edukasi tentang cara mengenali tanda-tanda kekerasan dalam rumah tangga."
  },
  {
    id: 5,
    title: "Dampak Psikologis Kekerasan dan Cara Pemulihan Diri",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-04-20"),
    content: "Kekerasan berbasis gender (KBG) dapat meninggalkan luka psikologis yang dalam pada korban. Artikel ini membahas dampak psikologis dari kekerasan dan strategi untuk pemulihan diri.\n\nDampak psikologis KBG dapat meliputi:\n\n1. Gangguan Stres Pasca Trauma (PTSD): Korban mungkin mengalami kilas balik, mimpi buruk, dan reaksi kecemasan yang intens terhadap pengingat trauma.\n\n2. Depresi: Perasaan sedih yang berkepanjangan, kehilangan minat, perubahan pola tidur dan makan, serta pikiran tentang kematian atau bunuh diri.\n\n3. Kecemasan: Kekhawatiran yang berlebihan, serangan panik, dan ketakutan yang tidak rasional.\n\n4. Rasa malu dan bersalah: Korban sering menyalahkan diri sendiri atas kekerasan yang dialami.\n\n5. Harga diri rendah: Kehilangan kepercayaan diri dan perasaan tidak berharga.\n\n6. Kesulitan dalam hubungan: Kesulitan mempercayai orang lain dan membentuk hubungan yang sehat.\n\nStrategi untuk pemulihan diri:\n\n1. Mencari bantuan profesional: Terapi dengan psikolog atau konselor yang berpengalaman dalam trauma dapat sangat membantu. Terapi yang efektif meliputi Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), dan terapi trauma lainnya.\n\n2. Bergabung dengan kelompok dukungan: Berbagi pengalaman dengan sesama penyintas dapat mengurangi perasaan terisolasi dan memberikan dukungan emosional.\n\n3. Praktik perawatan diri: Menjaga kesehatan fisik melalui tidur yang cukup, nutrisi yang baik, dan olahraga teratur. Teknik relaksasi seperti meditasi, pernapasan dalam, dan yoga juga dapat membantu mengelola stres.\n\n4. Membangun sistem dukungan: Menjalin hubungan dengan teman, keluarga, atau komunitas yang suportif.\n\n5. Menetapkan batasan: Belajar mengenali dan menetapkan batasan yang sehat dalam hubungan.\n\n6. Fokus pada kekuatan: Mengidentifikasi dan membangun kekuatan dan ketahanan diri.\n\nPemulihan adalah proses yang berkelanjutan dan berbeda bagi setiap orang. Penting untuk diingat bahwa pemulihan membutuhkan waktu, dan mengalami kemunduran sesekali adalah normal. Yang terpenting adalah tetap mencari bantuan dan tidak menyerah pada proses pemulihan.",
    summary: "Artikel ini membahas dampak psikologis dari kekerasan berbasis gender dan strategi untuk pemulihan diri."
  },
  {
    id: 6,
    title: "Peran Masyarakat dalam Pencegahan Kekerasan Berbasis Gender",
    type: "VIDEO",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-22"),
    updatedAt: new Date("2024-04-22"),
    videoUrl: "https://www.youtube.com/watch?v=example3",
    duration: 660, // 11 menit dalam detik
    summary: "Video tentang bagaimana masyarakat dapat berperan dalam mencegah kekerasan berbasis gender."
  },
  {
    id: 7,
    title: "Layanan Konseling untuk Korban Kekerasan: Apa yang Perlu Diketahui",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-25"),
    updatedAt: new Date("2024-04-25"),
    content: "Layanan konseling merupakan salah satu bentuk dukungan penting bagi korban kekerasan berbasis gender (KBG). Artikel ini menjelaskan tentang layanan konseling yang tersedia, manfaatnya, dan cara mengaksesnya.\n\nJenis-jenis layanan konseling:\n\n1. Konseling krisis: Memberikan dukungan segera setelah kejadian traumatis untuk membantu korban mengatasi reaksi emosional akut.\n\n2. Konseling trauma: Berfokus pada pemrosesan pengalaman traumatis dan mengurangi gejala trauma seperti kilas balik, mimpi buruk, dan kecemasan.\n\n3. Konseling individual: Sesi one-on-one dengan konselor profesional untuk membahas pengalaman, perasaan, dan strategi pemulihan.\n\n4. Konseling kelompok: Melibatkan beberapa korban yang berbagi pengalaman serupa, memberikan dukungan dan validasi dari sesama penyintas.\n\n5. Konseling keluarga: Melibatkan anggota keluarga untuk memperbaiki dinamika keluarga dan membangun sistem dukungan.\n\nManfaat konseling bagi korban KBG:\n\n1. Ruang aman untuk mengekspresikan perasaan dan pengalaman\n2. Validasi bahwa kekerasan bukan kesalahan korban\n3. Pengembangan strategi koping yang sehat\n4. Pemrosesan trauma dan pengurangan gejala PTSD\n5. Peningkatan harga diri dan kepercayaan diri\n6. Dukungan dalam membuat keputusan dan merencanakan masa depan\n\nCara mengakses layanan konseling:\n\n1. Hotline krisis: Banyak organisasi menyediakan hotline 24 jam untuk dukungan krisis dan rujukan ke layanan konseling.\n\n2. Pusat krisis perkosaan dan kekerasan domestik: Menyediakan konseling gratis atau berbiaya rendah untuk korban.\n\n3. Pusat Pelayanan Terpadu Pemberdayaan Perempuan dan Anak (P2TP2A): Tersedia di banyak kota di Indonesia, menyediakan layanan konseling dan dukungan lainnya.\n\n4. Rumah sakit dan pusat kesehatan mental: Beberapa memiliki program khusus untuk korban kekerasan.\n\n5. Organisasi non-pemerintah (LSM): Banyak LSM fokus pada isu kekerasan berbasis gender dan menyediakan layanan konseling.\n\n6. Layanan konseling online: Opsi yang semakin populer, terutama bagi mereka yang tinggal di daerah terpencil atau memiliki keterbatasan mobilitas.\n\nHal-hal yang perlu dipertimbangkan saat mencari konselor:\n\n1. Pengalaman dan keahlian dalam menangani trauma dan kekerasan\n2. Pendekatan yang berpusat pada korban dan trauma-informed\n3. Sensitivitas terhadap isu gender, budaya, dan identitas lainnya\n4. Kenyamanan dan kepercayaan dengan konselor\n\nPenting untuk diingat bahwa mencari bantuan adalah tanda kekuatan, bukan kelemahan. Konseling dapat menjadi langkah penting dalam perjalanan pemulihan korban KBG.",
    summary: "Artikel ini menjelaskan tentang layanan konseling yang tersedia untuk korban kekerasan berbasis gender."
  },
  {
    id: 8,
    title: "Membangun Hubungan Sehat: Komunikasi dan Penghargaan",
    type: "VIDEO",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-04-28"),
    updatedAt: new Date("2024-04-28"),
    videoUrl: "https://www.youtube.com/watch?v=example4",
    duration: 780, // 13 menit dalam detik
    summary: "Video tentang cara membangun hubungan yang sehat melalui komunikasi efektif dan saling menghargai."
  },
  {
    id: 9,
    title: "UU TPKS: Perlindungan Hukum Bagi Korban Kekerasan Seksual",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
    content: "Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS) yang disahkan pada tahun 2022 merupakan tonggak penting dalam perlindungan hukum bagi korban kekerasan seksual di Indonesia. Artikel ini akan membahas isi UU TPKS dan implikasinya bagi korban kekerasan seksual.\n\nUU TPKS mencakup sembilan bentuk kekerasan seksual, yaitu: pelecehan seksual non-fisik, pelecehan seksual fisik, pemaksaan kontrasepsi, pemaksaan aborsi, pemaksaan perkawinan, pemaksaan pelacuran, perbudakan seksual, penyiksaan seksual, dan eksploitasi seksual.\n\nSalah satu aspek penting dari UU TPKS adalah pendekatan yang berpusat pada korban. UU ini memberikan hak-hak khusus bagi korban, termasuk:\n\n1. Hak atas penanganan, perlindungan, dan pemulihan\n2. Hak atas informasi tentang perkembangan kasus\n3. Hak atas pendampingan hukum, psikologis, dan medis\n4. Hak atas kerahasiaan identitas\n5. Hak untuk berpartisipasi dalam proses peradilan\n\nUU TPKS juga mengatur tentang pemulihan korban, yang mencakup layanan medis, psikologis, dan sosial. Korban berhak mendapatkan restitusi atau ganti rugi dari pelaku, dan jika pelaku tidak mampu membayar, negara dapat memberikan kompensasi.\n\nDalam hal pembuktian, UU TPKS mengakui bahwa keterangan korban dapat dianggap sebagai alat bukti yang sah jika disertai dengan satu alat bukti lainnya. Ini merupakan kemajuan signifikan, mengingat kasus kekerasan seksual sering terjadi tanpa saksi.\n\nUU TPKS juga mengatur tentang pencegahan kekerasan seksual melalui pendidikan, peningkatan kesadaran, dan penguatan kapasitas aparat penegak hukum.\n\nDengan adanya UU TPKS, diharapkan korban kekerasan seksual akan mendapatkan perlindungan hukum yang lebih baik dan akses yang lebih mudah ke keadilan.",
    summary: "Artikel ini menjelaskan tentang Undang-Undang Tindak Pidana Kekerasan Seksual (UU TPKS) dan perlindungan hukum yang diberikan kepada korban kekerasan seksual."
  },
  {
    id: 10,
    title: "Kisah Inspiratif: Bertahan dan Bangkit dari Kekerasan",
    type: "VIDEO",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-05-05"),
    updatedAt: new Date("2024-05-05"),
    videoUrl: "https://www.youtube.com/watch?v=example5",
    duration: 900, // 15 menit dalam detik
    summary: "Video yang menampilkan kisah inspiratif dari para penyintas kekerasan berbasis gender yang berhasil bertahan dan bangkit."
  },
  {
    id: 11,
    title: "Panduan Pendampingan Korban Kekerasan Berbasis Gender",
    type: "ARTICLE",
    thumbnail: "/bantu.jpg",
    createdAt: new Date("2024-05-08"),
    updatedAt: new Date("2024-05-08"),
    content: "Pendampingan yang tepat sangat penting bagi korban kekerasan berbasis gender (KBG). Artikel ini menyajikan panduan praktis untuk mendampingi korban KBG dengan cara yang mendukung dan memberdayakan.\n\nPrinsip-prinsip dasar dalam pendampingan korban KBG:\n\n1. Keselamatan: Prioritaskan keselamatan korban. Bantu mereka mengidentifikasi risiko dan mengembangkan rencana keselamatan.\n\n2. Kerahasiaan: Jaga kerahasiaan informasi korban. Jangan membagikan informasi tanpa izin eksplisit dari korban, kecuali dalam situasi di mana ada risiko bahaya serius.\n\n3. Penghormatan: Horm"
  }
]
