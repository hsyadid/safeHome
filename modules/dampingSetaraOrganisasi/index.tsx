import { LawFirmCard } from "@/../components/ui/lawFirmCard";

export const LayananHukum = () => {
  const lawFirms = [
    {
      name: "LBH Jakarta",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://www.bantuanhukum.or.id"
    },
    {
      name: "YLBHI",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://ylbhi.or.id"
    },
    {
      name: "LBH APIK",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://www.lbhapik.org"
    },
    {
      name: "PBHI",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://pbhi.or.id"
    },
    {
      name: "LBH Masyarakat",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://lbhmasyarakat.org"
    },
    {
      name: "ILRC",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://mitrahukum.org"
    },
    {
      name: "LBH Pers",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://lbhpers.org"
    },
    {
      name: "ELSAM",
      imageUrl: "/gambar_contoh.jpg",
      redirectUrl: "https://elsam.or.id"
    },
  ];

  return (
    <div className="mx-auto px-16 py-12">
      <div className="mb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Layanan Hukum</p>
      </div>

      <div className="w-full px-6 md:px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lawFirms.map((firm, index) => (
            <div key={index} className="w-full flex justify-center">
              <LawFirmCard
                name={firm.name}
                imageUrl={firm.imageUrl}
                redirectUrl={firm.redirectUrl}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 