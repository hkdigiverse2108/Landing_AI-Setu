import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface DemoVideoButtonProps {
  url: string;
}

const DemoVideoButton = ({ url }: DemoVideoButtonProps) => {
  const [open, setOpen] = useState(false);

  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <Button
        size="lg"
        onClick={() => setOpen(true)}
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Demo
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[800px] relative">

            <button
              className="absolute right-3 top-2 text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="450"
              src={getEmbedUrl(url)}
              title="Demo Video"
              allowFullScreen
            ></iframe>

          </div>
        </div>
      )}
    </>
  );
};

export default DemoVideoButton;