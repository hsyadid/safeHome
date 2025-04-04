import { DoctorCard } from "@/../components/ui/doctorCard";
import Pagination from "../../components/ui/pagination";

export const DampingSetara = () => {
  const doctors = [
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: true
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: true
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: false
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: false
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: true
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: true
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: false
    },
    {
      name: "Dr Apalah",
      specialty: "Spesialis Anak Kecil",
      imageUrl: "/gambar_contoh.jpg",
      time: "08:00-17:00",
      isAvailable: false
    },
  ];

  return (
    <div className="mx-auto px-16 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Konseling Psikologis</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            specialty={doctor.specialty}
            imageUrl={doctor.imageUrl}
            time={doctor.time}
            isAvailable={doctor.isAvailable}
          />
        ))}
      </div>
      <Pagination/>
    </div>
  );
}; 