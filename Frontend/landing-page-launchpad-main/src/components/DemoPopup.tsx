import { useEffect, useState } from "react";
import DemoForm from "@/components/DemoForm";

const DemoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Set timer for 90 seconds (90000 ms)
    const timer = setTimeout(() => {
      setOpen(true);
    }, 90000); // currently 10s for testing

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-black text-xl font-bold"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Popup Content */}
        <div id="demo-form" className="bg-card text-card-foreground rounded-2xl p-6 shadow-card max-w-sm ml-auto">
          <h3 className="font-heading font-bold text-lg mb-1">Get A Free Demo</h3>
          <p className="text-sm text-muted-foreground mb-4">Fill the form & our team will contact you</p>
          <DemoForm />
        </div>
      </div>
    </div>
  );
};

export default DemoPopup;