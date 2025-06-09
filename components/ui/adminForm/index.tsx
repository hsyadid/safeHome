"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdClose, MdAdd, MdEdit, MdLocationOn, MdEmail, MdPhone, MdSchedule, MdAccessTime } from 'react-icons/md';

interface AdminFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  type: 'serviceLocation' | 'doctor' | 'lawFirm' | 'content';
  initialData?: any;
  isEdit?: boolean;
}

const AdminForm: React.FC<AdminFormProps> = ({ 
  onClose, 
  onSubmit, 
  type, 
  initialData, 
  isEdit = false 
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Initialize empty form based on type
      switch (type) {
        case 'serviceLocation':
          setFormData({
            name: '',
            address: '',
            phone: '',
            email: '',
            latitude: '',
            longitude: '',
            imageUrl: '',
            gmapsUrl: ''
          });
          break;
        case 'doctor':
          setFormData({
            name: '',
            phone: '',
            email: '',
            imageUrl: '',
            gmapsUrl: ''
          });
          break;
        case 'lawFirm':
          setFormData({
            name: '',
            phone: '',
            email: '',
            imageUrl: '',
            gmapsUrl: ''
          });
          break;
        case 'content':
          setFormData({
            title: '',
            type: 'ARTICLE',
            thumbnail: '',
            videoUrl: '',
            duration: '',
            content: '',
            summary: ''
          });
          break;
      }
    }
  }, [initialData, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: inputType } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormTitle = () => {
    const action = isEdit ? 'Edit' : 'Tambah';
    switch (type) {
      case 'serviceLocation':
        return `${action} Lokasi Layanan`;
      case 'doctor':
        return `${action} Psikolog`;
      case 'lawFirm':
        return `${action} Lembaga Hukum`;
      case 'content':
        return `${action} Konten`;
      default:
        return `${action} Data`;
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'serviceLocation':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama layanan"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MdLocationOn className="inline mr-1" />
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200 resize-none max-h-[80px] custom-scrollbar"
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdPhone className="inline mr-1" />
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="Contoh: 022-1234567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdEmail className="inline mr-1" />
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="contoh@email.com atau kosongkan jika tidak ada"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="-6.2088"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="106.8456"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  name="gmapsUrl"
                  value={formData.gmapsUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://maps.app.goo.gl/example"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar (Opsional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg atau kosongkan untuk gambar default"
                />
              </div>
            </div>
          </>
        );

      case 'doctor':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Psikolog
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="Nama lengkap psikolog"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdPhone className="inline mr-1" />
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="Contoh: 0812-3456-7890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdEmail className="inline mr-1" />
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="contoh@email.com atau kosongkan jika tidak ada"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  name="gmapsUrl"
                  value={formData.gmapsUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://maps.app.goo.gl/example"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar (Opsional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg atau kosongkan untuk gambar default"
                />
              </div>
            </div>
          </>
        );

      case 'lawFirm':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lembaga Hukum
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan nama lembaga hukum"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdPhone className="inline mr-1" />
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="Contoh: 0812-3456-7890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MdEmail className="inline mr-1" />
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                    placeholder="contoh@email.com atau kosongkan jika tidak ada"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  name="gmapsUrl"
                  value={formData.gmapsUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://maps.app.goo.gl/example"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar (Opsional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/image.jpg atau kosongkan untuk gambar default"
                />
              </div>
            </div>
          </>
        );

      case 'content':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Konten
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan judul konten"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Konten
                </label>
                <select
                  name="type"
                  value={formData.type || 'ARTICLE'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="ARTICLE">📰 Artikel</option>
                  <option value="VIDEO">🎥 Video</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Thumbnail
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/thumbnail.jpg"
                  required
                />
              </div>

              {formData.type === 'VIDEO' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Video
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                      placeholder="https://www.youtube.com/watch?v=..."
                      required={formData.type === 'VIDEO'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durasi (menit)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Summary Video (Opsional)
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary || ''}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200 resize-none max-h-[100px] custom-scrollbar"
                      placeholder="Deskripsi singkat tentang isi video ini..."
                    />
                  </div>
                </>
              )}

              {formData.type === 'ARTICLE' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ringkasan
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary || ''}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200 resize-none max-h-[80px] custom-scrollbar"
                      placeholder="Ringkasan singkat artikel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konten Artikel
                    </label>
                    <textarea
                      name="content"
                      value={formData.content || ''}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4F1718] focus:border-transparent transition-all duration-200 resize-none max-h-[120px] custom-scrollbar"
                      placeholder="Tulis konten artikel di sini..."
                      required={formData.type === 'ARTICLE'}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 flex flex-col">
          <form onSubmit={handleSubmit} className="h-full flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    {isEdit ? <MdEdit className="text-xl" /> : <MdAdd className="text-xl" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{getFormTitle()}</h2>
                    <p className="text-white/80 text-sm">
                      {isEdit ? 'Ubah data yang diperlukan' : 'Lengkapi data di bawah ini'}
                    </p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>
            </div>
            
            {/* Content - Enhanced Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0 modal-form-scroll" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {renderFormFields()}
            </div>

            {/* Footer - Always visible */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex gap-3 sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-[#4F1718] to-[#6B2425] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    isEdit ? 'Simpan Perubahan' : 'Tambah Data'
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Batal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminForm; 