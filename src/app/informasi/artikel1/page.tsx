import { title } from "process"
import Artikel from "../../../../modules/artikel"

export default function() {
  return (
    <Artikel
    content={
          {
            title: "Massa Aksi Mahasiswa Indonesia Gelap Mulai Bubar dari Patung Kuda",
            date: new Date(2025,2,17),
            author: "Tim Penulis Anara ID",
            image: "/okegas.jpg",
            paragraphs: `Jakarta, CNN Indonesia -- Sejumlah demonstran mahasiswa yang tergabung dalam aksi 'Indonesia Gelap' mulai membubarkan diri dari kawasan Patung Kuda, Jakarta Pusat sekitar pukul 20.20 WIB pada Senin (17/2) malam. 
            
            Sebelumnya, hampir pukul 20.00 WIB, pantauan CNNIndonesia.com sekitar ratusan demonstran masih bertahan. Sementara itu mayoritas massa yang sempat ikut aksi itu sejak siang tadi terpantau telah meninggalkan lokasi demonstrasi. Sementara itu, di arah barisan polisi, terdengar aparat melalui pengeras suara mengimbau agar massa untuk meninggalkan lokasi secara perlahan. 
            
            Polisi juga meminta massa yang masih bertahan di patung dua tak melakukan provokasi, dan membongkar barikade beton serta kawat duri yang terpasang. Kami memberikan toleransi waktu kepda teman-teman untuk membubarkan diri secara tertib,ujar salah satu polisi dari rantis yang berjaga. 
            
            Berdasarkan pantauan, memang terdapat sejumlah demonstran yang berusaha membongkar kawat berduri yang telah dipasang kepolisian. Selain itu, terdapat pula sejumlah demonstran yang melemparkan kembang api hingga petasan ke arah aparat kepolisian yang berada dibalik barikade beton.`
          }
        }
    />
  )
}