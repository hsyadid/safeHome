"use client"
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance } from '@/lib/mapUtils';
import { ServiceLocationCard } from "@/../components/ui/serviceLocationCard";
import { MdLocationOn } from "react-icons/md";

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  email: string;
  imageUrl: string;
}

// Data dummy untuk ServiceLocationCard
const dummyServiceLocations = [
  {
    id: 1,
    name: "Rumah Sakit Hasan Sadikin",
    imageUrl: "/bantu.jpg",
    address: "Jl. Pasteur No. 38, Pasteur, Bandung",
    phone: "022-2034953",
    email: "rshs@example.com",
    latitude: -6.89608,
    longitude: 107.59888,
  },
  {
    id: 2,
    name: "RSUD Kota Bandung",
    imageUrl: "/bantu.jpg",
    address: "Jl. Rumah Sakit No.22, Ujung Berung, Bandung",
    phone: "022-7811794",
    email: "rsud@bandung.go.id",
    latitude: -6.91501,
    longitude: 107.69418,
  },
  {
    id: 3,
    name: "Puskesmas Ciumbuleuit",
    imageUrl: "/bantu.jpg",
    address: "Jl. Ciumbuleuit No.203, Bandung",
    phone: "022-2032110",
    email: "puskesmas.ciumbuleuit@bandung.go.id",
    latitude: -6.87234,
    longitude: 107.60812,
  },
  {
    id: 4,
    name: "Klinik Kesehatan Sejahtera",
    imageUrl: "/bantu.jpg",
    address: "Jl. Dipatiukur No.35, Bandung",
    phone: "022-2500177",
    email: "klinik.sejahtera@example.com",
    latitude: -6.89301,
    longitude: 107.61683,
  }
];

export const PetaLayanan = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);


  // Dapatkan lokasi user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          
          // Reverse geocoding untuk mendapatkan alamat
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`
            );
            const data = await response.json();
            setUserAddress(data.display_name);
          } catch (error) {
            console.error("Error getting address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          const lombokCoords: [number, number] = [-8.650979,116.324944];
          setUserLocation(lombokCoords);
          
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lombokCoords[0]}&lon=${lombokCoords[1]}`)
            .then(response => response.json())
            .then(data => setUserAddress(data.display_name))
            .catch(err => console.error("Error getting default address:", err));
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      const lombokCoords: [number, number] = [-8.650979,116.324944];
      setUserLocation(lombokCoords);
    }
  }, []);

  // Fetch dan sort lokasi
  useEffect(() => {
    if (userLocation) {
      // Gunakan data dummy langsung tanpa fetch API
      const sorted = [...dummyServiceLocations].sort((a, b) => {
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
  }, [userLocation]);

  if (!userLocation) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-16 h-16 border-4 border-[#4F1718] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-jakarta text-gray-700">Memuat peta layanan...</p>
      <p className="text-sm text-gray-500 mt-2">Mohon tunggu sebentar</p>
    </div>
  );

  return (
    <div className="mx-auto px-4 md:px-16 py-12 grid_pattern">
      <div className="mb-8 space-y-1 flex flex-col justify-center">
        <h1 className="text-5xl font-bold font-jakarta pb-3">Peta Layanan</h1>
        <h2 className="text-sm font-semibold">Hasil terdekat dengan</h2>
        <div className="flex items-center gap-2 text-gray-600">
          <MdLocationOn />
          <p>{userAddress || "Mendapatkan lokasi..."}</p>
        </div>
      </div>     

      {/* Daftar Lokasi */}
      <div className="w-full px-6 md:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedLocations.map((location) => (
            <div key={location.id}>
              <ServiceLocationCard
                name={location.name}
                imageUrl={location.imageUrl}
                address={location.address}
                phone={location.phone}
                email={location.email}
                distance={
                  userLocation
                    ? calculateDistance(
                        userLocation[0],
                        userLocation[1],
                        location.latitude,
                        location.longitude
                      ).toFixed(1)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
