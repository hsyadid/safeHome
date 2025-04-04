import { useState, useEffect } from "react";
import Image from "next/image";
import close from "../../../public/close.svg";
import { FaEye } from "react-icons/fa";

interface InformasiModalProps {
  onClose: () => void;
  profileUrl: string;
}

export default function InformasiModal({ onClose, profileUrl }: InformasiModalProps) {
  const [activeTab, setActiveTab] = useState<'artikel' | 'video'>('artikel');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300px] max-w-[600px] max-h-[85vh] bg-white rounded-[24px] flex flex-col z-[60]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 gap-4">
          <div className="flex items-center gap-8">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={profileUrl}
                alt="profile"
                fill
                sizes="48"
                className="object-cover"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-medium">Apa yang ingin kamu bagikan?</h2>
          </div>
          <button onClick={onClose}>
            <Image src={close} alt="close" width={24} height={24} />
          </button>
        </div>

        <div className="flex gap-4 p-6 border-b border-gray-100">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              activeTab === 'artikel'
                ? 'bg-[#4F1718] text-white'
                : 'bg-[#d6d3d3] text-black'
            }`}
            onClick={() => setActiveTab('artikel')}
          >
            <FaEye />
            Artikel
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-full ${
              activeTab === 'video'
                ? 'bg-[#4F1718] text-white'
                : 'bg-[#d6d3d3] text-black'
            }`}
            onClick={() => setActiveTab('video')}
          >
            <FaEye />
            Video
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'artikel' ? (
            <div className="space-y-4">
              <div className="w-full aspect-video bg-[#F5F5F5] rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative">
                {previewUrl ? (
                  <>
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                    >
                      <Image src={close} alt="remove" width={16} height={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer text-center p-4">
                    <div className="text-gray-500">Klik untuk upload gambar</div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
              <input
                type="text"
                placeholder="Judul artikel..."
                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4F1718]"
              />
              <textarea
                placeholder="Isi artikel..."
                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4F1718] min-h-[200px] resize-none"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full aspect-video bg-[#F5F5F5] rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <label className="cursor-pointer text-center p-4">
                  <div className="text-gray-500">Klik untuk upload video</div>
                  <input type="file" accept="video/*" className="hidden" />
                </label>
              </div>
              <input
                type="text"
                placeholder="Judul video..."
                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4F1718]"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-100">
          <button className="px-6 py-3 bg-[#4F1718] text-white rounded-full font-semibold">
            Unggah
          </button>
        </div>
      </div>
    </>
  );
} 