import { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/../lib/auth';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { toast } from 'sonner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(user?.profilePhoto && user.profilePhoto !== '' ? user.profilePhoto : '');
  const [hasRemovedPhoto, setHasRemovedPhoto] = useState(false);

  // Function to get user initials
  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  // Function to generate background color based on username
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setHasRemovedPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewImage('');
    setHasRemovedPhoto(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validasi password baru jika diisi
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          toast.error('Password baru tidak cocok!');
          return;
        }
        if (newPassword.length < 6) {
          toast.error('Password minimal 6 karakter!');
          return;
        }
      }

      const formData = new FormData();
      formData.append('username', username);
      if (currentPassword) formData.append('currentPassword', currentPassword);
      if (newPassword) formData.append('newPassword', newPassword);
      if (fileInputRef.current?.files?.[0]) {
        formData.append('profilePhoto', fileInputRef.current.files[0]);
      } else if (hasRemovedPhoto) {
        formData.append('removePhoto', 'true');
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal update profil');
      }

      const updatedUser = await response.json();
      login(updatedUser, updatedUser.accessToken);
      toast.success('Profil berhasil diupdate!');
      onClose();
    } catch (error) {
      toast.error('Gagal update profil. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Edit Profil
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Profile Photo */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="relative w-24 h-24 cursor-pointer group"
                      onClick={handleImageClick}
                    >
                      {previewImage && !hasRemovedPhoto ? (
                        <Image
                          src={previewImage}
                          alt="Profile"
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getAvatarColor(username || user?.username || 'User')}`}>
                          {getUserInitials(username || user?.username || 'User')}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Ubah Foto</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        onClick={handleImageClick}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Pilih Foto
                      </button>
                      {(previewImage && !hasRemovedPhoto) && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>

                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Konfirmasi Password Baru
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 