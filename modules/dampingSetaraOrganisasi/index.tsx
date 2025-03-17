import { LawFirmCard } from "@/../components/ui/lawFirmCard";

export const LayananHukum = () => {
  const lawFirms = [
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
    {
      name: "Badan Hukum Apalah",
      imageUrl: "/gambar_contoh.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-16 py-12">

      <div className="mb-8">
        <h1 className="text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Layanan Hukum</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {lawFirms.map((firm, index) => (
          <LawFirmCard
            key={index}
            name={firm.name}
            imageUrl={firm.imageUrl}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}; 