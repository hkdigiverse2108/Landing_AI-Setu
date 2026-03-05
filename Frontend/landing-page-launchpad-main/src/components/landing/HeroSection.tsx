import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import DemoForm from "@/components/DemoForm";
import heroImg from "@/assets/image.png";
import aiScanImg from "@/assets/ai-scan.jpg";

const HeroSection = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section className="bg-hero text-primary-foreground relative overflow-hidden">
        <div className="container py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4">
              Smart ERP for <span className="text-gradient-gold">Indian Retailers</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              AI-powered billing, inventory & store management — built specifically for Indian retail businesses.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                size="lg"
                onClick={() => setDemoOpen(true)}
                className="bg-gold-gradient text-accent-foreground font-semibold text-base px-8
                  transition-all duration-200
                  hover:scale-105 hover:shadow-[0_0_20px_rgba(255,200,50,0.5)] hover:opacity-100
                  active:scale-95"
              >
                Book Free Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <Play className="mr-2 h-4 w-4" /> Watch Demo Video
              </Button>
            </div>
            {/* Mobile image */}
            <img src={heroImg} alt="AI-Setu ERP Dashboard" className="rounded-xl shadow-2xl w-full max-w-md lg:hidden" />
          </motion.div>

          {/* Right Column: Image Showcase (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center pb-10"
          >
            <div className="relative w-full max-w-md">
              {/* Main large image */}
              <img
                src={heroImg}
                alt="AI-Setu ERP Dashboard"
                className="rounded-2xl shadow-2xl w-full object-cover border border-white/10"
              />
              {/* Floating smaller image overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-44 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20"
              >
                <img
                  src={aiScanImg}
                  alt="AI Scan Feature"
                  className="w-full object-cover"
                />
              </motion.div>
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-yellow-400/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Dialog Modal */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="sm:max-w-sm bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-2xl text-foreground">
              Book A Free Demo
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Fill the form and our team will contact you shortly.
            </DialogDescription>
          </DialogHeader>
          <DemoForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
