import { useState, useEffect } from "react";
import Image from "next/image";

interface InformasiModalProps {
  onClose: () => void;
  profileUrl: string;
}

export default function InformasiModal({ onClose, profileUrl }: InformasiModalProps) {
  const [activeTab, setActiveTab] = useState<'artikel' | 'video'>('artikel');
  const [, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={profileUrl}
                  alt="profile"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Tambah Informasi</h2>
                <p className="text-gray-500 text-sm">Bagikan artikel atau video edukatif</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-50 p-1 m-6 rounded-xl">
            <button
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'artikel'
                  ? 'bg-white text-[#4F1718] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('artikel')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Artikel
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'video'
                  ? 'bg-white text-[#4F1718] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('video')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 pt-0 custom-scrollbar">
            {activeTab === 'artikel' ? (
              <div className="space-y-6">
                {/* Image Upload */}
                <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200 relative overflow-hidden">
                  {previewUrl ? (
                    <>
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium">Upload gambar artikel</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG hingga 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                  <input
                    type="text"
                    placeholder="Masukkan judul artikel yang menarik..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F1718]/20 focus:border-[#4F1718] transition-colors duration-200"
                  />
                </div>

                {/* Content Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Isi Artikel</label>
                  <textarea
                    placeholder="Tulis konten artikel yang informatif dan bermanfaat..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F1718]/20 focus:border-[#4F1718] min-h-[200px] resize-none transition-colors duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Video Upload */}
                <div className="w-full aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors duration-200 flex flex-col items-center justify-center">
                  <label className="cursor-pointer text-center">
                    <svg className="w-12 h-12 text-gray-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 font-medium">Upload video edukatif</p>
                    <p className="text-gray-400 text-sm mt-1">MP4, AVI hingga 100MB</p>
                    <input type="file" accept="video/*" className="hidden" />
                  </label>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Judul Video</label>
                  <input
                    type="text"
                    placeholder="Masukkan judul video yang menarik..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F1718]/20 focus:border-[#4F1718] transition-colors duration-200"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Deskripsi Video</label>
                  <textarea
                    placeholder="Tulis deskripsi singkat tentang video..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F1718]/20 focus:border-[#4F1718] min-h-[120px] resize-none transition-colors duration-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
            <button 
              onClick={onClose}
              className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              Batal
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-[#4F1718] to-[#6B1E20] text-white font-semibold rounded-xl hover:from-[#6B1E20] hover:to-[#4F1718] transition-all duration-300 shadow-lg hover:shadow-xl">
              Publikasikan
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 