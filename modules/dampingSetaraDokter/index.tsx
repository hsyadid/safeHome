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
    <div className="container mx-auto px-16 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Konseling Psikologis</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
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