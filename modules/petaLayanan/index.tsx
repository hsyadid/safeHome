import { ServiceLocationCard } from "@/../components/ui/serviceLocationCard";
import { MdLocationOn } from "react-icons/md";

export const PetaLayanan = () => {
  const locations = [
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
    {
      name: "Rumah Sakit Apalah",
      imageUrl: "/gambar_contoh.jpg",
      address: "Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132",
      phone: "08022334456",
      email: "email@gmail.com"
    },
  ];

  return (
    <div className="mx-auto px-4 md:px-16 py-12">

      <div className="mb-8 space-y-1">
        <h1 className="text-5xl font-bold font-jakarta pb-3">Peta Layanan</h1>
        <h2 className="text-sm font-semibold" >Hasil terdekat dengan</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <MdLocationOn />
          <p>Jl. Ganesa No.10, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132</p>
        </div>
      </div>
      <div className="flex justify-center md:justify-start flex-wrap gap-6 w-full">
        {locations.map((location, index) => (
          <ServiceLocationCard
            key={index}
            name={location.name}
            imageUrl={location.imageUrl}
            address={location.address}
            phone={location.phone}
            email={location.email}
          />
        ))}
      </div>
    </div>
  );
};
