import { DoctorCard } from "@/../components/ui/doctorCard";
import Pagination from "../../components/ui/pagination";

export const DampingSetara = () => {
  const doctors = [
    {
      name: "Dr. Sarah Wijaya",
      specialty: "Psikolog Klinis",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(8, 0, 0, 0)),
      endTime: new Date(new Date().setHours(17, 0, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Budi Santoso",
      specialty: "Psikolog Anak",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(18, 0, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Amanda Putri",
      specialty: "Psikolog Remaja",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(8, 30, 0, 0)),
      endTime: new Date(new Date().setHours(16, 30, 0, 0)),
      isAvailable: false
    },
    {
      name: "Dr. Reza Prakasa",
      specialty: "Psikolog Keluarga",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(19, 0, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Maya Sari",
      specialty: "Psikolog Klinis",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(8, 0, 0, 0)),
      endTime: new Date(new Date().setHours(17, 0, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Adi Nugroho",
      specialty: "Psikolog Trauma",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(9, 30, 0, 0)),
      endTime: new Date(new Date().setHours(18, 30, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Linda Kusuma",
      specialty: "Psikolog Anak",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(8, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 0, 0, 0)),
      isAvailable: true
    },
    {
      name: "Dr. Denny Pratama",
      specialty: "Psikolog Remaja",
      imageUrl: "/gambar_contoh.jpg",
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(20, 0, 0, 0)),
      isAvailable: true
    },
  ];

  return (
    <div className="mx-auto px-16 py-12">
      <div className="mb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold font-jakarta mb-2">Damping Setara</h1>
        <p className="text-lg text-gray-600">Konseling Psikologis</p>
      </div>

      <div className="w-full px-6 md:px-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div key={index} className="w-full flex justify-center">
              <DoctorCard
                name={doctor.name}
                specialty={doctor.specialty}
                imageUrl={doctor.imageUrl}
                startTime={doctor.startTime}
                endTime={doctor.endTime}
                isAvailable={doctor.isAvailable}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
      <Pagination/>
    </div>
  );
}; 