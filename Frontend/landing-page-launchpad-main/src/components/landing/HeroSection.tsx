import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DemoForm from "@/components/DemoForm";
import heroImg from "@/assets/hero-dashboard.jpg";
import DemoVideoButton from "@/components/DemoVideoButton";
import DemoPopup from "@/components/DemoPopup";
import { Play } from "lucide-react";

const HeroSection = () => (
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
          {/* Book Demo Button */}
          <Button
            size="lg"
            className="bg-gold-gradient text-accent-foreground font-semibold hover:opacity-90 text-base px-8"
            onClick={() => document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Free Demo
          </Button>

          {/* Watch Demo Video Button with Popup */}
          <DemoVideoButton url="https://www.youtube.com/embed/U_nAFr9tLYg" />
        </div>
        <img src={heroImg} alt="AI-Setu ERP Dashboard" className="rounded-xl shadow-2xl w-full max-w-md lg:hidden" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:block"
      >
        <div id="demo-form" className="bg-card text-card-foreground rounded-2xl p-6 shadow-card max-w-sm ml-auto">
          <h3 className="font-heading font-bold text-lg mb-1">Get A Free Demo</h3>
          <p className="text-sm text-muted-foreground mb-4">Fill the form & our team will contact you</p>
          <DemoForm />
        </div>
      </motion.div>
      <DemoPopup />
    </div>
  </section>
);

export default HeroSection;