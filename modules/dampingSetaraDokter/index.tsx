'use client'
import { DoctorCard } from "@/../components/ui/doctorCard";
import Pagination from "../../components/ui/pagination";
import { MdPsychology } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAuth } from '@/../lib/auth';
import AdminForm from '@/../components/ui/adminForm';
import { AdminAddButton } from '@/../components/ui/adminActions';
import { DEFAULT_IMAGES } from '@/../lib/constants';

interface Doctor {
  id: number;
  name: string;
  phone: string;
  email?: string;
  imageUrl?: string;
  gmapsUrl: string;
}



export const DampingSetara = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  // Fetch data from backend
  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3001/doctors');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      
      // Transform backend data to match frontend interface
      const transformedData: Doctor[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email || '-',
        imageUrl: item.imageUrl || DEFAULT_IMAGES.PSIKOLOG,
        gmapsUrl: item.gmapsUrl
      }));
      
      setDoctors(transformedData);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = doctors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler untuk admin
  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setShowAdminForm(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowAdminForm(true);
  };

  const handleDeleteDoctor = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus psikolog ini?')) {
      try {
        const response = await fetch(`http://localhost:3001/doctors/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Psikolog berhasil dihapus!');
          fetchDoctors(); // Refresh data
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('Terjadi kesalahan saat menghapus data');
      }
    }
  };

  const handleSubmitDoctor = async (data: any) => {
    try {
      // Process the data, excluding id field
      const doctorData = {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        imageUrl: data.imageUrl || null,
        gmapsUrl: data.gmapsUrl
      };

      let response;
      if (editingDoctor) {
        // Update doctor
        response = await fetch(`http://localhost:3001/doctors/${editingDoctor.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(doctorData),
        });
      } else {
        // Add new doctor  
        response = await fetch('http://localhost:3001/doctors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(doctorData),
        });
      }

      if (response.ok) {
        alert(editingDoctor ? 'Psikolog berhasil diperbarui!' : 'Psikolog berhasil ditambahkan!');
        setShowAdminForm(false);
        setEditingDoctor(null);
        fetchDoctors(); // Refresh data
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error submitting doctor:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f0eee4] to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-jakarta text-gray-700 text-center">
            Memuat data psikolog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f0eee4] to-purple-50">
      {/* Header Section - Modern Design */}
      <div className="relative bg-gradient-to-r from-[#4F1718] via-[#6B2425] to-[#8B3538] overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ad8861' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <MdPsychology className="text-5xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jakarta text-white mb-6 drop-shadow-lg">
              Damping Setara Psikologis
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Temukan psikolog profesional yang siap membantu Anda mengatasi berbagai masalah psikologis dengan pendekatan yang tepat dan empati
            </p>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">Terpercaya</div>
                <div className="text-white/80">Layanan Konsultasi</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/80">Kerahasiaan Terjamin</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-transparent bg-clip-text text-lg font-semibold">
              🧠 LAYANAN PSIKOLOGI PROFESIONAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Psikolog Berpengalaman
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim psikolog profesional dengan berbagai spesialisasi siap membantu Anda
          </p>
          
          {/* Admin Add Button */}
          {isAdmin && (
            <div className="mt-8">
              <AdminAddButton
                onClick={handleAddDoctor}
                label="Tambah Psikolog"
                className="mx-auto"
              />
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentData.map((doctor, index) => (
                <div 
                  key={doctor.id} 
                  className="transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <DoctorCard
                    id={doctor.id}
                    name={doctor.name}
                    phone={doctor.phone}
                    email={doctor.email || '-'}
                    imageUrl={doctor.imageUrl || DEFAULT_IMAGES.PSIKOLOG}
                    gmapsUrl={doctor.gmapsUrl}
                    onEdit={isAdmin ? handleEditDoctor : undefined}
                    onDelete={isAdmin ? handleDeleteDoctor : undefined}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MdPsychology className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Belum ada psikolog tersedia
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Data psikolog sedang dimuat atau belum ada yang terdaftar
            </p>
            <button
              onClick={fetchDoctors}
              className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              🔄 Muat Ulang
            </button>
          </div>
        )}
      </div>

      {/* Admin Form Modal */}
      {showAdminForm && (
        <AdminForm
          onClose={() => {
            setShowAdminForm(false);
            setEditingDoctor(null);
          }}
          onSubmit={handleSubmitDoctor}
          type="doctor"
          initialData={editingDoctor}
          isEdit={!!editingDoctor}
        />
      )}
    </div>
  );
}; 