import { IoClose } from "react-icons/io5";

interface ContentItem {
  id: number;
  title: string;
  type: 'ARTICLE' | 'VIDEO';
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
  summary?: string;
  videoUrl?: string;
  duration?: number;
}

interface VideoModalProps {
  video: ContentItem;
  onClose: () => void;
}

const VideoModal = ({ video, onClose }: VideoModalProps) => {
  // Fungsi untuk mengekstrak ID video dari URL YouTube
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  return (
    <div className="bg-white rounded-lg w-[70%] max-w-xl overflow-hidden relative mt-16">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoClose size={24} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="aspect-video w-full">
          {video.videoUrl && (
            <iframe
              width="100%"
              height="100%"
              src={getYoutubeEmbedUrl(video.videoUrl)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-gray-500 text-sm mb-2">
            {video.duration ? `Durasi: ${Math.floor(video.duration / 60)} menit ${video.duration % 60} detik` : ''}
          </p>
          <p className="text-gray-700">{video.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;