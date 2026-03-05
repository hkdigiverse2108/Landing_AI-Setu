import { motion } from "framer-motion";
import DemoForm from "@/components/DemoForm";

const FinalCTA = () => (
  <section className="py-16 lg:py-24 bg-hero text-primary-foreground">
    <div className="container max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Ready to Upgrade Your Store?
        </h2>
        <p className="text-primary-foreground/70 mb-8">
          Join hundreds of Indian retailers who've switched to smarter billing with AI-Setu ERP.
        </p>
        <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-card max-w-sm mx-auto">
          <h3 className="font-heading font-bold text-lg mb-1">Book Free Demo</h3>
          <p className="text-sm text-muted-foreground mb-4">Get started in minutes</p>
          <DemoForm />
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
