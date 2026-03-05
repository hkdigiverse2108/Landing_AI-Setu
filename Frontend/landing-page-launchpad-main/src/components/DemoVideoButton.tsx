import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface DemoVideoButtonProps {
  url: string; 
}

const DemoVideoButton = ({ url }: DemoVideoButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Button with Play Icon */}
      <Button
        size="lg"
        className="bg-white text-black border-white hover:bg-gray-200 transition flex items-center"
        onClick={() => setOpen(true)}
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Demo Video
      </Button>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[800px] max-w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-black text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* YouTube Video */}
            <iframe
              width="100%"
              height="450"
              src={url}       // directly use the full URL
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default DemoVideoButton;