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
    <div className=" mx-auto px-16 py-12">

      <div className="mb-8">
        <h1 className="text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Layanan Hukum</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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