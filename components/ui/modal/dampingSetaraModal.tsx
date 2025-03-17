import { useRouter } from "next/navigation";

interface DampingSetaraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DampingSetaraModal = ({ isOpen, onClose }: DampingSetaraModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[20px] p-6 w-[400px] space-y-4">
        <h3 className="text-xl font-semibold font-jakarta">Pilih Layanan</h3>
        
        <div className="space-y-3">
          <button 
            onClick={() => {
              router.push('/damping-setara/psikolog');
              onClose();
            }}
            className="w-full py-3 px-4 rounded-[10px] bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-jakarta"
          >
            Konseling Psikologis
          </button>
          
          <button 
            onClick={() => {
              router.push('/damping-setara/hukum');
              onClose();
            }}
            className="w-full py-3 px-4 rounded-[10px] bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-jakarta"
          >
            Layanan Hukum
          </button>
        </div>
      </div>
    </div>
  );
}; 