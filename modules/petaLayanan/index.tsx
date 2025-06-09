"use client"
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { calculateDistance } from '../../src/lib/mapUtils';
import { ServiceLocationCard } from "../../components/ui/serviceLocationCard";
import { MdLocationOn, MdRefresh, MdInfo } from "react-icons/md";
import { useAuth } from '../../lib/auth';
import AdminForm from '../../components/ui/adminForm';
import { AdminAddButton } from '../../components/ui/adminActions';
import Pagination from '../../components/ui/pagination';
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { DEFAULT_IMAGES } from '../../lib/constants';

// Dynamically import MapContainer with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  email?: string;
  imageUrl?: string;
  gmapsUrl: string;
}

export const PetaLayanan = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const [locationError, setLocationError] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [locationDetected, setLocationDetected] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { isAdmin } = useAuth();

  // Validasi koordinat Indonesia
  const isValidIndonesianCoordinate = (lat: number, lon: number): boolean => {
    return lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141;
  };

  // Fungsi sederhana untuk mendapatkan alamat
  const getAddressFromCoords = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=id`,
        { 
          headers: {
            'User-Agent': 'SafeHomeApp/1.0'
          }
        }
      );
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      return data.display_name || "Alamat tidak diketahui";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Alamat tidak dapat dideteksi";
    }
  };

  // Fungsi mendapatkan lokasi user dengan timeout 8 detik
  const getUserLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError("");
    setLocationDetected(false);

    if (!navigator.geolocation) {
      setLocationError("Browser tidak mendukung GPS");
      finishLocationLoading();
      return;
    }

    // Set timeout 8 detik
    const locationTimeout = setTimeout(() => {
      setLocationError("Lokasi tidak dapat dideteksi dalam 8 detik");
      setLocationDetected(false);
      finishLocationLoading();
    }, 8000);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 300000 // 5 menit cache
          }
        );
      });

      clearTimeout(locationTimeout);
      const { latitude, longitude } = position.coords;

      // Validasi koordinat
      if (!isValidIndonesianCoordinate(latitude, longitude)) {
        console.warn(`Koordinat di luar Indonesia: ${latitude}, ${longitude}`);
        setLocationDetected(false);
        finishLocationLoading();
        return;
      }

      const coords: [number, number] = [latitude, longitude];
      setUserLocation(coords);
      setLocationDetected(true);
      
      // Ambil alamat
      const address = await getAddressFromCoords(coords[0], coords[1]);
      setUserAddress(address);
      finishLocationLoading();

    } catch (error) {
      clearTimeout(locationTimeout);
      const geoError = error as GeolocationPositionError;
      
      switch (geoError?.code) {
        case 1:
          setLocationError("Akses lokasi ditolak");
          break;
        case 2:
          setLocationError("Lokasi tidak tersedia");
          break;
        case 3:
          setLocationError("Waktu habis mencari lokasi");
          break;
        default:
          setLocationError("Gagal mendapatkan lokasi");
      }
      
      setLocationDetected(false);
      finishLocationLoading();
    }
  };

  // Selesaikan loading tanpa lokasi
  const finishLocationLoading = () => {
    setIsLoadingLocation(false);
  };

  // Retry lokasi
  const retryLocation = () => {
    setLocationError("");
    getUserLocation();
  };

  // Fetch data from backend
  const fetchBackendData = async (): Promise<Location[]> => {
    try {
      const response = await fetch('https://safehomeanara.id/api/organisasi-layanan');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      
      // Transform backend data to match frontend interface
      const transformedData: Location[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        address: item.address,
        phone: item.phone,
        email: item.email || '-',
        imageUrl: item.imageUrl || DEFAULT_IMAGES.PETA_LAYANAN,
        gmapsUrl: item.gmapsUrl
      }));
      
      return transformedData;
    } catch (error) {
      console.error('Backend fetch failed:', error);
      throw error;
    }
  };

  // Load data
  const loadData = async () => {
    try {
      const backendData = await fetchBackendData();
      setSortedLocations(backendData);
    } catch (error) {
      console.error('Failed to load data:', error);
      setSortedLocations([]);
    }
  };

  // Effect untuk mendapatkan lokasi
  useEffect(() => {
    getUserLocation();
    loadData();
  }, []);

  // Handler untuk admin
  const handleAddLocation = () => {
    setEditingLocation(null);
    setShowAdminForm(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowAdminForm(true);
  };

  const handleDeleteLocation = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus lokasi layanan ini?')) {
      try {
        const response = await fetch(`https://safehomeanara.id/api/organisasi-layanan/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Lokasi layanan berhasil dihapus!');
          loadData(); // Refresh data
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting location:', error);
        alert('Terjadi kesalahan saat menghapus data');
      }
    }
  };

  const handleSubmitLocation = async (data: any) => {
    try {
      // Process the data
      const locationData = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email || null,
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        imageUrl: data.imageUrl || null,
        gmapsUrl: data.gmapsUrl
      };

      let response;
      if (editingLocation) {
        // Update location
        response = await fetch(`https://safehomeanara.id/api/organisasi-layanan/${editingLocation.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData),
        });
      } else {
        // Add new location  
        response = await fetch('https://safehomeanara.id/api/organisasi-layanan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationData),
        });
      }

      if (response.ok) {
        alert(editingLocation ? 'Lokasi layanan berhasil diperbarui!' : 'Lokasi layanan berhasil ditambahkan!');
        setShowAdminForm(false);
        setEditingLocation(null);
        loadData(); // Refresh data
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error submitting location:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  // Effect untuk sorting lokasi hanya jika lokasi terdeteksi
  useEffect(() => {
    if (userLocation && locationDetected) {
      const sorted = [...sortedLocations].sort((a, b) => {
        const distA = calculateDistance(
          userLocation[0],
          userLocation[1],
          a.latitude,
          a.longitude
        );
        const distB = calculateDistance(
          userLocation[0],
          userLocation[1],
          b.latitude,
          b.longitude
        );
        return distA - distB;
      });
      setSortedLocations(sorted);
    }
  }, [userLocation, locationDetected]);

  // Pagination logic
  const totalPages = Math.ceil(sortedLocations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedLocations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Loading state
  if (isLoadingLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-[#f0eee4] to-purple-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-jakarta text-gray-700 text-center">
            Mendeteksi lokasi Anda...
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
            Mohon aktifkan GPS untuk hasil yang lebih akurat
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col space-y-8">
            {/* Title Section */}
            <div className="text-center">
              <div className="inline-block mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-lg">
                  <MdLocationOn className="text-4xl text-white" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jakarta text-white mb-4 drop-shadow-lg">
                Peta Layanan
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Temukan layanan bantuan hukum terdekat dari lokasi Anda dengan mudah dan cepat
              </p>
            </div>

            {/* Location Card - Only show if location detected */}
            {locationDetected && userLocation && (
              <div className="max-w-3xl mx-auto w-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] rounded-full p-3 shadow-lg">
                        <MdLocationOn className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          📍 Lokasi Anda
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {userAddress || "🔍 Mendapatkan alamat..."}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={retryLocation}
                      className="ml-4 bg-gradient-to-r from-[#4F1718] to-[#6B2425] hover:from-[#3a1112] hover:to-[#4a1718] text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                      disabled={isLoadingLocation}
                    >
                      <MdRefresh className={`text-lg ${isLoadingLocation ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline">Perbarui</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Location Error Display */}
            {locationError && !locationDetected && (
              <div className="max-w-3xl mx-auto w-full">
                <div className="bg-yellow-50/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-yellow-500 rounded-full p-3 shadow-lg">
                        <MdInfo className="text-white text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                          ⚠️ Lokasi Tidak Terdeteksi
                        </h3>
                        <p className="text-yellow-700 text-base leading-relaxed">
                          {locationError}
                        </p>
                        <p className="text-sm text-yellow-600 mt-1">
                          Data layanan ditampilkan tanpa informasi jarak
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={retryLocation}
                      className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                    >
                      <MdRefresh className="text-lg" />
                      <span className="hidden sm:inline">Coba Lagi</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-transparent bg-clip-text text-lg font-semibold">
              🏛️ LAYANAN BANTUAN HUKUM
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {locationDetected ? "Terdekat dari Anda" : "Layanan Tersedia"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locationDetected 
              ? "Diurutkan berdasarkan jarak untuk memudahkan Anda menemukan bantuan hukum terdekat"
              : "Daftar layanan bantuan hukum yang tersedia"
            }
          </p>
          

          
          {/* Admin Add Button */}
          {isAdmin && (
            <div className="mt-8">
              <AdminAddButton
                onClick={handleAddLocation}
                label="Tambah Lokasi Layanan"
                className="mx-auto"
              />
            </div>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentData.map((location, index) => (
            <div 
              key={location.id} 
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ServiceLocationCard
                id={location.id}
                name={location.name}
                imageUrl={location.imageUrl || DEFAULT_IMAGES.PETA_LAYANAN}
                address={location.address}
                phone={location.phone}
                email={location.email || '-'}
                gmapsUrl={location.gmapsUrl}
                distance={
                  userLocation && locationDetected
                    ? calculateDistance(
                        userLocation[0],
                        userLocation[1],
                        location.latitude,
                        location.longitude
                      ).toFixed(1)
                    : undefined
                }
                onEdit={isAdmin ? handleEditLocation : undefined}
                onDelete={isAdmin ? handleDeleteLocation : undefined}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedLocations.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <MdLocationOn className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Tidak ada layanan ditemukan
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Coba perbarui lokasi atau periksa koneksi internet Anda
            </p>
            <button
              onClick={retryLocation}
              className="bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              🔄 Coba Lagi
            </button>
          </div>
        )}

        {/* Pagination - Only show if there are locations */}
        {sortedLocations.length > itemsPerPage && (
          <div className="mt-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Admin Form Modal */}
      {showAdminForm && (
        <AdminForm
          onClose={() => {
            setShowAdminForm(false);
            setEditingLocation(null);
          }}
          onSubmit={handleSubmitLocation}
          type="serviceLocation"
          initialData={editingLocation}
          isEdit={!!editingLocation}
        />
      )}
    </div>
  );
};
